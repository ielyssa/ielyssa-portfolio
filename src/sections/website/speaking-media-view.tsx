import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

const SPEAKING_ITEMS = [
  {
    title: 'Rwanda-First AI Infrastructure',
    type: 'Conference Talk',
    venue: 'Kigali AI & Learning Summit',
    year: '2026',
  },
  {
    title: 'Language and Culture-Aware AI Systems',
    type: 'Panel Session',
    venue: 'African NLP Community Forum',
    year: '2025',
  },
  {
    title: 'Applied AI Engineering from Research to Deployment',
    type: 'Workshop',
    venue: 'Youth Data & Innovation Week',
    year: '2025',
  },
];

const MEDIA_ITEMS = [
  'Founder and product interviews',
  'Rwanda-first and African-context AI infrastructure',
  'Language AI, accessibility, and inclusion',
  'Young entrepreneurship and AI ecosystem building',
];

export function SpeakingMediaView() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2 }}>
            SPEAKING & MEDIA
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.35rem', md: '3rem' },
              lineHeight: 1.2,
            }}
          >
            Talks, interviews, and media assets
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mx: 'auto' }}>
            This page contains speaking topics, recent sessions, media resources, and downloadable assets for event
            organizers and press teams.
          </Typography>
        </Box>

        <Grid container spacing={2.4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ p: { xs: 2.4, md: 3 }, height: '100%' }}>
              <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar src="/assets/profile-picture.png" alt="IRANKUNDA Elyssa" sx={{ width: 52, height: 52 }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    IRANKUNDA Elyssa
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Applied AI Engineer, AI Researcher, and ATAS Co-Founder
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2.2 }}>
                Available for conference talks, podcast interviews, panel discussions, and workshops across Rwanda-first AI infrastructure, language and culture-aware systems, and practical deployment of applied AI.
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2.2 }}>
                <Chip label="AI Infrastructure" size="small" />
                <Chip label="Language AI" size="small" />
                <Chip label="AI Product Strategy" size="small" />
                <Chip label="Young Entrepreneurship" size="small" />
              </Stack>

              <Divider sx={{ mb: 2.2 }} />

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.2 }}>
                Downloadable media kit
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
                <Button
                  component="a"
                  href="/assets/docs/IRANKUNDA-Elyssa-CV.pdf"
                  download="IRANKUNDA-Elyssa-CV.pdf"
                  variant="outlined"
                  startIcon={<Iconify icon="carbon:document-download" />}
                >
                  Speaker bio (PDF)
                </Button>
                <Button
                  component="a"
                  href="/assets/docs/IRANKUNDA-Elyssa-Media-Kit.pdf"
                  download="IRANKUNDA-Elyssa-Media-Kit.pdf"
                  variant="contained"
                  startIcon={<Iconify icon="carbon:image-copy" />}
                >
                  Media sheet
                </Button>
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ p: { xs: 2.2, md: 2.6 }, mb: 2.2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.1 }}>
                Recent speaking themes
              </Typography>
              <Stack spacing={1.1}>
                {SPEAKING_ITEMS.map((item) => (
                  <Box
                    key={item.title}
                    sx={{
                      p: 1.2,
                      borderRadius: 1.4,
                      border: (thm) => `1px solid ${alpha(thm.palette.text.primary, 0.1)}`,
                      bgcolor: 'background.neutral',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.type} - {item.venue} - {item.year}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Card>

            <Card sx={{ p: { xs: 2.2, md: 2.6 } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.2 }}>
                Media request topics
              </Typography>
              <Stack spacing={1}>
                {MEDIA_ITEMS.map((item) => (
                  <Stack key={item} direction="row" spacing={1} alignItems="flex-start">
                    <Iconify icon="carbon:checkmark-filled" width={15} style={{ marginTop: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Button
                component="a"
                href="mailto:info@ielyssa.com?subject=Speaking%20or%20Media%20Request"
                fullWidth
                variant="contained"
                startIcon={<Iconify icon="carbon:email" />}
              >
                Request speaking or interview
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

