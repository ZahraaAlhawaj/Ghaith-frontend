<script>
export default {
  name: 'Cases',
  data: function () {
    return {
      slider3: 100
    }
  },
  methods: {
    showCase() {
      this.$router.push(`/cases/1`)
    }
  }
}
</script>

<template>
  <h1>Cases</h1>
  <v-card class="mx-auto" max-width="344" @click="showCase">
    <v-img
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    ></v-img>

    <v-card-title> Top western road trips </v-card-title>

    <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

    <v-slider
      label=""
      color="green"
      v-model="slider3"
      model-value="30"
      readonly
    ></v-slider>
  </v-card>
</template>

<style></style>
