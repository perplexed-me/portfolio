import { getSection } from '@/lib/data';
import ContactTerminal from './ContactTerminal';

export const metadata = {
  title: 'Contact — Mohammad Ali Bhuiyan',
  description: 'Get in touch — email, GitHub, LinkedIn, and social links.',
};

export default async function ContactPage() {
  const profile = await getSection('profile');
  return (
    <div style={{ padding: '100px 24px', maxWidth: '900px', margin: '0 auto', minHeight: 'calc(100vh - 200px)' }}>
      <ContactTerminal profile={profile || {}} />
    </div>
  );
}
