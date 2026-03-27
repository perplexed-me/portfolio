import { getSection } from '@/lib/data';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact — Mohammad Ali Bhuiyan',
  description: 'Get in touch — email, GitHub, LinkedIn, and social links.',
};

export default function ContactPage() {
  const profile = getSection('profile');
  return (
    <ContactClient
      email={profile?.email || ''}
      socialLinks={profile?.socialLinks || []}
    />
  );
}
