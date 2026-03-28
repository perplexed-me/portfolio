import './globals.css';

export const metadata = {
  metadataBase: new URL('https://mohammadalibhuiyan.me'),
  title: 'Mohammad Ali Bhuiyan',
  description: 'Full Stack Developer passionate about building modern, performant web experiences. Explore my projects, skills, and get in touch.',
  keywords: ['developer', 'portfolio', 'full stack', 'react', 'nextjs', 'web development'],
  authors: [{ name: 'Mohammad Ali Bhuiyan', url: 'https://mohammadalibhuiyan.me' }],
  creator: 'Mohammad Ali Bhuiyan',
  openGraph: {
    title: 'Mohammad Ali Bhuiyan',
    description: 'Full Stack Developer passionate about building modern, performant web experiences.',
    url: 'https://mohammadalibhuiyan.me',
    siteName: 'Mohammad Ali Bhuiyan Portfolio',
    images: [
      {
        url: 'https://mohammadalibhuiyan.me/og.png',
        width: 1200,
        height: 630,
        alt: 'Mohammad Ali Bhuiyan Portfolio',
      },
    ],
    type: 'website',
  },
  alternates: {
    // Setting this to generally use metadataBase relative routing
    // Each page (like /projects) can export its own alternates: { canonical: '/projects' }
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohammad Ali Bhuiyan',
    url: 'https://mohammadalibhuiyan.me',
    image: 'https://mohammadalibhuiyan.me/profile.jpg',
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance / Independent Developer',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Bangladesh University of Engineering and Technology (BUET)',
        url: 'https://www.buet.ac.bd/'
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Notre Dame College, Dhaka (NDC)',
        url: 'https://ndc.edu.bd/'
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Ispahani Public School and College, Cumilla (IPSC)',
        url: 'https://www.ipsc.edu.bd/'
      }
    ],
    sameAs: [
      'https://github.com/perplexed-me',
      'https://www.linkedin.com/in/mohammad-ali-bhuiyan/',
      'https://www.facebook.com/mohammad.ali.bhuiyan.237/'
    ]
  };

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
