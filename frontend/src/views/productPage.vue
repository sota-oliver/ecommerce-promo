<template>
  <div>
    <Navbar/>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-8 text-center">
          <img :src="this.itemCardSinglePage.item_image" class="single-product-image">
        </div>
        <div class="col-12 col-lg-4">
          <div class="col-12">
            <label class="d-inline-block product-page-label" style="width: 60%; text-align:left;">{{this.itemCardSinglePage.item_name}}</label>
            <label class="d-inline-block product-page-label" style="width: 40%; text-align:right;">€{{this.itemCardSinglePage.item_price}}</label>
            <p class="product-page-description">Suspendisse potenti. Nam sed luctus elit, ac rhoncus felis. Curabitur interdum diam ut augue ornare, vitae vestibulum nibh faucibus.</p>

            <div class="dropdown">
              <button class="btn dropdown-toggle btn-dropdown" style="width: 100%;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Model #1
              </button>
              <div class="dropdown-menu" style="width: 100%;" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Model #2</a>
                <a class="dropdown-item" href="#">Model #3</a>
                <a class="dropdown-item" href="#">Model #4</a>
              </div>
            </div>
            <div class="dropdown">
              <button class="btn dropdown-toggle btn-dropdown" style="width: 100%;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Color #1
              </button>
              <div class="dropdown-menu" style="width: 100%;" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Color #2</a>
                <a class="dropdown-item" href="#">Color #3</a>
                <a class="dropdown-item" href="#">Color #4</a>
              </div>
            </div>

            <label class="d-inline-block product-page-label" style="width: 50%; text-align:left;">Quantity</label>
            <div class="d-inline-block product-page-label" style="width: 50%; text-align:right;">
              <button class="d-inline-block product-page-counter-button">-</button>
              <label style="padding:10px;">1</label>
              <button class="d-inline-block product-page-counter-button">+</button>
            </div>
            <button @click="addToCart" data-toggle="modal" data-target="#modalCenter" class="col product-page-addButton"><i class="fas fa-shopping-cart icon-inner-button"></i>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
    <div class="product-page-section">
      <section class="container">
        <label class="product-page-section-label">You may also be interested in</label>
        <ul class="row" style="margin:0;">
          <li class="col-12 col-sm-8 col-md-6 col-lg-3" :key="itemCard.id" v-for="itemCard in itemCards">
            <Product :id="itemCard.id" :infoItem="itemCard"/>
          </li>
        </ul>
      </section>
    </div>
    <Modal/>
    <Footer/>
  </div>
</template>

<script>
import { Items } from '@/services';
import store from '@/store.js';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Modal from '@/components/Modal.vue';
import Product from '@/components/Product.vue';
export default {
  data(){
    return store;
  },
  async mounted(){
    this.itemCards = await Items.getItems();
    this.itemCardSinglePage = await Items.getOne(this.$route.params.id);

    for(let i = 0; i < this.itemCards.length; i++){
      if(this.itemCards[i].item_name === this.itemCardSinglePage.item_name){
        this.itemCards.splice(i, 1);
      }
    }
  },
  components:{
    Navbar,
    Footer,
    Product,
    Modal
  },
  methods:{
    addToCart(){
      var existingObj = JSON.parse(localStorage.getItem("cart"))
      if(existingObj == null){
         existingObj = [];
      }
      localStorage.setItem(this.itemCardSinglePage.item_name, JSON.stringify(this.itemCardSinglePage));
      existingObj.push(this.itemCardSinglePage);
      localStorage.setItem("cart", JSON.stringify(existingObj));

      let str = localStorage.getItem("cart");
      let parsedObj = JSON.parse(str);

      this.checkoutCart = parsedObj;
      this.cartFilled = true;
    }
  }
}
</script>