<script>
export default {
  name: 'Charities',
  methods: {
    showCharity() {
      this.$router.push(`/charity/1`)
    }
  }
}
</script>

<template>
  <h1>All Charities</h1>
  <v-card
    class="mx-auto"
    height="200"
    image="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    max-width="300"
    max-height="350"
    theme="dark"
    title="Card title"
    @click="showCharity"
  ></v-card>
</template>
