<template>
  <div>
    <div v-for="category in categories" :key="category.id" class="relative group/sub">
      <router-link
        :to="{ name: 'catalog', params: { categorySlug: category.slug } }"
        class="flex items-center justify-between px-4 py-1.5 hover:bg-gray-100 transition-colors"
        @click="handleClick"
      >
        <span class="text-gray-800">{{ category.name }}</span>
        <svg v-if="category.children" class="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </router-link>
      <div 
        v-if="category.children" 
        class="absolute left-full top-0 w-64 bg-white rounded-lg shadow-xl ml-2 border border-gray-100 hidden group-hover/sub:block submenu"
      >
        <div class="py-1">
          <CategoryList 
            :categories="category.children" 
            @close="$emit('close')"
            @select="$emit('select')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  props: {
    categories: Array
  },
  methods: {
    handleClick() {
      this.$emit('select')
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.group\/sub:hover .group-hover\/sub\:block {
  display: block;
}

.submenu {
  min-height: 100%;
  padding: 0.25rem 0;
}

.submenu::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 0;
  width: 10px;
  height: 100%;
  background: transparent;
}

.group\/sub:hover .submenu {
  display: block;
}
</style> 