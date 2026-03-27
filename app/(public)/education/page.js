import { getSection } from '@/lib/data';
import EducationClient from './EducationClient';

export const metadata = {
  title: 'Education — Mohammad Ali Bhuiyan',
  description: 'Academic background and educational history.',
};

export default function EducationPage() {
  const education = getSection('education');
  return <EducationClient education={education || []} />;
}
