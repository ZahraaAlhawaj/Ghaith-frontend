<script>
export default {
  name: 'Request',
  data() {
    return {
      request: {
        title: '',
        description: '',
        family_member: 0,
        salary: 0,
        expected_amount: 0,
        type: '',
        document: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Here you can perform any logic you need before submitting the form
      // For example, you can make an API call to save the request data
      console.log(this.request)
      // Reset the form after submission if needed
      this.resetForm()
    },
    resetForm() {
      // Reset the form fields to their initial values
      this.request.title = ''
      this.request.description = ''
      this.request.family_member = 0
      this.request.salary = 0
      this.request.expected_amount = 0
      this.request.type = ''
      this.request.document = ''
    }
  }
}
</script>

<template>
  <div class="form-container">
    <v-sheet class="mx-auto" width="300">
      <h1 class="account-title">Create Request</h1>
      <p class="account-description">Enter the details for your request</p>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="request.title" label="Title"></v-text-field>

        <v-textarea
          v-model="request.description"
          label="Description"
        ></v-textarea>

        <v-text-field
          v-model="request.family_member"
          label="Family Member"
        ></v-text-field>

        <v-text-field v-model="request.salary" label="Salary"></v-text-field>

        <v-text-field
          v-model="request.expected_amount"
          label="Expected Amount"
        ></v-text-field>

        <v-text-field
          v-model="request.document"
          label="Document"
        ></v-text-field>

        <v-btn rounded="xl" class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style>
/* update-form2 */
.account-title {
  font-size: 24px;
  text-align: left;
  color: #10151d;
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
  margin: 1em auto;
  padding: 2em;
  border-radius: 10px;
  background-color: #ffffff;
  border: 2px solid #f2f2f2;
  margin-top: -0.3%;
}
</style>
