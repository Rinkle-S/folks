import {SAFE_LESSONS} from '@/lib/safeLessons';
import {linkPreview} from '@/lib/linkPreview';
export async function generateMetadata({params}){const {id}=await params,l=SAFE_LESSONS.find(x=>x.id===id);return linkPreview(l?.title.en||'Spot a scam','Recognise the warning signs and learn what to do. A short Stay safe lesson from Nook.',`/scams/learn/${encodeURIComponent(id)}`);}
export default function Layout({children}){return children;}
