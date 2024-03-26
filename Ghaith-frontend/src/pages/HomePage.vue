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
          src: `images/1.jpg`
        },
        {
          src: `images/2.jpg`
        },
        {
          src: `images/3.jpg`
        }
      ],
      interval: {},
      value: 0
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
  }
}
</script>

<template>
  <div class="carousel-wrapper">
    <v-carousel :show-arrows="false" cycle hide-delimiter-background>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        cover
      ></v-carousel-item>
    </v-carousel>
  </div>

  <div v-if="isLoggedIn">
    <!-- <h1>User Is LoggedIn</h1> -->
    <h2>{{ user.name }}</h2>
  </div>
  <div v-else>
    <!-- <h1>User Is Not LoggedIn</h1> -->
  </div>


<!-- mission and vission -->
<div class="mission-vision-container">
  <div class="mission-section">
    <div class="mission-icon">
      <!-- mission icon -->
    </div>
    <h3 class="section-title">Our Mission</h3>
    <p class="section-description">
      Ghaith's mission is to empower individuals and communities through kindness, connecting donors with causes, supporting those in need, and inspiring compassion for a thriving world.
    </p>
  </div>
  <div class="vision-section">
    <div class="vision-icon">
      <!-- vision icon  -->
    </div>
    <h3 class="section-title">Our Vision</h3>
    <p class="section-description">
      Ghaith envisions a world where boundless kindness transforms lives, serving as a beacon of hope and driving positive change for all.
    </p>
  </div>
</div>


  <!-- chart -->

  <div class="text-center">
    <div class="progress-container">
      <v-progress-circular
        :model-value="value"
        :rotate="360"
        :size="100"
        :width="15"
        color="#4b5f23"
      >
        <p class="value">{{ value }}</p>
      </v-progress-circular>
      <span class="progress-text">Teal Progress</span>
    </div>

    <div class="progress-container">
      <v-progress-circular
        :model-value="value"
        :rotate="-90"
        :size="100"
        :width="15"
        color="#4b5f23"
      >
        <p class="value">{{ value }}</p>
      </v-progress-circular>
      <span class="progress-text">Teal Progress</span>
    </div>

    <div class="progress-container">
      <v-progress-circular
        :model-value="value"
        :rotate="90"
        :size="100"
        :width="15"
        color="#4b5f23"
      >
        <p class="value">{{ value }}</p>
      </v-progress-circular>
      <span class="progress-text">Teal Progress</span>
    </div>

    <div class="progress-container">
      <v-progress-circular
        :model-value="value"
        :rotate="180"
        :size="100"
        :width="15"
        color="#4b5f23"
      >
        <p class="value">{{ value }}</p>
      </v-progress-circular>
      <span class="progress-text">Teal Progress</span>
    </div>
  </div>



  
</template>

<style scoped>
.carousel-wrapper {
  margin-top: -2.5%; /* Adjust the negative margin to remove the space above */
}

.v-progress-circular {
  margin: 1rem;
}

.title {
  margin-top: 110%;
}

.text-center {
  display: flex;
  justify-content: center;
}

.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  margin-bottom: 3%;
  text-align: center;
}

.progress-text {
  margin-top: -0.02%;
  color: #4b5f23;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 80%;
}

.value {
  font-weight: bold;
  font-size: 120%;
}

/* mision and vision */
.mission-vision-container {
  display: flex;
}

.mission-section,
.vision-section {
  flex: 1;
}

.section-title {
  margin-top: 10px;
  font-weight: bold;
}

.section-description {
  margin-top: 5px;
}

</style>
