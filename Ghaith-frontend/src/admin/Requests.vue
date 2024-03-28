<script>
import { getRequests } from '../services/request'
import { getCategories } from '../services/category'
import { selectRequest } from '../services/request'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Requests',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)

    return { user }
  },
  data: function () {
    return {
      search: '',
      requests: [],
      categories: [],
      headers: [
        { text: 'ُTitle', value: 'title' },
        { text: 'Family Member', value: 'family_member' },
        { text: 'Salary', value: 'salary' },
        { text: 'Expected Amount', value: 'expected_amount' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      formValues: {
        name: '',
        image: '',
        description: '',
        total_amount: '',
        start_date: '',
        end_date: '',
        category: '',
        charity: null
      },
      updateDialog: {}
    }
  },
  mounted() {
    this.getAllRequests()
    this.getAllCategories()
  },
  methods: {
    async getAllRequests() {
      this.requests = await getRequests()
    },
    async getAllCategories() {
      this.categories = await getCategories()
    },
    async handleSubmit(event, item) {
      event.preventDefault()
      let res = await selectRequest(item._id, this.formValues)
      if (res) {
        this.getAllRequests()
        this.formValues = {
          name: '',
          image: '',
          description: '',
          total_amount: null,
          start_date: null,
          end_date: '',
          category: null,
          charity: null
        }
      }
    },
    openUpdateDialog(item) {
      this.formValues = {
        name: item.title,
        image: '',
        description: '',
        total_amount: item.expected_amount,
        start_date: new Date(),
        end_date: new Date(),
        charity: this.user.charityId
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
            <th v-if="user.role === 'Admin'">Action</th>
          </tr>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-dialog v-model="updateDialog[item._id]" max-width="400" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="user.role === 'Admin' && item.status === 'Not Selected'"
                @click="openUpdateDialog(item)"
                v-bind="attrs"
                class="mr-4"
                color="primary"
              >
                Select Request
              </v-btn>
            </template>
            <v-card>
              <v-sheet class="list-form">
                <h3>Select Request</h3>
                <v-form fast-fail @submit.prevent @submit="handleSubmit">
                  <v-select
                    v-model="formValues['category']"
                    :items="categories"
                    item-title="name"
                    item-value="_id"
                    item-text="name"
                    label="Category"
                  ></v-select>

                  <v-text-field
                    v-model="formValues['name']"
                    label="Name"
                  ></v-text-field>
                  <v-textarea
                    v-model="formValues['description']"
                    label="Description"
                  ></v-textarea>

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
                  <v-text-field
                    v-model="formValues['image']"
                    label="Image"
                  ></v-text-field>
                </v-form>
              </v-sheet>

              <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn @click="updateDialog[item._id] = false">Dismiss</v-btn>

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
                  Create
                </v-btn>
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
