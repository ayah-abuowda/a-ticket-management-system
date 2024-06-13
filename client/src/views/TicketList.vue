<template>
    <div>
        <b-container class="bv-exmple-row">
            <b-row>
                <b-col>
                    <h1> Results(Her You Can See Alist Of Our Tickets)</h1>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <tickets v-for="ticket in this.getTicket()" :key="ticket._id" :ticket="ticket" />
                </b-col>
            </b-row>
        </b-container>
        <ul>
            <li :key="ticket.id" v-for="ticket in tickets">
                {{ticket.price}} {{ticket.time}}
            </li>
        </ul>
    </div>
</template>

<script>
import { Api } from '../Api'
import Tickets from './Tickets.vue'
export default {
  components: {
    Tickets
  },
  methods: {
    getTicket() {
      Api.get('/tickets')
        .then((response) => {
          this.tickets = response.data.ticket
          console.log(this.tickets)
        })
        .catch((error) => {
          this.message = error.message
          console.error(error)
          this.tickets = []
        })
        .then(() => {})
    }
  },
  data() {
    return {
      tickets: []
    }
  }
}
</script>
