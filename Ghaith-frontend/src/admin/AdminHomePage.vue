<script>
export default {
  name: 'AdminHomePage'
}
</script>

<template>
  <v-container class="adminHomePage">
    <h1 class="adminHeading">Welcome</h1>
    <h2 class="adminHeading">Ghaith Admin Dashboard</h2>
  </v-container>
</template>

<style>
.adminHomePage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--nav-color);
}
</style>
