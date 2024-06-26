<script>
import { showAllEvent, joinEvent } from '../services/event'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Events',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)

    return { user }
  },
  data() {
    return {
      events: null,
      alert: {
        show: false,
        message: '',
        type: ''
      }
    }
  },
  mounted() {
    this.showEvents()
  },
  methods: {
    async showEvents() {
      const response = await showAllEvent()
      this.events = response
    },

    async joinEvent(id) {
      this.alert.show = true
      const response = await joinEvent(id)
      if (response.success === false) {
        this.showAlert('Error: ' + response.msg, 'warning')
      }
      this.showEvents()
    },

    showAlert(message, type) {
      this.alert.message = message
      this.alert.type = type
      this.alert.show = true
    }
  }
}
</script>

<template>
  <div>
    <v-alert
      v-if="alert.show"
      :type="alert.type"
      density="compact"
      class="alert-color"
    >
      {{ alert.message }}
    </v-alert>
    <div class="title">
      <h1 class="yellow-underlined title">Events</h1>
    </div>
    <v-row>
      <v-col cols="4" v-for="event in events" :key="event._id">
        <v-card class="card-outline mb-4">
          <v-img
            :src="event.image"
            height="200"
            :aspect-ratio="16 / 9"
            gradient="to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)"
          ></v-img>
          <div class="mb-2 card-info">
            <v-icon left>mdi-map-marker</v-icon>
            {{ event.location }}
          </div>
          <div
            class="pa-2 card-container"
            style="text-align: left; color: #4b5f23"
          >
            <div>
              <v-icon left>mdi-clock</v-icon>
              {{ event.time }}
            </div>

            <v-card-text>{{ event.description }}</v-card-text>

            <div>
              <v-icon left>mdi-account-group</v-icon>
              {{ event.volunteers.length }} /
              {{ event.requiredVolunteers }} joined
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn
              class="status-btn"
              text
              :disabled="!user"
              @click.stop="joinEvent(event._id)"
              >Join Event</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.card2 {
  height: 1%;
}
.card-outline {
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 5%;
}

.card-info {
  background-color: #4b5f23;
  color: #e6e5d0;
  padding: 5%;
}

.status-btn {
  margin-bottom: 1%;
}

.card-container {
  text-align: left;
}

.card-outline {
  border: 0.12em solid #4b5f23;
  border-radius: 0.5em;
  background-color: #e6e5d0;
  width: 80%;
  height: 93%;
}

.bg-warning {
  margin-top: 0% !important;
  background-color: #96a640 !important;
  color: #4b5f23 !important;
}

.status-btn {
  margin-top: 0%;
  color: #4b5f23;
  background-color: #b1bf5c;
}

.title {
  display: flex;
  justify-content: center;
}

.yellow-underlined {
  border-bottom: solid 10px #b1bf5c;
  color: #4b5f23;
  line-height: 0.35em;
  margin-top: 0.65em;
  display: inline-block;
  padding-left: 0.15em;
  padding-right: 0.15em;
  align-self: center;
  margin-bottom: 2%;
}
</style>
