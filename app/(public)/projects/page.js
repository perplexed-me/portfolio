import { getSection } from '@/lib/data';
import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Projects — Mohammad Ali Bhuiyan',
  description: 'Featured projects and applications built by Mohammad Ali Bhuiyan.',
};

export default function ProjectsPage() {
  const projects = getSection('projects');
  return <ProjectsClient projects={projects || []} />;
}
