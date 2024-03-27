<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import {
  getPickupsByCharity,
  updatePickupStatus,
  showAllPickup
} from '../services/pickup'

export default {
  name: 'Pickup',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)

    return { user }
  },
  data: function () {
    return {
      search: '',
      pickups: [],
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time' },
        { text: 'Name', value: 'user.name' },
        { text: 'Email', value: 'user.email' },
        { text: 'Type', value: 'type' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      formValues: {
        status: ''
      },
      updateDialog: {}
    }
  },
  mounted() {
    this.getAllPickups()
  },
  methods: {
    async getAllPickups() {
      if (this.user.role == 'Admin') {
        this.pickups = await getPickupsByCharity()
      } else {
        this.pickups = await showAllPickup()
      }
    },
    async handleSubmit(event, item) {
      event.preventDefault()
      const pickup = await updatePickupStatus(item._id, this.formValues)
      if (pickup) {
        this.getAllPickups()
        this.formValues = {
          status: ''
        }
        return true
      }
    },
    openUpdateDialog(item) {
      this.formValues = {
        status: item.status
      }
      this.updateDialog = {
        ...this.updateCategory,
        [item._id]: true
      }
    },
    formatDate(date) {
      const formattedDate = new Date(date)
      const day = String(formattedDate.getDate()).padStart(2, '0')
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0')
      const year = formattedDate.getFullYear()
      return `${day}/${month}/${year}`
    }
  }
}
</script>

<template>
  <v-container class="list-header">
    <h1 class="list-title">Pickup</h1>
  </v-container>
  <v-container>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="pickups" :search="search">
        <template v-slot:item.date="{ item }">
          {{ formatDate(item.date) }}
        </template>
        <template v-slot:headers="props">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-dialog v-model="updateDialog[item._id]" max-width="400" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="openUpdateDialog(item)"
                v-bind="attrs"
                class="mr-4"
                color="primary"
              >
                Update
              </v-btn>
            </template>
            <v-card prepend-icon="">
              <v-sheet class="list-form">
                <h3>Update Pickup status</h3>
                <v-form fast-fail @submit.prevent @submit="handleSubmit">
                  <v-select
                    v-model="formValues['status']"
                    :items="['Pending', 'Approved', 'Rejected', 'Inactive']"
                    :rules="[(v) => !!v || 'Statsu is required']"
                    label="Status"
                    required
                  ></v-select>
                </v-form>
              </v-sheet>

              <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn @click="updateDialog[item._id] = false"> Dismiss </v-btn>

                <v-btn
                  type="submit"
                  @click="
                    (event) => {
                      if (handleSubmit(event, item)) {
                        updateDialog[item._id] = false
                      }
                    }
                  "
                >
                  Update
                </v-btn>
              </template>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:item.logo="{ item }">
          <v-img :src="item.logo" max-height="50" contain></v-img>
        </template>

        <template v-slot:items="props"> </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style></style>
