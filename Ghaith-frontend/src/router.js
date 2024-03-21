import { createWebHistory, createRouter } from "vue-router"

import HomePage from './pages/HomePage.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import About from './pages/About.vue'

const routes = [
  { path: '/', component: HomePage, name: 'HomePage' },

  { path: '/login', component: Login, name: 'Login' },

  { path: '/register', component: Register, name:'Register' },

  { path: '/about', component: About, name: 'About' },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
