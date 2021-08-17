<template>
  <q-page>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div style="width: 100%; height: 40vh;" class="flex justify-center items-center">
          <img src="~assets/dyv.svg" class="logo">
        </div>
      </transition>

      <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
        <div style="width: 100%; height: 60vh">
          <div class="row q-pa-lg justify-center">
            <div class="col-xs-11 col-sm-8 col-md-5">
              <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
                <q-input v-model="data.email"
                         label="Email *"
                         color="teal">
                  <template v-slot:append>
                      <q-icon name="mail" />
                  </template>
                </q-input>
                <q-input v-model="data.password"
                         color="teal"
                         label="Contraseña *" 
                         :type="isPwd ? 'password' : 'text'">
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <div class="q-pt-xl">
                  <div class="row">
                    <div class="col-12 text-center">
                      <q-btn 
                        type="submit" 
                        color="secondary" 
                        class="full-width"
                        :loading="submitting"
                        label="Iniciar Sesión" 
                      >
                      <template v-slot:loading>
                        <q-spinner-facebook />
                      </template>
                    </q-btn>
                    </div>
                  </div>
                  <div class="row q-pt-md">
                    <div class="col-12 text-center">
                      <q-btn 
                        flat 
                        label="Registrarse" 
                        :to="{ name: 'register'}"
                        class="full-width btn-outline-default"  
                      />
                    </div>
                  </div>
                  <div class="row q-pt-md">
                    <div class="col-12 text-center">
                      <p>¿Olvido su contraseña? 
                      <router-link :to="{ name: 'forgot_password'}" class="text-weight-medium text-muted" style="text-decoration: none;">Recuperar</router-link></p>
                    </div>
                  </div>
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </transition>
    </q-page>
</template>

<script>
export default {
  data () {
    return {
      data:{
        email: null,
        password: null,
      },
      isPwd: true,
      submitting: false,
    }
  },

  methods: {
    onSubmit () {
      this.submitting = true
      this.$axios.post('/auth/login', this.data)
        .then(res => {
          this.submitting = false;
          if (res.data.success) {
            try {
              this.$q.localStorage.set('apiJwt', res.data.token)
              this.$q.localStorage.set('userData', res.data.user)
              this.$router.push({name: "home"});
            } catch (e) {
              let notify = {};
              notify.message = 'Ups! algo salió mal. ERR_LOCAL_STORAGE';
              notify.multiLine = false;
              notify.type = 'negative';
              this.showNotify(notify)
            }
          }
        })
        .catch(err => {
          this.submitting = false;
          console.log(err)
          let notify = {};
          notify.message = err.response.data.message;
          notify.multiLine = false;
          notify.type = 'negative';
          this.showNotify(notify)
        })
    },
    onReset () {
      this.data.email = null
      this.data.password = null
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

<style type="text/css" scoped>
  .logo{
    width:70%;
    max-width: 300px;
  }
</style>