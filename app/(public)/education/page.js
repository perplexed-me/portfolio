import { getSection } from '@/lib/data';
import EducationClient from './EducationClient';

export const metadata = {
  title: 'Education — Mohammad Ali Bhuiyan',
  description: 'Academic background and educational history of Mohammad Ali Bhuiyan, from BUET CSE to earlier schooling.',
  alternates: { canonical: '/education' },
};

export default async function EducationPage() {
  const education = await getSection('education');
  return <EducationClient education={education || []} />;
}
