<template>
    <div class="lg:hidden pb-4">
        <!-- Верхняя полоса с фильтрами -->
        <div class="flex items-center justify-between">
            <button @click="openSort" class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
            </button>
            <button @click="openCategory" class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Категории</span>
            </button>
            <button @click="openFilters" class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Фильтры</span>
            </button>
        </div>

        <!-- Модальное окно категорий -->
        <div v-if="isCategoryOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2">
                    <h3 class="text-lg font-semibold">Категории</h3>
                    <button @click="closeCategory" class="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="space-y-2">
                    <div v-for="category in categories" :key="category.id" class="py-2">
                        <button @click="selectCategory(category)"
                            class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-between"
                            :class="{ 'bg-gray-100': selectedCategory === category.id }">
                            <span>{{ category.name }}</span>
                            <span v-if="category.children?.length" class="text-gray-500">
                                {{ category.children.length }}
                            </span>
                        </button>
                        <!-- Подкатегории -->
                        <div v-if="category.children?.length && selectedCategory === category.id"
                            class="pl-4 mt-2 space-y-1">
                            <button v-for="subCategory in category.children" :key="subCategory.id"
                                @click="selectSubCategory(subCategory)"
                                class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
                                :class="{ 'bg-gray-100': selectedSubCategory === subCategory.id }">
                                {{ subCategory.name }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Модальное окно сортировки -->
        <div v-if="isSortOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">Сортировка</h3>
                    <button @click="closeSort" class="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="space-y-2">
                    <label v-for="option in sortOptions" :key="option.value"
                        class="flex items-center p-2 rounded-lg hover:bg-gray-100">
                        <input type="radio" :value="option.value" v-model="selectedSort" class="radio radio-primary" />
                        <span class="ml-2">{{ option.label }}</span>
                    </label>
                </div>
                <button @click="applySort" class="btn btn-primary w-full mt-4">
                    Применить
                </button>
            </div>
        </div>

        <!-- Модальное окно фильтров -->
        <div v-if="isFiltersOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl px-4 max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2 z-50 border-b">
                    <h3 class="text-lg font-semibold">Фильтры</h3>
                    <button @click="closeFilters" class="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <CatalogFilters @apply="applyFilters" />
            </div>
        </div>
    </div>
</template>

<script>
import CatalogFilters from './CatalogFilters.vue'

export default {
    name: 'MobileFilters',
    components: {
        CatalogFilters
    },
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isCategoryOpen: false,
            isSortOpen: false,
            isFiltersOpen: false,
            selectedSort: '',
            selectedCategory: null,
            selectedSubCategory: null,
            sortOptions: [
                { value: 'popular', label: 'По популярности' },
                { value: 'price_asc', label: 'По возрастанию цены' },
                { value: 'price_desc', label: 'По убыванию цены' },
                { value: 'new', label: 'По новизне' },
                { value: 'rating', label: 'По рейтингу' }
            ]
        }
    },
    methods: {
        openCategory() {
            this.isCategoryOpen = true
        },
        closeCategory() {
            this.isCategoryOpen = false
        },
        openSort() {
            this.isSortOpen = true
        },
        closeSort() {
            this.isSortOpen = false
        },
        openFilters() {
            this.isFiltersOpen = true
        },
        closeFilters() {
            this.isFiltersOpen = false
        },
        selectCategory(category) {
            this.selectedCategory = category.id
            this.selectedSubCategory = null
        },
        selectSubCategory(subCategory) {
            this.selectedSubCategory = subCategory.id
            this.$emit('category', {
                categoryId: this.selectedCategory,
                subCategoryId: subCategory.id
            })
            this.closeCategory()
        },
        applySort() {
            this.$emit('sort', this.selectedSort)
            this.closeSort()
        },
        applyFilters(filters) {
            this.$emit('filter', filters)
            this.closeFilters()
        }
    }
}
</script>