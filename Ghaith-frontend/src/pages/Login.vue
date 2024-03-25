<script>
import { LoginUser } from '../services/auth'
import { useStore } from 'vuex'

export default {
  name: 'Login',
  data: function () {
    return {
      formValues: {
        email: null,
        password: null
      },
      store: useStore()
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
      const res = await LoginUser({
        email: this.formValues.email,
        password: this.formValues.password
      })
      if (res.status && res.status !== 200) {
      } else {
        localStorage.setItem('token', res.data.token)
        this.store.dispatch('login', res.data.user)
        this.$router.push(`/`)
      }
    }
  }
}
</script>

<template>
  <div class="BG">
    <div class="form-container">
      <v-sheet class="mx-auto" width="300">
        <h1 className="account-title">Login</h1>
        <p className="account-description">Enter your email and password</p>

        <v-form fast-fail @submit.prevent @submit="handleSubmit">
          <v-text-field
            v-model="formValues['email']"
            label="email"
            @input="handleFormChange"
          ></v-text-field>

          <v-text-field
            v-model="formValues['password']"
            label="password"
            type="password"
            @input="handleFormChange"
          ></v-text-field>

          <v-btn rounded="xl" class="mt-2" type="submit" block>Submit</v-btn>
        </v-form>
        <div class="register-container">
          <p class="register">No account?</p>
          <router-link to="/register" class="register-link">
            Create account
          </router-link>
        </div>
      </v-sheet>
    </div>
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
  margin: 1em auto;
  padding: 2em;
  border-radius: 10px;
  background-color: #ffffff;
  border: 0.12em solid #4b5f23;
  margin-top: 3%;
}

.register-link {
  padding-top: 5%;
  font-weight: 400px;
  font-size: 13px;
}

.register {
  padding-top: 5%;
  font-weight: 400px;
  font-size: 13px;
  margin-right: 5px;
}

.register-container {
  display: flex;
}

.register-link {
  color: #4b5f23;
}

.v-btn {
  background-color: #4b5f23;
  color: #e6e5ce;
  box-shadow: none;
  font-family: avenir, sans-serif;
}

/* .v-sheet{
  display: none;
} */
</style>
