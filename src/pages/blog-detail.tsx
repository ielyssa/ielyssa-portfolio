import { useParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { BLOG_POSTS } from 'src/sections/website/blog-data';
import { BlogDetailView } from 'src/sections/website';

const SITE_URL = 'https://ielyssa.com';

export default function Page() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((item) => item.id === id) ?? BLOG_POSTS[0];

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'IRANKUNDA Elyssa',
    jobTitle: 'Applied AI Engineer, AI Researcher, and Entrepreneur',
    url: `${SITE_URL}/`,
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    image: post.coverImage,
    keywords: post.tags,
    mainEntityOfPage: `${SITE_URL}/blog/${post.id}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Writing',
        item: `${SITE_URL}/#writing`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.id}`,
      },
    ],
  };

  return (
    <>
      <title>{`${post.title} - ${CONFIG.appName}`}</title>
      <meta name="description" content={post.excerpt} />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta property="og:title" content={`${post.title} - ${CONFIG.appName}`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${SITE_URL}/blog/${post.id}`} />
      <meta property="og:image" content={post.coverImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${post.title} - ${CONFIG.appName}`} />
      <meta name="twitter:description" content={post.excerpt} />
      <meta name="twitter:image" content={post.coverImage} />
      <link rel="canonical" href={`${SITE_URL}/blog/${post.id}`} />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

      <BlogDetailView />
    </>
  );
}
