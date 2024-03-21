<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Footer,
    Header
  }
}
</script>

<template>
  <div class="mainApp">
    <Header />
    <main class="content">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>
