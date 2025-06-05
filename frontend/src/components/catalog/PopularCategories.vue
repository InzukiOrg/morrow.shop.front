<template>
    <div v-if="popularCategories.length > 0" class="container mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold mb-4">Популярные категории</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="category in popularCategories" :key="category.id" class="bg-white rounded-lg shadow-md p-6">
                <a :href="`/catalog/${category.slug}`" class="block">
                    <h3 class="text-lg font-bold">{{ category.name }}</h3>
                    <p class="text-gray-600">{{ category.description }}</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { categories } from '@/data.js'
import { computed } from 'vue';

export default {
    name: 'PopularCategories',
    setup() {
        const popularCategories = computed(() => {
            return categories.filter(c => c.popular).slice(0, 3)
        })

        return {
            popularCategories
        }
    }
}
</script>