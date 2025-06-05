<template>
    <router-link 
        to="/cart" 
        class="flex flex-col items-center text-gray-600 hover:text-gray-800 relative p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
    >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span class="text-xs mt-1 lg:block hidden">Корзина</span>
        <span 
            v-if="cartItemsCount > 0"
            class="absolute -top-0.5 -right-0.5 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium min-w-[20px]"
        >
            {{ cartItemsCount }}
        </span>
    </router-link>
</template>

<script>
export default {
    name: 'CartButton',
    props: {
        cartItemsCount: {
            type: Number,
            default: 0
        }
    }
}
</script>