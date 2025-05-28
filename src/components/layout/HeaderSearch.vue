<template>
  <div class="relative flex-1 max-w-2xl mx-4" ref="searchRoot">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск товаров и категорий..."
        class="w-full px-4 py-2 pl-10 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        @input="handleSearch"
        @focus="showSuggestions = true"
      />
      <div class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
    </div>

    <!-- Подсказки -->
    <div 
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
    >
      <div class="py-2">
        <div v-for="suggestion in suggestions" :key="suggestion.id" class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="selectSuggestion(suggestion)">
          <div class="flex items-center">
            <span class="text-gray-800">{{ suggestion.name }}</span>
            <span class="ml-2 text-sm text-gray-500">{{ suggestion.type === 'category' ? 'Категория' : 'Товар' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { categories, products } from '@/data.js'

// Рекурсивно собираем все категории в плоский массив
function flattenCategories(cats) {
  let result = []
  for (const cat of cats) {
    result.push(cat)
    if (cat.children && cat.children.length) {
      result = result.concat(flattenCategories(cat.children))
    }
  }
  return result
}

export default {
  name: 'HeaderSearch',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const suggestions = ref([])
    const showSuggestions = ref(false)
    const searchRoot = ref(null)

    // Получаем все категории (включая подкатегории)
    const allCategories = flattenCategories(categories)

    const searchItems = (query) => {
      if (!query) {
        suggestions.value = []
        return
      }

      const normalizedQuery = query.toLowerCase()
      
      // Поиск по всем категориям
      const categoryResults = allCategories.filter(category => 
        category.name.toLowerCase().includes(normalizedQuery)
      ).map(category => ({
        ...category,
        type: 'category'
      }))

      // Поиск по товарам
      const productResults = products.filter(product => 
        product.name.toLowerCase().includes(normalizedQuery)
      ).map(product => ({
        ...product,
        type: 'product'
      }))

      suggestions.value = [...categoryResults, ...productResults].slice(0, 5)
    }

    const handleSearch = () => {
      searchItems(searchQuery.value)
    }

    const selectSuggestion = (suggestion) => {
      if (suggestion.type === 'category') {
        router.push({ 
          name: 'catalog', 
          params: { categorySlug: suggestion.slug }
        })
      } else {
        router.push({ 
          name: 'product', 
          params: { id: suggestion.id }
        })
      }
      searchQuery.value = ''
      showSuggestions.value = false
    }

    // Закрытие подсказок при клике вне компонента
    const handleClickOutside = (event) => {
      if (searchRoot.value && !searchRoot.value.contains(event.target)) {
        showSuggestions.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    watch(() => searchQuery.value, (newValue) => {
      if (!newValue) {
        showSuggestions.value = false
      }
    })

    return {
      searchQuery,
      suggestions,
      showSuggestions,
      handleSearch,
      selectSuggestion,
      searchRoot
    }
  }
}
</script> 