import { useParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { PORTFOLIO_ITEMS } from 'src/sections/website/project-data';
import { ProjectDetailView } from 'src/sections/website';

const SITE_URL = 'https://ielyssa.com';

export default function Page() {
  const { slug } = useParams();
  const project = PORTFOLIO_ITEMS.find((item) => item.slug === slug) ?? PORTFOLIO_ITEMS[0];

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'IRANKUNDA Elyssa',
    jobTitle: 'Applied AI Engineer, AI Researcher, and Entrepreneur',
    url: `${SITE_URL}/`,
  };

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    creator: {
      '@type': 'Person',
      name: 'IRANKUNDA Elyssa',
    },
    about: project.type,
    keywords: project.stack,
    image: project.images[0]?.src,
    url: `${SITE_URL}/projects/${project.slug}`,
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
        name: 'Portfolio',
        item: `${SITE_URL}/#portfolio`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${SITE_URL}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <title>{`${project.title} - ${CONFIG.appName}`}</title>
      <meta name="description" content={project.summary} />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta property="og:title" content={`${project.title} - ${CONFIG.appName}`} />
      <meta property="og:description" content={project.summary} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${SITE_URL}/projects/${project.slug}`} />
      <meta property="og:image" content={project.images[0]?.src || '/assets/profile-picture.png'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${project.title} - ${CONFIG.appName}`} />
      <meta name="twitter:description" content={project.summary} />
      <meta name="twitter:image" content={project.images[0]?.src || '/assets/profile-picture.png'} />
      <link rel="canonical" href={`${SITE_URL}/projects/${project.slug}`} />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(creativeWorkSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

      <ProjectDetailView />
    </>
  );
}
