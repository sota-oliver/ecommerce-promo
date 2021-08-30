<template>
    <div>
        <nav class="upperNavbar"></nav>
        <nav class="navbar navbar-light">
            <div class="hamburgerWrapper">
                <i class="fas fa-bars"></i>
            </div>
            <a class="navbar-brand" href="/">
                <img src="@/assets/logo.svg" width="80" height="80" class="d-inline-block align-top" alt="">
            </a>
            <div class="navInnerWrapper">
                <router-link class="button-navbar-secondary" to="/">Products</router-link>
                <button disabled class="button-disabled" href="#">Most popular</button>
                <button disabled class="button-disabled" href="#">Latest in shop</button>
                <button disabled class="button-disabled" href="#">Best buy</button>
                <button disabled class="button-disabled" href="#">Blog</button>
            </div>
            <div>
                <i class="fas fa-search icon-nav"></i>
                <i @click="goToCart()" class="fas fa-shopping-cart icon-nav" style="cursor:pointer;"><i v-if="this.cartFilled" class="fas fa-circle cart-notification"></i></i>
                <button  class="button-navbar-primary" href="#">Sign In</button>
            </div>
        </nav>
        <div class="container">
            <a>Home</a>
            <i class="fas fa-chevron-right"></i>
            <a>{{this.$route.name}}</a>
        </div>
    </div>
</template>

<script>
import store from '@/store.js';
export default {
  name: 'Navbar',
  data(){
    return store;
  },
  mounted(){
    let parsedArr = JSON.parse(localStorage.getItem("cart"));
    this.checkoutCart = parsedArr;
    if(this.checkoutCart !== null){
        this.cartFilled = ((this.checkoutCart.length !==0) ? true : false);
    }else {
      this.cartFilled = false;
    }
  },
  methods:{
    goToCart(){
      this.$router.push({path: '/cart'});
    }
  }
}
</script>