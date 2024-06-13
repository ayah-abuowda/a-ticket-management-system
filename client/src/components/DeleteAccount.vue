<template>
    <div>
        <div class="sidenav">
            <b>My Account</b>
            <a href="/profile">My Information</a>
            <a href="/changeInfo">Change Information</a>
            <a href="/deleteAccount" class="active">Delete Account</a>
        </div>

        <!-- Page content -->
        <div class="main">
            <h2 style="font-weight: bold">Delete Account</h2>
            <br />
            <p>If you close your account you will not be able to buy tickets.</p>
            <p></p>
            <p>
                If you're sure you want to close your account, confirm by filling out your email.
            </p>
            <br />

            <h3>Email</h3>
            <input type="text" class="form-controll" v-model="email" placeholder="Enter your email" required /><br />
            <button type="submit" class="deletebtn">Delete account</button>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
const swal = require('sweetalert')

export default {
  name: 'DeleteAccount',
  methods: {
    deleteAccount(id) {
      Api.delete(`/customers/${id}`)
        .then(reponse => {
          const index = this.customerList.findIndex(customer => customer._id === id)
          this.customerList.splice(index, 1)
          swal('Success', 'customer has been deleted', 'success')
        })
        .catch(error => {
          console.error(error)
          swal('Error', 'Something Wrong', 'error')
        })
    }
  }
}
</script>

<style>

.main {
  position: absolute;
    top: 10%;
    left: 40%;
}

input.form-controll {
  width: 70%;
  padding: 10px;
  margin: 5px 0 10px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

.deletebtn {
    background-color: #616feb;
    color: white;
    padding: 13px 20px;
    border: none;
    cursor: pointer;
    width: 34%;
    opacity: 0.9;
}

@media (max-width: 576px) {
  .main {
    top: 18%;
    left: 30%;
  }

  .deletebtn {
    width: 60%;
  }
}
</style>
