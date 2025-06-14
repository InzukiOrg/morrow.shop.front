<template>
  <header>
    <div class="navbar bg-base-100 px-8 lg:flex hidden">
      <div class="navbar-start space-x-4 lg:flex hidden">
        <router-link to="/" class="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          <span class="hidden lg:block">Morrow Shop</span>
          <span class="block lg:hidden">MS</span>
        </router-link>
        <CitySelector />

      </div>
      <div class="navbar-center lg:w-2/4 w-full lg:space-x-4">
        <CatalogMenu />
        <HeaderSearch />
      </div>
      <div class="navbar-end space-x-4 lg:flex hidden">
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
    <!-- Mobile -->
    <div class="lg:hidden bg-base-100 pb-2 rounded-b-lg">
      <div class="flex justify-between items-center w-full px-4">
        <CitySelector />
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            <span>Morrow Shop</span>
          </router-link>
        </div>

      </div>
      <div class="flex space-x-2 px-4 sticky top-0 z-50">
        <CatalogMenu />
        <HeaderSearch />
      </div>
      <BottomMenu :cartItemsCount=cartItemsCount />
    </div>
    <!-- Mobile -->
  </header>

</template>

<script>
import CitySelector from './components/CitySelector.vue'
import CatalogMenu from './components/CatalogMenu.vue'
import HeaderSearch from './components/HeaderSearch.vue'
import CartButton from './components/CartButton.vue'
import DeliveryButton from './components/DeliveryButton.vue'
import FavoriteButton from './components/FavoriteButton.vue'
import PromoButton from './components/PromoButton.vue'
import ProfileButton from './components/ProfileButton.vue'
import { useCartStore } from '@/stores/cart'
import { computed, onMounted } from 'vue'
import { BuildingStorefrontIcon } from '@heroicons/vue/24/outline'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import BottomMenu from './BottomMenu.vue'



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
    ProfileButton,
    BottomMenu
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