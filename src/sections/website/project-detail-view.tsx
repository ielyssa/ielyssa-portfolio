import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, useTheme } from '@mui/material/styles';
import { varAlpha } from 'minimal-shared/utils';

import { Iconify } from 'src/components/iconify';

import { PORTFOLIO_ITEMS, type PortfolioProject } from './project-data';

const UNSPLASH_WIDTHS = [480, 768, 1200, 1600];

function replaceUnsplashWidth(src: string, width: number) {
  return src.replace(/([?&])w=\d+/g, `$1w=${width}`);
}

function buildUnsplashSrcSet(src: string) {
  if (!src.includes('images.unsplash.com')) return undefined;
  return UNSPLASH_WIDTHS.map((width) => `${replaceUnsplashWidth(src, width)} ${width}w`).join(', ');
}

export function ProjectDetailView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const navigate = useNavigate();
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState<'next' | 'prev'>('next');
  const [isImageAutoPlay, setIsImageAutoPlay] = useState(true);
  const [isImagePaused, setIsImagePaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProject(PORTFOLIO_ITEMS.find((item) => item.slug === slug) || null);
      setLoading(false);
    }, 650);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    setImageIndex(0);
    setIsImageAutoPlay(!prefersReducedMotion);
    setIsImagePaused(false);
    setIsLightboxOpen(false);
    setCopied(false);
  }, [slug, prefersReducedMotion]);

  useEffect(() => {
    if (!project || isImagePaused || !isImageAutoPlay || prefersReducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setImageIndex((prev) => (prev + 1) % project.images.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [project, isImagePaused, isImageAutoPlay, prefersReducedMotion]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const projectIndex = useMemo(() => PORTFOLIO_ITEMS.findIndex((item) => item.slug === slug), [slug]);
  const prevProject = useMemo(() => {
    if (projectIndex < 0) return null;
    return PORTFOLIO_ITEMS[(projectIndex - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length];
  }, [projectIndex]);
  const nextProject = useMemo(() => {
    if (projectIndex < 0) return null;
    return PORTFOLIO_ITEMS[(projectIndex + 1) % PORTFOLIO_ITEMS.length];
  }, [projectIndex]);

  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsLightboxOpen(false);
      if (event.key === 'ArrowRight') {
        setImageDirection('next');
        setImageIndex((prev) => (prev + 1) % project.images.length);
      }
      if (event.key === 'ArrowLeft') {
        setImageDirection('prev');
        setImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project]);

  if (loading) return <ProjectDetailSkeleton />;

  if (!project) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Project not found
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="carbon:arrow-left" />} onClick={() => navigate('/')}>
          Back to portfolio
        </Button>
      </Container>
    );
  }

  const currentImage = project.images[imageIndex];
  const nextImage = () => {
    setImageDirection('next');
    setImageIndex((prev) => (prev + 1) % project.images.length);
  };
  const prevImage = () => {
    setImageDirection('prev');
    setImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const onImageTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const onImageTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - event.changedTouches[0].clientX;
    if (delta > 45) nextImage();
    if (delta < -45) prevImage();
    touchStartX.current = null;
  };

  const copyLink = async () => {
    const projectUrl = `${window.location.origin}/projects/${project.slug}`;
    try {
      await navigator.clipboard.writeText(projectUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const jumpToSection = (sectionId: string) => {
    const node = document.getElementById(sectionId);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} justifyContent="space-between" sx={{ mb: 1.6 }}>
          <Button
            startIcon={<Iconify icon="carbon:arrow-left" />}
            onClick={() => navigate('/#portfolio')}
          >
            Back to portfolio
          </Button>
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" startIcon={<Iconify icon="carbon:share" />} onClick={copyLink}>
              {copied ? 'Copied' : 'Copy link'}
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            p: { xs: 1.2, md: 1.4 },
            mb: 2.2,
            borderRadius: 2,
            border: (thm) => `1px solid ${varAlpha(thm.vars.palette.grey['500Channel'], 0.2)}`,
            bgcolor: (thm) =>
              varAlpha(
                thm.vars.palette.background.neutralChannel,
                thm.palette.mode === 'dark' ? 0.6 : 0.9
              ),
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between">
            <Stack direction="row" spacing={1.1} alignItems="center">
              <Avatar
                variant="rounded"
                src={project.logo}
                alt={project.title}
                sx={{
                  width: 42,
                  height: 42,
                  bgcolor: alpha(project.color, 0.16),
                  border: `1px solid ${alpha(project.color, 0.34)}`,
                }}
              />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.55rem' }, lineHeight: 1.2 }}>
                  {project.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.2 }}>
                  {project.type}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={0.7} flexWrap="wrap" useFlexGap>
              <Chip
                size="small"
                icon={<Iconify icon="carbon:data-vis-4" />}
                label={`${project.images.length} visuals`}
                sx={{
                  bgcolor: (thm) =>
                    varAlpha(
                      thm.vars.palette.background.paperChannel,
                      thm.palette.mode === 'dark' ? 0.52 : 0.82
                    ),
                  border: (thm) => `1px solid ${varAlpha(thm.vars.palette.grey['500Channel'], 0.2)}`,
                }}
              />
              <Chip
                size="small"
                icon={<Iconify icon="carbon:analytics" />}
                label={`${project.outcomes.length} outcomes`}
                sx={{
                  bgcolor: (thm) =>
                    varAlpha(
                      thm.vars.palette.background.paperChannel,
                      thm.palette.mode === 'dark' ? 0.52 : 0.82
                    ),
                  border: (thm) => `1px solid ${varAlpha(thm.vars.palette.grey['500Channel'], 0.2)}`,
                }}
              />
              <Chip
                size="small"
                icon={<Iconify icon="carbon:code" />}
                label={`${project.stack.length} tools`}
                sx={{
                  bgcolor: (thm) =>
                    varAlpha(
                      thm.vars.palette.background.paperChannel,
                      thm.palette.mode === 'dark' ? 0.52 : 0.82
                    ),
                  border: (thm) => `1px solid ${varAlpha(thm.vars.palette.grey['500Channel'], 0.2)}`,
                }}
              />
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 7fr) minmax(0, 5fr)' },
            gap: { xs: 2, md: 2.4 },
          }}
        >
          <Card
            sx={{
              p: { xs: 2.2, md: 3 },
              borderRadius: 2.5,
              border: (thm) => `1px solid ${alpha(thm.palette.text.primary, 0.1)}`,
              boxShadow: (thm) => thm.customShadows.z8,
            }}
          >
            <Stack direction="row" spacing={0.7} flexWrap="wrap" useFlexGap sx={{ mb: 1.5 }}>
              <Chip size="small" label="Summary" onClick={() => jumpToSection('project-summary')} />
              <Chip size="small" label="Problem" onClick={() => jumpToSection('project-problem')} />
              <Chip size="small" label="Approach" onClick={() => jumpToSection('project-approach')} />
              <Chip size="small" label="Next Step" onClick={() => jumpToSection('project-next-step')} />
              <Chip size="small" label="Outcomes" onClick={() => jumpToSection('project-outcomes')} />
            </Stack>

            <Section id="project-summary" title="Summary" content={project.summary} />
            <Section id="project-problem" title="Problem" content={project.problem} />
            <Section id="project-approach" title="Approach" content={project.approach} />
            <Section id="project-next-step" title="Next Step" content={project.nextStep} />

            <Divider sx={{ my: 2 }} />

            <Typography id="project-outcomes" variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
              Outcomes
            </Typography>
            <Stack spacing={0.7} sx={{ mb: 2.2 }}>
              {project.outcomes.map((item) => (
                <Typography key={item} variant="body2" color="text.secondary">
                  - {item}
                </Typography>
              ))}
            </Stack>

            {project.link ? (
              <Button component="a" href={project.link} target="_blank" rel="noopener noreferrer" endIcon={<Iconify icon="carbon:arrow-up-right" />}>
                Visit project website
              </Button>
            ) : null}
          </Card>

          <Stack spacing={2} sx={{ minWidth: 0, position: { md: 'sticky' }, top: { md: 96 }, alignSelf: 'start' }}>
            <Card
              onMouseEnter={() => setIsImagePaused(true)}
              onMouseLeave={() => setIsImagePaused(false)}
              onTouchStart={onImageTouchStart}
              onTouchEnd={onImageTouchEnd}
              sx={{
                p: 1.2,
                borderRadius: 2.5,
                border: (thm) => `1px solid ${varAlpha(thm.vars.palette.grey['500Channel'], 0.22)}`,
                bgcolor: (thm) =>
                  varAlpha(
                    thm.vars.palette.background.neutralChannel,
                    thm.palette.mode === 'dark' ? 0.58 : 0.92
                  ),
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 1.8,
                  overflow: 'hidden',
                  border: (thm) => `1px solid ${alpha(thm.palette.common.white, 0.38)}`,
                }}
              >
                <Box sx={{ position: 'relative', width: '100%', height: { xs: 230, sm: 270, md: 300 } }}>
                  {project.images.map((img, idx) => {
                    const isActive = idx === imageIndex;
                    return (
                      <Box
                        key={`${img.src}-inline-stage`}
                        component="img"
                        src={img.src}
                        alt={img.caption}
                        onClick={isActive ? () => setIsLightboxOpen(true) : undefined}
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          cursor: isActive ? 'zoom-in' : 'default',
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateX(0) scale(1)' : `translateX(${imageDirection === 'next' ? '-7%' : '7%'}) scale(1.05)`,
                          transition: prefersReducedMotion
                            ? 'none'
                            : 'opacity 620ms cubic-bezier(0.4, 0, 0.2, 1), transform 760ms cubic-bezier(0.22, 1, 0.36, 1)',
                          willChange: 'transform, opacity',
                          pointerEvents: isActive ? 'auto' : 'none',
                        }}
                        srcSet={buildUnsplashSrcSet(img.src)}
                        sizes="(max-width: 600px) 100vw, 42vw"
                        loading={idx === imageIndex ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    );
                  })}
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    left: 10,
                    right: 10,
                    bottom: 10,
                    px: 1.2,
                    py: 0.75,
                    borderRadius: 1.2,
                    bgcolor: (thm) =>
                      varAlpha(
                        thm.vars.palette.background.paperChannel,
                        thm.palette.mode === 'dark' ? 0.72 : 0.86
                      ),
                    border: (thm) => `1px solid ${varAlpha(thm.vars.palette.grey['500Channel'], 0.24)}`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {currentImage.caption}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0.6} sx={{ position: 'absolute', top: 10, left: 10 }}>
                  <Tooltip title={isImageAutoPlay ? 'Pause autoplay' : 'Play autoplay'}>
                    <IconButton
                      onClick={() => setIsImageAutoPlay((prev) => !prev)}
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: (thm) =>
                          varAlpha(
                            thm.vars.palette.background.paperChannel,
                            thm.palette.mode === 'dark' ? 0.64 : 0.84
                          ),
                        border: (thm) => `1px solid ${varAlpha(thm.vars.palette.grey['500Channel'], 0.24)}`,
                      }}
                    >
                      <Iconify icon={isImageAutoPlay ? 'carbon:pause' : 'carbon:play'} width={16} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Open fullscreen">
                    <IconButton
                      onClick={() => setIsLightboxOpen(true)}
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: (thm) =>
                          varAlpha(
                            thm.vars.palette.background.paperChannel,
                            thm.palette.mode === 'dark' ? 0.64 : 0.84
                          ),
                        border: (thm) => `1px solid ${varAlpha(thm.vars.palette.grey['500Channel'], 0.24)}`,
                      }}
                    >
                      <Iconify icon="carbon:maximize" width={16} />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Stack direction="row" spacing={0.6} sx={{ position: 'absolute', top: 10, right: 10 }}>
                  <IconButton
                    onClick={prevImage}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: (thm) =>
                        varAlpha(
                          thm.vars.palette.background.paperChannel,
                          thm.palette.mode === 'dark' ? 0.64 : 0.84
                        ),
                      border: (thm) => `1px solid ${varAlpha(thm.vars.palette.grey['500Channel'], 0.24)}`,
                    }}
                  >
                    <Iconify icon="carbon:chevron-left" width={16} />
                  </IconButton>
                  <IconButton
                    onClick={nextImage}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: (thm) =>
                        varAlpha(
                          thm.vars.palette.background.paperChannel,
                          thm.palette.mode === 'dark' ? 0.64 : 0.84
                        ),
                      border: (thm) => `1px solid ${varAlpha(thm.vars.palette.grey['500Channel'], 0.24)}`,
                    }}
                  >
                    <Iconify icon="carbon:chevron-right" width={16} />
                  </IconButton>
                </Stack>
              </Box>
              <Stack direction="row" spacing={0.7} justifyContent="center" sx={{ pt: 1 }}>
                {project.images.map((img, idx) => (
                  <Box
                    key={img.src}
                    onClick={() => {
                      setImageDirection(idx > imageIndex ? 'next' : 'prev');
                      setImageIndex(idx);
                    }}
                    sx={{
                      width: idx === imageIndex ? 24 : 8,
                      height: 8,
                      borderRadius: 999,
                      bgcolor: idx === imageIndex ? 'primary.main' : alpha(project.color, 0.35),
                      transition: 'all 260ms ease',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Stack>
              <Stack direction="row" spacing={0.8} sx={{ pt: 1 }} justifyContent="center">
                {project.images.map((img, idx) => (
                  <Box
                    key={`${img.src}-thumb`}
                    onClick={() => {
                      setImageDirection(idx > imageIndex ? 'next' : 'prev');
                      setImageIndex(idx);
                    }}
                    component="img"
                    src={img.src}
                    alt={img.caption}
                    srcSet={buildUnsplashSrcSet(img.src)}
                    sizes="44px"
                    loading="lazy"
                    decoding="async"
                    sx={{
                      width: 44,
                      height: 30,
                      borderRadius: 1,
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: (thm) =>
                        `1px solid ${idx === imageIndex ? thm.palette.primary.main : alpha(thm.palette.text.primary, 0.2)}`,
                      opacity: idx === imageIndex ? 1 : 0.7,
                      transition: 'all 240ms ease',
                    }}
                  />
                ))}
              </Stack>
            </Card>

            <Card
              sx={{
                p: { xs: 2, md: 2.2 },
                borderRadius: 2.2,
                border: (thm) => `1px solid ${alpha(thm.palette.text.primary, 0.1)}`,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.2 }}>
                Tech stack
              </Typography>
              <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                {project.stack.map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Stack>
            </Card>
          </Stack>
        </Box>

        <Box
          sx={{
            mt: { xs: 2, md: 2.4 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 1.2,
          }}
        >
          {prevProject ? (
            <Card
              component="button"
              type="button"
              aria-label={`Open previous project ${prevProject.title}`}
              onClick={() => navigate(`/projects/${prevProject.slug}`)}
              sx={{
                p: { xs: 1.2, md: 1.5 },
                borderRadius: 2,
                cursor: 'pointer',
                border: (thm) => `1px solid ${alpha(thm.palette.text.primary, 0.1)}`,
                textAlign: 'left',
                width: '100%',
                bgcolor: 'background.paper',
                transition: 'transform 220ms ease, box-shadow 220ms ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: (thm) => thm.customShadows.z8 },
                '&:focus-visible': {
                  outline: (thm) => `2px solid ${thm.palette.primary.main}`,
                  outlineOffset: 2,
                },
              }}
            >
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Avatar variant="rounded" src={prevProject.logo} alt={prevProject.title} sx={{ width: 36, height: 36 }} />
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Previous project
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>
                    {prevProject.title}
                  </Typography>
                </Box>
                <Iconify icon="carbon:arrow-left" width={18} />
              </Stack>
            </Card>
          ) : null}

          {nextProject ? (
            <Card
              component="button"
              type="button"
              aria-label={`Open next project ${nextProject.title}`}
              onClick={() => navigate(`/projects/${nextProject.slug}`)}
              sx={{
                p: { xs: 1.2, md: 1.5 },
                borderRadius: 2,
                cursor: 'pointer',
                border: (thm) => `1px solid ${alpha(thm.palette.text.primary, 0.1)}`,
                textAlign: 'left',
                width: '100%',
                bgcolor: 'background.paper',
                transition: 'transform 220ms ease, box-shadow 220ms ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: (thm) => thm.customShadows.z8 },
                '&:focus-visible': {
                  outline: (thm) => `2px solid ${thm.palette.primary.main}`,
                  outlineOffset: 2,
                },
              }}
            >
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Avatar variant="rounded" src={nextProject.logo} alt={nextProject.title} sx={{ width: 36, height: 36 }} />
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Next project
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>
                    {nextProject.title}
                  </Typography>
                </Box>
                <Iconify icon="carbon:arrow-right" width={18} />
              </Stack>
            </Card>
          ) : null}
        </Box>

        <Dialog
          fullScreen={isMobile}
          fullWidth
          maxWidth="xl"
          open={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          sx={{
            '& .MuiBackdrop-root': {
              background: 'radial-gradient(circle at 20% 10%, rgba(65, 90, 255, 0.2), rgba(0, 0, 0, 0.9) 55%)',
              backdropFilter: 'blur(6px)',
            },
            '& .MuiDialog-paper': {
              bgcolor: 'transparent',
              boxShadow: 'none',
              overflow: 'visible',
            },
          }}
        >
          <DialogContent sx={{ p: { xs: 0, md: 1.4 }, bgcolor: 'transparent' }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: { xs: 0, sm: 2 },
                overflow: 'hidden',
                border: (thm) => `1px solid ${alpha(thm.palette.common.white, 0.15)}`,
                bgcolor: alpha(theme.palette.common.black, 0.75),
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '72vh', md: '82vh' },
                  bgcolor: 'black',
                }}
              >
                {project.images.map((img, idx) => {
                  const isActive = idx === imageIndex;
                  return (
                    <Box
                      key={`${img.src}-lightbox-stage`}
                      component="img"
                      src={img.src}
                      alt={img.caption}
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0) scale(1)' : `translateX(${imageDirection === 'next' ? '-8%' : '8%'}) scale(1.03)`,
                        transition: prefersReducedMotion
                          ? 'none'
                          : 'opacity 680ms cubic-bezier(0.4, 0, 0.2, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                        willChange: 'transform, opacity',
                      }}
                      srcSet={buildUnsplashSrcSet(img.src)}
                      sizes="100vw"
                      loading={idx === imageIndex ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  );
                })}
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.72)} 0%, ${alpha(theme.palette.common.black, 0.38)} 42%, transparent 72%)`,
                  pointerEvents: 'none',
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  position: 'absolute',
                  top: { xs: 10, md: 14 },
                  left: { xs: 10, md: 14 },
                  right: { xs: 10, md: 14 },
                  justifyContent: 'space-between',
                }}
              >
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <Chip
                    size="small"
                    label={project.title}
                    sx={{
                      maxWidth: 180,
                      display: { xs: 'none', sm: 'inline-flex' },
                      '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' },
                      bgcolor: (thm) => alpha(thm.palette.background.paper, 0.78),
                      backdropFilter: 'blur(8px)',
                    }}
                  />
                  <Chip
                    size="small"
                    label={`${imageIndex + 1}/${project.images.length}`}
                    sx={{ bgcolor: (thm) => alpha(thm.palette.background.paper, 0.78), backdropFilter: 'blur(8px)' }}
                  />
                </Stack>
                <IconButton onClick={() => setIsLightboxOpen(false)} sx={{ bgcolor: (thm) => alpha(thm.palette.background.paper, 0.78) }}>
                  <Iconify icon="carbon:close" width={18} />
                </IconButton>
              </Stack>

              <IconButton
                onClick={prevImage}
                sx={{
                  position: 'absolute',
                  left: { xs: 10, md: 14 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: (thm) => alpha(thm.palette.background.paper, 0.78),
                  backdropFilter: 'blur(8px)',
                  width: { xs: 34, md: 40 },
                  height: { xs: 34, md: 40 },
                }}
              >
                <Iconify icon="carbon:chevron-left" width={18} />
              </IconButton>
              <IconButton
                onClick={nextImage}
                sx={{
                  position: 'absolute',
                  right: { xs: 10, md: 14 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: (thm) => alpha(thm.palette.background.paper, 0.78),
                  backdropFilter: 'blur(8px)',
                  width: { xs: 34, md: 40 },
                  height: { xs: 34, md: 40 },
                }}
              >
                <Iconify icon="carbon:chevron-right" width={18} />
              </IconButton>

              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={1}
                sx={{
                  position: 'absolute',
                  left: { xs: 8, md: 14 },
                  right: { xs: 8, md: 14 },
                  bottom: { xs: 8, md: 12 },
                  alignItems: { xs: 'stretch', md: 'flex-end' },
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    maxWidth: { xs: '100%', md: 620 },
                    px: { xs: 1.2, md: 1.6 },
                    py: { xs: 1, md: 1.2 },
                    borderRadius: 1.6,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.18)} 0%, ${alpha(theme.palette.common.white, 0.08)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
                    boxShadow: `0 10px 36px ${alpha(theme.palette.common.black, 0.35)}`,
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'common.white',
                      fontWeight: 700,
                      mb: 0.35,
                      textShadow: `0 4px 18px ${alpha(theme.palette.common.black, 0.6)}`,
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha(theme.palette.common.white, 0.95),
                      lineHeight: 1.55,
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 2, md: 'unset' },
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textShadow: `0 2px 12px ${alpha(theme.palette.common.black, 0.55)}`,
                    }}
                  >
                    {currentImage.caption}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={0.55}
                  flexWrap="wrap"
                  useFlexGap
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    p: 0.8,
                    borderRadius: 1.4,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.16)} 0%, ${alpha(theme.palette.common.white, 0.08)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.common.white, 0.26)}`,
                    boxShadow: `0 8px 28px ${alpha(theme.palette.common.black, 0.32)}`,
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    justifyContent: { xs: 'center', md: 'flex-end' },
                  }}
                >
                  {project.images.map((img, idx) => (
                    <Box
                      key={`${img.src}-lightbox-thumb`}
                      onClick={() => {
                        setImageDirection(idx > imageIndex ? 'next' : 'prev');
                        setImageIndex(idx);
                      }}
                      component="img"
                      src={img.src}
                      alt={img.caption}
                      srcSet={buildUnsplashSrcSet(img.src)}
                      sizes="48px"
                      loading="lazy"
                      decoding="async"
                      sx={{
                        width: { xs: 38, md: 48 },
                        height: { xs: 24, md: 32 },
                        borderRadius: 0.8,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: (thm) =>
                          `1px solid ${idx === imageIndex ? thm.palette.primary.main : alpha(thm.palette.common.white, 0.24)}`,
                        opacity: idx === imageIndex ? 1 : 0.74,
                        transition: 'all 220ms ease',
                        '&:hover': { opacity: 1, transform: 'translateY(-1px)' },
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}

function Section({ id, title, content }: { id: string; title: string; content: string }) {
  return (
    <Box id={id} sx={{ mb: 2, scrollMarginTop: 110 }}>
      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
        {content}
      </Typography>
    </Box>
  );
}

function ProjectDetailSkeleton() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Skeleton variant="rectangular" width={140} height={36} sx={{ borderRadius: 1, mb: 3 }} />
        <Card sx={{ p: { xs: 2.2, md: 3 }, borderRadius: 2.5, mb: 2.2 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Skeleton variant="rectangular" width={52} height={52} sx={{ borderRadius: 2 }} />
            <Box>
              <Skeleton variant="text" width={220} height={36} />
              <Skeleton variant="text" width={120} height={20} />
            </Box>
          </Stack>
        </Card>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 7fr) minmax(0, 5fr)' }, gap: { xs: 2, md: 2.4 } }}>
          <Card sx={{ p: { xs: 2.2, md: 3 }, borderRadius: 2.5 }}>
            <Skeleton variant="text" width={130} height={26} />
            <Skeleton variant="text" width="100%" height={24} />
            <Skeleton variant="text" width="96%" height={24} />
            <Skeleton variant="text" width={120} height={26} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="100%" height={24} />
            <Skeleton variant="text" width="94%" height={24} />
            <Skeleton variant="text" width={120} height={26} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="98%" height={24} />
            <Skeleton variant="text" width="93%" height={24} />
            <Skeleton variant="text" width={120} height={26} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="96%" height={24} />
            <Skeleton variant="rectangular" width={190} height={40} sx={{ borderRadius: 1.5, mt: 2.2 }} />
          </Card>
          <Stack spacing={2}>
            <Card sx={{ p: 1.2, borderRadius: 2.5 }}>
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1.8 }} />
              <Stack direction="row" spacing={0.8} justifyContent="center" sx={{ pt: 1 }}>
                <Skeleton variant="rounded" width={22} height={8} />
                <Skeleton variant="rounded" width={8} height={8} />
                <Skeleton variant="rounded" width={8} height={8} />
              </Stack>
            </Card>
            <Card sx={{ p: 2, borderRadius: 2.2 }}>
              <Skeleton variant="text" width={120} height={28} />
              <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                <Skeleton variant="rounded" width={80} height={28} />
                <Skeleton variant="rounded" width={90} height={28} />
                <Skeleton variant="rounded" width={74} height={28} />
                <Skeleton variant="rounded" width={68} height={28} />
              </Stack>
            </Card>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
