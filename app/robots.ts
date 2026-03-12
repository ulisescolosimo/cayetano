import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://proyecto18.orsai.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/perfil', '/miembros', '/aporte-exitoso', '/aporte-pendiente', '/aporte-error'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
