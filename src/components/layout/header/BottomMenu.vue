<template>
    <div class="btm-nav z-50 h-12 border-t">
        <router-link to="/">
            <button @click="scrollToTop">
                <HomeIconSolid v-if="isActive('/')" class="h-5 w-5" />
                <HomeIconOutline v-else class="h-5 w-5" />
            </button>
        </router-link>
        <router-link to="/orders">
            <div class="indicator">
                <span v-if="pendingOrdersCount > 0" class="indicator-item badge badge-primary badge-sm">{{ pendingOrdersCount }}</span>
                <button @click="scrollToTop">
                    <TruckIconSolid v-if="isActive('/orders')" class="h-5 w-5" />
                    <TruckIconOutline v-else class="h-5 w-5" />
                </button>
            </div>
        </router-link>
        <router-link to="/promotions">
            <button @click="scrollToTop">
                <TagIconSolid v-if="isActive('/promotions')" class="h-5 w-5" />
                <TagIconOutline v-else class="h-5 w-5" />
            </button>
        </router-link>
        <router-link to="/cart">
            <div class="indicator">
                <span class="indicator-item badge badge-secondary badge-sm">{{ cartItemsCount }}</span>
                <button @click="scrollToTop">
                    <ShoppingCartIconSolid v-if="isActive('/cart')" class="h-5 w-5" />
                    <ShoppingCartIconOutline v-else class="h-5 w-5" />
                </button>
            </div>
        </router-link>
        <router-link to="/profile">
            <button @click="scrollToTop">
                <UserIconSolid v-if="isActive('/profile')" class="h-5 w-5" />
                <UserIconOutline v-else class="h-5 w-5" />
            </button>
        </router-link>
    </div>
</template>

<script>
import { 
    HomeIcon as HomeIconOutline,
    TruckIcon as TruckIconOutline,
    UserIcon as UserIconOutline,
    ShoppingCartIcon as ShoppingCartIconOutline,
    TagIcon as TagIconOutline
} from '@heroicons/vue/24/outline'

import { 
    HomeIcon as HomeIconSolid,
    TruckIcon as TruckIconSolid,
    UserIcon as UserIconSolid,
    ShoppingCartIcon as ShoppingCartIconSolid,
    TagIcon as TagIconSolid
} from '@heroicons/vue/24/solid'

import { useOrdersStore } from '@/stores/orders'

export default {
    name: 'BottomMenu',
    components: {
        HomeIconOutline,
        HomeIconSolid,
        TruckIconOutline,
        TruckIconSolid,
        UserIconOutline,
        UserIconSolid,
        ShoppingCartIconOutline,
        ShoppingCartIconSolid,
        TagIconOutline,
        TagIconSolid
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
        },
        isActive(route) {
            return this.$route.path === route
        }
    }
}
</script>