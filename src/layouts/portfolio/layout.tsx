import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Zoom from '@mui/material/Zoom';
import { useColorScheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation, useNavigate } from 'react-router-dom';

import { Iconify } from 'src/components/iconify';
import { Logo } from 'src/components/logo';
import { LayoutSection } from 'src/layouts/core/layout-section';
import { HeaderSection } from 'src/layouts/core/header-section';
import { MainSection } from 'src/layouts/core/main-section';

// ----------------------------------------------------------------------

type PortfolioLayoutProps = {
  children: React.ReactNode;
};

type NavItem = {
  label: string;
  href: string;
  kind: 'section' | 'route';
  prefetch?: () => Promise<unknown>;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', kind: 'section' },
  { label: 'About', href: '#about', kind: 'section' },
  { label: 'Focus', href: '#focus', kind: 'section' },
  { label: 'ATAS', href: '#atas', kind: 'section' },
  { label: 'Portfolio', href: '#portfolio', kind: 'section' },
  { label: 'Writing', href: '#writing', kind: 'section' },
  { label: 'Speaking', href: '/speaking', kind: 'route', prefetch: () => import('src/pages/speaking') },
  { label: 'Contact', href: '#contact', kind: 'section' },
];

const SOCIAL_LINKS = [
  { icon: 'mdi:instagram', href: 'https://www.instagram.com/_ielyssa/', label: 'Instagram', color: '#E4405F' },
  { icon: 'mdi:linkedin', href: 'https://www.linkedin.com/in/irankunda-elyssa-452001290/', label: 'LinkedIn', color: '#0A66C2' },
  { icon: 'mdi:twitter', href: 'https://x.com/elyssa_ira', label: 'X (Twitter)', color: '#000000' },
  { icon: 'mdi:github', href: 'https://github.com/ielyssa', label: 'GitHub', color: '#181717' },
];

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, setMode } = useColorScheme();
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle dark mode toggle
  const handleThemeToggle = () => {
    if (mode && setMode) {
      setMode(mode === 'light' ? 'dark' : 'light');
    }
  };

  // Handle mobile menu
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const performSectionScroll = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (!element) return false;
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
    return true;
  }, [prefersReducedMotion]);

  // Smooth scroll to section (works across routes)
  const scrollToSection = (href: string) => {
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: href });
      setMobileOpen(false);
      return;
    }
    performSectionScroll(href);
    setMobileOpen(false);
  };

  const isNavItemActive = (item: NavItem) => {
    if (item.kind === 'route') return location.pathname === item.href;
    return location.pathname === '/' && activeSection === item.href.substring(1);
  };

  const handleNavItemClick = (item: NavItem) => {
    if (item.kind === 'route') {
      navigate(item.href);
      setMobileOpen(false);
      return;
    }
    scrollToSection(item.href);
  };

  // Run hash scrolling after navigating back to landing page
  useEffect(() => {
    let timer: number | undefined;
    let attempts = 0;
    if (location.pathname === '/' && location.hash) {
      timer = window.setInterval(() => {
        const didScroll = performSectionScroll(location.hash);
        attempts += 1;
        if (didScroll || attempts >= 24) {
          window.clearInterval(timer);
        }
      }, 120);
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [location.hash, location.pathname, performSectionScroll]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 360);

      if (location.pathname !== '/') return;
      const sections = NAV_ITEMS.filter((item) => item.kind === 'section').map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const drawer = (
    <Box sx={{ py: 3, px: 2 }}>
      <Box sx={{ mb: 3, px: 2 }}>
        <Logo />
      </Box>
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => handleNavItemClick(item)}
              onMouseEnter={() => item.prefetch?.()}
              onFocus={() => item.prefetch?.()}
              selected={isNavItemActive(item)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
              aria-current={isNavItemActive(item) ? 'page' : undefined}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ px: 2, mt: 3 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 2, display: 'block' }}>
          Connect with me
        </Typography>
        <Stack direction="row" spacing={1}>
          {SOCIAL_LINKS.map((social) => (
            <IconButton
              key={social.label}
              size="small"
              component="a"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: mode === 'dark' ? 'primary.main' : social.color,
                },
              }}
            >
              <Iconify icon={social.icon} width={20} />
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Box>
  );

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return null;
  }

  const headerContent = (
    <HeaderSection
      layoutQuery="lg"
      slotProps={{
        container: {
          maxWidth: 'lg',
        },
      }}
      sx={{
        '--offset-color': theme.palette.text.primary,
      }}
      slots={{
        leftArea: (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Logo sx={{ width: 32, height: 32 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                display: { xs: 'none', sm: 'block' },
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              I. Elyssa
            </Typography>
          </Box>
        ),
        centerArea: (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: { xs: 'none', lg: 'flex' },
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleNavItemClick(item)}
                onMouseEnter={() => item.prefetch?.()}
                onFocus={() => item.prefetch?.()}
                sx={{
                  color: isNavItemActive(item) ? 'primary.main' : 'inherit',
                  fontWeight: isNavItemActive(item) ? 600 : 400,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isNavItemActive(item) ? '60%' : 0,
                    height: 2,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '60%',
                  },
                  '&:focus-visible': {
                    outline: (thm) => `2px solid ${thm.palette.primary.main}`,
                    outlineOffset: 2,
                    borderRadius: 1,
                  },
                }}
                aria-current={isNavItemActive(item) ? 'page' : undefined}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        ),
        rightArea: (
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Social Links - Desktop */}
            <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', lg: 'flex' } }}>
              {SOCIAL_LINKS.map((social) => (
                <IconButton
                  key={social.label}
                  size="small"
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'text.secondary',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: mode === 'dark' ? 'primary.main' : social.color,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Iconify icon={social.icon} width={20} />
                </IconButton>
              ))}
            </Stack>

            {/* Theme Toggle */}
            <IconButton
              onClick={handleThemeToggle}
              sx={{
                color: 'inherit',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'rotate(180deg)',
                },
              }}
            >
              <Iconify
                icon={mode === 'dark' ? 'solar:sun-bold' : 'solar:moon-bold'}
                width={22}
              />
            </IconButton>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'flex', lg: 'none' }, color: 'inherit' }}
            >
              <Iconify icon="solar:hamburger-menu-bold" width={24} />
            </IconButton>
          </Stack>
        ),
      }}
    />
  );

  const footerContent = (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        bgcolor: 'background.paper',
        borderTop: (thm) => `1px solid ${thm.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            2026 IRANKUNDA Elyssa.
          </Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="center" useFlexGap>
            <Typography
              variant="body2"
              component="a"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Home
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#portfolio');
              }}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Portfolio
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Contact
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );

  return (
    <>
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'fixed',
          left: 12,
          top: -44,
          px: 1.4,
          py: 0.7,
          zIndex: 2000,
          borderRadius: 1,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          textDecoration: 'none',
          fontWeight: 600,
          transition: 'top 0.2s ease',
          '&:focus-visible': { top: 12 },
        }}
      >
        Skip to content
      </Box>

      <LayoutSection
        headerSection={headerContent}
        footerSection={footerContent}
        cssVars={{
          '--layout-header-zIndex': 1100,
          '--layout-header-mobile-height': '64px',
          '--layout-header-desktop-height': '72px',
        }}
      >
        <MainSection id="main-content" tabIndex={-1}>
          {children}
        </MainSection>
      </LayoutSection>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Zoom in={showScrollTop}>
        <Box
          role="button"
          tabIndex={0}
          aria-label="scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            }
          }}
          sx={{
            position: 'fixed',
            right: { xs: 16, md: 24 },
            bottom: { xs: 16, md: 24 },
            zIndex: 1200,
            width: 58,
            height: 58,
            borderRadius: '20px 20px 8px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.2,
            cursor: 'pointer',
            userSelect: 'none',
            color: 'common.white',
            border: (thm) => `1px solid ${alpha(thm.palette.common.white, thm.palette.mode === 'dark' ? 0.2 : 0.42)}`,
            background: (thm) =>
              `linear-gradient(150deg, ${alpha(thm.palette.primary.main, 0.95)} 0%, ${alpha(thm.palette.info.main, 0.88)} 100%)`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: (thm) => `0 16px 34px ${alpha(thm.palette.primary.main, 0.36)}`,
            transition: prefersReducedMotion
              ? 'none'
              : 'transform 220ms ease, box-shadow 220ms ease, border-radius 220ms ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: -6,
              borderRadius: '24px 24px 12px 24px',
              background: (thm) => `radial-gradient(circle, ${alpha(thm.palette.primary.main, 0.3)} 0%, transparent 70%)`,
              zIndex: -1,
            },
            '&:hover': {
              transform: 'translateY(-4px) rotate(-4deg)',
              borderRadius: '22px 22px 10px 22px',
              boxShadow: (thm) => `0 22px 42px ${alpha(thm.palette.primary.main, 0.42)}`,
            },
            '&:focus-visible': {
              outline: (thm) => `2px solid ${thm.palette.primary.light}`,
              outlineOffset: 3,
            },
          }}
        >
          <Iconify icon="solar:arrow-up-bold" width={20} />
          <Box component="span" sx={{ fontSize: 9, letterSpacing: 1.1, fontWeight: 700 }}>
            TOP
          </Box>
        </Box>
      </Zoom>
    </>
  );
}
