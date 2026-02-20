import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

const ATAS_IMAGES = [
  {
    src: '/assets/images/atas/atas-mission.png',
    caption: 'ATAS programs focused on Rwanda-first and African-context AI infrastructure outcomes.',
  },
  {
    src: '/assets/images/atas/atas-programs.png',
    caption: 'Research and analytics supporting context-aware decisions across language, systems, and culture.',
  },
  {
    src: '/assets/images/atas/atas-impact.png',
    caption: 'Cross-functional execution from concept, modeling, and product delivery.',
  },
];

export function AtasDetailView() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setImageIndex((prev) => (prev + 1) % ATAS_IMAGES.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, []);

  if (loading) return <AtasDetailSkeleton />;

  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Button startIcon={<Iconify icon="carbon:arrow-left" />} onClick={() => navigate('/#atas')} sx={{ mb: 2.6 }}>
          Back to website
        </Button>

        <Card sx={{ p: { xs: 2.2, md: 3 }, mb: 2.2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Avatar src="/assets/images/logo/atas-logo-bg.png" alt="ATAS" sx={{ width: 52, height: 52 }} />
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.7rem', md: '2.3rem' } }}>
                ATAS
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Alliance for Transformative AI Systems
              </Typography>
            </Box>
          </Stack>
        </Card>

        <Grid container spacing={2.2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ p: { xs: 2.2, md: 2.8 }, height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.2 }}>
                Mission
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                ATAS builds Rwanda-first and Africa-relevant AI infrastructure that understands local language, culture, systems, and real implementation needs.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.2 }}>
                Core work areas
              </Typography>
              <Stack spacing={1.1} sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">- AI infrastructure grounded in Rwanda-first context and priorities</Typography>
                <Typography variant="body2" color="text.secondary">- Language and culture-aware technologies for African accessibility</Typography>
                <Typography variant="body2" color="text.secondary">- Applied research linked directly to deployment and adoption</Typography>
              </Stack>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.2 }}>
                Why ATAS matters
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                Our focus is not AI for presentation, but AI that solves concrete local problems with measurable impact and sustainable delivery.
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ p: 1.2, mb: 2 }}>
              <Box sx={{ position: 'relative', borderRadius: 1.8, overflow: 'hidden' }}>
                <Box
                  component="img"
                  src={ATAS_IMAGES[imageIndex].src}
                  alt={ATAS_IMAGES[imageIndex].caption}
                  sx={{ width: '100%', height: { xs: 240, md: 290 }, objectFit: 'cover' }}
                />
                <Stack direction="row" spacing={0.6} sx={{ position: 'absolute', top: 10, right: 10 }}>
                  <IconButton onClick={() => setImageIndex((prev) => (prev - 1 + ATAS_IMAGES.length) % ATAS_IMAGES.length)} sx={{ bgcolor: (thm) => alpha(thm.palette.background.paper, 0.74) }}>
                    <Iconify icon="carbon:chevron-left" width={16} />
                  </IconButton>
                  <IconButton onClick={() => setImageIndex((prev) => (prev + 1) % ATAS_IMAGES.length)} sx={{ bgcolor: (thm) => alpha(thm.palette.background.paper, 0.74) }}>
                    <Iconify icon="carbon:chevron-right" width={16} />
                  </IconButton>
                </Stack>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {ATAS_IMAGES[imageIndex].caption}
              </Typography>
            </Card>

            <Card sx={{ p: 2.2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.1 }}>
                ATAS at a glance
              </Typography>
              <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                <Chip label="Co-founded by Elyssa" size="small" />
                <Chip label="AI Infrastructure" size="small" />
                <Chip label="Language AI" size="small" />
                <Chip label="Rwanda-based" size="small" />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function AtasDetailSkeleton() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Skeleton variant="rectangular" width={160} height={36} sx={{ borderRadius: 1, mb: 2.6 }} />
        <Card sx={{ p: { xs: 2.2, md: 3 }, mb: 2.2 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Skeleton variant="rectangular" width={52} height={52} sx={{ borderRadius: 2 }} />
            <Box>
              <Skeleton variant="text" width={220} height={34} />
              <Skeleton variant="text" width={280} height={22} />
            </Box>
          </Stack>
        </Card>
        <Grid container spacing={2.2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ p: { xs: 2.2, md: 2.8 } }}>
              <Skeleton variant="text" width={130} height={28} />
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="96%" height={24} />
              <Skeleton variant="text" width="92%" height={24} />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ p: 1.2, mb: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={290} sx={{ borderRadius: 1.8 }} />
            </Card>
            <Card sx={{ p: 2.2 }}>
              <Skeleton variant="text" width={150} height={26} />
              <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                <Skeleton variant="rounded" width={130} height={28} />
                <Skeleton variant="rounded" width={90} height={28} />
                <Skeleton variant="rounded" width={90} height={28} />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
