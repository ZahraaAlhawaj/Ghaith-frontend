<script>
export default {
  name: 'Header'
}
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/charities">Charities</router-link>
  </nav>
</template>
