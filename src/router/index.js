import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Inicio from '../views/Inicio.vue'
import EditarUsuario from '../views/EditarUsuario.vue'
import Error from '../views/Error.vue'



const routes = [
  {
    path: '/:catchAll(.*)',
    name:'Error',
    component: Error

  },
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
  },
  {
    path:'/profile/:id?',
    name:'EditarPerfil',
    component: EditarUsuario

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
