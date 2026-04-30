import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PageContainer } from "@/components/layout/page-container"
import { BlogMarkdown } from "@/components/blog/blog-markdown"
import { BlogPostHeader } from "@/components/blog/blog-post-header"
import { BlogPostFooter } from "@/components/blog/blog-post-footer"
import { BlogReadingProgress } from "@/components/blog/blog-reading-progress"
import {
  BLOG_AUTHOR,
  getAllPosts,
  getCanonicalUrl,
  getOgImageForPost,
  getPostBySlug,
  SITE_URL,
  type BlogPost,
} from "@/lib/blog"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || post.draft) {
    notFound()
  }

  const canonical = getCanonicalUrl(slug, post)
  const ogImage = getOgImageForPost(post)
  const modified = post.updated ?? post.date

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: BLOG_AUTHOR, url: SITE_URL }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: modified,
      authors: [BLOG_AUTHOR],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  }
}

function articleJsonLd(post: BlogPost, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [getOgImageForPost(post)],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: BLOG_AUTHOR,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BLOG_AUTHOR,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon-48.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    keywords: post.tags?.join(", "),
    inLanguage: "en-US",
  }
}

function breadcrumbJsonLd(post: BlogPost, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: pageUrl,
      },
    ],
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || post.draft) {
    notFound()
  }

  const pageUrl = getCanonicalUrl(slug, post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(post, pageUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(post, pageUrl)),
        }}
      />
      <PageContainer>
        <BlogReadingProgress />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 md:px-0 pb-24 md:pb-28">
          <article>
            <BlogPostHeader post={post} />
            <div className="border-t border-zinc-200/70 pt-10 dark:border-zinc-800/80">
              <BlogMarkdown content={post.content} />
            </div>
            <BlogPostFooter />
          </article>
        </div>
      </PageContainer>
    </>
  )
}

export const dynamicParams = false
