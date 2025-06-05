import { defineStore } from 'pinia'
import { products } from '@/data.js'

export const useRecentlyViewedStore = defineStore('recentlyViewed', {
  state: () => ({
    ids: []
  }),
  getters: {
    items(state) {
      return state.ids.map(id => products.find(p => p.id === id)).filter(Boolean)
    }
  },
  actions: {
    init() {
      try {
        const saved = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
        this.ids = saved
      } catch {
        this.ids = []
      }
    },
    add(id) {
      this.ids = this.ids.filter(_id => _id !== id)
      this.ids.unshift(id)
      if (this.ids.length > 12) this.ids = this.ids.slice(0, 12)
      localStorage.setItem('recentlyViewed', JSON.stringify(this.ids))
    },
    clear() {
      this.ids = []
      localStorage.removeItem('recentlyViewed')
    }
  }
}) 