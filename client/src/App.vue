
<template>
    <div id="app">
       <title>TravelBus</title>
        <!-- Load an icon library -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <div class="navbar">
            <a class="active" href="/"><i class="fa fa-fw fa-home"></i> Home</a>
            <a href="/about"><i class=""></i>About us</a>
            <a href="/review"><i class=""></i>Review</a>
            <a href="/profile"><i class=""></i>Profile</a>
            <a href="/adminDashBoard"><i class=""></i>AdminDashBoard</a>
            <!--  <<<<<<<<<<<  to be removed-->
            <a v-if="isAdmin" to="/admin" class="nav-item nav-link">Admin</a>
            <a v-if="currentUser" @click="logout" class="nav-item nav-link">Logout</a>
            <router-link v-else to="/signin"><i class="fa fa-fw fa-user"></i> Login</router-link>
            <a v-if="currentUser">{{currentUser.username}}</a>

        </div>
        <!-- Render the content of the current page view -->
        <router-view />
        <!-- // Here what defines the contatnt -->
    </div>
</template>

<script>
import router from './router'
import { Role } from './Role'

export default {
  name: 'App',
  data() {
    return {
      currentUser: null
    }
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin
    }
  },
  mounted() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.currentUser)
    console.log(Role)
    console.log()
  },
  methods: {
    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser')
      this.currentUser = null
      router.push('/sigin')
    },
    handeClick() {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: rgb(230, 227, 227);
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100%;
}

/* Style the navigation bar */

div#app > .navbar {
  width: 100%;
  background-color: #555;
}

/* Navbar links */

.navbar a {
    float: left;
    text-align: center;
    padding: 10px;
    color: white;
    text-decoration: none;
    font-size: 17px;
}

/* Navbar links on mouse-over */

.navbar a:hover,
.dropdown:hover .dropbtn,
.b-dropdown-item :hover {
    background-color: rgb(119, 149, 194);
}

.b-dropdown-item {
    color: black;
    background-color: #555;
}
.q_ae_32ZqM, .q_ag_jglUX {
    color: #2a84b7;
    cursor: pointer;
    height: 28px;
    width: 82px;
}
*{
box-sizing: border-box;
}

/* Add responsiveness - will automatically display the navbar vertically instead of horizontally on screens less than 500 pixels */

@media screen and (max-height: 500px) {
    .navbar a {
        float: none;
        display: block;
    }
}
</style>
