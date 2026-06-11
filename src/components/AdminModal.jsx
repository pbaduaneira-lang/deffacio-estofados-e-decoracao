import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { resizeAndConvertImage } from '../utils/imageUtils';
import './AdminModal.css';

const AdminModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Sofás',
    subcategory: '',
    imageUrl: ''
  });
  
  const [imageMode, setImageMode] = useState('url'); // 'url' or 'upload'
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
        setImageMode('url'); // Default para link ao editar
      } else {
        setFormData({ title: '', description: '', price: '', category: 'Sofás', subcategory: '', imageUrl: '' });
      }
      setUploadError('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessingImage(true);
    setUploadError('');

    try {
      // Redimensiona e converte para base64
      const base64Image = await resizeAndConvertImage(file);
      setFormData(prev => ({ ...prev, imageUrl: base64Image }));
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;
    onSave(formData);
    setFormData({ title: '', description: '', price: '', category: 'Sofás', subcategory: '', imageUrl: '' });
    setImageMode('url');
    setUploadError('');
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="glass-card modal-content">
        <div className="modal-header">
          <h2>{initialData ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Fechar">
            <X size={24} color="var(--text-main)" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Nome do Produto *</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              className="input-field" 
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Sofá Retrátil Istambul"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Preço (R$) *</label>
            <input 
              type="number" 
              id="price" 
              name="price" 
              className="input-field" 
              value={formData.price}
              onChange={handleChange}
              placeholder="Ex: 2490.00"
              step="0.01"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Seção (Categoria) *</label>
            <select 
              id="category" 
              name="category" 
              className="input-field" 
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Sofás">Sofás</option>
              <option value="Cama">Cama</option>
              <option value="Decoração">Decoração</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subcategory">Subgrupo (Ex: Colchão)</label>
            <input 
              type="text" 
              id="subcategory" 
              name="subcategory" 
              className="input-field" 
              value={formData.subcategory}
              onChange={handleChange}
              placeholder="Opcional"
            />
          </div>
          
          <div className="form-group image-section">
            <label>Imagem do Produto</label>
            
            <div className="image-mode-toggle">
              <button 
                type="button" 
                className={`toggle-btn ${imageMode === 'url' ? 'active' : ''}`}
                onClick={() => setImageMode('url')}
              >
                <LinkIcon size={16} /> Colar Link (URL)
              </button>
              <button 
                type="button" 
                className={`toggle-btn ${imageMode === 'upload' ? 'active' : ''}`}
                onClick={() => setImageMode('upload')}
              >
                <Upload size={16} /> Enviar Arquivo
              </button>
            </div>

            {imageMode === 'url' ? (
              <input 
                type="url" 
                id="imageUrl" 
                name="imageUrl" 
                className="input-field" 
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            ) : (
              <div className="file-upload-container">
                <input 
                  type="file" 
                  id="imageUpload" 
                  accept="image/*" 
                  className="file-input" 
                  onChange={handleFileChange}
                />
                <label htmlFor="imageUpload" className="file-upload-label">
                  <Upload size={24} />
                  <span>Clique para escolher uma foto ou tire com a câmera</span>
                </label>
                
                {isProcessingImage && <p className="processing-text">Otimizando imagem...</p>}
                {uploadError && <p className="error-text">{uploadError}</p>}
              </div>
            )}

            {formData.imageUrl && (
              <div className="image-preview">
                <p>Preview da Imagem:</p>
                <img src={formData.imageUrl} alt="Preview do produto" />
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea 
              id="description" 
              name="description" 
              className="input-field" 
              value={formData.description}
              onChange={handleChange}
              placeholder="Detalhes sobre o produto..."
              rows="4"
            ></textarea>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={isProcessingImage}>
              <Save size={20} /> Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
