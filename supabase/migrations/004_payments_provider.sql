-- Añadir proveedor de pago (mercadopago | paypal) para distinguir el origen del pago
ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS provider TEXT NOT NULL DEFAULT 'mercadopago';

-- Índice para filtrar por proveedor si se necesita
CREATE INDEX IF NOT EXISTS idx_payments_provider ON payments(provider);

-- Comentario para documentar valores esperados
COMMENT ON COLUMN payments.provider IS 'Proveedor de pago: mercadopago | paypal';
