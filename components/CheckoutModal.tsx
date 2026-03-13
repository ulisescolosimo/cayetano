"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MercadoPagoIcon } from "@/components/icons/MercadoPagoIcon";
import { Paypal } from "@/components/ui/svgs/paypal";

type PaymentProvider = "mercadopago" | "paypal";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState<PaymentProvider>("mercadopago");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (provider === "paypal") {
        const res = await fetch("/api/checkout/create-paypal-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || "Error al iniciar el pago");
          return;
        }
        if (data.approval_url) {
          window.location.href = data.approval_url;
          return;
        }
        setError("No se recibió la URL de pago");
        return;
      }

      const res = await fetch("/api/checkout/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Error al iniciar el pago");
        return;
      }

      if (data.init_point) {
        window.location.href = data.init_point;
        return;
      }
      setError("No se recibió la URL de pago");
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto w-full max-w-md rounded-[16px] p-6 sm:p-8 shadow-xl"
              style={{ backgroundColor: "rgba(80, 80, 80, 0.98)" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start gap-4 mb-5">
                <h2
                  id="checkout-modal-title"
                  className="font-sans text-xl sm:text-2xl font-bold text-white"
                >
                  Sumate como productor
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Cerrar"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="font-sans text-sm sm:text-base text-white/90 mb-5">
                Ingresá el correo con el que querés registrarte. Elegí cómo pagar
                y serás redirigido a pagar USD 18.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-3 py-2.5 rounded-lg font-sans text-sm">
                    {error}
                  </div>
                )}

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Correo para tu cuenta / registro"
                  className="w-full px-4 py-3 rounded-[10px] font-sans text-base text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#318CE7]"
                  required
                  autoComplete="email"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setProvider("mercadopago")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-[10px] font-sans font-medium text-sm border-2 transition-colors ${
                      provider === "mercadopago"
                        ? "border-[#318CE7] bg-[#318CE7]/20 text-white"
                        : "border-white/30 text-white/80 hover:border-white/50"
                    }`}
                  >
                    <MercadoPagoIcon className="h-6 w-auto shrink-0" aria-hidden />
                    Mercado Pago
                  </button>
                  <button
                    type="button"
                    onClick={() => setProvider("paypal")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-[10px] font-sans font-medium text-sm border-2 transition-colors ${
                      provider === "paypal"
                        ? "border-[#008CFF] bg-[#008CFF]/20 text-white"
                        : "border-white/30 text-white/80 hover:border-white/50"
                    }`}
                  >
                    <Paypal className="h-6 w-6 shrink-0" aria-hidden />
                    PayPal
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full rounded-[10px] px-5 py-3.5 text-white font-sans font-bold text-base flex flex-row items-center justify-center gap-2"
                  style={{
                    backgroundColor:
                      provider === "paypal" ? "#008CFF" : "#318CE7",
                    lineHeight: "127%",
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    provider === "paypal"
                      ? "Redirigiendo a PayPal..."
                      : "Redirigiendo a MercadoPago..."
                  ) : (
                    <>
                      <span>Ir a pagar USD 18</span>
                      {provider === "paypal" ? (
                        <Paypal
                          className="h-7 w-7 shrink-0"
                          aria-hidden
                        />
                      ) : (
                        <MercadoPagoIcon
                          className="h-7 w-auto shrink-0"
                          aria-hidden
                        />
                      )}
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
