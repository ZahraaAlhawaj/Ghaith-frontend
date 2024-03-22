<script>
export default {
  name: 'CreateRequest',
  data() {
    return {
      title: '',
      description: '',
      family_member: null,
      salary: null,
      expected_amount: null,
      expected_date: null,
      type: '',
      user: '',
      charity: '',
      document: '',
      status: 'Not Selected',
      statusOptions: ['Not Selected', 'Selected', 'Approved', 'Rejected']
    }
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      console.log('Form submitted')
      console.log(this.title)
      console.log(this.description)
      console.log(this.family_member)
      console.log(this.salary)
      console.log(this.expected_amount)
      console.log(this.expected_date)
      console.log(this.type)
      console.log(this.user)
      console.log(this.charity)
      console.log(this.document)
      console.log(this.status)
    }
  }
}
</script>

<template>
  <div class="form-container">
    <v-sheet class="mx-auto" width="300">
      <h1 class="account-title">Create Request</h1>

      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="title" label="Title"></v-text-field>

        <v-textarea v-model="description" label="Description"></v-textarea>

        <v-text-field
          v-model="family_member"
          label="Family Members"
          type="number"
        ></v-text-field>

        <v-text-field
          v-model="salary"
          label="Salary"
          type="number"
        ></v-text-field>

        <v-text-field
          v-model="expected_amount"
          label="Expected Amount"
          type="number"
        ></v-text-field>

        <v-date-picker
          v-model="expected_date"
          label="Expected Date"
        ></v-date-picker>

        <v-file-input
          v-model="document"
          label="Document"
          accept="image/*, application/pdf"
        ></v-file-input>

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
