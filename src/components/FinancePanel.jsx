import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Trash2, Calendar } from 'lucide-react';
import { getTransactions, addTransaction, deleteTransaction } from '../utils/storage';
import './FinancePanel.css';

const FinancePanel = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    type: 'entrada' // 'entrada' ou 'saida'
  });

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;
    
    const saved = addTransaction(formData);
    setTransactions([saved, ...transactions]);
    setFormData(prev => ({ ...prev, description: '', amount: '' }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Excluir este lançamento?')) {
      deleteTransaction(id);
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  // Cálculos de resumo
  const totals = transactions.reduce((acc, curr) => {
    const val = Number(curr.amount);
    if (curr.type === 'entrada') acc.in += val;
    else acc.out += val;
    return acc;
  }, { in: 0, out: 0 });
  
  const balance = totals.in - totals.out;

  // Formatador de Moeda e Data
  const formatMoney = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="finance-container animate-fade-in">
      
      {/* Cards de Resumo */}
      <div className="finance-summary">
        <div className="summary-card">
          <div className="summary-icon"><TrendingUp size={24} color="#10b981" /></div>
          <div className="summary-info">
            <p>Entradas</p>
            <h3 className="text-green">{formatMoney(totals.in)}</h3>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon"><TrendingDown size={24} color="#ef4444" /></div>
          <div className="summary-info">
            <p>Saídas</p>
            <h3 className="text-red">{formatMoney(totals.out)}</h3>
          </div>
        </div>
        <div className="summary-card highlight">
          <div className="summary-icon"><DollarSign size={24} color="var(--primary)" /></div>
          <div className="summary-info">
            <p>Saldo Total</p>
            <h3 className={balance >= 0 ? 'text-green' : 'text-red'}>{formatMoney(balance)}</h3>
          </div>
        </div>
      </div>

      {/* Formulário de Novo Lançamento */}
      <div className="glass-card finance-form-card">
        <h3>Novo Lançamento</h3>
        <form onSubmit={handleSubmit} className="finance-form">
          <div className="form-group row-group">
            <div className="input-col">
              <label>Data</label>
              <input type="date" name="date" className="input-field" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="input-col">
              <label>Tipo</label>
              <select name="type" className="input-field" value={formData.type} onChange={handleChange}>
                <option value="entrada">Receita (Entrada)</option>
                <option value="saida">Despesa (Saída)</option>
              </select>
            </div>
          </div>
          <div className="form-group row-group">
            <div className="input-col" style={{ flex: 2 }}>
              <label>Descrição</label>
              <input type="text" name="description" className="input-field" placeholder="Ex: Venda de Sofá Istambul" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="input-col">
              <label>Valor (R$)</label>
              <input type="number" name="amount" className="input-field" placeholder="0.00" step="0.01" value={formData.amount} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Adicionar Registro</button>
          </div>
        </form>
      </div>

      {/* Tabela de Movimentações */}
      <div className="glass-card finance-table-card">
        <h3>Histórico de Movimentações</h3>
        <div className="table-responsive">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th className="text-right">Entrada</th>
                <th className="text-right">Saída</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state-table">Nenhum registro encontrado.</td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id}>
                    <td className="col-date"><Calendar size={14} className="icon-inline"/> {formatDate(t.date)}</td>
                    <td className="col-desc">{t.description}</td>
                    <td className="text-right text-green">
                      {t.type === 'entrada' ? formatMoney(t.amount) : '-'}
                    </td>
                    <td className="text-right text-red">
                      {t.type === 'saida' ? formatMoney(t.amount) : '-'}
                    </td>
                    <td className="col-action">
                      <button className="icon-btn delete-btn" onClick={() => handleDelete(t.id)} title="Excluir">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancePanel;
