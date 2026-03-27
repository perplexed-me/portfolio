import './globals.css';

export const metadata = {
  metadataBase: new URL('https://mohammadalibhuiyan.me'),
  title: 'Mohammad Ali Bhuiyan',
  description: 'Full Stack Developer passionate about building modern, performant web experiences. Explore my projects, skills, and get in touch.',
  keywords: ['developer', 'portfolio', 'full stack', 'react', 'nextjs', 'web development'],
  openGraph: {
    title: 'Mohammad Ali Bhuiyan',
    description: 'Full Stack Developer passionate about building modern, performant web experiences.',
    type: 'website',
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
    jobTitle: 'Full Stack Developer',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
