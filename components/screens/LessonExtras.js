import Icon from '../Icons';
import { Status } from '../kit/ui';
const words = {
  en: { share: 'Send to…', preview: 'Send receipt', sent: 'Paid', send: 'Send', call: 'Unknown caller', number: 'Number not saved', message: 'Your SIM will be blocked today. Recharge now at this link:', request: 'I sent you ₹2,000 by mistake. Please send it back.', pretend: 'Pretend message', screenshot: 'Payment receipt' },
  hi: { share: 'किसे भेजें…', preview: 'रसीद भेजें', sent: 'भुगतान हुआ', send: 'भेजें', call: 'अनजान कॉल', number: 'नंबर सेव नहीं है', message: 'आपका SIM आज बंद हो जाएगा। इस लिंक पर अभी रिचार्ज करें:', request: 'मैंने गलती से आपको ₹2,000 भेज दिए। वापस भेज दीजिए।', pretend: 'नकली संदेश', screenshot: 'भुगतान की रसीद' },
  ml: { share: 'അയയ്ക്കേണ്ടത്…', preview: 'രസീത് അയയ്ക്കൂ', sent: 'അടച്ചു', send: 'അയയ്ക്കൂ', call: 'അജ്ഞാത കോളർ', number: 'സേവ് ചെയ്യാത്ത നമ്പർ', message: 'നിങ്ങളുടെ SIM ഇന്ന് ബ്ലോക്ക് ചെയ്യും. ഈ ലിങ്കിൽ ഇപ്പോൾ റീചാർജ് ചെയ്യൂ:', request: 'അബദ്ധത്തിൽ ₹2,000 അയച്ചു. തിരികെ അയയ്ക്കൂ.', pretend: 'സാങ്കൽപ്പിക സന്ദേശം', screenshot: 'പണമടച്ച രസീത്' },
};
export function ReceiptShare({ preview, payee, amount, lang }) {
  const w = words[lang];
  return <div className="app receipt-share"><Status /><div className="extras-bar"><Icon name="back" /> <b>{preview ? w.preview : w.share}</b></div>
    {preview ? <><div className="extras-recipient"><Icon name="check" /> {payee.name}</div><div className="receipt-preview"><Icon name="check" color="#128c7e" size={48} /><h2>{w.screenshot}</h2><strong>₹{amount}</strong><p>{w.sent}</p><b>{payee.name}</b></div><div className="receipt-send" data-t="send-receipt"><span>{w.send}</span><Icon name="share" /></div></> : <div className="extras-recipient" data-t="recipient"><span className="extras-avatar">S</span><div><b>{payee.name}</b><small>{payee.phone || payee.sub}</small></div></div>}
  </div>;
}
export function SafetyPhone({ sms, lang, kind }) {
  const w = words[lang];
  const copy = {
    en: {police: 'Caller claiming to be police', bank: 'Caller claiming to be from SBI', policeMessage: 'You are under “digital arrest”. Pay money now.', bankMessage: 'Your account will be blocked. Tell me your MPIN.', call: 'Pretend call'},
    hi: {police: 'पुलिस होने का दावा करने वाला कॉलर', bank: 'SBI से होने का दावा करने वाला कॉलर', policeMessage: 'आप “डिजिटल अरेस्ट” में हैं। अभी पैसे दीजिए।', bankMessage: 'आपका खाता बंद हो जाएगा। अपना MPIN बताइए।', call: 'नकली कॉल'},
    ml: {police: 'പോലീസ് എന്ന് അവകാശപ്പെടുന്ന കോളർ', bank: 'SBI-യിൽ നിന്നെന്ന് അവകാശപ്പെടുന്ന കോളർ', policeMessage: 'നിങ്ങൾ “ഡിജിറ്റൽ അറസ്റ്റിൽ” ആണ്. ഇപ്പോൾ പണം നൽകൂ.', bankMessage: 'അക്കൗണ്ട് ബ്ലോക്ക് ചെയ്യും. നിങ്ങളുടെ MPIN പറയൂ.', call: 'സാങ്കൽപ്പിക കോൾ'},
  }[lang];
  return <div className={`app extras-safety ${sms ? 'extras-sms' : ''}`}><Status /><div className="extras-bar"><Icon name={sms ? 'chats' : kind === 'police' ? 'video' : 'phone'} /><b>{sms ? 'AX-JIOSIM' : kind ? copy[kind] : w.call}</b></div>
    {!sms && <p className="extras-muted">{w.number}</p>}
    <div className="extras-message"><p>{sms ? w.message : kind ? copy[`${kind}Message`] : w.request}</p>{sms && <span className="inert-link">jio-sim-help.xyz</span>}</div><p className="extras-muted">{sms ? w.pretend : copy.call}</p>
  </div>;
}
