import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useColorScheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { Logo } from 'src/components/logo';
import { LayoutSection } from 'src/layouts/core/layout-section';
import { HeaderSection } from 'src/layouts/core/header-section';
import { MainSection } from 'src/layouts/core/main-section';

// ----------------------------------------------------------------------

type PortfolioLayoutProps = {
  children: React.ReactNode;
};

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Company', href: '#company' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: 'mdi:instagram', href: 'https://www.instagram.com/_ielyssa/', label: 'Instagram', color: '#E4405F' },
  { icon: 'mdi:linkedin', href: 'https://www.linkedin.com/in/irankunda-elyssa-452001290/', label: 'LinkedIn', color: '#0A66C2' },
  { icon: 'mdi:twitter', href: 'https://x.com/elyssa_ira', label: 'X (Twitter)', color: '#000000' },
  { icon: 'mdi:github', href: 'https://github.com/ely-pro', label: 'GitHub', color: '#181717' },
];

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mounted, setMounted] = useState(false);

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

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileOpen(false);
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const drawer = (
    <Box sx={{ py: 3, px: 2 }}>
      <Box sx={{ mb: 3, px: 2 }}>
        <Logo />
      </Box>
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => scrollToSection(item.href)}
              selected={activeSection === item.href.substring(1)}
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
      layoutQuery="md"
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
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                sx={{
                  color: activeSection === item.href.substring(1) ? 'primary.main' : 'inherit',
                  fontWeight: activeSection === item.href.substring(1) ? 600 : 400,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: activeSection === item.href.substring(1) ? '60%' : 0,
                    height: 2,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '60%',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        ),
        rightArea: (
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Social Links - Desktop */}
            <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
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
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'inherit' }}
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
          <Typography variant="body2" color="text.secondary">
            © 2025 IRANKUNDA Elyssa. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography
              variant="body2"
              component="a"
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#about');
              }}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              About
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href="#company"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#company');
              }}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              ATAS
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
      <LayoutSection
        headerSection={headerContent}
        footerSection={footerContent}
        cssVars={{
          '--layout-header-zIndex': 1100,
          '--layout-header-mobile-height': '64px',
          '--layout-header-desktop-height': '72px',
        }}
      >
        <MainSection>{children}</MainSection>
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
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}