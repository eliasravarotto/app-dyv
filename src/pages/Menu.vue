<template>
  <q-page padding>

    <HeaderComponent titulo="Menú" />

    <div class="content q-px-xs q-py-md bg-white">
    	
    	<q-item-label header>
    		<span class="title-1">{{ user.name }}</span>
    	</q-item-label>
      
    	<q-list padding>

	      <q-item clickable v-ripple :to="{ name: 'profile' }">
	        <q-item-section>
	          <q-item-label>Perfil</q-item-label>
	        </q-item-section>
	      </q-item>

	      <q-separator spaced />
	      
	      <q-item clickable v-ripple @click="logout()">
	        <q-item-section>
	          <q-item-label><q-icon name="logout" class="q-mr-sm" /> Cerrar Sesión</q-item-label>
	        </q-item-section>
	      </q-item>

	  </q-list>
    </div>

  </q-page>
</template>

<script>

import HeaderComponent from 'components/HeaderComponent.vue'

export default {
  components: { HeaderComponent },
  data () {
    return {
      user: {}
    }
  },
  mounted(){
  	this.user = this.$q.localStorage.getItem('userData');
  },
  methods:{
  	logout(){
  		this.$axios.get('/auth/logout', this.data)
  			.then(res => {
  				let notify = {};
				  notify.message = res.data.message;
				  notify.multiLine = false;
				  notify.type = 'success';
				  this.showNotify(notify);
  				this.$router.push({name: "login"});
  			})
  			.catch(err => {
  				console.log('Error al intrentar cerrar sesión.')
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