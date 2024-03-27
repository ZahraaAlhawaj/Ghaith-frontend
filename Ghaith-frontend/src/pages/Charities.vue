<script>
import { showAllCharity } from '../services/charity'
export default {
  name: 'Charities',
  data: () => ({
    charities: null
  }),
  mounted() {
    this.showAllCharity()
  },
  methods: {
    async showAllCharity() {
      const response = await showAllCharity()
      this.charities = response
    },
    showCharity(id) {
      this.$router.push(`/charity/${id}`)
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>All Charities</h1>
    <p>
      Extending a helping hand to those in need, our charity provides vital
      support and resources to empower individuals and communities. Through our
      compassionate initiatives, we strive to create positive change, inspire
      hope, and make a lasting impact on the lives of those facing challenges.
    </p>
  </div>

  <div class="cover-page">
    <div class="image-container">
      <img src="/images/Charity.jpeg" alt="Cover Image" class="image-cover" />
      <div class="text-container">
        <p>
          our charity is dedicated to providing essential services and support
          to underserved communities. With a focus on healthcare, education, and
          social empowerment, we aim to break barriers, uplift individuals, and
          create a more equitable society. Join us in building bridges of care.
        </p>
      </div>
    </div>
  </div>

  <div class="title">
    <h1 class="yellow-underlined title">Charities</h1>
  </div>

  <v-container class="pa-4">
    <v-row class="fill-height" justify="center">
      <template class="card1" v-for="(charity, i) in charities" :key="i">
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :elevation="isHovering ? 12 : 2"
              v-bind="props"
              @click="showCharity(charity._id)"
            >
              <v-img :src="charity.logo" height="100em"> </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-img {
  width: 30%;
  height: 10%;
  object-fit: contain !important;
}

.v-card {
  width: 13em;
  height: 9em;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 0.2em solid #4b5f23;
  background-color: #e6e5d0;
  object-fit: contain !important;
}

.image-cover {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container h1 {
  padding-top: 3%;
  font-size: 51px;
  margin-bottom: 10px;
  color: #4b5f23;
}

.container p {
  font-size: 16px;
  line-height: 1.3em;
  color: #4b5f23;
  width: 45%;
}

.text-container {
  background-color: #b1bf5c;
  padding: 20px;
  padding-top: 2%;
  padding-bottom: 2%;
  color: #4b5f23;
  text-align: center;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text-container p {
  font-size: 16px;
  line-height: 1.3em;
  color: #4b5f23;
  width: 45%;
}

.title {
  margin-top: 2%;
  padding-top: 1%;
  display: flex;
  justify-content: center;
}

.yellow-underlined {
  border-bottom: solid 10px #b1bf5c;
  color: #4b5f23;
  line-height: 0.35em;
  margin-top: 0.65em;
  display: inline-block;
  padding-left: 0.15em;
  padding-right: 0.15em;
  align-self: center;
  margin-bottom: 2%;
}

.three-containers {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.v-img__img .v-img__img--contain {
  object-fit: contain !important;
}
</style>
