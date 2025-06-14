<template>
    <div class="bg-white lg:rounded-lg lg:shadow-md lg:p-4 lg:mt-4">
        <h2 class="lg:block hidden text-lg font-semibold mb-4">Фильтры</h2>
        <div v-for="filter in activeFilters" :key="filter.field" class="mb-6">
            <!-- Range фильтр -->
            <template v-if="filter.type === 'range'">
                <h3 class="font-medium mb-2">{{ filter.label }}</h3>
                <div class="flex items-center space-x-2">
                    <input type="number" v-model="filters[filter.field].min" :placeholder="filter.min"
                        class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500">
                    <span>-</span>
                    <input type="number" v-model="filters[filter.field].max" :placeholder="filter.max"
                        class="w-full px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500">
                </div>
            </template>

            <!-- Rating фильтр -->
            <template v-else-if="filter.type === 'rating'">
                <h3 class="font-medium mb-2">{{ filter.label }}</h3>
                <div class="flex items-center space-x-1">
                    <span v-for="star in 5" :key="star" class="cursor-pointer" @click="filters[filter.field] = star">
                        <svg :class="star <= filters[filter.field] ? 'text-yellow-400' : 'text-gray-300'"
                            class="w-6 h-6 inline" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </span>
                    <span v-if="filters[filter.field]" class="ml-2 text-sm text-gray-600">и выше</span>
                    <span v-if="filters[filter.field]" @click="filters[filter.field] = null"
                        class="ml-2 cursor-pointer text-gray-400 hover:text-red-500">
                        <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
            </template>

            <!-- Checkbox фильтр -->
            <template v-else-if="filter.type === 'checkbox'">
                <h3 class="font-medium mb-2">{{ filter.label }}</h3>
                <div class="space-y-2">
                    <label v-for="option in filter.options" :key="option.id || option" class="flex items-center">
                        <input type="checkbox" :value="option.id || option" v-model="filters[filter.field]"
                            class="rounded text-blue-600 focus:ring-blue-500">
                        <span class="ml-2 text-gray-700">{{ option.name || option }}</span>
                    </label>
                </div>
            </template>

            <!-- Radio фильтр -->
            <template v-else-if="filter.type === 'radio'">
                <h3 class="font-medium mb-2">{{ filter.label }}</h3>
                <div class="space-y-2">
                    <label v-for="option in filter.options" :key="option.value" class="flex items-center">
                        <input type="radio" :value="option.value" v-model="filters[filter.field]"
                            class="text-blue-600 focus:ring-blue-500">
                        <span class="ml-2 text-gray-700">{{ option.label }}</span>
                    </label>
                </div>
            </template>

            <!-- Switch фильтр -->
            <template v-else-if="filter.type === 'switch'">
                <div class="flex items-center justify-between">
                    <h3 class="font-medium">{{ filter.label }}</h3>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="filters[filter.field]" class="sr-only peer">
                        <div
                            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                        </div>
                    </label>
                </div>
            </template>

            <!-- Select Search фильтр -->
            <template v-else-if="filter.type === 'select-search'">
                <h3 class="font-medium mb-2">{{ filter.label }}</h3>
                <Select :search=true v-model="filters[filter.field]" :options="filter.options"
                    :placeholder="'Выберите ' + filter.label.toLowerCase()" @change="handleSelectChange" />
            </template>
        </div>

        <!-- Кнопка сброса -->
        <button @click="resetFilters"
            class="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Сбросить фильтры
        </button>
    </div>
</template>

<script>
import { filterConfig } from '@/filterConfig.js'
import Select from '@/components/ui/Select.vue'

export default {
    name: 'CatalogFilters',
    components: {
        Select
    },
    data() {
        return {
            filters: {
                price: { min: null, max: null },
                rating: null,
                brand: '',
                size: [],
                color: [],
                gender: [],
                category: '',
                availability: '',
                discount: false
            }
        }
    },
    computed: {
        activeFilters() {
            return filterConfig.default || []
        }
    },
    methods: {
        resetFilters() {
            this.filters = {
                price: { min: null, max: null },
                rating: null,
                brand: '',
                size: [],
                color: [],
                gender: [],
                category: '',
                availability: '',
                discount: false
            }
        },
        handleSelectChange(option) {
            console.log('Selected option:', option)
        }
    }
}
</script>