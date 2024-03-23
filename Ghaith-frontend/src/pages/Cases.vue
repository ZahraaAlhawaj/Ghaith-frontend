<script>
import { getCases } from '../services/case'

export default {
  name: 'Cases',
  data: function () {
    return {
      slider3: 100,
      search: '',
      cases: []
    }
  },
  mounted() {
    this.getCases()
  },
  computed: {
    filteredCases() {
      return this.cases.filter((c) =>
        c.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    showCase(id) {
      this.$router.push(`/cases/${id}`)
    },
    async getCases() {
      const response = await getCases()
      this.cases = response
    }
  }
}
</script>

<template>
  <v-container>
    <h1>Cases</h1>

    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
    ></v-text-field>

    <v-row>
      <v-col
        v-for="(c, index) in filteredCases"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto" max-width="344" @click="showCase(c._id)">
          <v-img height="200px" :src="c.image" cover></v-img>

          <v-card-title>{{ c.name }}</v-card-title>
          <p>{{ c.code }}</p>

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
  </v-container>
</template>

<style>
.v-row {
  margin-top: 12px !important;
}
</style>
