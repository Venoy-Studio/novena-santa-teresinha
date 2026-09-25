-- ==============================================================================
-- 🌹 NOVENA DAS ROSAS DE SANTA TERESINHA - ESQUEMA SUPABASE (POSTGRESQL)
-- ==============================================================================
-- Instruções:
-- 1. Acesse o painel do seu projeto no Supabase (https://supabase.com/dashboard)
-- 2. No menu lateral esquerdo, clique no ícone "SQL Editor"
-- 3. Clique em "+ New query", cole todo este código e clique no botão "Run" (Executar)
-- 4. Copie as chaves do seu projeto em "Project Settings" > "API":
--    - Project URL
--    - Project API anon/public key
-- 5. Adicione-as no seu arquivo .env.local (veja o arquivo .env.example)
-- ==============================================================================

-- 1. Criação da Tabela de Velas Votivas (candles)
CREATE TABLE IF NOT EXISTS public.candles (
  id TEXT PRIMARY KEY,
  devotee_name TEXT NOT NULL,
  location TEXT,
  intention TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('7_days', '24_hours')),
  saint_id TEXT NOT NULL,
  saint_name TEXT NOT NULL,
  saint_image TEXT NOT NULL,
  lit_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  duration_hours INTEGER NOT NULL DEFAULT 24,
  prayer_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Índices de Alta Performance para Ordenação e Filtros
CREATE INDEX IF NOT EXISTS idx_candles_lit_at ON public.candles (lit_at DESC);
CREATE INDEX IF NOT EXISTS idx_candles_type ON public.candles (type);

-- 3. Ativação do Row Level Security (RLS) para Segurança
ALTER TABLE public.candles ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas se já existirem
DROP POLICY IF EXISTS "Permitir leitura pública de todas as velas" ON public.candles;
DROP POLICY IF EXISTS "Permitir acendimento de velas a qualquer devoto" ON public.candles;
DROP POLICY IF EXISTS "Permitir oração comunitária nas velas" ON public.candles;

-- Política 1: Leitura aberta para todos verem as velas na capela
CREATE POLICY "Permitir leitura pública de todas as velas" 
  ON public.candles 
  FOR SELECT 
  USING (true);

-- Política 2: Inserção aberta para qualquer devoto acender sua vela
CREATE POLICY "Permitir acendimento de velas a qualquer devoto" 
  ON public.candles 
  FOR INSERT 
  WITH CHECK (true);

-- Política 3: Permite atualizar contadores de preces ("Rezar Junto")
CREATE POLICY "Permitir oração comunitária nas velas" 
  ON public.candles 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

-- 4. Função Atômica (Stored Procedure) para Incrementar Orações com Segurança
CREATE OR REPLACE FUNCTION public.increment_candle_prayer(target_candle_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.candles
  SET prayer_count = COALESCE(prayer_count, 0) + 1
  WHERE id = target_candle_id;
END;
$$;

-- 5. Habilitação do Supabase Realtime (WebSockets ao vivo para todos os fiéis)
BEGIN;
  -- Garante que o recurso de replicação completa esteja ativado
  ALTER TABLE public.candles REPLICA IDENTITY FULL;
  -- Adiciona à publicação oficial do realtime
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables 
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'candles'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.candles;
    END IF;
  END
  $$;
COMMIT;

-- 6. Tabela de Devotos (Visitantes Cadastrados com Nome e Santo de Devoção)
CREATE TABLE IF NOT EXISTS public.devotees (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  favorite_saint TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.devotees ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir cadastro de devotos" ON public.devotees;
DROP POLICY IF EXISTS "Permitir leitura de devotos" ON public.devotees;
DROP POLICY IF EXISTS "Permitir atualização de devoto" ON public.devotees;

CREATE POLICY "Permitir cadastro de devotos" ON public.devotees FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura de devotos" ON public.devotees FOR SELECT USING (true);
CREATE POLICY "Permitir atualização de devoto" ON public.devotees FOR UPDATE USING (true) WITH CHECK (true);

-- 7. Tabela de Intenções Gravadas no Caderno de Oração
CREATE TABLE IF NOT EXISTS public.intentions (
  id TEXT PRIMARY KEY,
  devotee_name TEXT,
  intention TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.intentions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir registro de intenções" ON public.intentions;
DROP POLICY IF EXISTS "Permitir leitura de intenções" ON public.intentions;

CREATE POLICY "Permitir registro de intenções" ON public.intentions FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura de intenções" ON public.intentions FOR SELECT USING (true);


-- 6. Sementes Iniciais (Velas Devocionais da Comunidade)
INSERT INTO public.candles (
  id, devotee_name, location, intention, type, saint_id, saint_name, saint_image, lit_at, duration_hours, prayer_count
) VALUES 
(
  'candle-seed-1',
  'Maria Aparecida dos Santos',
  'Aparecida - SP',
  'Pela saúde e recuperação do meu esposo no hospital e pela paz e união em nosso lar.',
  '7_days',
  'santa-teresinha',
  'Santa Teresinha do Menino Jesus',
  '/images/santa-teresinha.jpg',
  timezone('utc'::text, now()) - INTERVAL '36 hours',
  168,
  42
),
(
  'candle-seed-2',
  'Padre Lucas Mendonça',
  'Belo Horizonte - MG',
  'Por todas as vocações sacerdotais e religiosas, especialmente pelos seminaristas do Carmelo.',
  '7_days',
  'santa-teresinha',
  'Santa Teresinha do Menino Jesus',
  '/images/santa-teresinha.jpg',
  timezone('utc'::text, now()) - INTERVAL '12 hours',
  168,
  87
),
(
  'candle-seed-3',
  'Carlos Eduardo & Família',
  'Curitiba - PR',
  'Em ação de graças por uma bênção de trabalho alcançada pela intercessão de São José.',
  '24_hours',
  'sao-jose',
  'São José',
  '/images/sao-jose.jpg',
  timezone('utc'::text, now()) - INTERVAL '4 hours',
  24,
  19
),
(
  'candle-seed-4',
  'Irmã Maria do Carmo',
  'Fortaleza - CE',
  'Pelos jovens aflitos, dependentes e desesperançados, para que encontrem a Pequena Via do Amor.',
  '7_days',
  'santa-teresinha',
  'Santa Teresinha do Menino Jesus',
  '/images/santa-teresinha.jpg',
  timezone('utc'::text, now()) - INTERVAL '20 hours',
  168,
  63
),
(
  'candle-seed-5',
  'Bernardo e Helena',
  'Lisboa - Portugal',
  'Pela gestação do nosso primeiro filho e proteção sob o manto da Virgem do Carmo.',
  '24_hours',
  'ns-carmo',
  'Nossa Senhora do Carmo',
  '/images/ns-carmo.jpg',
  timezone('utc'::text, now()) - INTERVAL '8 hours',
  24,
  31
)
ON CONFLICT (id) DO NOTHING;
