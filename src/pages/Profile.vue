<template>
  <q-page padding>

    <HeaderComponent />

    <div class="content q-px-xs q-py-md bg-white">
    	
    	<q-item-label header>
    		<span class="title-1">Mi Perfil</span>
    	</q-item-label>

    	<q-form class="q-px-md" @submit="onSubmit">
		
		  	<q-input
					color="teal"
					v-model="data.name"
					label="Apellido y Nombre *"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'El nombre es requerido']">
				</q-input>

				<q-input
					color="teal"
					v-model="data.email"
					label="Email *"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'El email es requerido']">
				</q-input>

				<q-input
					color="teal"
					v-model="data.phone"
					label="Celular">
				</q-input>

				<q-input 
					label="Verificado"
					:value="user.verified ? 'Usuario verificado' : 'Usuario no verificado'" 
					readonly
					class="q-mt-sm">
				</q-input>

				<div class="row q-pt-xl">
					<div class="col-12 text-center">
						<q-btn 
	            type="submit" 
	            color="secondary"
	            label="Guardar"
	            :loading="submitting"
	            class="full-width btn-outline-default">
	            <template v-slot:loading>
	              <q-spinner-facebook />
	            </template>
	          </q-btn>
					</div>
	    	</div>
			</q-form>
  	</div>

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
  components: { HeaderComponent },
  data () {
    return {
      user: {},
      data: {},
      submitting: false,
      showDialogError: false,
    }
  },
  mounted(){
  	this.user = this.$q.localStorage.getItem('userData');
  	this.getUserData();
  },
  methods:{
  	getUserData(){
  		this.$axios.get('/users/'+this.user.id)
  			.then(res => {
  				this.data = res.data.data
  			})
  			.catch(err => {
  				console.log('Error al obtener datos del usuario.')
  				this.showDialogError = true
  			})

  	},
  	onSubmit(){
  		this.$axios.post('/users/'+this.user.id+'/edit', this.data)
  			.then(res => {
  				this.data = res.data.data;
  			})
  			.catch(err => {
  				console.log('Error al guardar datos del usuario.')
  				this.showDialogError = true
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