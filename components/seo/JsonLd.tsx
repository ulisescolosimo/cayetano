const siteUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://proyecto18.orsai.app'

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Proyecto 18',
  alternateName: 'Proyecto 18 - La previa de la copa',
  url: siteUrl,
  description: 'La previa la hacemos nosotros. Unite al proyecto más ambicioso del fútbol: 18 hinchas viajando al Mundial 2026.',
  inLanguage: 'es-AR',
  potentialAction: {
    '@type': 'JoinAction',
    target: {
      '@type': 'EntryPoint',
      url: `${siteUrl}/#sumate`,
    },
    name: 'Sumate al Proyecto 18',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Proyecto 18',
  url: siteUrl,
  description: '18 hinchas viajando al Mundial 2026. La previa de la copa.',
  sameAs: [],
}

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
