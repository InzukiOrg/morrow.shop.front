<template>
  <div>
    <!-- Мобильная версия с каруселью (до md экранов) -->
    <div class="block md:hidden">
      <div class="overflow-x-auto scrollbar-hide" ref="carousel">
        <div class="flex space-x-3 pb-4" style="width: max-content;">
          <div 
            v-for="(product, index) in products" 
            :key="product.id" 
            class="flex-shrink-0"
            :style="{ width: `${cardWidth}px` }"
          >
            <ProductCardMobile :product="product" />
          </div>
        </div>
      </div>
      <!-- Индикатор прокрутки для мобильных -->
      <div v-if="products.length > cardsPerView && showDots" class="flex justify-center mt-3 space-x-1">
        <div 
          v-for="(dot, index) in totalSlides" 
          :key="index"
          class="w-2 h-2 rounded-full transition-colors duration-200"
          :class="currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'"
        ></div>
      </div>
    </div>
    
    <!-- Десктопная версия (от md экранов) -->
    <div :class="desktopGridClasses">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import ProductCard from './ProductCard.vue'
import ProductCardMobile from './ProductCardMobile.vue'

export default {
  name: 'ProductCarousel',
  components: {
    ProductCard,
    ProductCardMobile
  },
  props: {
    products: {
      type: Array,
      required: true
    },
    showDots: {
      type: Boolean,
      default: true
    },
    desktopGridClasses: {
      type: String,
      default: 'hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'
    }
  },
  setup(props) {
    const carousel = ref(null)
    const currentSlide = ref(0)
    const cardWidth = ref(160)
    const cardsPerView = ref(2)

    // Вычисляем общее количество слайдов
    const totalSlides = computed(() => {
      return Math.ceil(props.products.length / cardsPerView.value)
    })

    const calculateCardWidth = () => {
      const screenWidth = window.innerWidth
      const padding = 32 // 16px с каждой стороны
      const gap = 12 // 3 * 4px (space-x-3)
      const availableWidth = screenWidth - padding
      
      if (screenWidth < 640) { // mobile
        cardsPerView.value = 2 // 2 карточки видны
        cardWidth.value = (availableWidth - gap * 1) / 2
      } else { // sm и больше
        cardsPerView.value = 3 // 3 карточки видны
        cardWidth.value = (availableWidth - gap * 2) / 3
      }
    }
    
    const handleScroll = (event) => {
      const scrollLeft = event.target.scrollLeft
      const cardWidthWithGap = cardWidth.value + 12 // 12px gap
      
      // Рассчитываем текущий слайд на основе прокрутки
      const slideIndex = Math.round(scrollLeft / (cardWidthWithGap * cardsPerView.value))
      currentSlide.value = Math.min(slideIndex, totalSlides.value - 1)
    }

    const setupCarousel = () => {
      nextTick(() => {
        if (carousel.value) {
          // Удаляем предыдущий слушатель если есть
          carousel.value.removeEventListener('scroll', handleScroll)
          // Добавляем новый
          carousel.value.addEventListener('scroll', handleScroll)
        }
      })
    }

    onMounted(() => {
      calculateCardWidth()
      setupCarousel()
    })

    // Пересчитываем ширину при изменении списка товаров
    watch(() => props.products, () => {
      calculateCardWidth()
      setupCarousel()
    })

    // Слушаем изменение размера окна
    const handleResize = () => {
      calculateCardWidth()
      // Сбрасываем текущий слайд при изменении размера экрана
      currentSlide.value = 0
      if (carousel.value) {
        carousel.value.scrollLeft = 0
      }
    }
    
    window.addEventListener('resize', handleResize)

    return {
      carousel,
      currentSlide,
      cardWidth,
      cardsPerView,
      totalSlides
    }
  }
}
</script>

<style scoped>
/* Скрываем стандартный скроллбар */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}

/* Плавная прокрутка */
.overflow-x-auto {
  scroll-behavior: smooth;
}

/* Эффект снэпа для лучшего UX */
.overflow-x-auto {
  scroll-snap-type: x mandatory;
}

.overflow-x-auto > div > div {
  scroll-snap-align: start;
}
</style> 