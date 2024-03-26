<script>
import { getCases } from '../services/case'
import { ref } from 'vue'
export default {
  name: 'Cases',
  data: function () {
    return {
      slider3: 100,
      search: '',
      cases: [],
      collectedAmount: 0,
      percentage: [],
      showCases: []
    }
  },
  mounted() {
    this.getCases()
  },
  computed: {
    filteredCases() {
      if (this.showCases.length != 0) {
        return this.showCases
      } else {
        return this.cases.filter((c) =>
          c.name.toLowerCase().includes(this.search.toLowerCase())
        )
      }
    }
  },
  watch: {
    filteredCases: {
      deep: true,
      handler(newVal) {
        newVal.forEach((c, index) => {
          if (c.total_amount == 0) {
            this.percentage[index] = 0
          } else {
            this.percentage[index] = (c.collected_amount / c.total_amount) * 100
          }
        })
      }
    }
  },
  methods: {
    showCase(id) {
      this.$router.push(`/cases/${id}`)
    },
    async getCases() {
      const response = await getCases()
      this.cases = response
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    },
    showCategory(val) {
      this.showCases = this.cases.filter(
        (c) => c.category && c.category.name == val
      )
      return this.showCases
    }
  }
}
</script>

<template>
  <v-container class="pa-4 text-center">
    <!-- <div class="title">
      <h1 class="yellow-underlined title">Cases</h1>
    </div> -->
    <v-tabs align-tabs="center" color="deep-purple-accent-4">
      <v-tab value="general" @click="showCategory('general')">Generel</v-tab>
      <v-tab value="Treatment" @click="showCategory('Treatment')"
        >Treatment</v-tab
      >
      <v-tab value="Home Renovation" @click="showCategory('Home-Renovation')"
        >Home Renovation</v-tab
      >
      <v-tab value="Family" @click="showCategory('Family')">Family</v-tab>
    </v-tabs>
    <br />
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
    ></v-text-field>

    <v-row align="center" class="fill-height" justify="center">
      <template class="card1" v-for="(c, index) in filteredCases" :key="index">
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :elevation="isHovering ? 12 : 2"
              v-bind="props"
              @click="showCase(c._id)"
            >
              <v-img :src="c.image" cover> </v-img>

              <v-progress-linear
                v-model="percentage[index]"
                height="25"
                color="green"
              >
                <strong
                  >{{
                    ((c.collected_amount / c.total_amount) * 100).toFixed(2)
                  }}%</strong
                >
              </v-progress-linear>
              <br />
              <!-- <div class="break"></div> -->

              <v-card-title>{{ c.name }}</v-card-title>

              <v-card-subtitle>code: {{ c.code }}</v-card-subtitle>

              <v-card-subtitle
                >Desired amount: {{ c.total_amount }} BD</v-card-subtitle
              >
              <div class="date-style">
                <div class="date-label">
                  <p>Start Date</p>
                  <p>End Date</p>
                </div>
                <div class="date-value">
                  <p>{{ formatDate(c.start_date) }}</p>
                  <p>{{ formatDate(c.end_date) }}</p>
                </div>
              </div>
              <!-- <v-card-subtitle
                >Start Date: {{ formatDate(c.start_date) }}</v-card-subtitle
              >
              <v-card-subtitle
                >End Date: {{ formatDate(c.end_date) }}</v-card-subtitle
              > -->
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-row {
  margin-top: 12px !important;
}

.v-img {
  width: 100%;
  height: 50%;
  object-fit: cover !important;
}

.v-card {
  width: 18em;
  height: 28em;
  /* border-radius: 50%; */
  /* object-fit: cover; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 0.2em solid #4b5f23;
  background-color: #e6e5d0;
  object-fit: contain !important;
  padding: 0 0 13% 0;
}

.pa-4 {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  color: #4b5f23;
  text-transform: capitalize;
  margin-bottom: 5%;
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

/* .v-img__img .v-img__img--cover {
  object-fit: cover !important;
} */
.v-img__img--cover {
  object-fit: cover !important;
}

.v-progress-linear {
  margin-bottom: -10%;
}

.date-style {
  display: flex;
  flex-direction: column;
  width: 80%;
  font-size: 15px;
}

.date-label {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.date-value {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
