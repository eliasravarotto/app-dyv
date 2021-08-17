<template>
  <q-page class="">

    <HeaderComponent />

    <FirstStepsComponent />
    
    <!-- MIS VEHICULOS -->
    <template>
      <div class="row q-pa-md q-mb-sm">
        <div class="full-width relative-position" @click="goTo('my_vehilces')" v-ripple:purple>
          <q-card class="my-card full-width ">
            <q-card-section class="flex items-center" style="justify-content: space-between;">
              <div class="flex items-center">
                <div class="q-mr-lg">
                  <img src="~assets/logo-toyota-h.svg" width="65">
                </div>
                <div>
                  <div class="">Mis</div>
                  <div class="text-h6">Vehículos</div>
                </div>
              </div>
              <div>
                <q-btn flat style="color: #FF0080" icon="chevron_right" :to="{ name: 'my_vehilces' }"/>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>

    <!-- QUICKS ACCESS -->
    <template>
      <div class="row q-pa-md">
        <div class="col-12">
          <div class="text-h6">¿En qué podemos ayudarte?</div>
        </div>
      </div>

      <div class="row q-pa-md">
        <div class="col-2">
          <div class="quick-btn relative-position" @click="goTo('pedir_turno')" v-ripple:purple>
            <div class="btn-icon">
              <q-icon name="construction" />
            </div>
            <div class="text-center q-mt-sm caption">
              <p class="q-mb-none">Pedir</p>
              <p>Turno</p>
            </div>
          </div>
        </div>
      </div>
    </template>

  </q-page>
</template>

<script>
import HeaderComponent from 'components/HeaderComponent.vue'
import FirstStepsComponent from 'components/FirstStepsComponent.vue'

export default {
  name: 'PageHome',
  components: { HeaderComponent, FirstStepsComponent },
  data () {
    return {
    }
  },
  mounted(){
  },
  methods:{
    goTo(routeName){
      setTimeout(()=>{
        this.$router.push({name: routeName})
      }, 350)
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

<style lang="scss">
.text-h6 {
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: 0.0125em;
}
  .quick-btn .q-btn{
    padding: 6px;
  }
  .quick-btn .btn-icon{
    /*height:  50px;*/
    /*width: 50px;*/
    display: flex;
    justify-content:  center;
    align-items: center;
    font-size: 35px;
    background-color:white;
    padding: 15px;
    border-radius: 10px;
    color: $grey-9;
  }
  .quick-btn .btn-caption{
    color: grey-8
  }
</style>