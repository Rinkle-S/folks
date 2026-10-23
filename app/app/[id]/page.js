import { notFound } from 'next/navigation';
import AppLessons from '@/components/AppLessons';
import { APPS } from '@/lib/lessons';

export function generateStaticParams() {
  return APPS.map((a) => ({ id: a.id }));
}

export default function AppPage({ params }) {
  if (!APPS.find((a) => a.id === params.id)) notFound();
  return <AppLessons app={params.id} />;
}
