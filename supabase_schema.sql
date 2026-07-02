-- =========================================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS SUPABASE
-- Projeto: Estofados e Decorações (Rafael)
-- =========================================================
-- Execute este script no SQL Editor do painel do Supabase
-- URL do Projeto: https://qtejnzckfxbrcqxmwxim.supabase.co
-- =========================================================

-- 1. Criação da tabela de Produtos (products)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Sofás',
  subcategory TEXT,
  "imageUrl" TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Criação da tabela de Transações Financeiras (transactions)
CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  amount TEXT NOT NULL,
  type TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Habilitar Row Level Security (RLS) nas tabelas
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- 4. Criar políticas públicas de leitura e escrita para Products
DROP POLICY IF EXISTS "Permitir leitura pública de produtos" ON public.products;
CREATE POLICY "Permitir leitura pública de produtos" ON public.products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção pública de produtos" ON public.products;
CREATE POLICY "Permitir inserção pública de produtos" ON public.products
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualização pública de produtos" ON public.products;
CREATE POLICY "Permitir atualização pública de produtos" ON public.products
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir exclusão pública de produtos" ON public.products;
CREATE POLICY "Permitir exclusão pública de produtos" ON public.products
  FOR DELETE USING (true);

-- 5. Criar políticas públicas de leitura e escrita para Transactions
DROP POLICY IF EXISTS "Permitir leitura pública de transações" ON public.transactions;
CREATE POLICY "Permitir leitura pública de transações" ON public.transactions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção pública de transações" ON public.transactions;
CREATE POLICY "Permitir inserção pública de transações" ON public.transactions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualização pública de transações" ON public.transactions;
CREATE POLICY "Permitir atualização pública de transações" ON public.transactions
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir exclusão pública de transações" ON public.transactions;
CREATE POLICY "Permitir exclusão pública de transações" ON public.transactions
  FOR DELETE USING (true);

-- 6. Inserir dados iniciais (seed) caso a tabela de produtos esteja vazia
INSERT INTO public.products (id, title, description, price, category, subcategory, "imageUrl")
VALUES
  ('1', 'Sofá Retrátil Istambul', 'Sofá retrátil e reclinável com 2.50m de largura. Tecido em veludo premium, espuma D33 e molas ensacadas.', '2490.00', 'Sofás', 'Retrátil', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'),
  ('2', 'Poltrona Decorativa Costela', 'Poltrona de design moderno com pés em madeira maciça e estofado capitonê em linho cru.', '1150.00', 'Decoração', 'Poltrona', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80'),
  ('3', 'Colchão Molas Ensacadas', 'Colchão de molas ensacadas com pillow top, garantindo máximo conforto e durabilidade.', '1890.00', 'Cama', 'Colchão', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;
