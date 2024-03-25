<template>
  <div>
    <select v-model="selectedLang" @change="switchLanguage">
      <option
        v-for="(lang, index) in supportedLanguages"
        :key="index"
        :value="lang"
      >
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      supportedLanguages: ['en', 'fr'], // Add more languages if needed
      selectedLang: 'en' // Set the initial selected language
    }
  },
  methods: {
    async switchLanguage() {
      try {
        const response = await axios.get(
          `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${this.selectedLang}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key': 'YOUR_API_KEY'
            },
            params: {
              text: ['Hello', 'Welcome to my app']
            }
          }
        )

        const translations = response.data[0].translations
        this.$i18n.setLocaleMessage(this.selectedLang, {
          greeting: translations[0].text,
          welcome: translations[1].text
        })

        this.$i18n.locale = this.selectedLang
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
<!-- 
<template>
  <div>
    <div ref="paypal">
      <button v-if="loaded && !paidFor" @click="createOrder">
        Pay with PayPal
      </button>
      <div v-else-if="paidFor">
        <h3>Thank you for your donation!</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Text',

  data() {
    return {
      loaded: false,
      paidFor: false,
      donation: {
        price: 20
      }
    }
  },

  mounted() {
    this.loaded = true
    this.renderPayPalButton()
  },

  methods: {
    renderPayPalButton() {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: this.donation.price
                  }
                }
              ]
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            this.paidFor = true
            console.log(order)
          },
          onError: (err) => {
            console.log(err)
          }
        })
        .render(this.$refs.paypal)
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style> -->
