<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
  }
}
</script>

<style>
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
:root {
  --green: #037546;
  --dark-green: #024228;
  --blackish: #363636;
  --pinkish-grey: #cfcfcf;
  --turquoise-blue: #00accf;
  --warm-grey: #828282;
  --muted-black: #282828;
  --greyish: #a6a6a6;
  --greyish-brown: #545454;
  --white: #ffffff;
  --font: 'Work Sans', sans-serif;
}
body{
  height: 100vh;
}
/** --------- Navbar ---------- */

.button-navbar-primary{
  border: none;
  border-radius: 25px;
  padding: 5px 10px;
  background-color: var(--green);
  color: var(--white);
}
.button-navbar-secondary{
  border: none;
  background: none;
  cursor: pointer;
  color: var(--muted-black);
}
.button-navbar-secondary:hover{
  text-decoration: none;
}
.cart-notification{
  position: absolute;
  color: red;
  font-size: 13px;
  right: 5px;
  top:8px;
}
.button-disabled{
  border: none;
  background: none;
}
.upperNavbar{
  height:5px;
  width:100%;
  background-color: var(--green);  
}
.lowerNavbar{
  text-align: left;
  padding: 20px;
}
.navInnerWrapper{
  display:flex;
  width: 60%;
  justify-content: space-between;
}
.navbar-brand{
  margin:0;
}
.navbar{
  padding-top: 0;
}
.icon-nav{
  padding: 0 10px;
  position: relative;
  font-size: 18;
}
.hamburgerWrapper{
  display:none;
  padding: 10px;
  font-size: 18px;
  color: var(--green);
}
.fa-chevron-right{
  font-size: 0.7em;
  padding: 4px;
  color: var(--green);
}

/** -------- Main -------- */

ul{
  list-style: none;
  padding: 0;
}
li{
  display:inline-block;
  padding: 50px 0;
}
.fa-arrow-right{
  padding:5px;
}
.card-title{
  cursor: pointer;
}
.product-btn{
  border-color: var(--green);
  background-color: var(--green);
  color: var(--white);
}
.product-page-label{
  font-size: 24px;
  margin-bottom: 25px;
}
.product-page-description{
  margin-bottom: 30px;
}
.product-page-addButton{
  padding: 10px;
  border:none;
  background-color: var(--green);
  color: var(--white);
  border-radius: 10px;
}
.product-page-counter-button{
  cursor: pointer;
  border:0;
  padding: 10px;
  width:40px;
  height:40px;
  line-height: 0;
  border-radius: 10px;
}
.product-page-section{
  margin-top: 100px;
  background-color: #cfcfcf;
}
.product-page-section-label{
  font-size: 20px;
  padding-top: 50px;
}
.icon-inner-button{
  padding:5px;
}
.btn-dropdown{
  background-color: var(--white);
  border-color: var(--greyish-brown);
  margin-bottom: 20px;
}
.single-product-image{
  width:500px;
  height:500px;
}
.checkout-cart-single-wrapper{
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: var(--greyish);
}
.checkout-cart-single-label{
  height: 100%;
  padding-top: 40px;
  padding-right: 20px;
  padding-left: 20px;
}
.checkout-cart-single{
  height: 100%;
}
.checkout-cart-single-photo{
  width: 100px;
  height: 100px;
}
.promo-wrapper{
  border: 1px dashed var(--green);
  padding: 25px;
  position: relative;
  margin-bottom: 50px;
}
.promo-cut{
  color: var(--green);
  font-size: 24px;
  position:absolute;
  top:0;
  line-height: 0;
}
.promo-input{
  margin-bottom: 20px;
  width: 75%;
}
.promo-button{
  background-color: var(--green);
  color: var(--white);
  padding:3px;
  border:0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.cart-empty{
  margin-top: 74px;
  margin-bottom: 292px;
}
.cart-empty-photo{
  width: 700px;
  height: 400px;
}
.promo-applied-20{
  padding: 5px;
  width:25%;
  border-radius: 5px;
  color: var(--white);
  background-image: linear-gradient(to right, #E33131 , #E97F44);
}
.promo-applied-02{
  padding: 5px;
  width:25%;
  border-radius: 5px;
  color: var(--white);
  background-image: linear-gradient(to right, #31E3AE , #4486E9);
}
.promo-applied-005{
  padding: 5px;
  width:25%;
  border-radius: 5px;
  color: var(--white);
  background-image: linear-gradient(to right, #91C22A , #39C246);
}
.promo-remove{
  background-color: white;
  border:0;
  color: #A96CF2;
  cursor: pointer;
}
.checkout-button{
  cursor: pointer;
  width: 100%;
  padding: 8px;
  border-radius: 20px;
  border:0;
  background-color: var(--green);
  color:white;
}
.checkout-return-button{
  cursor: pointer;
  width: 100%;
  padding: 5px;
  border:0;
  background-color: var(--white);
  color:var(--green);
}
.product-order-wrapper{
  border: 1px solid var(--greyish);
  margin: 50px 0;
}
.product-order-single{
  text-align: center;
  padding-top: 50px!important;
}
.progress-bar{
  background-color:var(--green);
}
.text-primary{
  color:var(--green)!important;
}
.btn-primary{
  background-color: var(--green)!important;
  border: 0;
}
.badge{
  background-color: var(--green);
  color: var(--white);
}
.modal-dialog{
  max-width: 230px;
}
.modal-footer{
  justify-content: center;
}

/** -------- Footer -------- */

.footer{
  width: 100%;
  height: 80px;
  background-color: var(--dark-green);
  color: var(--white);
  font-size: 1.3em;
  padding: 0 20px;
}
.mobile-footer-nav-button{
  display: none;
  position: relative;
  text-align: center;
}
.mobile-footer-nav-text{
  position: absolute;
  font-size: 14px;
  top: 0;
  right: 0;
  left: 0;
  margin: 0;
  text-align: left;
  height: 20px;
  line-height: 4.5;
}
.mobile-nav{
  display: none;
}

/** -------- Responsiveness -------- */

@media (max-width: 768px){
  .checkout-cart-single-photo{
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 768px){
  .cart-empty-photo{
    width: 500px;
    height: 300px;
  }
  .cart-empty{
    margin-bottom: 342px;
  }
}
@media (max-width:745px){
  /* Navbar */
  .icon-nav, .navInnerWrapper{
    display:none;
  }
  .hamburgerWrapper, .mobile-nav{
    display:flex;
  }
  .footer{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1030;                      
  }
}
@media (max-width: 575px){
  .card-img{
    height: 350px;
  }
}
@media (max-width: 515px){
  .cart-empty-photo{
    width: 300px;
    height: 150px;
  }
}
@media (max-width: 380px){
  .mobile-footer-nav-text{
    display:none;
  }
}
@media (max-width: 532px){
  .single-product-image{
    height:375px;
    width:375px;
  }
}
@media (max-width: 406px){
  .single-product-image{
    height:300px;
    width:300px;
  }
}
@media (max-width: 331px){
  .single-product-image{
    height:250px;
    width:250px;
  }
}
</style>
