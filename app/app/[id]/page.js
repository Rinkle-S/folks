import { notFound } from 'next/navigation';
import AppLessons from '@/components/AppLessons';
import { APPS } from '@/lib/lessons';
import { ALL_APPS } from '@/lib/apps';
import { GUIDE_LIST } from '@/lib/guides';

const PAGES = [...APPS.map((a) => a.id), ...GUIDE_LIST.map((g) => g.app).filter((id) => ALL_APPS.some((a) => a.id === id))].filter((v, i, a) => a.indexOf(v) === i);

export function generateStaticParams() {
  return PAGES.map((id) => ({ id }));
}

export default async function AppPage({ params }) {
  const { id } = await params;
  if (!PAGES.includes(id)) notFound();
  return <AppLessons app={id} />;
}
