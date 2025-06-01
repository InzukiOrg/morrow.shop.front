<template>
  <div>
    <div v-for="subcategory in subcategories" :key="subcategory.id" class="border-b border-gray-100 last:border-b-0">
      <!-- Подкатегория -->
      <div class="flex items-center justify-between">
        <router-link
          :to="{ name: 'catalog', params: { categorySlug: subcategory.slug } }"
          class="flex-1 px-6 py-2.5 text-left text-gray-700 hover:bg-gray-100 transition-colors text-sm"
          @click="handleSubCategoryClick"
        >
          <span>{{ subcategory.name }}</span>
        </router-link>
        
        <!-- Кнопка раскрытия вложенных подкатегорий -->
        <button 
          v-if="subcategory.children && subcategory.children.length > 0"
          @click="toggleSubCategory(subcategory.id)"
          class="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
        >
          <ChevronDownIcon 
            class="w-4 h-4 transform transition-transform duration-200"
            :class="{ 'rotate-180': openSubCategories.includes(subcategory.id) }"
          />
        </button>
      </div>

      <!-- Вложенные подкатегории (аккордеон) -->
      <div 
        v-if="subcategory.children && subcategory.children.length > 0"
        class="overflow-hidden transition-all duration-300 ease-in-out"
        :class="openSubCategories.includes(subcategory.id) ? 'max-h-64' : 'max-h-0'"
      >
        <div class="bg-gray-100 border-t border-gray-200">
          <div v-for="nestedCategory in subcategory.children" :key="nestedCategory.id" class="border-b border-gray-200 last:border-b-0">
            <router-link
              :to="{ name: 'catalog', params: { categorySlug: nestedCategory.slug } }"
              class="block px-8 py-2 text-left text-gray-600 hover:bg-gray-200 transition-colors text-sm"
              @click="handleSubCategoryClick"
            >
              <span>{{ nestedCategory.name }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'MobileSubCategoryList',
  components: {
    ChevronDownIcon
  },
  props: {
    subcategories: {
      type: Array,
      required: true
    },
    parentId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      openSubCategories: []
    }
  },
  methods: {
    toggleSubCategory(subcategoryId) {
      const index = this.openSubCategories.indexOf(subcategoryId)
      if (index > -1) {
        this.openSubCategories.splice(index, 1)
      } else {
        this.openSubCategories.push(subcategoryId)
      }
    },
    handleSubCategoryClick() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
/* Плавная анимация для вложенного аккордеона */
.max-h-0 {
  max-height: 0;
}

.max-h-64 {
  max-height: 16rem;
}
</style> 