import {linkPreview} from '@/lib/linkPreview';
export async function generateMetadata({params}){const {id}=await params;return linkPreview('A guide shared with you','Follow a step-by-step guide on Nook.',`/my/${encodeURIComponent(id)}`);}
export default function Layout({children}){return children;}
