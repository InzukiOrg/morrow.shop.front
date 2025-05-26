<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <!-- Левая колонка с изображением -->
        <div class="space-y-4">
          <div class="relative aspect-square rounded-lg overflow-hidden">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-full object-cover"
            >
            <!-- Бейдж скидки -->
            <div v-if="product.discount" class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-lg font-medium">
              -{{ product.discount }}%
            </div>
          </div>
          
          <!-- Галерея миниатюр (заглушка) -->
          <div class="grid grid-cols-4 gap-4">
            <div v-for="i in 4" :key="i" class="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-full object-cover"
              >
            </div>
          </div>
        </div>

        <!-- Правая колонка с информацией -->
        <div class="space-y-6">
          <!-- Название и рейтинг -->
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
            <div class="flex items-center space-x-2">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="ml-1 text-gray-600">{{ product.rating }}</span>
              </div>
              <span class="text-gray-400">|</span>
              <span class="text-gray-600">В наличии</span>
            </div>
          </div>

          <!-- Цена -->
          <div class="space-y-2">
            <div class="flex items-baseline space-x-3">
              <span class="text-3xl font-bold text-gray-900">{{ formatPrice(product.price) }} ₽</span>
              <span v-if="product.discount" class="text-xl text-gray-400 line-through">{{ formatPrice(product.oldPrice) }} ₽</span>
            </div>
            <p v-if="product.discount" class="text-green-600">Экономия {{ formatPrice(product.oldPrice - product.price) }} ₽</p>
          </div>

          <!-- Описание -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">Описание</h2>
            <p class="text-gray-600">{{ product.description }}</p>
          </div>

          <!-- Характеристики -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">Характеристики</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Бренд</span>
                <span class="font-medium">Apple</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Категория</span>
                <span class="font-medium">Электроника</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Гарантия</span>
                <span class="font-medium">12 месяцев</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-gray-600">Страна</span>
                <span class="font-medium">Китай</span>
              </div>
            </div>
          </div>

          <!-- Кнопки действий -->
          <div class="flex space-x-4">
            <button 
              @click="addToCart"
              class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span>Добавить в корзину</span>
            </button>
            <button 
              @click="toggleFavorite"
              class="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('ru-RU').format(price)
    },
    addToCart() {
      this.$emit('add-to-cart', this.product)
    },
    toggleFavorite() {
      this.$emit('toggle-favorite', this.product.id)
    }
  }
}
</script> 