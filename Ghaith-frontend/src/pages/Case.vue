<script>
import axios from 'axios'
const API_KEY = import.meta.env.VITE_GHAITH_API
export default {
  name: 'Case',
  data: () => ({
    slider3: 100,
    casesId: 0,
    cases: []
  }),
  mounted() {
    this.casesId = this.$route.params.id
    this.showCase(this.casesId)
  },
  methods: {
    async showCase(casesId) {
      const response = await axios.get(`${API_KEY}/cases/${casesId}`)
      this.cases = response.data
      console.log(this.cases)
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    }
  }
}
</script>
<template>
  <h1>Case Page</h1>
  <img height="200" :src="cases.image" alt="" />
  <p>code: {{ cases.code }}</p>
  <p v-if="cases.category">{{ cases.category.name }}</p>
  <h2>{{ cases.name }}</h2>
  <p>Description: {{ cases.description }}</p>
  <p v-if="cases.charity">Charity: {{ cases.charity.name }}</p>
  <p>Desired Amount: {{ cases.total_amount }}</p>
  <p v-if="cases.collected_amount">
    Collected Amount: {{ cases.collected_amount }}
  </p>
  <p>Start Date: {{ formatDate(cases.start_date) }}</p>
  <p>End Date: {{ formatDate(cases.end_date) }}</p>
</template>
<style></style>
