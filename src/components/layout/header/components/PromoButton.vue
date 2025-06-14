<template>
    <router-link to="/promotions" class="flex flex-col items-center text-gray-600 hover:text-gray-800">
        <svg class="w-6 h-6" :class="activeClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
        <span class="text-xs mt-1 lg:block hidden" :class="activeClass">Акции</span>
    </router-link>
</template>
<script>
export default {
    name: 'PromoButton',
    computed: {
        activeClass() {
            return this.$route.path === '/promotions' ? 'text-blue-600' : ''
        }
    }
}
</script>