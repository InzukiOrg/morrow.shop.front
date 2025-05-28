<template>
  <div class="relative w-full h-[400px] overflow-hidden">
    <!-- Карусель -->
    <div 
      class="flex transition-transform duration-500 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        class="min-w-full h-full relative"
      >
        <img 
          :src="slide.image" 
          :alt="slide.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div class="text-center text-white p-6">
            <h2 class="text-4xl font-bold mb-4">{{ slide.title }}</h2>
            <p class="text-xl mb-6">{{ slide.description }}</p>
            <button class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg transition-colors duration-200">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Стрелки навигации -->
    <button 
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
    >
      <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>
    <button 
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
    >
      <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>

    <!-- Индикаторы -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      <button 
        v-for="(_, index) in slides" 
        :key="index"
        @click="currentSlide = index"
        class="w-3 h-3 rounded-full transition-all duration-200"
        :class="currentSlide === index ? 'bg-white scale-125' : 'bg-white bg-opacity-50'"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromoCarousel',
  data() {
    return {
      currentSlide: 0,
      slides: [
        {
          title: 'Скидка 50% на все товары',
          description: 'Только до конца месяца! Успейте приобрести товары со скидкой',
          image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
        },
        {
          title: 'Бесплатная доставка',
          description: 'При заказе от 5000 рублей доставка бесплатно',
          image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
        },
        {
          title: 'Новая коллекция',
          description: 'Самые трендовые товары сезона уже в продаже',
          image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
        }
      ]
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    }
  },
  mounted() {
    // Автоматическая смена слайдов каждые 5 секунд
    setInterval(this.nextSlide, 5000)
  }
}
</script>

<style scoped>
/* Дополнительные стили можно добавить здесь */
</style> 