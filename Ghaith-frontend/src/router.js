import { createWebHistory, createRouter } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import About from './pages/About.vue'
import Charities from './pages/Charities.vue'
import Charity from './pages/Charity.vue'
import Cases from './pages/Cases.vue'
import Case from './pages/Case.vue'
import Request from './pages/Request.vue'
import Pickup from './pages/Pickup.vue'
import Events from './pages/Events.vue'

const routes = [
  { path: '/', component: HomePage, name: 'HomePage' },

  { path: '/login', component: Login, name: 'Login' },

  { path: '/register', component: Register, name: 'Register' },

  { path: '/about', component: About, name: 'About' },

  { path: '/charities', component: Charities, name: 'charities' },

  { path: '/charity/:id', component: Charity, name: 'charity' },

  { path: '/cases', component: Cases, name: 'cases' },

  { path: '/cases/:id', component: Case, name: 'case' },

  { path: '/request-case', component: Request, name: 'Request' },

  { path: '/pickup', component: Pickup, name: 'Pickup' },

  { path: '/events', component: Events, name: 'Events' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
