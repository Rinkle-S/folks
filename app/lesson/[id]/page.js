import { notFound } from 'next/navigation';
import Player from '@/components/Player';
import { LESSONS } from '@/lib/lessons';

export function generateStaticParams() {
  return Object.keys(LESSONS).map((id) => ({ id }));
}

export default async function LessonPage({ params }) {
  const { id } = await params;
  if (!LESSONS[id]) notFound();
  return <Player key={id} id={id} />;
}
