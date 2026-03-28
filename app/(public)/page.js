import { getSection } from '@/lib/data';
import HomeClient from './HomeClient';

export const metadata = {
  title: 'Mohammad Ali Bhuiyan | BUET CSE | Full-Stack Developer',
  description: 'Mohammad Ali Bhuiyan is a BUET CSE student and full-stack developer. Explore projects, skills, experience, and contact details.',
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  const profile = await getSection('profile');
  const skills = await getSection('skills');
  const projects = await getSection('projects');
  const experience = await getSection('experience');

  return <HomeClient profile={profile} skills={skills} projects={projects} experience={experience} />;
}
