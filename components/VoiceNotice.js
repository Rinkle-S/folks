'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {voiceStatus} from '@/lib/voice';
import {VOICE_MESSAGES} from '@/lib/voiceMessages';
export default function VoiceNotice({lang}){
  const [issue,setIssue]=useState(null);
  useEffect(()=>{
    setIssue(voiceStatus.issue);
    const update=e=>setIssue(e.detail);
    window.addEventListener('folks-voice-issue',update);
    return()=>window.removeEventListener('folks-voice-issue',update);
  },[lang]);
  if(!issue||issue.lang!==lang)return null;
  return <div className="voice-notice" role="status"><p>{VOICE_MESSAGES[issue.reason==='missing'?'missing':'failed'][lang]}</p><Link href={`/help?lang=${lang}#voice`}>{VOICE_MESSAGES.help[lang]}</Link></div>;
}
