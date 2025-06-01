<template>
  <div class="container mx-auto py-2">
    <h2 class="text-2xl font-bold mb-6">Популярные товары 🔥</h2>
    <ProductCarousel 
      :products="popularProducts" 
      desktop-grid-classes="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { products } from '@/data.js'
import ProductCarousel from './ProductCarousel.vue'

export default {
  name: 'PopularProducts',
  components: {
    ProductCarousel
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

<style scoped>
/* Скрываем стандартный скроллбар */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}

/* Плавная прокрутка */
.overflow-x-auto {
  scroll-behavior: smooth;
}

/* Эффект снэпа для лучшего UX */
.overflow-x-auto {
  scroll-snap-type: x mandatory;
}

.overflow-x-auto > div > div {
  scroll-snap-align: start;
}
</style> 