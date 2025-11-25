// src/routes/sections.tsx
import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { PortfolioLayout } from 'src/layouts/portfolio';

// ----------------------------------------------------------------------

export const PortfolioPage = lazy(() => import('src/pages/portfolio'));
export const BlogDetailPage = lazy(() => import('src/pages/blog-detail'));

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
    path: '*',
    element: <Navigate to="/" replace />,
  },
];