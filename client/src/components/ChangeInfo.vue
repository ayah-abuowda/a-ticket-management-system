<template>
    <div>
        <div class="sidenav">
            <b>My Account</b>
            <a href="/profile">My Information</a>
            <a href="/changeInfo" class="active">Change Information</a>
            <a href="/deleteAccount">Delete Account</a>
        </div>

        <!-- Page content -->
        <div class="mains">
            <h2 style="font-weight: bold">Change Email/Password</h2>
            <p>You can change your email/password here by entering the new one below.</p>
            <hr>
            <h4>Enter your New Email</h4>
            <form @submit.prevent="updateEmail">
                <input v-model="newEmail.email" class="form-controll" type="text" placeholder="New Email" required><br>
                <b-button type="submit" class="updatebtn">Update</b-button>
            </form>
            <div class="divider" />
            <h4>Enter your New password</h4>
            <form @submit.prevent="updatePassword">
                <input v-model="newPassword.password" class="form-controll" type="text" placeholder="New Password" required><br>
                <b-button type="submit" class="updatebtn">Update</b-button>
            </form>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import swal from 'sweetalert'
export default {
  name: 'changePassword',
  data() {
    return {
      customer: {},
      newEmail: {
        email: ''
      },
      newPassword: {
        password: ''
      }
    }
  },
  created() {
    this.customerId = this.$route.params.id
  },
  methods: {
    updateEmail() {
      Api.put('/customers/' + this.customerId, this.newEmail)
        .then(response => {
          swal('Success', 'Email updated', 'success')
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          swal('Error', 'Something Went Wrong', 'error')
        })
        .then(() => {})
    },
    updatePassword() {
      Api.patch('/customers/' + this.customerId, this.newPassword)
        .then(response => {
          swal('Success', 'Password updated', 'success')
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          swal('Error', 'Something Went Wrong', 'error')
        })
        .then(() => {})
    }
  }
}
</script>

<style>
/* for the submit button */

@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
body {
    background: transparent;
    font-family: 'Source Sans Pro', sans-serif;
}

.mains {
    position: absolute;
    top: 15%;
    left: 40%;
}

.updatebtn {
    background-color: #616feb;
    color: white;
    padding: 13px 20px;
    margin-bottom: 25px;
    border: none;
    cursor: pointer;
    width: 15%;
    opacity: 0.9;
}

.divider {
    width: 7px;
    height: auto;
    display: inline-block;
}

@media (max-width: 576px) {
    .mains {
        top: 18%;
        left: 30%;
    }
    .updatebtn {
        width: 38%;
    }
}
</style>
