// The last message of a guide lesson and its "try it for real" line, worded for the kind of task instead of one sentence for all.
import { tr } from './guide';

const A = (g) => g.appName || g.app || 'the app';
const SAFETY = /report-fraud|open-link|verify-forward|screen-lock|block-card|upi-failed|privacy/;

const KINDS = {
  pay: {
    done: (a) => tr(`Well done! Next time at the shop, open ${a}, take your time and check the name before you pay.`, `शाबाश! अगली बार दुकान पर ${a} खोलिए, आराम से, और पैसे देने से पहले नाम जाँच लीजिए।`, `നന്നായി! അടുത്ത തവണ കടയിൽ ${a} തുറക്കൂ, ധൃതിയില്ലാതെ, പണം നൽകുന്നതിന് മുമ്പ് പേര് പരിശോധിക്കൂ.`),
    real: (a) => tr(`Try it with a small amount first, like ₹10. The shopkeeper can wait while you check the name.`, `पहले छोटी रकम से आज़माइए, जैसे ₹10। नाम जाँचते समय दुकानदार इंतज़ार कर सकता है।`, `ആദ്യം ₹10 പോലെ ചെറിയ തുകയിൽ ശ്രമിക്കൂ. പേര് പരിശോധിക്കുമ്പോൾ കടക്കാരൻ കാത്തിരിക്കും.`),
  },
  ride: {
    done: (a) => tr(`Well done! Before your next ride you know what to check: the car number, and sharing your trip with family.`, `शाबाश! अगली राइड से पहले आपको पता है क्या जाँचना है: गाड़ी का नंबर, और यात्रा परिवार को भेजना।`, `നന്നായി! അടുത്ത യാത്രയ്ക്ക് മുമ്പ് എന്ത് പരിശോധിക്കണമെന്ന് നിങ്ങൾക്കറിയാം: വണ്ടി നമ്പർ, യാത്ര വീട്ടുകാർക്ക് പങ്കിടുന്നത്.`),
    real: (a) => tr(`Try it on a short ride first. Share your trip with family before you get in.`, `पहले छोटी राइड पर आज़माइए। बैठने से पहले यात्रा परिवार को भेज दीजिए।`, `ആദ്യം ഒരു ചെറിയ യാത്രയിൽ ശ്രമിക്കൂ. കയറുന്നതിന് മുമ്പ് യാത്ര വീട്ടുകാർക്ക് പങ്കിടൂ.`),
  },
  chat: {
    done: (a) => tr(`Well done! Try it now with someone you trust. A simple “hello” is a good first test.`, `शाबाश! अब किसी भरोसेमंद व्यक्ति के साथ आज़माइए। एक साधारण “नमस्ते” पहली अच्छी कोशिश है।`, `നന്നായി! വിശ്വാസമുള്ള ഒരാളോട് ഇപ്പോൾ ശ്രമിച്ചുനോക്കൂ. ഒരു “ഹലോ” നല്ല തുടക്കമാണ്.`),
    real: (a) => tr(`Try it with a family member first, and ask them to tell you it reached them.`, `पहले परिवार के किसी सदस्य के साथ आज़माइए, और उनसे पूछिए कि मिला या नहीं।`, `ആദ്യം വീട്ടിലെ ഒരാളോട് ശ്രമിക്കൂ, അത് കിട്ടിയോ എന്ന് ചോദിക്കൂ.`),
  },
  shop: {
    done: (a) => tr(`Well done! Before a real order on ${a}, check the address and the total. A small order is a good first try.`, `शाबाश! ${a} पर असली ऑर्डर से पहले पता और कुल रकम जाँचिए। छोटा ऑर्डर पहली अच्छी कोशिश है।`, `നന്നായി! ${a}-ൽ യഥാർത്ഥ ഓർഡറിന് മുമ്പ് വിലാസവും ആകെ തുകയും പരിശോധിക്കൂ. ചെറിയ ഓർഡർ നല്ല തുടക്കമാണ്.`),
    real: (a) => tr(`Start with a small order, and check the address before you confirm.`, `छोटे ऑर्डर से शुरू कीजिए, और पक्का करने से पहले पता जाँच लीजिए।`, `ചെറിയ ഓർഡറിൽ തുടങ്ങൂ, ഉറപ്പിക്കുന്നതിന് മുമ്പ് വിലാസം പരിശോധിക്കൂ.`),
  },
  phone: {
    done: (a) => tr(`Well done! Nothing here can harm your phone. Open Settings and try it now, one step at a time.`, `शाबाश! इसमें आपके फ़ोन को कोई नुकसान नहीं होगा। सेटिंग खोलकर अभी आज़माइए, एक-एक कदम।`, `നന്നായി! ഇതിൽ നിങ്ങളുടെ ഫോണിന് ഒരു കേടും വരില്ല. സെറ്റിംഗ്സ് തുറന്ന് ഇപ്പോൾ ഓരോ ഘട്ടമായി ശ്രമിക്കൂ.`),
    real: (a) => tr(`Try it right now. You can always switch it back.`, `अभी आज़माइए। आप इसे कभी भी वापस बदल सकते हैं।`, `ഇപ്പോൾ തന്നെ ശ്രമിക്കൂ. എപ്പോൾ വേണമെങ്കിലും തിരികെ മാറ്റാം.`),
  },
  safety: {
    done: (a) => tr(`Well done! If a message or call ever rushes you, stop and call someone you trust before you tap anything.`, `शाबाश! अगर कोई मैसेज या कॉल कभी जल्दी करवाए, तो कुछ भी दबाने से पहले रुकिए और किसी भरोसेमंद को फ़ोन कीजिए।`, `നന്നായി! ഏതെങ്കിലും മെസ്സേജോ കോളോ ധൃതി കൂട്ടിയാൽ, എന്തെങ്കിലും അമർത്തും മുമ്പ് നിർത്തി വിശ്വാസമുള്ള ഒരാളെ വിളിക്കൂ.`),
    real: (a) => tr(`Do it when you are calm and have time, with no one rushing you.`, `यह तब कीजिए जब आप शांत हों और आपके पास समय हो, कोई जल्दी न करवाए।`, `ശാന്തമായി, സമയമുള്ളപ്പോൾ ചെയ്യൂ, ആരും ധൃതി കൂട്ടാതെ.`),
  },
  fun: {
    done: (a) => tr(`Well done! Open ${a} and try it now. There is nothing to lose here, so explore a little.`, `शाबाश! ${a} खोलकर अभी आज़माइए। यहाँ खोने को कुछ नहीं है, थोड़ा घूमकर देखिए।`, `നന്നായി! ${a} തുറന്ന് ഇപ്പോൾ ശ്രമിക്കൂ. ഇവിടെ നഷ്ടപ്പെടാൻ ഒന്നുമില്ല, ഒന്ന് ചുറ്റിനോക്കൂ.`),
    real: (a) => tr(`Open ${a} and try it once. Take your time.`, `${a} खोलकर एक बार आज़माइए। आराम से कीजिए।`, `${a} തുറന്ന് ഒരു തവണ ശ്രമിക്കൂ. സാവധാനം ചെയ്യൂ.`),
  },
  travel: {
    done: (a) => tr(`Well done! Try it at home first, before you need it on the road or at the station.`, `शाबाश! पहले घर पर आज़माइए, ताकि सड़क पर या स्टेशन पर ज़रूरत पड़े तो आसानी रहे।`, `നന്നായി! വഴിയിലോ സ്റ്റേഷനിലോ ആവശ്യം വരും മുമ്പ് വീട്ടിൽ വെച്ച് ശ്രമിക്കൂ.`),
    real: (a) => tr(`Try it at home now, with no hurry.`, `अभी घर पर, बिना जल्दी के आज़माइए।`, `ഇപ്പോൾ വീട്ടിൽ, ധൃതിയില്ലാതെ ശ്രമിക്കൂ.`),
  },
  other: {
    done: (a) => tr(`Well done! Next time you open ${a}, you will know where to tap. Go slowly, one step at a time.`, `शाबाश! अगली बार ${a} खोलने पर आपको पता होगा कहाँ दबाना है। आराम से, एक-एक कदम।`, `നന്നായി! അടുത്ത തവണ ${a} തുറക്കുമ്പോൾ എവിടെ അമർത്തണമെന്ന് നിങ്ങൾക്കറിയാം. സാവധാനം, ഓരോ ഘട്ടമായി.`),
    real: (a) => tr(`Try it once in the real app. Go slowly, one step at a time.`, `असली ऐप में एक बार आज़माइए। आराम से, एक-एक कदम।`, `യഥാർത്ഥ ആപ്പിൽ ഒരു തവണ ശ്രമിക്കൂ. സാവധാനം, ഓരോ ഘട്ടമായി.`),
  },
};

function kindOf(g) {
  if (SAFETY.test(g.id)) return 'safety';
  if (['gpay', 'phonepe', 'yono'].includes(g.app)) return 'pay';
  if (['uber', 'rapido'].includes(g.app)) return 'ride';
  if (g.app === 'whatsapp') return 'chat';
  if (['zomato'].includes(g.app)) return 'shop';
  if (g.app === 'phone') return 'phone';
  if (['youtube', 'instagram', 'spotify', 'drive'].includes(g.app)) return 'fun';
  if (['maps', 'irctc'].includes(g.app)) return 'travel';
  return 'other';
}

export function closingFor(g) {
  const k = KINDS[kindOf(g)];
  const a = A(g);
  return { done: k.done(a), real: k.real(a) };
}
