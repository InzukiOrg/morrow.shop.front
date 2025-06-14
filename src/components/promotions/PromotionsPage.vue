<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Мобильная версия -->
    <div class="lg:hidden">
      <h1 class="text-2xl font-bold mb-6">Акции и спецпредложения</h1>
      
      <!-- Фильтры -->
      <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          class="btn btn-sm"
          :class="activeFilter === filter.id ? 'btn-primary' : 'btn-ghost'"
          @click="activeFilter = filter.id"
        >
          {{ filter.name }}
        </button>
      </div>

      <!-- Список акций -->
      <div class="space-y-4">
        <div v-for="promo in filteredPromotions" :key="promo.id" class="card bg-base-100 shadow-xl">
          <figure class="relative">
            <img :src="promo.image" :alt="promo.title" class="w-full h-48 object-cover" />
            <div class="absolute top-4 left-4 badge badge-primary">{{ promo.discount }}%</div>
          </figure>
          <div class="card-body p-4">
            <h2 class="card-title text-lg">{{ promo.title }}</h2>
            <p class="text-sm text-gray-600">{{ promo.description }}</p>
            <div class="card-actions justify-between items-center mt-4">
              <div class="text-sm text-gray-500">
                До {{ formatDate(promo.endDate) }}
              </div>
              <button class="btn btn-primary btn-sm">Подробнее</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Десктопная версия -->
    <div class="hidden lg:block">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Акции и спецпредложения</h1>
        <div class="flex gap-4">
          <button 
            v-for="filter in filters" 
            :key="filter.id"
            class="btn"
            :class="activeFilter === filter.id ? 'btn-primary' : 'btn-ghost'"
            @click="activeFilter = filter.id"
          >
            {{ filter.name }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div v-for="promo in filteredPromotions" :key="promo.id" class="card bg-base-100 shadow-xl">
          <figure class="relative">
            <img :src="promo.image" :alt="promo.title" class="w-full h-64 object-cover" />
            <div class="absolute top-6 left-6 badge badge-primary text-lg px-4 py-2">{{ promo.discount }}%</div>
          </figure>
          <div class="card-body p-6">
            <h2 class="card-title text-xl">{{ promo.title }}</h2>
            <p class="text-gray-600 mt-2">{{ promo.description }}</p>
            <div class="card-actions justify-between items-center mt-6">
              <div class="text-gray-500">
                До {{ formatDate(promo.endDate) }}
              </div>
              <button class="btn btn-primary">Подробнее</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromotionsPage',
  data() {
    return {
      activeFilter: 'all',
      filters: [
        { id: 'all', name: 'Все акции' },
        { id: 'discount', name: 'Скидки' },
        { id: 'gift', name: 'Подарки' },
        { id: 'new', name: 'Новинки' }
      ],
      promotions: [
        {
          id: 1,
          title: 'Скидка на смартфоны',
          description: 'Скидка 15% на все смартфоны при покупке от 2 штук',
          image: 'https://via.placeholder.com/800x400',
          discount: 15,
          endDate: '2024-04-15',
          type: 'discount'
        },
        {
          id: 2,
          title: 'Подарок к ноутбуку',
          description: 'При покупке ноутбука получите беспроводные наушники в подарок',
          image: 'https://via.placeholder.com/800x400',
          discount: 0,
          endDate: '2024-04-20',
          type: 'gift'
        },
        {
          id: 3,
          title: 'Новая коллекция',
          description: 'Предзаказ на новую коллекцию смарт-часов со скидкой 20%',
          image: 'https://via.placeholder.com/800x400',
          discount: 20,
          endDate: '2024-04-25',
          type: 'new'
        },
        {
          id: 4,
          title: 'Весенняя распродажа',
          description: 'Скидки до 30% на все товары из категории "Аксессуары"',
          image: 'https://via.placeholder.com/800x400',
          discount: 30,
          endDate: '2024-04-30',
          type: 'discount'
        }
      ]
    }
  },
  computed: {
    filteredPromotions() {
      if (this.activeFilter === 'all') {
        return this.promotions
      }
      return this.promotions.filter(promo => promo.type === this.activeFilter)
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long'
      })
    }
  }
}
</script> 