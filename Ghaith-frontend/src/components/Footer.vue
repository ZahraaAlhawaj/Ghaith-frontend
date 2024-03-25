<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} Ghaith. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  /* position: fixed; */
  left: 0;
  bottom: 0;
  width: 100%;
  padding-top: 1%;
  padding-bottom: 1%;
  background-color: #4b5f23;
  text-align: center;
}

.footer-content {
  color: #e6e5d0;
  font-size: 14px;
}
</style>
