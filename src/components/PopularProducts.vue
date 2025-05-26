<template>
  <section class="py-8">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Популярные товары</h2>
      
      <!-- Сетка товаров -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @toggle-favorite="toggleFavorite(product.id)"
          @add-to-cart="addToCart(product.id)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'PopularProducts',
  components: {
    ProductCard
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Смартфон iPhone 13 Pro',
          description: 'Новейший смартфон с потрясающей камерой и мощным процессором',
          price: 89990,
          oldPrice: 99990,
          discount: 10,
          image: 'https://images.unsplash.com/photo-1632661674596-79e4adf1a2a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          category: 1,
          subcategory: 101,
          brand: 1,
          rating: 5
        },
        {
          id: 2,
          name: 'Ноутбук MacBook Pro',
          description: 'Мощный ноутбук для работы и творчества с процессором M2',
          price: 149990,
          oldPrice: 159990,
          discount: 6,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          category: 1,
          subcategory: 102,
          brand: 1,
          rating: 5
        },
        {
          id: 3,
          name: 'Умные часы Apple Watch',
          description: 'Стильные часы с множеством полезных функций и отличной автономностью',
          price: 29990,
          oldPrice: 34990,
          discount: 15,
          image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          category: 1,
          subcategory: 104,
          brand: 1,
          rating: 4
        },
        {
          id: 4,
          name: 'Беспроводные наушники AirPods Pro',
          description: 'Наушники с активным шумоподавлением и отличным звуком',
          price: 19990,
          oldPrice: 22990,
          discount: 13,
          image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          category: 1,
          subcategory: 104,
          brand: 1,
          rating: 5
        }
      ]
    }
  },
  methods: {
    toggleFavorite(productId) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        product.isFavorite = !product.isFavorite
      }
    },
    addToCart(productId) {
      // Здесь будет логика добавления в корзину
      console.log('Добавлено в корзину:', productId)
    }
  }
}
</script> 