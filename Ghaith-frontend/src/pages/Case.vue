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
    }
  }
}
</script>
<template>
  <h1>Case Page</h1>
</template>
<style></style>
