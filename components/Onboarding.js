'use client';
import { useEffect, useState } from 'react';
import Icon from './Icons';
import { NookLogo } from './Logo';
import AppIcon from './AppIcon';
import { ALL_APPS } from '@/lib/apps';
import { T } from '@/lib/i18n';
import { LANGS } from '@/lib/langs';
import { FIRST_GOALS } from '@/lib/flowV2';
import { saveProfile } from '@/lib/profile';
import { speak, stopSpeaking, track } from '@/lib/client';
import VoiceNotice from './VoiceNotice';

export default function Onboarding({ lang, setLang, onDone }) {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [apps, setApps] = useState([]);
  const [none, setNone] = useState(false);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState(FIRST_GOALS[0].id);
  const t = T[lang];
  useEffect(() => {
    window.scrollTo(0, 0);
    if (step === 2 && !success) speak(t.obTapPay, lang);
    return () => stopSpeaking();
  }, [step, success, lang]);
  function toggle(id) { setNone(false); setApps(apps.includes(id) ? apps.filter(a=>a!==id) : [...apps,id]); }
  function goalKey(e, i) {
    if (!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(e.key)) return;
    e.preventDefault();
    const next = (i + (['ArrowDown','ArrowRight'].includes(e.key) ? 1 : -1) + FIRST_GOALS.length) % FIRST_GOALS.length;
    setGoal(FIRST_GOALS[next].id);
    e.currentTarget.parentElement.children[next].focus();
  }
  function nameNext(skip = false) { saveProfile({name:skip ? '' : name}); setStep(4); }
  const next = (fn, label=t.obNext, ghost=false) => <button className={`btn ${ghost?'ghost':'primary'}`} onClick={fn}>{label}</button>;
  return <main className="onboard onboard-v2" data-step={step}>
    <div className="ob-progress"><b>{t.obStep(step)}</b><div aria-hidden="true">{[1,2,3,4,5].map(n=><span key={n} className={n<=step?'on':''} />)}</div></div>
    {step === 1 ? <>
      <div className="ob-content ob-language"><NookLogo height={58}/><p>{t.obTagV2}</p>
        <h1>Choose your language</h1><p lang="hi" className="ob-language-heading">अपनी भाषा चुनिए</p><p lang="ml" className="ob-language-heading">ഭാഷ തിരഞ്ഞെടുക്കൂ</p>
        <div className="ob-language-options">{LANGS.map(l=><button key={l.id} lang={l.id} aria-pressed={lang===l.id} className={lang===l.id?'selected':''} onClick={()=>setLang(l.id)}><b>{l.label}</b>{l.name&&<span>{l.name}</span>}{lang===l.id&&<Icon name="check" size={26}/>}</button>)}</div>
      </div><div className="ob-actions">{next(()=>setStep(2))}</div>
    </> : step === 2 ? success ? <>
      <div className="ob-content ob-success"><span className="ob-success-icon"><Icon name="check" size={44}/></span><h1>{t.obSuccess}</h1><p>{t.obNoMoney}</p><h2>{t.obHow}</h2><div className="ob-promises">{t.obPromises.map((s,i)=><div key={i}><span><Icon name={['recharge','volume','shieldCheck'][i]} size={28}/></span><p>{s}</p></div>)}</div></div>
      <div className="ob-actions">{next(()=>setStep(3))}</div>
    </> : <>
      <div className="ob-content"><h1>{t.obTryTitle}</h1><p>{t.obTrySub}</p><div className="ob-phone"><div className="ob-phone-banner">{t.obPracticePhone}</div><div className="ob-phone-body"><span className="ob-shop-icon"><Icon name="shop" size={30}/></span><p>{t.obPaying}</p><b>{t.obShop}</b><strong>₹10</strong><div className="ob-pay-wrap"><button className="btn primary ob-pay" onClick={()=>{stopSpeaking();track('onboarding_try_tapped');setSuccess(true);}}>{t.obPay}</button><span className="ob-point" aria-hidden="true"><Icon name="hand" size={40}/></span></div></div></div>
        <div className="ob-voice"><b>{t.obTapPay}</b><button onClick={()=>speak(t.obTapPay,lang,{force:true})}><Icon name="volume"/>{t.obListen}</button></div>
        <VoiceNotice lang={lang}/>
      </div><div className="ob-actions">{next(()=>setStep(3),t.obSkip,true)}</div>
    </> : step === 3 ? <>
      <div className="ob-content"><h1>{t.obNameQ}</h1><p>{t.obNameSubV2}</p><label className="ob-name-label" htmlFor="ob-name">{t.obNameLabel}</label><input id="ob-name" className="name-input" value={name} onChange={e=>setName(e.target.value)} maxLength={30} autoComplete="given-name"/>
        <p className="ob-preview-label">{t.obPreview}</p><div className="ob-name-preview"><span><Icon name="check" size={28}/></span><div><b>{t.wellDoneName(name.trim())}</b><p>{t.obAfterLesson}</p></div></div>
      </div><div className="ob-actions">{next(()=>nameNext())}{next(()=>nameNext(true),t.obSkip,true)}</div>
    </> : step === 4 ? <>
      <div className="ob-content"><h1>{t.appsQ}</h1><p>{t.obAppsSubV2}</p><div className="ob-apps">{ALL_APPS.map(a=><button key={a.id} className={apps.includes(a.id)?'selected':''} aria-pressed={apps.includes(a.id)} onClick={()=>toggle(a.id)}><AppIcon app={a.id} size={48}/><b>{a.name}</b>{apps.includes(a.id)&&<i><Icon name="check" size={18}/></i>}</button>)}<button className={`ob-none ${none?'selected':''}`} aria-pressed={none} onClick={()=>{setApps([]);setNone(true);}}><Icon name="minus" size={30}/><b>{t.obNone}</b>{none&&<i><Icon name="check" size={18}/></i>}</button></div></div>
      <div className="ob-actions">{next(()=>setStep(5))}</div>
    </> : <>
      <div className="ob-content"><h1>{t.obGoalTitle}</h1><p>{t.obGoalSub}</p><div className="ob-goals" role="radiogroup" aria-label={t.obGoalTitle}>{FIRST_GOALS.map((g,i)=><button key={g.id} role="radio" tabIndex={goal===g.id?0:-1} onKeyDown={e=>goalKey(e,i)} aria-checked={goal===g.id} className={goal===g.id?'selected':''} onClick={()=>setGoal(g.id)}><span className="ob-goal-icon"><Icon name={g.icon} size={26}/></span><b>{t.obGoals[i]}</b><span className="ob-radio">{goal===g.id&&<Icon name="check" size={18}/>}</span></button>)}</div></div>
      <div className="ob-actions">{next(()=>{track('onboarding_goal',{lesson:goal,meta:{lessonId:goal}});onDone(apps,goal);},t.obFirstLesson)}{next(()=>onDone(apps,goal,true),t.obLookAround,true)}</div>
    </>}
  </main>;
}
