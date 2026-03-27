import { cookies } from 'next/headers';
import { getData } from '@/lib/data';
import AdminClient from './AdminClient';

export const metadata = {
  title: 'Admin Dashboard | Portfolio CMS',
  robots: 'noindex, nofollow',
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get('admin_auth')?.value === 'true';
  const initialData = isAuth ? await getData() : null;

  return <AdminClient initialAuth={isAuth} initialData={initialData} />;
}
