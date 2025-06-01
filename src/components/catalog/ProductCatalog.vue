<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex gap-8">
      <!-- Фильтры -->
      <div class="w-64 flex-shrink-0">
        <CategoryMenu
          :categories="categoryTree"
          :value="selectedCategoryId"
          @change="onCategoryChange"
        />
        <div class="bg-white rounded-lg shadow-md p-4 mt-4">
          <h2 class="text-lg font-semibold mb-4">Фильтры</h2>
          <div v-for="filter in activeFilters" :key="filter.field" class="mb-6">
            <template v-if="filter.type === 'range' && filter.field === 'price'">
              <h3 class="font-medium mb-2">{{ filter.label }}</h3>
              <div class="flex items-center space-x-2">
                <input type="number" v-model="priceRange.min" placeholder="От"
                  class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500">
                <span>-</span>
                <input type="number" v-model="priceRange.max" placeholder="До"
                  class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500">
              </div>
            </template>
            <template v-else-if="filter.type === 'rating'">
              <h3 class="font-medium mb-2">{{ filter.label }}</h3>
              <div class="flex items-center space-x-1">
                <span v-for="star in 5" :key="star" class="cursor-pointer" @click="selectedRating = star">
                  <svg :class="star <= selectedRating ? 'text-yellow-400' : 'text-gray-300'" class="w-6 h-6 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                <span v-if="selectedRating" class="ml-2 text-sm text-gray-600">и выше</span>
                <span v-if="selectedRating" @click="selectedRating = null" class="ml-2 cursor-pointer text-gray-400 hover:text-red-500">
                  <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </div>
            </template>
            <template v-else-if="filter.type === 'checkbox' && filter.field === 'brand'">
              <h3 class="font-medium mb-2">{{ filter.label }}</h3>
              <div class="space-y-2">
                <label v-for="brand in brands" :key="brand.id" class="flex items-center">
                  <input type="checkbox" :value="brand.id" v-model="selectedBrands"
                    class="rounded text-blue-600 focus:ring-blue-500">
                  <span class="ml-2 text-gray-700">{{ brand.name }}</span>
                </label>
              </div>
            </template>
            <template v-else-if="filter.type === 'checkbox' && filter.field === 'size'">
              <h3 class="font-medium mb-2">{{ filter.label }}</h3>
              <div class="space-x-2">
                <label v-for="size in clothesSizes" :key="size" class="inline-flex items-center">
                  <input type="checkbox" :value="size" v-model="selectedSizes" class="rounded text-blue-600">
                  <span class="ml-2 text-gray-700">{{ size }}</span>
                </label>
              </div>
            </template>
            <template v-else-if="filter.type === 'checkbox' && filter.field === 'color'">
              <h3 class="font-medium mb-2">{{ filter.label }}</h3>
              <div class="space-x-2">
                <label v-for="color in clothesColors" :key="color" class="inline-flex items-center">
                  <input type="checkbox" :value="color" v-model="selectedColors" class="rounded text-blue-600">
                  <span class="ml-2 text-gray-700">{{ color }}</span>
                </label>
              </div>
            </template>
            <template v-else-if="filter.type === 'checkbox' && filter.field === 'gender'">
              <h3 class="font-medium mb-2">{{ filter.label }}</h3>
              <div class="space-x-2">
                <label v-for="gender in clothesGenders" :key="gender" class="inline-flex items-center">
                  <input type="checkbox" :value="gender" v-model="selectedGenders" class="rounded text-blue-600">
                  <span class="ml-2 text-gray-700">{{ gender }}</span>
                </label>
              </div>
            </template>
          </div>

          <!-- Кнопка сброса -->
          <button @click="resetFilters"
            class="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Сбросить фильтры
          </button>
        </div>
      </div>

      <!-- Список товаров -->
      <div class="flex-1">
        <!-- Сортировка -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center space-x-4">
            <select v-model="sortBy" class="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
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
        <!-- Мобильная версия (до md экранов) -->
        <div class="block md:hidden">
          <ProductGridMobile :products="filteredProducts" @add-to-cart="handleAddToCart" />
        </div>
        
        <!-- Десктопная версия (от md экранов) -->
        <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product"
            @add-to-cart="handleAddToCart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'
import ProductGridMobile from './ProductGridMobile.vue'
import CategoryMenu from './CategoryMenu.vue'
import { categories, brandsByCategory, products } from '../../data.js'
import { filterConfig } from '../../filterConfig.js'

export default {
  name: 'ProductCatalog',
  components: {
    ProductCard,
    ProductGridMobile,
    CategoryMenu
  },
  data() {
    return {
      selectedCategoryId: null,
      categoryTree: categories,
      products: products,
      selectedBrands: [],
      selectedRating: null,
      priceRange: { min: null, max: null },
      sortBy: 'popular',
      searchQuery: '',
      // Для одежды
      selectedSizes: [],
      selectedColors: [],
      selectedGenders: []
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(query) {
        this.searchQuery = query?.q
        if (query.category) {
          this.selectedCategoryId = parseInt(query.category)
        }
      }
    },
    '$route.params.categorySlug': {
      immediate: true,
      handler(slug) {
        if (!slug) {
          this.selectedCategoryId = null
        } else {
          // Поиск id по slug
          const findBySlug = (cats, slug) => {
            for (const c of cats) {
              if (c.slug === slug) return c.id
              if (c.children) {
                const res = findBySlug(c.children, slug)
                if (res) return res
              }
            }
            return null
          }
          this.selectedCategoryId = findBySlug(this.categoryTree, slug)
        }
      }
    },
    selectedCategoryId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.resetFilters()
      }
    }
  },
  computed: {
    isElectronics() {
      // Проверяем, принадлежит ли выбранная категория к дереву "Электроника"
      const findInTree = (cats, id) => {
        for (const c of cats) {
          if (c.id === id) return true
          if (c.children && findInTree(c.children, id)) return true
        }
        return false
      }
      return findInTree(this.categoryTree.filter(c => c.slug === 'elektronika'), this.selectedCategoryId)
    },
    isClothes() {
      // Проверяем, принадлежит ли выбранная категория к дереву "Одежда"
      const findInTree = (cats, id) => {
        for (const c of cats) {
          if (c.id === id) return true
          if (c.children && findInTree(c.children, id)) return true
        }
        return false
      }
      return findInTree(this.categoryTree.filter(c => c.slug === 'odezhda'), this.selectedCategoryId)
    },
    clothesSizes() {
      // Собираем все уникальные размеры из товаров одежды
      const sizes = new Set()
      this.products.filter(p => p.category === 10).forEach(p => {
        if (Array.isArray(p.size)) p.size.forEach(s => sizes.add(s))
      })
      return Array.from(sizes)
    },
    clothesColors() {
      const colors = new Set()
      this.products.filter(p => p.category === 10).forEach(p => {
        if (p.color) colors.add(p.color)
      })
      return Array.from(colors)
    },
    clothesGenders() {
      const genders = new Set()
      this.products.filter(p => p.category === 10).forEach(p => {
        if (p.gender) genders.add(p.gender)
      })
      return Array.from(genders)
    },
    currentCategorySlug() {
      // Находим slug выбранной категории
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
      return findSlug(this.categoryTree, this.selectedCategoryId)
    },
    brands() {
      // Сначала ищем бренды по текущему slug
      if (this.currentCategorySlug && brandsByCategory[this.currentCategorySlug]) {
        return brandsByCategory[this.currentCategorySlug]
      }
      // Если нет — ищем по родительскому slug
      const findParentSlug = (cats, id) => {
        for (const c of cats) {
          if (c.id === id) return null // у корня нет родителя
          if (c.children) {
            for (const child of c.children) {
              if (child.id === id) return c.slug
              const res = findParentSlug(c.children, id)
              if (res) return res
            }
          }
        }
        return null
      }
      const parentSlug = findParentSlug(this.categoryTree, this.selectedCategoryId)
      if (parentSlug && brandsByCategory[parentSlug]) {
        return brandsByCategory[parentSlug]
      }
      return []
    },
    activeFilters() {
      // Определяем slug текущей категории
      const slug = this.currentCategorySlug
      // Берём фильтры для категории или default
      return [
        ...(filterConfig.default || []),
        ...((slug && filterConfig[slug]) || [])
      ]
    },
    filteredProducts() {
      let result = [...this.products]

      // Поиск по названию и описанию
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        result = result.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        )
      }

      // Фильтрация по категориям
      if (this.selectedCategoryId) {
        const getAllCategoryIds = (cats, id) => {
          for (const c of cats) {
            if (c.id === id) {
              let ids = [c.id]
              if (c.children) {
                ids = ids.concat(c.children.flatMap(child => getAllCategoryIds([child], child.id)))
              }
              return ids
            }
            if (c.children) {
              const res = getAllCategoryIds(c.children, id)
              if (res.length) return res
            }
          }
          return []
        }
        const ids = getAllCategoryIds(this.categoryTree, this.selectedCategoryId)
        result = result.filter(product => ids.includes(product.category))
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

      // Фильтры для одежды
      if (this.isClothes) {
        if (this.selectedSizes.length > 0) {
          result = result.filter(product =>
            Array.isArray(product.size) && product.size.some(s => this.selectedSizes.includes(s))
          )
        }
        if (this.selectedColors.length > 0) {
          result = result.filter(product =>
            this.selectedColors.includes(product.color)
          )
        }
        if (this.selectedGenders.length > 0) {
          result = result.filter(product =>
            this.selectedGenders.includes(product.gender)
          )
        }
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
    },
    onCategoryChange(id) {
      // Поиск slug по id
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
      const slug = findSlug(this.categoryTree, id)
      console.log(slug)
      this.$router.push({ name: 'catalog', params: { categorySlug: slug } })
    }
  }
}
</script>