export const categories = [
  {
    id: 1,
    slug: 'elektronika',
    name: 'Электроника',
    children: [
      {
        id: 2,
        slug: 'aksessuary',
        name: 'Аксессуары',
        children: [
          { id: 3, slug: 'chasy', name: 'Часы' },
          { id: 4, slug: 'naushniki', name: 'Наушники' }
        ]
      },
      { id: 5, slug: 'monitory', name: 'Мониторы' },
      { id: 6, slug: 'smartfony', name: 'Смартфоны' }
    ]
  },
  {
    id: 10,
    slug: 'odezhda',
    name: 'Одежда',
    children: [
      {
        id: 11,
        slug: 'aksessuary-odezhda',
        name: 'Аксессуары',
        children: [
          { id: 12, slug: 'piny', name: 'Пины' }
        ]
      },
      { id: 13, slug: 'futbolki', name: 'Футболки' },
      { id: 14, slug: 'svitera', name: 'Свитера' }
    ]
  },
  {
    id: 20,
    slug: 'books',
    name: 'Книги',
    children: []
  },
  {
    id: 30,
    slug: 'sport',
    name: 'Спорт и отдых',
    children: [
      { id: 31, slug: 'sportivnoe-pitanie', name: 'Спортивное питание' }
    ]
  }
]

export const brandsByCategory = {
  elektronika: [
    { id: 1, name: 'MorrowsTech' },
    { id: 2, name: 'Bandigo' },
    { id: 3, name: 'ElectroMax' }
  ],
  odezhda: [
    { id: 1, name: 'MorrowsTech' },
    { id: 4, name: 'FashionLine' },
    { id: 5, name: 'UrbanWear' },
    { id: 6, name: 'Bandigo' }
  ],
  books: [
    { id: 7, name: 'BookLand' },
    { id: 8, name: 'ReadMore' }
  ],
  sport: [
    { id: 11, name: 'Sarkong' },
    { id: 12, name: 'Kostimbo' }
  ]
}

export const products = [
  {
    id: 1,
    name: 'Bandigo X1',
    description: 'Современный смартфон с отличной камерой и ёмкой батареей.',
    price: 29990,
    image: 'https://via.placeholder.com/300x300?text=Bandigo+X1',
    category: 6, // Смартфоны
    brand: 2, // Bandigo
    rating: 4.7,
    popular: true
  },
  {
    id: 2,
    name: 'Футболка UrbanWear',
    description: 'Классическая хлопковая футболка для города и спорта.',
    price: 1490,
    image: 'https://via.placeholder.com/300x300?text=UrbanWear+Tee',
    category: 13, // Футболки
    brand: 5, // UrbanWear
    rating: 4.5,
    size: ['S', 'M', 'L', 'XL'],
    color: 'Белый',
    gender: 'Унисекс',
    popular: true
  },
  {
    id: 3,
    name: 'Sarkong Гейнер',
    description: 'Высококалорийный гейнер Sarkong для быстрого набора массы. Отлично растворяется, содержит витамины и минералы.',
    price: 2490,
    image: 'https://via.placeholder.com/300x300?text=Sarkong+Gainer',
    category: 31, // Спортивное питание
    brand: 11, // Sarkong
    rating: 4.8
  },
  {
    id: 4,
    name: 'Sarkong Протеин',
    description: 'Сывороточный протеин Sarkong для роста мышц и восстановления. Вкус шоколад, быстрое усвоение.',
    price: 2990,
    image: 'https://via.placeholder.com/300x300?text=Sarkong+Protein',
    category: 31, // Спортивное питание
    brand: 11, // Sarkong
    rating: 4.9,
    popular: true
  },
  {
    id: 5,
    name: 'Kostimbo для роста костей',
    description: 'Специальный комплекс Kostimbo для укрепления и роста костей. Содержит кальций, витамин D и коллаген.',
    price: 1990,
    image: 'https://via.placeholder.com/300x300?text=Kostimbo+Bone',
    category: 31, // Спортивное питание
    brand: 12, // Kostimbo
    rating: 4.6
  },
  {
    id: 6,
    name: 'Bandigo Monitor 27"',
    description: 'Современный 27-дюймовый монитор Bandigo с IPS-матрицей и частотой 144 Гц. Отлично подходит для работы и игр.',
    price: 21990,
    image: 'https://via.placeholder.com/300x300?text=Bandigo+Monitor+27',
    category: 5, // Мониторы
    brand: 2, // Bandigo
    rating: 4.8
  },
  {
    id: 7,
    name: 'Bandigo Последний додеп',
    description: 'История о том, как пагубно влияют азартные игры на жизнь человека. Главный герой теряет всё, но находит в себе силы начать заново и предостеречь других от этой опасности.',
    price: 590,
    image: 'https://via.placeholder.com/300x300?text=Bandigo+Book',
    category: 20, // Книги
    brand: 2, // Bandigo
    rating: 4.4
  },
  {
    id: 8,
    name: 'Пин Morrow Club',
    description: 'Эксклюзивный металлический пин для участников Morrow Club. Стильный аксессуар для одежды и рюкзака.',
    price: 390,
    image: 'https://via.placeholder.com/300x300?text=Morrow+Club+Pin',
    category: 12, // Пины
    brand: 1, // MorrowsTech
    rating: 4.9,
    popular: true
  }
] 