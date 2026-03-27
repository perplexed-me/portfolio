import { getSection } from '@/lib/data';
import SkillsClient from './SkillsClient';

export const metadata = {
  title: 'Skills — Mohammad Ali Bhuiyan',
  description: 'Technical skills and proficiency levels.',
};

export default function SkillsPage() {
  const skills = getSection('skills');
  return <SkillsClient skills={skills || []} />;
}
