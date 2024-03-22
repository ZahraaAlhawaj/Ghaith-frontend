<script>
import axios from 'axios'
const API_KEY = import.meta.env.VITE_GHAITH_API
export default {
  name: 'Charity',
  data: () => ({
    charity: [],
    charityId: 0
  }),
  mounted() {
    this.charityId = this.$route.params.id
    this.showCharity(this.charityId)
  },
  methods: {
    async showCharity(charityId) {
      const response = await axios.get(`${API_KEY}/charities/${charityId}`)
      this.charity = response.data
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
</template>
<style scoped></style>
