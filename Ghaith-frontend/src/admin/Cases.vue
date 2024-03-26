<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { showCharityCases } from '../services/charity'
import { createCase, updateCase, deleteCase } from '../services/case'
import { getCategories } from '../services/category'
export default {
  name: 'Cases',
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
      formValues: {
        name: '',
        image: '',
        description: '',
        total_amount: null,
        start_date: new Date(),
        end_date: new Date()
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
</template>

<style></style>
