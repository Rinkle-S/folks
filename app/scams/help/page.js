'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import Icon from '@/components/Icons';
import PrintBar from '@/components/PrintBar';
import {scamHelp} from '@/lib/scamHelp';
import {T} from '@/lib/i18n';
import {SAFE_UI} from '@/lib/safeLessons';
import {useLang,track,stopSpeaking} from '@/lib/client';

export default function ScamHelp(){
  const [lang]=useLang();
  const [step,setStep]=useState(1),[shareState,setShareState]=useState('');
  const content=useRef(null);
  useEffect(()=>{
    stopSpeaking();
    track('scam_help_opened',{meta:{from:new URLSearchParams(window.location.search).get('source')||'link'}});
    return ()=>stopSpeaking();
  },[]);
  useEffect(()=>{track('scam_help_step',{step,meta:{step}});content.current?.scrollTo(0,0);},[step]);
  if(!lang)return <main className="page"/>;
  const u=scamHelp(lang),p=u.pages[step-1],t=T[lang];
  const call=()=>{track('scam_help_call_1930',{step,meta:{step}});track('cheated_call');};
  const url='https://nook-learn.vercel.app/scams/help';
  async function share(){
    const link=`${url}?lang=${lang}`;
    if(navigator.share){try{await navigator.share({title:u.title,text:u.entry,url:link});return;}catch(e){if(e.name==='AbortError')return;}}
    try{await navigator.clipboard.writeText(`${u.entry}\n${link}`);setShareState(t.linkCopied);}catch{setShareState(u.shareFailed);}
  }
  const items=u.pages.map((page,i)=>({id:`scam-help-${i+1}`,title:`${i+1}. ${page.title}`,steps:[page.lead,page.urgent,page.portal,...(page.items||[]),...(page.extra||[]),page.rule,page.credit,page.caution,...(page.cards||[]).flatMap(c=>[c.title,c.text]),...(i===5?[`112: ${page.emergency}`,`181: ${page.women}`,page.womenNote,'https://cybercrime.gov.in','https://stopncii.org','https://sancharsaathi.gov.in/sfc/']:[]),page.takeaway].filter(Boolean)}));
  return <main className="page ss scam-help" data-l={lang}>
    <header className="scam-help-top"><Link href="/scams" className="ss-back"><Icon name="back" size={22}/>{SAFE_UI[lang].title}</Link>{step>1&&<a className="scam-help-call" href="tel:1930" onClick={call}><Icon name="phone" size={20}/>{u.call}</a>}</header>
    <div className="scam-help-progress" role="progressbar" aria-label={u.title} aria-valuenow={step} aria-valuemin={1} aria-valuemax={6}><div><span>{u.title}</span><b>{u.step} {step} / 6</b></div><div className="ss-bars">{u.pages.map((_,i)=><i key={i} className={i<step?'on':''}/>)}</div></div>
    <section className="scam-help-content" ref={content} tabIndex={-1}>
      <h1>{p.title}</h1>{p.lead&&<p className="scam-help-lead">{p.lead}</p>}
      {step===1&&<div className="scam-help-urgent"><p>{p.urgent}</p><a href="tel:1930" className="scam-help-call big" onClick={call}><Icon name="phone" size={28}/><span><b>{u.callNow}</b><small>{u.callSub}</small></span></a></div>}
      {step===3&&<a className="scam-help-portal" href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" onClick={()=>track('cheated_portal')}><Icon name="globe" size={24}/><span><b>cybercrime.gov.in</b><small>{p.portal}</small></span><Icon name="chevron" size={20}/></a>}
      {p.items&&<><h2>{p.listHeading}</h2><ol className={step===1?'scam-help-tiles':'scam-help-list'}>{p.items.map((item,i)=><li key={i}>{step===2&&<span className="end-tip-number">{i+1}</span>}{(step===3)&&<Icon name="check" size={22}/>}<span>{item}</span></li>)}</ol></>}
      {p.extra&&<><h2>{p.extraHeading}</h2><ul className="scam-help-list separated">{p.extra.map((item,i)=><li key={i}><span aria-hidden="true">⊘</span><span>{item}</span></li>)}</ul></>}
      {step===4&&<><div className="scam-help-rule"><div className="scam-help-days">3 <small>{{en:'DAYS',hi:'दिन',ml:'ദിവസം'}[lang]}</small></div><p>{p.rule}</p><p>{p.credit}</p></div><p className="scam-help-caution">{p.caution}</p></>}
      {step===6&&<><div className="scam-help-tiles calls"><a href="tel:112"><Icon name="phone" size={22}/><b>112</b><span>{p.emergency}</span></a><a href="tel:181"><Icon name="phone" size={22}/><b>181</b><span>{p.women}</span></a></div><p>{p.womenNote}</p></>}
      {p.cards&&<div className="scam-help-cards">{p.cards.map((c,i)=><article key={i} className={step===5&&i===1?'scam-help-urgent':''}><h2>{c.title}</h2><p>{c.text}</p>{step===6&&i===0&&<div className="scam-help-links"><a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">cybercrime.gov.in <Icon name="chevron" size={20}/></a><a href="https://stopncii.org/" target="_blank" rel="noopener noreferrer">StopNCII.org <Icon name="chevron" size={20}/></a></div>}{step===6&&i===1&&<a href="https://sancharsaathi.gov.in/sfc/" target="_blank" rel="noopener noreferrer">Sanchar Saathi · Chakshu <Icon name="chevron" size={20}/></a>}</article>)}</div>}
      <p className="scam-help-takeaway">{p.takeaway}</p>
      {step===6&&<div className="scam-help-share"><PrintBar entries={items} heading={u.title} lang={lang} t={t} label={u.print}/><button className="btn ghost" onClick={share}><Icon name="share" size={24}/>{u.share}</button>{shareState&&<p role="status">{shareState}</p>}</div>}
    </section>
    <footer className={`scam-help-footer${step===1?' first':''}`}>
      {step>1&&<button className="ss-btn ghost" onClick={()=>setStep(step-1)}><Icon name="back" size={20}/>{t.back}</button>}
      {step<6?<button className="ss-btn" onClick={()=>setStep(step+1)}>{u.next[step-1]}<Icon name="chevron" size={20}/></button>:<Link href="/scams" className="ss-btn">{u.done}</Link>}
    </footer>
  </main>;
}
