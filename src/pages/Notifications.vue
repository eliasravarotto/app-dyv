<template>
  <q-page padding>

    <HeaderComponent titulo="Notificaciones" />

    <!-- SKELETON -->
    <template v-if="!notifications" >
      <div class="content q-px-xs q-py-md bg-white">
        <q-item class="full-width q-py-md" v-for="i in [1,2,3]" :key="i">
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </template>

    <!-- HAY NOTIFICACIONES -->
    <template v-if="notifications">
      <div v-if="notifications.length" class="content q-px-xs q-py-md bg-white" >
        <q-list  class="rounded-borders">
          <q-item clickable v-ripple v-for="item in notifications" :key="item.id">
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Brunch this weekend?</q-item-label>
              <q-item-label caption lines="2">
                <span class="text-weight-bold">Janet</span>
                -- I'll be in your neighborhood doing errands this
                weekend. Do you want to grab brunch?
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              1 min ago
            </q-item-section>
          </q-item>
          <!-- <q-separator inset="item" /> -->
        </q-list>
      </div>
    </template>

    <!-- NO HAY NOTIFICACIONES -->
    <template v-if="notificationsEmpty">
      <transition appear enter-active-class="animated fadeIn">
      <div class="empty-notifications row justify-center items-center">
        <div class="col-10 text-center">
          <q-icon name="circle_notifications" class="icon q-mb-md text-secondary" />
          <p class="q-mb-none q-mt-md title">No tenés notificaciones</p>
          <p class="q-mb-none q-mt-md text-grey-8 description">No tenemos ninguna notificación para mostrar en este momento</p>
        </div>
      </div>
    </transition>
    </template>

  </q-page>
</template>

<script>

import HeaderComponent from 'components/HeaderComponent.vue'

export default {
  components: { HeaderComponent },
  data () {
    return {
      notifications: null,
      notificationsEmpty: false,
    }
  },
  mounted(){
    setTimeout(()=>{
      this.notifications = [{label: 'lab'},{label: 'lab'},{label: 'lab'}]
      if (this.notifications.length == 0)
        this.notificationsEmpty = true
    }, 2500)
  }
}
</script>

<style lang="scss">
  .empty-notifications{
    height: 75vh
  }
  .empty-notifications .icon{
    font-size: 8rem
  }
  .empty-notifications .title{
    font-size: 25px;
    color: #292929;
  }
  .empty-notifications .description{
    font-size: 20px;
  }

  .q-list .q-item {

  }
</style>