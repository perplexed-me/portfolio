import { getSection } from '@/lib/data';
import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Projects — Mohammad Ali Bhuiyan',
  description: 'Featured projects and applications built by Mohammad Ali Bhuiyan.',
};

export default async function ProjectsPage() {
  const projects = await getSection('projects');
  return <ProjectsClient projects={projects || []} />;
}
