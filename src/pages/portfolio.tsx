import { CONFIG } from 'src/config-global';

import { PortfolioView } from 'src/sections/portfolio';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Portfolio - ${CONFIG.appName}`}</title>
      <meta name="description" content="IRANKUNDA Elyssa - Data Scientist, AI Developer, and Co-founder of ATAS" />
      <meta name="keywords" content="Data Science, AI, Machine Learning, ATAS, Rwanda, Elyssa" />

      <PortfolioView />
    </>
  );
}