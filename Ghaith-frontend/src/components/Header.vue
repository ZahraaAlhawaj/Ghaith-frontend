<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Header',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)
    const isLoggedIn = computed(() => store.getters.isLoggedIn)

    return { isLoggedIn, user }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<template>

  <v-app
    class="header"
    v-if="isLoggedIn && (user.role === 'Admin' || user.role === 'Super Admin')"
  >
    <v-navigation-drawer class="admin-links" :width="200">
      <section>
        <v-list-item
          class="admin-link"
          :title="user.name"
          :subtitle="user.role"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          class="admin-link"
          link
          title="Users"
          to="/admin/users"
        ></v-list-item>
        <v-list-item
          class="admin-link"
          link
          title="Categories"
          to="/admin/categories"
        ></v-list-item>
        <v-list-item
          class="admin-link"
          link
          title="Charities"
          to="/admin/charities"
        ></v-list-item>
        <v-list-item
          class="admin-link"
          link
          title="Cases"
          to="/admin/cases"
        ></v-list-item>
        <v-list-item
          class="admin-link"
          link
          title="Donations"
          to="/admin/donations"
        ></v-list-item>
        <v-list-item
          class="admin-link"
          link
          title="Requests"
          to="/admin/requests"
        ></v-list-item>
        <v-list-item
          class="admin-link"
          link
          title="Pickups"
          to="/admin/pickup"
        ></v-list-item>
      </section>
      <section class="logout">
        <v-list-item
          class="admin-link"
          link
          title="Logout"
          @click="logout"
        ></v-list-item>
      </section>
    </v-navigation-drawer>
  </v-app>
  <nav class="header" v-else>
    <div class="nav-bar">
      <i class="bx bx-menu sidebarOpen"></i>
      <!-- <span class="logo navLogo"><router-link to="/">Gaith </router-link></span> -->
      <span class="logo navLogo">
        <router-link to="/">
          <img src="/images/lo.png" alt="Logo" />
        </router-link>
      </span>
      <div class="menu">
        <div class="logo-toggle">
          <span class="logo"><router-link to="/">CodingLab</router-link></span>
          <i class="bx bx-x siderbarClose"></i>
        </div>
        <ul class="nav-links">
          <li><router-link to="/about">About</router-link></li>
          <li v-if="user">
            <router-link to="/profile">Profile</router-link>
          </li>
          <li v-if="!user"><router-link to="/login">Login</router-link></li>
          <li><router-link to="/charities">Charities</router-link></li>
          <li v-if="user">
            <a to="/logout" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
      <!-- <div class="darkLight-searchBox">
            <div class="dark-light">
            <i class='bx bx-moon moon'></i>
            <i class='bx bx-sun sun'></i>
            </div>
            <div class="searchBox">
            <div class="searchToggle">
                <i class='bx bx-x cancel'></i>
                <i class='bx bx-search search'></i>
            </div>
            <div class="search-field">
                <input type="text" placeholder="Search...">
                <i class='bx bx-search'></i>
            </div>
            </div>
        </div> -->
    </div>
    <!-- <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/charities">Charities</router-link> -->
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  background-color: var(--nav-color);
  z-index: 100;
}

body.dark nav {
  border: 1px solid #393838;
}

nav .nav-bar {
  position: relative;
  /* height: 100%;
    max-width: 1000px; */
  width: 100%;
  background-color: var(--nav-color);
  /* margin: 0 auto; */
  padding: 0 30px;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  background-color: var(--nav-color);
  /* margin: 0 auto; */
  padding: 0 30px;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
}

nav .nav-bar .sidebarOpen {
  color: var(--text-color);
  font-size: 25px;
  padding: 5px;
  cursor: pointer;
  display: none;
}

nav .nav-bar .logo a {
  font-size: 25px;
  font-weight: 500;
  color: var(--text-color);
  text-decoration: none;
}

.menu .logo-toggle {
  display: none;
}

.nav-bar .nav-links {
  display: flex;
  align-items: right;
}

.nav-bar .nav-links li {
  margin: 0 5px;
  list-style: none;
}

.nav-links li a {
  position: relative;
  font-size: 17px;
  font-weight: 400;
  color: var(--text-color);
  text-decoration: none;
  padding: 10px;
  cursor: pointer;
}

.nav-links li a::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: var(--text-color);
  opacity: 0;
  transition: all 0.3s ease;
}

.nav-links li:hover a::before {
  opacity: 1;
}

.nav-bar .darkLight-searchBox {
  display: flex;
  align-items: center;
}

.darkLight-searchBox .dark-light,
.darkLight-searchBox .searchToggle {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
}

.darkLight-searchBox .searchToggle {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
}

.dark-light i,
.searchToggle i {
  position: absolute;
  color: var(--text-color);
  font-size: 22px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.searchToggle i {
  position: absolute;
  color: var(--text-color);
  font-size: 22px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark-light i.sun {
  opacity: 0;
  pointer-events: none;
}

.dark-light.active i.sun {
  opacity: 1;
  pointer-events: auto;
}

.dark-light.active i.moon {
  opacity: 0;
  pointer-events: none;
}

.searchToggle i.cancel {
  opacity: 0;
  pointer-events: none;
}

.searchToggle.active i.cancel {
  opacity: 1;
  pointer-events: auto;
}

.searchToggle.active i.search {
  opacity: 0;
  pointer-events: none;
}

.searchBox {
  position: relative;
}

.searchBox .search-field {
  position: absolute;
  bottom: -85px;
  right: 5px;
  height: 50px;
  width: 300px;
  display: flex;
  align-items: center;
  background-color: var(--nav-color);
  padding: 3px;
  border-radius: 6px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}

.searchToggle.active ~ .search-field {
  bottom: -74px;
  opacity: 1;
  pointer-events: auto;
}

.search-field::before {
  content: '';
  position: absolute;
  right: 14px;
  top: -4px;
  height: 12px;
  width: 12px;
  background-color: var(--nav-color);
  transform: rotate(-45deg);
  z-index: -1;
}

.search-field input {
  height: 100%;
  width: 100%;
  padding: 0 45px 0 15px;
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: var(--search-text);
  background-color: var(--search-bar);
}

body.dark .search-field input {
  color: var(--text-color);
}

.search-field i {
  position: absolute;
  color: var(--nav-color);
  right: 15px;
  font-size: 22px;
  cursor: pointer;
}

body.dark .search-field i {
  color: var(--text-color);
}

@media (max-width: 790px) {
  nav .nav-bar .sidebarOpen {
    display: block;
  }
  .menu {
    position: fixed;
    height: 100%;
    width: 320px;
    left: -100%;
    top: 0;
    padding: 20px;
    background-color: var(--side-nav);
    z-index: 100;
    transition: all 0.4s ease;
  }
  nav.active .menu {
    left: -0%;
  }
  nav.active .nav-bar .navLogo a {
    opacity: 0;
    transition: all 0.3s ease;
  }
  .menu .logo-toggle {
    display: block;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo-toggle .siderbarClose {
    color: var(--text-color);
    font-size: 24px;
    cursor: pointer;
  }
  .nav-bar .nav-links {
    flex-direction: column;
    padding-top: 30px;
  }
  .nav-links li a {
    display: block;
    margin-top: 20px;
  }
  nav .nav-bar .sidebarOpen {
    display: block;
  }
  .menu {
    position: fixed;
    height: 100%;
    width: 320px;
    left: -100%;
    top: 0;
    padding: 20px;
    background-color: var(--side-nav);
    z-index: 100;
    transition: all 0.4s ease;
  }
  nav.active .menu {
    left: -0%;
  }
  nav.active .nav-bar .navLogo a {
    opacity: 0;
    transition: all 0.3s ease;
  }
  .menu .logo-toggle {
    display: block;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo-toggle .siderbarClose {
    color: var(--text-color);
    font-size: 24px;
    cursor: pointer;
  }
  .nav-bar .nav-links {
    flex-direction: column;
    padding-top: 30px;
  }
  .nav-links li a {
    display: block;
    margin-top: 20px;
  }
}

.logo {
  display: flex;
  align-items: center;
  padding-top: 0.8%;
}

.logo img {
  width: 22%; /* Adjust the width to your desired size */
  height: auto; /* Automatically adjust the height based on the aspect ratio */
}

.navLogo {
  margin-right: 10%; /* Add some spacing between the logo and other elements in the header */
}

.admin-links {
  display: flex;
  flex-direction: column;
  align-items: space-around;
}

.admin-link {
  color: white;
}
</style>
