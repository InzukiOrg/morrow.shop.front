export const filterConfig = {
  default: [
    {
      field: 'price',
      type: 'range',
      label: 'Цена',
      min: 0,
      max: 100000
    },
    {
      field: 'rating',
      type: 'rating',
      label: 'Рейтинг'
    },
    {
      field: 'brand',
      type: 'select-search',
      label: 'Бренд',
      options: [
        { value: 'nike', label: 'Nike' },
        { value: 'adidas', label: 'Adidas' },
        { value: 'puma', label: 'Puma' },
        { value: 'reebok', label: 'Reebok' },
        { value: 'new-balance', label: 'New Balance' },
        { value: 'asics', label: 'Asics' },
        { value: 'under-armour', label: 'Under Armour' },
        { value: 'converse', label: 'Converse' }
      ]
    },
    {
      field: 'size',
      type: 'checkbox',
      label: 'Размер',
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
      field: 'color',
      type: 'checkbox',
      label: 'Цвет',
      options: ['Красный', 'Синий', 'Зеленый', 'Черный', 'Белый']
    },
    {
      field: 'gender',
      type: 'checkbox',
      label: 'Пол',
      options: ['Мужской', 'Женский', 'Унисекс']
    },
    {
      field: 'category',
      type: 'select',
      label: 'Категория',
      options: [
        { value: 'shoes', label: 'Обувь' },
        { value: 'clothes', label: 'Одежда' },
        { value: 'accessories', label: 'Аксессуары' }
      ]
    },
    {
      field: 'availability',
      type: 'radio',
      label: 'Наличие',
      options: [
        { value: 'in_stock', label: 'В наличии' },
        { value: 'out_of_stock', label: 'Нет в наличии' },
        { value: 'pre_order', label: 'Под заказ' }
      ]
    },
    {
      field: 'discount',
      type: 'switch',
      label: 'Только со скидкой'
    }
  ],
  elektronika: [
    { type: 'checkbox', field: 'brand', label: 'Бренды' }
  ],
  odezhda: [
    { type: 'checkbox', field: 'brand', label: 'Бренды' },
    { type: 'checkbox', field: 'size', label: 'Размер' },
    { type: 'checkbox', field: 'color', label: 'Цвет' },
    { type: 'checkbox', field: 'gender', label: 'Пол' }
  ],
  sport: [
    { type: 'checkbox', field: 'brand', label: 'Бренды' }
  ],
  'sportivnoe-pitanie': [
    { type: 'checkbox', field: 'brand', label: 'Бренды' }
  ]
} 