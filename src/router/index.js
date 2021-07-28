import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import { LocalStorage, SessionStorage } from 'quasar'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (store/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })


  Router.beforeEach((to, from, next) => {
    // Ver si alguna ruta tiene meta = "requiresAuth"
    if (to.matched.some(route => route.meta.requiresAuth)) {
      // Ver si el usuario esta logueado, tiene token valido
      Vue.prototype.$axios
        .get('/verify-token')
        .then(res => {
          if (res.data.success) {
            // User is authenticated, we allow access.
            next();
          } else {
            // User is not authenticated.
            next("/");
          }
        })
        .catch(err => {
          // Error | Token Blacklisted
            next("/");
        })  
        
    } else {
      next();
    }
  });

  return Router
}
