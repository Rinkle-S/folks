import GuideView from '@/components/GuideView';
import { GUIDES } from '@/lib/guides';

export function generateStaticParams() {
  return [...Object.keys(GUIDES), 'ai'].map((id) => ({ id }));
}

export default function GuidePage({ params }) {
  return <GuideView id={params.id} />;
}
