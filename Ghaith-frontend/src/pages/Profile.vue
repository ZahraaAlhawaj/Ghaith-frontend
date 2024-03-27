<script>
import { getUserInfo } from '../services/profile'
import { getEventByUser } from '../services/event'

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
    userDonation: [],
    userEvents: []
  }),
  mounted() {
    this.getUserInfo()
    this.getAllEvent()
  },
  methods: {
    async getUserInfo() {
      const response = await getUserInfo()
      this.userDetails = response
      this.userRequests = response.request
      this.userPickup = response.pickup
      this.userDonation = response.donation
    },
    async getAllEvent() {
      this.userEvents = await getEventByUser()
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
        <v-tab value="four">Event List</v-tab>
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

          <v-window-item value="four">
            <div class="four" v-for="evnt in userEvents">
              <v-card
                class="mx-auto my-8"
                max-width="600"
                :title="evnt.title"
                link
              >
                <v-card-text class="d-flex justify-space-between">
                  <div>
                    <p>Location: {{ evnt.location }}</p>
                    <p>Time: {{ evnt.time }}</p>
                    <p v-if="evnt.date">Date: {{ formatDate(evnt.date) }}</p>
                  </div>
                </v-card-text>
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
  width: 50%;
  margin: 0 auto;
}

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
  margin-bottom: 8%;
  align-items: left;
}

.status-btn {
  margin-top: 0%;
  color: #4b5f23;
  background-color: #b1bf5c;
}
</style>
