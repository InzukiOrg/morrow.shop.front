<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container mx-auto px-4 py-12">
      <!-- Основная информация -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- О компании -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">О компании</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition-colors">О нас</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Вакансии</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Блог</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Партнеры</a></li>
          </ul>
        </div>

        <!-- Помощь -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Помощь</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition-colors">Доставка</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Оплата</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Возврат</a></li>
            <li><a href="#" class="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        <!-- Контакты -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Контакты</h3>
          <ul class="space-y-2">
            <li class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>8 (800) 123-45-67</span>
            </li>
            <li class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@morrow.shop</span>
            </li>
            <li class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>г. Москва, ул. Примерная, 123</span>
            </li>
          </ul>
        </div>

        <!-- Социальные сети -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Мы в соцсетях</h3>
          <div class="flex space-x-4">
            <!-- YouTube -->
            <a href="#" class="hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <!-- ВКонтакте -->
            <a href="#" class="hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
                <path fill="#1976d2" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path>
                <path fill="#fff"
                  d="M35.937,18.041c0.046-0.151,0.068-0.291,0.062-0.416C35.984,17.263,35.735,17,35.149,17h-2.618 c-0.661,0-0.966,0.4-1.144,0.801c0,0-1.632,3.359-3.513,5.574c-0.61,0.641-0.92,0.625-1.25,0.625C26.447,24,26,23.786,26,23.199 v-5.185C26,17.32,25.827,17,25.268,17h-4.649C20.212,17,20,17.32,20,17.641c0,0.667,0.898,0.827,1,2.696v3.623 C21,24.84,20.847,25,20.517,25c-0.89,0-2.642-3-3.815-6.932C16.448,17.294,16.194,17,15.533,17h-2.643 C12.127,17,12,17.374,12,17.774c0,0.721,0.6,4.619,3.875,9.101C18.25,30.125,21.379,32,24.149,32c1.678,0,1.85-0.427,1.85-1.094 v-2.972C26,27.133,26.183,27,26.717,27c0.381,0,1.158,0.25,2.658,2c1.73,2.018,2.044,3,3.036,3h2.618 c0.608,0,0.957-0.255,0.971-0.75c0.003-0.126-0.015-0.267-0.056-0.424c-0.194-0.576-1.084-1.984-2.194-3.326 c-0.615-0.743-1.222-1.479-1.501-1.879C32.062,25.36,31.991,25.176,32,25c0.009-0.185,0.105-0.361,0.249-0.607 C32.223,24.393,35.607,19.642,35.937,18.041z">
                </path>
              </svg>
            </a>
            <!-- Телеграм -->
            <a href="#" class="hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.306.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Разделитель -->
      <div class="border-t border-gray-800 my-8"></div>

      <!-- Правовая информация -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Правовые документы -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Правовая информация</h3>
          <div class="grid grid-cols-2 gap-4">
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-white transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Пользовательское соглашение</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Правила продажи</a></li>
            </ul>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-white transition-colors">Правила пользования сайтом</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Политика обработки данных</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Правовая информация</a></li>
            </ul>
          </div>
        </div>

        <!-- Платежные системы -->
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Способы оплаты</h3>
          <div class="flex flex-wrap gap-4">
            <img src="https://cbr.ru/StaticHtml/File/162018/sbp_logo_t.png" alt="СБП" class="h-8">
            <img src="https://via.placeholder.com/40" alt="MIR" class="h-8">
            <img src="https://via.placeholder.com/40" alt="ЮMoney" class="h-8">
          </div>
        </div>
      </div>

      <!-- Копирайт -->
      <div class="mt-8 text-center text-sm">
        <p>© 2025 Morrow Shop. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>