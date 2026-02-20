import { SpeakingMediaView } from 'src/sections/website';

const SITE_URL = 'https://ielyssa.com';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'IRANKUNDA Elyssa',
  jobTitle: 'Applied AI Engineer, AI Researcher, and Entrepreneur',
  url: `${SITE_URL}/`,
};

export default function Page() {
  return (
    <>
      <title>Speaking & Media | I. Elyssa</title>
      <meta
        name="description"
        content="Talks, interviews, speaking topics, and downloadable speaker media kit for IRANKUNDA Elyssa."
      />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta property="og:title" content="Speaking & Media | I. Elyssa" />
      <meta
        property="og:description"
        content="Dedicated speaking and media page with session themes, interview topics, and downloadable assets."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/speaking`} />
      <meta property="og:image" content="/assets/profile-picture.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Speaking & Media | I. Elyssa" />
      <meta
        name="twitter:description"
        content="Dedicated speaking and media page with session themes, interview topics, and downloadable assets."
      />
      <meta name="twitter:image" content="/assets/profile-picture.png" />
      <link rel="canonical" href={`${SITE_URL}/speaking`} />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>

      <SpeakingMediaView />
    </>
  );
}
