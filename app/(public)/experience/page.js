import { getSection } from '@/lib/data';
import ExperienceClient from './ExperienceClient';

export const metadata = {
  title: 'Experience — Mohammad Ali Bhuiyan',
  description: 'Professional experience and career timeline of Mohammad Ali Bhuiyan, BUET CSE student and full-stack developer.',
  alternates: { canonical: '/experience' },
};

export default async function ExperiencePage() {
  const experience = await getSection('experience');
  return <ExperienceClient experience={experience || []} />;
}
