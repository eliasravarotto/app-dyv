<template>
  <q-layout view="hHh lpR fFf" class="bg-light">

    <q-page-container>
      <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
      <router-view />
      </transition>
    </q-page-container>

    <FooterComponent />

  </q-layout>
</template>

<script>

import FooterComponent from 'components/FooterComponent.vue'

export default {
  name: 'MainLayout',
  components: { FooterComponent },
  data () {
    return {
      left: false,
      tab: 'home'
    }
  },
  mounted(){
    console.log("Quasar Version: " + this.$q.version)
  }
}
</script>
