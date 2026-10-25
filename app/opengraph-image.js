import {ImageResponse} from 'next/og';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
export const alt='Nook: a safe place to learn everyday phone tasks';
export const size={width:1200,height:630};
export const contentType='image/png';
export default async function Image(){
  const logo=await readFile(path.join(process.cwd(),'public/icons/icon-192.png'));
  return new ImageResponse(<div style={{display:'flex',width:'100%',height:'100%',background:'#f2f5ef',padding:64,color:'#142420',flexDirection:'column',justifyContent:'space-between',border:'24px solid #dcece5'}}>
    <div style={{display:'flex',alignItems:'center',gap:20}}><img src={`data:image/png;base64,${logo.toString('base64')}`} width={80} height={80} alt=""/><div style={{fontSize:64,fontWeight:800}}>Nook</div></div>
    <div style={{display:'flex',fontSize:62,fontWeight:800,lineHeight:1.15,maxWidth:950}}>Learn everyday phone tasks safely.</div>
    <div style={{display:'flex',fontSize:30,color:'#375a4e'}}>Safe practice · Clear steps · Your own pace</div>
    <div style={{display:'flex',fontSize:25,color:'#375a4e'}}>English · Hindi · Malayalam</div>
  </div>,size);
}
