<script>
import { getUserInfo } from '../services/profile'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Profile',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.currentUser)

    return { user }
  },
  data: () => ({
    userDetails: null
  }),
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const response = await getUserInfo()
      this.userDetails = response
    }
  }
}
</script>


