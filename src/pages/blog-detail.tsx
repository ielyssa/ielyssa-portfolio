import { CONFIG } from 'src/config-global';

import { BlogDetailView } from 'src/sections/portfolio';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Blog Post - ${CONFIG.appName}`}</title>
      <meta name="description" content="Read the latest insights on AI, data science, and entrepreneurship" />

      <BlogDetailView />
    </>
  );
}