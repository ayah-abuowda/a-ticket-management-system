<template>
    <div class="flex-item">

        <div class="sidenav">
            <b>My Account</b>
            <a href="/profile" class="active">My Information</a>
            <a href="/changeInfo">Change Information</a>
            <a href="/deleteAccount">Delete Account</a>

        </div>

        <!-- Page content -->
        <div class="main">
            <h3>your current Information</h3>
            <a v-if="currentUser">{{currentUser.username}}
               {{currentUser.email}}</a>
        </div>
    </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'profile',
  data() {
    return {
      customer: {},
      currentUser: {}
    }
  },
  mounted() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.customerId = this.currentUser._id
    this.getCustomer()
  },
  methods: {
    getCustomer() {
      Api.get('/customers/' + this.customerId)
        .then((response) => {
          this.customer = response.data
        })
        .catch((error) => {
          this.message = error.message
          console.error(error)
          this.customer = null
        })
        .then(() => {
        })
    },
    getCustomerId() {
      return this.customer._id
    }
  }
}
</script>

<style>

.flex-item {
  display: flex;
}

.sidenav {
    height: 100vh;
    width: 280px;
    z-index: 1;
    top: 20;
    left: 0;
    background-color: #5360ce;
    overflow-x: hidden;
    padding-top: 20px;
}

/* The navigation menu links */

.sidenav b {
    padding: 5px 8px 20px 8px;
    text-decoration: none;
    font-size: 30px;
    color: #ffffff;
    display: block;
}

.sidenav a {
    padding: 5px 8px 5px 8px;
    text-decoration: none;
    font-size: 25px;
    color: #ffffff;
    display: block;
}

/* When you mouse over the navigation links, change their color */

.sidenav a:hover {
    border-bottom: 3px solid transparent;
}

.sidenav .active {
    border-bottom: 3px solid white;
}

/* Style page content */

.main {
    margin-left: auto;
    margin-right: auto;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */

@media screen and (max-width: 576px) {
  .sidenav {
    padding-top: 15px;
    display: block;
    width: 110px;
    height: 559px;
  }
  .sidenav a {
    font-size: 18px;
  }
  .sidenav b {
    font-size: 18px;
  }
}
</style>
