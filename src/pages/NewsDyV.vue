<template>
  <q-page padding>

    <HeaderComponent titulo="Novedades DyV" />

    <!-- SKELETON -->
    <template v-if="!posts" >
      <div class="content q-px-xs q-py-md bg-white">
        <q-card flat class="full-width q-mb-lg" v-for="i in [1,2]" :key="i">
          <q-skeleton height="180px" square />
          <q-card-section>
            <q-skeleton type="text" class="text-subtitle1" />
            <q-skeleton type="text" width="50%" class="text-subtitle1" />
            <q-skeleton type="text" class="text-caption" />
          </q-card-section>
        </q-card>
      </div>
    </template>

    <!-- NO HAY POSTS -->
    <template v-if="postsEmpty">
      <transition appear enter-active-class="animated fadeIn">
        <div class="empty-posts row justify-center items-center">
          <div class="col-10 text-center">
            <q-icon name="feed" class="icon q-mb-md text-secondary" />
            <p class="q-mb-none q-mt-md title">No hay novedades</p>
            <p class="q-mb-none q-mt-md text-grey-8 description">No tenemos ningun post para mostrar en este momento</p>
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
      posts: null,
      postsEmpty: false
    }
  },
  mounted(){
    this.getPosts()
  },
  methods:{
    getPosts(){
      setTimeout(()=>{ 
        this.posts = [] 
        this.postsEmpty = true
      },2500)
    }
  }
}
</script>

<style lang="scss">
  .empty-posts{
    height: 75vh
  }
  .empty-posts .icon{
    font-size: 8rem
  }
  .empty-posts .title{
    font-size: 25px;
    color: #292929;
  }
  .empty-posts .description{
    font-size: 20px;
  }

  .q-list .q-item {

  }
</style>