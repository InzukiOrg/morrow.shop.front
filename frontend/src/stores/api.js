import { defineStore } from 'pinia'
import axios from 'axios'

export const useApiStore = defineStore('api', {
  state: () => ({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    loading: false,
    error: null
  }),

  actions: {
    async request({ method = 'GET', url, data = null, params = null }) {
      this.loading = true
      this.error = null

      try {
        const response = await axios({
          method,
          url: `${this.baseURL}${url}`,
          data,
          params
        })
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 