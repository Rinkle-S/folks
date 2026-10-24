'use client';
// Picks the practice screen for a step. Anything a parent should tap carries data-t="<target>";
// keypad keys carry data-key. Each lesson declares the app it teaches (lesson.app), so a later
// "child picks the parent's app" setting can swap in other app skins.
import {
  GpHome,
  GpScan,
  GpContacts,
  GpChat,
  GpAmount,
  GpPin,
  GpSuccess,
  GpRechargeNumbers,
  GpPlans,
  GpBoards,
  GpConsumer,
  GpBill,
} from './screens/GPay';
import {
  WaChats,
  WaChat,
  WaInfo,
  WaMedia,
  WaPdf,
  WaUpdates,
  WaTextStatus,
  WaCalling,
  WaVideo,
} from './screens/WhatsApp';
import { UbHome, UbSearch, UbRides, UbPickup, UbDriver, UbShare, RpHome, RpSearch, RpRides, RpCaptain, RpEnd } from './screens/Rides';
import { PhoneHome } from './screens/PhoneHome';
import GenScreen from './screens/Gen';
import KitScreen from './kit';
import Icon from './Icons';
import AppIcon from './AppIcon';
import { useLayoutEffect, useRef } from 'react';
import { LangCtx } from './LangCtx';
import { mlNames } from '@/lib/ml';

function Intro({ lesson, lang, t }) {
  return (
    <div className="intro">
      <AppIcon app={lesson.app} size={84} />
      {lesson.appName && <span className="intro-app">{lesson.appName}</span>}
      <div className="intro-title">{lesson.title[lang]}</div>
      <div className="intro-chips">
        <span>{t.minutes(lesson.minutes)}</span>
        <span className="safe">{t.practiceOnly}</span>
      </div>
    </div>
  );
}

// Malayalam screens show Chettan and Chechi for Bhaiya and Didi. Display only: the data, tap targets and
// the other languages keep the original names.
function MlNames({ lang, children }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const root = ref.current;
    if (lang !== 'ml' || !root) return;
    const fix = () => {
      const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let n = w.nextNode(); n; n = w.nextNode()) if (/Bhaiya|Didi/.test(n.nodeValue)) n.nodeValue = mlNames(n.nodeValue);
    };
    fix();
    const mo = new MutationObserver(fix);
    mo.observe(root, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  });
  return (
    <div ref={ref} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}

export default function Screen(props) {
  return (
    <LangCtx.Provider value={props.lang || 'en'}>
      <MlNames lang={props.lang}>
        <ScreenFor {...props} />
      </MlNames>
    </LangCtx.Provider>
  );
}

function ScreenFor({ step, lesson, lang, t, values, typed }) {
  const payee = lesson.payee;
  const amount = values.amount || lesson.amount || '';
  const inputHere = step.kind === 'input';

  switch (step.screen) {
    case 'intro':
      return <Intro lesson={lesson} lang={lang} t={t} />;
    case 'phone-home':
      return <PhoneHome app={lesson.app} />;
    case 'gen':
      return <GenScreen ui={step.ui} typed={typed} inputHere={inputHere} />;
    case 'kit':
      return <KitScreen step={step} typed={typed} />;

    // Google Pay
    case 'gp-home':
      return <GpHome request={step.request} />;
    case 'gp-scan':
      return <GpScan />;
    case 'gp-contacts':
      return <GpContacts />;
    case 'gp-chat':
      return <GpChat payee={payee} />;
    case 'gp-amount':
      return (
        <GpAmount
          payee={payee}
          amount={inputHere && step.field === 'amount' ? typed : amount}
          keypad={inputHere}
          sheet={step.sheet}
        />
      );
    case 'gp-pin':
      return <GpPin payee={payee} amount={amount} typed={inputHere ? typed : ''} full={!inputHere} />;
    case 'gp-success':
      return <GpSuccess payee={payee} amount={amount} title={lesson.successTitle} />;
    case 'gp-share':
      return <GpSuccess payee={payee} amount={amount} title={lesson.successTitle} share />;
    case 'gp-recharge':
      return <GpRechargeNumbers />;
    case 'gp-plans':
      return <GpPlans />;
    case 'gp-boards':
      return <GpBoards />;
    case 'gp-consumer':
      return <GpConsumer typed={inputHere ? typed : values.consumer} keypad={inputHere} />;
    case 'gp-bill':
      return <GpBill />;

    // WhatsApp
    case 'wa-chats':
      return <WaChats />;
    case 'wa-chat':
      return <WaChat contact={lesson.contact} />;
    case 'wa-calling':
      return <WaCalling contact={lesson.contact} />;
    case 'wa-video':
      return <WaVideo contact={lesson.contact} flipped={step.flipped} />;
    case 'wa-info':
      return <WaInfo />;
    case 'wa-media':
      return <WaMedia tab={step.tab || 'media'} />;
    case 'wa-pdf':
      return <WaPdf />;
    case 'wa-updates':
      return <WaUpdates posted={step.posted} />;
    case 'wa-text-status':
      return <WaTextStatus typed={step.typed} color={step.color || 0} />;

    // Uber
    case 'ub-home':
      return <UbHome />;
    case 'ub-search':
      return <UbSearch />;
    case 'ub-rides':
      return <UbRides selected={step.selected} />;
    case 'ub-pickup':
      return <UbPickup />;
    case 'ub-driver':
      return <UbDriver shared={step.shared} details={step.details} />;
    case 'ub-share':
      return <UbShare />;

    // Rapido
    case 'rp-home':
      return <RpHome />;
    case 'rp-search':
      return <RpSearch />;
    case 'rp-rides':
      return <RpRides selected={step.selected} />;
    case 'rp-captain':
      return <RpCaptain />;
    case 'rp-end':
      return <RpEnd rated={step.rated} />;

    default:
      return null;
  }
}
