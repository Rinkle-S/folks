// Registry of practice-screen templates. A lesson step says { screen: 'kit', kit: '<name>', p: {...props}, ov: {...overlay} }.
import { Overlay, Done } from './ui';
import * as A from './Android';
import * as W from './WhatsApp';
import * as M from './Money';
import * as TR from './Travel';
import * as L from './Lessons';
import * as ST from './Store';
import { GpScan, GpChat } from '../screens/GPay';

export const KIT = {
  'and-home': A.AHome,
  'and-settings': A.SetMain,
  'and-page': A.SetPage,
  'and-pin': A.SetPin,
  'and-qs': A.QuickSettings,
  'and-clock': A.Clock,
  'and-contacts': A.Contacts,
  'and-contact-form': A.ContactForm,
  'and-play': ST.PlayStore,
  'icon-board': ST.IconBoard,
  'icon-same': ST.IconSame,
  'and-gallery': A.Gallery,
  'and-sms': A.Sms,
  'and-gmail': A.Gmail,
  'and-wall': A.WallPreview,
  done: Done,
  'wa-list': W.WaList,
  'wa-thread': W.WaThread,
  'wa-new': W.WaNewChat,
  'wa-pick': W.WaPick,
  'wa-group-name': W.WaGroupName,
  'wa-settings': W.WaSettings,
  'wa-profile': W.WaProfile,
  'wa-photos': W.WaPhotos,
  'wa-send': W.WaSendPreview,
  'and-call': A.ACall,
  'and-web': A.AWeb,
  'gp-home': M.GpHome,
  'gp-money': M.GpMoney,
  'gp-amount': M.GpAmount,
  'gp-pin': M.GpPin,
  'gp-banks': M.GpBanks,
  'gp-profile': M.GpProfile,
  'gp-bank': M.GpBankPage,
  'gp-balance': M.GpBalance,
  'gp-history': M.GpHistory,
  'gp-txn': M.GpTxn,
  'gp-card': M.GpCard,
  'gp-otp': M.GpOtp,
  'gp-phone': M.GpPayPhone,
  'gp-scan-g': M.GpScanG,
  'photo-pick': M.PhotoPick,
  'pp-home': M.PpHome,
  'pp-contacts': M.PpContacts,
  'pp-amount': M.PpAmount,
  'bk-login': M.BkLogin,
  'bk-home': M.BkHome,
  'bk-list': M.BkList,
  'bk-form': M.BkForm,
  'bk-otp': M.BkOtp,
  'bk-statement': M.BkStatement,
  'ub-home': TR.UbHome,
  'ub-search': TR.UbSearch,
  'ub-rides': TR.UbRides,
  'ub-pickup': TR.UbPickup,
  'ub-driver': TR.UbDriver,
  'ub-share': TR.UbShare,
  'rp-home': TR.RpHome,
  'rp-search': TR.RpSearch,
  'rp-rides': TR.RpRides,
  'rp-captain': TR.RpCaptain,
  'rp-end': TR.RpEnd,
  'ub-activity': TR.UbActivity,
  'ub-trip': TR.UbTrip,
  'ub-help': TR.UbHelp,
  'ub-lost': TR.UbLost,
  'ub-rate': TR.UbRate,
  'ub-pay': TR.UbPay,
  'ub-cancel': TR.UbCancel,
  'ub-why': TR.UbWhy,
  'ir-home': TR.IrHome,
  'ir-login': TR.IrLogin,
  'ir-bookings': TR.IrBookings,
  'ir-ticket': TR.IrTicket,
  'ir-cancel': TR.IrCancel,
  'ir-otp': TR.IrOtp,
  'ir-running': TR.IrRunning,
  'mp-home': TR.MpHome,
  'mp-list': TR.MpList,
  'mp-place': TR.MpPlace,
  'mp-saved': TR.MpSaved,
  'mp-navigate': TR.MpNavigate,
  'mp-offline': TR.MpOffline,
  'and-camera': A.Camera,
  'and-photo': A.PhotoView,
  'and-font': A.FontSize,
  'and-caller': A.CallerPage,
  'and-recents': A.Recents,
  'gp-scan': GpScan,
  'gp-chat': GpChat,
  'bk-account': L.BkAccount,
  'bk-login-typed': L.BkLoginTyped,
  'ir-login-btn': L.IrLoginBtn,
  'ir-search': L.IrSearch,
  'ir-stations': L.IrStations,
  'ir-trains': L.IrTrains,
  'ir-book': L.IrBook,
  'ir-passenger': L.IrPassenger,
  'ir-pay': L.IrPay,
  'ir-pnr': L.IrPnr,
  'mp-search': L.MpSearch,
  'mp-place-h': L.MpPlaceH,
  'mp-route': L.MpRoute,
  'mp-share': L.MpShare,
};

export function registerKit(more) {
  Object.assign(KIT, more);
}

export default function KitScreen({ step, typed }) {
  const C = KIT[step.kit];
  if (!C) return <div className="app" />;
  return (
    <div className="app k-wrap">
      <C {...(step.p || {})} typed={step.kind === 'input' ? typed : step.p && step.p.typed} />
      <Overlay ov={step.ov} />
      {step.ov && step.ov.custom === 'bank-pp' && <M.PayBankSheet brand="#5f259f" label="PAY ₹500" />}
    </div>
  );
}
