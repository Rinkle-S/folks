import { notFound } from 'next/navigation';
import Player from '@/components/Player';
import { LESSONS } from '@/lib/lessons';
import { REMOVED_LESSONS } from '@/lib/hidden';
import RetiredLesson from '@/components/RetiredLesson';

export function generateStaticParams() {
  return Object.keys(LESSONS).map((id) => ({ id }));
}

export default async function LessonPage({ params }) {
  const { id } = await params;
  if (REMOVED_LESSONS.has(id)) return <RetiredLesson />;
  if (!LESSONS[id]) notFound();
  return <Player key={id} id={id} />;
}
