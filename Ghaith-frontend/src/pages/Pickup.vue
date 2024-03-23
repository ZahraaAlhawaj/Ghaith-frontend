<script>
import { showChairties, addPickup } from '../services/pickup'
export default {
  name: 'Pickup',
  data: function () {
    return {
      coords: null,
      step: 1,
      charities: null,
      formValues: {
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
      this.getNearCharity(this.coords)
    })
  },
  methods: {
    async getNearCharity(coords) {
      const res = await showChairties(coords)
      this.charities = res
    },
    handleFormChange(event) {
      this.formValues = {
        ...this.formValues,
        [event.target.name]: event.target.value
      }
    },
    async handleSubmit() {
      event.preventDefault()
      const res = await addPickup(this.formValues)
      this.resetForm()
    },
    handleUrgentChange() {
      this.formValues['urgent'] = !this.formValues['urgent']
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
    <v-stepper alt-labels :items="['Step 1', 'Step 2']">
      <!-- to show nearby charity -->
      <template v-slot:item.1>
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
                        <v-card-title
                          class="text-h6 text-white d-flex flex-column"
                        >
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

      <!-- pickup form  -->
      <template v-slot:item.2>
        <v-card title="Create Pickup" flat>
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
                  @input="handleFormChange"
                ></v-text-field>

                <v-select
                  v-model="formValues['type']"
                  :items="['clothe', 'food']"
                  label="Type"
                  @input="handleFormChange"
                ></v-select>

                <v-checkbox
                  v-model="formValues['urgent']"
                  label="Urgent"
                  @change="handleUrgentChange"
                ></v-checkbox>
                <v-btn rounded="xl" class="mt-2" type="submit" block
                  >Submit</v-btn
                >
              </v-form>
            </v-sheet>
          </div>
        </v-card>
      </template>
    </v-stepper>
  </div>

  <div v-else>
    <div>Your location is not supported</div>
    <div>
      No charity available at this location, please select your location.
    </div>
  </div>
</template>
