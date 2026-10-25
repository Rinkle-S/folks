import {THEMES} from '@/lib/themes';
import {linkPreview} from '@/lib/linkPreview';
export async function generateMetadata({params}){const {id}=await params,t=THEMES.find(x=>x.id===id);return linkPreview(t?.title.en||'Learn by topic',t?.lead.en||'Learn everyday phone tasks safely.',`/theme/${encodeURIComponent(id)}`);}
export default function Layout({children}){return children;}
