import React, { useState, useEffect } from 'react';
import { PlusCircle, ShoppingBag, User, LogOut } from 'lucide-react';
import { getProducts, seedInitialData, addProduct, updateProduct, deleteProduct } from './utils/storage';
import ProductCard from './components/ProductCard';
import WhatsAppButton from './components/WhatsAppButton';
import AdminModal from './components/AdminModal';
import AuthModal from './components/AuthModal';
import Logo from './components/Logo';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    // Inicializa o banco com dados falsos caso esteja vazio
    seedInitialData();
    // Carrega os produtos do localStorage
    setProducts(getProducts());
    
    // Verifica se há usuário logado na sessão atual
    const savedUser = sessionStorage.getItem('@estofados_session');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleSaveProduct = (formData) => {
    if (productToEdit) {
      const updated = updateProduct(formData);
      setProducts(products.map(p => p.id === updated.id ? updated : p));
    } else {
      const savedProduct = addProduct(formData);
      setProducts([savedProduct, ...products]);
    }
    setIsAdminOpen(false);
    setProductToEdit(null);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsAdminOpen(true);
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`Tem certeza que deseja excluir "${product.title}"?`)) {
      deleteProduct(product.id);
      setProducts(products.filter(p => p.id !== product.id));
    }
  };

  const handleContactClick = (product) => {
    const message = `Olá! Gostaria de saber mais sobre o produto: *${product.title}* (R$ ${product.price}). Poderia me ajudar?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5544998324148?text=${encodedMessage}`, '_blank');
  };

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    sessionStorage.setItem('@estofados_session', JSON.stringify(user));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('@estofados_session');
  };

  return (
    <div className="app-container">
      <header className="app-header glass">
        <div className="container header-content">
          <div className="logo">
            <Logo />
          </div>
          
          <div className="header-actions">
            {currentUser ? (
              <>
                <button 
                  className="btn btn-outline admin-btn"
                  onClick={() => {
                    setProductToEdit(null);
                    setIsAdminOpen(true);
                  }}
                >
                  <PlusCircle size={20} />
                  <span className="hide-mobile">Novo Produto</span>
                </button>
                <button 
                  className="btn text-btn logout-btn"
                  onClick={handleLogout}
                  title="Sair"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <button 
                className="btn btn-primary admin-btn"
                onClick={() => setIsAuthOpen(true)}
              >
                <User size={20} />
                <span className="hide-mobile">Administrador</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="container main-content">
        <section className="hero">
          <h2 className="animate-fade-in">Transforme sua casa com elegância</h2>
          <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Camas, sofás e decorações para renovar seu espaço, além de serviços especializados de reforma e conserto para cuidar do que você já ama.
          </p>
        </section>

        <section className="category-tabs">
          {['Todos', 'Sofás', 'Cama', 'Decoração'].map(cat => (
            <button 
              key={cat}
              className={`cat-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
          <button 
            className="cat-tab"
            onClick={() => {
              const msg = encodeURIComponent("Olá! Gostaria de fazer um orçamento para serviços de reforma e conserto.");
              window.open(`https://wa.me/5544998324148?text=${msg}`, '_blank');
            }}
          >
            Serviços
          </button>
        </section>

        <section className="products-grid">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
              <ProductCard 
                product={product} 
                onContactClick={handleContactClick} 
                isAdmin={!!currentUser}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <p>Nenhum produto cadastrado nesta categoria ainda.</p>
            </div>
          )}
        </section>
      </main>

      <WhatsAppButton />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => {
          setIsAdminOpen(false);
          setProductToEdit(null);
        }}
        onSave={handleSaveProduct}
        initialData={productToEdit}
      />
    </div>
  );
}

export default App;
