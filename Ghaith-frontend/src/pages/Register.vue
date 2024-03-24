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
        role: 1
      },
      charity: {
        name: null,
        logo: null,
        cr_number: null,
        googlemaplink: null
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
    handleCharityChange(event) {
      this.charity = {
        ...this.charity,
        [event.target.name]: event.target.value
      }
    },
    async handleSubmit(event) {
      event.preventDefault()
      let charity = null
      if (this.formValues.role === 2) {
        charity = this.charity
      }
      const res = await RegisterUser({
        user: this.formValues,
        charity: charity
      })
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
    <v-tabs
      v-model="formValues['role']"
      align-tabs="center"
      color="deep-purple-accent-4"
    >
      <v-tab :value="1">User</v-tab>
      <v-tab :value="2">Charity</v-tab>
    </v-tabs>
    <v-window v-model="formValues['role']">
      <v-window-item :value="1">
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
              name="name"
            ></v-text-field>

            <v-text-field
              v-model="formValues['email']"
              label="Email"
              type="email"
              name="email"
              @input="handleFormChange"
            ></v-text-field>

            <v-text-field
              v-model="formValues['phone_number']"
              label="Phone Number"
              name="phone_number"
              @input="handleFormChange"
            ></v-text-field>

            <v-text-field
              v-model="formValues['password']"
              label="Password"
              type="password"
              name="password"
              @input="handleFormChange"
            ></v-text-field>

            <v-text-field
              v-model="formValues['confirmPassword']"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              @input="handleFormChange"
            ></v-text-field>

            <v-text-field
              v-model="formValues['birth_date']"
              label="Birth Date"
              @input="handleFormChange"
              name="birth_date"
              type="date"
            ></v-text-field>

            <v-btn rounded="xl" class="mt-2" type="submit" block>Submit</v-btn>
          </v-form>
        </v-sheet>
      </v-window-item>
      <v-window-item :value="2">
        <v-sheet class="mx-auto" width="300">
          <h1 class="account-title">Register Your Charity</h1>
          <p class="account-description">
            Enter your name, email, and password to create your account
          </p>
          <v-form fast-fail @submit.prevent @submit="handleSubmit">
            <h4>Admin Details</h4>
            <v-text-field
              v-model="formValues['name']"
              :rules="nameRules"
              label="Name"
              @input="handleFormChange"
              name="name"
            ></v-text-field>

            <v-text-field
              v-model="formValues['email']"
              label="Email"
              type="email"
              name="email"
              @input="handleFormChange"
            ></v-text-field>

            <v-text-field
              v-model="formValues['phone_number']"
              label="Phone Number"
              name="phone_number"
              @input="handleFormChange"
            ></v-text-field>

            <v-text-field
              v-model="formValues['birth_date']"
              label="Birth Date"
              @input="handleFormChange"
              name="birth_date"
              type="date"
            ></v-text-field>

            <h4>Charity Details</h4>

            <v-text-field
              v-model="charity['name']"
              label="Charity Name"
              name="name"
              @input="handleCharityChange"
            ></v-text-field>

            <v-text-field
              v-model="charity['logo']"
              label="Logo"
              name="logo"
              @input="handleCharityChange"
            ></v-text-field>

            <v-text-field
              v-model="charity['googlemaplink']"
              label="Google Map Link"
              name="googlemaplink"
              @input="handleCharityChange"
            ></v-text-field>

            <v-text-field
              v-model="charity['cr_number']"
              label="Cr Number"
              name="cr_number"
              @input="handleCharityChange"
            ></v-text-field>

            <v-btn rounded="xl" class="mt-2" type="submit" block>Submit</v-btn>
          </v-form>
        </v-sheet>
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped>
/* update-form2 */
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
  border: 2px solid #ffffff;
  margin-top: -0.3%;
}

.v-btn {
  background-color: #4b5f23;
  color: #e6e5ce;
  box-shadow: none;
  font-family: avenir, sans-serif;
}
</style>
