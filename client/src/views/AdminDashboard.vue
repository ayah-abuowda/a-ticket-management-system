<template>
    <div>
        <h2 style="text-decoration: underline">Welcome To Ticket Database</h2>
        <hr />
        <br />
        <a href="/adminList">
                      <button type="button" class="view-list">View List</button>
                    </a>
        <b-container fluid class="center">
            <b-row>
                <b-col md="3" offset-md="3">
                    <form @submit.prevent="handleSubmit">
                        <fieldset class="container">
                            <h3 style="text-decoration: underline">Add new Ticket</h3>
                            <br />
                            <label>Ticket ID</label><br />
                            <input type="text" id="ticketID" v-model="newTicket.ticket_id" placeholder="Ticket ID" name="id" required />
                            <br />
                            <label>Date</label>
                            <b-form-datepicker v-model="newTicket.time" class="date" locale="en"></b-form-datepicker>
                            <br />
                            <label>Price</label><br />
                            <input type="text" id="price" v-model="newTicket.price" placeholder="Price" name="price" required />
                            <br />
                            <button type="reset" class="btn">Reset</button>
                            <button type="submit" class="btn">Submit</button>
                            <br /><br />
                        </fieldset>
                    </form>
                </b-col>

                <b-col md="3" offset-md="3">
                     <form @submit.prevent="createDestination">
                        <fieldset class="container">
                            <br />
                            <h3 style="text-decoration: underline">Add a new location</h3>
                            <br />
                            <label>Ticket ID</label><br />
                            <input type="text" id="ticketID" v-model="newDestination.ticket_id" placeholder="Ticket ID" name="id" required />
                            <br />
                            <label>From</label><br />
                            <input type="text" id="from" v-model="newDestination.from" placeholder="Add city name" name="from" required />
                            <br />
                            <label>To</label><br />
                            <input type="text" id="to" v-model="newDestination.to" placeholder="Add city name" name="to" required />
                            <br />
                            <button type="reset" class="btn">Reset</button>
                            <button type="submit" class="btn">Submit</button>
                            <br /><br />
                        </fieldset>
                    </form>
                </b-col>

                <b-col md="3" offset-md="3">
                    <fieldset class="container">
                        <h3 style="text-decoration: underline">View a Ticket</h3>
                        <br />
                        <label>Ticket ID</label><br />
                        <input type="text" id="ticketID" placeholder="Ticket ID" name="id" required />
                        <br />
                        <button type="reset" class="btn">Reset</button>
                        <button type="submit" class="btn">Submit</button>
                        <br /><br /><br />
                    </fieldset>
                </b-col>

                <b-col md="3" offset-md="3">
                    <fieldset class="container">
                        <h3 style="text-decoration: underline">Update a Ticket</h3>
                        <br />
                        <label>Ticket ID</label><br />
                        <input type="text" id="ticketID" placeholder="Ticket ID" name="id" required />
                        <br />
                        <button type="reset" class="btn">Reset</button>
                        <button type="submit" class="btn">Submit</button>
                        <br /><br /><br />
                    </fieldset>
                </b-col>

                <b-col md="3" offset-md="3">
                    <form @submit.prevent="deleteOneTicket">
                        <fieldset class="container">
                            <h3 style="text-decoration: underline">Delete a Ticket</h3>
                            <br />
                            <label>Ticket ID</label><br />
                            <input type="text" id="ticketID" placeholder="Ticket ID" name="id" required />
                            <br />
                            <button type="reset" class="btn">Reset</button>
                            <button type="submit" @click="deleteOneTicket()" class="btn">Submit</button>
                            <br /><br />
                        </fieldset>
                    </form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { Api } from '../Api'
import swal from 'sweetalert'

export default {
  name: 'adminDashBoard',
  data() {
    return {
      newTicket: {
        ticket_id: '',
        price: '',
        time: '',
        ticketList: []
      },
      newDestination: {
        destination_id: '',
        from: '',
        to: '',
        destinations: []
      }
    }
  },

  methods: {
    handleSubmit() {
      Api.post('/tickets/', this.newTicket)
        .then(response => {
          swal('Success', 'Ticket created', 'success')
          localStorage.setItem('tickets', JSON.stringify(response.data))
          this.$router.push({
            path: 'tickets',
            query: { ticket_id: response.data._id }
          })
        })
        .catch(error => {
          console.log(error)
          swal('Error', 'Something Went Wrong', 'error')
        })
        .then(() => {})
    }
  },
  createDestination() {
    const ticket = JSON.parse(localStorage.getItem('tickets'))
    Api.post(`/tickets/${ticket._id}/destinations`, this.newDestination)
      .then(response => {
        localStorage.setItem('destinations', JSON.stringify(response.data))
        this.$router.push({
          path: 'tickets',
          query: { destination_id: response.data._id }
        })
      })
      .catch(error => {
        console.log(error)
        swal('Error', 'Something Went Wrong', 'error')
      })
      .then(() => {})
  },
  updateTicket() {
    Api.put('/tickets/' + this.ticket_id, this.newTicket)
      .then(response => {
        swal('Success', 'Ticket info updated', 'success')
      })
      .catch(error => {
        this.message = error.message
        swal('Error', 'Something Went Wrong', 'error')
      })
      .then(() => {})
  },
  deleteOneTicket(id) {
    Api.delete('/tickets/' + this.ticket_id)
      .then(response => {
        swal('Success', 'ticket Removed From ticketlist', 'success')
        this.$router.push('/tickets')
      })
      .catch(error => {
        console.log(error)
        swal('Error', 'Something Went Wrong', 'error')
      })
  },
  getAllTickets() {
    Api.get('/adminList')
      .then(response => {
        this.router.push('/adminList')
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>

<style scoped>
body {
    background-color: #cce6ff;
}

h2 {
    margin-top: 2px;
    text-align: center;
}

form {
    width: 100%;
    margin: 20px;
    text-align: center;
}

/* Full-width input fields */

input[type='text'] {
    width: 290px;
    padding: 10px;
    margin: 5px 0 10px 0;
    display: inline-block;
    border: none;
    background: white;
}

input[type='text']:focus {
    background-color: #ddd;
    outline: none;
}

/* Container around content */

.container {
    padding: 0px 40px;
    position: relative;
}

/* Full-width containers */

.container {
    width: 90%;
    padding-left: 10px;
    padding-right: 5px;
}

div.row {
    margin-left: -10rem;
    width: 93%;
}

.date {
    width: 290px !important;
    margin: 0 auto !important;
    left: 0px;
}

.btn {
    background-color: #616feb;
    color: white;
    padding: 13px 20px;
    margin: 8px 5px;
    border: none;
    cursor: pointer;
    width: 40%;
}

.view-list {
  background-color: #616feb;
  color: white;
  padding: 13px 20px;
  margin: 8px 5px 15px 5px;
  border: none;
  cursor: pointer;
  width: 22%;
}

</style>
