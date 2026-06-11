import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onContactClick, isAdmin, onEdit, onDelete }) => {
  // Formatar o preço para BRL
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(product.price));

  return (
    <div className="glass-card product-card">
      <div className="product-image-container">
        <img 
          src={product.imageUrl || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80'} 
          alt={product.title} 
          className="product-image"
          loading="lazy"
        />
        <div className="product-price-badge">{formattedPrice}</div>
        
        {isAdmin && (
          <div className="admin-actions">
            <button className="admin-action-btn edit" onClick={() => onEdit(product)} title="Editar Produto">
              <Edit2 size={16} />
            </button>
            <button className="admin-action-btn delete" onClick={() => onDelete(product)} title="Excluir Produto">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      <div className="product-content">
        {product.category && (
          <div className="product-tags">
            <span className="tag category-tag">{product.category}</span>
            {product.subcategory && <span className="tag subcategory-tag">{product.subcategory}</span>}
          </div>
        )}
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <button 
          className="btn btn-primary product-action-btn"
          onClick={() => onContactClick(product)}
        >
          Tenho Interesse
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
