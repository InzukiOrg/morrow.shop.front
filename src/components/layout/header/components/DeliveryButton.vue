<template>
    <router-link to="/orders" class="flex flex-col items-center text-gray-600 hover:text-gray-800">
        <svg class="w-6 h-6" :class="activeClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <span class="text-xs mt-1 lg:block hidden" :class="activeClass">Доставка</span>
    </router-link>
</template>

<script>
export default {
    name: 'DeliveryButton',
    computed: {
        activeClass() {
            return this.$route.path === '/orders' ? 'text-blue-600' : ''
        }
    }
}
</script>