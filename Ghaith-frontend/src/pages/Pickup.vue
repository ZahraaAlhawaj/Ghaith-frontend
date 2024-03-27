<script>
import { showChairties, addPickup } from '../services/pickup'
export default {
  name: 'Pickup',
  data: function () {
    return {
      coords: null,
      step: 1,
      charities: null,
      //isSelected: false,
      selectedCharities: null,
      prevCoords: null,

      formValues: {
        charity: null,
        date: '',
        type: '',
        quantity: '',
        urgent: false
      }
    }
  },
  mounted: function () {
    navigator.geolocation.getCurrentPosition(async (position) => {
      this.coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.getNearCharity()
    })
  },

  computed: {
    isCardSelected() {
      return this.selectedCharities !== null
    }
  },
  methods: {
    async getNearCharity() {
      const res = await showChairties(this.coords)
      this.charities = res
    },
    selectCharity(charityID) {
      if (this.selectedCharities == charityID) {
        this.selectedCharities = null
        this.formValues.charity = null
      } else {
        this.selectedCharities = charityID
        this.formValues.charity = charityID
      }
      this.$emit('select', this.formValues.charity)
    },
    isSelected(charityID) {
      return this.selectedCharities == charityID
    },
    handleFormChange(event) {
      this.formValues = {
        ...this.formValues,
        [event.target.name]: event.target.value
      }
    },
    handleUrgentChange() {
      this.formValues['urgent'] = !this.formValues['urgent']
    },
    async handleSubmit() {
      event.preventDefault()
      const res = await addPickup(this.formValues)
      if (res) {
        console.log('done')
      } else {
        console.log('something wrong')
      }
      this.resetForm()
      this.$router.push(`/profile`)
    },
    resetForm() {
      this.formValues = {
        date: '',
        type: '',
        quantity: '',
        urgent: false
      }
    }
  }
}
</script>
<template>
  <div v-if="coords">
    <v-container class="pickup-container">
      <v-stepper alt-labels :items="['Step 1', 'Step 2']" class="step-class">
        <!-- to show nearby charity -->
        <template v-slot:item.1>
          <v-container class="pa-4 text-center pick-cont">
            <v-row align="center" class="fill-height" justify="center">
              <template v-for="(charity, i) in charities" :key="i">
                <v-col cols="12" md="4">
                  <v-card
                    :class="{ 'selected-card': isSelected(charity._id) }"
                    @click="selectCharity(charity._id)"
                  >
                    <v-img :src="charity.logo" height="225px" cover> </v-img>
                    <div class="align-self-center">
                      <v-card-title class="d-flex flex-column">
                        <h3 class="text-h5 font-weight-light text-black mb-2">
                          {{ charity.name }}
                        </h3>
                      </v-card-title>
                    </div>
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </v-container>
        </template>

        <!-- pickup form  -->
        <template v-slot:item.2>
          <div class="form-container">
            <v-sheet class="mx-auto" width="300">
              <h1 class="account-title">Create Pickup</h1>
              <p class="account-description">Enter the pickup details</p>

              <v-form @submit.prevent="handleSubmit">
                <v-text-field
                  v-model="formValues['date']"
                  label="Date"
                  type="date"
                  @input="handleFormChange"
                ></v-text-field>

                <v-text-field
                  v-model="formValues['time']"
                  label="Time"
                  type="time"
                  name="time"
                  @input="handleFormChange"
                ></v-text-field>

                <v-select
                  v-model="formValues['type']"
                  :items="['Cloth', 'Food', 'Other']"
                  label="Type"
                  @input="handleFormChange"
                ></v-select>

                <v-checkbox
                  v-model="formValues['urgent']"
                  label="Urgent"
                  @click="handleUrgentChange"
                ></v-checkbox>
                <v-btn rounded="xl" class="mt-2" type="submit" block
                  >Submit</v-btn
                >
              </v-form>
            </v-sheet>
          </div>
        </template>
      </v-stepper>
    </v-container>
  </div>

  <!-- <div v-else>
    <div>Your location is not supported</div>
    <div>
      No charity available at this location, please select your location.
    </div>
  </div> -->
  <div v-else>
    <v-sheet
      class="pa-4 text-center mx-auto"
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
    >
      <v-icon
        class="mb-5"
        color="error"
        icon="mdi-map-marker-off"
        size="112"
      ></v-icon>

      <h2 class="text-h5 mb-6">We have trouble detecting your location</h2>

      <v-divider class="mb-4"></v-divider>
    </v-sheet>
  </div>
</template>

<style scoped>
.selected-card {
  border: 2px solid green !important;
}

.account-title {
  font-size: 24px;
  text-align: left;
  color: #4b5f23;
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
  border: 0px solid #ffffff;
  margin-top: 3%;
}

.v-btn {
  background-color: #4b5f23;
  color: #e6e5ce;
  box-shadow: none;
  font-family: avenir, sans-serif;
}

.pickup-container {
  border: 0.12em solid #4b5f23;
  padding: 0 !important;
  margin-bottom: 5%;
}

.step-class {
  background-color: #e6e5d0 !important;
}
</style>
