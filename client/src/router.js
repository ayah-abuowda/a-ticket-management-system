import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Register from './views/register.vue'
import Signin from './views/Signin.vue'
import Customer from './views/Customer.vue'
import Tickets from './views/Tickets.vue'
import TicketItem from './components/TicketItem.vue'
import Review from './views/Review.vue'
import Profile from './views/Profile.vue'
import ChangeInformation from './components/ChangeInfo.vue'
import DeleteAccount from './components/DeleteAccount'
import AdminDashboard from './views/AdminDashboard'
import SelectedTicket from './views/SelectedTicket.vue'
import TicketList from './views/TicketList.vue'
import CustomerList from './components/CustomerList.vue'
import AdminList from './components/AdminList.vue'
import DestinationItem from './components/DestinationItem.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/customer/:id',
      name: 'customer',
      component: Customer
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: Tickets
    },
    {
      path: '/tickettem',
      name: 'ticketItem',
      component: TicketItem
    },
    {
      path: '/review',
      name: 'review',
      component: Review
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/changeInfo',
      name: 'changeInfo',
      component: ChangeInformation
    },
    {
      path: '/deleteAccount',
      name: 'deleteAccount',
      component: DeleteAccount
    },
    {
      path: '/adminDashBoard',
      name: 'adminDashBoard',
      component: AdminDashboard
    },
    {
      path: '/tickets/:id',
      name: 'selectedTicket',
      component: SelectedTicket
    },
    {
      path: '/ticketList',
      name: 'ticketList',
      component: TicketList
    },
    {
      path: '/customerList',
      name: 'customerList',
      component: CustomerList
    },
    {
      path: '/adminList',
      name: 'adminList',
      component: AdminList
    },
    {
      path: '/destinationItem',
      name: 'destinationItem',
      component: DestinationItem
    }
  ]
})
