<script>
import { showAllEvent, joinEvent } from '../services/event'

export default {
  name: 'Events',
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
        this.showAlert('Error: ' + response.msg, 'error')
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
    <v-alert v-if="alert.show" :type="alert.type" dense>
      {{ alert.message }}
    </v-alert>
    <v-row>
      <v-col cols="4" v-for="event in events" :key="event._id">
        <v-card>
          <v-img
            :src="event.image"
            height="200"
            :aspect-ratio="16 / 9"
            gradient="to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)"
          ></v-img>
          <div class="pa-2">
            <v-card-title class="mb-2">
              <v-icon left>mdi-map-marker</v-icon>
              {{ event.location }}
            </v-card-title>
            <v-card-text class="mb-2">
              <v-icon left>mdi-clock</v-icon>
              {{ event.time }}
            </v-card-text>
            <v-card-text>{{ event.description }}</v-card-text>
            <v-card-text>
              <v-icon left>mdi-account-group</v-icon>
              {{ event.volunteers.length }} /
              {{ event.requiredVolunteers }} joined
            </v-card-text>
          </div>
          <v-card-actions>
            <v-btn text @click.stop="joinEvent(event._id)">Join Event</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
