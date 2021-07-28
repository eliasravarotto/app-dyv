
const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/auth/Login.vue') },
      { path: '/register', name: 'register', component: () => import('pages/auth/Register.vue') },
      { path: '/forgot-password', name: 'forgot_password', component: () => import('pages/auth/ForgotPassword.vue') },
    ]
    
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Home.vue'), meta: { requiresAuth: true }, },
      { path: 'notifications', name: 'notifications', component: () => import('pages/Notifications.vue'), meta: { requiresAuth: true }, },
      { path: 'menu', name: 'menu', component: () => import('pages/Menu.vue'), meta: { requiresAuth: true }, },
      { path: 'profile', name: 'profile', component: () => import('pages/Profile.vue'), meta: { requiresAuth: true }, },
      { path: 'my-vehicles', name: 'my_vehilces', component: () => import('pages/MyVehicles.vue'), meta: { requiresAuth: true }, },
      { path: 'pedir-turno', name: 'pedir_turno', component: () => import('pages/FormTurnoServicio.vue'), meta: { requiresAuth: true }, },
      { path: 'newsdyv', name: 'news_dyv', component: () => import('pages/NewsDyV.vue'), meta: { requiresAuth: true }, },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
