import { getSection } from '@/lib/data';
import ExperienceClient from './ExperienceClient';

export const metadata = {
  title: 'Experience — Mohammad Ali Bhuiyan',
  description: 'Professional experience and career timeline.',
};

export default function ExperiencePage() {
  const experience = getSection('experience');
  return <ExperienceClient experience={experience || []} />;
}
