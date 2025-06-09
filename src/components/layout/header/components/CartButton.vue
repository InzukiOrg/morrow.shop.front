<template>

    <router-link to="/cart">
        <div class="flex flex-col items-center">
            <div class="indicator">
                <span class="indicator-item badge badge-primary badge-sm" v-if="cartItemsCount > 0">{{ cartItemsCount
                    }}</span>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            </div>
            <span class="text-xs mt-1 lg:block hidden">Корзина</span>
        </div>
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