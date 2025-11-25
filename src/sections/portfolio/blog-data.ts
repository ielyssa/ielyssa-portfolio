export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    avatar: string;
  };
  featured: boolean;
  tags: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Building ATAS: My Journey into AI Entrepreneurship at 20',
    excerpt: 'How I co-founded an AI innovation hub focused on transforming education and technology across Africa, the challenges we faced, and the vision that drives us forward.',
    content: `
# Building ATAS: My Journey into AI Entrepreneurship at 20

Starting ATAS (Alliance for Transformative AI Systems) has been one of the most challenging yet rewarding experiences of my life. At 20 years old, fresh out of high school, I decided to take a leap into the world of AI entrepreneurship.

## The Vision

The idea was simple but ambitious: create AI solutions that solve real problems in African education and communities. We saw gaps in the education system that technology could fill, and we knew AI could be the key.

## Our First Project: AcademiaPlus

AcademiaPlus was born from a simple observation - teachers spend countless hours creating and grading assessments. What if AI could help? We built an intelligent education management platform that uses AI to assist with quizzes, provide personalized tutoring, and maintain academic integrity.

## Challenges We Faced

Building a company from scratch isn't easy. From technical challenges in developing our AI models to business obstacles like fundraising and team building, every day brought new lessons.

## Looking Forward

ATAS is just getting started. We're expanding our projects, growing our team, and most importantly, making a real impact in education across Rwanda and beyond.

The journey of building ATAS has taught me that age is just a number - passion, dedication, and the right team can make anything possible.
    `,
    coverImage: '/assets/blog/atas-journey.jpg',
    category: 'Entrepreneurship',
    readTime: '5 min read',
    publishDate: 'Jan 15, 2025',
    author: {
      name: 'IRANKUNDA Elyssa',
      avatar: '/assets/profile-picture.png',
    },
    featured: true,
    tags: ['AI', 'Entrepreneurship', 'ATAS', 'Education'],
  },
  {
    id: '2',
    title: 'Machine Learning in Education: The Future is Now',
    excerpt: 'Exploring how machine learning algorithms are revolutionizing personalized education and helping students achieve better learning outcomes through data-driven insights.',
    content: `
# Machine Learning in Education: The Future is Now

Machine learning is transforming education in ways we never imagined. From personalized learning paths to predictive analytics that identify at-risk students, AI is making education more effective and accessible.

## Personalized Learning Paths

Every student learns differently. ML algorithms can analyze learning patterns and adapt content delivery to match individual needs.

## Predictive Analytics

Our EduBridge project uses ML to predict student dropout risks early, allowing interventions before it's too late.

## The Impact

We've seen firsthand how these technologies improve learning outcomes and help teachers focus on what they do best - teaching.
    `,
    coverImage: '/assets/blog/ml-education.png',
    category: 'Machine Learning',
    readTime: '4 min read',
    publishDate: 'Jan 10, 2025',
    author: {
      name: 'IRANKUNDA Elyssa',
      avatar: '/assets/profile-picture.png',
    },
    featured: false,
    tags: ['Machine Learning', 'Education', 'AI', 'EduBridge'],
  },
  {
    id: '3',
    title: 'Preserving Kinyarwanda Through AI: The TTS Project',
    excerpt: 'How we developed an advanced text-to-speech AI model for Kinyarwanda language, bringing voice technology to preserve and promote our native language in the digital age.',
    content: `
# Preserving Kinyarwanda Through AI: The TTS Project

Language preservation in the digital age is crucial. Our Kinyarwanda Text-to-Speech project aims to bring our native language into modern AI applications.

## Why This Matters

Many AI technologies are built for major languages, leaving smaller languages behind. We wanted to change that.

## Technical Challenges

Building a TTS model requires extensive data collection, phonetic analysis, and training sophisticated neural networks.

## Real-World Applications

From accessibility tools for visually impaired users to educational content creation, the applications are endless.

## Looking Ahead

This is just the beginning. We're working on expanding the model's capabilities and exploring other language technologies.
    `,
    coverImage: '/assets/blog/kinyarwanda-tts.jpg',
    category: 'AI Technology',
    readTime: '6 min read',
    publishDate: 'Jan 5, 2025',
    author: {
      name: 'IRANKUNDA Elyssa',
      avatar: '/assets/profile-picture.png',
    },
    featured: false,
    tags: ['AI', 'NLP', 'Kinyarwanda', 'TTS', 'Language'],
  },
  {
    id: '4',
    title: 'Data Science Skills Every Young African Should Learn',
    excerpt: 'Essential data science skills and resources for aspiring data scientists in Africa. Learn about the tools, techniques, and mindset needed to succeed in this field.',
    content: `
# Data Science Skills Every Young African Should Learn

Data science is one of the most in-demand skills globally, and Africa needs more data scientists to drive innovation and solve local problems.

## Core Technical Skills

1. **Python Programming**: The foundation of data science
2. **Statistics & Mathematics**: Understanding the theory behind the algorithms
3. **Machine Learning**: Building predictive models
4. **Data Visualization**: Communicating insights effectively

## Problem-Solving Mindset

Technical skills are important, but the ability to identify problems and think creatively about solutions is what sets great data scientists apart.

## Resources for Learning

There are countless free resources online. Start with platforms like Coursera, edX, and Kaggle to build your skills.

## Practice, Practice, Practice

Work on real projects. Whether it's analyzing local data or building solutions for your community, hands-on experience is invaluable.

## Join the Community

Connect with other data scientists, attend meetups, and participate in competitions. The African data science community is growing and welcoming.
    `,
    coverImage: '/assets/blog/data-science-skills.jpg',
    category: 'Data Science',
    readTime: '7 min read',
    publishDate: 'Dec 28, 2024',
    author: {
      name: 'IRANKUNDA Elyssa',
      avatar: '/assets/profile-picture.png',
    },
    featured: false,
    tags: ['Data Science', 'Learning', 'Skills', 'Africa', 'Career'],
  },
];