import { AtasDetailView } from 'src/sections/website';

const SITE_URL = 'https://ielyssa.com';

export default function Page() {
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
    name: 'ATAS - Alliance for Transformative AI Systems',
    description:
      'Rwanda-first and Africa-relevant AI infrastructure initiatives co-founded by IRANKUNDA Elyssa, focused on language, culture-aware intelligence, and practical delivery.',
    creator: {
      '@type': 'Person',
      name: 'IRANKUNDA Elyssa',
    },
    url: `${SITE_URL}/atas`,
    about: ['AI Infrastructure', 'Language AI', 'Applied Research', 'Rwanda-first AI'],
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
        name: 'ATAS',
        item: `${SITE_URL}/atas`,
      },
    ],
  };

  return (
    <>
      <title>ATAS | I. Elyssa</title>
      <meta
        name="description"
        content="Detailed page about ATAS, the Alliance for Transformative AI Systems co-founded by IRANKUNDA Elyssa."
      />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta property="og:title" content="ATAS | I. Elyssa" />
      <meta property="og:description" content="Mission, programs, impact, and gallery from ATAS." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/atas`} />
      <meta property="og:image" content="/assets/profile-picture.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="ATAS | I. Elyssa" />
      <meta name="twitter:description" content="Mission, programs, impact, and gallery from ATAS." />
      <meta name="twitter:image" content="/assets/profile-picture.png" />
      <link rel="canonical" href={`${SITE_URL}/atas`} />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(creativeWorkSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <AtasDetailView />
    </>
  );
}
