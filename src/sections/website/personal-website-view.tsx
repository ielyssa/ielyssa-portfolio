import { useEffect, useMemo, useRef, useState, type ReactNode, type TouchEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Tooltip } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Iconify } from 'src/components/iconify';
import { trackEvent } from 'src/utils/analytics';

import { BLOG_POSTS } from './blog-data';
import { PORTFOLIO_ITEMS } from './project-data';

type PaletteColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

const ABOUT_PROFILE = [
  { label: 'Name', value: 'IRANKUNDA Elyssa', icon: 'carbon:user' },
  { label: 'Location', value: 'Kigali, Rwanda', icon: 'carbon:location' },
  { label: 'Role', value: 'Applied AI Engineer, AI Researcher, and Entrepreneur', icon: 'carbon:workspace' },
  { label: 'Organization', value: 'Co-Founder at ATAS', icon: 'carbon:building' },
];

const IMPACT_METRICS = [
  { label: 'AI Infrastructure Initiatives', value: '3', icon: 'carbon:rocket', color: 'primary', detail: 'Built practical systems shaped by local context, needs, and implementation realities.' },
  { label: 'Core Research Themes', value: '4', icon: 'carbon:analytics', color: 'info', detail: 'Language, culture, geography-aware modeling, and context-native AI strategy.' },
  { label: 'Flagship Products and Prototypes', value: '3', icon: 'carbon:education', color: 'success', detail: 'Delivered production and experimental systems grounded in Rwanda-first priorities.' },
  { label: 'Years of Active Building', value: '4', icon: 'carbon:time', color: 'warning', detail: 'Continuous hands-on execution from idea to implementation.' },
];

const IMPACT_SCENES = [
  {
    image: '/assets/images/focus/focus-rwanda-context-ai.png',
    title: 'Rwanda-first AI infrastructure in practice',
    description: 'From discovery to deployment, I design systems that understand local realities and constraints.',
  },
  {
    image: '/assets/images/focus/focus-research-signals.png',
    title: 'Research-driven decisions with measurable signals',
    description: 'I use evidence, experimentation, and analytics to shape long-term infrastructure priorities.',
  },
  {
    image: '/assets/images/focus/focus-language-culture-systems.png',
    title: 'Language and culture-aware system design',
    description: 'Projects prioritize Kinyarwanda and African-context understanding built by people who live that reality.',
  },
  {
    image: '/assets/images/focus/focus-entrepreneurial-execution.png',
    title: 'Entrepreneurial execution over time',
    description: 'Sustained building across products and research has strengthened delivery quality and depth.',
  },
];

const RECOGNITION_ITEMS = [
  {
    title: 'ATAS Co-Founder',
    description: 'Co-shaped ATAS to advance Rwanda-first and African-context AI infrastructure.',
    icon: 'carbon:workspace',
  },
  {
    title: 'AI Infrastructure Researcher',
    description: 'Researching systems that understand language, culture, geography, and local needs from within context.',
    icon: 'carbon:volume-up',
  },
  {
    title: 'Young Entrepreneur',
    description: 'Building practical ventures and infrastructure with long-term African relevance.',
    icon: 'carbon:chart-line-data',
  },
];

const NOW_ITEMS = [
  'I am building AI infrastructure that better understands Rwanda, including language, culture, and civic systems.',
  'I am improving Kinyarwanda language systems for accessibility and real-world deployment quality.',
  'I am researching practical methods for context-native African AI systems built and narrated by Africans.',
];

const JOURNEY = [
  {
    year: '2022',
    title: 'Started Deep Focus on Data Science',
    description: 'Built strong foundations in Python, analytics, and machine learning projects.',
  },
  {
    year: '2024',
    title: 'Co-Founded ATAS',
    description: 'Launched Alliance for Transformative AI Systems with Rwanda-first infrastructure goals.',
  },
  {
    year: '2025',
    title: 'Released Multi-Product AI Infrastructure Initiatives',
    description: 'Developed practical systems across language technology, analytics, and context-native AI delivery.',
  },
];

const ATAS_SECTION_IMAGES = [
  {
    src: '/assets/images/atas/atas-mission.png',
    caption: 'Rwanda-first AI initiatives designed for practical local use and long-term infrastructure growth.',
  },
  {
    src: '/assets/images/atas/atas-programs.png',
    caption: 'Data-informed systems designed to reflect local context, institutions, and lived realities.',
  },
  {
    src: '/assets/images/atas/atas-impact.png',
    caption: 'Cross-functional execution across product strategy, modeling, and deployment.',
  },
];

const UNSPLASH_WIDTHS = [480, 768, 1200, 1600];

function replaceUnsplashWidth(src: string, width: number) {
  return src.replace(/([?&])w=\d+/g, `$1w=${width}`);
}

function buildUnsplashSrcSet(src: string) {
  if (!src.includes('images.unsplash.com')) return undefined;
  return UNSPLASH_WIDTHS.map((width) => `${replaceUnsplashWidth(src, width)} ${width}w`).join(', ');
}

const CONTACT_CHANNELS = [
  {
    icon: 'mdi:email',
    label: 'Email',
    value: 'info@ielyssa.com',
    href: 'mailto:info@ielyssa.com',
    color: 'primary',
  },
  {
    icon: 'mdi:phone',
    label: 'Phone',
    value: '+250 788 235 574',
    href: 'tel:+250788235574',
    color: 'success',
  },
  {
    icon: 'mdi:map-marker',
    label: 'Location',
    value: 'Kigali, Rwanda',
    href: '',
    color: 'warning',
  },
  {
    icon: 'mdi:calendar',
    label: 'Availability',
    value: 'Open to collaborations and speaking opportunities',
    href: '',
    color: 'info',
  },
];

const SOCIALS = [
  {
    icon: 'mdi:linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/irankunda-elyssa-452001290/',
    color: 'info',
  },
  {
    icon: 'mdi:github',
    label: 'GitHub',
    href: 'https://github.com/ielyssa',
    color: 'text.primary',
  },
  {
    icon: 'mdi:twitter',
    label: 'X',
    href: 'https://x.com/elyssa_ira',
    color: 'secondary',
  },
  {
    icon: 'mdi:instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/_ielyssa/',
    color: 'error',
  },
];

export function PersonalWebsiteView() {
  const PORTFOLIO_HIGHLIGHT_MS = 8000;
  const PORTFOLIO_COUNTDOWN_STEP_MS = 100;
  const ATAS_SLIDE_MS = 5400;
  const ATAS_COUNTDOWN_STEP_MS = 100;
  const theme = useTheme();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [loading, setLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState(0);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [atasImageIndex, setAtasImageIndex] = useState(0);
  const [atasSlideDirection, setAtasSlideDirection] = useState<'next' | 'prev'>('next');
  const [isAtasPaused, setIsAtasPaused] = useState(false);
  const [atasCountdownMs, setAtasCountdownMs] = useState(ATAS_SLIDE_MS);
  const [portfolioDirection, setPortfolioDirection] = useState<'next' | 'prev'>('next');
  const [isPortfolioPaused, setIsPortfolioPaused] = useState(false);
  const [portfolioCountdownMs, setPortfolioCountdownMs] = useState(PORTFOLIO_HIGHLIGHT_MS);
  const [projectImageIndexes, setProjectImageIndexes] = useState<Record<string, number>>(
    Object.fromEntries(PORTFOLIO_ITEMS.map((project) => [project.title, 0]))
  );
  const touchStartX = useRef<number | null>(null);
  const atasTouchStartX = useRef<number | null>(null);
  const prefetchProjectDetail = () => import('src/pages/project-detail');
  const prefetchBlogDetail = () => import('src/pages/blog-detail');
  const prefetchAtasDetail = () => import('src/pages/atas');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (IMPACT_METRICS.length <= 1 || isFocusPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % IMPACT_METRICS.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isFocusPaused]);

  const featuredPost = useMemo(() => BLOG_POSTS[0], []);
  const recentPosts = useMemo(() => BLOG_POSTS.slice(1, 4), []);
  const projectsPerView = isDesktop ? 2 : 1;
  const totalProjects = PORTFOLIO_ITEMS.length;
  const visibleProjects = useMemo(() => {
    if (totalProjects === 0) return [];
    const visibleCount = Math.min(projectsPerView, totalProjects);
    return Array.from({ length: visibleCount }, (_, offset) => PORTFOLIO_ITEMS[(portfolioIndex + offset) % totalProjects]);
  }, [portfolioIndex, projectsPerView, totalProjects]);

  useEffect(() => {
    if (totalProjects === 0) {
      setPortfolioIndex(0);
      return;
    }
    setPortfolioIndex((prev) => ((prev % totalProjects) + totalProjects) % totalProjects);
    setPortfolioCountdownMs(PORTFOLIO_HIGHLIGHT_MS);
  }, [totalProjects]);

  useEffect(() => {
    if (isPortfolioPaused || totalProjects <= 1) return undefined;
    const timer = window.setInterval(() => {
      setPortfolioCountdownMs((prev) => {
        if (prev <= PORTFOLIO_COUNTDOWN_STEP_MS) {
          setPortfolioDirection('next');
          setPortfolioIndex((current) => (current + 1) % totalProjects);
          return PORTFOLIO_HIGHLIGHT_MS;
        }
        return prev - PORTFOLIO_COUNTDOWN_STEP_MS;
      });
    }, PORTFOLIO_COUNTDOWN_STEP_MS);
    return () => window.clearInterval(timer);
  }, [isPortfolioPaused, totalProjects, PORTFOLIO_HIGHLIGHT_MS, PORTFOLIO_COUNTDOWN_STEP_MS]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProjectImageIndexes((prev) => {
        const next = { ...prev };
        PORTFOLIO_ITEMS.forEach((project) => {
          const current = prev[project.title] ?? 0;
          next[project.title] = (current + 1) % project.images.length;
        });
        return next;
      });
    }, 4300);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAtasPaused || ATAS_SECTION_IMAGES.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setAtasCountdownMs((prev) => {
        if (prev <= ATAS_COUNTDOWN_STEP_MS) {
          setAtasSlideDirection('next');
          setAtasImageIndex((current) => (current + 1) % ATAS_SECTION_IMAGES.length);
          return ATAS_SLIDE_MS;
        }
        return prev - ATAS_COUNTDOWN_STEP_MS;
      });
    }, ATAS_COUNTDOWN_STEP_MS);
    return () => window.clearInterval(timer);
  }, [ATAS_COUNTDOWN_STEP_MS, ATAS_SLIDE_MS, isAtasPaused]);

  const goPortfolioPrev = () => {
    if (totalProjects === 0) return;
    setPortfolioDirection('prev');
    setPortfolioIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    setPortfolioCountdownMs(PORTFOLIO_HIGHLIGHT_MS);
  };

  const goPortfolioNext = () => {
    if (totalProjects === 0) return;
    setPortfolioDirection('next');
    setPortfolioIndex((prev) => (prev + 1) % totalProjects);
    setPortfolioCountdownMs(PORTFOLIO_HIGHLIGHT_MS);
  };

  const goProjectImagePrev = (projectTitle: string, total: number) => {
    setProjectImageIndexes((prev) => ({
      ...prev,
      [projectTitle]: ((prev[projectTitle] ?? 0) - 1 + total) % total,
    }));
  };

  const goProjectImageNext = (projectTitle: string, total: number) => {
    setProjectImageIndexes((prev) => ({
      ...prev,
      [projectTitle]: ((prev[projectTitle] ?? 0) + 1) % total,
    }));
  };

  const goAtasPrev = () => {
    setAtasSlideDirection('prev');
    setAtasImageIndex((prev) => (prev - 1 + ATAS_SECTION_IMAGES.length) % ATAS_SECTION_IMAGES.length);
    setAtasCountdownMs(ATAS_SLIDE_MS);
  };

  const goAtasNext = () => {
    setAtasSlideDirection('next');
    setAtasImageIndex((prev) => (prev + 1) % ATAS_SECTION_IMAGES.length);
    setAtasCountdownMs(ATAS_SLIDE_MS);
  };

  const goAtasTo = (index: number) => {
    if (index === atasImageIndex) return;
    setAtasSlideDirection(index > atasImageIndex ? 'next' : 'prev');
    setAtasImageIndex(index);
    setAtasCountdownMs(ATAS_SLIDE_MS);
  };

  const onPortfolioTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const onPortfolioTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - event.changedTouches[0].clientX;
    if (delta > 50) goPortfolioNext();
    if (delta < -50) goPortfolioPrev();
    touchStartX.current = null;
  };

  const onAtasTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    atasTouchStartX.current = event.changedTouches[0].clientX;
  };

  const onAtasTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (atasTouchStartX.current === null) return;
    const delta = atasTouchStartX.current - event.changedTouches[0].clientX;
    if (delta > 45) goAtasNext();
    if (delta < -45) goAtasPrev();
    atasTouchStartX.current = null;
  };

  if (loading) {
    return <PortfolioSkeleton />;
  }

  return (
    <Box>
      <Box
        id="home"
        sx={{
          position: 'relative',
          // minHeight: { xs: 'auto', md: '90vh' },
          // py: { xs: 10, md: 0 },
          py: { xs: 6, md: 14 },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '8%',
            right: '-8%',
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: (thm) =>
              `radial-gradient(circle, ${alpha(thm.palette.primary.main, 0.13)} 0%, transparent 72%)`,
            filter: 'blur(12px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-6%',
            left: '-10%',
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: (thm) =>
              `radial-gradient(circle, ${alpha(thm.palette.secondary.main, 0.11)} 0%, transparent 72%)`,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '3rem', md: '4.2rem' },
                  fontWeight: 800,
                  mb: 2,
                  background: (thm) =>
                    `linear-gradient(135deg, ${thm.palette.primary.main} 0%, ${thm.palette.primary.dark} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                IRANKUNDA Elyssa
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: 'text.secondary', mb: 3, fontWeight: 500, fontSize: { xs: '1.2rem', sm: '1.45rem' } }}
              >
                African intelligence should be built and narrated by Africans
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', mb: 4, maxWidth: 660, lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1rem' } }}
              >
                I am an Applied AI Engineer, AI researcher, and entrepreneur building Rwanda-first infrastructure that understands language, culture, geography, systems, and needs. This space shows my projects, research direction, writing, and collaboration paths.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<Iconify icon="carbon:folder-open" />}
                  href="#portfolio"
                  onClick={() => trackEvent('cta_portfolio_click', { location: 'hero' })}
                  sx={{ px: 4, py: 1.4, borderRadius: 2, boxShadow: (thm) => thm.customShadows.z8, width: { xs: '100%', sm: 'auto' } }}
                >
                  Explore Portfolio
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Iconify icon="carbon:document-download" />}
                  component="a"
                  href="/assets/docs/IRANKUNDA-Elyssa-CV.pdf"
                  download="IRANKUNDA-Elyssa-CV.pdf"
                  onClick={() => trackEvent('download_cv_click', { location: 'hero' })}
                  sx={{ px: 4, py: 1.4, borderRadius: 2, textDecoration: 'none', width: { xs: '100%', sm: 'auto' } }}
                >
                  Download CV
                </Button>
              </Stack>

            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', width: { xs: 280, sm: 320, md: 340 }, height: { xs: 280, sm: 320, md: 340 } }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: (thm) =>
                        `linear-gradient(135deg, ${thm.palette.primary.main} 0%, ${thm.palette.primary.dark} 100%)`,
                      opacity: 0.35,
                    }}
                  />
                  <Avatar
                    src="/assets/profile-picture.png"
                    alt="IRANKUNDA Elyssa"
                    sx={{
                      width: '100%',
                      height: '100%',
                      border: (thm) => `4px solid ${thm.palette.background.paper}`,
                      boxShadow: (thm) => thm.customShadows.z24,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="about" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.neutral' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="stretch">
            <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
              <ScrollReveal>
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2 }}>
                  ABOUT
                </Typography>
              </ScrollReveal>
              <ScrollReveal delay={70}>
            <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.35rem', md: '3rem' }, lineHeight: 1.2 }}>
              Who I am and why this mission matters
            </Typography>
              </ScrollReveal>
              <ScrollReveal delay={140}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
                  I am IRANKUNDA Elyssa, an Applied AI Engineer, AI researcher, and young entrepreneur focused on systems that understand Rwanda deeply: language, culture, geography, institutions, and everyday needs.
                </Typography>
              </ScrollReveal>
              <ScrollReveal delay={220}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  I believe African culture and intelligence should not be defined by someone else. We are the ones with the stories, context, and lived understanding to build these systems responsibly. I co-founded ATAS to turn that belief into practical infrastructure.
                </Typography>
              </ScrollReveal>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
              <ScrollReveal delay={100}>
                <Card sx={{ height: '100%', p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    Basic information
                  </Typography>
                <Stack spacing={1.2}>
                  {ABOUT_PROFILE.map((item, index) => (
                    <ScrollReveal key={item.label} delay={index * 80}>
                      <Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Box
                            sx={{
                              width: 30,
                              height: 30,
                              borderRadius: 1.1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: (thm) => alpha(thm.palette.primary.main, 0.12),
                              color: 'primary.main',
                              flexShrink: 0,
                            }}
                          >
                            <Iconify icon={item.icon} width={16} />
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              {item.label}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                              {item.value}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </ScrollReveal>
                  ))}
                </Stack>
                <Divider sx={{ my: 2.5 }} />
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip label="AI Strategy" size="small" />
                  <Chip label="Data Science" size="small" />
                  <Chip label="Language AI" size="small" />
                </Stack>
                </Card>
              </ScrollReveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="focus" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2 }}>
              FOCUS
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.35rem', md: '3rem' }, lineHeight: 1.2 }}>
              Evidence, priorities, and credibility
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              These are the signals I use to stay accountable: building from context, proving outcomes, and moving from research to real systems.
            </Typography>
          </Box>

          <Grid container spacing={2.5} sx={{ mb: 4.5 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Card
                onMouseEnter={() => setIsFocusPaused(true)}
                onMouseLeave={() => setIsFocusPaused(false)}
                sx={{
                  position: 'relative',
                  height: '100%',
                  minHeight: { xs: 260, sm: 300, md: 400 },
                  overflow: 'hidden',
                  border: (thm) => `1px solid ${alpha(thm.palette.primary.main, 0.2)}`,
                  '@keyframes focusGlowPulse': {
                    '0%': { transform: 'scale(0.95)', opacity: 0.42 },
                    '100%': { transform: 'scale(1.06)', opacity: 0.7 },
                  },
                }}
              >
                {IMPACT_SCENES.map((scene, idx) => {
                  const isActive = idx === activeMetric;
                  return (
                    <Box
                      key={scene.image}
                      component="img"
                      src={scene.image}
                      alt={scene.title}
                      loading="lazy"
                      decoding="async"
                      srcSet={buildUnsplashSrcSet(scene.image)}
                      sizes="(max-width: 900px) 100vw, 42vw"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'scale(1.03)' : 'scale(1.09)',
                        transition: 'opacity 680ms ease, transform 980ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />
                  );
                })}
                <Box
                  sx={{
                    position: 'absolute',
                    width: 280,
                    height: 280,
                    borderRadius: '50%',
                    top: -120,
                    right: -120,
                    background: (thm) => `radial-gradient(circle, ${alpha(thm.palette.primary.main, 0.45)} 0%, transparent 70%)`,
                    filter: 'blur(8px)',
                    animation: 'focusGlowPulse 3.4s ease-in-out infinite alternate',
                    pointerEvents: 'none',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: (thm) =>
                      thm.palette.mode === 'dark'
                        ? `linear-gradient(160deg, ${alpha(thm.palette.primary.main, 0.24)} 0%, ${alpha(thm.palette.common.black, 0.74)} 65%)`
                        : `linear-gradient(160deg, ${alpha(thm.palette.primary.main, 0.3)} 0%, ${alpha(thm.palette.common.black, 0.6)} 65%)`,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 10, sm: 16 },
                    right: { xs: 10, sm: 16 },
                    bottom: { xs: 10, sm: 16 },
                    p: { xs: 1, sm: 1.6 },
                    borderRadius: 1.8,
                    bgcolor: (thm) => alpha(thm.palette.background.paper, 0.24),
                    border: (thm) => `1px solid ${alpha(thm.palette.common.white, 0.26)}`,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    maxWidth: { xs: 'calc(100% - 20px)', sm: 'unset' },
                  }}
                >
                 
                  <Typography
                    variant="h5"
                    sx={{
                      mt: 0.3,
                      mb: 0.6,
                      color: 'common.white',
                      fontWeight: 700,
                      lineHeight: 1.25,
                      fontSize: { xs: '0.95rem', sm: '1.35rem' },
                    }}
                  >
                    {IMPACT_SCENES[activeMetric].title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha(theme.palette.common.white, 0.88),
                      lineHeight: { xs: 1.4, sm: 1.6 },
                      fontSize: { xs: '0.76rem', sm: '0.9rem' },
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 2, sm: 'unset' },
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {IMPACT_SCENES[activeMetric].description}
                  </Typography>
                  <Stack direction="row" spacing={0.7} sx={{ mt: { xs: 0.8, sm: 1.4 } }}>
                    {IMPACT_SCENES.map((scene, idx) => (
                      <Box
                        key={scene.title}
                        onClick={() => setActiveMetric(idx)}
                        sx={{
                          width: activeMetric === idx ? 22 : 8,
                          height: 8,
                          borderRadius: 99,
                          bgcolor: activeMetric === idx ? 'common.white' : alpha(theme.palette.common.white, 0.45),
                          transition: 'all 240ms ease',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Grid container spacing={1.6} onMouseEnter={() => setIsFocusPaused(true)} onMouseLeave={() => setIsFocusPaused(false)}>
                {IMPACT_METRICS.map((metric, index) => (
                  <Grid key={metric.label} size={{ xs: 6, sm: 6 }}>
                    <Card
                      onClick={() => setActiveMetric(index)}
                      sx={{
                        p: 2,
                        height: '100%',
                        minHeight: 156,
                        cursor: 'pointer',
                        position: 'relative',
                        border: (thm) =>
                          `1px solid ${alpha(
                            thm.palette[metric.color as PaletteColor].main,
                            activeMetric === index ? 0.5 : 0.2
                          )}`,
                        bgcolor:
                          activeMetric === index
                            ? alpha(theme.palette[metric.color as PaletteColor].main, 0.08)
                            : 'background.paper',
                        transition: 'all 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: (thm) => thm.customShadows.z8,
                          borderColor: (thm) => alpha(thm.palette[metric.color as PaletteColor].main, 0.45),
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: 10,
                          bottom: 10,
                          width: 3,
                          borderRadius: 99,
                          bgcolor: (thm) =>
                            activeMetric === index
                              ? thm.palette[metric.color as PaletteColor].main
                              : alpha(thm.palette[metric.color as PaletteColor].main, 0.2),
                          transition: 'all 260ms ease',
                        }}
                      />
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1.2,
                          bgcolor: (thm) => alpha(thm.palette[metric.color as PaletteColor].main, 0.12),
                          color: `${metric.color}.main`,
                        }}
                      >
                        <Iconify icon={metric.icon} width={20} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.2, letterSpacing: '-0.02em' }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.4 }}>
                        {metric.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 1.1,
                          display: 'block',
                          color: activeMetric === index ? 'text.primary' : 'text.secondary',
                          minHeight: 34,
                        }}
                      >
                        {metric.detail}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Card sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Now building
                </Typography>
                <Stack spacing={1.1}>
                  {NOW_ITEMS.map((item) => (
                    <Typography key={item} variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      - {item}
                    </Typography>
                  ))}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Journey snapshot
                </Typography>
                <Stack spacing={1.4}>
                  {JOURNEY.map((step) => (
                    <Box key={step.year}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {step.year}: {step.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Recognition
                </Typography>
                <Stack spacing={2}>
                  {RECOGNITION_ITEMS.map((item) => (
                    <Stack key={item.title} direction="row" spacing={1.2} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: 1.2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: (thm) => alpha(thm.palette.primary.main, 0.12),
                          color: 'primary.main',
                          flexShrink: 0,
                        }}
                      >
                        <Iconify icon={item.icon} width={18} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>

      <Box id="atas" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.neutral' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2 }}>
              ATAS
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.35rem', md: '3rem' }, lineHeight: 1.2 }}>
              Company spotlight
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 740, mx: 'auto' }}>
              Alliance for Transformative AI Systems is where I co-build Rwanda-first and Africa-relevant AI infrastructure. We are not waiting to be defined; we are defining our own AI future through systems that understand our realities.
            </Typography>
          </Box>

          <Grid container spacing={2.6} alignItems="stretch">
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  p: { xs: 2.4, md: 3.1 },
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  border: (thm) => `1px solid ${alpha(thm.palette.primary.main, 0.2)}`,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: (thm) =>
                      `linear-gradient(150deg, ${alpha(thm.palette.primary.main, 0.1)} 0%, transparent 42%, ${alpha(thm.palette.info.main, 0.07)} 100%)`,
                    pointerEvents: 'none',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: 220,
                    height: 220,
                    borderRadius: '50%',
                    right: -120,
                    top: -100,
                    background: (thm) => `radial-gradient(circle, ${alpha(thm.palette.primary.main, 0.22)} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  },
                }}
              >
                <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar src="/assets/images/logo/atas-logo-bg.png" alt="ATAS" sx={{ width: 56, height: 56 }} />
                  <Box>
                    <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1.5 }}>
                      COMPANY
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                      ATAS
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                  I co-founded ATAS (Alliance for Transformative AI Systems) to build AI infrastructure that understands local context and supports long-term African progress with real ownership.
                </Typography>

                <Stack spacing={1.1} sx={{ mb: 2.4 }}>
                  <Typography variant="body2" color="text.secondary">- Rwanda-first AI systems grounded in local context and needs</Typography>
                  <Typography variant="body2" color="text.secondary">- Language and culture-aware infrastructure for African realities</Typography>
                  <Typography variant="body2" color="text.secondary">- Applied research directly linked to implementation and accessibility</Typography>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
                  <Chip label="Co-Founded by Elyssa" size="small" />
                  <Chip label="AI Infrastructure" size="small" />
                  <Chip label="Language and Culture AI" size="small" />
                  <Chip label="Rwanda" size="small" />
                </Stack>

                <Button
                  variant="contained"
                  endIcon={<Iconify icon="carbon:arrow-right" />}
                  onMouseEnter={prefetchAtasDetail}
                  onFocus={prefetchAtasDetail}
                  onClick={() => {
                    trackEvent('atas_detail_open', { source: 'landing_company_card' });
                    navigate('/atas');
                  }}
                >
                  Explore ATAS in detail
                </Button>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: '100%',
                  position: 'relative',
                }}
              >
                <Box
                  onMouseEnter={() => setIsAtasPaused(true)}
                  onMouseLeave={() => setIsAtasPaused(false)}
                  onTouchStart={onAtasTouchStart}
                  onTouchEnd={onAtasTouchEnd}
                  sx={{
                    position: 'relative',
                    borderRadius: 2.4,
                    overflow: 'hidden',
                    minHeight: { xs: 280, md: 380 },
                    border: (thm) => `1px solid ${alpha(thm.palette.primary.main, thm.palette.mode === 'dark' ? 0.28 : 0.18)}`,
                  }}
                >
                  {ATAS_SECTION_IMAGES.map((image, idx) => {
                    const isActive = idx === atasImageIndex;
                    return (
                      <Box
                        key={image.src}
                        component="img"
                        src={image.src}
                        alt={image.caption}
                        loading="lazy"
                        decoding="async"
                        srcSet={buildUnsplashSrcSet(image.src)}
                        sizes="(max-width: 900px) 100vw, 42vw"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: isActive ? 1 : 0,
                          transform: isActive
                            ? 'translateX(0%) scale(1.02)'
                            : `translateX(${atasSlideDirection === 'next' ? '14%' : '-14%'}) scale(1.08)`,
                          transition: 'transform 760ms cubic-bezier(0.22, 1, 0.36, 1), opacity 560ms ease',
                        }}
                      />
                    );
                  })}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: (thm) =>
                        `linear-gradient(to top, ${alpha(thm.palette.common.black, 0.68)} 0%, ${alpha(thm.palette.common.black, 0.24)} 42%, transparent 100%)`,
                    }}
                  />

                  <Stack direction="row" spacing={0.9} sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
                    <Chip
                      size="small"
                      label={`${String(atasImageIndex + 1).padStart(2, '0')} / ${String(ATAS_SECTION_IMAGES.length).padStart(2, '0')}`}
                      sx={{
                        bgcolor: (thm) => alpha(thm.palette.background.paper, 0.18),
                        color: 'common.white',
                        border: (thm) => `1px solid ${alpha(thm.palette.common.white, 0.32)}`,
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                      }}
                    />
                    <Chip
                      size="small"
                      label={`${Math.max(1, Math.ceil(atasCountdownMs / 1000))}s`}
                      sx={{
                        bgcolor: (thm) => alpha(thm.palette.background.paper, 0.18),
                        color: 'common.white',
                        border: (thm) => `1px solid ${alpha(thm.palette.common.white, 0.28)}`,
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                      }}
                    />
                  </Stack>

                  <Stack direction="row" spacing={0.7} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
                    <IconButton
                      onClick={goAtasPrev}
                      sx={{
                        width: 38,
                        height: 38,
                        bgcolor: (thm) => alpha(thm.palette.background.paper, 0.2),
                        border: (thm) => `1px solid ${alpha(thm.palette.common.white, 0.35)}`,
                        color: 'common.white',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                      }}
                    >
                      <Iconify icon="carbon:chevron-left" width={18} />
                    </IconButton>
                    <IconButton
                      onClick={goAtasNext}
                      sx={{
                        width: 38,
                        height: 38,
                        bgcolor: (thm) => alpha(thm.palette.background.paper, 0.2),
                        border: (thm) => `1px solid ${alpha(thm.palette.common.white, 0.35)}`,
                        color: 'common.white',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                      }}
                    >
                      <Iconify icon="carbon:chevron-right" width={18} />
                    </IconButton>
                  </Stack>

                  <Box
                    sx={{
                      position: 'absolute',
                      left: 12,
                      right: 12,
                      bottom: 12,
                      p: 1.4,
                      borderRadius: 1.6,
                      bgcolor: (thm) => alpha(thm.palette.background.paper, 0.18),
                      border: (thm) => `1px solid ${alpha(thm.palette.common.white, 0.26)}`,
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'common.white', fontWeight: 600 }}>
                      {ATAS_SECTION_IMAGES[atasImageIndex].caption}
                    </Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={0.9} sx={{ mt: 1.2 }} justifyContent="center">
                  {ATAS_SECTION_IMAGES.map((image, idx) => (
                    <Box
                      key={image.src}
                      onClick={() => goAtasTo(idx)}
                      sx={{
                        width: atasImageIndex === idx ? 22 : 8,
                        height: 8,
                        borderRadius: 99,
                        bgcolor: atasImageIndex === idx ? 'primary.main' : alpha(theme.palette.text.primary, 0.24),
                        boxShadow: atasImageIndex === idx ? `0 0 14px ${alpha(theme.palette.primary.main, 0.4)}` : 'none',
                        transition: 'all 240ms ease',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="portfolio" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.neutral', overflowX: 'clip' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2 }}>
              PORTFOLIO
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.35rem', md: '3rem' }, lineHeight: 1.2 }}>
              Portfolio case studies
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: 'auto' }}>
              For each project, I share the full decision path: problem, approach, stack, outcomes, and what I am improving next.
            </Typography>
          </Box>

          <Box
            sx={{
              position: 'relative',
              '@keyframes portfolioEnterNext': {
                from: { transform: 'translate3d(52px, 0, 0) scale(0.965)' },
                to: { transform: 'translate3d(0, 0, 0) scale(1)' },
              },
              '@keyframes portfolioEnterPrev': {
                from: { transform: 'translate3d(-52px, 0, 0) scale(0.965)' },
                to: { transform: 'translate3d(0, 0, 0) scale(1)' },
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                width: 260,
                height: 260,
                borderRadius: '50%',
                top: -130,
                right: -90,
                background: (thm) => `radial-gradient(circle, ${alpha(thm.palette.primary.main, 0.2)} 0%, transparent 70%)`,
                pointerEvents: 'none',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                width: 240,
                height: 240,
                borderRadius: '50%',
                bottom: -140,
                left: -100,
                background: (thm) => `radial-gradient(circle, ${alpha(thm.palette.secondary.main, 0.16)} 0%, transparent 72%)`,
                pointerEvents: 'none',
              },
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ mb: 1.1, px: 0.4, position: 'relative', zIndex: 2 }}>
              <Stack direction="row" spacing={0.7}>
                <IconButton
                  onClick={goPortfolioPrev}
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: (thm) => alpha(thm.palette.background.paper, 0.7),
                    border: (thm) => `1px solid ${alpha(thm.palette.common.white, thm.palette.mode === 'dark' ? 0.15 : 0.6)}`,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <Iconify icon="carbon:chevron-left" width={18} />
                </IconButton>
                <IconButton
                  onClick={goPortfolioNext}
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: (thm) => alpha(thm.palette.background.paper, 0.7),
                    border: (thm) => `1px solid ${alpha(thm.palette.common.white, thm.palette.mode === 'dark' ? 0.15 : 0.6)}`,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <Iconify icon="carbon:chevron-right" width={18} />
                </IconButton>
              </Stack>
            </Stack>

            <Grid
              container
              spacing={1.2}
              onTouchStart={onPortfolioTouchStart}
              onTouchEnd={onPortfolioTouchEnd}
              sx={{ position: 'relative', zIndex: 1 }}
            >
              {visibleProjects.map((project, visibleIndex) => {
                const isPrimary = visibleIndex === 0;
                return (
                  <Grid key={`${project.slug}-${portfolioIndex}`} size={isDesktop ? (isPrimary ? 7 : 5) : 12}>
                    <Box
                      onMouseEnter={isPrimary ? () => setIsPortfolioPaused(true) : undefined}
                      onMouseLeave={isPrimary ? () => setIsPortfolioPaused(false) : undefined}
                      sx={{
                        height: '100%',
                        p: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.1,
                        transition: 'transform 760ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 560ms ease',
                        transformOrigin: isPrimary ? 'center center' : 'top left',
                        transform: isPrimary ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.93)',
                        opacity: isPrimary ? 1 : 0.9,
                        filter: isPrimary ? 'none' : 'saturate(0.88)',
                        animation: `${portfolioDirection === 'next' ? 'portfolioEnterNext' : 'portfolioEnterPrev'} 760ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          mb: 1.5,
                          borderRadius: 2,
                          overflow: 'hidden',
                          border: (thm) => `1px solid ${alpha(thm.palette.common.white, thm.palette.mode === 'dark' ? 0.14 : 0.45)}`,
                          background: (thm) => alpha(thm.palette.background.paper, 0.4),
                          boxShadow: (thm) => `inset 0 1px 0 ${alpha(thm.palette.common.white, 0.22)}`,
                        }}
                      >
                        <Box sx={{ position: 'relative', height: { xs: 170, md: isPrimary ? 300 : 240 } }}>
                          {project.images.map((image, imageIndex) => {
                            const activeIndex = projectImageIndexes[project.title] ?? 0;
                            const isActive = imageIndex === activeIndex;
                            return (
                              <Box
                                key={image.src}
                                component="img"
                                src={image.src}
                                alt={image.caption}
                                loading="lazy"
                                decoding="async"
                                srcSet={buildUnsplashSrcSet(image.src)}
                                sizes="(max-width: 900px) 100vw, 50vw"
                                sx={{
                                  position: 'absolute',
                                  inset: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  opacity: isActive ? 1 : 0,
                                  transform: isActive ? 'scale(1)' : 'scale(1.06)',
                                  transition: 'opacity 700ms ease, transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                                }}
                              />
                            );
                          })}
                        </Box>

                        {isPrimary ? (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              px: 1,
                              py: 0.45,
                              borderRadius: 1.2,
                              bgcolor: (thm) => alpha(thm.palette.background.paper, 0.78),
                              border: (thm) => `1px solid ${alpha(thm.palette.common.white, 0.36)}`,
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                            }}
                          >
                            <Stack direction="row" spacing={0.6} alignItems="center">
                              <Iconify icon="carbon:time" width={14} />
                              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                {Math.max(1, Math.ceil(portfolioCountdownMs / 1000))}s
                              </Typography>
                            </Stack>
                          </Box>
                        ) : null}

                        <Stack direction="row" spacing={0.6} sx={{ position: 'absolute', top: 10, right: 10 }}>
                          <IconButton
                            onClick={() => goProjectImagePrev(project.title, project.images.length)}
                            sx={{
                              width: 30,
                              height: 30,
                              bgcolor: (thm) => alpha(thm.palette.background.paper, 0.78),
                              border: (thm) => `1px solid ${alpha(thm.palette.common.white, 0.36)}`,
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            <Iconify icon="carbon:chevron-left" width={16} />
                          </IconButton>
                          <IconButton
                            onClick={() => goProjectImageNext(project.title, project.images.length)}
                            sx={{
                              width: 30,
                              height: 30,
                              bgcolor: (thm) => alpha(thm.palette.background.paper, 0.78),
                              border: (thm) => `1px solid ${alpha(thm.palette.common.white, 0.36)}`,
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            <Iconify icon="carbon:chevron-right" width={16} />
                          </IconButton>
                        </Stack>
                      </Box>

                      <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.2 }}>
                        <Avatar
                          variant="rounded"
                          src={project.logo}
                          alt={project.title}
                          sx={{
                            width: isPrimary ? 44 : 38,
                            height: isPrimary ? 44 : 38,
                            bgcolor: alpha(project.color, 0.14),
                            border: `1px solid ${alpha(project.color, 0.3)}`,
                          }}
                        />
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant={isPrimary ? 'subtitle1' : 'subtitle2'} sx={{ fontWeight: 700 }}>
                            {project.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {project.type}
                          </Typography>
                        </Box>
                      </Stack>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1.2,
                          lineHeight: 1.65,
                          display: '-webkit-box',
                          WebkitLineClamp: isPrimary ? 3 : 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {project.summary}
                      </Typography>

                      <Stack direction="row" spacing={0.7} flexWrap="wrap" useFlexGap sx={{ mb: 1.3 }}>
                        {project.stack.slice(0, isPrimary ? 4 : 3).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{
                              backdropFilter: 'blur(6px)',
                              bgcolor: (thm) => alpha(thm.palette.background.paper, 0.45),
                              borderColor: (thm) => alpha(thm.palette.text.primary, 0.14),
                            }}
                          />
                        ))}
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                        <Button
                          size="small"
                          variant="contained"
                          onMouseEnter={prefetchProjectDetail}
                          onFocus={prefetchProjectDetail}
                          onClick={() => {
                            trackEvent('project_detail_open', { project: project.title });
                            navigate(`/projects/${project.slug}`);
                          }}
                        >
                          View details
                        </Button>
                        {project.link ? (
                          <Button
                            size="small"
                            endIcon={<Iconify icon="carbon:arrow-up-right" />}
                            component="a"
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('project_link_click', { project: project.title })}
                          >
                            Visit project
                          </Button>
                        ) : null}
                      </Stack>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>

            <Stack direction="row" spacing={0.8} justifyContent="center" sx={{ mt: 1.3 }}>
              {Array.from({ length: totalProjects }).map((_, idx) => (
                <Box
                  key={idx}
                  onClick={() => {
                    setPortfolioDirection(idx > portfolioIndex ? 'next' : 'prev');
                    setPortfolioIndex(idx);
                    setPortfolioCountdownMs(PORTFOLIO_HIGHLIGHT_MS);
                  }}
                  sx={{
                    width: portfolioIndex === idx ? 24 : 8,
                    height: 8,
                    borderRadius: 999,
                    bgcolor: portfolioIndex === idx ? 'primary.main' : alpha(theme.palette.text.primary, 0.25),
                    boxShadow: portfolioIndex === idx ? `0 0 16px ${alpha(theme.palette.primary.main, 0.55)}` : 'none',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Box id="writing" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2 }}>
              WRITING
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.35rem', md: '3rem' }, lineHeight: 1.2 }}>
              Writing and thought process
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: 'auto' }}>
              I use this section to document what I am learning while building, with clear publication and update context.
            </Typography>
          </Box>

          <Card
            sx={{ mb: 3, overflow: 'hidden', cursor: 'pointer' }}
            onMouseEnter={prefetchBlogDetail}
            onFocus={prefetchBlogDetail}
            onClick={() => {
              trackEvent('blog_post_open', { post_id: featuredPost.id, source: 'featured' });
              navigate(`/blog/${featuredPost.id}`);
            }}
          >
            <Grid container>
              <Grid size={{ xs: 12, md: 5 }}>
                <Box
                  component="img"
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  loading="lazy"
                  decoding="async"
                  sx={{ width: '100%', height: { xs: 220, md: '100%' }, objectFit: 'cover' }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 7 }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                    <Chip label="Featured" size="small" color="primary" />
                    <Chip label={featuredPost.category} size="small" variant="outlined" />
                    {featuredPost.focus && <Chip label={featuredPost.focus} size="small" color="secondary" />}
                  </Stack>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5, fontSize: { xs: '1.4rem', md: '2rem' } }}>
                    {featuredPost.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                    {featuredPost.excerpt}
                  </Typography>
                  <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
                    <Typography variant="caption" color="text.secondary">
                      Published: {featuredPost.publishDate}
                    </Typography>
                    {featuredPost.updatedDate && (
                      <Typography variant="caption" color="text.secondary">
                        Updated: {featuredPost.updatedDate}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary">
                      {featuredPost.readTime}
                    </Typography>
                  </Stack>
                </CardContent>
              </Grid>
            </Grid>
          </Card>

          <Grid container spacing={3}>
            {recentPosts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: (thm) => thm.customShadows.z16 },
                  }}
                  onMouseEnter={prefetchBlogDetail}
                  onFocus={prefetchBlogDetail}
                  onClick={() => {
                    trackEvent('blog_post_open', { post_id: post.id, source: 'grid' });
                    navigate(`/blog/${post.id}`);
                  }}
                >
                  <Box
                    component="img"
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    sx={{ width: '100%', height: 190, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                      <Chip label={post.category} size="small" variant="outlined" />
                      {post.focus && <Chip label={post.focus} size="small" color="secondary" />}
                    </Stack>
                    <Typography variant="h6" sx={{ mb: 1.2, fontWeight: 700, lineHeight: 1.4 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                      {post.excerpt}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Published: {post.publishDate}
                    </Typography>
                    {post.updatedDate && (
                      <Typography variant="caption" color="text.secondary">
                        Updated: {post.updatedDate}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box id="contact" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.neutral' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2 }}>
              CONTACT
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 700, fontSize: { xs: '1.8rem', sm: '2.35rem', md: '3rem' }, lineHeight: 1.2 }}>
              Collaboration channels and media kit
            </Typography>
            <Typography variant="body1" color="text.secondary">
              If you want to collaborate, invite me to speak, or discuss mentorship and consulting, this section is the fastest path.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Card sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Contact channels
                </Typography>
                <Stack spacing={1.5}>
                  {CONTACT_CHANNELS.map((contact) => (
                    <Box
                      key={contact.label}
                      sx={{
                        p: 1.5,
                        borderRadius: 1.8,
                        border: (thm) => `1px solid ${thm.palette.divider}`,
                        bgcolor: 'background.neutral',
                      }}
                    >
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1.2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(theme.palette[contact.color as PaletteColor].main, 0.12),
                            color: `${contact.color}.main`,
                          }}
                        >
                          <Iconify icon={contact.icon} width={19} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            {contact.label}
                          </Typography>
                          {contact.href ? (
                            <Typography
                              component="a"
                              href={contact.href}
                              variant="subtitle2"
                              onClick={() => trackEvent('contact_channel_click', { channel: contact.label })}
                              sx={{ color: 'text.primary', textDecoration: 'none', wordBreak: 'break-word', '&:hover': { color: 'primary.main' } }}
                            >
                              {contact.value}
                            </Typography>
                          ) : (
                            <Typography variant="subtitle2">{contact.value}</Typography>
                          )}
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 2.5 }} />
                <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap" useFlexGap>
                  {SOCIALS.map((social) => (
                    <Tooltip key={social.icon} title={social.label} arrow>
                      <IconButton
                        component="a"
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('social_click', { platform: social.label })}
                        sx={{
                          width: 46,
                          height: 46,
                          bgcolor: (thm) => {
                            if (social.color === 'text.primary') {
                              return alpha(thm.palette.text.primary, 0.1);
                            }
                            const color = social.color as PaletteColor;
                            return alpha(thm.palette[color]?.main || thm.palette.primary.main, 0.1);
                          },
                          color: (thm) => {
                            if (social.color === 'text.primary') {
                              return thm.palette.text.primary;
                            }
                            const color = social.color as PaletteColor;
                            return thm.palette[color]?.main || thm.palette.primary.main;
                          },
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: (thm) => thm.customShadows.z12,
                          },
                        }}
                      >
                        <Iconify icon={social.icon} width={22} />
                      </IconButton>
                    </Tooltip>
                  ))}
                </Stack>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Card sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Collaboration
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                  I am currently prioritizing partnerships in AI infrastructure research, language technology, accessibility, mentorship programs, and speaking engagements.
                </Typography>

                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  {[
                    'Product partnerships and implementation support',
                    'Mentorship for data and AI learners',
                    'Speaking invitations and workshop sessions',
                    'Strategic collaboration with schools and communities',
                  ].map((item) => (
                    <Stack key={item} direction="row" spacing={1} alignItems="flex-start">
                      <Iconify icon="carbon:checkmark-filled" width={16} style={{ marginTop: 3 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {item}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Divider sx={{ mb: 2.5 }} />

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                  Media kit
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} sx={{ mb: 2.5 }}>
                  <Button
                    component="a"
                    href="/assets/docs/IRANKUNDA-Elyssa-CV.pdf"
                    download="IRANKUNDA-Elyssa-CV.pdf"
                    variant="outlined"
                    startIcon={<Iconify icon="carbon:document-download" />}
                    onClick={() => trackEvent('download_cv_click', { location: 'contact_media_kit' })}
                  >
                    CV
                  </Button>
                  <Button
                    component="a"
                    href="/assets/docs/IRANKUNDA-Elyssa-Media-Kit.pdf"
                    download="IRANKUNDA-Elyssa-Media-Kit.pdf"
                    variant="contained"
                    startIcon={<Iconify icon="carbon:download" />}
                    onClick={() => trackEvent('download_media_kit_click', { location: 'contact_media_kit' })}
                  >
                    Bio + media kit
                  </Button>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button
                    component="a"
                    href="mailto:info@ielyssa.com"
                    variant="contained"
                    startIcon={<Iconify icon="carbon:email" />}
                    onClick={() => trackEvent('contact_email_primary_click', { location: 'contact_collaboration_card' })}
                  >
                    Email me
                  </Button>
                  <Button
                    component="a"
                    href="https://www.linkedin.com/in/irankunda-elyssa-452001290/"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<Iconify icon="mdi:linkedin" />}
                    onClick={() => trackEvent('contact_linkedin_click', { location: 'contact_collaboration_card' })}
                  >
                    Connect on LinkedIn
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

function ScrollReveal({
  children,
  delay = 0,
  threshold = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  threshold?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(22px)',
        transition: `opacity 520ms ease ${delay}ms, transform 640ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
}

function PortfolioSkeleton() {
  return (
    <Box>
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
              <Skeleton variant="text" width="35%" height={36} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="90%" height={72} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="68%" height={52} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={92} sx={{ borderRadius: 2, mb: 3 }} />
              <Stack direction="row" spacing={2}>
                <Skeleton variant="rectangular" width={160} height={46} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={160} height={46} sx={{ borderRadius: 2 }} />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Skeleton variant="circular" width={300} height={300} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
