import './globals.css';

export const metadata = {
  metadataBase: new URL('https://mohammadalibhuiyan.me'),
  title: 'Mohammad Ali Bhuiyan | BUET CSE | Full-Stack Developer',
  description: 'Mohammad Ali Bhuiyan is a BUET CSE student and full-stack developer. Explore projects, skills, experience, and contact details.',
  keywords: [
    'Mohammad Ali Bhuiyan', 'Mohammad Ali Bhuiyan developer', 'Mohammad Ali Bhuiyan BUET',
    'Mohammad Ali Bhuiyan portfolio', 'full stack developer Bangladesh',
    'BUET CSE', 'Next.js developer', 'React developer Bangladesh',
    'developer', 'portfolio', 'full stack', 'react', 'nextjs', 'web development',
  ],
  authors: [{ name: 'Mohammad Ali Bhuiyan', url: 'https://mohammadalibhuiyan.me' }],
  creator: 'Mohammad Ali Bhuiyan',
  openGraph: {
    title: 'Mohammad Ali Bhuiyan | BUET CSE | Full-Stack Developer',
    description: 'Mohammad Ali Bhuiyan is a BUET CSE student and full-stack developer. Explore projects, skills, experience, and contact details.',
    url: 'https://mohammadalibhuiyan.me',
    siteName: 'Mohammad Ali Bhuiyan',
    images: [
      {
        url: 'https://mohammadalibhuiyan.me/og.png',
        width: 1200,
        height: 630,
        alt: 'Mohammad Ali Bhuiyan - BUET CSE student and full-stack developer',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Ali Bhuiyan | BUET CSE | Full-Stack Developer',
    description: 'Mohammad Ali Bhuiyan is a BUET CSE student and full-stack developer. Explore projects, skills, experience, and contact details.',
    images: ['https://mohammadalibhuiyan.me/og.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'VW4BAFWxwt3qORakTbHtW2Q_VqjpxT79LD0RAvTka14',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mohammad Ali Bhuiyan',
      url: 'https://www.mohammadalibhuiyan.me/',
      image: 'https://www.mohammadalibhuiyan.me/profile.jpg',
      jobTitle: 'Full-Stack Developer',
      description: 'BUET CSE student and full-stack developer building performant web applications.',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Bangladesh University of Engineering and Technology',
        url: 'https://www.buet.ac.bd/',
      },
      sameAs: [
        'https://github.com/perplexed-me',
        'https://www.linkedin.com/in/mohammad-ali-bhuiyan/',
        'https://www.facebook.com/mohammad.ali.bhuiyan.237/',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://www.mohammadalibhuiyan.me/',
      name: 'Mohammad Ali Bhuiyan',
      alternateName: 'mohammadalibhuiyan.me',
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
