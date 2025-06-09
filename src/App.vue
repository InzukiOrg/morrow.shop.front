<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/header/Header.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>