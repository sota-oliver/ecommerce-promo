<template>
  <div>
    <Navbar/>
    <div class="container">
      <ul class="product-order-wrapper">
        <li class="row product-order-single" style="padding:20px 0;" v-for="item in checkoutCart" :key="item.id">
            <h4 v-if="item.item_id === 0" class="d-inline-block col">{{quantityDiscountSmart}}</h4>
            <h4 v-if="item.item_id === 1" class="d-inline-block col">{{quantityDiscountMotion}}</h4>
            <h4 v-if="item.item_id === 2" class="d-inline-block col">{{quantityDiscountCamera}}</h4>
            <h4 v-if="item.item_id === 3" class="d-inline-block col">{{quantityDiscountSmoke}}</h4>
            <h4 v-if="item.item_id === 4" class="d-inline-block col">{{quantityDiscountWater}}</h4>
            <h4 class="d-inline-block col">{{item.item_name}}</h4>
            <h4 class="d-inline-block col">{{item.item_price}}</h4>
        </li>
        <hr class="my-4">
        <div class="row" style="padding: 10px;">
          <div class="col-6">
            <label class="font-weight-bold">Discount: -</label>
              <label v-if="this.promoFirst" class="font-weight-bold">{{this.promoFirst + " €"}}</label>
              <label v-if="this.promoSecond" class="font-weight-bold">{{this.promoSecond*100 + " %"}}</label>
              <label v-if="this.promoThird" class="font-weight-bold">{{this.promoThird*100 + " %"}}</label>
          </div>
          <div class="col-6 text-right">
              <label class="font-weight-bold">Final price: {{this.finalPrice}} €</label>
          </div>
        </div>
      </ul>
        <div class="row" style="margin:50px 0;">
          <div class="col-12 progress" style="padding:0;">
              <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <div class="row" style="margin:60px 0;">
          <div class="col-12 text-center">
            <label style="font-size:20px;">Thank you for making a purchase, your order is on its way!</label>
          </div>
        </div>
        <div class="row" style="margin:50px 0;">
          <div class="col-12 text-center">
            <img src="@/assets/delivery.png" height="250" width="250">
          </div>
        </div>
      </div>
    <Footer/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import store from '@/store.js';
export default {
  data() {
    return store;
  },
  components:{
    Navbar,
    Footer
  },
  mounted(){
    const _motionSensorDiscount = 9.97;
    const _smokeSensorDiscount = 4.98;
    this.quantityDiscountSmart = 0;
    this.quantityDiscountMotion = 0;
    this.quantityDiscountCamera = 0;
    this.quantityDiscountSmoke = 0;
    this.quantityDiscountWater = 0;
    this.finalPrice = 0;
    
    let parseArr = JSON.parse(localStorage.getItem("cart"));
    this.checkoutCart = parseArr;

    if(this.checkoutCart === null){
      this.$router.push({path: '/'});
    }else{
      for(let i = 0; i < this.checkoutCart.length; i++){
          this.finalPrice += this.checkoutCart[i].item_price;
          switch (this.checkoutCart[i].item_id){
            case 0: {
                      if(this.quantityDiscountSmart >= 0){
                        this.quantityDiscountSmart ++;
                      }
                    }break;
            case 1: { 
                      if(this.quantityDiscountMotion >= 0){
                        this.quantityDiscountMotion ++;
                      }
                    }break;
            case 2: {
                      if(this.quantityDiscountCamera >= 0){
                        this.quantityDiscountCamera ++;
                      }
                    }break;
            case 3: {
                      if(this.quantityDiscountSmoke >= 0){
                        this.quantityDiscountSmoke ++;
                      }
                    }break;
            case 4: {
                      if(this.quantityDiscountWater >= 0){
                        this.quantityDiscountWater ++;
                      }
                    }break;                
          }
          if(this.quantityDiscountMotion != 0 && this.quantityDiscountMotion >= 3 && this.quantityDiscountMotStr === ''){
            if(this.quantityDiscountMotion%3 == 0){
              let parse = parseFloat(Number(this.finalPrice)) - _motionSensorDiscount;
              this.finalPrice = parse.toFixed(2);
              this.quantityDiscountMotStr = `Discount applied. ${this.quantityDiscountMotion}x Motion Sensors`;
              localStorage.setItem("finalPrice", this.finalPrice);
            }
          }
          if(this.quantityDiscountSmoke != 0 && this.quantityDiscountSmoke >= 2 && this.quantityDiscountSmoStr === ''){
            if(this.quantityDiscountSmoke%2 == 0){
              let parse = parseFloat(Number(this.finalPrice)) - _smokeSensorDiscount;
              this.finalPrice = parse.toFixed(2);
              this.quantityDiscountSmoStr = `Discount applied. ${this.quantityDiscountSmoke}x Smoke Sensors`;
              localStorage.setItem("finalPrice", this.finalPrice);
            }
          }
      }
      if(localStorage.getItem("appliedPromo") !==  null){
          this.promoStr = JSON.parse(localStorage.getItem("appliedPromo"));
          this.finalPrice -= this.promoStr;
          let parse = this.finalPrice;
          this.finalPrice = parse.toFixed(2);
      }
      var obj = {};
      for ( var j=0, len=this.checkoutCart.length; j < len; j++ ){
          obj[this.checkoutCart[j]['item_name']] = this.checkoutCart[j];
          }

      this.checkoutCart = new Array();
      for ( var key in obj ){
          this.checkoutCart.push(obj[key]);
      }
      let parse = JSON.parse(localStorage.getItem("finalPrice"));
      this.finalPrice = parse;
      this.cartFilled = false;
      this.quantityDiscountSmart = 0;
      this.quantityDiscountMotion = 0;
      this.quantityDiscountCamera = 0;
      this.quantityDiscountSmoke = 0;
      this.quantityDiscountWater = 0;

      this.quantityDiscountSmoStr = '';
      this.quantityDiscountMotStr = '';
      localStorage.clear();
    }
  }
}
</script>