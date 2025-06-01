<template>
  <header class="bg-white shadow-md py-2">
    <div class="container px-4">
      <div class="flex items-center justify-between">
        <!-- Левая часть -->
        <div class="flex items-center space-x-4">
          <!-- <img src="/logo.png" alt="Morrow Shop" class="h-10"> -->
          <router-link to="/" class="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            <span class="hidden lg:block">Morrow Shop</span>
            <span class="block lg:hidden">MS</span>
          </router-link>
          <CitySelector />
          <CatalogMenu class="lg:block hidden" />
        </div>
        <HeaderSearch class="lg:block hidden" />

        <!-- Правая часть -->
        <div class="flex items-center lg:space-x-6 space-x-4">
          <!-- Акции -->
          <PromoButton />
          <!-- Избранное -->
          <FavoriteButton />
          <!-- Доставка -->
          <DeliveryButton />
          <!-- Корзина -->
          <CartButton :cartItemsCount=cartItemsCount />
          <!-- Профиль -->
          <ProfileButton />
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 lg:hidden">
      <div class="flex items-center justify-between ">
        <div class="flex items-center">
          <CatalogMenu />
        </div>
        <HeaderSearch />

      </div>
    </div>
  </header>
</template>

<script>
import CitySelector from '../layout/CitySelector.vue'
import CatalogMenu from './CatalogMenu.vue'
import HeaderSearch from './HeaderSearch.vue'
import { useCartStore } from '@/stores/cart'
import { computed, onMounted } from 'vue'
import { BuildingStorefrontIcon } from '@heroicons/vue/24/outline'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import CartButton from './HeaderButtons/CartButton.vue'
import DeliveryButton from './HeaderButtons/DeliveryButton.vue'
import FavoriteButton from './HeaderButtons/FavoriteButton.vue'
import PromoButton from './HeaderButtons/PromoButton.vue'
import ProfileButton from './HeaderButtons/ProfileButton.vue'


export default {
  name: 'Header',
  components: {
    CitySelector,
    CatalogMenu,
    HeaderSearch,
    BuildingStorefrontIcon,
    Bars3Icon,
    CartButton,
    DeliveryButton,
    FavoriteButton,
    PromoButton,
    ProfileButton
  },
  setup() {
    const cartStore = useCartStore()
    const cartItemsCount = computed(() => cartStore.itemCount)
    onMounted(() => {
      cartStore.initCart()
    })
    return {
      cartItemsCount
    }
  }
}
</script>