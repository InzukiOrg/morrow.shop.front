<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Корзина</h1>

    <!-- Пустая корзина -->
    <div v-if="!cartItems.length" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
      <p class="text-xl text-gray-600 mb-4">Ваша корзина пуста</p>
      <router-link to="/catalog" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Перейти к покупкам
      </router-link>
    </div>

    <!-- Корзина с товарами -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Список товаров -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md divide-y">
          <div v-for="item in cartItems" :key="item.id" class="p-6 flex items-center">
            <!-- Изображение -->
            <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded-lg">
            
            <!-- Информация о товаре -->
            <div class="ml-6 flex-grow">
              <h3 class="text-lg font-medium text-gray-800">{{ item.name }}</h3>
              <p class="text-gray-600 text-sm mt-1">{{ item.description }}</p>
              
              <!-- Цена и количество -->
              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center border rounded-lg">
                    <button 
                      @click="decreaseQuantity(item)"
                      class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                    >
                      -
                    </button>
                    <span class="px-3 py-1">{{ item.quantity }}</span>
                    <button 
                      @click="increaseQuantity(item)"
                      class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                  <span class="text-lg font-medium text-gray-800">{{ formatPrice(item.price * item.quantity) }} ₽</span>
                </div>
                
                <!-- Удалить -->
                <button 
                  @click="removeFromCart(item)"
                  class="text-red-500 hover:text-red-600"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Итого -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
          <h2 class="text-xl font-bold mb-4">Итого</h2>
          
          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-gray-600">
              <span>Товары ({{ totalItems }})</span>
              <span>{{ formatPrice(subtotal) }} ₽</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Доставка</span>
              <span>Бесплатно</span>
            </div>
            <div class="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Итого к оплате</span>
              <span>{{ formatPrice(subtotal) }} ₽</span>
            </div>
          </div>

          <router-link
            to="/checkout"
            class="w-full block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center text-lg font-semibold mb-2"
          >
            Оформить заказ
          </router-link>
        </div>
      </div>
    </div>
    <RecentlyViewed />
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'
import { computed, onMounted } from 'vue'
import RecentlyViewed from '@/components/catalog/RecentlyViewed.vue'

export default {
  name: 'CartPage',
  components: {
    RecentlyViewed
  },
  setup() {
    const cartStore = useCartStore()
    onMounted(() => {
      cartStore.initCart()
    })

    const cartItems = computed(() => cartStore.cartItems)
    const totalItems = computed(() => cartStore.itemCount)
    const subtotal = computed(() => cartStore.total)

    const formatPrice = (price) => {
      return new Intl.NumberFormat('ru-RU').format(price)
    }

    const increaseQuantity = (item) => {
      cartStore.updateQuantity(item.id, item.quantity + 1)
    }
    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        cartStore.updateQuantity(item.id, item.quantity - 1)
      }
    }
    const removeFromCart = (item) => {
      cartStore.removeFromCart(item.id)
    }
    const checkout = () => {
      alert('Функционал оформления заказа будет добавлен позже')
    }

    return {
      cartItems,
      totalItems,
      subtotal,
      formatPrice,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      checkout
    }
  }
}
</script> 