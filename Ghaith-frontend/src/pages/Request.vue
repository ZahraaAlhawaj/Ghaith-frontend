<script>
import { addRequest } from '../services/request'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Request',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)

    return { user }
  },
  data: function () {
    return {
      formValues: {
        title: '',
        description: '',
        family_member: null,
        salary: null,
        expected_amount: null,
        expected_date: null,
        document: '',
        user: this.user ? this.user.id : null
      }
    }
  },
  methods: {
    handleFormChange(event) {
      this.formValues = {
        ...this.formValues,
        [event.target.name]: event.target.value
      }
    },
    async submitForm() {
      event.preventDefault()
      const res = await addRequest(this.formValues)
      this.resetForm()
      this.$router.push(`/profile`)
    },
    resetForm() {
      this.formValues = {
        title: '',
        description: '',
        family_member: null,
        salary: null,
        expected_amount: null,
        expected_date: null,
        document: null
      }
    }
  }
}
</script>

<template>
  <div class="form-container">
    <v-window>
      <v-sheet class="mx-auto" width="300">
        <h1 class="account-title">Create Request</h1>
        <p class="account-description">
          Enter your name, email, and password to create your account
        </p>
        <v-form fast-fail @submit.prevent @submit="submitForm">
          <v-text-field
            v-model="formValues['title']"
            label="Title"
            @input="handleFormChange"
          ></v-text-field>

          <v-textarea
            v-model="formValues['description']"
            label="Description"
            @input="handleFormChange"
          ></v-textarea>

          <v-text-field
            v-model="formValues['family_member']"
            label="Family Members"
            type="number"
            @input="handleFormChange"
          ></v-text-field>

          <v-text-field
            v-model="formValues['salary']"
            label="Salary"
            type="number"
            @input="handleFormChange"
          ></v-text-field>

          <v-text-field
            v-model="formValues['expected_amount']"
            label="Expected Amount"
            type="number"
            @input="handleFormChange"
          ></v-text-field>

          <v-text-field
            v-model="formValues['expected_date']"
            label="Expected Date"
            type="date"
            @input="handleFormChange"
          ></v-text-field>

          <v-text-field
            v-model="formValues['document']"
            label="Document"
            @input="handleFormChange"
          ></v-text-field>

          <!-- <v-file-input
          v-model="formValues['document']"
          label="Document"
          @input="handleFormChange"
          accept="image/*, application/pdf"
        ></v-file-input> -->

          <v-btn rounded class="mt-2" type="submit" block>Submit</v-btn>
        </v-form>
      </v-sheet>
    </v-window>
  </div>
</template>

<style scoped>
.account-title {
  font-size: 24px;
  text-align: left;
  color: #4b5f23;
}

.account-description {
  font-size: 16px;
  text-align: left;
  color: #555;
  padding-top: 10px;
  font-size: 14px;
  margin-bottom: 20px;
}

.form-container {
  width: 30vw;
  margin: 4em auto;
  padding: 2em;
  border-radius: 10px;
  background-color: #ffffff;
  border: 0.12em solid #4b5f23;
  margin-top: -0.3%;
}

.v-btn {
  background-color: #4b5f23;
  color: #e6e5ce;
  box-shadow: none;
  font-family: avenir, sans-serif;
}
</style>
