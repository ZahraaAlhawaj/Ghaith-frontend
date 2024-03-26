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
import Profile from './pages/Profile.vue'
import Text from './pages/text.vue'
import AdminHomePage from './admin/AdminHomePage.vue'
import Users from './admin/Users.vue'
import Categories from './admin/Categories.vue'
import AdminCharities from './admin/Charities.vue'
import ResetPassword from './admin/ResetPassword.vue'
import AdminDonations from './admin/Donations.vue'
import AdminCases from './admin/Cases.vue'
import AdminPickup from './admin/Pickup.vue'

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

  { path: '/events', component: Events, name: 'Events' },

  { path: '/Profile', component: Profile, name: 'Profile' },
  { path: '/text', component: Text, name: 'Text' },

  { path: '/admin', component: AdminHomePage, name: 'AdminHomePage' },

  { path: '/admin/users', component: Users, name: 'Users' },

  { path: '/admin/categories', component: Categories, name: 'Categories' },

  {
    path: '/admin/donations',
    component: AdminDonations,
    name: 'AdminDonations'
  },

  {
    path: '/admin/charities',
    component: AdminCharities,
    name: 'AdminCharities'
  },

  {
    path: '/admin/reset',
    component: ResetPassword,
    name: 'ResetPassword'
  },

  { path: '/admin/categories', component: Categories, name: 'Categories' },
  { path: '/admin/cases', component: AdminCases, name: 'AdminCases' },
  { path: '/admin/pickup', component: AdminPickup, name: 'AdminPickup' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
