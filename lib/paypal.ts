/**
 * Utilidades para la API de PayPal (Orders v2).
 * Siempre usamos producción (api-m.paypal.com). No usamos sandbox.
 */

const PAYPAL_AMOUNT_USD = 18

const PAYPAL_BASE_URL = 'https://api-m.paypal.com'

function getBaseUrl(): string {
  return PAYPAL_BASE_URL
}

export async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID?.trim()
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET?.trim()
  if (!clientId || !clientSecret) {
    throw new Error('PAYPAL_CLIENT_ID o PAYPAL_CLIENT_SECRET no configurados')
  }
  const base = getBaseUrl()
  if (process.env.NODE_ENV === 'development') {
    console.log('[PayPal] API producción →', base)
  }
  const auth = Buffer.from(`${clientId}:${clientSecret}`, 'utf-8').toString('base64')
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PayPal token error: ${res.status} ${text}`)
  }
  const data = (await res.json()) as { access_token?: string }
  if (!data.access_token) throw new Error('PayPal no devolvió access_token')
  return data.access_token
}

export interface CreateOrderParams {
  paymentId: string
  email: string
  returnUrl: string
  cancelUrl: string
}

export interface CreateOrderResult {
  orderId: string
  approvalUrl: string
}

export async function createPayPalOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
  const { paymentId, returnUrl, cancelUrl } = params
  const token = await getPayPalAccessToken()
  const base = getBaseUrl()
  const amountValue = Number(PAYPAL_AMOUNT_USD).toFixed(2)
  const body = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: paymentId,
        description: 'Aporte único - Productor del programa (USD 18)',
        amount: {
          currency_code: 'USD',
          value: amountValue,
        },
      },
    ],
    application_context: {
      brand_name: 'Cayetano',
      landing_page: 'NO_PREFERENCE',
      return_url: returnUrl,
      cancel_url: cancelUrl,
      user_action: 'PAY_NOW',
    },
  }
  const res = await fetch(`${base}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'PayPal-Request-Id': paymentId,
    },
    body: JSON.stringify(body),
  })
  const data = (await res.json()) as {
    id?: string
    links?: Array<{ rel: string; href: string }>
    message?: string
  }
  if (!res.ok) {
    throw new Error(data?.message || `PayPal create order: ${res.status}`)
  }
  const orderId = data.id
  const approveLink = data.links?.find((l) => l.rel === 'approve')
  const approvalUrl = approveLink?.href
  if (!orderId || !approvalUrl) {
    throw new Error('PayPal no devolvió order id o URL de aprobación')
  }
  return { orderId, approvalUrl }
}

export async function capturePayPalOrder(orderId: string): Promise<{ captureId?: string }> {
  const token = await getPayPalAccessToken()
  const base = getBaseUrl()
  const res = await fetch(`${base}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: '{}',
  })
  const data = (await res.json()) as {
    status?: string
    id?: string
    purchase_units?: Array<{
      payments?: { captures?: Array<{ id?: string }> }
    }>
    message?: string
  }
  if (!res.ok) {
    throw new Error(data?.message || `PayPal capture: ${res.status}`)
  }
  const captureId = data.purchase_units?.[0]?.payments?.captures?.[0]?.id
  return { captureId }
}

export function getPayPalAmountUsd(): number {
  return PAYPAL_AMOUNT_USD
}
