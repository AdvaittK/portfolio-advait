import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advait | Developer for Agencies and Brands',
  description: 'I build fast, clear websites for agencies, coaches and industrial brands, working with clients worldwide.',
  generator: 'Advait',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#2d2d2d'
      }
    ]
  },
  manifest: '/site.webmanifest',
}
