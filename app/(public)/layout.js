import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { getSection } from '@/lib/data';

export default function PublicLayout({ children }) {
  const profile = getSection('profile');

  return (
    <>
      <Navbar profileName={profile?.name} />
      <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
