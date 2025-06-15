<template>
  <button class="btn btn-link text-gray-700 lg:px-4 p-0" @click="showModal()">
    <MapPinIcon class="w-5" />{{ selectedCity }}
  </button>
  <dialog id="cityselector" ref="citySelectorModal" class="modal">
    <div class="modal-box lg:w-96 w-full lg:min-h-96 min-h-screen lg:h-auto lg:rounded-2xl rounded-none">
      <div class="sticky top-0 right-0 bg-white">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-0 top-0" @click="closeModal()">✕</button>        
      </div>
      <h1 class="text-2xl font-bold mb-4">Выберите город</h1>
      <div>
        <label class="input input-bordered flex items-center gap-2">
          <MagnifyingGlassIcon class="w-5" />
          <input type="text" class="grow" placeholder="Ваш город" v-model="searchQuery" />
        </label>
        <div class="label">
          <button class="text-blue-700" @click="detectCity">
            Определить автоматически
            <span v-if="detectingCity" class="loading loading-ring loading-xs"></span>
          </button>
        </div>
        <p v-if="cantDetectCity" class="text-red-500">Ошибка определения местоположения</p>
        <ul v-if="filteredCities.length > 0" role="list">
          <li v-for="city in filteredCities" :key="city">
            <button class="p-1 btn-ghost rounded" @click="selectCity(city)">{{ city }}</button>
          </li>
        </ul>
        <div v-else class="text-gray-400">Такого города не найдено</div>
      </div>
    </div>
    <label class="modal-backdrop" for="cityselector">Close</label>
  </dialog>
</template>

<script>
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'CitySelector',
  components: {
    MapPinIcon,
    MagnifyingGlassIcon
  },
  data() {
    return {
      isOpen: false,
      searchQuery: '',
      selectedCity: 'Москва',
      cantDetectCity: false,
      detectingCity: false,
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
    showModal() {
      this.$refs.citySelectorModal.showModal()
    },
    closeModal() {
      this.$refs.citySelectorModal.close()
    },
    selectCity(city) {
      this.selectedCity = city
      this.cantDetectCity = false;
      this.searchQuery = ''
      localStorage.setItem('selectedCity', city)
      this.closeModal()
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false
      }
    },
    detectCity() {
      this.cantDetectCity = false;
      this.detectingCity = true;
      if (!navigator.geolocation) {
        this.cantDetectCity = true;
        return;
      }

      let isDetected = false;

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            this.allCities.forEach(city => {
              if (data.address.city && data.address.city.includes(city)) {
                this.selectCity(city);
                isDetected = true;
              }
            })
            if (isDetected === false) {
              this.cantDetectCity = true;
            }
          })
          .catch(() => {
            this.cantDetectCity = true;
          }).finally(() => {
            this.detectingCity = false;
          });
      });
    }
  },
  mounted() {
    const savedCity = localStorage.getItem('selectedCity')
    if (savedCity) {
      this.selectedCity = savedCity
    }
  },
}
</script>