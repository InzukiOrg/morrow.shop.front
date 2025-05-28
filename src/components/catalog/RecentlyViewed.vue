<template>
  <div v-if="recentProducts.length" class="mt-12">
    <h2 class="text-xl font-bold mb-4">Вы недавно смотрели</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <ProductCard v-for="item in recentProducts" :key="item.id" :product="item" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRecentlyViewedStore } from '@/stores/recentlyViewed.js'
import ProductCard from './ProductCard.vue'

export default {
  name: 'RecentlyViewed',
  components: { ProductCard },
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