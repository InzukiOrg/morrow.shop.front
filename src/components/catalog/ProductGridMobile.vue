<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
    <ProductCardMobile 
      v-for="product in products" 
      :key="product.id" 
      :product="product"
      @add-to-cart="$emit('add-to-cart', $event)"
    />
  </div>
</template>

<script>
import ProductCardMobile from './ProductCardMobile.vue'

export default {
  name: 'ProductGridMobile',
  components: {
    ProductCardMobile
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  emits: ['add-to-cart']
}
</script> 