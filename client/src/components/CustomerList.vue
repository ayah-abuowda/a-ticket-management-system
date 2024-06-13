<template>
    <div>
        <b-container class="bv-exmple-row">
            <b-row>
                <b-col>
                    <h1>Her You Can See A list Of Our customers</h1>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <tickets v-for="customer in this.getAllCustomer()" :key="customer._id" :customer="customer" />
                </b-col>
            </b-row>
        </b-container>
        <ul>
            <li :key="customer.id" v-for="customer in customers">
                {{customer.name}} {{customer.username}} {{customer.email}}
            </li>
        </ul>
        <button type="button" class="btn btn-danger">Delete all customers</button>
    </div>
</template>

<script>
import { Api } from '../Api'
import swal from 'sweetalert'

export default {
  data() {
    return {
      customer: []
    }
  },
  mounted() {
    this.getAllCustomer()
  },
  methods: {
    getAllCustomer() {
      Api.get('/customers')
        .then((response) => {
          this.customerList = response.data.customer
          console.log(this.customerList)
        })
        .catch((error) => {
          this.message = error.message
          console.error(error)
          this.customers = []
        })
        .then(() => {})
    },
    deleteCustomer() {
      Api.delete('/customers')
        .then((response) => {
          swal('Success', 'Customer deleted', 'success')
          location.reload()
        })
        .catch((error) => {
          console.error(error)
          swal('Error', 'Something Went Wrong', 'error')
        })
    }
  }
}
</script>
