<template>
  <div>
    <q-dialog
      maximized
      persistent
      v-model="showDialogVehicles"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="full-width ">

        <!-- Template Verify if user have vehicles -->
        <template v-if="!loadingVehicles">
          <q-card-section class="full-height">
            <div class="row justify-center dialog-icon">
              <div class="col-xs-6 col-sm-8 col-md-4">
                <img src="~assets/logo-toyota-h.svg" class="full-width">
              </div>
            </div>
            <div class="row justify-center">
              <div class="col-10 text-center text-body1">
                Para operar mediante de la aplicacion es necesario que registres tu vehículo
              </div>
            </div>
            <div class="row card-action">
              <div class="col-12">
                <q-btn flat v-close-popup class="text-grey-8">OMITIR</q-btn>
                <q-btn flat icon-right="chevron_right" :to="{ name: 'my_vehilces' }">COMENZAR </q-btn>
              </div>
            </div>
          </q-card-section>
        </template>
        <template v-else>
          <div class="full-width full-height flex justify-center items-center">
            <q-spinner color="secondary" size="3em" />
          </div>
        </template>

        <!-- Template ERROR -->
        <template v-if="errorOnLoad">
          <q-card-section class="full-height">
            <div class="row justify-center dialog-icon">
              <div class="col-xs-6 col-sm-8 col-md-4 text-center">
                <q-icon name="sentiment_very_dissatisfied" class="text-red-4" style="font-size: 6rem;" />
              </div>
            </div>
            <div class="row justify-center">
              <div class="col-12 text-center">
                <p class="text-h5 text-danger">Ups!</p>
                <p class="text-body1">Lo sentimos algo salió mal.</p>
              </div>
            </div>
            <div class="row card-action">
              <div class="col-12">
                <q-btn flat v-close-popup class="text-grey-9">CERRAR</q-btn>
              </div>
            </div>
          </q-card-section>
        </template>

      </q-card>

    </q-dialog>

    <!-- Dialog Enable Push Notifications -->
    <q-dialog
      maximized
      persistent
      v-model="showNotificationsDialog"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="full-width ">
        <template>
          <q-card-section class="full-height">
            <div class="row justify-center dialog-icon">
              <div class="col-xs-6 col-sm-8 col-md-4">
                <img src="~assets/notifications.png" class="full-width">
              </div>
            </div>
            <div class="row justify-center">
              <div class="col-12 text-center">
                <p class="text-h5 text-danger">Notificaciones</p>
                <p class="text-body1">Activa las notificaciones para que podamos mantenerte informado</p>
              </div>
            </div>
            <div class="card-action">
              <div class="">
                <q-btn flat class="text-grey-8" @click="neverShowNotificationDialog()">NUNCA</q-btn>
                <q-btn flat class="text-grey-8" @click="showNotificationsDialog = false">OMITIR</q-btn>
                <q-btn flat icon-right="chevron_right" @click="enableNotifications()">ACTIVAR </q-btn>
              </div>
            </div>
          </q-card-section>
        </template>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

let qs = require('qs')

export default {
  name: 'FirstStepsComponent',
  data () {
    return {
      errorOnLoad: false,
      loadingVehicles: true,
      showDialogVehicles: true,
      showNotificationsDialog: false,
    }
  },
  mounted(){
  },
  created(){
    this.verifyIfHaveVehicles()
    this.initNotificationsDialog()
  },
  computed:{
    pushNotificationsSupported(){
      if ('PushManager' in window)
        return true
      return false
    },
    serviceWorkerSupported(){
      if ('serviceWorker' in navigator)
        return true
      return false
    }
  },
  methods:{
    verifyIfHaveVehicles(){
      this.$axios.get('/user-vehicles')
        .then(res => {
          setTimeout(()=>{ 

            if (res.data.data.length > 0)
              this.showDialogVehicles = false

            this.loadingVehicles = false

          }, 2500);
        })
        .catch(error => {
          this.errorOnLoad = true
          this.loadingVehicles = false
        })
    },
    enableNotifications(){
      if (this.pushNotificationsSupported) {
        Notification.requestPermission(result => {

          if (result == 'granted') {
            this.neverShowNotificationDialog()
            this.checkForExistingPushSubscription()
          }

        })
      }
    },
    checkForExistingPushSubscription(){
      if (this.serviceWorkerSupported && this.pushNotificationsSupported) {
        let reg
        navigator.serviceWorker.ready.then(swreg => {
          reg = swreg
          return swreg.pushManager.getSubscription()
        })
        .then(sub => {
          if (!sub) {
            this.createPushSubscription(reg)
          }
        })
        .catch(err =>{
          console.log(err)
        })
      }
    },
    createPushSubscription(reg){
      let vapidPublicKey = 'BEQ3SREFxc9gCHioNIGwn3htddNiX2RPIxppYmzqtNalOW-w4FZOfAu4aRRaYYGf8QQpRYIKZdY_GE6REocnpz8'
      let vapidPublicKeyConverted = this.urlBase64ToUint8Array(vapidPublicKey)
      reg.pushManager.subscribe({
        applicationServerKey: vapidPublicKeyConverted,
        userVisibleOnly: true
      }).then(newSub => {
        let newSubData = newSub.toJSON()
        let newSubDataQS = qs.stringify(newSubData)
        return this.$axios.post('/push-subscription?'+newSubDataQS )
      }).then(res => {
        console.log('response: ', res)
      }).catch(err=>{
        console.log(err)
      })
    },
    neverShowNotificationDialog(){
      this.showNotificationsDialog = false
      this.$q.localStorage.set('neverShowNotificationDialog', true)
    },
    urlBase64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    },
    initNotificationsDialog(){

      let neverShowNotificationDialog = this.$q.localStorage.getItem('neverShowNotificationDialog')

      if (!neverShowNotificationDialog && this.pushNotificationsSupported) {
        this.showNotificationsDialog = true
      }

    },
    displayGrantedNotification(){
      // new Notification('Has aceptado las notificaciones',{
      //   body: '',
      //   icon: 'icons/icon-128x128.png',
      //   image: 'icons/icon-128x128.png',
      //   badge: 'icons/icon-128x128.png',
      //   dir: 'ltr',
      //   lang: 'es-AR',
      //   vibrate: [100, 50, 200],
      //   tag: 'confirm-notification',
      //   renotify: true
      // })

      if (this.serviceWorkerSupported && this.pushNotificationsSupported) {
        navigator.serviceWorker.ready.then(swreg => {
          swreg.showNotification('Has aceptado las notificaciones',{
            body: 'Gracias por aceptar',
            icon: 'icons/icon-128x128.png',
            image: 'icons/icon-128x128.png',
            badge: 'icons/icon-128x128.png',
            dir: 'ltr',
            lang: 'es-AR',
            vibrate: [100, 50, 200],
            tag: 'confirm-notification',
            renotify: true,
            actions: [
              {
                action: 'hello',
                title: 'Hello',
                icon: 'icons/icon-128x128.png'
              },
              {
                action: 'goodbay',
                title: 'GoodBay',
                icon: 'icons/icon-128x128.png'
              }
            ]
          })
          return swreg.pushManager.getSubscription()
        })
        .then(sub => {
          if (!sub) {
            console.log('CREATE NEW SUBSCRIPTION')
          }
        })
        .catch(err =>{
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog-icon{
    margin-top: 30%;
    margin-bottom: 10%
  }
  .card-action{
    position: absolute;
    bottom: 30px;
    right: 10px;
  }
</style>