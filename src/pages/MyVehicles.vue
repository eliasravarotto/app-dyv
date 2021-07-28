<template>
  <q-page padding>

    <HeaderComponent titulo="Mis Vehículos" :menu="menu" />

    <div class="content q-px-xs q-py-md bg-white">

      <!-- SKELETON -->
      <transition-group appear enter-active-class="animated fadeIn">
        <template v-if="!myVehicles">
          <q-skeleton key="sk1" width="100%" height="90px"/>
          <q-skeleton key="sk2" width="100%" height="90px" class="q-mt-sm q-mb-lg"/>
          <q-skeleton key="sk3" width="100%" type="QBtn" />
        </template>
      </transition-group>

      <!-- HAY VEHICULOS -->
      <transition-group appear enter-active-class="animated fadeIn">
        <template v-if="vehiclesEmpty">
          <q-banner class="bg-white" key="QBanner">
            <div class="row justify-center">
              <q-icon class="text-muted" name="info" style="font-size: 20px;"/> 
              <p class="text-muted q-ml-sm">No tiene vehículos asociados.</p>
            </div>
          </q-banner>
        </template>
      </transition-group>

      <!-- NO HAY VEHICULOS -->
      <transition-group appear enter-active-class="animated fadeIn">
        <template v-if="myVehicles">
          <q-list padding key="list">
            <q-item clickable v-ripple v-for="v in myVehicles" :key="v.id">
              <q-item-section thumbnail>
                <img :src="host+v.photo">
              </q-item-section>
              <q-item-section>
                <div class="text-caption text-weight-light">{{ v.dominio }}</div>
                {{ v.modelo }} {{ v.version }}
              </q-item-section>
            </q-item>
          </q-list>
          <q-btn 
            flat 
            icon="add"
            key="QBtn"
            label="Agregar Vehiculo" 
            @click="dialogAddVehicle = true" 
            class="full-width btn-outline-default q-mt-lg bg-white"  
          />
        </template>
      </transition-group>

    </div>

    <!-- ADD VEHICULO -->
    <q-dialog v-model="dialogAddVehicle" full-width>
      <q-card class="column full-height_">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6 text-grey-9">Agregar Vehículo</div>
          </q-card-section>

          <q-card-section class="col q-pt-none">
            <q-input v-model="formData.marca" value="TOYOTA" label="Marca" stack-label readonly/>
            <q-input v-model="formData.dominio" label="Dominio *"  :rules="[val => !!val || 'El dominio es requerido']"/>
            <q-select v-model="formData.modelo" :options="models" @input="setModelo()" label="Seleccionar modelo *" :rules="[val => !!val || 'Debe seleccionar un modelo']"/>
            <q-select v-model="formData.version" :options="versions" @input="setVersion()" label="Seleccionar versión" />
            <q-input v-model="formData.anio" label="Año" type="number"/>
            <q-input v-model="formData.kilometraje" label="Kilometraje"  />

          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="CANCELAR" v-close-popup />
            <q-btn label="AGREGAR" type="submit" color="secondary" :loading="submitting">
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- ERROR -->
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

  import HeaderComponent from 'components/HeaderComponent.vue'
  
  export default {
    name: 'MyVehicles',
    components: { HeaderComponent },
    data () {
      return {
        host: process.env.HOST,
        models: [],
        versions: [],
        myVehicles: null,
        submitting: false,
        vehiclesEmpty: false,
        showDialogError: false,
        dialogAddVehicle: false,
        formData: { marca: 'TOYOTA' },
        menu: [{ label: 'Agregar vehículo', action: 'showDialogAddVehicle()' }],
      }
    },
    mounted(){
      this.getModels()
      this.getMyVehicles()
    },
    methods:{
      getModels(){
        this.$axios.get('/modelos-versiones')
        .then(res => {
          res.data.data.forEach(item =>{
            item.label = item.modelo
            item.value = item.slug
          });
          this.models = res.data.data
        })
        .catch(error => {
          console.log(error)
          this.showDialogError = true
        })
      },
      getMyVehicles(){
        this.$axios.get('/user-vehicles')
        .then(res => {
          setTimeout(()=>{ 
            this.myVehicles = res.data.data
            if (res.data.data.length == 0)
              this.vehiclesEmpty = true
          }, 2500);
        })
        .catch(error => {
          console.log(error)
          this.showDialogError = true
        })
      },
      setModelo(){
        if (this.formData.modelo.versiones) {
          this.formData.modelo.versiones.forEach(item =>{
              item.label = item.version
              item.value = item.slug
            });
          this.versions = this.formData.modelo.versiones;
        }
      },
      setVersion(){
        this.formData.version = this.formData.version.version
      },
      showDialogAddVehicle(){
        this.dialogAddVehicle = true
      },
      onSubmit(){
        this.submitting = true
        this.formData.photo = this.formData.modelo.photo
        this.formData.modelo = this.formData.modelo.modelo
        this.$axios.post('/user-vehicles', this.formData)
          .then(res => {
            this.dialogAddVehicle = false
            this.submitting = false
            this.getMyVehicles()
          })
          .catch(error =>{
            console.log(error.response)
            this.showDialogError = true
          })
      }
    }
  }
</script>
