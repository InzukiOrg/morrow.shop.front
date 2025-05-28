import { defineStore } from 'pinia'
import { products } from '@/data.js'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),

  getters: {
    itemCount: (state) => state.items.length,
    total: (state) => state.items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id)
      return sum + (product?.price || 0) * item.quantity
    }, 0),
    cartItems: (state) => state.items.map(item => {
      const product = products.find(p => p.id === item.id)
      return {
        ...item,
        ...product
      }
    })
  },

  actions: {
    initCart() {
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          this.items = JSON.parse(savedCart)
        }
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error)
        this.items = []
      }
    },

    addToCart(productId, quantity = 1) {
      const existingItem = this.items.find(item => item.id === productId)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ id: productId, quantity })
      }

      this.saveCart()
    },

    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.saveCart()
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        this.saveCart()
      }
    },

    clearCart() {
      this.items = []
      this.saveCart()
    },

    saveCart() {
      try {
        localStorage.setItem('cart', JSON.stringify(this.items))
      } catch (error) {
        console.error('Ошибка при сохранении корзины:', error)
      }
    }
  }
}) 