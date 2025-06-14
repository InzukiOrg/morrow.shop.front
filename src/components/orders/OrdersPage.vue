<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Мобильная версия -->
    <div class="lg:hidden">
      <!-- Заголовок -->
      <div class="mb-6">
        <h1 class="text-xl font-bold mb-2">Мои заказы</h1>
        <p class="text-sm text-gray-600">Отслеживайте статус ваших заказов</p>
      </div>

      <!-- Фильтры -->
      <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button 
          v-for="status in orderStatuses" 
          :key="status.value"
          @click="activeStatus = status.value"
          :class="[
            'btn btn-sm whitespace-nowrap',
            activeStatus === status.value ? 'btn-primary' : 'btn-ghost'
          ]"
        >
          {{ status.label }}
        </button>
      </div>

      <!-- Список заказов -->
      <div class="space-y-4">
        <div v-for="order in filteredOrders" :key="order.id" class="card bg-white shadow-sm">
          <div class="card-body p-4">
            <!-- Заголовок заказа -->
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-medium">Заказ #{{ order.id }}</h3>
                <p class="text-sm text-gray-500 mt-1">{{ formatDate(order.date) }}</p>
              </div>
              <div :class="['badge', getStatusBadgeClass(order.status)]">
                {{ getStatusLabel(order.status) }}
              </div>
            </div>

            <!-- Прогресс доставки -->
            <div class="mb-4">
              <div class="flex justify-between text-xs text-gray-500 mb-2">
                <span>Создан</span>
                <span>В пути</span>
                <span>Доставлен</span>
              </div>
              <progress 
                class="progress progress-primary w-full" 
                :value="getProgressValue(order.status)" 
                max="100"
              ></progress>
            </div>

            <!-- Товары -->
            <div class="space-y-3 mb-4">
              <div v-for="item in order.items" :key="item.id" class="flex gap-3">
                <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-grow">
                  <h4 class="text-sm font-medium">{{ item.name }}</h4>
                  <p class="text-xs text-gray-500 mt-1">{{ item.quantity }} шт. × {{ formatPrice(item.price) }} ₽</p>
                </div>
              </div>
            </div>

            <!-- Информация о доставке -->
            <div class="border-t pt-3">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-500">Способ доставки:</span>
                <span>{{ order.deliveryMethod }}</span>
              </div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-500">Адрес:</span>
                <span>{{ order.address }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Сумма заказа:</span>
                <span class="font-medium">{{ formatPrice(order.total) }} ₽</span>
              </div>
            </div>

            <!-- Кнопки действий -->
            <div class="flex gap-2 mt-4">
              <button class="btn btn-sm btn-outline flex-1">Повторить заказ</button>
              <button class="btn btn-sm btn-primary flex-1">Подробнее</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Десктопная версия -->
    <div class="hidden lg:block">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Мои заказы</h1>

        <!-- Фильтры -->
        <div class="flex gap-3 mb-8">
          <button 
            v-for="status in orderStatuses" 
            :key="status.value"
            @click="activeStatus = status.value"
            :class="[
              'btn',
              activeStatus === status.value ? 'btn-primary' : 'btn-ghost'
            ]"
          >
            {{ status.label }}
          </button>
        </div>

        <!-- Список заказов -->
        <div class="space-y-6">
          <div v-for="order in filteredOrders" :key="order.id" class="card bg-white shadow-sm">
            <div class="card-body">
              <!-- Заголовок заказа -->
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h3 class="text-lg font-medium">Заказ #{{ order.id }}</h3>
                  <p class="text-gray-500 mt-1">{{ formatDate(order.date) }}</p>
                </div>
                <div :class="['badge badge-lg', getStatusBadgeClass(order.status)]">
                  {{ getStatusLabel(order.status) }}
                </div>
              </div>

              <!-- Прогресс доставки -->
              <div class="mb-6">
                <div class="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Создан</span>
                  <span>В пути</span>
                  <span>Доставлен</span>
                </div>
                <progress 
                  class="progress progress-primary w-full" 
                  :value="getProgressValue(order.status)" 
                  max="100"
                ></progress>
              </div>

              <!-- Товары -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div v-for="item in order.items" :key="item.id" class="flex gap-4">
                  <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-lg">
                  <div class="flex-grow">
                    <h4 class="font-medium">{{ item.name }}</h4>
                    <p class="text-gray-500 mt-1">{{ item.quantity }} шт. × {{ formatPrice(item.price) }} ₽</p>
                  </div>
                </div>
              </div>

              <!-- Информация о доставке -->
              <div class="grid grid-cols-2 gap-6 border-t pt-6">
                <div>
                  <h4 class="font-medium mb-3">Информация о доставке</h4>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-gray-500">Способ доставки:</span>
                      <span>{{ order.deliveryMethod }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-500">Адрес:</span>
                      <span>{{ order.address }}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium mb-3">Сумма заказа</h4>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-gray-500">Товары:</span>
                      <span>{{ formatPrice(order.subtotal) }} ₽</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-500">Доставка:</span>
                      <span>{{ formatPrice(order.deliveryCost) }} ₽</span>
                    </div>
                    <div class="flex justify-between font-medium">
                      <span>Итого:</span>
                      <span>{{ formatPrice(order.total) }} ₽</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Кнопки действий -->
              <div class="flex gap-4 mt-6">
                <button class="btn btn-outline flex-1">Повторить заказ</button>
                <button class="btn btn-primary flex-1">Подробнее</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrdersPage',
  data() {
    return {
      activeStatus: 'all',
      orderStatuses: [
        { value: 'all', label: 'Все заказы' },
        { value: 'processing', label: 'В обработке' },
        { value: 'shipped', label: 'В пути' },
        { value: 'delivered', label: 'Доставлены' },
        { value: 'cancelled', label: 'Отменены' }
      ],
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
    }
  },
  computed: {
    filteredOrders() {
      if (this.activeStatus === 'all') {
        return this.orders
      }
      return this.orders.filter(order => order.status === this.activeStatus)
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },
    formatPrice(price) {
      return new Intl.NumberFormat('ru-RU').format(price)
    },
    getStatusLabel(status) {
      const statusMap = {
        processing: 'В обработке',
        shipped: 'В пути',
        delivered: 'Доставлен',
        cancelled: 'Отменен'
      }
      return statusMap[status] || status
    },
    getStatusBadgeClass(status) {
      const classMap = {
        processing: 'badge-info',
        shipped: 'badge-warning',
        delivered: 'badge-success',
        cancelled: 'badge-error'
      }
      return classMap[status] || 'badge-ghost'
    },
    getProgressValue(status) {
      const progressMap = {
        processing: 33,
        shipped: 66,
        delivered: 100,
        cancelled: 0
      }
      return progressMap[status] || 0
    }
  }
}
</script> 