<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <PromoCarousel class="mb-8" />
      <PopularProducts />
      <h1 class="text-4xl font-bold text-center my-8">Добро пожаловать в Morrow Shop</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold mb-4">Широкий выбор товаров</h2>
          <p class="text-gray-600">У нас вы найдете все необходимое для вашего дома и семьи</p>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold mb-4">Быстрая доставка</h2>
          <p class="text-gray-600">Доставляем заказы в любую точку России</p>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold mb-4">Гарантия качества</h2>
          <p class="text-gray-600">Все товары проходят тщательную проверку</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PromoCarousel from '@/components/ui/PromoCarousel.vue'
import PopularProducts from '@/components/catalog/PopularProducts.vue'

export default {
  name: 'HomePage',
  components: {
    PromoCarousel,
    PopularProducts
  }
}
</script> 