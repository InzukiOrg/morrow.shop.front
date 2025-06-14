<template>
    <div class="container mx-auto px-4 py-6">
        <!-- Мобильная версия -->
        <div class="lg:hidden">
            <!-- Заголовок -->
            <div class="mb-6">
                <h1 class="text-xl font-bold mb-2">Доставка заказа</h1>
                <p class="text-sm text-gray-600">Выберите способ и адрес доставки</p>
            </div>

            <!-- Способы доставки -->
            <div class="card bg-white shadow-sm mb-6">
                <div class="card-body p-4">
                    <h2 class="card-title text-base mb-4">Способ доставки</h2>
                    <div class="space-y-3">
                        <label class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="delivery-type" class="radio radio-primary" checked />
                            <div class="flex-grow">
                                <div class="font-medium">Курьерская доставка</div>
                                <div class="text-xs text-gray-500 mt-0.5">Доставка курьером до двери</div>
                            </div>
                            <div class="text-sm font-medium">от 300 ₽</div>
                        </label>

                        <label class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="delivery-type" class="radio radio-primary" />
                            <div class="flex-grow">
                                <div class="font-medium">Пункт выдачи</div>
                                <div class="text-xs text-gray-500 mt-0.5">Самовывоз из пункта выдачи</div>
                            </div>
                            <div class="text-sm font-medium">от 200 ₽</div>
                        </label>

                        <label class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="delivery-type" class="radio radio-primary" />
                            <div class="flex-grow">
                                <div class="font-medium">Почта России</div>
                                <div class="text-xs text-gray-500 mt-0.5">Доставка почтой России</div>
                            </div>
                            <div class="text-sm font-medium">от 250 ₽</div>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Адрес доставки -->
            <div class="card bg-white shadow-sm mb-6">
                <div class="card-body p-4">
                    <h2 class="card-title text-base mb-4">Адрес доставки</h2>
                    <div class="space-y-4">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text text-sm">Город</span>
                            </label>
                            <input type="text" placeholder="Введите город" class="input input-bordered w-full" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text text-sm">Улица</span>
                            </label>
                            <input type="text" placeholder="Введите улицу" class="input input-bordered w-full" />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text text-sm">Дом</span>
                                </label>
                                <input type="text" placeholder="№" class="input input-bordered w-full" />
                            </div>

                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text text-sm">Квартира</span>
                                </label>
                                <input type="text" placeholder="№" class="input input-bordered w-full" />
                            </div>
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text text-sm">Комментарий к заказу</span>
                            </label>
                            <textarea class="textarea textarea-bordered h-24"
                                placeholder="Напишите комментарий к заказу"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Время доставки -->
            <div class="card bg-white shadow-sm mb-6">
                <div class="card-body p-4">
                    <h2 class="card-title text-base mb-4">Время доставки</h2>
                    <div class="space-y-3">
                        <label class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="delivery-time" class="radio radio-primary" checked />
                            <div class="flex-grow">
                                <div class="font-medium">Сегодня</div>
                                <div class="text-xs text-gray-500 mt-0.5">Доставка в течение дня</div>
                            </div>
                            <div class="text-sm font-medium">+300 ₽</div>
                        </label>

                        <label class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="delivery-time" class="radio radio-primary" />
                            <div class="flex-grow">
                                <div class="font-medium">Завтра</div>
                                <div class="text-xs text-gray-500 mt-0.5">Доставка завтра</div>
                            </div>
                            <div class="text-sm font-medium">Бесплатно</div>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Итого -->
            <div class="card bg-white shadow-sm mb-6">
                <div class="card-body p-4">
                    <div class="space-y-2">
                        <div class="flex justify-between text-sm">
                            <span>Товары (3)</span>
                            <span>12 500 ₽</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Доставка</span>
                            <span>300 ₽</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Срочная доставка</span>
                            <span>300 ₽</span>
                        </div>
                        <div class="divider my-2"></div>
                        <div class="flex justify-between font-medium">
                            <span>Итого</span>
                            <span>13 100 ₽</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Кнопка оформления -->
            <router-link to="/checkout"
                class="btn btn-primary w-full mt-6">
                Оформить заказ
            </router-link>
        </div>

        <!-- Десктопная версия -->
        <div class="hidden lg:block">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-2xl font-bold mb-6">Доставка заказа</h1>

                <div class="grid grid-cols-3 gap-6">
                    <!-- Левая колонка -->
                    <div class="col-span-2 space-y-6">
                        <!-- Способы доставки -->
                        <div class="card bg-white shadow-sm">
                            <div class="card-body">
                                <h2 class="card-title text-lg mb-4">Способ доставки</h2>
                                <div class="space-y-4">
                                    <label
                                        class="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input type="radio" name="delivery-type-desktop" class="radio radio-primary"
                                            checked />
                                        <div class="flex-grow">
                                            <div class="font-medium">Курьерская доставка</div>
                                            <div class="text-sm text-gray-500 mt-1">Доставка курьером до двери</div>
                                        </div>
                                        <div class="text-base font-medium">от 300 ₽</div>
                                    </label>

                                    <label
                                        class="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input type="radio" name="delivery-type-desktop" class="radio radio-primary" />
                                        <div class="flex-grow">
                                            <div class="font-medium">Пункт выдачи</div>
                                            <div class="text-sm text-gray-500 mt-1">Самовывоз из пункта выдачи</div>
                                        </div>
                                        <div class="text-base font-medium">от 200 ₽</div>
                                    </label>

                                    <label
                                        class="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input type="radio" name="delivery-type-desktop" class="radio radio-primary" />
                                        <div class="flex-grow">
                                            <div class="font-medium">Почта России</div>
                                            <div class="text-sm text-gray-500 mt-1">Доставка почтой России</div>
                                        </div>
                                        <div class="text-base font-medium">от 250 ₽</div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Адрес доставки -->
                        <div class="card bg-white shadow-sm">
                            <div class="card-body">
                                <h2 class="card-title text-lg mb-4">Адрес доставки</h2>
                                <div class="grid grid-cols-2 gap-6">
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Город</span>
                                        </label>
                                        <input type="text" placeholder="Введите город"
                                            class="input input-bordered w-full" />
                                    </div>

                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Улица</span>
                                        </label>
                                        <input type="text" placeholder="Введите улицу"
                                            class="input input-bordered w-full" />
                                    </div>

                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Дом</span>
                                        </label>
                                        <input type="text" placeholder="№" class="input input-bordered w-full" />
                                    </div>

                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Квартира</span>
                                        </label>
                                        <input type="text" placeholder="№" class="input input-bordered w-full" />
                                    </div>
                                </div>

                                <div class="form-control mt-6">
                                    <label class="label">
                                        <span class="label-text">Комментарий к заказу</span>
                                    </label>
                                    <textarea class="textarea textarea-bordered h-24"
                                        placeholder="Напишите комментарий к заказу"></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Время доставки -->
                        <div class="card bg-white shadow-sm">
                            <div class="card-body">
                                <h2 class="card-title text-lg mb-4">Время доставки</h2>
                                <div class="space-y-4">
                                    <label
                                        class="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input type="radio" name="delivery-time-desktop" class="radio radio-primary"
                                            checked />
                                        <div class="flex-grow">
                                            <div class="font-medium">Сегодня</div>
                                            <div class="text-sm text-gray-500 mt-1">Доставка в течение дня</div>
                                        </div>
                                        <div class="text-base font-medium">+300 ₽</div>
                                    </label>

                                    <label
                                        class="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input type="radio" name="delivery-time-desktop" class="radio radio-primary" />
                                        <div class="flex-grow">
                                            <div class="font-medium">Завтра</div>
                                            <div class="text-sm text-gray-500 mt-1">Доставка завтра</div>
                                        </div>
                                        <div class="text-base font-medium">Бесплатно</div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Правая колонка -->
                    <div class="space-y-6">
                        <!-- Итого -->
                        <div class="card bg-white shadow-sm sticky top-6">
                            <div class="card-body">
                                <h2 class="card-title text-lg mb-4">Итого</h2>
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <span>Товары (3)</span>
                                        <span>12 500 ₽</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Доставка</span>
                                        <span>300 ₽</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Срочная доставка</span>
                                        <span>300 ₽</span>
                                    </div>
                                    <div class="divider"></div>
                                    <div class="flex justify-between text-lg font-medium">
                                        <span>Итого</span>
                                        <span>13 100 ₽</span>
                                    </div>
                                </div>

                                <router-link to="/checkout"
                                    class="btn btn-primary w-full mt-6">
                                    Оформить заказ
                                </router-link>
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
    name: 'DeliveryPage',
    data() {
        return {
            deliveryType: 'courier',
            deliveryTime: 'today',
            address: {
                city: '',
                street: '',
                house: '',
                apartment: ''
            },
            comment: ''
        }
    },
    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat('ru-RU').format(price)
        }
    }
}
</script>