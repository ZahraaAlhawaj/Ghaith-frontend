<script>
import { RegisterUser } from '../services/auth'

export default {
  name: 'Register',
  data: function () {
    return {
      formValues: {
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
        phone_number: null,
        birth_date: null,
        role: 'User'
      },
      nameRules: [(v) => !!v || 'Name is required']
    }
  },
  methods: {
    handleFormChange(event) {
      this.formValues = {
        ...this.formValues,
        [event.target.name]: event.target.value
      }
    },
    async handleSubmit(event) {
      event.preventDefault()
      const res = await RegisterUser(this.formValues)
      if (res.status !== 200) {
      } else {
        this.$router.push(`/login`)
        // formValues = {
        //   name: null,
        //   email: null,
        //   password: null,
        //   phone_number: null,
        //   birth_date: null
        // }
      }
    }
  }
}
</script>

<template>
  <div class="form-container">
    <v-sheet class="mx-auto" width="300">
      <h1 class="account-title">Create Your Account</h1>
      <p class="account-description">
        Enter your name, email, and password to create your account
      </p>
      <v-form fast-fail @submit.prevent @submit="handleSubmit">
        <v-text-field
          v-model="formValues['name']"
          :rules="nameRules"
          label="Name"
          @input="handleFormChange"
        ></v-text-field>

        <v-text-field
          v-model="formValues['email']"
          label="Email"
          type="email"
          @input="handleFormChange"
        ></v-text-field>

        <v-text-field
          v-model="formValues['phone_number']"
          label="Phone Number"
          @input="handleFormChange"
        ></v-text-field>

        <v-text-field
          v-model="formValues['password']"
          label="Password"
          type="password"
          @input="handleFormChange"
        ></v-text-field>

        <v-text-field
          v-model="formValues['confirmPassword']"
          label="Confirm Password"
          type="password"
          @input="handleFormChange"
        ></v-text-field>

        <v-text-field
          v-model="formValues['birth_date']"
          label="Birth Date"
          @input="handleFormChange"
          type="date"
        ></v-text-field>

        <v-btn rounded="xl" class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped>
/* update-form2 */
.account-title {
  font-size: 24px;
  text-align: left;
  color: #4B5F23;
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

.v-btn{
  background-color: #4B5F23;
  color:#E6E5CE;
  box-shadow: none;
  font-family: avenir, sans-serif;
}
</style>
