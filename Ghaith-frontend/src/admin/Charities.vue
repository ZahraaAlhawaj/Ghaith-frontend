<script>
import { showAllCharity, updateCharity } from '../services/charity'

export default {
  name: 'Charities',
  data: function () {
    return {
      search: '',
      charities: [],
      headers: [
        { text: 'Logo', value: 'logo' },
        { text: 'Name', value: 'name' },
        { text: 'User', value: 'user.email' },
        { text: 'Cr Number', value: 'cr_number' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      formValues: {
        name: '',
        status: ''
      },
      updateDialog: {}
    }
  },
  mounted() {
    this.getAllCharities()
  },
  methods: {
    async getAllCharities() {
      this.charities = await showAllCharity()
    },
    async handleSubmit(event, item) {
      event.preventDefault()
      const charity = await updateCharity(item._id, this.formValues)
      if (charity) {
        this.getAllCharities()
        this.formValues = {
          name: ''
        }
        return true
      }
    },
    openUpdateDialog(item) {
      this.formValues = {
        name: item.name,
        status: item.status
      }
      this.updateDialog = {
        ...this.updateDialog,
        [item._id]: true
      }
    }
  }
}
</script>

<template>
  <v-container class="list-header">
    <h1 class="list-title">Charities</h1>
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
      <v-data-table :headers="headers" :items="charities" :search="search">
        <template v-slot:headers="props">
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>User</th>
            <th>Cr Number</th>
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
                <h3>Update Charity</h3>
                <v-form fast-fail @submit.prevent @submit="handleSubmit">
                  <v-text-field
                    v-model="formValues['name']"
                    label="Name"
                    disabled
                  ></v-text-field>
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
