<template>
  <div>
    <Navbar/>
    <div class="container">
      <ul>
        <div class="row">
          <li class="col-12" style="padding:20px 0;" v-for="item in checkoutCart" :key="item.id">
            <CheckoutProduct :id="item.id" :infoCheckoutItem="item"/>
          </li>
        </div>
      </ul>
      <div v-if="this.checkoutCart === null" class="text-center cart-empty">
        <img src="@/assets/emptycart.png" class="cart-empty-photo">
      </div>
      
      <div v-else class="row" style="margin-top:76px; margin-bottom:150px;">
        <div class="col-12 col-lg-4 w-100">
          <div class="promo-wrapper">
            <i class="fas fa-cut promo-cut"></i>
            <input v-model="promoCode" type="text" class="promo-input" placeholder="Promo code...">
            <button class="promo-button" @click="applyPromo(promoCode)">Apply</button>
            <label>Disclamer: Rules about coupon stacking/ not stacking... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</label>
          </div>
        </div>
        <div class="col-lg-4"></div>
        <div class="col-12 col-lg-4 text-right" style="margin-bottom:100px;">
          <div class="d-flex d-inline-block">
            <label class="mr-auto">Shipping:</label>
            <label>Free</label>
          </div>
          <div class="d-flex d-inline-block" style="margin-bottom:20px;">
            <label class="mr-auto">Estimated tax:</label>
            <label>Free</label>
          </div>
          <div v-if="promoStr" class="text-left" style="margin-bottom:20px;">
            <label class="mr-auto">Coupons discount:</label>
            <div v-if="promoStr === 20" class="d-flex d-inline-block">
              <div class="mr-auto promo-applied-20 text-center">{{this.promoStr}}€</div>
              <button class="promo-remove" @click="removePromo()">Remove</button>
            </div>
            <div v-if="promoStr === 0.2" class="d-flex d-inline-block">
              <div class="mr-auto promo-applied-02 text-center">{{this.promoStr*100}}%</div>
              <button class="promo-remove" @click="removePromo()">Remove</button>
            </div>
            <div v-if="promoStr === 0.05" class="d-flex d-inline-block">
              <div class="mr-auto promo-applied-005 text-center">{{this.promoStr*100}}%</div>
              <button class="promo-remove" @click="removePromo()">Remove</button>
            </div>
          </div>
          <div class="d-flex d-inline-block" style="margin-bottom:20px;">
            <label class="mr-auto font-weight-bold">Estimated total:</label>
            <label class="font-weight-bold">{{this.finalPrice}} €</label>
          </div>
          <button class="checkout-button" @click="proceedToCheckout()">Checkout<i class="fas fa-arrow-right"></i></button>
          <button class="checkout-return-button" @click="back()">Continue shopping</button>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import store from '@/store.js';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import CheckoutProduct from '@/components/CheckoutProduct.vue';

export default {
  name: 'Cart',
  data(){
    return store;
  },
  components: {
    Navbar,
    Footer,
    CheckoutProduct
  },
  mounted(){
    let str = JSON.parse(localStorage.getItem("cart"));
    this.checkoutCart = str;

    const _motionSensorDiscount = 9.97;
    const _smokeSensorDiscount = 4.98;
    this.quantityDiscountSmart = 0;
    this.quantityDiscountMotion = 0;
    this.quantityDiscountCamera = 0;
    this.quantityDiscountSmoke = 0;
    this.quantityDiscountWater = 0;

    this.finalPrice = 0; 
    
    if(this.checkoutCart !== null){
      for(let i = 0; i < this.checkoutCart.length; i++){
        let priceSum = parseFloat(Number(this.finalPrice));
        this.finalPrice = priceSum;
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

        let parseArr = JSON.parse(localStorage.getItem("cart"));
        this.checkoutCart = parseArr;
        
        let parse = parseFloat(Number(this.finalPrice));
        this.finalPrice = parse.toFixed(2);
      }
    }
    if(localStorage.getItem("appliedPromo") !==  null){
        this.promoStr = JSON.parse(localStorage.getItem("appliedPromo"));
        this.finalPrice -= this.promoStr;
        let parse = this.finalPrice;
        this.finalPrice = parse.toFixed(2);
    }
    if(this.checkoutCart !== null){
      if(this.finalPrice < 0) {
        if(this.checkoutCart.length > 0){
        this.finalPrice = 0; 
        }
      }
    }
    if(this.checkoutCart !== null){
      var obj = {};
      for ( var j=0, len=this.checkoutCart.length; j < len; j++ ){
          obj[this.checkoutCart[j]['item_name']] = this.checkoutCart[j];
          }

      this.checkoutCart = new Array();
      for ( var key in obj ){
          this.checkoutCart.push(obj[key]);
      }
    }
    localStorage.setItem("finalPrice", this.finalPrice)
  },
  methods:{
    checkDuplicateInObject(propertyName, inputArray) {
      var seenDuplicate = false,
          testObject = {};

      inputArray.map(function(item) {
        var itemPropertyName = item[propertyName];    
        if (itemPropertyName in testObject) {
          testObject[itemPropertyName].duplicate = true;
          item.duplicate = true;
          seenDuplicate = true;
        }
        else {
          testObject[itemPropertyName] = item;
          delete item.duplicate;
        }
      });

      return seenDuplicate;
    },
    /**
     * Applies the promotion code 'promoCode' to a list of products placed in cart
     * @param {string}
     */
    applyPromo(promoCode){
      const _promoCodeFirst = 20;
      const _promoCodeSecond = 0.2;
      const _promoCodeThird = 0.05;
      
      const _promoCodeFirstStr = "20EUROFF";
      const _promoCodeSecondStr = "20%OFF";
      const _promoCodeThirdStr = "5%OFF";

      let appliedPromo;

      switch(promoCode){
        case _promoCodeFirstStr :{
          this.finalPrice -=  _promoCodeFirst;
          appliedPromo = _promoCodeFirst;
        } break;

        case _promoCodeSecondStr :{
          let salePrice = this.finalPrice - (this.finalPrice * _promoCodeSecond);
          this.finalPrice = salePrice;
          appliedPromo = _promoCodeSecond;
        } break;

        case _promoCodeThirdStr :{
          let salePrice = this.finalPrice - (this.finalPrice * _promoCodeThird);
          this.finalPrice = salePrice;
          appliedPromo = _promoCodeThird;
        } break;
      }
      
      let parse = parseFloat(Number(this.finalPrice));
      this.finalPrice = parse.toFixed(2);
      localStorage.setItem("appliedPromo", appliedPromo);
      localStorage.setItem("finalPrice", this.finalPrice);

      this.$router.go({path: 'cart/'});
    },
    /**
     * Removes the currently applied promotion from cart
     */
    removePromo(){
      localStorage.removeItem("appliedPromo");
      this.$router.go({path: 'cart/'});
    },
    proceedToCheckout(){
      this.$router.push({ name: 'Checkout Details' })
    },
    back(){
      this.$router.push({path: '/'});
    }
  }
}
</script>