<template>
  <div class="dropdown" :class="{ 'dropdown-open': isOpen }" ref="dropdownMenu">
    <div tabindex="0" role="button" class="btn btn-sm lg:btn-md bg-blue-500 text-white hover:bg-blue-800" @click="toggleDropdown">
      <BuildingStorefrontIcon class="w-5 h-5" />
      <span class="lg:block hidden">Каталог</span>
    </div>
    <ul v-show="isOpen" tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-50 w-80 shadow-sm lg:mt-4 p-4">
      <li v-for="category in rootCategories" :key="category.id" class="mb-2">
        <details v-if="category.children && category.children.length">
          <summary class="font-bold text-black text-lg">
            <router-link :to="`/catalog/${category.slug}`" @click="closeAllDetails">
              <span>{{ category.name }}</span>
            </router-link>
          </summary>
          <ul>
            <li v-for="child in category.children" :key="child.id">
              <router-link :to="`/catalog/${child.slug}`" @click="closeAllDetails" class="text-base">
                <span>{{ child.name }}</span>
              </router-link>
            </li>
          </ul>
        </details>
        <router-link v-else :to="`/catalog/${category.slug}`" @click="closeAllDetails" class="font-bold text-black text-lg block">
          <span>{{ category.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { BuildingStorefrontIcon, Bars3Icon, XMarkIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { categories } from '@/data.js'

export default {
  name: 'CatalogMenu',
  components: {
    BuildingStorefrontIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronRightIcon
  },
  data() {
    return {
      isOpen: false,
      isMobileOpen: false,
      closeTimeout: null,
      isHovered: false,
      headerHeight: 0
    }
  },
  computed: {
    rootCategories() {
      return categories
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    closeAllDetails() {
      this.$nextTick(() => {
        const menu = this.$el.querySelector('.dropdown-content');
        if (menu) {
          const details = menu.querySelectorAll('details[open]');
          details.forEach(d => { d.open = false });
        }
        this.isOpen = false;
      });
    },
    handleClickOutside(e) {
      if (!this.$refs.dropdownMenu.contains(e.target)) {
        this.isOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped></style>
