<template>
    <div>
        <h1 class="vw_er_uCpAP" data-headline-type="main">Travel that moves you </h1>
        <div class="bg-image"></div>
        <div class="bg-text">
            <form method="get" action="http://localhost:8080/tickets">
                <h2> Search Your Bus Ticket</h2>

                <form>
                    <fieldset>
                        <input type="text" class="field" name="from" placeholder="From"><br>
                        <input type="text" class="field" name="to" placeholder="To">
                        <b-form-datepicker class="date" locale="en"></b-form-datepicker>
                    </fieldset>
                </form>
                <button @click="getAllTicket()" type="submit" class="bttn">Search ticket</button>
            </form>
        </div>
    </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'Home',

  data() {
    return {
      customer: null,
      name: ''
    }
  },
  mounted() {
    console.log('PAGE Is Loading')
  },
  methods: {
    getAllTicket() {
      Api.get('/tickets')
        .then(response => {
          this.router.push('/tickets')
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>
body,
html {
    height: 100%;
}

* {
    box-sizing: border-box;
}

.bg-image {
    height: 700px;
    background-image: url(https://i.pinimg.com/originals/b8/8b/db/b88bdbf38ef411a54ae1b08e96064877.jpg);
    /* Add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(8px);
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

/* Position text in the middle of the page/image */

.bg-text {
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black/see-through */
    color: white;
    font-weight: bold;
    border: 3px solid;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 80%;
    padding: 20px;
    text-align: center;
}

.btn btn-success:hover {
    opacity: 1;
}

.se {
    color: black;
}

input[type=text] {
    width: 130px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    background-position: 10px 10px;
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
}

.date {
    width: 330px !important;
    margin: 0 auto !important;
    height: 45px !important;
}

.bttn {
    background-color: #616feb;
    color: white;
    padding: 10px;
    margin: 20px;
    border: none;
    width: 17%;
}

.vw_er_uCpAP {
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
}

@media (max-width: 576px) {
    input.field {
        width: 190px !important;
    }
    .date {
        width: 190px !important;
    }
    .bttn {
        width: 50%;
    }
    .bg-image {
        width: 100%;
    }
    .bg-text {
      width: 79%;
      height: 55%;
      margin-top: 25%;
    }
    h2 {
      font-size: 20px !important;
    }
}
</style>
