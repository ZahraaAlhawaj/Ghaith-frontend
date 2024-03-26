<script>
import { getUsers } from '../services/user'
export default {
  name: 'Users',
  data: function () {
    return {
      search: '',
      users: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password1'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          password: 'password2'
        }
      ],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phone_number' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  mounted() {
    this.getAllUsers()
  },
  methods: {
    async getAllUsers() {
      this.users = await getUsers()
    },
    showUser(item) {
      // navigate
    }
  }
}
</script>

<template>
  <v-container>
    <h1 class="list-title">Users</h1>
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
      <v-data-table :headers="headers" :items="users" :search="search">
        <template v-slot:headers="props">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
          </tr>
        </template>
        <template v-slot:items="props">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone_number }}</td>
            <td>{{ item.role }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style scoped>
.tableContainer {
  display: flex;
  justify-content: center;
}
.table {
  width: 80%;
  height: 100%;
  margin: auto;
}

.list-title {
  color: var(--nav-color);
}

.v-btn {
  background-color: #4b5f23;
  color: #e6e5ce;
  box-shadow: none;
  font-family: avenir, sans-serif;
}
</style>
