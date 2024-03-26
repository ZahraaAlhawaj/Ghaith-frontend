<script>
import { ResetPassword } from '../services/auth'
import { useStore } from 'vuex'
export default {
  name: 'ResetPassword',
  data: function () {
    return {
      formValues: {
        password: '',
        confirmPassword: ''
      },
      store: useStore()
    }
  },

  methods: {
    async handleSubmit(event) {
      event.preventDefault()
      const user = await ResetPassword(this.formValues)
      if (user) {
        this.store.dispatch('login', user)
        this.$router.push('/admin')
      }
    }
  }
}
</script>

<template>
  <v-container class="form-container">
    <v-sheet class="mx-auto" width="300">
      <h1 className="account-title">Reset Password</h1>
      <p className="account-description">Reset your account password</p>
      <v-form fast-fail @submit.prevent @submit="handleSubmit">
        <v-text-field
          v-model="formValues['password']"
          label="Password"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="formValues['confirmPassword']"
          label="Confirm Password"
          type="password"
        ></v-text-field>
        <v-btn rounded="xl" class="mt-2" type="submit" block>Reset</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
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
  margin: 1em auto;
  padding: 2em;
  border-radius: 10px;
  background-color: #ffffff;
  border: 0.12em solid #4b5f23;
  margin-top: 3%;
}

.v-btn {
  background-color: #4b5f23;
  color: #e6e5ce;
  box-shadow: none;
  font-family: avenir, sans-serif;
}
</style>
