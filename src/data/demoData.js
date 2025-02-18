export const featuredProducts = [
  {
    id: 1,
    name: 'Chocolate Heaven Cake',
    description: 'Rich chocolate layers with creamy ganache',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    category: 'Cakes'
  },
  {
    id: 2,
    name: 'Classic Croissant',
    description: 'Buttery, flaky French pastry',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a',
    category: 'Pastries'
  },
  {
    id: 3,
    name: 'Chocolate Chip Cookies',
    description: 'Soft-baked with premium chocolate chips',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
    category: 'Cookies'
  },
  {
    id: 4,
    name: 'Strawberry Cheesecake',
    description: 'Creamy cheesecake with fresh strawberry topping',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad',
    category: 'Cakes'
  },
  {
    id: 5,
    name: 'Sourdough Bread',
    description: 'Artisanal sourdough bread, freshly baked',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb',
    category: 'Breads'
  },
  {
    id: 6,
    name: 'Fruit Danish',
    description: 'Flaky pastry with seasonal fruits',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812',
    category: 'Pastries'
  }
];

export const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    orders: 5,
    totalSpent: 234.50
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    orders: 3,
    totalSpent: 156.75
  }
];

export const orders = [
  {
    id: 1,
    userId: 1,
    products: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 }
    ],
    total: 68.97,
    status: 'Delivered',
    date: '2024-03-15'
  },
  {
    id: 2,
    userId: 2,
    products: [
      { productId: 2, quantity: 3 },
      { productId: 4, quantity: 1 }
    ],
    total: 46.96,
    status: 'Processing',
    date: '2024-03-16'
  }
]; 