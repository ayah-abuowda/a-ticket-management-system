<template>
    <div>
        <div class="container">
            <div class="top">
                <h3>Selected Ticket</h3>
            </div>
            <form>
                <div class="selectedCard">
                    <div class="ticket"><br>
                        <h5>Ticket ID: {{ ticket.ticket_id }}</h5>
                        <h4>From: {{ 'From' }} - To: {{ 'To' }}</h4>
                        <p>Date: {{ ticket.time }}</p>
                        <p class="totalPrice">Total Price: {{ ticket.price }} kr.</p>
                        <p><button>Buy Ticket</button></p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// get ticket with id
import { Api } from '../Api'

export default {
  name: 'SelectedTicket',
  mounted() {
    this.getTicket(this.$route.params.id)
  },
  data() {
    return {
      ticket: {}
    }
  },
  methods: {
    getTicket(id) {
      Api.get('/tickets/' + id)
        .then(response => {
          this.ticket = response.data.tickets
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          this.ticket = null
        })
        .then(() => {})
    }
  },
  async handleSubmit() {
    Api.get('/tickets/' + this.$route.params.id)
      .then(response => {
        this.ticket = response.data.tickets
      })
      .catch(error => {
        this.message = error.message
        console.error(error)
        this.ticket = null
      })
      .then(() => {})
  }
}
</script>

<style>
* {
    box-sizing: border-box;
}

.container {
    border: 3px solid transparent;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

div#main>h3.top {
    max-width: 500px;
    margin: auto;
    text-align: center;
    padding: 5px;
    background: #c8c8ca;
}

.selectedCard {
    max-width: 500px;
    margin: auto;
    text-align: center;
}

.totalPrice {
    color: black;
    font-weight: 900;
}

.selectedCard button {
    border: none;
    outline: 0;
    padding: 12px;
    color: white;
    background-color: #616feb;
    text-align: center;
    cursor: pointer;
    width: 100%;
    font-size: 18px;
}

.selectedCard button:hover {
    opacity: 0.7;
}

.ticket {
    margin-bottom: 40px;
    background: white;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
}
</style>
