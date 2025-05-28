<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-6">Популярные товары</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in popularProducts" 
        :key="product.id" 
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { products } from '@/data.js'
import ProductCard from './ProductCard.vue'

export default {
  name: 'PopularProducts',
  components: {
    ProductCard
  },
  setup() {
    const popularProducts = computed(() => {
      return products.filter(p => p.popular).slice(0, 8)
    })

    return {
      popularProducts
    }
  }
}
</script> 