<script>
import { showCase } from '../services/case'
import axios from 'axios'
const API_KEY = import.meta.env.VITE_GHAITH_API
export default {
  name: 'Case',
  data: () => ({
    slider3: 100,
    casesId: 0,
    cases: [],
    inputValue: 0.1
  }),
  mounted() {
    this.casesId = this.$route.params.id
    this.showCase(this.casesId)
  },
  methods: {
    async showCase(casesId) {
      const response = await showCase(casesId)
      this.cases = response
    },
    async donate() {
      const response = await axios.post(
        `${API_KEY}/donations/case/${this.casesId}`,
        {
          amount: this.inputValue,
          user: '65fc0cac8c385f367f5fbe64'
        }
      )
      if (response) {
        console.log('done')
      } else {
        console.log('no')
      }
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
  <p>Start Date: {{ cases.start_date }}</p>
  <p>End Date: {{ cases.end_date }}</p>

  <v-row>
    <v-col cols="8">
      <v-text-field
        :type="'number'"
        label="Amount"
        v-model="inputValue"
        variant="solo"
        prefix="BD"
        :min="0.1"
        :step="0.1"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-btn
        prepend-icon="$vuetify"
        variant="outlined"
        size="x-large"
        @click="donate"
        >Donate</v-btn
      >
    </v-col>
  </v-row>
</template>
<style></style>
