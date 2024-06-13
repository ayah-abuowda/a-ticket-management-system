<template>
    <form @submit.prevent="handleSubmit">
        <h1>Signin</h1>
        <p>Please fill in this form to sigin to your account.</p>
        <hr />

        <div class="form-group">
            <label>Username</label><br />
            <input type="text" class="form-control" v-model="username" placeholder="Enter Username" required /><br />
        </div>

        <div class="form-group">
            <label>Password</label><br />
            <input type="password" class="form-control" v-model="password" placeholder="Enter Password" required />
            <br />
        </div>

        <div>
            <p>
                <a>Forget Your password?</a>
            </p>
            <button type="submit" class="signinbtn">Sign in</button>
        </div>

        <div class="container Register">
            <p>
                Don't have an account?
                <a href="http://localhost:8080/register">Register</a>.
            </p>
        </div>
    </form>
</template>

<script>
import { Api } from '../Api'
const swal = require('sweetalert')

export default {
  name: 'Signin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  // you need to change this method
  methods: {
    async handleSubmit() {
      const response = await Api.post('/customers/signin', {
        username: this.username,
        password: this.password
      }).catch(err => err.response)
      if (response.status === 200) {
        let customer = response.data.customer
        localStorage.setItem('customer', JSON.stringify(customer))
        localStorage.setItem('currentUser', JSON.stringify(customer))
        swal('Success', 'Singin Successful', 'success')
        this.$router.push('/')
        // let cust = localStorage.getItem('customer');
        customer = JSON.parse(customer)
      } else {
        swal('Error', 'Something Wrong', 'error')
        alert(response.data.message)
      }
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

/* Add padding to containers */

.container {
    padding: 5px;
    background-color: rgb(230, 227, 227);
}

/* Full-width input fields */

input[type='text'],
input[type='password'] {
    width: 30%;
    padding: 10px;
    margin: 5px 0 10px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
}

input[type='text']:focus,
input[type='password']:focus {
    background-color: #ddd;
    outline: none;
}

/* for the submit button */

.signinbtn {
    background-color: #616feb;
    color: white;
    padding: 13px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 16%;
}

.signinbtn:hover {
    opacity: 1;
}

/* Add a blue text color to links */

a {
    color: dodgerblue;
}

/* for the grey background color of the "sign in" section */

.Register {
    background-color: rgb(230, 227, 227);
    text-align: center;
}

@media (max-width: 576px) {
    input[type=text],
    input[type='password'] {
        width: 50%;
    }
    .signinbtn {
        width: 30%;
    }
}
</style>
