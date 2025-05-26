<template>
  <div class="relative group">
    <button 
      @click="toggleCatalog"
      class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
      <span>Каталог</span>
    </button>

    <!-- Выпадающее меню -->
    <div 
      v-show="isOpen"
      class="absolute left-0 mt-4 w-64 bg-white rounded-lg shadow-xl z-50"
    >
      <div class="py-2">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="relative group/sub"
          @mouseenter="handleCategoryHover(category.id)"
          @mouseleave="handleCategoryLeave"
        >
          <!-- Основная категория -->
          <router-link 
            :to="{ 
              name: 'catalog',
              query: { 
                category: category.id,
                categoryName: category.name
              }
            }"
            class="flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition-colors"
            @click="closeCatalog"
          >
            <div class="flex items-center space-x-3">
              <!-- Иконка телефона -->
              <svg v-if="category.id === 1" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              <!-- Иконка футболки -->
              <svg v-if="category.id === 2" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <!-- Иконка дома -->
              <svg v-if="category.id === 3" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <!-- Иконка сердца -->
              <svg v-if="category.id === 4" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span class="text-gray-800">{{ category.name }}</span>
            </div>
            <svg 
              class="w-4 h-4 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>

          <!-- Подкатегории -->
          <div 
            v-show="activeCategory === category.id"
            class="absolute left-full top-0 w-64 bg-white rounded-lg shadow-xl ml-1"
          >
            <div class="py-2">
              <router-link 
                v-for="subcategory in category.subcategories"
                :key="subcategory.id"
                :to="{ 
                  name: 'catalog',
                  query: { 
                    category: category.id,
                    subcategory: subcategory.id,
                    categoryName: category.name,
                    subcategoryName: subcategory.name
                  }
                }"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                @click="closeCatalog"
              >
                {{ subcategory.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogMenu',
  data() {
    return {
      isOpen: false,
      activeCategory: null,
      closeTimeout: null,
      categories: [
        {
          id: 1,
          name: 'Электроника',
          subcategories: [
            { id: 101, name: 'Смартфоны' },
            { id: 102, name: 'Ноутбуки' },
            { id: 103, name: 'Планшеты' },
            { id: 104, name: 'Аксессуары' }
          ]
        },
        {
          id: 2,
          name: 'Одежда',
          subcategories: [
            { id: 201, name: 'Мужская одежда' },
            { id: 202, name: 'Женская одежда' },
            { id: 203, name: 'Детская одежда' },
            { id: 204, name: 'Обувь' }
          ]
        },
        {
          id: 3,
          name: 'Дом и сад',
          subcategories: [
            { id: 301, name: 'Мебель' },
            { id: 302, name: 'Декор' },
            { id: 303, name: 'Посуда' },
            { id: 304, name: 'Садовые инструменты' }
          ]
        },
        {
          id: 4,
          name: 'Красота и здоровье',
          subcategories: [
            { id: 401, name: 'Косметика' },
            { id: 402, name: 'Парфюмерия' },
            { id: 403, name: 'Уход за телом' },
            { id: 404, name: 'Здоровье' }
          ]
        }
      ]
    }
  },
  methods: {
    toggleCatalog() {
      this.isOpen = !this.isOpen
    },
    closeCatalog() {
      this.isOpen = false
      this.activeCategory = null
    },
    handleCategoryHover(categoryId) {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout)
      }
      this.activeCategory = categoryId
    },
    handleCategoryLeave() {
      this.closeTimeout = setTimeout(() => {
        this.activeCategory = null
      }, 300)
    }
  },
  mounted() {
    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.closeCatalog()
      }
    })
  },
  beforeDestroy() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout)
    }
  }
}
</script>
