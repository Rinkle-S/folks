import {ImageResponse} from 'next/og';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {LESSONS} from '@/lib/lessons';
export const size={width:1200,height:630};
export const contentType='image/png';
export const alt='A step-by-step Nook lesson';
export default async function Image({params}){
  const {id}=await params,l=LESSONS[id];
  const logo=await readFile(path.join(process.cwd(),'public/icons/icon-192.png'));
  return new ImageResponse(<div style={{display:'flex',width:'100%',height:'100%',flexDirection:'column',justifyContent:'space-between',padding:64,background:'#f3f5f2',color:'#142420',border:'20px solid #dcece5'}}>
    <div style={{display:'flex',alignItems:'center',gap:20}}><img width={72} height={72} src={`data:image/png;base64,${logo.toString('base64')}`} alt=""/><div style={{fontSize:48,fontWeight:700}}>Nook</div></div>
    <div style={{display:'flex',fontSize:28,color:'#0e6b5c'}}>{l?.appName||'Phone skills'} · {l?.minutes||3} min lesson</div>
    <div style={{display:'flex',fontSize:58,fontWeight:700,lineHeight:1.15}}>{l?.title.en||'Learn everyday phone tasks safely'}</div>
    <div style={{display:'flex',fontSize:26,color:'#375a4e'}}>Safe practice · Watch · Read the steps</div>
  </div>,size);
}
