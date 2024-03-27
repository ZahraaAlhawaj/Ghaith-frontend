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
    percentage: [],
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
  <div class="charity-page">
    <div class="center">
      <v-card class="charity-card">
        <div class="image-section">
          <img
            height="200"
            max-width="200"
            max-height="200"
            :src="charity.logo"
            alt=""
          />
        </div>
        <div class="divider"></div>
        <div class="text-section">
          <h1>{{ charity.name }}</h1>
          <!-- <p v-if="charity.user">{{ charity.user.email }}</p> -->
        </div>
      </v-card>

      <div class="donation-card">
        <div class="amount-section">
          <label for="amount">Amount</label>
        </div>

        <div class="input-section">
          <input
            type="number"
            id="amount"
            placeholder="amount"
            v-model="amount"
            min="0.1"
            step="0.1"
          />
        </div>

        <div class="button-section">
          <v-snackbar
            :timeout="2000"
            color="#b1bf5c"
            :top="true"
            elevation="24"
            class="custom-snackbar"
          >
            <template v-slot:activator="{ props }">
              <button v-bind="props" class="donate-button" @click="donate">
                Donate
              </button>
            </template>
            Donate <strong>Successfully</strong>.
          </v-snackbar>
        </div>
      </div>
    </div>

    <v-container class="pa-4 text-center">
      <v-row align="center" class="fill-height" justify="center">
        <template
          class="card1"
          v-for="(c, index) in charityCases"
          :key="index"
          @click="showCase(c._id)"
        >
          <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                class="CaseCharityCard"
                :elevation="isHovering ? 12 : 2"
                v-bind="props"
                @click="showCase(c._id)"
              >
                <v-img :src="c.image" cover> </v-img>

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
                <br />
                <v-card-title>{{ c.name }}</v-card-title>

                <v-card-subtitle>code: {{ c.code }}</v-card-subtitle>

                <v-card-subtitle
                  >Desired amount: {{ c.total_amount }} BD</v-card-subtitle
                >
                <div class="date-style">
                  <div class="date-label">
                    <p>Start Date</p>
                    <p>End Date</p>
                  </div>
                  <div class="date-value">
                    <p>{{ formatDate(c.start_date) }}</p>
                    <p>{{ formatDate(c.end_date) }}</p>
                  </div>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.charity-page {
  display: flex;
  justify-content: space-between;
  padding: 3% 14%;
}

.v-row {
  justify-content: space-around !important;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.center {
  justify-content: center;
}
.charity-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 2%;
  width: 100%;
  border: 0.12em solid #4b5f23;
  background-color: #e6e5d0;
  justify-content: center;
}

.image-section {
  margin-bottom: -0.8%;
  text-align: center;
}

.divider {
  width: 100%;
  height: 1px;
}

.text-section {
  text-align: center;
  background-color: #4b5f23;

  border-radius: 4px;
  width: 100%;
  color: #e6e5d0;
  padding: 10px;
}

.text-section h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: -0.8%;
}

.text-section p {
  font-size: 18px;
}

.donation-card {
  margin-top: 5%;
  margin-bottom: 6%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  width: 100%;
  border: 0.12em solid #4b5f23;
  background-color: #e6e5d0;
}

.amount-section {
  text-align: center;
  background-color: #4b5f23;

  width: 100%;
  color: #e6e5d0;
  padding: 10px;
}

.donate-button {
  background-color: #4b5f23;
  color: #e6e5d0;
  border: none;
  border-radius: 4px;
  padding: 5% 10%;
  transition: background-color 0.3s ease;
  margin-bottom: 10%;
  margin-top: 10%;
}

.donate-button:hover {
  background-color: #627638;
}

.input-section input {
  margin-top: 5%;
  padding: 10px;
  border: 2px solid #4b5f23;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-section input:focus {
  border-color: #6e8247;
}

.CaseCharityCard {
  width: 18em;
  height: 28em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 0.2em solid #4b5f23;
  background-color: #e6e5d0;
  object-fit: contain !important;
  padding: 0 0 7% 0;
}

.v-img {
  width: 100%;
  height: 50%;
  object-fit: cover !important;
}

.pa-4 {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  color: #4b5f23;
  text-transform: capitalize;
  margin-bottom: 1%;
}

.image-cover {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.v-img__img--cover {
  object-fit: cover !important;
}

.v-progress-linear {
  margin-bottom: -10%;
}

.date-style {
  display: flex;
  flex-direction: column;
  width: 80%;
  font-size: 15px;
}

.date-label {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.date-value {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
