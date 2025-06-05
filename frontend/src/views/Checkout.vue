<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 class="text-3xl font-bold mb-8 text-center">Оформление заказа</h1>
    <form @submit.prevent="submitOrder" class="space-y-10 bg-white rounded-xl shadow-lg p-8">
      <!-- Способ оплаты -->
      <div>
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a5 5 0 00-10 0v2M5 12h14M7 12v6m10-6v6"/></svg>
          Способ оплаты
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label :class="['border rounded-lg p-4 flex flex-col items-center cursor-pointer transition', payment === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-400']">
            <input type="radio" value="card" v-model="payment" class="hidden">
            <svg class="w-8 h-8 mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" fill="#fff" stroke="#2563eb" stroke-width="2"/><rect x="2" y="11" width="20" height="3" fill="#2563eb"/></svg>
            <span>Карта</span>
          </label>
          <label :class="['border rounded-lg p-4 flex flex-col items-center cursor-pointer transition', payment === 'cash' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-400']">
            <input type="radio" value="cash" v-model="payment" class="hidden">
            <svg class="w-8 h-8 mb-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" fill="#fff" stroke="#22c55e" stroke-width="2"/><path d="M7 11h10v2H7z" fill="#22c55e"/></svg>
            <span>Наличные</span>
          </label>
          <label :class="['border rounded-lg p-4 flex flex-col items-center cursor-pointer transition', payment === 'sbp' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-400']">
            <input type="radio" value="sbp" v-model="payment" class="hidden">
            <svg class="w-8 h-8 mb-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff" stroke="#ec4899" stroke-width="2"/><path d="M8 12h8M12 8v8" stroke="#ec4899" stroke-width="2"/></svg>
            <span>СБП</span>
          </label>
        </div>
        <!-- Уточняющие поля для оплаты -->
        <div v-if="payment === 'card'" class="mt-4">
          <label class="block mb-2 font-medium">Номер карты</label>
          <input type="text" v-model="cardNumber" maxlength="19" placeholder="0000 0000 0000 0000" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        </div>
        <div v-if="payment === 'cash'" class="mt-4">
          <label class="block mb-2 font-medium">Комментарий для курьера</label>
          <input type="text" v-model="cashComment" placeholder="Например, сдача с 5000" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        </div>
      </div>
      <!-- Способ доставки -->
      <div>
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          Способ доставки
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label :class="['border rounded-lg p-4 flex flex-col items-center cursor-pointer transition', delivery === 'courier' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-400']">
            <input type="radio" value="courier" v-model="delivery" class="hidden">
            <svg class="w-8 h-8 mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" fill="#fff" stroke="#2563eb" stroke-width="2"/><path d="M7 11h10v2H7z" fill="#2563eb"/></svg>
            <span>Курьер</span>
          </label>
          <label :class="['border rounded-lg p-4 flex flex-col items-center cursor-pointer transition', delivery === 'pickup' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-400']">
            <input type="radio" value="pickup" v-model="delivery" class="hidden">
            <svg class="w-8 h-8 mb-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff" stroke="#f59e42" stroke-width="2"/><path d="M8 12h8M12 8v8" stroke="#f59e42" stroke-width="2"/></svg>
            <span>Самовывоз</span>
          </label>
          <label :class="['border rounded-lg p-4 flex flex-col items-center cursor-pointer transition', delivery === 'post' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-400']">
            <input type="radio" value="post" v-model="delivery" class="hidden">
            <svg class="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" fill="#fff" stroke="#6b7280" stroke-width="2"/><path d="M7 11h10v2H7z" fill="#6b7280"/></svg>
            <span>Почта</span>
          </label>
        </div>
        <!-- Уточняющие поля для доставки -->
        <div v-if="delivery === 'courier'" class="mt-4 space-y-4">
          <label class="block mb-2 font-medium">Адрес доставки</label>
          <input type="text" v-model="address" placeholder="Город, улица, дом, квартира" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
          <label class="block mb-2 font-medium">Комментарий</label>
          <input type="text" v-model="addressComment" placeholder="Комментарий для курьера" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        </div>
        <div v-if="delivery === 'pickup'" class="mt-4">
          <label class="block mb-2 font-medium">Пункт самовывоза</label>
          <select v-model="pickupPoint" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
            <option disabled value="">Выберите пункт</option>
            <option>г. Москва, ул. Ленина, 1</option>
            <option>г. Санкт-Петербург, Невский пр., 10</option>
            <option>г. Екатеринбург, ул. Мира, 5</option>
          </select>
        </div>
        <div v-if="delivery === 'post'" class="mt-4">
          <label class="block mb-2 font-medium">Почтовый индекс</label>
          <input type="text" v-model="postIndex" maxlength="6" placeholder="123456" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
        </div>
      </div>
      <!-- Ожидаемая дата -->
      <div class="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold mb-2">Ожидаемая дата доставки</h2>
          <div class="text-lg text-gray-700">{{ expectedDate }}</div>
        </div>
        <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </div>
      <button type="submit" class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg mt-4">
        Подтвердить заказ
      </button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Checkout',
  setup() {
    const payment = ref('card')
    const delivery = ref('courier')
    const cardNumber = ref('')
    const cashComment = ref('')
    const address = ref('')
    const addressComment = ref('')
    const pickupPoint = ref('')
    const postIndex = ref('')
    // Примерная логика расчёта даты
    const expectedDate = computed(() => {
      const now = new Date()
      let days = 2
      if (delivery.value === 'pickup') days = 1
      if (delivery.value === 'post') days = 5
      now.setDate(now.getDate() + days)
      return now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
    })
    const submitOrder = () => {
      alert('Оформление заказа недоступно в демо-версии.')
    }
    return {
      payment,
      delivery,
      cardNumber,
      cashComment,
      address,
      addressComment,
      pickupPoint,
      postIndex,
      expectedDate,
      submitOrder
    }
  }
}
</script> 