<script>
import axios from 'axios'
const API_KEY = import.meta.env.VITE_GHAITH_API
export default {
  name: 'Charities',
  data: () => ({
    charities: null
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
    showCharity() {
      this.$router.push(`/charity/1`)
    }
  }
}
</script>

<template>
  <h1>All Charities</h1>
  <v-card
    v-for="charity in charities"
    :key="charity._id"
    class="mx-auto"
    height="200"
    :image="charity.logo"
    max-width="300"
    max-height="350"
    theme="dark"
    @click="showCharity"
  >
    <v-hover>
      <template v-slot:default="{ hover }">
        <div
          class="card-image"
          :style="{ 'background-image': `url(${charity.logo})` }"
        >
          <div v-if="hover" class="title-overlay">
            {{ charity.title }}
          </div>
        </div>
      </template>
    </v-hover>
  </v-card>
</template>

<style>
.v-card-title {
  color: red !important;
}

.card-image {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  font-size: 18px;
}
</style>
