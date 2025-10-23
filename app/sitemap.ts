import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.advaitt.tech'
  
  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/skills',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : route === '/projects' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/services' || route === '/contact' ? 0.9 : 0.8,
  }))
}

