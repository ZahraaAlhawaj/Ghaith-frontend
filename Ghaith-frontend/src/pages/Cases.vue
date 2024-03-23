<script>
import { getCases } from '../services/case'
import { ref } from 'vue'
export default {
  name: 'Cases',
  data: function () {
    return {
      slider3: 100,
      search: '',
      cases: [],
      collectedAmount: 0,
      percentage: []
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
  watch: {
    filteredCases: {
      deep: true,
      handler(newVal) {
        newVal.forEach((c, index) => {
          if (c.total_amount == 0) {
            this.percentage[index] = 0
          } else {
            this.percentage[index] = (c.collected_amount / c.total_amount) * 100
          }
        })
      }
    }
  },
  methods: {
    showCase(id) {
      this.$router.push(`/cases/${id}`)
    },
    async getCases() {
      const response = await getCases()
      this.cases = response
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
          <v-card-subtitle
            >Start Date: {{ formatDate(c.start_date) }}</v-card-subtitle
          >
          <v-card-subtitle
            >End Date: {{ formatDate(c.end_date) }}</v-card-subtitle
          >

          <div>
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
          </div>

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
