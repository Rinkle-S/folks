// Corrections from the owner's screenshot review. Keep the surrounding lessons/screens intact.
const t = (en, hi, ml) => ({en, hi, ml});
export function applyTutorialFixes(lessons, real) {
  const step = (id, key) => lessons[id].steps.find(s => s.id === key);
  for (const lesson of Object.values(lessons)) {
    // A terminal instruction card repeated the same closing as the completion page.
    if (lesson.closing && lesson.steps.at(-1)?.id === 'done' && lesson.steps.at(-1).kind === 'info') lesson.steps.pop();
    if (lesson.app === 'gpay') {
      const open = lesson.steps.find(s => s.id === 'open-app');
      if (open) open.say = t('Find Google Pay. Look for the white icon with coloured shapes and the name underneath. Tap it.', 'Google Pay ढूंढिए। सफ़ेद निशान पर रंगीन आकृतियाँ हैं और नीचे नाम है। उसे दबाइए।', 'Google Pay കണ്ടെത്തൂ. വെള്ള ഐക്കണിൽ നിറമുള്ള രൂപങ്ങളും താഴെ പേരും കാണാം. അത് അമർത്തൂ.');
    }
  }
  Object.assign(step('video-call', 'ringing'), { autoAdvanceMs: 5000, say: t('It is ringing. Rahul will answer in a moment.', 'घंटी बज रही है। राहुल थोड़ी देर में उठाएँगे।', 'റിങ് ചെയ്യുന്നു. രാഹുൽ ഉടൻ എടുക്കും.') });
  for (const key of ['scam-quiz', 'decline']) step('qr-pay', key).safety = {};
  Object.assign(step('video-call', 'digital-arrest'), { screen: 'practice-police', safety: {} });
  Object.assign(step('yono-balance', 'mpin-call'), { screen: 'practice-bank', safety: {} });
  step('video-call', 'digital-arrest').options.find(o=>!o.correct).why = t('Do not pay. A demand for money to end a so-called digital arrest is a fraud. End the call and tell someone you trust.', 'पैसे मत दीजिए। तथाकथित डिजिटल अरेस्ट खत्म करने के लिए पैसे माँगना धोखा है। कॉल काटकर किसी भरोसेमंद व्यक्ति को बताइए।', 'പണം നൽകരുത്. ഡിജിറ്റൽ അറസ്റ്റ് അവസാനിപ്പിക്കാൻ പണം ചോദിക്കുന്നത് തട്ടിപ്പാണ്. കോൾ അവസാനിപ്പിച്ച് വിശ്വസിക്കുന്ന ഒരാളോട് പറയൂ.');
  const receive = step('qr-pay', 'scam-quiz');
  receive.options.find(o=>o.correct).text = t('No. Receiving money needs no PIN.', 'नहीं। पैसे लेने के लिए PIN नहीं चाहिए।', 'വേണ്ട. പണം സ്വീകരിക്കാൻ PIN വേണ്ട.');
  const pinRule = t('Never enter your UPI PIN to receive money.', 'पैसे लेने के लिए अपना UPI PIN कभी न डालिए।', 'പണം സ്വീകരിക്കാൻ UPI PIN ഒരിക്കലും അടിക്കരുത്.');
  for (const lang of ['en','hi','ml']) lessons['qr-pay'].takeaways[lang][2] = pinRule[lang];
  // A mismatch means stay outside and establish where the booked car is, not automatically cancel.
  const mismatch = t('If the car or driver does not match, do not get in. Check your booking and contact the booked driver in the app. Wait safely for the matching car. If you cannot resolve it or feel unsafe, use in-app help or cancel.', 'गाड़ी या ड्राइवर मेल न खाए तो मत बैठिए। बुकिंग जाँचकर ऐप से बुक किए ड्राइवर से बात कीजिए। सही गाड़ी का सुरक्षित जगह इंतज़ार कीजिए। बात न सुलझे या असुरक्षित लगे तो ऐप में मदद लीजिए या रद्द कीजिए।', 'കാറോ ഡ്രൈവറോ ഒത്തുവരുന്നില്ലെങ്കിൽ കയറരുത്. ബുക്കിങ് പരിശോധിച്ച് ആപ്പിലൂടെ ബുക്ക് ചെയ്ത ഡ്രൈവറെ ബന്ധപ്പെടൂ. ശരിയായ കാറിനായി സുരക്ഷിതമായി കാത്തിരിക്കൂ. പരിഹാരമില്ലെങ്കിലോ സുരക്ഷിതമല്ലെങ്കിലോ ആപ്പിൽ സഹായം തേടൂ അല്ലെങ്കിൽ റദ്ദാക്കൂ.');
  step('gd-ride-driver-check', 'careful').say = mismatch;
  real['gd-ride-driver-check'] = {...real['gd-ride-driver-check'], careful: mismatch};
  Object.assign(step('gd-uber-cancel', 's2'), {p: {reasonIndex: 5}, say: t("Your plans changed in this practice. Tap 'Other'. On your real phone, choose the reason that matches what happened.", "अभ्यास में आपकी योजना बदल गई है। 'Other' दबाइए। असली फ़ोन में वही कारण चुनिए जो सच में हुआ है।", "ഈ പരിശീലനത്തിൽ നിങ്ങളുടെ പദ്ധതി മാറി. 'Other' അമർത്തൂ. യഥാർത്ഥ ഫോണിൽ സംഭവിച്ചതിന് അനുയോജ്യമായ കാരണം തിരഞ്ഞെടുക്കൂ.")});
  real['gd-uber-cancel'] = {...real['gd-uber-cancel'], s2: t('Choose the reason that matches why you are cancelling.', 'जिस वजह से रद्द कर रहे हैं, वही कारण चुनिए।', 'റദ്ദാക്കുന്ന യഥാർത്ഥ കാരണം തിരഞ്ഞെടുക്കൂ.')};
  const options = step('uber-cab', 'check-car').options;
  options.find(o=>o.correct).why = t('Match the number plate, car and driver details. If they do not match, stay outside and contact the booked driver in the app. Wait safely for the matching car.', 'नंबर प्लेट, गाड़ी और ड्राइवर की जानकारी मिलाइए। मेल न खाए तो बाहर रहकर ऐप से बुक किए ड्राइवर से बात कीजिए। सही गाड़ी का सुरक्षित जगह इंतज़ार कीजिए।', 'നമ്പർ പ്ലേറ്റും കാറും ഡ്രൈവർ വിവരങ്ങളും ഒത്തുനോക്കൂ. ഒത്തുവരുന്നില്ലെങ്കിൽ പുറത്ത് നിന്ന് ആപ്പിലൂടെ ബുക്ക് ചെയ്ത ഡ്രൈവറെ ബന്ധപ്പെടൂ. ശരിയായ കാറിനായി സുരക്ഷിതമായി കാത്തിരിക്കൂ.');
  step('uber-cab', 'ride-pin').options.find(o=>o.correct).why = t('Check the car and driver first. Share the ride PIN only with the booked driver after getting into the matching car. It is not your banking PIN.', 'पहले गाड़ी और ड्राइवर जाँचिए। सही गाड़ी में बैठकर सिर्फ़ बुक किए ड्राइवर को यात्रा का PIN बताइए। यह बैंक वाला PIN नहीं है।', 'ആദ്യം കാറും ഡ്രൈവറും പരിശോധിക്കൂ. ശരിയായ കാറിൽ കയറിയ ശേഷം ബുക്ക് ചെയ്ത ഡ്രൈവറോട് മാത്രം യാത്രാ PIN പറയൂ. ഇത് ബാങ്ക് PIN അല്ല.');
  step('recharge', 'sms-scam').options.find(o=>o.correct).text = t('Ignore the link. Open my own recharge app.', 'लिंक छोड़ूँ। अपना रिचार्ज ऐप खुद खोलूँ।', 'ലിങ്ക് ഒഴിവാക്കി സ്വന്തം റീചാർജ് ആപ്പ് തുറക്കാം.');
  step('uber-cab', 'shared').say = t('Trip shared in practice. On your real phone, this link lets your family follow the ride. Tap Next.', 'अभ्यास में यात्रा साझा हो गई। असली फ़ोन में इस लिंक से परिवार यात्रा देख सकता है। Next दबाइए।', 'പരിശീലനത്തിൽ യാത്ര പങ്കിട്ടു. യഥാർത്ഥ ഫോണിൽ ഈ ലിങ്കിലൂടെ കുടുംബത്തിന് യാത്ര പിന്തുടരാം. Next അമർത്തൂ.');
}
