# Template de email post-compra (n8n + Gmail)

## Uso en n8n

1. **Webhook** que recibe el POST del backend (ya configurado) con: `email`, `amount_usd`, `amount_total`, `currency_id`, `created_at`, etc.

2. **(Opcional)** Nodo **Code** o **Set** para formatear datos, por ejemplo:
   - `fechaFormateada`: para mostrar `created_at` en español (ej. "12 de marzo de 2025").
   - Si querés números con separador de miles: usar expresiones como `{{ $json.amount_total.toLocaleString('es-AR') }}` en el HTML.

3. **Gmail** → Enviar email:
   - **To:** `{{ $json.email }}`
   - **Subject:** por ejemplo: `Proyecto 18 – Gracias por tu aporte`
   - **Email Type:** HTML
   - **HTML:** copiar el contenido de `post-compra-cayetano.html` y pegar en el campo. Las expresiones `{{ $json.xxx }}` se reemplazan con los datos del webhook.

## Expresiones en el template

| En el HTML        | Origen (body del webhook) |
|-------------------|---------------------------|
| `{{ $json.email }}` | Email del comprador       |
| `{{ $json.amount_usd }}` | Monto en USD          |
| `{{ $json.amount_total }}` | Monto pagado (ej. ARS) |
| `{{ $json.currency_id }}` | Ej. ARS               |
| `{{ $json.created_at }}` | Fecha/hora del pago (ISO) |

Para el link "Ir a crear cuenta" podés definir la variable de entorno `NEXT_PUBLIC_APP_URL` en n8n o reemplazar la URL fija en el HTML.
