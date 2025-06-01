<template>
  <div class="divide-y divide-gray-200">
    <div v-for="category in categories" :key="category.id" class="py-1">
      <!-- Основная категория -->
      <div class="flex items-center justify-between">
        <router-link
          :to="{ name: 'catalog', params: { categorySlug: category.slug } }"
          class="flex-1 px-4 py-3 text-left text-gray-800 hover:bg-gray-50 transition-colors"
          @click="handleCategoryClick"
        >
          <span class="font-medium">{{ category.name }}</span>
        </router-link>
        
        <!-- Кнопка раскрытия подкategorий -->
        <button 
          v-if="category.children && category.children.length > 0"
          @click="toggleCategory(category.id)"
          class="flex items-center justify-center w-12 h-12 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-r-lg transition-colors"
        >
          <ChevronDownIcon 
            class="w-5 h-5 transform transition-transform duration-200"
            :class="{ 'rotate-180': openCategories.includes(category.id) }"
          />
        </button>
      </div>

      <!-- Подкатегории (аккордеон) -->
      <div 
        v-if="category.children && category.children.length > 0"
        class="overflow-hidden transition-all duration-300 ease-in-out"
        :class="openCategories.includes(category.id) ? 'max-h-96' : 'max-h-0'"
      >
        <div class="bg-gray-50 border-t border-gray-200">
          <MobileSubCategoryList 
            :subcategories="category.children" 
            :parent-id="category.id"
            @close="$emit('close')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import MobileSubCategoryList from './MobileSubCategoryList.vue'

export default {
  name: 'MobileCategoryList',
  components: {
    ChevronDownIcon,
    MobileSubCategoryList
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      openCategories: []
    }
  },
  methods: {
    toggleCategory(categoryId) {
      const index = this.openCategories.indexOf(categoryId)
      if (index > -1) {
        this.openCategories.splice(index, 1)
      } else {
        this.openCategories.push(categoryId)
      }
    },
    handleCategoryClick() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
/* Плавная анимация для аккордеона */
.max-h-0 {
  max-height: 0;
}

.max-h-96 {
  max-height: 24rem;
}
</style> 