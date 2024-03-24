<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HomePage',
  setup() {
    const store = useStore()
    const isLoggedIn = computed(() => store.getters.isLoggedIn)
    const user = computed(() => store.getters.currentUser)

    return { isLoggedIn, user }
  },
  data: function () {
    return {
        items: [
          {
            src: `images/1.jpg`,
          },
          {
            src: `images/2.jpg`,
          },
          {
            src: `images/3.jpg`,
          },
        ],
      }
  }
}
</script>

<template>
  <div class="carousel-wrapper">
 <v-carousel
 :show-arrows="false"
    cycle
    hide-delimiter-background
  >
  
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      cover
    ></v-carousel-item>
  </v-carousel>
</div>

  <div v-if="isLoggedIn">
    <h1>User Is LoggedIn</h1>
    <h2>{{ user.name }}</h2>
  </div>
  <div v-else>
    <h1>User Is Not LoggedIn</h1>
  </div>


</template>


<style>
.carousel-wrapper {
  margin-top: -2.5%; /* Adjust the negative margin to remove the space above */
}
</style>