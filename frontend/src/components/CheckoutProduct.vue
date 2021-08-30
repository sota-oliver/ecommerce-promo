<template>
    <div class="row checkout-cart-single-wrapper">
        <div class="col-12 col-lg-2 text-center"><img :src="infoCheckoutItem.item_image" class="d-inline-block checkout-cart-single-photo"></div>
        
        <div class="col-8 col-lg-8">
            <div class="row text-center checkout-cart-single">
                <div class="col-6">
                    <label class="checkout-cart-single-label">{{infoCheckoutItem.item_name}}</label>
                </div>
                <div class="col-6">
                    <button class="product-page-counter-button" @click="removeFromCart(infoCheckoutItem.item_id)">-</button>
                    <label v-if="infoCheckoutItem.item_id === 0" class="checkout-cart-single-label">{{this.quantityDiscountSmart}}</label>
                    <label v-else-if="infoCheckoutItem.item_id === 1" class="checkout-cart-single-label">{{this.quantityDiscountMotion}}</label>
                    <label v-else-if="infoCheckoutItem.item_id === 2" class="checkout-cart-single-label">{{this.quantityDiscountCamera}}</label>
                    <label v-else-if="infoCheckoutItem.item_id === 3" class="checkout-cart-single-label">{{this.quantityDiscountSmoke}}</label>
                    <label v-else-if="infoCheckoutItem.item_id === 4" class="checkout-cart-single-label">{{this.quantityDiscountWater}}</label>
                    <button class="product-page-counter-button" @click="addToCart()">+</button>
                </div>
            </div>
        </div>
        <div class="col-4 col-lg-2 checkout-cart-single-label text-right">
            {{infoCheckoutItem.item_price}} €
        </div>
    </div>
</template>
<script>
import store from '@/store.js';
export default {
    name: 'ProductInCart',
    props:['infoCheckoutItem'],
    data(){
        return store;
    },
    methods:{
        /**
         * Removes the selected product from cart
         * @param {number}
         */
        removeFromCart(index){
            let str = JSON.parse(this.finalPrice);
            this.finalPrice = str;
            let check = null;
            let cartObjects = JSON.parse(localStorage.getItem("cart"));
            for(let i = 0; i < cartObjects.length; i++){
                if(cartObjects[i].item_id === index){
                    if(this.finalPrice >= 0){
                        check = i;
                    }
                }
            }
            if(check !== null){
                cartObjects.splice(check, 1);
                localStorage.setItem("cart", JSON.stringify(cartObjects));
                this.$router.go({path: 'cart/'});
            }
        },
        addToCart(){
            let parsedObj = JSON.parse(localStorage.getItem("cart"));
            
            if(parsedObj === null){
            parsedObj = [];
            }
            parsedObj.push(this.infoCheckoutItem);
            localStorage.setItem("cart", JSON.stringify(parsedObj));
            this.$router.go({path: 'cart/'});
        },
    }
}
</script>