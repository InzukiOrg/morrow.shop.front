<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img :src="product.image" :alt="product.name" class="w-full rounded-lg shadow-md mb-4">
      </div>
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
        <div class="flex items-center text-gray-500 mb-2 space-x-4">
          <span v-if="brand">Бренд: <span class="font-semibold text-gray-800">{{ brand.name }}</span></span>
          <span v-if="category">Категория: <span class="font-semibold text-gray-800">{{ category.name }}</span></span>
        </div>
        <div class="flex items-center mb-4">
          <span class="text-2xl font-bold mr-4">{{ formatPrice(product.price) }} ₽</span>
          <span v-if="product.oldPrice" class="text-lg text-gray-400 line-through mr-2">{{ formatPrice(product.oldPrice) }} ₽</span>
          <span v-if="product.discount" class="bg-red-500 text-white px-2 py-1 rounded text-xs ml-2">-{{ product.discount }}%</span>
        </div>
        <div class="flex items-center mb-4">
          <span class="flex items-center">
            <svg v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="ml-2 text-gray-600 text-sm">({{ product.rating }})</span>
          </span>
          <button class="ml-6 text-gray-400 hover:text-red-500" title="В избранное">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Описание</h2>
          <p class="text-gray-600">{{ product.description }}</p>
        </div>
        <div v-if="hasSpecs" class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Характеристики</h2>
          <table class="w-full text-sm text-gray-700">
            <tbody>
              <tr v-if="product.size">
                <td class="py-1 pr-4 text-gray-500">Размеры</td>
                <td>{{ Array.isArray(product.size) ? product.size.join(', ') : product.size }}</td>
              </tr>
              <tr v-if="product.color">
                <td class="py-1 pr-4 text-gray-500">Цвет</td>
                <td>{{ product.color }}</td>
              </tr>
              <tr v-if="product.gender">
                <td class="py-1 pr-4 text-gray-500">Пол</td>
                <td>{{ product.gender }}</td>
              </tr>
              <tr v-if="brand">
                <td class="py-1 pr-4 text-gray-500">Бренд</td>
                <td>{{ brand.name }}</td>
              </tr>
              <tr v-if="category">
                <td class="py-1 pr-4 text-gray-500">Категория</td>
                <td>{{ category.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center space-x-4 mb-4">
          <div class="flex items-center border rounded">
            <button 
              @click="updateQuantity(quantity - 1)"
              class="px-3 py-2 hover:bg-gray-100"
              :disabled="quantity <= 1"
            >
              -
            </button>
            <span class="px-4 py-2">{{ quantity }}</span>
            <button 
              @click="updateQuantity(quantity + 1)"
              class="px-3 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <span class="text-gray-500 text-sm">Цена за 1 шт: {{ formatPrice(product.price) }} ₽</span>
        </div>
        <div class="flex items-center space-x-4">
          <button 
            v-if="!isInCart"
            @click="addToCart"
            class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Добавить в корзину
          </button>
          <router-link 
            v-else
            to="/cart"
            class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            Перейти в корзину
          </router-link>
        </div>
      </div>
    </div>
    <!-- Похожие товары -->
    <div v-if="relatedProducts.length" class="mt-12">
      <h2 class="text-2xl font-bold mb-6">Похожие товары</h2>
      <ProductCarousel :products="relatedProducts" />
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { products, brandsByCategory, categories } from '@/data.js'
import ProductCarousel from './ProductCarousel.vue'
import { useRecentlyViewedStore } from '@/stores/recentlyViewed.js'

export default {
  name: 'ProductDetail',
  components: { 
    ProductCarousel
  },
  setup() {
    const route = useRoute()
    const cartStore = useCartStore()
    const recentlyViewed = useRecentlyViewedStore()
    const quantity = ref(1)

    const product = computed(() => {
      return products.find(p => p.id === parseInt(route.params.id))
    })
    const brand = computed(() => {
      if (!product.value) return null
      // Находим slug категории товара
      const findSlug = (cats, id) => {
        for (const c of cats) {
          if (c.id === id) return c.slug
          if (c.children) {
            const res = findSlug(c.children, id)
            if (res) return res
          }
        }
        return null
      }
      const slug = findSlug(categories, product.value.category)
      if (!slug) return null
      const brands = brandsByCategory[slug] || []
      return brands.find(b => b.id === product.value.brand)
    })
    const category = computed(() => {
      if (!product.value) return null
      const findCat = (cats, id) => {
        for (const c of cats) {
          if (c.id === id) return c
          if (c.children) {
            const res = findCat(c.children, id)
            if (res) return res
          }
        }
        return null
      }
      return findCat(categories, product.value.category)
    })
    const hasSpecs = computed(() => {
      return product.value && (product.value.size || product.value.color || product.value.gender)
    })
    const isInCart = computed(() => {
      return cartStore.items.some(item => item.id === product.value?.id)
    })
    const updateQuantity = (newQuantity) => {
      if (newQuantity > 0) {
        quantity.value = newQuantity
      }
    }
    const addToCart = () => {
      if (product.value) {
        cartStore.addToCart(product.value.id, quantity.value)
      }
    }
    const formatPrice = (price) => {
      return new Intl.NumberFormat('ru-RU').format(price)
    }
    // Похожие товары по категории (кроме текущего)
    const relatedProducts = computed(() => {
      if (!product.value) return []
      return products
        .filter(p => p.category === product.value.category && p.id !== product.value.id)
        .slice(0, 4)
    })

    onMounted(() => {
      cartStore.initCart()
      recentlyViewed.init()
      
      // Добавляем товар в недавно просмотренные
      if (product.value) {
        recentlyViewed.add(product.value.id)
      }
    })

    return {
      product,
      brand,
      category,
      quantity,
      isInCart,
      updateQuantity,
      addToCart,
      hasSpecs,
      formatPrice,
      relatedProducts
    }
  }
}
</script> 