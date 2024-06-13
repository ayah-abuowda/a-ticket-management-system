<template>
    <div class="container">
        <h3> Here You Can See The Customer information </h3>
        <ul>
            <li :key="customer.id" v-for="customer in customers">
                {{ customer.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'Customer',

  data() {
    return {
      customers: null
    }
  },
  async mounted() {
    const customers = await Api.get('/customers')
    this.customers = customers.data
  }
}
</script>
