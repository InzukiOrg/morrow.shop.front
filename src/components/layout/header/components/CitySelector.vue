<template>
  <div class="dropdown dropdown-start">
    <label tabindex="0" class="btn btn-ghost normal-case flex items-center gap-2 px-2 py-1 lg:px-4 lg:py-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      <span class="truncate max-w-[100px]">{{ selectedCity }}</span>
      <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </label>
    <div tabindex="0" class="dropdown-content z-[60] w-80 bg-base-100 rounded-box shadow lg:mt-4" v-show="isOpen">
      <div class="p-3 border-b">
        <div class="relative">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Поиск города..."
            class="input input-bordered input-sm w-full text-sm px-2 py-1"
          >
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>
      <ul class="menu max-h-64 overflow-y-auto">
        <template v-if="!searchQuery">
          <li class="menu-title px-3 pt-2 pb-0"><span>Популярные города</span></li>
          <li v-for="city in popularCities" :key="city">
            <button class="w-full text-left" @click="selectCity(city)">{{ city }}</button>
          </li>
        </template>
        <hr class="mt-2">  
        <li class="menu-title px-3 pt-2 pb-0"><span>Все города</span></li>
        <li v-for="city in filteredCities" :key="city">
          <button class="w-full text-left" @click="selectCity(city)">{{ city }}</button>
        </li>
      </ul>
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
    selectCity(city) {
      this.selectedCity = city
      this.isOpen = false
      this.searchQuery = ''
      localStorage.setItem('selectedCity', city)
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
      }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen
    }
  },
  mounted() {
    // Восстанавливаем город из localStorage
    const savedCity = localStorage.getItem('selectedCity')
    if (savedCity) {
      this.selectedCity = savedCity
    }
    document.addEventListener('click', this.handleClickOutside)
    // Открытие по клику на label
    this.$el.querySelector('label').addEventListener('click', this.toggleDropdown)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
    this.$el.querySelector('label').removeEventListener('click', this.toggleDropdown)
  }
}
</script> 