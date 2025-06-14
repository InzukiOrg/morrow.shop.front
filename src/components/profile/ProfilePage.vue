<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Уведомления -->
    <div v-if="notification.show" 
         :class="['toast toast-top toast-end', notification.type === 'error' ? 'alert alert-error' : 'alert alert-success']">
      <span>{{ notification.message }}</span>
    </div>

    <!-- Мобильная версия -->
    <div class="lg:hidden">
      <!-- Верхняя информация -->
      <div class="bg-base-200 rounded-box lg:p-4 mb-4">
        <div class="flex items-center gap-4">
          <div class="avatar">
            <div class="w-20 rounded-full">
              <img :src="profile.avatar" />
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold">{{ profile.firstName }} {{ profile.lastName }}</h2>
            <p class="text-sm opacity-70">{{ profile.email }}</p>
          </div>
        </div>
      </div>

      <!-- Навигация -->
      <div class="tabs tabs-boxed lg:mb-4 mb-2">
        <a v-for="tab in ['profile', 'orders', 'favorites', 'settings']" 
           :key="tab"
           :class="['tab', { 'tab-active': activeTab === tab }]"
           @click="handleTabClick(tab)">
          {{ tab === 'profile' ? 'Профиль' : 
             tab === 'orders' ? 'Заказы' :
             tab === 'favorites' ? '❤️' : '⚙️' }}
        </a>
      </div>

      <!-- Основная информация -->
      <div v-if="activeTab === 'profile'" class="space-y-4">
        <!-- Личные данные -->
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <div class="flex justify-between items-center mb-4">
              <h3 class="card-title">Личные данные</h3>
              <button v-if="!isEditing" @click="startEditing" class="btn btn-ghost btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span class="lg:bock hidden">Редактировать</span>
              </button>
            </div>

            <!-- Режим просмотра -->
            <div v-if="!isEditing" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm opacity-70">Имя</p>
                  <p class="font-medium">{{ profile.firstName }}</p>
                </div>
                <div>
                  <p class="text-sm opacity-70">Фамилия</p>
                  <p class="font-medium">{{ profile.lastName }}</p>
                </div>
                <div>
                  <p class="text-sm opacity-70">Email</p>
                  <p class="font-medium">{{ profile.email }}</p>
                </div>
                <div>
                  <p class="text-sm opacity-70">Телефон</p>
                  <p class="font-medium">{{ profile.phone || 'Не указан' }}</p>
                </div>
              </div>
            </div>

            <!-- Режим редактирования -->
            <form v-else @submit.prevent="saveProfile" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Имя</span>
                  </label>
                  <input type="text" v-model="editedProfile.firstName" class="input input-bordered" required />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Фамилия</span>
                  </label>
                  <input type="text" v-model="editedProfile.lastName" class="input input-bordered" required />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Email</span>
                  </label>
                  <input type="email" v-model="editedProfile.email" class="input input-bordered" required />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Телефон</span>
                  </label>
                  <input type="tel" v-model="editedProfile.phone" class="input input-bordered" />
                </div>
              </div>
              <div class="flex justify-end gap-2">
                <button type="button" @click="cancelEditing" class="btn btn-ghost">Отмена</button>
                <button type="submit" class="btn btn-primary">Сохранить</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Адрес доставки -->
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <div class="flex justify-between items-center mb-4">
              <h3 class="card-title">Адрес доставки</h3>
              <button v-if="!isEditingAddress" @click="startEditingAddress" class="btn btn-ghost btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span class="lg:bock hidden">Редактировать</span>
              </button>
            </div>

            <!-- Режим просмотра адреса -->
            <div v-if="!isEditingAddress" class="space-y-4">
              <div v-if="profile.address" class="space-y-2">
                <p class="font-medium">{{ profile.address.street }}</p>
                <p class="text-sm opacity-70">{{ profile.address.city }}, {{ profile.address.postalCode }}</p>
              </div>
              <p v-else class="text-sm opacity-70">Адрес не указан</p>
            </div>

            <!-- Режим редактирования адреса -->
            <form v-else @submit.prevent="saveAddress" class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Улица</span>
                </label>
                <input type="text" v-model="editedAddress.street" class="input input-bordered" required />
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Город</span>
                  </label>
                  <input type="text" v-model="editedAddress.city" class="input input-bordered" required />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Индекс</span>
                  </label>
                  <input type="text" v-model="editedAddress.postalCode" class="input input-bordered" required />
                </div>
              </div>
              <div class="flex justify-end gap-2">
                <button type="button" @click="cancelEditingAddress" class="btn btn-ghost">Отмена</button>
                <button type="submit" class="btn btn-primary">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Заказы -->
      <div v-else-if="activeTab === 'orders'" class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h3 class="card-title">История заказов</h3>
          <p class="text-sm opacity-70">У вас пока нет заказов</p>
        </div>
      </div>

      <!-- Избранное -->
      <div v-else-if="activeTab === 'favorites'" class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h3 class="card-title">Избранные товары</h3>
          <p class="text-sm opacity-70">У вас пока нет избранных товаров</p>
        </div>
      </div>

      <!-- Настройки -->
      <div v-else-if="activeTab === 'settings'" class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h3 class="card-title">Настройки уведомлений</h3>
          <div class="space-y-4">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Email-уведомления</span>
                <input type="checkbox" v-model="settings.emailNotifications" class="toggle toggle-primary" />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">SMS-уведомления</span>
                <input type="checkbox" v-model="settings.smsNotifications" class="toggle toggle-primary" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Десктопная версия -->
    <div class="hidden lg:block">
      <div class="flex gap-8">
        <!-- Боковое меню -->
        <div class="w-64 flex-shrink-0">
          <div class="bg-base-200 rounded-box p-6 mb-4">
            <div class="flex flex-col items-center">
              <div class="avatar mb-4">
                <div class="w-24 rounded-full">
                  <img :src="profile.avatar" />
                </div>
              </div>
              <h2 class="text-xl font-bold text-center">{{ profile.firstName }} {{ profile.lastName }}</h2>
              <p class="text-sm opacity-70 text-center">{{ profile.email }}</p>
            </div>
          </div>

          <div class="bg-base-100 rounded-box shadow-sm">
            <div class="flex flex-col gap-2">
              <a v-for="tab in ['profile', 'orders', 'favorites', 'settings']" 
                 :key="tab"
                 :class="['btn btn-ghost justify-start gap-2', { 'btn-active': activeTab === tab }]"
                 @click="handleTabClick(tab)">
                <svg v-if="tab === 'profile'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <svg v-else-if="tab === 'orders'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <svg v-else-if="tab === 'favorites'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <svg v-else-if="tab === 'settings'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ tab === 'profile' ? 'Профиль' : 
                   tab === 'orders' ? 'Заказы' :
                   tab === 'favorites' ? 'Избранное' : 'Настройки' }}
              </a>
            </div>
          </div>
        </div>

        <!-- Основной контент -->
        <div class="flex-grow">
          <!-- Профиль -->
          <div v-if="activeTab === 'profile'" class="space-y-6">
            <!-- Личные данные -->
            <div class="card bg-base-100 shadow-sm">
              <div class="card-body">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="card-title">Личные данные</h3>
                  <button v-if="!isEditing" @click="startEditing" class="btn btn-ghost btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Редактировать
                  </button>
                </div>

                <!-- Режим просмотра -->
                <div v-if="!isEditing" class="grid grid-cols-2 gap-6">
                  <div>
                    <p class="text-sm opacity-70">Имя</p>
                    <p class="font-medium">{{ profile.firstName }}</p>
                  </div>
                  <div>
                    <p class="text-sm opacity-70">Фамилия</p>
                    <p class="font-medium">{{ profile.lastName }}</p>
                  </div>
                  <div>
                    <p class="text-sm opacity-70">Email</p>
                    <p class="font-medium">{{ profile.email }}</p>
                  </div>
                  <div>
                    <p class="text-sm opacity-70">Телефон</p>
                    <p class="font-medium">{{ profile.phone || 'Не указан' }}</p>
                  </div>
                </div>

                <!-- Режим редактирования -->
                <form v-else @submit.prevent="saveProfile" class="space-y-6">
                  <div class="grid grid-cols-2 gap-6">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Имя</span>
                      </label>
                      <input type="text" v-model="editedProfile.firstName" class="input input-bordered" required />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Фамилия</span>
                      </label>
                      <input type="text" v-model="editedProfile.lastName" class="input input-bordered" required />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Email</span>
                      </label>
                      <input type="email" v-model="editedProfile.email" class="input input-bordered" required />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Телефон</span>
                      </label>
                      <input type="tel" v-model="editedProfile.phone" class="input input-bordered" />
                    </div>
                  </div>
                  <div class="flex justify-end gap-2">
                    <button type="button" @click="cancelEditing" class="btn btn-ghost">Отмена</button>
                    <button type="submit" class="btn btn-primary">Сохранить</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Адрес доставки -->
            <div class="card bg-base-100 shadow-sm">
              <div class="card-body">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="card-title">Адрес доставки</h3>
                  <button v-if="!isEditingAddress" @click="startEditingAddress" class="btn btn-ghost btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Редактировать
                  </button>
                </div>

                <!-- Режим просмотра адреса -->
                <div v-if="!isEditingAddress" class="space-y-2">
                  <div v-if="profile.address" class="space-y-2">
                    <p class="font-medium">{{ profile.address.street }}</p>
                    <p class="text-sm opacity-70">{{ profile.address.city }}, {{ profile.address.postalCode }}</p>
                  </div>
                  <p v-else class="text-sm opacity-70">Адрес не указан</p>
                </div>

                <!-- Режим редактирования адреса -->
                <form v-else @submit.prevent="saveAddress" class="space-y-6">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Улица</span>
                    </label>
                    <input type="text" v-model="editedAddress.street" class="input input-bordered" required />
                  </div>
                  <div class="grid grid-cols-2 gap-6">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Город</span>
                      </label>
                      <input type="text" v-model="editedAddress.city" class="input input-bordered" required />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Индекс</span>
                      </label>
                      <input type="text" v-model="editedAddress.postalCode" class="input input-bordered" required />
                    </div>
                  </div>
                  <div class="flex justify-end gap-2">
                    <button type="button" @click="cancelEditingAddress" class="btn btn-ghost">Отмена</button>
                    <button type="submit" class="btn btn-primary">Сохранить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Заказы -->
          <div v-else-if="activeTab === 'orders'" class="card bg-base-100 shadow-sm">
            <div class="card-body">
              <h3 class="card-title">История заказов</h3>
              <p class="text-sm opacity-70">У вас пока нет заказов</p>
            </div>
          </div>

          <!-- Избранное -->
          <div v-else-if="activeTab === 'favorites'" class="card bg-base-100 shadow-sm">
            <div class="card-body">
              <h3 class="card-title">Избранные товары</h3>
              <p class="text-sm opacity-70">У вас пока нет избранных товаров</p>
            </div>
          </div>

          <!-- Настройки -->
          <div v-else-if="activeTab === 'settings'" class="card bg-base-100 shadow-sm">
            <div class="card-body">
              <h3 class="card-title">Настройки уведомлений</h3>
              <div class="space-y-4">
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text">Email-уведомления</span>
                    <input type="checkbox" v-model="settings.emailNotifications" class="toggle toggle-primary" />
                  </label>
                </div>
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text">SMS-уведомления</span>
                    <input type="checkbox" v-model="settings.smsNotifications" class="toggle toggle-primary" />
                  </label>
                </div>
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
  name: 'ProfilePage',
  data() {
    return {
      activeTab: 'profile',
      isEditing: false,
      isEditingAddress: false,
      notification: {
        show: false,
        message: '',
        type: 'success'
      },
      profile: {
        firstName: 'Иван',
        lastName: 'Иванов',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        avatar: 'https://i.pravatar.cc/300',
        address: {
          street: 'ул. Пушкина, д. 10',
          city: 'Москва',
          postalCode: '123456'
        }
      },
      editedProfile: {},
      editedAddress: {},
      settings: {
        emailNotifications: true,
        smsNotifications: false
      }
    }
  },
  methods: {
    handleTabClick(tab) {
      if (tab === 'favorites') {
        this.$router.push('/favorites')
      } else {
        this.activeTab = tab
      }
    },
    startEditing() {
      this.editedProfile = { ...this.profile }
      this.isEditing = true
    },
    cancelEditing() {
      this.isEditing = false
      this.editedProfile = {}
    },
    async saveProfile() {
      try {
        // Здесь будет API запрос
        this.profile = { ...this.editedProfile }
        this.isEditing = false
        this.showNotification('Профиль успешно обновлен', 'success')
      } catch (error) {
        this.showNotification('Ошибка при обновлении профиля', 'error')
      }
    },
    startEditingAddress() {
      this.editedAddress = { ...this.profile.address }
      this.isEditingAddress = true
    },
    cancelEditingAddress() {
      this.isEditingAddress = false
      this.editedAddress = {}
    },
    async saveAddress() {
      try {
        // Здесь будет API запрос
        this.profile.address = { ...this.editedAddress }
        this.isEditingAddress = false
        this.showNotification('Адрес успешно обновлен', 'success')
      } catch (error) {
        this.showNotification('Ошибка при обновлении адреса', 'error')
      }
    },
    showNotification(message, type = 'success') {
      this.notification = {
        show: true,
        message,
        type
      }
      setTimeout(() => {
        this.notification.show = false
      }, 3000)
    }
  }
}
</script> 