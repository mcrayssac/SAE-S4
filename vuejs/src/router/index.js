import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Graphics from '../views/Graphics.vue'
import Predictions from '../views/Predictions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/graphics',
    name: 'graphics',
    component: Graphics
  },
  {
    path: '/predictions',
    name: 'predictions',
    component: Predictions
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
