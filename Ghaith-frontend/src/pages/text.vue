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
</style>
