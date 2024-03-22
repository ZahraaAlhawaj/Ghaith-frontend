<script>
import { addRequest } from '../services/request'
export default {
  name: 'Request',
  data: function () {
    return {
      formValues: {
        title: '',
        description: '',
        family_member: null,
        salary: null,
        expected_amount: null,
        expected_date: null,
        document: ''
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
      this.$router.push(`/`)
    },
    resetForm() {
      this.formValues = {
        title: '',
        description: '',
        family_member: null,
        salary: null,
        expected_amount: null,
        expected_date: null,
        document: ''
      }
    }
  }
}
</script>

<template>
  <div class="form-container">
    <v-sheet class="mx-auto" width="300">
      <h1 class="account-title">Create Request</h1>

      <v-form @submit.prevent="submitForm">
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

        <!-- <v-file-input
          v-model="formValues['document']"
          label="Document"
          @input="handleFormChange"
          accept="image/*, application/pdf"
        ></v-file-input> -->

        <v-btn rounded class="mt-2" type="submit" block color="primary"
          >Submit</v-btn
        >
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped>
.account-title {
  font-size: 24px;
  text-align: left;
  color: #10151d;
}

.form-container {
  width: 30vw;
  margin: 1em auto;
  padding: 2em;
  border-radius: 10px;
  background-color: #ffffff;
  border: 2px solid #f2f2f2;
}
</style>
