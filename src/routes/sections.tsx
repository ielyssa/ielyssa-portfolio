// src/routes/sections.tsx
import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { PortfolioLayout } from 'src/layouts/portfolio';

// ----------------------------------------------------------------------

const loadPortfolioPage = () => import('src/pages/portfolio');
const loadBlogDetailPage = () => import('src/pages/blog-detail');
const loadProjectDetailPage = () => import('src/pages/project-detail');
const loadAtasPage = () => import('src/pages/atas');
const loadSpeakingPage = () => import('src/pages/speaking');

export const prefetchRouteModules = {
  portfolio: loadPortfolioPage,
  blogDetail: loadBlogDetailPage,
  projectDetail: loadProjectDetailPage,
  atas: loadAtasPage,
  speaking: loadSpeakingPage,
};

export const PortfolioPage = lazy(loadPortfolioPage);
export const BlogDetailPage = lazy(loadBlogDetailPage);
export const ProjectDetailPage = lazy(loadProjectDetailPage);
export const AtasPage = lazy(loadAtasPage);
export const SpeakingPage = lazy(loadSpeakingPage);

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: (
      <PortfolioLayout>
        <Suspense fallback={renderFallback()}>
          <PortfolioPage />
        </Suspense>
      </PortfolioLayout>
    ),
  },
  {
    path: '/blog/:id',
    element: (
      <PortfolioLayout>
        <Suspense fallback={renderFallback()}>
          <BlogDetailPage />
        </Suspense>
      </PortfolioLayout>
    ),
  },
  {
    path: '/projects/:slug',
    element: (
      <PortfolioLayout>
        <Suspense fallback={renderFallback()}>
          <ProjectDetailPage />
        </Suspense>
      </PortfolioLayout>
    ),
  },
  {
    path: '/atas',
    element: (
      <PortfolioLayout>
        <Suspense fallback={renderFallback()}>
          <AtasPage />
        </Suspense>
      </PortfolioLayout>
    ),
  },
  {
    path: '/speaking',
    element: (
      <PortfolioLayout>
        <Suspense fallback={renderFallback()}>
          <SpeakingPage />
        </Suspense>
      </PortfolioLayout>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
