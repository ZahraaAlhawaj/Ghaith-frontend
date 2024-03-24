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
      in faucibus orci luctus et ultrices posuere
    </p>
  </div>

  <div class="cover-page">
    <div class="image-container">
      <img src="/images/Charity.jpeg" alt="Cover Image" class="image-cover" />
      <div class="text-overlay">
        <h1>Welcome to My Website</h1>
        <p>Discover the power of Vue</p>
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

  <v-container class="pa-4 text-center">
    <v-row align="center" class="fill-height" justify="center">
      <template v-for="(charity, i) in charities" :key="i">
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :class="{ 'on-hover': isHovering }"
              :elevation="isHovering ? 12 : 2"
              v-bind="props"
              @click="showCharity(charity._id)"
            >
              <v-img :src="charity.logo" height="225px" cover>
                <div class="align-self-center">
                  <v-card-title class="text-h6 text-white d-flex flex-column">
                    <p class="mt-4" v-if="isHovering">
                      {{ charity.name }}
                    </p>
                  </v-card-title>
                </div>
              </v-img>
            </v-card>
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

.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.on-hover {
  cursor: pointer;
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
  font-size: 51px;
  margin-bottom: 20px;
  color: #4b5f23;
}

.container p {
  font-size: 16px;
  line-height: 1.3em;
  color: #4b5f23;
  width: 50%;
}
</style>
