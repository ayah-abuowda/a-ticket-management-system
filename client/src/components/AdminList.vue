<template>
    <div>
        <h2>All Tickets Table</h2>
              <div v-for="ticket in tickets" v-bind:key="ticket._id">
                <ticket-item  v-bind:ticket="ticket"/>
              </div>
                <b-button variant="danger" @click="deleteAllTickets">Delete all tickets</b-button>
            </div>
</template>

<script>
import TicketItem from './TicketItem.vue'
import { Api } from '../Api'
import swal from 'sweetalert'

export default {
  name: 'AdminList',

  data() {
    return {
      tickets: []

    }
  },
  components: {
    'ticket-item': TicketItem
  },
  mounted() {
    this.getALLTickets()
  },
  methods: {
    getALLTickets() {
      console.log('PAGE is loaded')
      Api.get('/tickets')
        .then(response => {
          this.tickets = response.data.tickets
          console.log(this.ticketItem)
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          this.tickets = []
        })
    },
    deleteAllTickets() {
      Api.delete('/tickets')
        .then(response => {
          this.tickets = []
          swal('Success', 'Tickets have been deleted', 'success')
        })
        .catch(error => {
          console.error(error)
          swal('Error', 'There is someything wrong', 'error')
        })
    }
  }
}
</script>
