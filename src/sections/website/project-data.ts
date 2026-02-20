export type ProjectImage = {
  src: string;
  caption: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  problem: string;
  approach: string;
  outcomes: string[];
  nextStep: string;
  logo: string;
  link: string;
  stack: string[];
  color: string;
  images: ProjectImage[];
};

export const PORTFOLIO_ITEMS: PortfolioProject[] = [
  {
    slug: 'academiaplus',
    title: 'AcademiaPlus',
    type: 'Education AI Platform',
    summary:
      'AI-powered assessment and classroom analytics platform supporting faster teacher workflows.',
    problem:
      'Teachers spend significant time preparing assessments and monitoring academic integrity.',
    approach:
      'Built AI-supported quiz generation and assessment workflows with classroom analytics.',
    outcomes: ['Faster assessment preparation', 'Clearer learner progress visibility', 'Scalable teacher workflows'],
    nextStep: 'Expand adaptive learning pathways and mastery tracking.',
    logo: '/assets/images/logo/academiaplus-logo.png',
    link: 'https://academiaplus.net',
    stack: ['React', 'Python', 'NLP', 'Analytics'],
    color: '#1877F2',
    images: [
      {
        src: '/assets/images/projects/academiaplus/academiaplus-01.png',
        caption: 'AI-powered classroom dashboard for teacher workflows',
      },
      {
        src: '/assets/images/projects/academiaplus/academiaplus-02.png',
        caption: 'Adaptive quiz flow for personalized assessment',
      },
      {
        src: '/assets/images/projects/academiaplus/academiaplus-03.png',
        caption: 'Student analytics view for learning progress tracking',
      },
    ],
  },
  {
    slug: 'edubridge',
    title: 'EduBridge',
    type: 'Predictive Student Analytics',
    summary:
      'Predictive student-risk intelligence for earlier intervention and stronger retention strategies.',
    problem:
      'Schools need early and trustworthy dropout-risk indicators to prioritize interventions.',
    approach:
      'Designed predictive risk scoring from academic and behavior signals for proactive support.',
    outcomes: ['Earlier risk visibility', 'More targeted interventions', 'Better retention planning'],
    nextStep: 'Deploy stronger model monitoring and precision tracking.',
    logo: '/assets/images/logo/edubridge-logo.png',
    link: '',
    stack: ['Python', 'Scikit-learn', 'Feature Engineering', 'BI'],
    color: '#8E33FF',
    images: [
      {
        src: '/assets/images/projects/edubridge/edubridge-01.png',
        caption: 'Dropout-risk monitoring panel for school teams',
      },
      {
        src: '/assets/images/projects/edubridge/edubridge-02.png',
        caption: 'Intervention planning timeline with risk segmentation',
      },
      {
        src: '/assets/images/projects/edubridge/edubridge-03.png',
        caption: 'Predictive trend insights for proactive student support',
      },
    ],
  },
  {
    slug: 'kinyarwanda-tts',
    title: 'Kinyarwanda TTS',
    type: 'Language Technology',
    summary:
      'Speech AI for natural Kinyarwanda voice output and stronger language accessibility.',
    problem:
      'Most voice AI systems under-serve local languages and reduce accessibility for native speakers.',
    approach:
      'Built a Kinyarwanda text-to-speech model focused on natural output and linguistic coverage.',
    outcomes: ['Improved local-language accessibility', 'Foundation for voice-first tools', 'Stronger language inclusion'],
    nextStep: 'Improve prosody control and broaden dataset coverage.',
    logo: '/assets/images/logo/kinyarwanda-sts-logo.png',
    link: '',
    stack: ['Deep Learning', 'Speech Processing', 'Dataset Curation', 'Evaluation'],
    color: '#00B8D9',
    images: [
      {
        src: '/assets/images/projects/kinyarwanda-tss/kinyarwanda-tss-01.png',
        caption: 'Speech dataset curation workflow for Kinyarwanda',
      },
      {
        src: '/assets/images/projects/kinyarwanda-tss/kinyarwanda-tss-02.png',
        caption: 'Waveform and phoneme alignment during model tuning',
      },
      {
        src: '/assets/images/projects/kinyarwanda-tss/kinyarwanda-tss-03.png',
        caption: 'Voice output review for natural pronunciation quality',
      },
    ],
  },
];
