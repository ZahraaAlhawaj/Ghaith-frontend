<script>
import axios from 'axios'
const API_KEY = import.meta.env.VITE_GHAITH_API
export default {
  name: 'Charity',
  data: () => ({
    slider3: 100,
    charity: [],
    charityId: 0,
    charityCases: []
  }),
  mounted() {
    this.charityId = this.$route.params.id
    this.showCharity(this.charityId)
    this.showCharityCases()
  },
  methods: {
    async showCharity(charityId) {
      const response = await axios.get(`${API_KEY}/charities/${charityId}`)
      this.charity = response.data
    },
    async showCharityCases() {
      const response = await axios.get(
        `${API_KEY}/cases/charity/${this.charityId}`
      )
      this.charityCases = response.data
      console.log(this.charityCases)
    },
    showCase(id) {
      this.$router.push(`/cases/${id}`)
    }
  }
}
</script>
<template>
  <h1>{{ charity.name }}</h1>
  <img
    height="200"
    max-width="200"
    max-height="200"
    :src="charity.logo"
    alt=""
  />
  <p v-if="charity.user">{{ charity.user.email }}</p>

  <v-row>
    <v-col
      v-for="(c, index) in charityCases"
      :key="index"
      cols="12"
      sm="6"
      md="4"
    >
      <v-card class="mx-auto" max-width="344" @click="showCase(c._id)">
        <v-img height="200px" :src="c.image" cover></v-img>

        <v-card-title>{{ c.name }}</v-card-title>

        <v-card-subtitle
          >Desired amount: {{ c.total_amount }} BD</v-card-subtitle
        >
        <v-card-subtitle>Start Date: {{ c.start_date }}</v-card-subtitle>
        <v-card-subtitle>End Date: {{ c.end_date }}</v-card-subtitle>

        <v-slider
          label=""
          color="green"
          v-model="slider3"
          model-value="30"
          readonly
        ></v-slider>
        <p>Details</p>
      </v-card>
    </v-col>
  </v-row>
</template>
<style scoped></style>
