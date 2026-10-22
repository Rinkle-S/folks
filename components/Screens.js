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
} from './screens/GPay';
import { WaChats, WaChat, WaInfo, WaMedia, WaPdf, WaUpdates, WaTextStatus } from './screens/WhatsApp';

function Intro({ lesson, lang, t }) {
  return (
    <div className="intro">
      <div className="intro-emoji">{lesson.emoji}</div>
      <div className="intro-title">{lesson.title[lang]}</div>
      <div className="intro-badge">🛡️ {t.practiceOnly}</div>
      <div className="intro-time">
        {lesson.appName ? `${lesson.appName} · ` : ''}⏱ {t.minutes(lesson.minutes)}
      </div>
    </div>
  );
}

export default function Screen({ step, lesson, lang, t, values, typed }) {
  const payee = lesson.payee;
  const amount = values.amount || lesson.amount || '';
  const inputHere = step.kind === 'input';

  switch (step.screen) {
    case 'intro':
      return <Intro lesson={lesson} lang={lang} t={t} />;

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
    case 'gp-recharge':
      return <GpRechargeNumbers />;
    case 'gp-plans':
      return <GpPlans />;

    // WhatsApp
    case 'wa-chats':
      return <WaChats />;
    case 'wa-chat':
      return <WaChat />;
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

    default:
      return null;
  }
}
