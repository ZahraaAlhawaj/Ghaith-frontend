<script>
import { showCase, donate, getStatistics } from '../services/case'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Case',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)

    return { user }
  },
  data: () => ({
    shareLink: '',
    slider3: 100,
    casesId: 0,
    cases: [],
    amount: 0.1,
    inputValue: 0.1,
    stat: null,
    cardStat: [],
    cardItems: [
      {
        logo: 'https://www.freepik.com/icon/pie-chart_893220#fromView=search&page=1&position=1&uuid=eba18b99-91e2-44db-9fa2-2c2cfd97689f',
        number: 123,
        title: 'Title 1'
      },
      {
        logo: 'https://www.freepik.com/icon/pie-chart_11176356#fromView=search&page=2&position=47&uuid=eba18b99-91e2-44db-9fa2-2c2cfd97689f',
        number: 456,
        title: 'Number of Donation'
      },
      {
        logo: 'https://www.freepik.com/icon/bar-chart_1716515#fromView=search&page=3&position=4&uuid=eba18b99-91e2-44db-9fa2-2c2cfd97689f',
        number: 789,
        title: 'Title 3'
      },
      {
        logo: 'https://www.freepik.com/icon/bar-chart_1716515#fromView=search&page=3&position=4&uuid=eba18b99-91e2-44db-9fa2-2c2cfd97689f',
        number: 75,
        title: 'Title 4'
      }
    ]
  }),
  mounted() {
    this.casesId = this.$route.params.id
    this.showCase(this.casesId)
    this.getStatistics(this.casesId)
  },
  methods: {
    async showCase(casesId) {
      const response = await showCase(casesId)
      this.cases = response
    },
    async donate() {
      const response = await donate({
        case: this.casesId,
        amount: this.inputValue,
        user: this.user ? this.user.id : null
      })
      if (response) {
        console.log('done')
      } else {
        console.log('something wrong')
      }
    },
    async getStatistics(casesId) {
      const response = await getStatistics(casesId)
      this.stat = response
      this.cardStat = [
        {
          logo: 'https://i.ibb.co/cxVKkdJ/saving.png',
          number: response.timeElapsedText,
          title: 'Last Donation'
        },
        {
          logo: 'https://i.ibb.co/pvk3k6r/donation-1.png',
          number: response.numberOfDonations,
          title: 'Donation'
        },
        {
          logo: 'https://i.ibb.co/31Lg1wS/hourglass.png',
          number: response.dayDifference,
          title: 'Until last day'
        },
        {
          logo: 'https://i.ibb.co/VNhWWJB/donation-2.png',
          number: 3,
          title: 'people'
        }
      ]
      console.log(this.stat)
      console.log('hi', this.cardStat)
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    },
    generateLink() {
      const id = this.casesId
      const url = import.meta.env.VITE_GHAITH_API
      const shareUrl = `${url}/cases/${id}`
      console.log('share', this.shareLink)
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          console.log('copy')
        })
        .catch((error) => {
          console.log('Faild')
        })
      this.shareLink = shareUrl
    }
  }
}
</script>
<template>
  <v-container class="container" fluid>
    <v-row>
      <v-col cols="6">
        <v-card class="image-card" outlined>
          <div class="title-header">
            <h2 class="card-title">{{ cases.name }}</h2>

            <div class="text-center">
              <v-btn icon size="30">
                <v-icon size="22">mdi-share</v-icon>
                <v-menu
                  activator="parent"
                  location="bottom end"
                  transition="fade-transition"
                >
                  <v-list density="compact" min-width="250" rounded="lg" slim>
                    <v-list-item
                      prepend-icon="mdi-link"
                      title="Copy link"
                      @click="generateLink"
                      link
                    ></v-list-item>
                    <v-list-item link>
                      <ShareNetwork
                        network="Twitter"
                        @click="generateLink"
                        :url="this.shareLink"
                        title="The Case need to Donate"
                      >
                        <v-icon color="#1DA1F2">mdi-twitter</v-icon>
                        Share on Twitter
                      </ShareNetwork>
                    </v-list-item>
                    <v-list-item>
                      <ShareNetwork
                        network="WhatsApp"
                        @click="generateLink"
                        :url="this.shareLink"
                        title="The Case need to Donate"
                      >
                        <v-icon color="green darken-4">mdi-whatsapp</v-icon>
                        Share on WhatsApp
                      </ShareNetwork>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </div>
          </div>

          <div class="image-container">
            <v-img
              src="https://ehsanimagesp.s3.me-south-1.amazonaws.com/P152.jpg"
              alt="Image"
              class="image"
            ></v-img>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="donation-card" outlined>
          <h2 class="card-title">Donation</h2>
          <v-container>
            <v-row>
              <v-col cols="9">
                <v-text-field
                  :type="'number'"
                  label="Amount"
                  v-model="inputValue"
                  variant="outlined"
                  prefix="BD"
                  :min="0.1"
                  :step="0.1"
                ></v-text-field>
              </v-col>

              <v-col cols="3">
                <v-btn variant="outlined" size="x-large" @click="donate"
                  >Donate</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-card class="details-card" outlined>
          <div class="header">
            <h2 class="title">Case Details</h2>
            <h5 class="code">code:{{ cases.code }}</h5>
          </div>
          <p class="description"><b>Description:</b> {{ cases.description }}</p>
          <div class="amount">
            <div class="amount-bg">
              <div class="amount-row">
                <div class="amount-col-one">
                  <p class="amount-label">
                    <b>Desired Amount:</b>
                  </p>

                  <p class="amount-value">{{ cases.total_amount }}BD</p>
                </div>
                <div class="amount-col-two centered">
                  <p class="amount-label"><b>Collected Amount: </b></p>
                  <p class="amount-value" v-if="cases.collected_amount">
                    {{ cases.collected_amount.toFixed(2) }}BD
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="date">
            <p>Start Date: {{ formatDate(cases.start_date) }}</p>
            <p class="end-date">End Date: {{ formatDate(cases.end_date) }}</p>
          </div>
          <hr />
          <div class="charity">
            <div class="charity-title">
              <h6>Sponser Charity</h6>
            </div>
            <div class="charity-details">
              <img
                v-if="cases.charity"
                :src="cases.charity.logo"
                alt="Charity Logo"
                class="logo"
              />
              <h4 v-if="cases.charity">{{ cases.charity.name }}</h4>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="second-row">
      <v-col cols="3" v-for="(item, index) in cardStat" :key="index">
        <v-card class="card-item" outlined>
          <v-avatar
            :image="item.logo"
            rounded="0"
            size="60"
            class="stat-logo"
          ></v-avatar>
          <!-- <v-img :src="item.logo" height="200"></v-img> -->
          <v-card-title class="headline">{{ item.number }}</v-card-title>
          <v-card-subtitle class="sub-headline">{{
            item.title
          }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.v-btn {
  background-color: #4b5f23 !important;
  color: white !important;
}
.container {
  padding: 20px;
}

.v-container--fluid {
  padding: 16px 7% !important;
}
.v-container .v-locale--is-ltr {
  padding: 0;
}
.image-card {
  height: 100%;
  margin-bottom: 20px;
  padding: 20px !important;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  border: 0.2em solid #4b5f23;
  background-color: #e6e5d0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}

.donation-card {
  margin-bottom: 20px;
  padding: 20px !important;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  border: 0.2em solid #4b5f23;
  background-color: #e6e5d0;
}

.details-card {
  margin-bottom: 20px;
  padding: 20px !important;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  border: 0.2em solid #4b5f23;
  background-color: #e6e5d0;
  height: 66%;
}

.card-title {
  text-align: left;
  margin-bottom: 20px;
}

.image-container {
  flex: 1 !important;
  width: 100% !important;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.v-responsive__sizer {
  padding-bottom: 60% !important;
}

/**CSS for details case */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 10px; */
}

.title {
  margin: 0;
  /* padding: 5px 10px; */
}

.code {
  margin: 0;
  background-color: #ffc107;
  padding: 0.5%;
}

.description {
  margin-top: 10px;
}

.amount {
  margin-top: 20px;
}

.amount-bg {
  background-color: #b1bf5c;
  padding: 10px;
}

.amount-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.amount-col-one,
.amount-col-two {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.amount-label {
  margin: 0;
}

.amount-value {
  margin: 0;
  color: #4b5f23 !important;
  font-weight: bolder;
}
.collected {
  margin-top: 5px;
}

.date {
  margin-top: 20px;
}

.end-date {
  margin-top: 5px;
}

.charity {
  margin-top: 10px;
}

.logo {
  width: 50px;
  height: 50px;
  margin-top: 10px;
  border: 0.5px solid #4b5f23;
  border-radius: 9px;
  margin-right: 5px;
}

.charity-details {
  display: flex;
  align-items: center;
}

.second-row {
  margin-top: 20px;
}

.second-row .card-item {
  /* width: 307px; */
  margin-bottom: 20px;
  text-align: center;
  border: 0.2em solid #4b5f23;
  background-color: #e6e5d0;
}

.headline {
  font-size: 40px !important;
}

.sub-headline {
  font-size: 12px !important;
  margin: 1px 0 23px 0;
}

.stat-logo {
  margin: 18px 0;
}

.title-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
