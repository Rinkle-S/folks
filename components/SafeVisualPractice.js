'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import Icon from './Icons';
import AppIcon from './AppIcon';
import VoiceNotice from './VoiceNotice';
import {BottomNav} from './AppShell';
import {T} from '@/lib/i18n';
import {VISUAL_CASES,visualUi,completeVisual,readVisualDone} from '@/lib/safeVisuals';
import {useLang,speak,stopSpeaking,onSpeechProgress,track} from '@/lib/client';
import {sentences} from '@/lib/sentences';

export default function SafeVisualPractice(){
 const [lang]=useLang(),[at,setAt]=useState(-1),[picked,setPicked]=useState(null),[precise,setPrecise]=useState(true),[checking,setChecking]=useState(false),[spoken,setSpoken]=useState({text:null,index:-1});
 const top=useRef(null),feedback=useRef(null),started=useRef(false);
 const u=visualUi(lang||'en'),c=VISUAL_CASES[at],choice=c?.choices.find(x=>x.id===picked),finished=at===VISUAL_CASES.length;
 const headline=choice?(choice.kind==='wrong'?u.wrong:choice.kind==='neutral'?u.neutral:u.good):'';
 const script=at<0?[u.title,u.intro,u.reassurance]:finished?[u.complete,...VISUAL_CASES.map(c=>c.tip[lang||'en'])]:choice?(checking?[u.checkNote]:[headline,choice.why[lang||'en']]):[c.context[lang||'en'],...(c.id==='maps'?[u.mapPermission]:c.id==='cleaner'?[u.cleanerHeading,u.cleanerBody,u.cleanerThreat,u.cleanerPush,u.frozen]:[u.parcelMessage,u.unknown]),u.instruction];
 useEffect(()=>onSpeechProgress(setSpoken),[]);
 useEffect(()=>{if(!lang)return;speak(script,lang);},[lang,at,picked]); // eslint-disable-line react-hooks/exhaustive-deps
 useEffect(()=>()=>stopSpeaking(),[]);
 useEffect(()=>{if(picked){feedback.current?.focus({preventScroll:true});feedback.current?.scrollIntoView({block:'nearest',behavior:'smooth'});}else{top.current?.focus({preventScroll:true});window.scrollTo(0,0);}},[at,picked]);
 if(!lang)return <div className="page"/>;
 const t=T[lang];
 const say=text=><>{sentences(text).map((s,i)=><span key={i} className={spoken.text===text&&spoken.index===i?'say-now':undefined}>{s}{' '}</span>)}</>;
 const begin=()=>{stopSpeaking();const done=readVisualDone(),first=VISUAL_CASES.findIndex(c=>!done.includes(c.id));setAt(first===-1?0:first);setPicked(null);if(!started.current){track('safe_visual_open',{meta:{activity:'visual-decisions'}});started.current=true;}};
 const respond=id=>{if(picked)return;const a=c.choices.find(x=>x.id===id);stopSpeaking();setPicked(id);track('safe_visual_answer',{meta:{id:c.id,picked:id,outcome:a.kind,activity:'visual-decisions'}});};
 const next=()=>{if(!choice)return;stopSpeaking();completeVisual(c.id);if(at===VISUAL_CASES.length-1)track('safe_visual_done',{meta:{activity:'visual-decisions',total:VISUAL_CASES.length}});setPicked(null);setChecking(false);setPrecise(true);setAt(at+1);};
 const control=(id,extra='')=>({type:'button',disabled:!!picked,'data-choice':id,className:`sv-control ${extra} ${picked===id?'sv-selected':''} ${picked&&c.choices.find(x=>x.id===id)?.kind==='good'?'sv-suitable':''} ${picked===id&&choice?.kind==='wrong'?'sv-risky':''}`,onClick:()=>respond(id)});
 return <div className="shell sv-shell">
  <header className="sv-top"><Link href="/scams" onClick={stopSpeaking}><Icon name="back" size={22}/>{t.navSafe}</Link><button type="button" onClick={()=>speak(script,lang,{force:true})}><Icon name="volume" size={22}/>{choice?u.listenFeedback:u.listen}</button></header>
  <main className="shell-main sv-main">
   <VoiceNotice lang={lang}/>
   {at<0?<section className="sv-intro"><div className="sv-intro-icons" aria-hidden="true"><Icon name="pin" size={32}/><Icon name="phone" size={32}/><Icon name="mail" size={32}/></div><h1 ref={top} tabIndex={-1}>{u.title}</h1><p>{say(u.intro)}</p><p className="sv-reassurance"><Icon name="shieldCheck" size={28}/><span>{say(u.reassurance)}</span></p><button type="button" className="btn primary" onClick={begin}>{u.ready}</button></section>:finished?<section className="sv-complete"><div className="done-medal"><Icon name="check" size={44}/></div><h1 ref={top} tabIndex={-1}>{say(u.complete)}</h1><h2>{u.tips}</h2><ol>{VISUAL_CASES.map(c=><li key={c.id}>{say(c.tip[lang])}</li>)}</ol><Link className="btn primary" href="/scams" onClick={stopSpeaking}>{t.navSafe}</Link><button className="btn ghost" onClick={()=>{setAt(0);setPicked(null);setChecking(false);setPrecise(true);}}>{u.repeat}</button></section>:<>
    <div className="sv-position"><span>{u.screen} {at+1} / {VISUAL_CASES.length}</span><div role="progressbar" aria-label={u.title} aria-valuemin={0} aria-valuemax={3} aria-valuenow={at+1}><i style={{width:`${(at+1)/3*100}%`}}/></div></div>
    <h1 ref={top} tabIndex={-1}>{c.title[lang]}</h1><p className="sv-context">{say(c.context[lang])}</p><p className="sv-task">{u.instruction}</p>
    <section className={`sv-phone sv-${c.id}`} aria-label={c.title[lang]} data-watermark={u.watermark}>
     <div className="sv-practice">{u.banner}</div>
     {c.id==='maps'?<div className="sv-map"><div className="sv-map-search"><Icon name="search" size={22}/>{u.mapBehind}</div><div className="sv-map-roads" aria-hidden="true"><i/><i/><i/><Icon name="pin" size={42}/></div><div className="sv-map-dialog"><AppIcon app="maps" size={46}/><h2>{say(u.mapPermission)}</h2><div className="sv-accuracy"><button type="button" aria-pressed={precise} onClick={()=>setPrecise(true)} disabled={!!picked}><span className="sv-location-dot"/>{u.precise}</button><button type="button" aria-pressed={!precise} onClick={()=>setPrecise(false)} disabled={!!picked}><span className="sv-location-area"/>{u.approximate}</button></div><div className="sv-map-choices">{c.choices.map(a=><button key={a.id} {...control(a.id)}>{a.label[lang]}</button>)}</div></div></div>:c.id==='cleaner'?<div className="sv-cleaner-backdrop"><div className="sv-cleaner-dialog"><div className="sv-ad-top"><span>{u.ad}</span><button {...control('close','sv-ad-close')} aria-label={u.close}><Icon name="close" size={24}/></button></div><h2>{say(u.cleanerHeading)}</h2><p>{say(u.cleanerBody)}</p><p>{say(u.cleanerThreat)}</p><p>{say(u.cleanerPush)}</p><div className="sv-timer">05:48</div><p className="sv-timer-note">{say(u.frozen)}</p><div className="sv-ad-buttons">{c.choices.filter(a=>a.id!=='close').map(a=><button key={a.id} {...control(a.id,a.id==='update'?'sv-update':'')}>{a.label[lang]}</button>)}</div></div></div>:<div className="sv-message"><div className="sv-message-header"><button {...control('back','sv-message-back')} aria-label={u.parcelBack}><Icon name="back" size={26}/></button><div><Icon name="user" size={36}/><span>delivery@notice.example</span></div><Icon name="video" size={28}/></div><p className="sv-message-time">iMessage · 10:30</p><div className="sv-message-bubble"><p>{say(u.parcelMessage)}</p><button {...control('link','sv-message-link')} aria-label={u.linkLabel}>https://parcel-help.example/address</button></div><p className="sv-unknown">{say(u.unknown)}</p><button {...control('report','sv-report')}>{c.choices.find(a=>a.id==='report').label[lang]}</button></div>}
    </section>
    {choice&&<section className={`sv-feedback ${choice.kind}`} ref={feedback} tabIndex={-1} aria-label={headline}><h2><Icon name={choice.kind==='wrong'?'close':choice.kind==='neutral'?'info':'check'} size={26}/>{say(headline)}</h2><p>{say(choice.why[lang])}</p>{c.id==='parcel'&&<><button type="button" className="sv-check-tracking" onClick={()=>{setChecking(true);speak(u.checkNote,lang);}}>{u.independent}<Icon name="arrow" size={22}/></button>{checking&&<p className="sv-tracking-note" role="status">{say(u.checkNote)}</p>}</>}<button type="button" className="btn primary" onClick={next}>{at===VISUAL_CASES.length-1?u.finish:u.next}<Icon name="chevron" size={22}/></button></section>}
    {at>0&&<button className="sv-previous" type="button" onClick={()=>{stopSpeaking();setAt(at-1);setPicked(null);setChecking(false);setPrecise(true);}}><Icon name="back" size={22}/>{u.back}</button>}
   </>}
  </main><BottomNav active="safe" t={t}/>
 </div>;
}
