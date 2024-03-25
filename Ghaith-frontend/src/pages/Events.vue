<script>
import { showAllEvent, joinEvent } from '../services/event'

export default {
  name: 'Events',
  data() {
    return {
      events: null
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
      const response = await joinEvent(id)
      this.showEvents()
    }
  }
}
</script>

<template>
  <div>
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
              {{ event.remainigVolunteers }} /
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
