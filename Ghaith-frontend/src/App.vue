<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)
    const isLoggedIn = computed(() => store.getters.isLoggedIn)

    return { isLoggedIn, user }
  },
  components: {
    Footer,
    Header
  },
  methods: {
    isAdmin() {
      if (
        this.isLoggedIn &&
        (this.user.role === 'Super Admin' || this.user.role === 'Admin')
      ) {
        return true
      }
      return false
    },
    adminOnboading() {
      if (this.isAdmin() && this.user.onboarding === false) {
        return false
      }
      return true
    }
  }
}
</script>

<template>
  <div :class="isAdmin() ? 'adminMainApp' : 'mainApp'">
    <Header v-if="adminOnboading()" />
    <main class="content">
      <router-view></router-view>
    </main>

    <Footer v-if="!isAdmin()" />
  </div>
</template>
