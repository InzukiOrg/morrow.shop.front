<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Левая часть -->
        <div class="flex items-center space-x-4">
          <!-- <img src="/logo.png" alt="Morrow Shop" class="h-10"> -->
          <router-link 
            to="/" 
            class="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            Morrow Shop
          </router-link>
          <CitySelector />
          <CatalogMenu />
        </div>

        <!-- Центр - Поиск -->
        <div class="relative flex-1 max-w-2xl mx-8">
          <input 
            type="text" 
            placeholder="Поиск товаров..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
          <button class="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
        </div>

        <!-- Правая часть -->
        <div class="flex items-center space-x-6">
          <!-- Акции -->
          <button class="flex flex-col items-center text-gray-600 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
            </svg>
            <span class="text-xs mt-1">Акции</span>
          </button>

          <!-- Избранное -->
          <button class="flex flex-col items-center text-gray-600 hover:text-gray-800 relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span class="text-xs mt-1">Избранное</span>
            <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          <!-- Доставка -->
          <button class="flex flex-col items-center text-gray-600 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
            </svg>
            <span class="text-xs mt-1">Доставка</span>
          </button>

          <!-- Корзина -->
          <button class="flex flex-col items-center text-gray-600 hover:text-gray-800 relative">
            <router-link to="/cart" class="flex flex-col items-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span class="text-xs mt-1">Корзина</span>
              <span class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {{ cartItemsCount }}
              </span>
            </router-link>
          </button>

          <!-- Профиль -->
          <button class="flex flex-col items-center text-gray-600 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span class="text-xs mt-1">Профиль</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import CitySelector from './CitySelector.vue'
import CatalogMenu from './CatalogMenu.vue'

export default {
  name: 'Header',
  components: {
    CitySelector,
    CatalogMenu
  },
  data() {
    return {
      cartItemsCount: 0
    }
  },
  methods: {
    updateCartCount() {
      // TODO: Получать реальное количество товаров из хранилища
      this.cartItemsCount = 3
    }
  },
  mounted() {
    this.updateCartCount()
  }
}
</script>

<style scoped>
/* Дополнительные стили можно добавить здесь */
</style> 