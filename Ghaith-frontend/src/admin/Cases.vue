<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { showCharityCases } from '../services/charity'
import { createCase, updateCase, deleteCase, getCases } from '../services/case'
import { getCategories } from '../services/category'
import { format } from 'date-fns'

export default {
  name: 'Cases',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)

    return { user }
  },
  data: function () {
    return {
      search: '',
      cases: [],
      categories: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Category', value: 'category.name' },
        { text: 'description', value: 'description' },
        { text: 'Total Amount', value: 'total_amount' },
        { text: 'Collected Amount', value: 'collected_amount' },
        { text: 'Start Date', value: 'start_date', sortable: true },
        { text: 'End Date', value: 'end_date', sortable: true },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      createDialog: false,
      updateDialog: {},
      formValues: {
        name: '',
        image: '',
        description: '',
        total_amount: null,
        start_date: null,
        end_date: '',
        category: null
      }
    }
  },
  mounted() {
    this.getAllCategories()
    this.getAllCases()
  },
  methods: {
    async getAllCases() {
      if (this.user.role == 'Admin') {
        const response = await showCharityCases(this.user.charityId)
        this.cases = response
      } else {
        this.cases = await getCases()
      }
    },
    async getAllCategories() {
      this.categories = await getCategories()
    },
    formatDate(date) {
      const formattedDate = new Date(date)
      const day = String(formattedDate.getDate()).padStart(2, '0')
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0')
      const year = formattedDate.getFullYear()
      return `${day}/${month}/${year}`
    },
    async handleSubmit(event, action, item = null) {
      event.preventDefault()
      if (action === 'create') {
        const newCase = await createCase(this.formValues)
        if (newCase) {
          this.getAllCases()
          this.formValues = {
            name: '',
            image: '',
            description: '',
            total_amount: null,
            start_date: new Date(),
            end_date: new Date(),
            category: null
          }
          return true
        }
      } else if (action === 'update') {
        const updatedCase = await updateCase(item._id, this.formValues)
        if (updatedCase) {
          this.getAllCases()
          this.formValues = {
            name: '',
            image: '',
            description: '',
            total_amount: null,
            start_date: new Date(),
            end_date: new Date(),
            category: null
          }
          return true
        }
      }
      return false
    },
    async deleteOneCase(selectedCase) {
      const deletedCase = await deleteCase(selectedCase._id)
      this.getAllCases()
    },
    openUpdateDialog(item) {
      const startDate = format(new Date(item.start_date), 'yyyy-MM-dd')
      const endDate = format(new Date(item.end_date), 'yyyy-MM-dd')

      this.formValues = {
        name: item.name,
        image: item.image,
        description: item.description,
        total_amount: item.total_amount,
        end_date: endDate,
        start_date: startDate,
        category: item.category
      }
      this.updateDialog = {
        ...this.updateCase,
        [item._id]: true
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
          New Case
        </v-btn>
      </template>

      <v-card prepend-icon="mdi-map-marker">
        <v-sheet class="list-form">
          <h3>New Case</h3>
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

      <v-data-table :headers="headers" :items="cases" :search="search">
        <template v-slot:item.start_date="{ item }">
          {{ formatDate(item.start_date) }}
        </template>
        <template v-slot:item.end_date="{ item }">
          {{ formatDate(item.end_date) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-dialog v-model="updateDialog[item._id]" max-width="400" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                left
                @click="openUpdateDialog(item)"
                v-bind="attrs"
                class="mr-4"
                color="primary"
                >mdi-pencil</v-icon
              >
            </template>

            <v-card prepend-icon="mdi-map-marker">
              <v-sheet class="list-form">
                <h3>Update Case</h3>
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

                <v-btn @click="updateDialog[item._id] = false"> Dismiss </v-btn>

                <v-btn
                  type="submit"
                  @click="
                    (event) => {
                      if (handleSubmit(event, 'update', item)) {
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

          <v-icon left @click="deleteOneCase(item)" color="red" text
            >mdi-delete</v-icon
          >
        </template>
        <template v-slot:headers="props">
          <tr>
            <th width="10%">Name</th>
            <th width="10%">Category</th>
            <th width="33%">Description</th>
            <th width="9%">Total Amount</th>
            <th width="10%">Collected Amount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </template>
        <template v-slot:items="props"> </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style></style>
