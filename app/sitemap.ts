import { MetadataRoute } from 'next'
import { getAllPosts, SITE_URL } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  const routes = [
    '',
    '/about',
    '/pricing',
    '/projects',
    '/skills',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ]

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : route === '/projects' || route === '/blog' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/pricing' || route === '/contact' ? 0.9 : route === '/blog' ? 0.85 : 0.8,
  }))

  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticEntries, ...posts]
}
