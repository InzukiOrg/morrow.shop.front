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
      class="absolute mt-4 w-64 bg-white rounded-lg shadow-xl z-50"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="py-2">
        <CategoryList 
          :categories="rootCategories" 
          @close="closeCatalog"
          @select="handleSelect"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { categories } from '@/data.js'
import CategoryList from './CategoryList.vue'

export default {
  name: 'CatalogMenu',
  components: { CategoryList },
  data() {
    return {
      isOpen: false,
      closeTimeout: null,
      isHovered: false
    }
  },
  computed: {
    rootCategories() {
      return categories
    }
  },
  methods: {
    toggleCatalog() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.isHovered = true
      }
    },
    closeCatalog() {
      this.isOpen = false
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout)
      }
    },
    handleSelect() {
      this.closeCatalog()
    },
    handleMouseEnter() {
      this.isHovered = true
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout)
      }
    },
    handleMouseLeave() {
      this.isHovered = false
      this.closeTimeout = setTimeout(() => {
        if (!this.isHovered) {
          this.isOpen = false
        }
      }, 100)
    }
  },
  mounted() {
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
    document.removeEventListener('click', this.closeCatalog)
  }
}
</script>

<style scoped>
.group:hover .group\/sub {
  display: block;
}
</style>
