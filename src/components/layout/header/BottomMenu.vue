<template>
    <div class="btm-nav z-50 h-10">
        <router-link to="/">
            <button @click="scrollToTop">
                <HomeIcon class="h-5 w-5" />
            </button>
        </router-link>
        <router-link to="/delivery">
            <button @click="scrollToTop">
                <TruckIcon class="h-5 w-5" />
            </button>
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

export default {
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
    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}
</script>