<template>
  <div class="relative">
    <!-- Десктопная версия (от lg экранов) -->
    <div class="hidden lg:block relative group">
      <button @click="toggleCatalog"
        class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <BuildingStorefrontIcon class="w-5 h-5" />
        <span>Каталог</span>
      </button>

      <!-- Выпадающее меню для десктопа -->
      <div v-show="isOpen" class="absolute mt-4 w-64 bg-white rounded-lg shadow-xl z-50" @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
        <div class="py-2">
          <CategoryList :categories="rootCategories" @close="closeCatalog" @select="handleSelect" />
        </div>
      </div>
    </div>

    <!-- Мобильная версия (до lg экранов) -->
    <div class="lg:hidden relative">
      <button @click="toggleMobileCatalog"
        class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors touch-manipulation">
        <Transition name="icon-fade" mode="out-in">
          <XMarkIcon v-if="isMobileOpen" class="w-5 h-5" key="close" />
          <Bars3Icon v-else class="w-5 h-5" key="open" />
        </Transition>
        <span class="hidden sm:block">Каталог</span>
      </button>

      <!-- Мобильный дропдаун каталог -->
      <div v-show="isMobileOpen" class="fixed inset-x-0 bg-black bg-opacity-50 z-40" 
           :style="{ top: headerHeight + 'px', bottom: '0' }"
           @click="closeMobileCatalog">
        <div class="fixed inset-x-0 bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
          :style="{ top: headerHeight + 'px', bottom: '0' }"
          :class="{ 'translate-y-0': isMobileOpen, 'translate-y-full': !isMobileOpen }"
          @click.stop>
          
          <!-- Контент каталога -->
          <div class="overflow-y-auto h-full pb-4">
            <MobileCategoryList :categories="rootCategories" @close="closeMobileCatalog" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { categories } from '@/data.js'
import CategoryList from './CategoryList.vue'
import MobileCategoryList from './MobileCategoryList.vue'
import { BuildingStorefrontIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'CatalogMenu',
  components: { 
    CategoryList, 
    MobileCategoryList,
    BuildingStorefrontIcon, 
    Bars3Icon,
    XMarkIcon 
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
    // Десктопные методы
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
    },

    // Мобильные методы
    toggleMobileCatalog() {
      this.isMobileOpen = !this.isMobileOpen
      // Блокируем скролл body при открытом меню
      if (this.isMobileOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    closeMobileCatalog() {
      this.isMobileOpen = false
      document.body.style.overflow = ''
    },

    // Вычисление высоты хедера
    calculateHeaderHeight() {
      const header = document.querySelector('header')
      if (header) {
        this.headerHeight = header.offsetHeight
      } else {
        // Fallback значение если хедер не найден
        this.headerHeight = window.innerWidth < 1024 ? 120 : 80
      }
    }
  },
  mounted() {
    // Закрытие при клике вне элемента (только для десктопа)
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target) && window.innerWidth >= 1024) {
        this.closeCatalog()
      }
    })

    // Закрытие при нажатии ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeCatalog()
        this.closeMobileCatalog()
      }
    })

    // Получение высоты хедера
    this.$nextTick(() => {
      this.calculateHeaderHeight()
    })

    // Пересчет высоты при изменении размера окна
    window.addEventListener('resize', this.calculateHeaderHeight)
  },
  beforeDestroy() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout)
    }
    document.body.style.overflow = ''
    document.removeEventListener('click', this.closeCatalog)
    document.removeEventListener('keydown', this.closeMobileCatalog)
    window.removeEventListener('resize', this.calculateHeaderHeight)
  }
}
</script>

<style scoped>
.group:hover .group\/sub {
  display: block;
}

/* Анимация смены иконок */
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.icon-fade-enter-from {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}

.icon-fade-leave-to {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.icon-fade-enter-to,
.icon-fade-leave-from {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}
</style>
