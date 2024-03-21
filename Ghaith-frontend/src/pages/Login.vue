<script>
export default {
  name: 'Login'
}
</script>

<template>
  <div class="form-container">
    <v-sheet class="mx-auto" width="300">
      <h1 className="account-title">Login</h1>
      <p className="account-description">Enter your email and password</p>

      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="password"
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
  color: #4399f6;
}
</style>
