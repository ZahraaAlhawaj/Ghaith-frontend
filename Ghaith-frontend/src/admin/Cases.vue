<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { showCharityCases } from '../services/charity'
import { createCase, updateCase, deleteCase } from '../services/case'
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
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      createDialog: false,
      updateDialog: {},
      formValues: {
        name: '',
        image: '',
        description: '',
        total_amount: null,
        start_date: new Date(),
        end_date: new Date(),
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
      this.cases = await showCharityCases(this.user.charityId)
      // console.log(this.cases)
    },
    async getAllCategories() {
      this.categories = await getCategories()
      console.log(this.categories)
    },
    async handleSubmit(event, action, item = null) {
      event.preventDefault()
      if (action === 'create') {
        console.log('formvaluee', this.formValues)
        const newCase = await createCase(this.formValues)
        if (newCase) {
          this.getAllCases()
          this.formValues = {
            name: '',
            image: '',
            description: '',
            total_amount: null,
            start_date: new Date(),
            end_date: new Date()
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
            end_date: new Date()
          }
          return true
        }
      }
      return false
    },
    async deleteOneCase(selectedCase) {
      console.log('delete function')
      const deletedCase = await deleteCase(selectedCase._id)
      this.getAllCases()
    },
    openUpdateDialog(item) {
      const startDate = format(new Date(item.start_date), 'yyyy-MM-dd')
      const endDate = format(new Date(item.start_date), 'yyyy-MM-dd')

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

            <v-card prepend-icon="mdi-map-marker">
              <v-sheet class="list-form">
                <h3>Update Case</h3>
                <v-form fast-fail @submit.prevent @submit="handleSubmit">
                  <v-select
                    v-model="formValues['category']"
                    :items="categories"
                    :item-title="categories.name"
                    :item-value="categories._id"
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
                        updateDialog = false
                      }
                    }
                  "
                >
                  Update
                </v-btn>
              </template>
            </v-card>
          </v-dialog>

          <v-btn @click="deleteOneCase(item)" color="primary" text>
            Delete
          </v-btn>
        </template>
        <template v-slot:headers="props">
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </template>
        <template v-slot:items="props">
          <tr>
            <td>{{ item.name }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style></style>
