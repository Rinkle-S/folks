import GuideView from '@/components/GuideView';
import { GUIDES } from '@/lib/guides';

export function generateStaticParams() {
  return [...Object.keys(GUIDES), 'ai'].map((id) => ({ id }));
}

export default async function GuidePage({ params }) {
  const { id } = await params;
  return <GuideView id={id} />;
}
