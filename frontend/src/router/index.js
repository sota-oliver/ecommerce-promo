import Vue from 'vue'
import VueRouter from 'vue-router'
import productList from '../views/productList.vue'
import productPage from '../views/productPage.vue'
import checkoutCart from '../views/checkoutCart.vue'
import checkoutCDetails from '../views/checkoutCDetails.vue'
import checkoutOrder from '../views/checkoutOrder.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Product List',
    component: productList
  },
  {
    path: '/product/:id',
    props: true,
    name: 'Product Page',
    component: productPage
  },
  {
    path: '/cart',
    props: true,
    name: 'Checkout Cart',
    component: checkoutCart
  },
  {
    path: '/details',
    props: true,
    name: 'Checkout Details',
    component: checkoutCDetails
  },
  {
    path: '/order',
    props: true,
    name: 'Checkout Order',
    component: checkoutOrder
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router