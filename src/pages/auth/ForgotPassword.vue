<template>
  <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
    <q-page>
      <template v-if="!showSuccess">
        <div style="width: 100%; height: 30vh;" class="flex justify-center items-center">
          <img src="~assets/dyv.svg" class="logo">
        </div>
        <div style="width: 100%; height: 70vh;">
          <div class="row q-pa-lg justify-center full-height flex items-end">
            <div class="col-xs-11 col-sm-8 col-md-5 text-center">
              <div class="row">
                <div class="col-12">
                  <div class="full-width">
                    <p class="text-muted q-mb-sm title-forgot-pass">¿Olvidaste tu contraseña?</p>
                    <p class="text-muted q-mb-sm">No hay problema.</p>
                    <p class="text-muted">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
                  </div>
                  
                  <div class="full-width">
                    <q-form class="q-gutter-md" @submit="onSubmit">
                      <q-input 
                        v-model="data.email"
                        label="Email *"
                        color="teal">
                        <template v-slot:append>
                          <q-icon name="mail" />
                        </template>
                      </q-input>

                      <div class="row">
                        <div class="col-12 text-center">
                          <q-btn 
                            type="submit" 
                            color="secondary" 
                            class="full-width"
                            :loading="submitting"
                            label="Enviar Link">
                            <template v-slot:loading>
                              <q-spinner-facebook />
                            </template>
                          </q-btn>
                        </div>
                      </div>

                      <div class="row q-pt-md">
                        <div class="col-12 text-center">
                          <p><q-btn flat :to="{ name: 'login'}" class="text-muted">Volver al inicio</q-btn></p>
                        </div>
                      </div>
                    </q-form>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>

      </template>
      
      <template v-else>
        <q-header class="bg-white text-dark">
          <q-toolbar >
            <q-btn color="dark" class="text-right" label="Atras" dense flat rounded icon="arrow_back" v-go-back=" '/' "/>
            <q-toolbar-title></q-toolbar-title>
          </q-toolbar>
        </q-header>
        <div style="width: 100%; height: 70vh">

          <div class="row q-pa-lg">
            <div class="col-12 text-center">
              <h1 class="text-center q-my-md">
                <q-icon name="mark_email_unread" class="text-secondary" />
              </h1>
            </div>
            <div class="col-12 text-center">
              <p class="text-muted">Hemos enviado a tu email un link para restablecer tu contraseña. Una vez que lo hagas ya podrás iniciar sesión el la app con tu nueva contraseña.</p>
            </div>
          </div>
          <div class="row q-pa-lg">
              <div class="col-12 text-center">
                <p><q-btn flat :to="{ name: 'login'}" class="btn-outline-default">Volver al inicio</q-btn></p>
              </div>
          </div>

        </div>
      </template>
    </q-page>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      data:{
        email: null,
      },
      submitting: false,
      showSuccess: false
    }
  },

  methods: {
    onSubmit () {
      this.submitting = true
      this.$axios.post('/auth/reset-password', this.data)
        .then(res => {
          this.submitting = false;
          this.showSuccess = true;
        })
        .catch(err => {
          this.submitting = false;
          console.log(err)
          let notify = {};
          notify.message = 'Ups! Algo salió mal. Por favor intente nuevamente mas tarde.';
          notify.multiLine = false;
          notify.type = 'negative';
          this.showNotify(notify)
        })
    },
    showNotify(notify){
      this.$q.notify({
        message: notify.message,
        type: notify.type,
        multiLine: notify.multiLine,
        actions: [
          { label: 'Cerrar', color: 'white', handler: () => { /* ... */ } }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title-forgot-pass{
  font-size: 25px
}
  .logo{
    width:70%;
    max-width: 300px;
  }
</style>