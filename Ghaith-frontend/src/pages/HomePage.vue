<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HomePage',
  setup() {
    const store = useStore()
    const isLoggedIn = computed(() => store.getters.isLoggedIn)
    const user = computed(() => store.getters.currentUser)
    console.log('user', user)

    return { isLoggedIn, user }
  },
  data: function () {
    return {}
  }
}
</script>

<template>
  <div v-if="isLoggedIn">
    <h1>User Is LoggedIn</h1>
    <h2>{{ user.name }}</h2>
  </div>
  <div v-else>
    <h1>User Is Not LoggedIn</h1>
  </div>
</template>
