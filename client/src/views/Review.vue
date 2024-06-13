<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div>
                <h1>Review</h1>
                <p>Please write any feedbacks regarding your travels.</p>
                <hr>
                <label for="ticketId"><b>Ticket-Id</b></label><br>
                <input type="ticketId" placeholder="Enter ticket-id here" name="ticketId" v-model="newReview.ticketId" id="ticketId" required><br>
                <label for="rating"><b>Rate your experience from 1 - 5</b></label><br>
                <input type="number" placeholder="Enter your rating here" name="rating" v-model="newReview.rating" id="rating" min="1" max="5" required><br>
                <label for="comment"><b>Comment on your journey (Optional)</b></label><br>
                <input type="comment" placeholder="Write a comment" name="comment" v-model="newReview.comment" id="comment"><br>

                <button type="submit" class="submitbtn">Submit review</button>
            </div>
        </form>
    </div>
</template>

<script>
import { Api } from '../Api'
const swal = require('sweetalert')

export default {
  name: 'Review',
  data() {
    return {
      reviews: {},
      newReview: {
        review_id: '',
        rating: '',
        comment: '',
        tickets: [],
        reviews: []
      }
    }
  },
  methods: {

    handleSubmit() {
      const ticket = JSON.parse(localStorage.getItem('tickets'))
      Api.post(`/tickets/${ticket._id}/reviews`, this.newReview)
        .then(response => {
          swal('Success', 'Review created', 'success')
          localStorage.setItem('reviews', JSON.stringify(response.data))
        })
        .catch(error => {
          console.log(error)
          swal('Error', 'Something Went Wrong', 'error')
        })
    },
    getAllReviews() {
      // const ticket = JSON.parse(localStorage.getItem('tickets'))
      Api.get('/tickets/' + this.ticket._id + '/reviews')
        .then((response) => {
          this.reviews = response.data.reviews
          console.log(this.tickets)
        })
        .catch((error) => {
          this.message = error.message
          console.error(error)
          this.reviews = []
        })
    }

  }
}
</script>

<style>
body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: black;
}

* {
    box-sizing: border-box;
}

/* For the text input fields */

input[type=comment],
input[type=ticketId] {
    width: 35%;
    height: 50%;
    padding: 10px;
    margin: 10px 20px 20px 20px;
    display: inline-block;
    border: none;
    background: #f1f1f1;
}

/*for number input field*/

input[type=number] {
    width: 35%;
    padding: 10px;
    margin: 10px 20px 20px 20px;
    display: display;
    border: none;
    background: #f1f1f1;
}

/* for the submit button */

.submitbtn {
    background-color: #616feb;
    color: white;
    padding: 13px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 16%;
    opacity: 0.9;
}

.submitbtn:hover {
    opacity: 1;
}

#comment {
    color: lightgray;
}

@media (max-width: 576px) {
    input {
        width: 50% !important;
    }
    .submitbtn {
        width: 38%;
    }
}
</style>
