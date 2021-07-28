<template>
  <q-header class="bg-white text-dark">
    <q-toolbar v-if="$route.name == 'home'">
      <q-toolbar-title>
        <q-avatar>
          <img src="~assets/dyv.svg">
        </q-avatar>
        DyVApp
      </q-toolbar-title>
      <q-btn color="dark" class="text-right" dense flat round icon="notifications" :to="{ name: 'notifications' }">
        <q-badge color="red" floating transparent>3</q-badge>
      </q-btn>
    </q-toolbar>
    <q-toolbar v-else>
      <q-btn color="dark" class="text-right"  flat rounded icon="arrow_back" v-go-back=" '/home' "/>
      <q-toolbar-title>{{ titulo }}</q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  props: ['titulo', 'subtitulo'],
  components: {  },
  name: 'HeaderComponent',
  data () {
    return {
      
    }
  },
  mounted(){}
}
</script>
