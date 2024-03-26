<script>
import { getRequests } from '../services/request'
export default {
  name: 'Requests',
  data: function () {
    return {
      search: '',
      requests: [],
      headers: [
        { text: 'ُTitle', value: 'title' },
        { text: 'Family Member', value: 'family_member' },
        { text: 'Salary', value: 'salary' },
        { text: 'Expected Amount', value: 'expected_amount' },
        { text: 'Status', value: 'Status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      formValues: {
        image: ''
      },
      updateDialog: {}
    }
  },
  mounted() {
    this.getAllRequests()
  },
  methods: {
    async getAllRequests() {
      this.requests = await getRequests()
    },
    handleSubmit() {},
    openUpdateDialog(item) {
      // this.formValues = {
      //   name: item.name,
      //   status: item.status
      // }
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
    <h1 class="list-title">Requests</h1>
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
      <v-data-table :headers="headers" :items="requests" :search="search">
        <template v-slot:headers="props">
          <tr>
            <th>Title</th>
            <th>Family Member</th>
            <th>Salary</th>
            <th>Expected Amount</th>
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
                Select Case
              </v-btn>
            </template>
            <v-card>
              <v-sheet class="list-form">
                <h3>Select Request</h3>
                <v-form fast-fail @submit.prevent @submit="handleSubmit">
                  <v-text-field
                    v-model="formValues['image']"
                    label="Image"
                  ></v-text-field>
                  <v-text-field
                    v-model="formValues['name']"
                    label="Name"
                  ></v-text-field>
                  <v-textarea
                    v-model="formValues['description']"
                    label="Description"
                  ></v-textarea>
                  <v-text-field
                    v-model="formValues['category']"
                    label="category"
                  ></v-text-field>
                  <v-text-field
                    v-model="formValues['total_amount']"
                    label="Total Amount"
                    type="number"
                  ></v-text-field>
                  <v-text-field
                    v-model="formValues['start_date']"
                    label="Start Date"
                    type="date"
                  ></v-text-field>
                  <v-text-field
                    v-model="formValues['end_date']"
                    label="End Date"
                    type="date"
                  ></v-text-field>
                </v-form>
              </v-sheet>

              <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn @click="updateDialog[item._id] = false">Dismiss</v-btn>
              </template>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:item.salary="{ item }">
          <td>{{ item.salary }} BHD</td>
        </template>

        <template v-slot:item.expected_amount="{ item }">
          <td>{{ item.expected_amount }} BHD</td>
        </template>

        <template v-slot:items="props">
          <tr>
            <td>{{ item.title }}</td>
            <td>{{ item.family_member }}</td>
            <td>{{ item.salary }}</td>
            <td>{{ item.expected_amount }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<style></style>
