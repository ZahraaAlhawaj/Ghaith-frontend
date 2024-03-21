<script>
  export default {
    name: 'Register'
  }
</script>

<template>
  <div class="form-container">
    <v-sheet class="mx-auto" width="300">
      <h1 class="account-title">Create Your Account</h1>
        <p class="account-description">
          Enter your name, email, and password 
          to create your account
        </p>
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="Name"
          :rules="firstNameRules"
          label="name"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="email"
        ></v-text-field>

        <v-text-field
          v-model="phoneNumber"
          :rules="phoneRules"
          label="phone number"
        ></v-text-field>

        <v-text-field
          v-model="birthDate"
          :rules="birthRules"
          label="birth date"
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

