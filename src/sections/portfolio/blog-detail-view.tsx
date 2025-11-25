import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import { Iconify } from 'src/components/iconify';

import { BLOG_POSTS, type BlogPost } from './blog-data';

// ----------------------------------------------------------------------

export function BlogDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundPost = BLOG_POSTS.find((p) => p.id === id);
      setPost(foundPost || null);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <BlogDetailSkeleton />;
  }

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Blog post not found
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="carbon:arrow-left" />}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="md">
        {/* Back Button */}
        <Button
          startIcon={<Iconify icon="carbon:arrow-left" />}
          onClick={() => navigate('/')}
          sx={{
            mb: 4,
            animation: 'fadeInLeft 0.5s ease-out',
            '@keyframes fadeInLeft': {
              from: { opacity: 0, transform: 'translateX(-20px)' },
              to: { opacity: 1, transform: 'translateX(0)' },
            },
          }}
        >
          Back to Home
        </Button>


        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            mb: 3,
            fontWeight: 800,
            animation: 'fadeInUp 0.6s ease-out',
            '@keyframes fadeInUp': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {post.title}
        </Typography>

        {/* Meta Info */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          sx={{
            mb: 4,
            animation: 'fadeInUp 0.7s ease-out',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={post.author.avatar} alt={post.author.name} sx={{ width: 48, height: 48 }}>
              <Iconify icon="carbon:user-avatar-filled" />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {post.author.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  {post.publishDate}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  •
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.readTime}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Box sx={{ flex: 1 }} />

          <Chip label={post.category} size="small" color="secondary" variant="outlined" />
        </Stack>

        {/* Cover Image */}
        <Card
          sx={{
            mb: 5,
            overflow: 'hidden',
            animation: 'zoomIn 0.8s ease-out',
            '@keyframes zoomIn': {
              from: { opacity: 0, transform: 'scale(0.95)' },
              to: { opacity: 1, transform: 'scale(1)' },
            },
          }}
        >
          <Box
            component="img"
            src={post.coverImage}
            alt={post.title}
            sx={{
              width: '100%',
              height: { xs: 250, md: 400 },
              objectFit: 'cover',
            }}
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.style.background = `linear-gradient(135deg, ${alpha('#1877F2', 0.2)} 0%, ${alpha('#8E33FF', 0.2)} 100%)`;
              target.parentElement!.style.display = 'flex';
              target.parentElement!.style.alignItems = 'center';
              target.parentElement!.style.justifyContent = 'center';
              const icon = document.createElement('div');
              icon.innerHTML = '📝';
              icon.style.fontSize = '80px';
              target.parentElement!.appendChild(icon);
            }}
          />
        </Card>

        {/* Content */}
        <Box
          sx={{
            animation: 'fadeIn 1s ease-out',
            '& h1, & h2, & h3': {
              mt: 4,
              mb: 2,
              fontWeight: 700,
            },
            '& h1': {
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            },
            '& h2': {
              fontSize: { xs: '1.5rem', md: '1.875rem' },
            },
            '& h3': {
              fontSize: { xs: '1.25rem', md: '1.5rem' },
            },
            '& p': {
              mb: 2,
              lineHeight: 1.8,
              color: 'text.secondary',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
            },
            '& ul, & ol': {
              mb: 3,
              pl: 3,
            },
            '& li': {
              mb: 1,
              color: 'text.secondary',
              lineHeight: 1.8,
            },
            '& strong': {
              color: 'text.primary',
              fontWeight: 600,
            },
          }}
        >
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.trim().startsWith('# ')) {
              return (
                <Typography key={index} variant="h1">
                  {paragraph.replace('# ', '')}
                </Typography>
              );
            }
            if (paragraph.trim().startsWith('## ')) {
              return (
                <Typography key={index} variant="h2">
                  {paragraph.replace('## ', '')}
                </Typography>
              );
            }
            if (paragraph.trim().startsWith('### ')) {
              return (
                <Typography key={index} variant="h3">
                  {paragraph.replace('### ', '')}
                </Typography>
              );
            }
            if (paragraph.trim()) {
              // Handle bold text
              const parts = paragraph.split(/(\*\*.*?\*\*)/g);
              return (
                <Typography key={index} variant="body1">
                  {parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={i}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                </Typography>
              );
            }
            return null;
          })}
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Tags */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Tags
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) => theme.customShadows.z8,
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Share Section */}
        <Card sx={{ p: 4, bgcolor: 'background.neutral' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Share this article
          </Typography>
          <Stack direction="row" spacing={2}>
            {[
              { icon: 'mdi:twitter', color: '#1DA1F2', label: 'Twitter' },
              { icon: 'mdi:linkedin', color: '#0A66C2', label: 'LinkedIn' },
              { icon: 'mdi:facebook', color: '#1877F2', label: 'Facebook' },
              { icon: 'mdi:link-variant', color: '#637381', label: 'Copy Link' },
            ].map((social) => (
              <Button
                key={social.label}
                variant="outlined"
                startIcon={<Iconify icon={social.icon} />}
                sx={{
                  borderColor: alpha(social.color, 0.3),
                  color: social.color,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: social.color,
                    bgcolor: alpha(social.color, 0.08),
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {social.label}
              </Button>
            ))}
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function BlogDetailSkeleton() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="md">
        <Skeleton variant="rectangular" width={120} height={40} sx={{ mb: 4, borderRadius: 1 }} />
        <Skeleton variant="text" width="80%" height={80} sx={{ mb: 3 }} />
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Skeleton variant="circular" width={48} height={48} />
          <Box>
            <Skeleton variant="text" width={150} height={24} />
            <Skeleton variant="text" width={100} height={20} />
          </Box>
        </Stack>
        <Skeleton variant="rectangular" height={400} sx={{ mb: 5, borderRadius: 2 }} />
        <Skeleton variant="text" width="100%" height={30} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="95%" height={30} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="90%" height={30} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="100%" height={30} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="85%" height={30} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
      </Container>
    </Box>
  );
}