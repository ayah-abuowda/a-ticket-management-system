<template>
    <form @submit.prevent="handleSubmit">
        <div class="registerContainer">
            <h3>Register</h3>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <div class="form-group">
                <label>Username</label><br />
                <input type="text" class="form-control" v-model="username" placeholder="Enter Username" required /><br />
            </div>

            <div class="form-group">
                <label>Full Name</label><br />
                <input type="text" class="form-control" v-model="full_name" placeholder="Enter Full Name" required /><br />
            </div>

            <div class="form-group">
                <label>Email</label><br />
                <input type="text" class="form-control" v-model="email" placeholder="Enter Email" required /><br />
            </div>

            <div class="form-group">
                <label>Password</label><br />
                <input type="password" class="form-control" v-model="password" placeholder="Enter Password" required /><br />
            </div>

            <div class="form-group">
                <label>Confirm Password</label><br />
                <input type="password" class="form-control" v-model="confirm_password" placeholder="Confirm Password" required /><br />
            </div>

            <button type="submit" class="registerbtn">Register</button>
        </div>

        <div class="container Signin">
            <p>
                Already have an account?
                <a href="http://localhost:8080/signin">Signin</a>
            </p>
        </div>
    </form>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'Register',

  data() {
    return {
      username: '',
      full_name: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  },
  methods: {
    async handleSubmit() {
      const response = await Api.post('/customers/register', {
        username: this.username,
        full_name: this.full_name,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password
      }).catch(err => err.response)
      if (response.status === 201) {
        const customer = response.data.customer
        console.log(customer)
        localStorage.setItem('customer', JSON.stringify(customer))
        this.$router.push('/signin')
      } else {
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

.registerContainer {
    padding: 5px;
    background-color: rgb(230, 227, 227);
    width: 100%;
    height: 100%;
}

/* Full-width input fields */

input[type='text'],
input[type='password'] {
    width: 50%;
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

.registerbtn {
    background-color: #616feb;
    color: white;
    padding: 13px 20px;
    border: none;
    cursor: pointer;
    width: 25%;
}

.registerbtn:hover {
    opacity: 1;
}

/* Add a blue text color to links */

a {
    color: dodgerblue;
}

/* for the grey background color of the "sign in" section */

.signin {
    background-color: rgb(230, 227, 227);
    text-align: center;
}
</style>
