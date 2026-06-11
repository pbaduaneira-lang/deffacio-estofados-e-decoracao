import React, { useState } from 'react';
import { X, LogIn } from 'lucide-react';
import { loginAdmin } from '../utils/storage';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const user = loginAdmin(email, password);
      onLoginSuccess(user);
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="glass-card modal-content auth-modal">
        <div className="modal-header">
          <h2>Acesso Restrito</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Fechar">
            <X size={24} color="var(--text-main)" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          {errorMsg && <div className="error-alert">{errorMsg}</div>}
          
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          
          <div className="modal-footer auth-footer">
            <button type="submit" className="btn btn-primary auth-submit-btn">
              <LogIn size={20} /> Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
