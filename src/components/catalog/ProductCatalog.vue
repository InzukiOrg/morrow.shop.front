<template>
  <div class="container mx-auto lg:px-4 lg:py-8 py-2">
    <div class="flex gap-8">
      <div class="w-64 flex-shrink-0 lg:block hidden">
        <CategoryMenu :categories="categoryTree" :value="selectedCategoryId" @change="onCategoryChange" />
        <!-- Десктопные фильтры -->
        <CatalogFilters @apply="handleFilter" />
      </div>

      <!-- Список товаров -->
      <div>
        <!-- Мобильные фильтры -->
        <MobileFilters :categories="categoryTree" @sort="handleSort" @filter="handleFilter"
          @category="handleCategory" />
        <!-- Сортировка -->
        <div class="justify-between items-center mb-6 lg:flex hidden">
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
import CatalogFilters from './filters/CatalogFilters.vue'
import MobileFilters from './filters/MobileFilters.vue'

export default {
  name: 'ProductCatalog',
  components: {
    ProductCard,
    ProductGridMobile,
    CategoryMenu,
    CatalogFilters,
    MobileFilters
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
      selectedGenders: [],
      filters: {},
      sort: '',
      selectedSubCategoryId: null
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
    },
    handleFilter(filters) {
      this.filters = filters
      this.fetchProducts()
    },
    handleSort(sort) {
      this.sort = sort
      this.fetchProducts()
    },
    async fetchProducts() {
      // Здесь будет логика получения товаров с учетом фильтров и сортировки
      console.log('Fetching products with:', { filters: this.filters, sort: this.sort })
    },
    handleCategory({ categoryId, subCategoryId }) {
      this.selectedCategoryId = categoryId
      this.selectedSubCategoryId = subCategoryId
      this.fetchProducts()
    }
  }
}
</script>