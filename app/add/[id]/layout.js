import {linkPreview} from '@/lib/linkPreview';
export async function generateMetadata({params}){const {id}=await params;return linkPreview('Help someone learn with Nook','Create clear steps for someone you care about.',`/add/${encodeURIComponent(id)}`);}
export default function Layout({children}){return children;}
