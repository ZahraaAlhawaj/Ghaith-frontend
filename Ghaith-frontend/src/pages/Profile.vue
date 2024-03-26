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
    userDetails: null
  }),
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const response = await getUserInfo()
      this.userDetails = response
      console.log(response)
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
        <div class="name">John Doe</div>
        <div class="email">john.doe@example.com</div>
        <div class="phone">123-456-7890</div>
      </div>
    </div>
  </div>

  <div class="list">
    <v-card class="custom-card">
      <v-tabs v-model="tab" class="custom-tabs">
        <v-tab value="one">Item One</v-tab>
        <v-tab value="two">Item Two</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <div class="one">
              <v-card
                class="mx-auto my-8"
                max-width="600"
                subtitle="Same looks, no anchor"
                title="Hover and click me"
                link
              ></v-card>
            </div>
            <div class="one">
              <v-card
                class="mx-auto my-8"
                max-width="600"
                subtitle="Same looks, no anchor"
                title="Hover and click me"
                link
              ></v-card>
            </div>
            <div class="one">
              <v-card
                class="mx-auto my-8"
                max-width="600"
                subtitle="Same looks, no anchor"
                title="Hover and click me"
                link
              ></v-card>
            </div>
          </v-window-item>

          <v-window-item value="two">
            <v-card
              class="mx-auto my-8"
              max-width="600"
              subtitle="Same looks, no anchor"
              title="Hover and click me"
              link
            ></v-card>
          </v-window-item>

          <v-window-item value="three">
            <v-card
              class="mx-auto my-8"
              max-width="600"
              subtitle="Same looks, no anchor"
              title="Hover and click me"
              link
            ></v-card>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.list {
  margin-bottom: 5%;
}
/* .custom-card {
  background-color: #e6e5d0;
  border: 0.12em solid #4b5f23;
} */
.custom-card {
  background-color: #e6e5d0;
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
</style>
