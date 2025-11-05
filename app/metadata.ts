import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advait | Developer Portfolio',
  keywords: ['Advait', 'Portfolio', 'Web Developer', 'UI Designer'],
  description: 'Crafting performant web apps, clean UIs, and delightful user experiences.',
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