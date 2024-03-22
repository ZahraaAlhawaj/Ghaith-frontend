<script>
export default {
  name: 'Cases',
  data: function () {
    return {
      slider3: 100,
      search: '',
      cases: [
        {
          title: 'Treatment'
        },
        {
          title: 'Orphan'
        },
        {
          title: 'Home'
        }
      ]
    }
  },
  computed: {
    filteredCases() {
      return this.cases.filter((c) =>
        c.title.toLowerCase().includes(this.search.toLowerCase())
      )
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
  <v-container>
    <h1>Cases</h1>

    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
    ></v-text-field>

    <v-row>
      <v-col
        v-for="(c, index) in filteredCases"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto" max-width="344" @click="showCase(c.id)">
          <v-img height="200px" :src="c.image" cover></v-img>

          <v-card-title>{{ c.title }}</v-card-title>

          <v-card-subtitle>{{ c.subtitle }}</v-card-subtitle>

          <v-slider
            label=""
            color="green"
            v-model="slider3"
            model-value="30"
            readonly
          ></v-slider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
