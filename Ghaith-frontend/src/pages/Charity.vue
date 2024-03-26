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
    amount: 0.1,
    select: { state: 'Florida', abbr: 'FL' },
    items: [
      { state: 'Florida', abbr: 'FL' },
      { state: 'Georgia', abbr: 'GA' },
      { state: 'Nebraska', abbr: 'NE' },
      { state: 'California', abbr: 'CA' },
      { state: 'New York', abbr: 'NY' }
    ]
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
          <p v-if="charity.user">{{ charity.user.email }}</p>
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
          <button class="donate-button" @click="donate">Donate</button>
        </div>

        <!-- <v-select
          v-model="select"
          :items="items"
          item-title="state"
          item-value="abbr"
          label="Select"
          return-object
          single-line
        ></v-select> -->
      </div>
    </div>

    <!-- <div class="charity-cases">
      <div
        class="case-card"
        v-for="(c, index) in charityCases"
        :key="index"
        @click="showCase(c._id)"
      >
        <img class="case-image" :src="c.image" alt="" />

        <h2 class="case-title">{{ c.name }}</h2>

        <div class="case-info">
          <p>Desired amount: {{ c.total_amount }} BD</p>
          <p>Start Date: {{ formatDate(c.start_date) }}</p>
          <p>End Date: {{ formatDate(c.end_date) }}</p>
        </div>

        <div class="case-progress">
          <div
            class="case-progress-bar"
            :style="{
              width:
                ((c.collected_amount / c.total_amount) * 100).toFixed(2) + '%'
            }"
          ></div>
          <strong class="case-progress-label">
            {{ ((c.collected_amount / c.total_amount) * 100).toFixed(2) }}%
          </strong>
        </div>

        <p class="case-details">Details</p>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.charity-page {
  display: flex;
  justify-content: center;
  align-items: center;
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
  /* background-color: #ccc; */
}

.text-section {
  text-align: center;
  background-color: #4b5f23; /* Add your desired background color */

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
  background-color: #4b5f23; /* Add your desired background color */

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
</style>
