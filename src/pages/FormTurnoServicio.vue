<template>
  <q-page class="">

    <HeaderComponent titulo="Turnos Online" />
    
    <div class="q-pa-md row">

      <div class="col-12">
      </div>

      <div class="col-12 bg-white">
        <div>
          <p class="text-center q-mt-md title-form">Solicitar turno para servicios</p>
          <q-form
            @submit="onSubmit"
            class="q-gutter-md q-px-md q-py-md"
          >
            <q-input v-model="user.name" label="Apellido y Nombre *" :rules="[val => !!val || 'Nombre es requerido']" />

            <q-input v-model="user.email" label="Email *" :rules="[val => !!val || 'Email es requerido']" />

            <q-input v-model="user.phone" label="Teléfono *" :rules="[val => !!val || 'Teléfono es requerido']" />

            <q-select v-model="unidad" :options="myVehicles" label="Vehículo"  :rules="[val => !!val || 'Vehículo es requerido']" />

            <q-select v-model="servicio" :options="servicios" label="Servicio"  :rules="[val => !!val || 'Servicio es requerido']"/>
            
            <q-input v-model="fecha" :rules="[validateDate]" label="Fecha">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="fecha" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Aceptar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-select v-model="sucursal" :options="sucursales" label="Sucursal" :rules="[val => !!val || 'Sucursal es requerido']" />

            <div>
              <q-btn  type="submit" 
                      color="secondary" 
                      class="full-width"
                      :loading="submitting"
                      label="Solicitar turno"
              />
            </div>
          </q-form>
        </div>
      </div>
      
    </div>

    <!-- Alert Validate FechaSolicitada -->
    <q-dialog v-model="wrongDate">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">Fecha Inválida</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ wrongDateMessage }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDialogConfirm" full-height> 
      <q-card class="column full-height full-width dialogSuccess">

        <q-card-section class="full-height column items-center justify-center q-px-lg">
          <div class="q-px-md">
            <SuccessCheckCss />
          </div>
          <p class="title q-mt-lg q-mb-none">TURNO SOLICITADO</p>
          <p class="text-center description q-mt-lg q-mb-none text-muted">Un asesor se pondra en contacto con usted para confirmar la fecha y hora de la solicitud</p>
          <div class="q-mt-xl full-width">
            <q-btn  label="ACEPTAR" v-close-popup color="green-8" class="full-width" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDialogError">
      <q-card>
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Ups, lo sentimos algo salio mal. Por favor intente nuevamente mas tarde.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="ACEPTAR" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { date } from 'quasar'
import HeaderComponent from 'components/HeaderComponent.vue'
import SuccessCheckCss from 'components/SuccessCheckCss.vue'
export default {
  name: 'PageHome',
  components: { HeaderComponent, SuccessCheckCss },
  data () {
    return {
      user: {},
      fecha: null,
      servicios: [],
      myVehicles: [],
      sucursal: null,
      servicio: null,
      wrongDate: false,
      submitting: false,
      wrongDateMessage: '',
      showDialogError: false,
      showDialogConfirm: false,
      unidad: { label: 'Seleccionar Vehículo *' },
      sucursales: [{ label: 'Sáenz Peña', label: 'Sáenz Peña'},{ label: 'Resistencia', label: 'Resistencia'},{ label: 'Charata', label: 'Charata'}],
    }
  },
  mounted(){
    this.user = this.$q.localStorage.getItem('userData')
    this.getMyVehicles()
    this.getServicios()
  },
  methods:{
    onSubmit(){
      let formData = {}
      formData.from = "app"
      formData.cliente = this.user.name
      formData.telefono = this.user.phone
      formData.email = this.user.email
      formData.modelo = this.unidad.modelo
      formData.dominio = this.unidad.dominio
      formData.servicio = this.servicio.value
      formData.fecha = this.fecha
      formData.sucursal = this.sucursal.label

      this.$axios.post('/turno-servicio', formData)
        .then(res => {
          this.showDialogConfirm = true
          formData = {}
        })
        .catch(error => {
          console.log(error)
          this.showDialogError = true
        })
    },
    getMyVehicles(){
      this.$axios.get('/user-vehicles')
      .then(res => {
        res.data.data.forEach(item =>{
          item.label = item.dominio + ' - ' +item.modelo + ' ' + item.version
          item.value = item.id
        });
        this.myVehicles = res.data.data
        if (this.myVehicles.length > 0)
          this.unidad = this.myVehicles[0]
      })
    },
    getServicios(){
      this.servicios = [
        { label: '10.000 KM', value: '10.000 KM' },
        { label: '20.000 KM', value: '20.000 KM' },
        { label: '30.000 KM', value: '30.000 KM' },
        { label: '40.000 KM', value: '40.000 KM' },
        { label: '50.000 KM', value: '50.000 KM' },
        { label: '60.000 KM', value: '60.000 KM' },
        { label: '70.000 KM', value: '70.000 KM' },
        { label: '80.000 KM', value: '80.000 KM' },
        { label: '90.000 KM', value: '90.000 KM' },
        { label: '100.000 KM', value: '100.000 KM' },
        { label: 'Otro', value: 'Otro' },
      ]
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
    },
    validateDate(value){
      let fechaSolicitada = date.extractDate(value, 'DD/MM/YYYY')
      let fechaMinima = date.addToDate(new Date(), { days: 0 })
      let fechaMaxima = date.addToDate(new Date(), { month: 2 })

      if (!date.isBetweenDates(fechaSolicitada, fechaMinima, fechaMaxima)) {
        let limit = date.formatDate(fechaMaxima, 'DD-MM-YYYY')
        this.wrongDateMessage = 'La fecha debe ser mayor al dia de hoy y menor a ' + limit
        this.wrongDate = true
        this.fecha = null
      }
    }
  }
}
</script>

<style lang="scss">
.q-gutter-y-md > *, .q-gutter-md > * {
    margin-top: 5px;
}
.title-form{
  font-size: 18px;
}

.dialogSuccess .title{
  font-size: 20px;
}
</style>