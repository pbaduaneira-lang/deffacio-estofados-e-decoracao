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
- Aba especial de "Reformas" que abre diretamente o WhatsApp para orçamentos de reformas e consertos.
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

## 🎨 Design System e Identidade Visual (Repaginada 2026)
O visual da aplicação foi completamente repaginado em julho/2026 para transmitir máxima elegância, clareza e requinte, alinhado à marca **Deffacio Estofados & Decorações**:
- **Paleta de Cores (`src/index.css`):**
  - `--bg-color: #FAF9F6` (*Alabaster / Branco Quente Luxuoso*): Fundo claro e limpo que valoriza as fotografias dos estofados.
  - `--primary: #8C6C3E` (*Dourado / Taupe Elegante*): Cor primária utilizada no logotipo, botões principais de ação e aba ativa.
  - `--primary-hover: #735730`: Tom escurecido para interatividade ao passar o mouse (*hover*).
  - `--text-main: #1e293b` (*Cinza Chumbo / Slate Escuro*): Contraste nítido para legibilidade de títulos e descrições sem cansar a visão.
  - `--bg-card: rgba(255, 255, 255, 0.88)` (*Glassmorphism Limpo*): Cartões translúcidos com efeito de desfoque (*backdrop-filter: blur(12px)*) e borda dourada suave (`rgba(140, 108, 62, 0.22)`).
- **Botão Oficial do WhatsApp:**
  - Independentemente do tema, o botão flutuante no canto inferior direito (`src/components/WhatsAppButton.jsx`) mantém estritamente o verde oficial `#25D366` para fácil reconhecimento do cliente.

## 📝 Resumo de Estrutura de Pastas e Componentes
- `/src/components`: Componentes reutilizáveis como `ProductCard`, `AuthModal`, `AdminModal`, `FinancePanel`, `Logo` e `WhatsAppButton`.
- `/src/utils`: Funções utilitárias como `storage.js` (comunicação com banco local / Supabase opcional) e `imageUtils.js` (redimensionamento e compressão de imagens antes do salvamento).
- `App.jsx`: Componente principal que gerencia o estado da aplicação, as abas de categoria (*Todos, Sofás, Cama, Decoração, Reformas*) e a navegação entre a Loja e os painéis de Admin.

---
*Documentação mantida e atualizada continuamente por Antigravity (Gravi) para garantir que qualquer desenvolvedor ou agente de IA conheça 100% da arquitetura, do design system e da integração contínua (Vercel + GitHub) do projeto.*
