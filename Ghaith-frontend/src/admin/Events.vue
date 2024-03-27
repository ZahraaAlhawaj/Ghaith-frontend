<script>
import { getEventByCharity, createEvent } from '../services/event'

export default {
  name: 'Events',
  data: function () {
    return {
      search: '',
      events: [],
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Location', value: 'location' },
        { text: 'Description', value: 'description' },
        { text: 'Time', value: 'time' },
        { text: 'Volunteers', value: 'requiredVolunteers' }
      ],
      formValues: {
        title: '',
        location: '',
        description: '',
        date: new Date(),
        time: '',
        image: '',
        requiredVolunteers: 0
      },
      updateDialog: {},
      createDialog: false
    }
  },
  mounted() {
    this.getAllEvents()
  },
  methods: {
    async getAllEvents() {
      this.events = await getEventByCharity()
    },
    async handleSubmit(event, item) {
      event.preventDefault()
      const even = await createEvent(this.formValues)
      if (even) {
        this.getAllEvents()
        this.formValues = {
          title: '',
          location: '',
          description: '',
          date: new Date(),
          time: '',
          image: '',
          requiredVolunteers: 0
        }
        return true
      }
    }
  }
}
</script>
<template>
  <v-container class="list-header">
    <h1 class="list-title">Cases</h1>
    <v-dialog v-model="createDialog" max-width="400" persistent>
      <template v-slot:activator="{ props: createActivatorProps }">
        <v-btn class="list-create-btn" v-bind="createActivatorProps">
          New Event
        </v-btn>
      </template>

      <v-card prepend-icon="mdi-map-marker">
        <v-sheet class="list-form">
          <h3>New Event</h3>
          <v-form fast-fail @submit.prevent @submit="handleSubmit">
            <v-text-field
              v-model="formValues['title']"
              label="Title"
            ></v-text-field>
            <v-text-field
              v-model="formValues['location']"
              label="Location"
            ></v-text-field>
            <v-textarea
              v-model="formValues['description']"
              label="Description"
            ></v-textarea>
            <v-text-field
              v-model="formValues['date']"
              label="Date"
              type="date"
            ></v-text-field>
            <v-text-field
              v-model="formValues['time']"
              label="Time"
            ></v-text-field>
            <v-text-field
              v-model="formValues['image']"
              label="Image"
            ></v-text-field>
            <v-text-field
              v-model="formValues['requiredVolunteers']"
              label="Required Volunteers"
              type="number"
            ></v-text-field>
          </v-form>
        </v-sheet>
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="createDialog = false"> Dismiss </v-btn>

          <v-btn
            type="submit"
            @click="
              (event) => {
                if (handleSubmit(event, 'create')) {
                  createDialog = false
                }
              }
            "
          >
            Create
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
  <v-container>
    <v-data-table :headers="headers" :items="events">
      <template v-slot:item.actions="{ item }">
        <v-dialog v-model="updateDialog[item._id]" max-width="400" persistent>
        </v-dialog>
      </template>
      <template v-slot:headers="props">
        <tr>
          <th>Title</th>
          <th>Location</th>
          <th>Description</th>
          <th>Time</th>
          <th>Volunteers</th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr>
          <td>{{ item.name }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>
<style></style>
