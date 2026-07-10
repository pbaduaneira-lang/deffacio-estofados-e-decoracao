# AGENTS.md - Diretrizes de Desenvolvimento e Estrutura do Projeto (Deffacio Estofados & Decorações)

Este documento atua como a documentação técnica canônica e regra de conduta para qualquer agente de IA ou desenvolvedor atuando neste repositório. Sempre consulte e siga estas especificações ao realizar manutenções ou novas implementações.

## 1. Visão Geral e Arquitetura do Sistema
- **Nome do Projeto:** Deffacio Estofados & Decorações (`rafael`)
- **Tipo de Aplicação:** E-commerce / Vitrine Digital e Sistema de Gestão Interna (Loja + Financeiro).
- **Stack Principal:**
  - **Frontend Core:** React 19 + Vite 8 + JavaScript (ESM).
  - **Estilização:** CSS Vanilla com variáveis globais no `:root` (`src/index.css`), componentes CSS isolados e utilitários de Glassmorphism.
  - **Ícones:** `lucide-react`.
  - **Persistência de Dados (Padrão Atual):** `localStorage` e `sessionStorage` no navegador (`src/utils/storage.js`), com suporte e schema preparados para migração futura ao **Supabase** (`supabase_schema.sql`).

## 2. CI/CD, Deploy e Repositório na Nuvem
- **Repositório GitHub:** `https://github.com/pbaduaneira-lang/deffacio-estofados-e-decoracao.git`
- **Ambiente de Deploy:** **Vercel** (conectado via integração contínua do GitHub).
- **Regra de Deploy:** Todo push enviado à branch `main` (`git push origin main`) aciona automaticamente a build (`vite build`) e publica a nova versão no domínio da Vercel em produção. Sempre rode `npm run build` localmente para validar antes de realizar um push.

## 3. Design System e Paleta de Cores (Repaginada de Julho/2026)
A aplicação possui um design claro (*light theme*) luxuoso e elegante, projetado para valorizar estofados e móveis de alto padrão:
- **Variáveis Core (`src/index.css` -> `:root`):**
  - `--bg-color: #FAF9F6`: Fundo *Alabaster / Branco Quente*.
  - `--bg-card: rgba(255, 255, 255, 0.88)`: Cards em *Glassmorphism* com desfoque de fundo (`backdrop-filter: blur(12px)`).
  - `--primary: #8C6C3E`: Cor *Dourado/Taupe Elegante* (usado no ícone "D" da Deffacio, botões de ação primários, aba ativa de categorias e destaques financeiros).
  - `--primary-hover: #735730`: Cor do hover dos botões primários.
  - `--text-main: #1e293b`: *Slate Escuro / Cinza Chumbo* para alta legibilidade e contraste em fundos claros.
  - `--text-muted: #64748b`: Textos secundários, legendas e datas.
  - `--border-color: rgba(140, 108, 62, 0.22)`: Borda sutil em tom taupe/dourado para contornar cards e modais com sofisticação.
- **Botão do WhatsApp (`WhatsAppButton.jsx / .css`):**
  - Exceção à regra do `--primary`: O botão flutuante no canto inferior direito SEMPRE deve usar a cor verde oficial `#25D366` (`background-color: #25D366`) para imediata identificação pelo usuário.

## 4. Estrutura de Diretórios e Arquivos Chave
```text
e:\Rafael\
├── index.html                  # Ponto de entrada HTML com fontes Google (Inter, Tangerine, Montserrat) e Pixel do Meta
├── package.json                # Configurações do projeto e dependências
├── vite.config.js              # Configuração do bundler Vite
├── README.md                   # Documentação pública do repositório
├── supabase_schema.sql         # Estrutura de tabelas SQL para futura sincronização na nuvem
├── .agents/
│   └── AGENTS.md               # Este arquivo de regras técnicas para agentes
└── src/
    ├── main.jsx                # Renderização da raiz React no #root
    ├── App.jsx                 # Componente Master (Estado da loja, navegação das categorias, abas e views)
    ├── App.css                 # Estilos do layout superior (Header, Hero, Categoria Tabs e Grid)
    ├── index.css               # Design Tokens globais (:root, glass, botões, inputs, animações)
    ├── components/
    │   ├── Logo.jsx / .css     # Logotipo customizado ("D" em Tangerine + "DEFFACIO" em Montserrat)
    │   ├── ProductCard.jsx / .css # Card de produto (Foto, preço, tags, botão "Tenho Interesse" e ações de admin)
    │   ├── WhatsAppButton.jsx / .css # Botão flutuante para contato rápido (Verde oficial)
    │   ├── AdminModal.jsx / .css # Modal para criação/edição de produtos (suporte a upload e URL de imagem)
    │   ├── AuthModal.jsx / .css  # Modal de autenticação do administrador (deffacio@gmail.com / rafa123)
    │   └── FinancePanel.jsx / .css # Painel financeiro (resumo de entradas/saídas e tabela de fluxo de caixa)
    └── utils/
        ├── storage.js          # Persistência de dados (@estofados_products, @estofados_transactions, @estofados_session)
        └── imageUtils.js       # Compressão e conversão de imagens em Base64/Canvas para economizar storage local
```

## 5. Abas de Categorias e Ações de Contato (`src/App.jsx`)
- As categorias de filtragem da vitrine são: `Todos`, `Sofás`, `Cama Box`, `Cama Box Baú`, `Cabeceiras` e `Colchões`.
- O botão **"Tenho Interesse"** dentro de cada card de produto (`ProductCard.jsx`) aciona a função `handleContactClick`, gerando uma mensagem automática no WhatsApp contendo o título e o preço do respectivo produto.

## 6. Lógica de Autenticação e Segurança Administrativa
- A autenticação é verificada por `sessionStorage.getItem('@estofados_session')`.
- O login de administrador é processado em `src/utils/storage.js` através das credenciais:
  - **E-mail:** `deffacio@gmail.com`
  - **Senha:** `rafa123`
- Quando logado (`currentUser != null`), o cabeçalho superior exibe os botões de alternância entre a visualização da **Loja**, **Financeiro** e **Novo Produto**, e os cards de produtos revelam os botões de **Editar (`Edit2`)** e **Excluir (`Trash2`)**.

## 7. Regras e Boas Práticas de Contribuição
1. **Preservar Funcionalidades Existentes:** Nunca quebre, remova ou altere o fluxo de funcionamento das abas, do CRUD de produtos ou do painel financeiro ao adicionar novos recursos.
2. **Estilização Consistente:** Sempre utilize as variáveis globais do `index.css` (`var(--primary)`, `var(--bg-card)`, `var(--text-main)`, etc.) ao criar novos componentes para preservar a identidade visual clara e elegante.
3. **Idioma Obrigatório:** Todo comentário explicativo no código, mensagem para o usuário, commit e documentação gerada DEVE ser em **Português Brasileiro (pt-BR)**.
