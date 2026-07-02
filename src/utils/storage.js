import { supabase } from './supabase';

const STORAGE_KEY = '@estofados_products';
const TRANSACTIONS_KEY = '@estofados_transactions';

// Funções auxiliares locais de fallback
const getProductsLocal = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const saveProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Erro ao salvar produtos localmente:', error);
  }
};

/**
 * Retorna todos os produtos (prioriza Supabase, fallback para localStorage).
 */
export const getProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('createdAt', { ascending: false });

    if (!error && data) {
      // Normaliza nomes de colunas caso venham em snake_case ou camelCase
      const normalized = data.map(item => ({
        ...item,
        imageUrl: item.imageUrl || item.image_url,
        createdAt: item.createdAt || item.created_at
      }));
      saveProducts(normalized);
      return normalized;
    }
    if (error) {
      console.warn('Supabase getProducts aviso (usando cache local):', error.message);
    }
  } catch (error) {
    console.error('Erro ao conectar com Supabase em getProducts:', error);
  }
  return getProductsLocal();
};

/**
 * Adiciona um novo produto ao Supabase e ao cache local.
 * @param {Object} product 
 */
export const addProduct = async (product) => {
  const newProduct = {
    ...product,
    id: product.id || Date.now().toString(),
    createdAt: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select()
      .single();

    if (error) {
      console.warn('Erro ao inserir no Supabase (salvando local):', error.message);
    } else if (data) {
      const current = getProductsLocal();
      saveProducts([data, ...current]);
      return data;
    }
  } catch (error) {
    console.error('Erro em addProduct Supabase:', error);
  }

  const current = getProductsLocal();
  saveProducts([newProduct, ...current]);
  return newProduct;
};

/**
 * Atualiza um produto no Supabase e no cache local.
 */
export const updateProduct = async (updatedProduct) => {
  try {
    const { error } = await supabase
      .from('products')
      .update(updatedProduct)
      .eq('id', updatedProduct.id);

    if (error) {
      console.warn('Erro ao atualizar no Supabase:', error.message);
    }
  } catch (error) {
    console.error('Erro em updateProduct Supabase:', error);
  }

  const products = getProductsLocal();
  const updatedList = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
  saveProducts(updatedList);
  return updatedProduct;
};

/**
 * Remove um produto do Supabase e do cache local.
 */
export const deleteProduct = async (id) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.warn('Erro ao deletar no Supabase:', error.message);
    }
  } catch (error) {
    console.error('Erro em deleteProduct Supabase:', error);
  }

  const products = getProductsLocal();
  const filteredList = products.filter(p => p.id !== id);
  saveProducts(filteredList);
};

/**
 * Preenche o banco com produtos fictícios iniciais se estiver vazio.
 */
export const seedInitialData = async () => {
  const currentProducts = await getProducts();
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

    try {
      await supabase.from('products').insert(initialProducts);
    } catch (error) {
      console.warn('Erro ao fazer seed no Supabase:', error);
    }

    saveProducts(initialProducts);
  }
};

// --- FINANCEIRO ---
const getTransactionsLocal = () => {
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

export const getTransactions = async () => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });

    if (!error && data) {
      const normalized = data.map(item => ({
        ...item,
        createdAt: item.createdAt || item.created_at
      }));
      saveTransactions(normalized);
      return normalized;
    }
    if (error) {
      console.warn('Supabase getTransactions aviso (usando cache local):', error.message);
    }
  } catch (error) {
    console.error('Erro ao conectar com Supabase em getTransactions:', error);
  }
  return getTransactionsLocal();
};

export const addTransaction = async (transaction) => {
  const newTransaction = {
    ...transaction,
    id: transaction.id || Date.now().toString(),
    createdAt: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert([newTransaction])
      .select()
      .single();

    if (error) {
      console.warn('Erro ao inserir transação no Supabase:', error.message);
    } else if (data) {
      const current = getTransactionsLocal();
      saveTransactions([data, ...current]);
      return data;
    }
  } catch (error) {
    console.error('Erro em addTransaction Supabase:', error);
  }

  const current = getTransactionsLocal();
  saveTransactions([newTransaction, ...current]);
  return newTransaction;
};

export const deleteTransaction = async (id) => {
  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      console.warn('Erro ao deletar transação no Supabase:', error.message);
    }
  } catch (error) {
    console.error('Erro em deleteTransaction Supabase:', error);
  }

  const transactions = getTransactionsLocal();
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
