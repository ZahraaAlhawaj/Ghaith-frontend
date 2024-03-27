<script>
import { getDonations } from '../services/donation'
import { getCharity } from '../services/charity'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Donations',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)

    return { user }
  },
  data: function () {
    return {
      search: '',
      donations: [],
      headers: [
        { text: 'Amount', value: 'amount' },
        { text: 'User', value: 'user.email' }
      ]
    }
  },
  mounted() {
    this.getAllDonations()
  },
  methods: {
    async getAllDonations() {
      if (this.user.role == 'Admin') {
        const res = await getCharity(this.user.charityId)
        this.donations = res.donations
      } else {
        this.donations = await getDonations()
      }
    }
  }
}
</script>

<template>
  <v-container class="list-header">
    <h1 class="list-title">Donations</h1>
  </v-container>
  <v-container>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="donations" :search="search">
        <template v-slot:headers="props">
          <tr>
            <th>Amount</th>
            <th>User</th>
          </tr>
        </template>

        <template v-slot:item.amount="{ item }">
          <td>{{ item.amount }} BHD</td>
        </template>

        <template v-slot:items="props">
          <tr>
            <td>{{ item.amount }}</td>
            <td>{{ item.user.name }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style></style>
