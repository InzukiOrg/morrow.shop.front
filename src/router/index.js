import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CatalogPage from '../views/CatalogPage.vue'
import ProductPage from '../views/ProductPage.vue'
import CartPage from '../views/CartPage.vue'
import ProfilePage from '../components/profile/ProfilePage.vue'

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
    component: () => import('@/views/Checkout.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage
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