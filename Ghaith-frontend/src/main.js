import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import store from './store'
import VueSocialSharing from 'vue-social-sharing'

const vuetify = createVuetify({
  components,
  directives
})

createApp(App)
  .use(store)
  .use(router)
  .use(VueSocialSharing)
  .use(vuetify)
  .mount('#app')
