# Deffacio Estofados e Decorações

Projeto criado para a gestão e vitrine online da loja de estofados e decorações, com painel administrativo e sistema financeiro integrados.

## 🚀 Tecnologias Utilizadas
- **Frontend:** React + Vite
- **Estilização:** CSS Vanilla (com design moderno, glassmorphism e responsividade)
- **Ícones:** Lucide React
- **Banco de Dados:** LocalStorage (Navegador) do administrador/cliente
- **Hospedagem:** Vercel (CI/CD automático via GitHub)

## 🌐 Deploy e Repositório
- **Repositório GitHub:** `https://github.com/pbaduaneira-lang/deffacio-estofados-e-decoracao.git`
- **Deploy:** A cada push na branch `main`, a Vercel compila e atualiza o site automaticamente em produção.

## 🔐 Acesso Administrativo
O site possui um painel administrativo oculto. Para acessá-lo, clique no botão "Administrador" (ícone de usuário) na página inicial.
- **E-mail:** `deffacio@gmail.com`
- **Senha:** `rafa123`
*(As credenciais estão fixadas por segurança no arquivo `src/utils/storage.js` na função `loginAdmin`, evitando cadastros não autorizados).*

## 📦 Banco de Dados Local (LocalStorage)
O projeto não utiliza backend externo, todos os dados são salvos no navegador do administrador utilizando chaves específicas:
- `@estofados_products`: Armazena a lista de produtos (CRUD completo).
- `@estofados_transactions`: Armazena o fluxo de caixa (entradas e saídas).
- `@estofados_session`: Mantém o usuário logado para que a página não deslogue ao atualizar.

## 🛠 Funcionalidades Implementadas
### Vitrine Pública (Cliente)
- Exibição de produtos em formato de "Cards" com imagens e preços formatados.
- Filtros por categorias (Todos, Sofás, Cama, Decoração).
- Aba especial de "Serviços" que abre diretamente o WhatsApp para orçamentos de reformas.
- Botão do WhatsApp flutuante e botão "Comprar/Orçar" em cada produto.

### Painel Administrativo (Admin)
- **Modo Loja (CRUD de Produtos):**
  - Adição de novos produtos (via Upload local ou URL de Imagem).
  - Edição de produtos existentes (ícone de lápis em cima das fotos).
  - Exclusão de produtos com alerta de confirmação (ícone de lixeira).
- **Modo Financeiro (Fluxo de Caixa):**
  - Dashboard com resumo de Totais de Entrada, Saída e Saldo Atual.
  - Tabela com histórico completo de movimentações.
  - Formulário simplificado para lançar novas receitas ou despesas diárias.

## 📝 Resumo de Estrutura de Pastas
- `/src/components`: Componentes reutilizáveis como `ProductCard`, `AuthModal`, `AdminModal`, `FinancePanel`, `Logo` e `WhatsAppButton`.
- `/src/utils`: Funções utilitárias como `storage.js` (comunicação com banco local) e `imageUtils.js` (redimensionamento de imagens).
- `App.jsx`: Componente principal que gerencia o estado da aplicação e a navegação entre Cliente, Admin Loja e Admin Financeiro.

---
*Documentação gerada por Antigravity (Gravi) para continuar o projeto de onde paramos a qualquer momento.*
