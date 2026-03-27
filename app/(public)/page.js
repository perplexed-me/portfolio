import { getSection } from '@/lib/data';
import HomeClient from './HomeClient';

export const metadata = {
  title: 'Mohammad Ali Bhuiyan',
  description: 'Full Stack Developer building modern, performant web experiences.',
};

export default function HomePage() {
  const profile = getSection('profile');

  return <HomeClient profile={profile} />;
}
