<template>
  <div>
    <ProductDetail 
      :product="product"
      @add-to-cart="addToCart"
      @toggle-favorite="toggleFavorite"
    />
  </div>
</template>

<script>
import ProductDetail from '../components/ProductDetail.vue'

export default {
  name: 'ProductPage',
  components: {
    ProductDetail
  },
  data() {
    return {
      product: {
        id: 1,
        name: 'Смартфон iPhone 13 Pro',
        description: 'Новейший смартфон с потрясающей камерой и мощным процессором. Процессор A15 Bionic обеспечивает невероятную производительность, а система камер Pro позволяет делать профессиональные фотографии и видео. Дисплей Super Retina XDR с технологией ProMotion обеспечивает плавную анимацию и отличную цветопередачу.',
        price: 89990,
        oldPrice: 99990,
        discount: 10,
        image: 'https://images.unsplash.com/photo-1632661674596-79e4adf1a2a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 1,
        subcategory: 101,
        brand: 1,
        rating: 5,
        specifications: {
          screen: '6.1" Super Retina XDR',
          processor: 'A15 Bionic',
          memory: '256 ГБ',
          camera: '12 Мп + 12 Мп + 12 Мп',
          battery: '3095 мАч',
          os: 'iOS 15'
        }
      }
    }
  },
  methods: {
    addToCart(product) {
      console.log('Добавлено в корзину:', product)
    },
    toggleFavorite(productId) {
      console.log('Изменено состояние избранного:', productId)
    }
  }
}
</script> 