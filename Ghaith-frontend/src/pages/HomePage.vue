<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { getStatistics } from '../services/donation'
import { findUrgentCases } from '../services/case'

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
      numberOfDonations: 0,
      numberOfCharities: 0,
      numberOfCategories: 0,
      totalAmountDonations: 0,
      urgentCases: [],
      item: [
        {
          color: '#b1bf5c',
          icon: 'mdi-star',
          title: 'Our Vision',
          text: 'Ghaith envisions a world where boundless kindness transforms lives, serving as a beacon of hope and driving positive change for all.',
          textColor: '#4b5f23'
        },
        {
          color: '#b1bf5c',
          icon: 'mdi-book-variant',
          title: 'Our Mission',
          text: 'Ghaith envisions a world where boundless kindness transforms lives, serving as a beacon of hope and driving positive change for all.',
          textColor: '#4b5f23'
        },
        {
          color: '#b1bf5c',
          icon: 'mdi-airballoon',
          title: 'Our Vision',
          text: 'Ghaith envisions a world where boundless kindness transforms lives, serving as a beacon of hope and driving positive change for all.',
          textColor: '#4b5f23'
        }
      ].map((item) => {
        ;(item.iconColor = '#4b5f23'), (item.borderColor = '#B1BF5C')

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
    this.getStatistics()
    this.getUrgentCases()
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
  },
  methods: {
    async getStatistics() {
      const response = await getStatistics()
      this.numberOfDonations = response.numberOfDonations
      this.numberOfCharities = response.numberOfCharities
      this.numberOfCategories = response.numberOfCategories
      this.totalAmountDonations = response.totalAmountDonations.toFixed(2)
    },
    async getUrgentCases() {
      const response = await findUrgentCases()
      console.log(response)
    }
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

  <!--<div v-if="isLoggedIn">
     <h1>User Is LoggedIn</h1>
    <h2>{{ user.name }}</h2>
  </div>
  <div v-else>  -->
  <!-- <h1>User Is Not LoggedIn</h1> 
  </div>-->
  <!-- Urgent Cases -->

  <!-- <v-container class="pa-4 text-center">

  <v-row align="center" class="fill-height" justify="center">
      <template class="card1" v-for="(c, index) in filteredCases" :key="index">
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :elevation="isHovering ? 12 : 2"
              v-bind="props"
              @click="showCase(c._id)"
            >
              <v-img :src="c.image" cover> </v-img>

              <v-progress-linear
                v-model="percentage[index]"
                height="25"
                color="green"
              >
                <strong
                  >{{
                    ((c.collected_amount / c.total_amount) * 100).toFixed(2)
                  }}%</strong
                >
              </v-progress-linear>
              <br />
              <v-card-title>{{ c.name }}</v-card-title>

              <v-card-subtitle>code: {{ c.code }}</v-card-subtitle>

              <v-card-subtitle
                >Desired amount: {{ c.total_amount }} BD</v-card-subtitle
              >
              <div class="date-style">
                <div class="date-label">
                  <p>Start Date</p>
                  <p>End Date</p>
                </div>
                <div class="date-value">
                  <p>{{ formatDate(c.start_date) }}</p>
                  <p>{{ formatDate(c.end_date) }}</p>
                </div>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container> -->

  <!-- mission and vission -->
  <!-- <div style="background-color: white" class="misson"></div> -->
  <div class="misson">
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
          <template v-slot:icon>
            <div class="icon-border">
              <v-icon class="custom-icon" :color="item.iconColor">{{
                item.icon
              }}</v-icon>
            </div>
          </template>

          <v-card class="custom-timeline-item">
            <v-card-title class="about-title">
              {{ item.title }}
            </v-card-title>
            <v-card-text class="bg-white">
              <p :style="{ color: item.textColor }">{{ item.text }}</p>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </div>
  </div>

  <!-- chart -->

  <br />
  <br />
  <div class="text-center">
    <div class="progress-container">
      <v-progress-circular
        :model-value="numberOfDonations"
        :size="150"
        :width="16"
        color="#4b5f23"
      >
        <p class="value">{{ numberOfDonations }}</p>
      </v-progress-circular>
      <span class="progress-text progress-color1">Number of Donations</span>
    </div>

    <div class="progress-container">
      <v-progress-circular
        :model-value="numberOfCharities"
        :size="150"
        :width="16"
        color="#748132"
      >
        <p class="value">{{ numberOfCharities }}</p>
      </v-progress-circular>
      <span class="progress-text progress-color2">Number of Charities</span>
    </div>

    <div class="progress-container">
      <v-progress-circular
        :model-value="numberOfCategories"
        :size="150"
        :width="16"
        color="#96A640"
      >
        <p class="value">{{ numberOfCategories }}</p>
      </v-progress-circular>
      <span class="progress-text progress-color3">Number of Categories</span>
    </div>

    <div class="progress-container">
      <v-progress-circular
        :model-value="totalAmountDonations"
        :size="150"
        :width="16"
        color="#AFBF58"
      >
        <p class="value">{{ totalAmountDonations }}BD</p>
      </v-progress-circular>
      <span class="progress-text progress-color4"
        >Total Amount of Donations</span
      >
    </div>
  </div>
</template>

<style scoped>
.carousel-wrapper {
  margin-top: -1.5%; /* Adjust the negative margin to remove the space above */
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

.progress-color2 {
  color: #748132;
}

.progress-color3 {
  color: #96a640;
}

.progress-color4 {
  color: #afbf58;
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
  background-color: #b1bf5c;
  color: #4b5f23;
}

.bg-white {
  background-color: #ffffff;
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

.v-card-text .bg-white {
  color: #4b5f23;
}

.misson {
  margin-top: 0%;
}

.icon-border {
  display: inline-block;
  border: 0.12em solid #4b5f23;
  border-radius: 50%; /* Optional: Applies a circular border */
  padding: 15%; /* Optional: Adjust the padding around the icon */
}
</style>
