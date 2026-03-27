import { getSection } from '@/lib/data';
import SkillsClient from './SkillsClient';

export const metadata = {
  title: 'Skills — Mohammad Ali Bhuiyan',
  description: 'Technical skills and proficiency levels.',
};

export default async function SkillsPage() {
  const skills = await getSection('skills');
  return <SkillsClient skills={skills || []} />;
}
