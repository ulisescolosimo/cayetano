-- Tabla de pagos (aporte único USD 18, cobro en ARS vía MercadoPago)
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  preference_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_id TEXT,
  email TEXT NOT NULL,
  amount_usd NUMERIC(10,2) NOT NULL DEFAULT 18,
  amount_total NUMERIC(12,2) NOT NULL,
  currency_id TEXT NOT NULL DEFAULT 'ARS',
  dolar_rate_used NUMERIC(12,4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(email);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_preference_id ON payments(preference_id);

-- RLS: la tabla se gestiona desde el backend con service role (sin políticas para anon)
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Política: ningún acceso con anon key (solo service role desde API)
-- No creamos políticas SELECT/INSERT/UPDATE para anon; el GET de email por payment_id se hace vía API con service role.

-- Trigger para actualizar updated_at
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
