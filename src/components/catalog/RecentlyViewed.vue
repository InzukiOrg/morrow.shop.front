<template>
  <div v-if="recentProducts.length" class="mt-12">
    <h2 class="text-xl font-bold mb-4">Вы недавно смотрели</h2>
    <ProductCarousel :products="recentProducts" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRecentlyViewedStore } from '@/stores/recentlyViewed.js'
import ProductCarousel from './ProductCarousel.vue'

export default {
  name: 'RecentlyViewed',
  components: { 
    ProductCarousel
  },
  setup() {
    const recentlyViewed = useRecentlyViewedStore()
    
    onMounted(() => {
      recentlyViewed.init()
    })
    
    const recentProducts = computed(() => recentlyViewed.items)
    
    return { recentProducts }
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