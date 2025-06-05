<template>
  <div class="relative">
    <button 
      @click="toggleDropdown"
      class="flex items-center space-x-2 lg:px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors flex-nowrap"
    >
      <svg class="w-5 h-5 min-w-[20px] min-h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      <span class="block flex-1 truncate">{{ selectedCity }}</span>
      <svg 
        class="w-4 h-4 min-w-[16px] min-h-[16px] transition-transform"
        :class="{ 'transform rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <!-- Выпадающее меню -->
    <div 
      v-show="isOpen"
      class="absolute z-50 mt-4 w-64 bg-white rounded-lg shadow-xl"
    >
      <!-- Поиск города -->
      <div class="p-3 border-b">
        <div class="relative">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Поиск города..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
          <svg 
            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Список городов -->
      <div class="max-h-64 overflow-y-auto">
        <div class="py-1">
          <!-- Популярные города -->
          <template v-if="!searchQuery">
            <div class="px-3 py-2">
              <h3 class="text-sm font-medium text-gray-500">Популярные города</h3>
            </div>
            <button
              v-for="city in popularCities"
              :key="city"
              @click="selectCity(city)"
              class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {{ city }}
            </button>
            <!-- Разделитель -->
            <div class="border-t my-2"></div>
          </template>

          <!-- Все города -->
          <div class="px-3 py-2">
            <h3 class="text-sm font-medium text-gray-500">Все города</h3>
          </div>
          <button
            v-for="city in filteredCities"
            :key="city"
            @click="selectCity(city)"
            class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {{ city }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CitySelector',
  data() {
    return {
      isOpen: false,
      searchQuery: '',
      selectedCity: 'Москва',
      popularCities: [
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Екатеринбург',
        'Казань',
        'Челябинск',
        'Пенза'
      ],
      allCities: [
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Екатеринбург',
        'Казань',
        'Нижний Новгород',
        'Челябинск',
        'Самара',
        'Омск',
        'Ростов-на-Дону',
        'Уфа',
        'Красноярск',
        'Воронеж',
        'Пермь',
        'Волгоград',
        'Пенза'
      ]
    }
  },
  computed: {
    filteredCities() {
      if (!this.searchQuery) return this.allCities
      const query = this.searchQuery.toLowerCase()
      return this.allCities.filter(city => 
        city.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectCity(city) {
      this.selectedCity = city
      this.isOpen = false
      this.searchQuery = ''
      localStorage.setItem('selectedCity', city)
    }
  },
  mounted() {
    // Восстанавливаем город из localStorage
    const savedCity = localStorage.getItem('selectedCity')
    if (savedCity) {
      this.selectedCity = savedCity
    }
    // Закрытие выпадающего меню при клике вне его
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
      }
    })
  }
}
</script> 