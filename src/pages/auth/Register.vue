<template>
  <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
    <q-page>

      <div style="width: 100%; height: 25vh;" class="bg-auth">
      </div>

      <div style="width: 100%; height: 75vh">

        <div class="row q-pa-lg">
          <div class="col-xs-12">
            <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
              <q-input
                color="teal"
                v-model="data.name"
                label="Apellido y Nombre *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El nombre es requerido']">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                color="teal"
                v-model="data.email"
                label="Email *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'El email es requerido']">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>

              <q-input 
                color="teal"
                v-model="data.password"
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

              <q-input
                label="Repita su contraseña *" 
                color="teal"
                v-model="data.password_confirmation" 
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
                      label="Registrarse"
                      :loading="submitting"
                      class="full-width btn-outline-default">
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
                      label="Iniciar Sesión" 
                      :to="{ name: 'login'}"
                      class="full-width btn-outline-default"
                    />
                  </div>
                </div>
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      data:{
        email: null,
        password: null,
        errors: {}
      },
      isPwd: true,
      submitting: false,
    }
  },

  methods: {
    onSubmit () {
      this.submitting = true
      this.$axios.post('/auth/register', this.data)
        .then(res => {
          console.log(res)
          this.submitting = false;
          let notify = {};
          notify.message = res.data.message;
          notify.multiLine = false;
          notify.type = 'success';
          this.showNotify(notify)

          this.onReset();
          this.$router.push({name: "login"});
        })
        .catch(err => {
          console.log(err)
          this.submitting = false;
          let notify = {};
          notify.message = err.response.data.message;
          notify.multiLine = false;
          notify.type = 'negative';

          if (err.response.data.errors.name)
            notify.message += ' ' + err.response.data.errors.name[0] + '.';
          if (err.response.data.errors.password)
            notify.message += ' ' + err.response.data.errors.password[0] + '.';
          if (err.response.data.errors.email)
            notify.message += ' ' + err.response.data.errors.email[0] + '.'

          this.showNotify(notify)
        })
    },
    onReset () {
      this.data.name = null
      this.data.email = null
      this.data.password = null
      this.data.password_confirmation = null
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
  .q-gutter-y-md > *, .q-gutter-md > * {
    margin-top: 5px;
}
  .bg-auth{
    background: url('./../../../public/appbg.png');
    background-size: cover;
    background-position: center;
  }
</style>
