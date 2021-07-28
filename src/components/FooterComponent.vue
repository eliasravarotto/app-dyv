<template>
  <q-footer elevated class="bg-white text-white">
      <q-toolbar>
        <q-toolbar-title>
        <q-tabs
          v-model="tab"
          class="bg-white text-dark shadow-2 tab-footer"
        >
          <q-route-tab exact name="home" label="Inicio" icon="home" :to="{ name: 'home' }" />
          <q-route-tab exact name="news" label="News DyV" icon="feed" :to="{ name: 'news_dyv' }"/>
          <q-route-tab exact name="profile" label="Perfil" icon="account_circle" :to="{ name: 'profile' }"/>
          <q-route-tab exact name="menu" label="Menu" icon="menu" :to="{ name: 'menu' }"/>
          </q-tabs>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
</template>

<script>

export default {
  name: 'FooterComponent',
  data () {
    return {
      tab: ''
    }
  },
  mounted(){}
}
</script>