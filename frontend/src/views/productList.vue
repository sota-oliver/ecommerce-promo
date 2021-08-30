<template>
  <div>
    <Navbar/>
    <main role="main" class="container">
      <ul class="row">
        <li class="col-12 col-sm-8 col-md-6 col-lg-3" :key="itemCard.item_id" v-for="itemCard in itemCards">
          <Product :id="itemCard.item_id" :infoItem="itemCard"/>
        </li>
      </ul>
    </main>
    <Footer/>
  </div>
</template>

<script>
import { Items } from '@/services';
import store from '@/store.js';
import Product from '@/components/Product.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'productList',
  data(){
    return store;
  },
  components: {
    Product,
    Navbar,
    Footer
  },
  async mounted(){
    this.promoFirst = 0;
    this.promoSecond = 0;
    this.promoThird = 0;
    this.itemCards = await Items.getItems();
    if(this.checkoutCart === null){
      this.checkoutCart = [];
    }
  },
  methods:{
    goToCart(){
      this.$router.push({path: 'cart/'});
    }
  }
}
</script>