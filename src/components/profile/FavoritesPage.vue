<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Мобильная версия -->
    <div class="lg:hidden">
      <!-- Заголовок -->
      <div class="flex justify-between items-center mb-4">
        <div>
          <h1 class="text-xl font-bold">Избранное</h1>
          <p class="text-xs text-gray-500 mt-0.5">{{ favorites.length }} товаров</p>
        </div>
        <button v-if="favorites.length" @click="clearAll" 
                class="btn btn-ghost btn-sm gap-1 px-2 min-h-0 h-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span class="text-xs">Очистить</span>
        </button>
      </div>

      <!-- Список избранных товаров -->
      <div v-if="favorites.length" class="space-y-3">
        <div v-for="product in favorites" :key="product.id" 
             class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="p-3">
            <div class="flex gap-3">
              <!-- Изображение товара -->
              <router-link :to="'/product/' + product.id" class="w-20 h-20 flex-shrink-0">
                <img :src="product.image" :alt="product.name" 
                     class="w-full h-full object-cover rounded-md" />
              </router-link>
              
              <!-- Информация о товаре -->
              <div class="flex-grow min-w-0">
                <router-link :to="'/product/' + product.id" class="block">
                  <h3 class="font-medium text-base mb-0.5 truncate">{{ product.name }}</h3>
                </router-link>
                <p class="text-xs text-gray-600 mb-2 line-clamp-2">{{ product.description }}</p>
                <div class="flex justify-between items-end">
                  <div class="flex items-baseline gap-1">
                    <span class="text-base font-bold text-blue-600">{{ formatPrice(product.price) }} ₽</span>
                    <span v-if="product.oldPrice" class="text-xs text-gray-400 line-through">{{ formatPrice(product.oldPrice) }} ₽</span>
                  </div>
                  <div class="flex gap-1">
                    <button @click="removeFromFavorites(product.id)" 
                            class="btn btn-ghost btn-sm btn-circle min-h-0 h-8 w-8 p-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button @click="addToCart(product)" 
                            class="btn btn-primary btn-sm min-h-0 h-8 px-2 gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span class="lg:text-xs hidden">В корзину</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Пустое состояние -->
      <div v-else class="card bg-white shadow-sm">
        <div class="card-body text-center py-8">
          <div class="w-16 h-16 mx-auto mb-3 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium mb-2">В избранном пока ничего нет</h3>
          <p class="text-sm text-gray-600 mb-4">Добавляйте товары в избранное, чтобы не потерять их</p>
          <router-link to="/catalog" class="btn btn-primary btn-sm">Перейти в каталог</router-link>
        </div>
      </div>
    </div>

    <!-- Десктопная версия -->
    <div class="hidden lg:block">
      <!-- Заголовок -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold">Избранное</h1>
          <p class="text-gray-500 mt-2">{{ favorites.length }} товаров</p>
        </div>
        <button v-if="favorites.length" @click="clearAll" 
                class="btn btn-ghost gap-2 hover:bg-red-50 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Очистить всё
        </button>
      </div>

      <!-- Список избранных товаров -->
      <div v-if="favorites.length" class="grid grid-cols-2 gap-6">
        <div v-for="product in favorites" :key="product.id" 
             class="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
          <div class="p-6">
            <div class="flex gap-6">
              <!-- Изображение товара -->
              <router-link :to="'/product/' + product.id" class="w-32 h-32 flex-shrink-0">
                <img :src="product.image" :alt="product.name" 
                     class="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity" />
              </router-link>
              
              <!-- Информация о товаре -->
              <div class="flex-grow min-w-0">
                <router-link :to="'/product/' + product.id" class="block">
                  <h3 class="font-medium text-xl mb-2 hover:text-blue-600 transition-colors">{{ product.name }}</h3>
                </router-link>
                <p class="text-gray-600 mb-4">{{ product.description }}</p>
                <div class="flex justify-between items-end">
                  <div class="flex items-baseline gap-2">
                    <span class="text-2xl font-bold text-blue-600">{{ formatPrice(product.price) }} ₽</span>
                    <span v-if="product.oldPrice" class="text-lg text-gray-400 line-through">{{ formatPrice(product.oldPrice) }} ₽</span>
                  </div>
                  <div class="flex gap-3">
                    <button @click="removeFromFavorites(product.id)" 
                            class="btn btn-ghost btn-circle hover:bg-red-50 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button @click="addToCart(product)" 
                            class="btn btn-primary gap-2 hover:bg-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Пустое состояние -->
      <div v-else class="card bg-white shadow-sm">
        <div class="card-body text-center py-16">
          <div class="w-24 h-24 mx-auto mb-6 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-medium mb-4">В избранном пока ничего нет</h3>
          <p class="text-gray-600 mb-8">Добавляйте товары в избранное, чтобы не потерять их</p>
          <router-link to="/catalog" class="btn btn-primary btn-lg">Перейти в каталог</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoritesPage',
  data() {
    return {
      favorites: [
        {
          id: 1,
          name: 'Смартфон iPhone 13 Pro',
          description: 'Самый мощный iPhone с потрясающей камерой и дисплеем ProMotion.',
          price: 99990,
          oldPrice: 109990,
          image: 'https://i.pravatar.cc/300?img=1'
        },
        {
          id: 2,
          name: 'Ноутбук MacBook Pro 14"',
          description: 'Мощный ноутбук с процессором M1 Pro и дисплеем Liquid Retina XDR.',
          price: 199990,
          oldPrice: null,
          image: 'https://i.pravatar.cc/300?img=2'
        }
      ]
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('ru-RU').format(price)
    },
    removeFromFavorites(productId) {
      this.favorites = this.favorites.filter(p => p.id !== productId)
    },
    clearAll() {
      this.favorites = []
    },
    addToCart(product) {
      // Здесь будет логика добавления в корзину
      console.log('Добавлено в корзину:', product)
    }
  }
}
</script> 