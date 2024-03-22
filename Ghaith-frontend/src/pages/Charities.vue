<script>
import axios from 'axios'
const API_KEY = import.meta.env.VITE_GHAITH_API
export default {
  name: 'Charities',
  data: () => ({
    charities: null,
    transparent: 'rgba(255, 255, 255, 0)'
  }),
  mounted() {
    this.showAllCharity()
  },
  methods: {
    async showAllCharity() {
      const response = await axios.get(`${API_KEY}/charities`)
      this.charities = response.data
      console.log(this.charities)
    },
    showCharity(id) {
      this.$router.push(`/charity/${id}`)
    }
  }
}
</script>

<template>
  <h1>All Charities</h1>
  <!-- <v-card
    v-for="charity in charities"
    :key="charity._id"
    class="mx-auto"
    height="200"
    :image="charity.logo"
    max-width="300"
    max-height="350"
    theme="dark"
    @click="showCharity(charity._id)">
  </v-card> -->

  <v-container class="pa-4 text-center">
    <v-row align="center" class="fill-height" justify="center">
      <template v-for="(charity, i) in charities" :key="i">
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :class="{ 'on-hover': isHovering }"
              :elevation="isHovering ? 12 : 2"
              v-bind="props"
              @click="showCharity(charity._id)"
            >
              <v-img :src="charity.logo" height="225px" cover>
                <div class="align-self-center">
                  <v-card-title class="text-h6 text-white d-flex flex-column">
                    <p class="mt-4" v-if="isHovering">
                      {{ charity.name }}
                    </p>
                  </v-card-title>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card-title {
  color: red !important;
}

.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.on-hover {
  cursor: pointer;
}
</style>
