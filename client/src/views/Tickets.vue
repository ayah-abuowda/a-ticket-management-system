<template>
  <div class="containers">
    <p class="red">{{ message }}</p>
    <h3>Results</h3>
    <div class="cards">
      <div class="tickets" v-for="ticket in tickets" v-bind:key="ticket._id">
        <b-col cols="3" sm="3" md="3"></b-col>
        <h4>Ticket ID: {{ ticket.ticket_id }}</h4>
        <p>Date: {{ ticket.time }}</p>
        <p class="price">Price: {{ ticket.price }} kr.</p>
        <p><button @click="selectTicket(ticket._id)">Select Ticket</button></p>
      </div>
      <ticket-item v-bind:ticket="ticket" />
    </div>
  </div>
</template>

<script>
import { Api } from '../Api'
import TicketItem from '../components/TicketItem.vue'

export default {
  components: { TicketItem },
  name: 'tickets',
  mounted() {
    this.getTickets()
  },
  methods: {
    getTickets() {
      console.log('Get TICKET Service')
      Api.get('/tickets')
        .then(response => {
          this.tickets = response.data.tickets
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          this.tickets = []
        })
        .then(() => {})
    },
    selectTicket(id) {
      console.log('ID is ')
      console.log(id)
      this.$router.push('/tickets/' + id)
    }
  },
  getDestination() {
    const ticket = JSON.parse(localStorage.getItem('tickets'))
    console.log('Get TICKET Service')
    Api.get(`/tickets/${ticket._id}/destinations`)
      .then(response => {
        this.destination = response.data.destination
      })
      .catch(error => {
        this.message = error.message
        console.error(error)
        this.destination = []
      })
      .then(() => {})
  },
  data() {
    return {
      tickets: [],
      message: '',
      reviews: [],
      destination: []
    }
  }
}
</script>

<style>
.container {
  border: 3px solid transparent;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.cards {
  max-width: 500px;
  margin: 40px;
  text-align: center;
}

.price {
  color: black;
  font-size: 20px;
}

.cards button {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

.cards button:hover {
  opacity: 0.7;
}

.tickets {
  margin-bottom: 40px;
  background: white;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
}
</style>
