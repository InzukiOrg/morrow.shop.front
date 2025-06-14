<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full relative"
  >
    <!-- Изображение товара -->
    <div class="relative">
      <router-link :to="'/product/' + product.id" class="block">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="w-full h-32 sm:h-36 object-cover"
        >
      </router-link>
      <!-- Рейтинг (упрощенный для мобильных) -->
      <div class="absolute top-1 left-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center space-x-1">
        <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span class="text-xs font-medium text-gray-800">{{ product.rating }}</span>
      </div>
      <!-- Бейдж скидки, если есть -->
      <div v-if="product.discount" class="absolute top-1 right-1 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs">
        -{{ product.discount }}%
      </div>
    </div>

    <!-- Информация о товаре -->
    <div class="p-2 sm:p-3 flex flex-col flex-grow">
      <!-- Название -->
      <router-link :to="'/product/' + product.id" class="block">
        <h3 class="font-medium text-sm sm:text-base text-gray-800 mb-1 sm:mb-2 hover:text-blue-600 transition-colors line-clamp-2">{{ product.name }}</h3>
      </router-link>

      <!-- Описание (скрыто на очень маленьких экранах) -->
      <p class="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 flex-grow hidden sm:block">{{ product.description }}</p>

      <!-- Цена и кнопка -->
      <div class="flex flex-col space-y-2 mt-auto">
        <div class="flex items-baseline justify-between">
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:space-x-1">
            <span class="text-base sm:text-lg font-bold text-gray-800">{{ formatPrice(product.price) }} ₽</span>
            <span v-if="product.discount" class="text-xs sm:text-sm text-gray-400 line-through">{{ formatPrice(product.oldPrice) }} ₽</span>
          </div>
        </div>
        
        <!-- Кнопка корзины (компактная для мобильных) -->
        <button
          v-if="!isInCart"
          @click="addToCart"
          type="button"
          class="w-full py-2 bg-blue-600 text-white rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
        >
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span class="inline">В корзину</span>
        </button>
        <router-link
          v-else
          to="/cart"
          class="w-full py-2 bg-gray-300 text-gray-700 rounded text-xs sm:text-sm hover:bg-gray-400 transition-colors flex items-center justify-center space-x-1"
        >
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span class="inline">В корзине</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

export default {
  name: 'ProductCardMobile',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const cartStore = useCartStore()

    const isInCart = computed(() => {
      return cartStore.items.some(item => item.id === props.product.id)
    })

    const addToCart = () => {
      cartStore.addToCart(props.product.id)
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('ru-RU').format(price)
    }

    return {
      isInCart,
      addToCart,
      formatPrice
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 