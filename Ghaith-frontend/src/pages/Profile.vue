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
  <div class="user-profile-card">
    <div class="header">
      <img src= "/images/av.png"  class="avatar"> 
      <h2>esra</h2>
      <p>esra@gmail.com</p>
    </div>

    <div class="details">
      <div class="detail-row">
        <span class="label">phone number:</span>
        <span class="value">+973 33233243</span>
      </div>
     
    </div>
  </div>


  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          One
        </v-window-item>

        <v-window-item value="two">
          Two
        </v-window-item>

        <v-window-item value="three">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>




  
</template>

<style>
.user-profile-card {
  border: 0.14em solid #4b5f23;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-family: Arial, sans-serif;
  margin: 20px auto;
  max-width: 400px;
  color: #4b5f23;;
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
}
</style>