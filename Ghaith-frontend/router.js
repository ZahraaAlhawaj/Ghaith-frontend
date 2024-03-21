import { createWebHistory, createRouter } from "vue-router"

import HomePage from './pages/HomePage.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import AboutPage from './pages/AboutPage.vue'

const routes = [
  { path: '/', component: HomePage, name: 'HomePage' },

  { path: '/login', component: Login, name: 'Login' },

  { path: '/register', component: Register, name:'Register' },

  { path: '/about', component: AboutPage, name: 'AboutPage' },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
