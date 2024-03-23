<script>
import { showChairties } from '../services/pickup'

export default {
  name: 'Pickup',
  data: function () {
    return {
      chairties: null
    }
  },
  mounted: function () {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.getNearChairty(coords)
    })
  },
  methods: {
    async getNearChairty(coords) {
      const res = await showChairties(coords)
      this.chairties = res
    }
  }
}
</script>

<template>
  <v-stepper alt-labels :items="['Step 1', 'Step 2', 'Step 3']">
    <template v-slot:item.1>
      <v-card title="Step One" flat>....</v-card>
    </template>

    <template v-slot:item.2>
      <v-card title="Step Two" flat>...</v-card>
    </template>

    <template v-slot:item.3>
      <v-card title="Step Three" flat>...</v-card>
    </template>
  </v-stepper>
</template>
