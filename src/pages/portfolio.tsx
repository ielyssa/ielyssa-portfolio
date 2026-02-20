import { PersonalWebsiteView } from 'src/sections/website';

const SITE_URL = 'https://ielyssa.com';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'IRANKUNDA Elyssa',
  jobTitle: 'Applied AI Engineer, AI Researcher, and Entrepreneur',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kigali',
    addressCountry: 'Rwanda',
  },
  sameAs: [
    'https://www.linkedin.com/in/irankunda-elyssa-452001290/',
    'https://github.com/ielyssa',
    'https://x.com/elyssa_ira',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'IRANKUNDA Elyssa Personal Website',
  url: SITE_URL,
};

export default function Page() {
  return (
    <>
      <title>IRANKUNDA Elyssa | Personal Website</title>
      <meta
        name="description"
        content="Personal website of IRANKUNDA Elyssa, featuring portfolio projects, writing, focus areas, and contact information."
      />
      <meta
        name="keywords"
        content="IRANKUNDA Elyssa, personal website, portfolio, AI infrastructure, Rwanda, African AI, language AI, entrepreneurship"
      />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta property="og:title" content="IRANKUNDA Elyssa | Personal Website" />
      <meta
        property="og:description"
        content="Personal website featuring portfolio case studies, writing, impact metrics, and collaboration channels."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:image" content="/assets/profile-picture.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="IRANKUNDA Elyssa | Personal Website" />
      <meta
        name="twitter:description"
        content="Personal website featuring portfolio case studies, writing, impact metrics, and collaboration channels."
      />
      <meta name="twitter:image" content="/assets/profile-picture.png" />
      <link rel="canonical" href={`${SITE_URL}/`} />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>

      <PersonalWebsiteView />
    </>
  );
}
