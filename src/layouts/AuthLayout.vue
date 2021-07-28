<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="_bg-auth">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>


export default {
  name: 'AuthLayout',
  components: {  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
  .bg-auth{
    background: url('./../../public/appbg.png');
    background-size: cover;
  }
</style>
