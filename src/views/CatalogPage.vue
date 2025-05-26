<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Каталог товаров</h1>
      <ProductCatalog />
    </div>
  </div>
</template>

<script>
import ProductCatalog from '../components/ProductCatalog.vue'

export default {
  name: 'CatalogPage',
  components: {
    ProductCatalog
  }
}
</script> 