import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import  QrcodeReader from '../views/QrcodeReader.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'QrcodeReader',
      component: QrcodeReader
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    //   {
    //   path: '/qrcode-reader',
    //   name: 'QrcodeReader',
    //   component: () => import('../views/QrcodeReader.vue')
    // },
  ]
})

export default router
