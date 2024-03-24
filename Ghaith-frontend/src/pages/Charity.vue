<script>
import { getCharity, showCharityCases, donate } from '../services/charity'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Charity',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)

    return { user }
  },
  data: () => ({
    slider3: 100,
    charity: [],
    charityId: 0,
    charityCases: [],
    inputValue: 0.1,
    collectedAmount: 0,
    percentage: []
    amount: 0.1
  }),
  mounted() {
    this.charityId = this.$route.params.id
    this.showCharity(this.charityId)
    this.showCharityCases()
  },
  methods: {
    async showCharity(charityId) {
      const response = await getCharity(charityId)
      this.charity = response
    },
    async showCharityCases() {
      const response = await showCharityCases(this.charityId)
      this.charityCases = response
    },
    showCase(id) {
      this.$router.push(`/cases/${id}`)
    },
    async donate() {
      const amount = this.amount
      const response = await donate({
        charity: this.charityId,
        amount: amount,
        user: this.user ? this.user.id : null
      })
      if (response) {
        console.log('done')
      } else {
        console.log('something wrong')
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    }
  },
  watch: {
    charityCases: {
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
    <v-col cols="8">
      <v-text-field
        :type="'number'"
        label="Amount"
        v-model="amount"
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
</template>
<style scoped></style>
