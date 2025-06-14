<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto lg:px-4 lg:py-8 py-2 px-2">
      <h1 class="text-3xl font-bold">Каталог товаров</h1>
      <ProductCatalog />
    </div>
  </div>
</template>

<script>
import ProductCatalog from '@/components/catalog/ProductCatalog.vue'

export default {
  name: 'CatalogPage',
  components: {
    ProductCatalog
  }
}
</script> 