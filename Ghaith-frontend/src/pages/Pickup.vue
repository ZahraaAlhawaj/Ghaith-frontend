<script>
import { showChairties, addPickup } from '../services/pickup'
export default {
  name: 'Pickup',
  data: function () {
    return {
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
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.getNearCharity(coords)
    })
  },
  methods: {
    async getNearCharity(coords) {
      res = await showChairties(coords)
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
    }
  }
}
</script>

<template>
  <v-stepper alt-labels :items="['Step 1', 'Step 2']">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1">Step 1</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 2">Step 2</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <!-- Step One Content -->
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card title="Step Two" flat>
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
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
