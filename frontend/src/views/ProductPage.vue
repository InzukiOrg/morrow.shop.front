<template>
  <div>
    <ProductDetail 
      @add-to-cart="addToCart"
      @toggle-favorite="toggleFavorite"
    />
  </div>
</template>

<script>
import ProductDetail from '@/components/catalog/ProductDetail.vue'

export default {
  name: 'ProductPage',
  components: {
    ProductDetail
  },
  methods: {
    addToCart(product) {
      console.log('Добавлено в корзину:', product)
    },
    toggleFavorite(productId) {
      console.log('Изменено состояние избранного:', productId)
    }
  }
}
</script> 