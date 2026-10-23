import { notFound } from 'next/navigation';
import Player from '@/components/Player';
import { LESSONS } from '@/lib/lessons';

export function generateStaticParams() {
  return Object.keys(LESSONS).map((id) => ({ id }));
}

export default function LessonPage({ params }) {
  if (!LESSONS[params.id]) notFound();
  return <Player id={params.id} />;
}
