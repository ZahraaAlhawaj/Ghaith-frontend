<script>
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
} from '../services/category'
export default {
  name: 'Categories',
  data: function () {
    return {
      search: '',
      categories: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],

      createDialog: false,
      updateDialog: {},
      formValues: {
        name: ''
      }
    }
  },
  mounted() {
    this.getAllCategories()
  },
  methods: {
    async getAllCategories() {
      this.categories = await getCategories()
    },
    async handleSubmit(event, action, item = null) {
      event.preventDefault()
      if (action === 'create') {
        const category = await createCategory(this.formValues)
        if (category) {
          this.getAllCategories()
          this.formValues = {
            name: ''
          }
          return true
        }
      } else if (action === 'update') {
        const category = await updateCategory(item._id, this.formValues)
        if (category) {
          this.getAllCategories()
          this.formValues = {
            name: ''
          }
          return true
        }
      }

      return false
    },
    async deleteOneCategory(category) {
      const deleted = await deleteCategory(category._id)
      this.getAllCategories()
    },
    openUpdateDialog(item) {
      this.formValues = {
        name: item.name
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
    <h1 class="list-title">Categories</h1>
    <v-dialog v-model="createDialog" max-width="400" persistent>
      <template v-slot:activator="{ props: createActivatorProps }">
        <v-btn class="list-create-btn" v-bind="createActivatorProps">
          New Category
        </v-btn>
      </template>

      <v-card prepend-icon="mdi-map-marker">
        <v-sheet class="list-form">
          <h3>New Categoery</h3>
          <v-form fast-fail @submit.prevent @submit="handleSubmit">
            <v-text-field
              v-model="formValues['name']"
              label="Name"
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
      <v-data-table :headers="headers" :items="categories" :search="search">
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
                <h3>Update Categoery</h3>
                <v-form fast-fail @submit.prevent @submit="handleSubmit">
                  <v-text-field
                    v-model="formValues['name']"
                    label="Name"
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

          <v-icon left @click="deleteOneCategory(item)" color="red" text
            >mdi-delete</v-icon
          >
        </template>
        <template v-slot:headers="props">
          <tr>
            <th width="90%">Name</th>
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
