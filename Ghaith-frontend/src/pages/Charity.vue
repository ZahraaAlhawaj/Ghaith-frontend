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
    <h1>{{ charity.name }}</h1>
    <img
      height="200"
      max-width="200"
      max-height="200"
      :src="charity.logo"
      alt=""
    />
    <p v-if="charity.user">{{ charity.user.email }}</p>

    <div class="donation-card">
      <div class="donation-input">
        <label for="amount" class="donation-input-label">Amount</label>
        <input
          type="number"
          id="amount"
          v-model="amount"
          min="0.1"
          step="0.1"
        />
      </div>
      <button class="donation-btn" @click="donate">Donate</button>
    </div>

    <div class="charity-cases">
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
    </div>
  </div>
</template>

<style scoped>
.charity-page {
  text-align: center;
  padding: 20px;
}

.charity-page h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.charity-page img {
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
}

.charity-page .donation-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.charity-page .donation-input {
  flex: 0 0 70%;
}

.charity-page .donation-input input {
  width: 100%;
  padding: 5px;
}

.charity-page .donation-input-label {
  display: block;
  margin-bottom: 5px;
}

.charity-page .donation-btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f7f7f7;
}

.charity-page .charity-cases {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.charity-page .case-card {
  margin: 20px;
  width: 300px;
  text-align: left;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px #4b5f23;
}

.charity-page .case-card:hover {
  box-shadow: 0 4px 8px #4b5f23;
}

.charity-page .case-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.charity-page .case-title {
  font-size: 18px;
  margin: 10px;
}



.charity-page .case-progress-label {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
}

.donation-card {
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  padding: 20px;
  width: 300px;
  height: 200px;

  justify-content: center;
  align-items: center;
}

.donation-input {
  margin-bottom: 10px;
}

.donation-input input[type='number'] {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #4b5f23;
  border-radius: 4px;
}

.donation-input-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.donation-input-label {
  display: block;
  margin-bottom: 5px;
}

.donation-btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ac4646;
}
</style>
