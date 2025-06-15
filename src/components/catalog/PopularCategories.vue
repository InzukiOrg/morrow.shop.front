<template>
    <div v-if="categories.length > 0" class="container mx-auto">
        <h2 class="text-2xl font-bold mb-4">Категории</h2>
        <div class="overflow-x-auto">
            <div class="flex gap-4 ">

                <div v-for="category in categories" class="min-w-36 card bg-base-100 image-full lg:w-48 lg:h-36 h-24 shadow-xl">
                    <figure>
                        <img :src="getCategoryImage(category.slug)" class="w-full" />
                    </figure>
                    <div class="card-body p-2">
                        <div class="lg:text-xl absolute bottom-5 left-2">{{ category.name }} </div>
                        <div v-if="category.popular" class="absolute right-1 top-1 text-sm">
                            <span class="lg:block hidden">В тренде🔥</span>
                            <span class="lg:hidden block text-xl">🔥</span>
                        </div>
                    </div>
                </div>
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
        const sortedCategories = computed(() => {
            return [...categories]
                .sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
        })

        const getCategoryImage = (slug) => {
            const imageMap = {
                elektronika: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=150&h=150&fit=crop&auto=format',
                odezhda: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=150&h=150&fit=crop&auto=format',
                books: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=150&h=150&fit=crop&auto=format',
                sport: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=150&h=150&fit=crop&auto=format'
            }
            return imageMap[slug] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop&auto=format'
        }

        return {
            categories: sortedCategories,
            getCategoryImage
        }
    }
}
</script>

<style scoped>
.badge-fire {
    background: #f8984a;
}
</style>