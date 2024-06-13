<template>
    <div class="containers">
        <h3>Results</h3>
        <div class="cards">
            <b-col cols="3" sm="3" md="3"></b-col>
            <h4>Ticket ID: {{ ticket.ticket_id }}</h4>
            <p>Date: {{ ticket.time }}</p>
            <p class="price">Price: {{ ticket.price }} kr.</p>
            <p><button variant="danger" @click="deleteTicket(ticket._id)">Delete Ticket</button></p>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
const swal = require('sweetalert')

export default {
  name: 'TicketItem',
  // props: {
  //   tickets: {}
  // },
  props: ['ticket'],
  mounted() {
    this.getTicketItem()
  },
  methods: {
    getTicketItem() {
      Api.get('/tickets/')
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
    deleteTicket(id) {
      Api.delete(`/tickets/${id}`)
        .then(reponse => {
          const index = this.tickets.findIndex(ticket => ticket._id === id)
          this.tickets.splice(index, 1)
          swal('Success', 'Tickets has been deleted', 'success')
        })
        .catch(error => {
          console.error(error)
          swal('Error', 'Something Wrong', 'error')
        })
    }
  },
  data() {
    return {
      tickets: ''
    }
  }
}
</script>

<style scoped>
.red {
    color: red;
}

.cards {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 250px;
    margin: auto;
    text-align: center;
    font-family: arial;
    background-color: white;
}

.price {
    color: grey;
    font-size: 20px;
}

.cards button {
    border: none;
    outline: 0;
    padding: 10px;
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
</style>
