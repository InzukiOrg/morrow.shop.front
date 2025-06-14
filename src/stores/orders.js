import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [
      {
        id: '12345',
        date: '2024-03-15',
        status: 'processing',
        items: [
          {
            id: 1,
            name: 'Смартфон iPhone 13',
            image: 'https://via.placeholder.com/150',
            quantity: 1,
            price: 79990
          },
          {
            id: 2,
            name: 'Чехол для iPhone 13',
            image: 'https://via.placeholder.com/150',
            quantity: 2,
            price: 1990
          }
        ],
        deliveryMethod: 'Курьерская доставка',
        address: 'г. Москва, ул. Ленина, 1, кв. 5',
        subtotal: 83970,
        deliveryCost: 300,
        total: 84270
      },
      {
        id: '12344',
        date: '2024-03-10',
        status: 'shipped',
        items: [
          {
            id: 3,
            name: 'Ноутбук MacBook Pro',
            image: 'https://via.placeholder.com/150',
            quantity: 1,
            price: 149990
          }
        ],
        deliveryMethod: 'Пункт выдачи',
        address: 'г. Москва, ул. Пушкина, 10',
        subtotal: 149990,
        deliveryCost: 200,
        total: 150190
      },
      {
        id: '12343',
        date: '2024-03-05',
        status: 'delivered',
        items: [
          {
            id: 4,
            name: 'Наушники AirPods Pro',
            image: 'https://via.placeholder.com/150',
            quantity: 1,
            price: 24990
          }
        ],
        deliveryMethod: 'Почта России',
        address: 'г. Москва, ул. Гагарина, 15, кв. 3',
        subtotal: 24990,
        deliveryCost: 250,
        total: 25240
      }
    ]
  }),

  getters: {
    pendingOrdersCount: (state) => {
      return state.orders.filter(order => order.status === 'delivered').length
    }
  },

  actions: {
    initOrders() {
      // Здесь будет загрузка заказов с сервера
      console.log('Инициализация заказов')
    },

    updateOrderStatus(orderId, status) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.status = status
      }
    }
  }
}) 