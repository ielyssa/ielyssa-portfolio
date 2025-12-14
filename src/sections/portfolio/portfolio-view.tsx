import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import CardContent from '@mui/material/CardContent';
import { Tooltip, Link } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

import { BLOG_POSTS } from './blog-data';

type PaletteColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

// ----------------------------------------------------------------------

const SKILLS = [
  {
    icon: 'carbon:data-vis-1',
    label: 'Data Science',
    color: 'primary',
    description: 'Expert in machine learning, statistical analysis, and predictive modeling to extract valuable insights from complex datasets and drive data-driven decisions.'
  },
  {
    icon: 'carbon:chart-scatter',
    label: 'Data Analysis',
    color: 'info',
    description: 'Proficient in data cleaning, visualization, and exploratory analysis using Python, SQL, and modern BI tools to uncover patterns and trends.'
  },
  {
    icon: 'carbon:idea',
    label: 'Problem Solving',
    color: 'success',
    description: 'Strong analytical thinking and systematic approach to breaking down complex challenges and developing effective, scalable solutions.'
  }
];

const ATAS_PROJECTS = [
  {
    title: 'AcademiaPlus',
    description: 'AI-powered education management platform with intelligent quizzes, curriculum integration, and smart analytics.',
    icon: 'carbon:education',
    logo: '/assets/academiaplus-logo.png',
    color: '#1877F2',
    features: ['AI Tutors', 'Anti-Cheating', 'Smart Analytics'],
    link: 'https://academiaplus.net',
  },
  {
    title: 'EduBridge',
    description: 'Predictive AI platform analyzing student performance to detect dropout risks early.',
    icon: 'carbon:chart-treemap',
    logo: '/assets/edubridge-logo.png',
    color: '#8E33FF',
    features: ['Predictive Modeling', 'Early Alerts', 'Data-Driven'],
    link: '',
  },
  {
    title: 'Kinyarwanda TTS',
    description: 'Advanced AI model bringing natural voice technology to the Kinyarwanda language.',
    icon: 'carbon:volume-up',
    logo: '/assets/speech-to-speech-atas-preview.png',
    color: '#00B8D9',
    features: ['Natural Voice', 'Accessibility', 'Language Preservation'],
    link: '',
  },
];


const CONTACT_INFO = [
  {
    icon: 'mdi:email',
    label: 'Email',
    value: 'elyssa001ely@gmail.com',
    link: 'mailto:elyssa001ely@gmail.com',
    color: 'primary'
  },
  {
    icon: 'mdi:phone',
    label: 'Phone',
    value: '+250 788 235 574',
    link: 'tel:+250788235574',
    color: 'success'
  },
  {
    icon: 'mdi:map-marker',
    label: 'Location',
    value: 'Kigali, Rwanda',
    color: 'warning'
  },
  {
    icon: 'mdi:calendar',
    label: 'Availability',
    value: 'Open for opportunities',
    color: 'info'
  },
];

// ----------------------------------------------------------------------

export function PortfolioView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PortfolioSkeleton />;
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        id="about"
        sx={{
          position: 'relative',
          minHeight: { xs: '90vh', md: '100vh' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: (thm) =>
              `radial-gradient(circle, ${alpha(thm.palette.primary.main, 0.1)} 0%, transparent 70%)`,
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-30px)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '5%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: (thm) =>
              `radial-gradient(circle, ${alpha(thm.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  animation: 'fadeInUp 0.8s ease-out',
                  '@keyframes fadeInUp': {
                    from: { opacity: 0, transform: 'translateY(30px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Iconify icon="carbon:face-wink" width={24} />
                  Hello, I&apos;m
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
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
                  sx={{
                    color: 'text.secondary',
                    mb: 3,
                    fontWeight: 500,
                  }}
                >
                  Data Scientist | AI Developer | Co-founder of ATAS
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    maxWidth: 600,
                    lineHeight: 1.8,
                  }}
                >
                  At 20 years old, I&apos;m passionate about leveraging artificial intelligence and data science to solve real-world problems. As Co-founder of ATAS, I&apos;m building transformative AI solutions for Africa and beyond.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    size="large"
                    variant="contained"
                    startIcon={<Iconify icon="carbon:document-download" />}
                    component="a"
                    href="/IRANKUNDA-Elyssa-CV.pdf"
                    download="IRANKUNDA-Elyssa-CV.pdf"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      boxShadow: (thm) => thm.customShadows.z8,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'none',
                      },
                    }}
                  >
                    Download CV
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    startIcon={<Iconify icon="carbon:email" />}
                    href="#contact"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    Get in Touch
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  animation: 'fadeIn 1s ease-out 0.3s both',
                  '@keyframes fadeIn': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 250, sm: 300, md: 350 },
                    height: { xs: 250, sm: 300, md: 350 },
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: (thm) =>
                        `linear-gradient(135deg, ${thm.palette.primary.main} 0%, ${thm.palette.primary.dark} 100%)`,
                      animation: 'pulse 3s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
                        '50%': { transform: 'scale(1.05)', opacity: 0.3 },
                      },
                    }}
                  />
                  <Avatar
                    sx={{
                      width: '100%',
                      height: '100%',
                      border: (thm) => `4px solid ${thm.palette.background.paper}`,
                      boxShadow: (thm) => thm.customShadows.z24,
                      position: 'relative',
                      zIndex: 1,
                    }}
                    src="/assets/profile-picture.png"
                    alt="Elyssa IRANKUNDA"
                  >
                    <Iconify icon="carbon:user-avatar-filled" width={120} />
                  </Avatar>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Skills Section */}
      <Box
        id="skills"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.neutral',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              EXPERTISE
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 700 }}>
              Skills & Technologies
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Specialized in cutting-edge AI and data science technologies
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {SKILLS.map((skill, index) => (
              <Grid key={skill.label} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (thm) => thm.customShadows.z16,
                    },
                  }}
                >
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: (thm) => alpha(thm.palette[skill.color as PaletteColor].main, 0.08),
                        color: `${skill.color}.main`,
                      }}
                    >
                      <Iconify icon={skill.icon} width={28} />
                    </Box>
                    <Typography variant="h6" fontWeight={700}>
                      {skill.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                      {skill.description}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ATAS Company Section */}
      <Box
        id="company"
        sx={{
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '-5%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: (thm) =>
              `radial-gradient(circle, ${alpha(thm.palette.primary.main, 0.08)} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                mb: 2,
              }}
            >
              <Iconify icon="carbon:office" width={20} />
              MY COMPANY
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 700 }}>
              ATAS - Alliance for Transformative AI Systems
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontSize: '1.1rem' }}>
              Building AI-powered solutions that transform education, empower communities, and drive innovation across Africa
            </Typography>
          </Box>

          {/* Company Mission Card */}
          <Card
            sx={{
              mb: 8,
              overflow: 'hidden',
              position: 'relative',
              border: (thm) => `1px solid ${thm.palette.divider}`,
              boxShadow: (thm) => thm.customShadows.card,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '40%',
                height: '100%',
                background: (thm) =>
                  `linear-gradient(135deg, ${alpha(thm.palette.primary.main, 0.05)} 0%, ${alpha(thm.palette.primary.main, 0.05)} 100%)`,
                opacity: 0.5,
              }}
            />

            <Grid container spacing={0}>
              <Grid size={{ xs: 12, md: 5 }} sx={{ p: 0 }}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: { xs: 300, md: 400 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    p: 0,
                  }}
                >
                  <img
                    src="/assets/atas-logo-bg.png"
                    alt="ATAS Logo"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <Box sx={{ p: { xs: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                    <Iconify icon="carbon:target" width={28} sx={{ color: 'primary.main' }} />
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      Our Mission
                    </Typography>
                  </Stack>

                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontSize: '1.05rem' }}>
                    To leverage artificial intelligence in solving pressing challenges in education, communication, and technology while promoting innovation, ethics, and inclusivity across Africa.
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary', fontWeight: 600 }}>
                      Core Values
                    </Typography>
                    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                      <Chip
                        icon={<Iconify icon="carbon:checkmark-filled" width={16} />}
                        label="Ethical AI"
                        sx={{
                          bgcolor: (thm) => alpha(thm.palette.primary.main, 0.1),
                          color: 'primary.main',
                          fontWeight: 600,
                          borderRadius: 2,
                        }}
                      />
                      <Chip
                        icon={<Iconify icon="carbon:checkmark-filled" width={16} />}
                        label="Innovation Hub"
                        sx={{
                          bgcolor: (thm) => alpha(thm.palette.secondary.main, 0.1),
                          color: 'secondary.main',
                          fontWeight: 600,
                          borderRadius: 2,
                        }}
                      />
                      <Chip
                        icon={<Iconify icon="carbon:checkmark-filled" width={16} />}
                        label="Community Impact"
                        sx={{
                          bgcolor: (thm) => alpha(thm.palette.success.main, 0.1),
                          color: 'success.main',
                          fontWeight: 600,
                          borderRadius: 2,
                        }}
                      />
                    </Stack>
                  </Box>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                        <Iconify icon="carbon:earth-filled" width={20} sx={{ color: 'primary.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Pan-African
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        Solutions for all of Africa
                      </Typography>
                    </Box>
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                        <Iconify icon="carbon:trophy-filled" width={20} sx={{ color: 'secondary.main' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Award-Winning
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        Recognized for innovation
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* Projects Section */}
          <Box>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 5 }}>
              <Iconify icon="carbon:application" width={28} sx={{ color: 'primary.main' }} />
              <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
                Our Flagship Projects
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              {ATAS_PROJECTS.map((project, index) => (
                <Grid key={project.title} size={{ xs: 12, md: 4 }}>
                  {project.link ? (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="none"
                      sx={{
                        display: 'block',
                        height: '100%',
                        '&:hover': {
                          textDecoration: 'none',
                        },
                      }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          border: (thm) => `1px solid ${thm.palette.divider}`,
                          animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                          '@keyframes fadeInUp': {
                            from: { opacity: 0, transform: 'translateY(30px)' },
                            to: { opacity: 1, transform: 'translateY(0)' },
                          },
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: (thm) => thm.customShadows.z20,
                            '& .project-icon': {
                              transform: 'scale(1.1) rotate(5deg)',
                            },
                            // Add cursor pointer on hover
                            cursor: 'pointer',
                          },
                        }}
                      >
                        {/* Gradient Background */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '100%',
                            height: 120,
                            background: `linear-gradient(135deg, ${alpha(project.color, 0.08)} 0%, transparent 100%)`,
                            pointerEvents: 'none',
                          }}
                        />

                        <Box sx={{ p: 4, position: 'relative', zIndex: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          {/* Icon/Logo Container */}
                          <Box
                            className="project-icon"
                            sx={{
                              width: 70,
                              height: 70,
                              borderRadius: 3,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: alpha(project.color, 0.1),
                              mb: 3,
                              transition: 'transform 0.3s ease',
                              overflow: 'hidden',
                            }}
                          >
                            {project.logo ? (
                              <img
                                src={project.logo}
                                alt={`${project.title} logo`}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain',
                                  padding: '8px',
                                }}
                              />
                            ) : (
                              <Iconify icon={project.icon} width={36} sx={{ color: project.color }} />
                            )}
                          </Box>

                          {/* Title */}
                          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                            {project.title}
                          </Typography>

                          {/* Description */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 3, flexGrow: 1, lineHeight: 1.7 }}
                          >
                            {project.description}
                          </Typography>

                          {/* Features */}
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {project.features.map((feature) => (
                              <Chip
                                key={feature}
                                label={feature}
                                size="small"
                                sx={{
                                  bgcolor: (thm) => alpha(project.color, 0.08),
                                  color: project.color,
                                  fontWeight: 500,
                                  border: `1px solid ${alpha(project.color, 0.2)}`,
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>

                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 4,
                            background: `linear-gradient(90deg, ${project.color} 0%, transparent 100%)`,
                          }}
                        />
                      </Card>
                    </Link>
                  ) : (
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        border: (thm) => `1px solid ${thm.palette.divider}`,
                        animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                        '@keyframes fadeInUp': {
                          from: { opacity: 0, transform: 'translateY(30px)' },
                          to: { opacity: 1, transform: 'translateY(0)' },
                        },
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: (thm) => thm.customShadows.z20,
                          '& .project-icon': {
                            transform: 'scale(1.1) rotate(5deg)',
                          },
                          // Add cursor pointer on hover
                          cursor: 'pointer',
                        },
                      }}
                    >
                      {/* Gradient Background */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '100%',
                          height: 120,
                          background: `linear-gradient(135deg, ${alpha(project.color, 0.08)} 0%, transparent 100%)`,
                          pointerEvents: 'none',
                        }}
                      />

                      <Box sx={{ p: 4, position: 'relative', zIndex: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Icon/Logo Container */}
                        <Box
                          className="project-icon"
                          sx={{
                            width: 70,
                            height: 70,
                            borderRadius: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(project.color, 0.1),
                            mb: 3,
                            transition: 'transform 0.3s ease',
                            overflow: 'hidden',
                          }}
                        >
                          {project.logo ? (
                            <img
                              src={project.logo}
                              alt={`${project.title} logo`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                padding: '8px',
                              }}
                            />
                          ) : (
                            <Iconify icon={project.icon} width={36} sx={{ color: project.color }} />
                          )}
                        </Box>

                        {/* Title */}
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                          {project.title}
                        </Typography>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 3, flexGrow: 1, lineHeight: 1.7 }}
                        >
                          {project.description}
                        </Typography>

                        {/* Features */}
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {project.features.map((feature) => (
                            <Chip
                              key={feature}
                              label={feature}
                              size="small"
                              sx={{
                                bgcolor: (thm) => alpha(project.color, 0.08),
                                color: project.color,
                                fontWeight: 500,
                                border: `1px solid ${alpha(project.color, 0.2)}`,
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>

                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: `linear-gradient(90deg, ${project.color} 0%, transparent 100%)`,
                        }}
                      />
                    </Card>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Blog Section */}
      <Box
        id="blog"
        sx={{
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              INSIGHTS & ARTICLES
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 700 }}>
              Latest from the Blog
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Thoughts on AI, data science, entrepreneurship, and building the future of technology in Africa
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {BLOG_POSTS.map((post, index) => (
              <Grid key={post.id} size={{ xs: 12, md: post.featured ? 12 : 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: post.featured ? { xs: 'column', md: 'row' } : 'column',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: theme.customShadows.z24,
                      '&::before': {
                        opacity: 1,
                      },
                      '& .blog-image': {
                        transform: 'scale(1.1)',
                      },
                    },
                    '@keyframes fadeInUp': {
                      from: { opacity: 0, transform: 'translateY(30px)' },
                      to: { opacity: 1, transform: 'translateY(0)' },
                    },
                  }}
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  {/* Featured Badge */}
                  {post.featured && (
                    <Chip
                      icon={<Iconify icon="carbon:star-filled" />}
                      label="Featured"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 2,
                        fontWeight: 600,
                        animation: 'pulse 2s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%, 100%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.05)' },
                        },
                      }}
                    />
                  )}

                  {/* Image */}
                  <Box
                    sx={{
                      width: post.featured ? { xs: '100%', md: '50%' } : '100%',
                      height: post.featured ? { xs: 250, md: '100%' } : 200,
                      overflow: 'hidden',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <Box
                      className="blog-image"
                      component="img"
                      src={post.coverImage}
                      alt={post.title}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const icon = document.createElement('div');
                          icon.innerHTML = '📝';
                          icon.style.fontSize = '60px';
                          parent.appendChild(icon);
                        }
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <CardContent
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      p: post.featured ? { xs: 3, md: 4 } : 3,
                    }}
                  >
                    {/* Category & Read Time */}
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Chip label={post.category} size="small" color="secondary" variant="outlined" />
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Iconify icon="carbon:time" width={16} sx={{ color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {post.readTime}
                        </Typography>
                      </Stack>
                    </Stack>

                    {/* Title */}
                    <Typography
                      variant={post.featured ? 'h4' : 'h6'}
                      sx={{
                        mb: 2,
                        fontWeight: 700,
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {post.title}
                    </Typography>

                    {/* Excerpt */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: post.featured ? 3 : 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.7,
                      }}
                    >
                      {post.excerpt}
                    </Typography>

                    {/* Author & Date */}
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          src={post.author.avatar}
                          alt={post.author.name}
                          sx={{ width: 32, height: 32 }}
                        >
                          <Iconify icon="carbon:user-avatar-filled" />
                        </Avatar>
                        <Box>
                          <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>
                            {post.author.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {post.publishDate}
                          </Typography>
                        </Box>
                      </Stack>

                      <Button
                        endIcon={<Iconify icon="carbon:arrow-right" />}
                        sx={{
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        Read More
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.neutral',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              GET IN TOUCH
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 700 }}>
              Let&apos;s Connect
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat
            </Typography>
          </Box>

          <Card sx={{ p: { xs: 3, md: 5 } }}>
            <Grid container spacing={2}>
              {CONTACT_INFO.map((contact, index) => (
                <Grid key={contact.label} size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 3,
                      borderRadius: 2,
                      bgcolor: 'background.neutral',
                      transition: 'all 0.3s ease',
                      border: (thm) => `1px solid ${thm.palette.divider}`,
                      height: '100%',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        transform: 'translateY(-4px)',
                        boxShadow: (thm) => thm.customShadows.z8,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(theme.palette[contact.color as PaletteColor].main, 0.1),
                        flexShrink: 0,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Iconify
                        icon={contact.icon}
                        width={28}
                        sx={{ color: `${contact.color as PaletteColor}.main` }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: 'text.secondary', mb: 0.5, fontWeight: 500 }}
                      >
                        {contact.label}
                      </Typography>
                      {contact.link ? (
                        <Typography
                          component="a"
                          href={contact.link}
                          variant="h6"
                          sx={{
                            color: 'text.primary',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            '&:hover': {
                              color: 'primary.main',
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {contact.value}
                        </Typography>
                      ) : (
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: '1rem', md: '1.125rem' }
                          }}
                        >
                          {contact.value}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Let&apos;s Connect
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                Feel free to reach out through any platform. I&apos;m always open to discussing new opportunities and collaborations.
              </Typography>
              <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap" useFlexGap>
                {[
                  {
                    icon: 'mdi:email',
                    color: 'primary',
                    label: 'Email',
                    link: 'mailto:elyssa001ely@gmail.com'
                  },
                  {
                    icon: 'mdi:linkedin',
                    color: 'info',
                    label: 'LinkedIn',
                    link: 'https://www.linkedin.com/in/irankunda-elyssa-452001290/'
                  },
                  {
                    icon: 'mdi:github',
                    color: 'text.primary',
                    label: 'GitHub',
                    link: 'https://github.com/ielyssa'
                  },
                  {
                    icon: 'mdi:twitter',
                    color: 'secondary',
                    label: 'Twitter',
                    link: 'https://x.com/elyssa_ira'
                  },
                  {
                    icon: 'mdi:instagram',
                    color: 'error',
                    label: 'Instagram',
                    link: 'https://www.instagram.com/_ielyssa/'
                  },
                ].map((social) => (
                  <Tooltip key={social.icon} title={social.label} arrow>
                    <IconButton
                      component="a"
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: 48,
                        height: 48,
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
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: (thm) => {
                            if (social.color === 'text.primary') {
                              return thm.palette.text.primary;
                            }
                            const color = social.color as PaletteColor;
                            return thm.palette[color]?.main || thm.palette.primary.main;
                          },
                          color: 'white',
                          transform: 'translateY(-4px)',
                          boxShadow: (thm) => thm.customShadows.z12,
                        },
                      }}
                    >
                      <Iconify icon={social.icon} width={24} />
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function PortfolioSkeleton() {
  return (
    <Box>
      {/* Hero Skeleton */}
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="90%" height={80} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="70%" height={50} sx={{ mb: 3 }} />
              <Skeleton variant="rectangular" width="100%" height={100} sx={{ mb: 3, borderRadius: 2 }} />
              <Stack direction="row" spacing={2}>
                <Skeleton variant="rectangular" width={150} height={50} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={150} height={50} sx={{ borderRadius: 2 }} />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Skeleton variant="circular" width={300} height={300} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Skills Skeleton */}
      <Box sx={{ py: 12, bgcolor: 'background.neutral' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Skeleton variant="text" width="20%" height={40} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="60%" height={60} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="40%" height={30} sx={{ mx: 'auto' }} />
          </Box>
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ p: 4, textAlign: 'center' }}>
                  <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 2 }} />
                  <Skeleton variant="text" width="60%" height={30} sx={{ mx: 'auto' }} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Company Skeleton */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Skeleton variant="text" width="20%" height={40} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="70%" height={60} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="50%" height={30} sx={{ mx: 'auto' }} />
          </Box>
          <Skeleton variant="rectangular" height={300} sx={{ mb: 6, borderRadius: 2 }} />
          <Grid container spacing={4}>
            {[...Array(3)].map((_, index) => (
              <Grid key={index} size={{ xs: 12, md: 4 }}>
                <Card sx={{ p: 4 }}>
                  <Skeleton variant="rectangular" width={60} height={60} sx={{ mb: 2, borderRadius: 2 }} />
                  <Skeleton variant="text" width="70%" height={40} sx={{ mb: 2 }} />
                  <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="80%" height={20} sx={{ mb: 3 }} />
                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="rectangular" width={70} height={30} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" width={90} height={30} sx={{ borderRadius: 1 }} />
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}