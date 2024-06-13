<template>
  <div>
        <h3>All Destinations </h3>
    <div v-for="destination in destinations" v-bind:key="destination._id">
      From: {{ destination.From }}, To: {{ destination.To }}
      <hr class="light" />
    <br />
    <br />
</template>

<script>
export default {
  name: 'destination-item',
  props:
   ['destination'],
  data() {

  }

}
</script>

<style scoped>
.app {
  font-family: 'Roboto Condensed', sans-serif;
}

hr.light {
  border-top: 1px solid #d5d5d5;
  width: 75%;
  margin-top: 0.8rem;
  margin-bottom: 1rem;
}
</style>
