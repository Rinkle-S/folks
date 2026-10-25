import {GUIDE_LIST} from '@/lib/guides';
import {linkPreview} from '@/lib/linkPreview';
export async function generateMetadata({params}){const {id}=await params,g=GUIDE_LIST.find(x=>x.id===id);return linkPreview(g?.title.en||'Step-by-step guides','Clear steps for your real phone. English, Hindi and Malayalam.',`/guide/${encodeURIComponent(id)}`);}
export default function Layout({children}){return children;}
