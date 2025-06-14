<template>
    <div class="btm-nav z-50 h-12 border-t">
        <router-link to="/">
            <button @click="scrollToTop">
                <HomeIcon class="h-5 w-5" />
            </button>
        </router-link>
        <router-link to="/orders">
            <div class="indicator">
                <span v-if="pendingOrdersCount > 0" class="indicator-item badge badge-primary badge-sm">{{ pendingOrdersCount }}</span>
                <button @click="scrollToTop">
                    <TruckIcon class="h-5 w-5" />
                </button>
            </div>
        </router-link>
        <router-link to="/promo">
            <button @click="scrollToTop">
                <TagIcon class="h-5 w-5" />
            </button>
        </router-link>
        <router-link to="/cart">
            <div class="indicator">
                <span class="indicator-item badge badge-secondary">{{ cartItemsCount }}</span>
                <button @click="scrollToTop">
                    <ShoppingCartIcon class="h-5 w-5" />
                </button>
            </div>
        </router-link>
        <router-link to="/profile">
            <button @click="scrollToTop">
                <UserIcon class="h-5 w-5" />
            </button>
        </router-link>
    </div>
</template>
<script>
import { HomeIcon, TruckIcon, UserIcon, ShoppingCartIcon, TagIcon } from '@heroicons/vue/24/outline'
import { useOrdersStore } from '@/stores/orders'

export default {
    name: 'BottomMenu',
    components: {
        HomeIcon,
        TruckIcon,
        UserIcon,
        ShoppingCartIcon,
        TagIcon
    },
    props: {
        cartItemsCount: {
            type: Number,
            default: 0
        }
    },
    setup() {
        const ordersStore = useOrdersStore()
        return {
            ordersStore
        }
    },
    computed: {
        pendingOrdersCount() {
            return this.ordersStore.pendingOrdersCount
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}
</script>