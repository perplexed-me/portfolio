import { getSection } from '@/lib/data';
import HomeClient from './HomeClient';

export const metadata = {
  title: 'Mohammad Ali Bhuiyan',
  description: 'Full Stack Developer building modern, performant web experiences.',
};

export default async function HomePage() {
  const profile = await getSection('profile');
  const skills = await getSection('skills');
  const projects = await getSection('projects');
  const experience = await getSection('experience');

  return <HomeClient profile={profile} skills={skills} projects={projects} experience={experience} />;
}
