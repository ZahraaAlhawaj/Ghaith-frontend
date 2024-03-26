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
      item: [
        {
          color: '#4b5f23',
          icon: 'mdi-star',
          title: 'Our Vision',
          text: 'Ghaith envisions a world where boundless kindness transforms lives, serving as a beacon of hope and driving positive change for all.'
        },
        {
          color: '#4b5f23',
          icon: 'mdi-book-variant',
          title: 'Our Mission',
          text: 'Ghaith envisions a world where boundless kindness transforms lives, serving as a beacon of hope and driving positive change for all.'
        },
        {
          color: '#4b5f23',
          icon: 'mdi-airballoon',
          title: 'Our Vision',
          text: 'Ghaith envisions a world where boundless kindness transforms lives, serving as a beacon of hope and driving positive change for all.'
        }
      ].map((item) => {
        item.iconColor = '#e6e5d0'
        return item
      }),

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

  <div class="timeline-container">
    <v-timeline align="start">
      <v-timeline-item
        :class="item.class"
        v-for="(item, i) in item"
        :key="i"
        :dot-color="item.color"
        :icon="item.icon"
        :icon-color="item.iconColor"
        fill-dot
      >
        <v-card class="custom-timeline-item">
          <v-card-title class="about-title">
            {{ item.title }}
          </v-card-title>
          <v-card-text class="bg-white">
            <p>{{ item.text }}</p>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
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
.custom-timeline-item {
  margin-bottom: 10%;
  border: 0.12em solid #4b5f23;
  background-color: #e6e5d0;
}

.custom-card {
  width: 300%;
  height: 200%;
}

.about-title {
  background-color: #4b5f23;
  color: #e6e5d0;
}

.bg-white {
  background-color: #e6e5d0;
  color: #4b5f23;
}

.timeline-container {
  display: flex;
  justify-content: center;
  width: 70%; /* Adjust the width as per your preference */
  margin: 0 auto; /* Center the container horizontally */
}

.v-card-title .v-card-text {
  padding-top: 10%;
}

.v-card .v-card-text {
  padding-top: 3%;
  background: #e6e5d0 !important;
}
</style>
