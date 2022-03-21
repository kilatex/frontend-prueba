import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Inicio from '../views/Inicio.vue'

const routes = [
  {
    path: '/',
    name:'Inicio',
    component: Inicio
  },  
  {
    path: '/login',
    name:'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name:'Dashboard',
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
