import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CatalogPage from '../views/CatalogPage.vue'
import ProductPage from '../views/ProductPage.vue'
import CartPage from '../views/CartPage.vue'
import Checkout from '../views/Checkout.vue'
import ProfilePage from '../components/profile/ProfilePage.vue'
import FavoritesPage from '../components/profile/FavoritesPage.vue'
import DeliveryPage from '../components/checkout/DeliveryPage.vue'
import OrdersPage from '../components/orders/OrdersPage.vue'
import PromotionsPage from '../components/promotions/PromotionsPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/catalog/:categorySlug?',
    name: 'catalog',
    component: CatalogPage
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: DeliveryPage
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage
  },
  {
    path: '/promotions',
    name: 'promotions',
    component: PromotionsPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router 