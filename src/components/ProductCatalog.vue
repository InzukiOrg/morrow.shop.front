<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex gap-8">
      <!-- Фильтры -->
      <div class="w-64 flex-shrink-0">
        <div class="bg-white rounded-lg shadow-md p-4">
          <h2 class="text-lg font-semibold mb-4">Фильтры</h2>
          
          <!-- Категории -->
          <div class="mb-6">
            <h3 class="font-medium mb-2">Категории</h3>
            <div class="space-y-2">
              <label v-for="category in categories" :key="category.id" class="flex items-center">
                <input 
                  type="checkbox" 
                  :value="category.id"
                  v-model="selectedCategories"
                  class="rounded text-blue-600 focus:ring-blue-500"
                >
                <span class="ml-2 text-gray-700">{{ category.name }}</span>
              </label>
            </div>
          </div>

          <!-- Цена -->
          <div class="mb-6">
            <h3 class="font-medium mb-2">Цена</h3>
            <div class="flex items-center space-x-2">
              <input 
                type="number" 
                v-model="priceRange.min"
                placeholder="От"
                class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              >
              <span>-</span>
              <input 
                type="number" 
                v-model="priceRange.max"
                placeholder="До"
                class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              >
            </div>
          </div>

          <!-- Бренды -->
          <div class="mb-6">
            <h3 class="font-medium mb-2">Бренды</h3>
            <div class="space-y-2">
              <label v-for="brand in brands" :key="brand.id" class="flex items-center">
                <input 
                  type="checkbox" 
                  :value="brand.id"
                  v-model="selectedBrands"
                  class="rounded text-blue-600 focus:ring-blue-500"
                >
                <span class="ml-2 text-gray-700">{{ brand.name }}</span>
              </label>
            </div>
          </div>

          <!-- Рейтинг -->
          <div class="mb-6">
            <h3 class="font-medium mb-2">Рейтинг</h3>
            <div class="space-y-2">
              <label v-for="rating in 5" :key="rating" class="flex items-center">
                <input 
                  type="radio" 
                  :value="rating"
                  v-model="selectedRating"
                  class="text-blue-600 focus:ring-blue-500"
                >
                <span class="ml-2 text-gray-700">{{ rating }} звезд</span>
              </label>
            </div>
          </div>

          <!-- Кнопка сброса -->
          <button 
            @click="resetFilters"
            class="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      </div>

      <!-- Список товаров -->
      <div class="flex-1">
        <!-- Сортировка -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center space-x-4">
            <select 
              v-model="sortBy"
              class="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="popular">По популярности</option>
              <option value="price_asc">По возрастанию цены</option>
              <option value="price_desc">По убыванию цены</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>
          <div class="text-gray-600">
            Найдено товаров: {{ filteredProducts.length }}
          </div>
        </div>

        <!-- Сетка товаров -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductCatalog',
  components: {
    ProductCard
  },
  data() {
    return {
      selectedCategories: [],
      selectedBrands: [],
      selectedRating: null,
      priceRange: {
        min: null,
        max: null
      },
      sortBy: 'popular',
      categories: [
        { id: 1, name: 'Электроника' },
        { id: 2, name: 'Одежда' },
        { id: 3, name: 'Дом и сад' },
        { id: 4, name: 'Красота и здоровье' }
      ],
      brands: [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Samsung' },
        { id: 3, name: 'Xiaomi' },
        { id: 4, name: 'Huawei' }
      ],
      products: [
        {
          id: 1,
          name: 'iPhone 13 Pro',
          description: 'Смартфон с отличной камерой и производительностью',
          price: 99990,
          oldPrice: 109990,
          discount: 10,
          image: 'https://via.placeholder.com/300',
          category: 1,
          subcategory: 101,
          brand: 1,
          rating: 5
        },
        {
          id: 2,
          name: 'Samsung Galaxy S21',
          description: 'Мощный Android-смартфон с отличным экраном',
          price: 79990,
          oldPrice: 89990,
          discount: 15,
          image: 'https://via.placeholder.com/300',
          category: 1,
          subcategory: 101,
          brand: 2,
          rating: 4
        },
        {
          id: 3,
          name: 'Xiaomi Mi 11',
          description: 'Флагманский смартфон с отличным соотношением цена/качество',
          price: 49990,
          image: 'https://via.placeholder.com/300',
          category: 1,
          subcategory: 101,
          brand: 3,
          rating: 4
        },
        {
          id: 4,
          name: 'Huawei P40 Pro',
          description: 'Смартфон с инновационной камерой и быстрой зарядкой',
          price: 69990,
          oldPrice: 79990,
          discount: 12,
          image: 'https://via.placeholder.com/300',
          category: 1,
          subcategory: 101,
          brand: 4,
          rating: 5
        },
        {
          id: 5,
          name: 'Apple MacBook Pro',
          description: 'Мощный ноутбук для профессионалов',
          price: 149990,
          oldPrice: 159990,
          discount: 6,
          image: 'https://via.placeholder.com/300',
          category: 1,
          subcategory: 102,
          brand: 1,
          rating: 5
        },
        {
          id: 6,
          name: 'Samsung Galaxy Tab S7',
          description: 'Планшет с отличным дисплеем и стилусом',
          price: 49990,
          image: 'https://via.placeholder.com/300',
          category: 1,
          subcategory: 103,
          brand: 2,
          rating: 4
        }
      ]
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(query) {
        if (query.category) {
          this.selectedCategories = [parseInt(query.category)]
        }
        if (query.subcategory) {
          // Здесь можно добавить логику для подкатегорий
        }
      }
    }
  },
  computed: {
    filteredProducts() {
      let result = [...this.products]

      // Фильтрация по категориям
      if (this.selectedCategories.length > 0) {
        result = result.filter(product => 
          this.selectedCategories.includes(product.category)
        )
      }

      // Фильтрация по подкатегориям
      if (this.$route.query.subcategory) {
        const subcategoryId = parseInt(this.$route.query.subcategory)
        result = result.filter(product => 
          product.subcategory === subcategoryId
        )
      }

      // Фильтрация по брендам
      if (this.selectedBrands.length > 0) {
        result = result.filter(product => 
          this.selectedBrands.includes(product.brand)
        )
      }

      // Фильтрация по цене
      if (this.priceRange.min) {
        result = result.filter(product => 
          product.price >= this.priceRange.min
        )
      }
      if (this.priceRange.max) {
        result = result.filter(product => 
          product.price <= this.priceRange.max
        )
      }

      // Фильтрация по рейтингу
      if (this.selectedRating) {
        result = result.filter(product => 
          product.rating >= this.selectedRating
        )
      }

      // Сортировка
      switch (this.sortBy) {
        case 'price_asc':
          result.sort((a, b) => a.price - b.price)
          break
        case 'price_desc':
          result.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          result.sort((a, b) => b.rating - a.rating)
          break
        // По умолчанию сортировка по популярности
      }

      return result
    }
  },
  methods: {
    resetFilters() {
      this.selectedCategories = []
      this.selectedBrands = []
      this.selectedRating = null
      this.priceRange = {
        min: null,
        max: null
      }
      this.sortBy = 'popular'
      
      // Сброс URL параметров
      this.$router.replace({ query: {} })
    },
    handleAddToCart(product) {
      // TODO: Добавить логику добавления в корзину
      console.log('Добавлено в корзину:', product)
    }
  }
}
</script> 