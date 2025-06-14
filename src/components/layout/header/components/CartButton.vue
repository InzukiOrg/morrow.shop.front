<template>
    <router-link to="/cart" class="flex flex-col items-center text-gray-600 hover:text-gray-800">
        <div class="indicator">
            <span class="indicator-item badge badge-primary badge-sm" v-if="cartItemsCount > 0">{{ cartItemsCount }}</span>
            <svg class="w-6 h-6" :class="activeClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        </div>
        <span class="text-xs mt-1 lg:block hidden" :class="activeClass">Корзина</span>
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
    },
    computed: {
        activeClass() {
            return this.$route.path === '/cart' ? 'text-blue-600' : ''
        }
    }
}
</script>