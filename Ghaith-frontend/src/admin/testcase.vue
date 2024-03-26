<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { showCharityCases } from '../services/charity'
import { createCase, updateCase, deleteCase } from '../services/case'

export default {
  name: 'Cases',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)

    // console.log('hiii', user.value) >>>payload
    // const getAllCases = async () => {
    //   this.cases = await showCharityCases(user.value.charityId)
    // }

    return { user, getAllCases }
  },
  data() {
    return {
      search: '',
      cases: [],
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
        end_date: '24/3/2024'
      }
    }
  },
  mounted() {
    // this.getAllCases()
  },
  methods: {
    async getAllCases() {
      this.cases = await showCharityCases(user.value.charityId)
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
            end_date: ''
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
            end_date: ''
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
      this.formValues = {
        name: item.name,
        image: item.image,
        description: item.description,
        total_amount: item.total_amount,
        end_date: item.end_date
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
            <v-text-field
              v-model="formValues['name']"
              label="Name"
            ></v-text-field>

            <v-text-field
              v-model="formValues['image']"
              label="Image"
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

            <v-date-picker
              v-model="formValues['end_date']"
              label="End Date"
            ></v-date-picker>

            <v-btn type="submit" color="primary">Submit</v-btn>
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
  <!-- <v-container>
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

          <v-btn @click="deleteOneCategory(item)" color="primary" text>
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
  </v-container> -->
</template>

<style></style>
