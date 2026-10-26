import {LESSONS} from '@/lib/lessons';
import {linkPreview} from '@/lib/linkPreview';
export async function generateMetadata({params}){
  const {id}=await params,l=LESSONS[id];
  return l?linkPreview(l.title.en,`Learn with Nook’s safe practice phone, Watch or Read. ${l.minutes} minute lesson. English, Hindi and Malayalam.`, `/lesson/${encodeURIComponent(id)}`,`/lesson/${encodeURIComponent(id)}/opengraph-image`):linkPreview('Learn with Nook','Learn everyday phone tasks safely.');
}
export default function Layout({children}){return children;}
