'use client';
import { useEffect, useRef, useState } from 'react';
import { BottomNav } from './AppShell';
import AppIcon from './AppIcon';
import Icon from './Icons';
import PrintBar from './PrintBar';
import { getProfile } from '@/lib/profile';
import { track } from '@/lib/client';
import { realAppHref } from '@/lib/openApp';

export default function LessonEnd({lesson, lang, t, mode, onRestart}) {
  const [rating,setRating] = useState('');
  const [profile] = useState(getProfile);
  const root = useRef(null), footer = useRef(null);
  const targetApp = lesson.id === 'gd-install-app' ? 'playstore' : lesson.app;
  const realHref = realAppHref(targetApp);
  const label = mode==='watch' ? t.endWatched : mode==='follow' ? t.endRead : t.endTried;
  const repeat = mode==='watch' ? t.endWatchAgain : mode==='follow' ? t.endReadAgain : t.endTryAgain;
  const main = mode==='watch' ? t.endTry : mode==='follow' ? t.endReadTry : realHref ? t.endOpenReal(targetApp==='playstore'?'Play Store':lesson.appName) : t.endPhoneSteps;
  useEffect(()=>{
    window.scrollTo(0,0);
    const nav = root.current.querySelector('.bottomnav');
    const measure=()=>{
      root.current?.style.setProperty('--end-actions-height',`${footer.current.getBoundingClientRect().height}px`);
      root.current?.style.setProperty('--end-nav-height',`${nav.getBoundingClientRect().height}px`);
    };
    measure();const observer=new ResizeObserver(measure);observer.observe(footer.current);observer.observe(nav);
    return ()=>observer.disconnect();
  },[]);
  const action = (value)=>track('lesson_end_action',{lesson:lesson.id,meta:{lessonId:lesson.id,action:value,mode}});
  return <main className="page done has-nav lesson-end-v2" ref={root}>
    <div className="done-medal"><Icon name="check" size={44} stroke={3}/></div>
    <h1 className="done-title">{t.wellDoneName(profile.name?.trim())}</h1>
    <div className="learn-lesson-context completed-lesson" data-app={lesson.app}><AppIcon app={lesson.app} size={52}/><div><p className="done-sub">{label}</p><b>{lesson.title[lang]}</b></div></div>
    <section className="end-remember" aria-labelledby="end-remember-heading"><div className="end-section-heading"><h2 id="end-remember-heading">{t.remember}</h2><PrintBar variant="tips" label={t.endPrint} lang={lang} t={t} heading={lesson.title[lang]} entries={[{id:lesson.id,title:lesson.title[lang],app:'',steps:lesson.tips.map(tip=>tip.text[lang])}]} onPrint={()=>action('print')}/></div>
      <ol className="end-tips">{lesson.tips.map((tip,i)=><li key={i}><span className="end-tip-number">{i+1}</span><div><p>{tip.text[lang]}</p></div></li>)}</ol>
    </section>
    <section className="end-feedback" aria-labelledby="end-feedback-heading"><h2 id="end-feedback-heading">{t.endQuestion}</h2><div className="end-rating">{['easy','okay','hard'].map((value,i)=><button key={value} aria-pressed={rating===value} onClick={()=>{
      setRating(value);track('lesson_feedback',{lesson:lesson.id,meta:{lessonId:lesson.id,rating:value}});
      track('feedback',{lesson:lesson.id,meta:{v:value,mode,lang}}); // preserve the existing stats dashboard
    }}><span className="rating-emoji" aria-hidden="true">{['😊','😐','😟'][i]}</span><span>{t[value]}</span></button>)}</div></section>
    <div className="end-next" ref={footer}>{mode==='practice' && realHref ? <a className="btn primary" href={realHref} onClick={()=>{action('real_app');track('open_real_app',{lesson:lesson.id,meta:{app:targetApp}});}}>{main}</a> : <button className="btn primary" onClick={()=>{action(mode==='practice'?'real_steps':'next');onRestart(mode==='practice'?'follow':'practice');}}>{main}</button>}<button className="link-btn end-repeat" onClick={()=>{action('again');onRestart(mode);}}><Icon name="refresh" size={22}/>{repeat}</button></div>
    <BottomNav active="learn" t={t}/>
  </main>;
}
