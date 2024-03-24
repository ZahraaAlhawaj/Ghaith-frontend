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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lectus
      auctor, auctor mi id, aliquet neque. Suspendisse potenti. Nullam bibendum
      tristique justo, ac viverra ex eleifend ac. Vestibulum ante ipsum primis
      in faucibus orci
    </p>
  </div>

  <div class="cover-page">
    <div class="image-container">
      <img src="/images/Charity.jpeg" alt="Cover Image" class="image-cover" />
      <div class="text-container">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
          lectus Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          nec lectus auctor, auctor mi id, aliquet neque. Suspendisse potenti.
          Nullam bibendum tristique justo, ac viverra ex eleifend ac. Vestibulum
        </p>
      </div>
    </div>
  </div>

  <!-- <v-card
    v-for="charity in charities"
    :key="charity._id"
    class="mx-auto"
    height="200"
    :image="charity.logo"
    max-width="300"
    max-height="350"
    theme="dark"
    @click="showCharity(charity._id)">
  </v-card> -->
  <div class="title">
    <h1 class="yellow-underlined title">Charities</h1>
  </div>

  <v-container class="pa-4 text-center">
    <v-row align="center" class="fill-height" justify="center">
      <template class="card1" v-for="(charity, i) in charities" :key="i">
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :class="{ 'on-hover': isHovering }"
              :elevation="isHovering ? 12 : 2"
              v-bind="props"
              @click="showCharity(charity._id)"
            >
              <v-img :src="charity.logo" height="100em" cover> </v-img>
            </v-card>
            <!-- <p class="mt-4" 
            v-if="isHovering"
            > -->
            <h3 class="mt-4">
              {{ charity.name }}
            </h3>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card-title {
  color: red !important;
}

.v-img {
  width: 50%; /* Adjust the desired width */
  height: 50%; /* Adjust the desired height */
  object-fit: contain;
}

.v-card {
  width: 9.5em; /* Adjust the width of the avatar picture */
  height: 9.5em; /* Adjust the height of the avatar picture */
  border-radius: 50%;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10%;
  border: 0.2em solid #4b5f23;
   background-color: #E6E5D0 
}

.pa-4 {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #4b5f23;
  text-transform: capitalize;
  margin-bottom: 5%;
}

.card1 {
}

/* .v-card:not(.on-hover) {
  opacity: 0.6;
} */

/* .on-hover {
  cursor: pointer;
} */
/* .... */
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
  color: #4B5F23;
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
}

.three-containers {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
