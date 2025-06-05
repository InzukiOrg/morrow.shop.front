export const filterConfig = {
  default: [
    { type: 'range', field: 'price', label: 'Цена' },
    { type: 'rating', field: 'rating', label: 'Рейтинг' }
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