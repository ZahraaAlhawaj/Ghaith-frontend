<script>
import { getUserInfo } from '../services/profile'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Profile',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)

    return { user }
  },
  data: () => ({
    tab: null,
    userDetails: null,
    userRequests: [],
    userPickup: [],
    userDonation: []
  }),
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const response = await getUserInfo()
      this.userDetails = response
      this.userRequests = response.request
      this.userPickup = response.pickup
      this.userDonation = response.donation
      console.log(response)
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
  <!-- <div class="user-profile-card">
    <div class="header">
      <img src="/images/av.png" class="avatar" />
      <h2>esra</h2>
      <p>esra@gmail.com</p>
    </div>

    <div class="details">
      <div class="detail-row">
        <p class="label">phone number:</p>
        <p class="value">+973 33233243</p>
      </div>
    </div>
  </div> -->
  <div class="centered-card">
    <div class="profile-card">
      <div class="avatar">
        <img src="/images/av.png" alt="Avatar" />
      </div>
      <div class="profile-details">
        <div class="name" v-if="userDetails">
          {{ userDetails.user.name }}
        </div>
        <div class="email" v-if="userDetails">
          {{ this.userDetails.user.email }}
        </div>
        <div class="phone" v-if="userDetails">
          {{ this.userDetails.user.phone_number }}
        </div>
      </div>
    </div>
  </div>

  <div class="list">
    <v-card class="custom-card">
      <v-tabs v-model="tab" class="custom-tabs">
        <v-tab value="one">Request List</v-tab>
        <v-tab value="two">Pick up List</v-tab>
        <v-tab value="three">Donation List</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <div class="one" v-for="req in userRequests">
              <v-card
                class="mx-auto my-8"
                max-width="600"
                :subtitle="req.description"
                :title="req.title"
                link
              >
                <v-card-text class="d-flex justify-space-between">
                  <div>
                    <p>Amount: {{ req.expected_amount }}</p>
                    <p v-if="req.charity">
                      Sponsored Charity: {{ req.charity.name }}
                    </p>
                  </div>
                  <div class="d-flex">
                    <v-btn class="mt-4">{{ req.status }}</v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-window-item>

          <v-window-item value="two">
            <div class="two" v-for="pick in userPickup">
              <v-card
                class="mx-auto my-8"
                max-width="600"
                :subtitle="pick.quantity"
                link
              >
                <!-- urgent -->
                <div class="info-container">
                  <v-card-title>
                    {{ pick.type }}
                    <span v-if="pick.urgent" class="urgent-label">
                      
                      <span class="urgent-text">URGENT!</span>
                    </span>
                  </v-card-title>
                </div>

                <v-card-text class="d-flex justify-space-between align-center">
                  <div>
                    <p>Date: {{ formatDate(pick.date) }}</p>
                    <p>Time: {{ pick.time }}</p>
                    <p v-if="pick.charity">
                      Sponsored Charity: {{ pick.charity.name }}
                    </p>
                  </div>

                  <div class="urgent-btn-container">
                    <!-- <font-awesome-icon v-if="pick.urgent" icon="triangle-exclamation" style="color: #4b5f24;" /> -->

                    <v-btn class="status-btn">{{ pick.status }}</v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-window-item>

          <v-window-item value="three">
            <div class="three" v-for="donate in userDonation">
              <v-card
                class="mx-auto my-8"
                max-width="600"
                :subtitle="formatDate(donate.updatedAt)"
                :title="`${donate.amount} BD`"
                link
              >
              </v-card>
            </div>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
/* urgent */
.info-container {
  display: flex;
  align-items: center;
  margin-bottom: -5%;
}

.urgent-label {
  display: inline-block;

  padding-left: 21.5em;
}

.urgent-text {
  color: rgb(247, 56, 56);
  font-size: 12pt;
  text-decoration: underline;
  
}

.list {
  margin-bottom: 5%;
}
/* .custom-card {
  background-color: #e6e5d0;
  border: 0.12em solid #4b5f23;
} */

.urgent-label {
  font-weight: bold;
}

.mt-4 {
  color: #e6e5d0;
  background-color: #4b5f23;
}

.mt-5 {
  color: #4b5f23;
  background-color: #b1bf5c;
}
.custom-card {
  background-color: #b1bf5c;
  border: 0.12em solid #4b5f23;
}
.custom-tabs {
  color: #e6e5d0;
}
.one {
  margin-top: -2%;
}
.mx-auto {
  border: 0.12em solid #4b5f23;
  background-color: #e6e5d0;
  color: #4b5f23;
}
.custom-tabs {
  background-color: #4b5f23;
}

.custom-card {
  width: 50%; /* Adjust the width to your preference */
  margin: 0 auto; /* Center align the card */
}
/* .user-profile-card {
  border: 0.14em solid #4b5f23;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-family: Arial, sans-serif;
  margin: 20px auto;
  max-width: 400px;
  color: #4b5f23;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.details {
  margin-top: 20px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.label {
  font-weight: bold;
}

.value {
  color: #4b5f23;
} */
.centered-card {
  display: flex;
  justify-content: center;
  margin-bottom: 1%;
  border-radius: 5%;
}

.profile-card {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 0.12em solid #4b5f23;
  border-radius: 4px;
  width: 50%;
  color: #4b5f23;
  background-color: #e6e5d0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar {
  flex-shrink: 0;
  margin-right: 20px;
}

.avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.profile-details {
  flex-grow: 1;
}

.name {
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 1px;
}

.email {
  font-size: 16px;
  margin-bottom: 0px;
}

.phone {
  font-size: 16px;
  margin-bottom: 5px;
}

.urgent-btn-container {
  display: flex;
  flex-direction: column;
  align-items: right;
}

.urgent-label {
  margin-bottom: 8%; /* Adjust the spacing between the label and the button */
  align-items: left;
}

.status-btn {
  margin-top: 0%; /* Adjust the spacing between the button and other elements */
  color: #4b5f23;
  background-color: #b1bf5c;
}
</style>
