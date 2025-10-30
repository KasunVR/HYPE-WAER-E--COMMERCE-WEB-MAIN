// Product Service - Manages products in localStorage

export interface Product {
  id: string;
  name: string;
  category: 'female' | 'male' | 'kids';
  price: number;
  description: string;
  color: string;
  image: string;
  stock: number;
  createdAt: string;
}

const STORAGE_KEY = 'hype_wear_products';

// Initialize with sample products if none exist
const initializeProducts = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Summer Dress',
        category: 'female',
        price: 49.99,
        description: 'Elegant summer dress for women',
        color: 'Red',
        image: '',
        stock: 15,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Casual T-Shirt',
        category: 'male',
        price: 29.99,
        description: 'Comfortable casual t-shirt for men',
        color: 'Blue',
        image: '',
        stock: 25,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Kids Hoodie',
        category: 'kids',
        price: 39.99,
        description: 'Warm and cozy hoodie for kids',
        color: 'Yellow',
        image: '',
        stock: 20,
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleProducts));
  }
};

// Get all products
export const getAllProducts = (): Product[] => {
  initializeProducts();
  const products = localStorage.getItem(STORAGE_KEY);
  return products ? JSON.parse(products) : [];
};

// Get products by category
export const getProductsByCategory = (category: 'female' | 'male' | 'kids'): Product[] => {
  const allProducts = getAllProducts();
  return allProducts.filter(product => product.category === category);
};

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === id);
};

// Add new product
export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
  const allProducts = getAllProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  allProducts.push(newProduct);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProducts));
  return newProduct;
};

// Update product
export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const allProducts = getAllProducts();
  const index = allProducts.findIndex(product => product.id === id);
  if (index === -1) return null;
  
  allProducts[index] = { ...allProducts[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProducts));
  return allProducts[index];
};

// Delete product
export const deleteProduct = (id: string): boolean => {
  const allProducts = getAllProducts();
  const filtered = allProducts.filter(product => product.id !== id);
  if (filtered.length === allProducts.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};
