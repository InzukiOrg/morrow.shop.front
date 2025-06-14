<template>
    <router-link to="/favorites" class="flex flex-col items-center text-gray-600 hover:text-gray-800 relative">
        <div class="indicator">
            <span class="indicator-item badge badge-secondary badge-sm" v-if="favoriteItemsCount > 0">{{
                favoriteItemsCount }}</span>
            <svg class="w-6 h-6" :class="activeClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </div>
        <span class="text-xs mt-1 lg:block hidden" :class="activeClass">Избранное</span>
    </router-link>
</template>
<script>
export default {
    name: 'FavoriteButton',
    props: {
        favoriteItemsCount: {
            type: Number,
            default: 3
        }
    },
    computed: {
        activeClass() {
            return this.$route.path === '/favorites' ? 'text-blue-600' : ''
        }
    }
}
</script>