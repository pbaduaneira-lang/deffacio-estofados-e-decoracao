const STORAGE_KEY = '@estofados_products';

/**
 * Retorna todos os produtos do banco de dados local.
 */
export const getProducts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao ler produtos:', error);
    return [];
  }
};

/**
 * Salva a lista completa de produtos no banco de dados local.
 * @param {Array} products 
 */
export const saveProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
  }
};

/**
 * Adiciona um novo produto ao banco de dados local.
 * @param {Object} product 
 */
export const addProduct = (product) => {
  const currentProducts = getProducts();
  const newProduct = {
    ...product,
    id: Date.now().toString(), // Gera um ID único simples
    createdAt: new Date().toISOString()
  };
  saveProducts([newProduct, ...currentProducts]);
  return newProduct;
};

export const updateProduct = (updatedProduct) => {
  const products = getProducts();
  const updatedList = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
  saveProducts(updatedList);
  return updatedProduct;
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const filteredList = products.filter(p => p.id !== id);
  saveProducts(filteredList);
};

/**
 * Preenche o banco com produtos fictícios iniciais se estiver vazio.
 */
export const seedInitialData = () => {
  const currentProducts = getProducts();
  if (currentProducts.length === 0) {
    const initialProducts = [
      {
        id: '1',
        title: 'Sofá Retrátil Istambul',
        description: 'Sofá retrátil e reclinável com 2.50m de largura. Tecido em veludo premium, espuma D33 e molas ensacadas.',
        price: '2490.00',
        category: 'Sofás',
        subcategory: 'Retrátil',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '2',
        title: 'Poltrona Decorativa Costela',
        description: 'Poltrona de design moderno com pés em madeira maciça e estofado capitonê em linho cru.',
        price: '1150.00',
        category: 'Decoração',
        subcategory: 'Poltrona',
        imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '3',
        title: 'Colchão Molas Ensacadas',
        description: 'Colchão de molas ensacadas com pillow top, garantindo máximo conforto e durabilidade.',
        price: '1890.00',
        category: 'Cama',
        subcategory: 'Colchão',
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
      }
    ];
    saveProducts(initialProducts);
  }
};

// --- FINANCEIRO ---
const TRANSACTIONS_KEY = '@estofados_transactions';

export const getTransactions = () => {
  try {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const saveTransactions = (transactions) => {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const addTransaction = (transaction) => {
  const transactions = getTransactions();
  const newTransaction = {
    ...transaction,
    id: Date.now().toString()
  };
  saveTransactions([newTransaction, ...transactions]);
  return newTransaction;
};

export const deleteTransaction = (id) => {
  const transactions = getTransactions();
  saveTransactions(transactions.filter(t => t.id !== id));
};

// --- AUTENTICAÇÃO ---

export const loginAdmin = (email, password) => {
  const adminEmail = 'deffacio@gmail.com';
  const adminPass = 'Rafael1234';

  if (email === adminEmail && password === adminPass) {
    return { id: 'admin-1', email };
  } else {
    throw new Error('E-mail ou senha incorretos.');
  }
};
