import {ALL_APPS} from '@/lib/apps';
import {linkPreview} from '@/lib/linkPreview';
export async function generateMetadata({params}){const {id}=await params,a=ALL_APPS.find(x=>x.id===id);return linkPreview(`${a?.name||'Phone'} lessons`,'Learn at your pace with safe practice, Watch or Read. English, Hindi and Malayalam.',`/app/${encodeURIComponent(id)}`);}
export default function Layout({children}){return children;}
