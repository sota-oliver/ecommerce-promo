<template>
  <div>
    <div class="card">
      <img @click="goToDetails()" class="card-img" :src="infoItem.item_image" height="250" width="150" alt="Vans">
      <div class="card-body">
        <h4 @click="goToDetails()" class="card-title">{{infoItem.item_name}}</h4>
        <h6 class="card-subtitle mb-2 text-muted">Style: VA33TXRJ5</h6>
        <p class="card-text">Suspendisse potenti. Nam sed luctus elit, ac rhoncus felis. Curabitur interdum diam ut augue ornare, vitae vestibulum nibh faucibus.</p>
        <div class="buy d-flex justify-content-between align-items-center">
          <div class="price text-success"><h5 class="mt-4">${{infoItem.item_price}}</h5></div>
          <button @click="addToCart(infoItem)" data-toggle="modal" data-target="#modalCenter" class="btn product-btn mt-3"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
        </div>
      </div>
    </div>
    <Modal/>
  </div>
</template>

<script>
import { Items } from '@/services';
import Modal from '@/components/Modal.vue';
import store from '@/store.js'
export default {
  props: ['infoItem'],
    data(){
        return store;
    },
    components: {
      Modal
    },
    async mounted(){
      this.itemCard = await Items.getOne(this.infoItem.item_id);
    },
    methods:{
      addToCart(infoItem){
        this.itemCard = infoItem;
        let parsedObj = JSON.parse(localStorage.getItem("cart"));
        
        if(parsedObj === null){
          parsedObj = [];
        }
        parsedObj.push(this.infoItem);
        let str = JSON.stringify(parsedObj);
        localStorage.setItem("cart", str);
        this.checkoutCart = parsedObj;
        this.cartFilled = true;
      },
      goToDetails() {
        this.$router.push({path: `/product/${this.infoItem.item_id}`});
        this.currentItem = this.infoItem;
        this.itemCardSinglePage = this.infoItem;
      },
    }
}
</script>