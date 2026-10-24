// YONO SBI, ICICI iMobile, Blinkit and Zepto lessons. Screens are drawn from blocks (see components/screens/Gen.js).
import { tr, intro, tap, note, quiz, opt, input } from './guide';

const YO = { brand: '#6a1b7e', ink: '#ffffff', bg: '#ffffff', soft: '#f4eef7' };
const IC = { brand: '#b02a30', ink: '#ffffff', bg: '#ffffff', soft: '#f6efee' };
const BL = { brand: '#0c831f', ink: '#ffffff', bg: '#ffffff', soft: '#f7f4e6' };
const ZE = { brand: '#5b1fa6', ink: '#ffffff', bg: '#ffffff', soft: '#f3edfa' };

const fix = (en, hi, ml) => ({ en, hi, ml });
const of = (app, appName) => ({ app, appName });

const pinScreen = (skin, appName, typed) => ({ skin, blocks: [{ t: 'hero', e: '🏦', title: appName, sub: 'Enter your MPIN' }, { t: 'dots', total: typed }, { t: 'gap', grow: true }, { t: 'keypad' }] });

// ---------------------------------------------------------------- YONO SBI
const yoHome = () => ({ skin: YO, blocks: [{ t: 'bar', tone: 'brand', title: 'YONO SBI' }, { t: 'text', text: 'Hello, Kamala Nair', tone: 'big' }, { t: 'grid', items: [{ id: 'accounts', e: '🏦', label: 'Accounts' }, { e: '💸', label: 'Send money' }, { e: '💳', label: 'Cards' }, { e: '🧾', label: 'Pay bills' }, { e: '📈', label: 'Invest' }, { e: '🏠', label: 'Loans' }, { e: '🎁', label: 'Offers' }, { e: '❓', label: 'Help' }] }] });

export const APP2_LESSONS = {
  'yono-balance': {
    id: 'yono-balance',
    icon: 'bank',
    emoji: '🏦',
    ...of('yono', 'YONO SBI'),
    minutes: 3,
    title: tr('Check your balance on YONO SBI', 'YONO SBI पर बैलेंस देखें', 'YONO SBI-ൽ ബാലൻസ് നോക്കാം'),
    takeaways: fix(
      ['Type your secret MPIN to enter', "Tap 'Accounts', then 'View balance'", 'The bank never asks for your MPIN on a call'],
      ['अंदर जाने के लिए अपना गुप्त MPIN डालें', "'Accounts' फिर 'View balance' दबाएं", 'बैंक कॉल पर कभी MPIN नहीं मांगता'],
      ['അകത്ത് കടക്കാൻ നിങ്ങളുടെ രഹസ്യ MPIN അടിക്കുക', "'Accounts' അമർത്തി 'View balance' അമർത്തുക", 'ബാങ്ക് കോളിൽ ഒരിക്കലും MPIN ചോദിക്കില്ല']
    ),
    share: tr('I learned to check my balance on YONO SBI with Nook! 🏦', 'मैंने Nook से YONO SBI पर बैलेंस देखना सीखा! 🏦', 'ഞാൻ Nook കൊണ്ട് YONO SBI-ൽ ബാലൻസ് നോക്കാൻ പഠിച്ചു! 🏦'),
    realTry: tr('Open your real YONO SBI, type your own MPIN with your hand covering the screen, and check your balance.', 'अपना असली YONO SBI खोलिए, हाथ से स्क्रीन ढककर अपना MPIN डालिए और बैलेंस देखिए।', 'നിങ്ങളുടെ YONO SBI തുറന്ന്, കൈ കൊണ്ട് സ്ക്രീൻ മറച്ച് സ്വന്തം MPIN അടിച്ച് ബാലൻസ് നോക്കൂ.'),
    steps: [
      intro(tr("Today we'll check how much money is in your SBI account, using YONO SBI. This is only practice. We use a practice MPIN.", 'आज हम YONO SBI से देखेंगे कि आपके SBI खाते में कितने पैसे हैं। यह सिर्फ़ अभ्यास है। हम अभ्यास वाला MPIN इस्तेमाल करेंगे।', 'ഇന്ന് YONO SBI കൊണ്ട് നിങ്ങളുടെ SBI അക്കൗണ്ടിൽ എത്ര പണം ഉണ്ടെന്ന് നോക്കാം. ഇത് പരിശീലനം മാത്രം. പരിശീലനത്തിനുള്ള MPIN ആണ് ഉപയോഗിക്കുന്നത്.')),
      input('mpin', 'mpin', '123456', pinScreen(YO, 'YONO SBI', 6),
        tr('YONO asks for your secret MPIN. For practice, press 1, 2, 3, 4, 5, 6. Never tell your real MPIN to anyone.', 'YONO आपका गुप्त MPIN मांग रहा है। अभ्यास के लिए 1, 2, 3, 4, 5, 6 दबाइए। असली MPIN किसी को कभी न बताइए।', 'YONO നിങ്ങളുടെ രഹസ്യ MPIN ചോദിക്കുന്നു. പരിശീലനത്തിന് 1, 2, 3, 4, 5, 6 അമർത്തൂ. യഥാർത്ഥ MPIN ആരോടും പറയരുത്.'), tr('Press the glowing number.', 'चमकता हुआ नंबर दबाइए।', 'തിളങ്ങുന്ന നമ്പർ അമർത്തൂ.')),
      tap('accounts', 'accounts', yoHome(), tr("You are inside. Tap 'Accounts', the first button.", "आप अंदर आ गए। 'Accounts', पहला बटन, दबाइए।", "നിങ്ങൾ അകത്ത് എത്തി. 'Accounts', ആദ്യത്തെ ബട്ടൺ, അമർത്തൂ."), tr('Tap the first button, with the bank icon.', 'पहला बटन, जिसमें बैंक का निशान है, दबाइए।', 'ആദ്യത്തെ ബട്ടൺ, ബാങ്ക് അടയാളം ഉള്ളത്, അമർത്തൂ.')),
      tap('balance', 'balance', { skin: YO, blocks: [{ t: 'bar', tone: 'brand', title: 'Accounts', back: true }, { t: 'cards', items: [{ e: '🏦', title: 'Savings Account', sub: 'XXXXXX4821', price: 'Balance: ₹ ••••••' }] }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'balance', label: 'View balance' }] }] },
        tr("Here is your savings account. The amount is hidden for safety. Tap 'View balance'.", "यह रहा आपका बचत खाता। सुरक्षा के लिए रकम छिपी है। 'View balance' दबाइए।", "ഇതാ നിങ്ങളുടെ സേവിങ്സ് അക്കൗണ്ട്. സുരക്ഷയ്ക്കായി തുക മറച്ചിരിക്കുന്നു. 'View balance' അമർത്തൂ."), tr('Tap the purple button at the bottom.', 'नीचे बैंगनी बटन दबाइए।', 'താഴെ പർപ്പിൾ ബട്ടൺ അമർത്തൂ.')),
      note('shown', { skin: YO, blocks: [{ t: 'bar', tone: 'brand', title: 'Accounts', back: true }, { t: 'hero', e: '💰', title: '₹ 24,350.00', sub: 'Available balance · Savings XXXXXX4821' }, { t: 'rows', title: 'Last 3', items: [{ e: '⬇️', title: 'Pension credit', right: '+ ₹ 18,000', noChev: true }, { e: '⬆️', title: 'Electricity bill', right: '- ₹ 1,240', noChev: true }, { e: '⬆️', title: 'Sunrise General Store', right: '- ₹ 50', noChev: true }] }] },
        tr('This is your balance, 24,350 rupees. Below are the last three things that happened in your account. You can only see this. Nobody else can.', 'यह आपका बैलेंस है, 24,350 रुपये। नीचे आपके खाते में हुई आख़िरी तीन बातें हैं। इसे सिर्फ़ आप देख सकते हैं।', 'ഇതാണ് നിങ്ങളുടെ ബാലൻസ്, 24,350 രൂപ. താഴെ നിങ്ങളുടെ അക്കൗണ്ടിൽ നടന്ന അവസാന മൂന്ന് കാര്യങ്ങൾ ഉണ്ട്. ഇത് നിങ്ങൾക്ക് മാത്രമേ കാണാൻ കഴിയൂ.')),
      quiz('mpin-call', { skin: YO, blocks: [{ t: 'hero', e: '📞', title: 'Call from "SBI Officer"', sub: 'Your account will be blocked today' }] },
        tr("A caller says: 'I am from SBI. Your account will be blocked. Tell me your MPIN to stop it.' What do you do?", "कोई फ़ोन करके कहता है: 'मैं SBI से हूँ। आपका खाता बंद हो जाएगा। उसे रोकने के लिए अपना MPIN बताइए।' आप क्या करेंगे?", "ഒരാൾ വിളിച്ച് പറയുന്നു: 'ഞാൻ SBI-യിൽ നിന്നാണ്. നിങ്ങളുടെ അക്കൗണ്ട് ബ്ലോക്ക് ആകും. അത് തടയാൻ നിങ്ങളുടെ MPIN പറയൂ.' നിങ്ങൾ എന്ത് ചെയ്യും?"),
        [opt(tr('Tell the MPIN to save my account', 'अपना खाता बचाने के लिए MPIN बता दूँ', 'അക്കൗണ്ട് രക്ഷിക്കാൻ MPIN പറയും'), false, tr('No! This is a scam. The bank never asks for your MPIN, OTP or password.', 'नहीं! यह ठगी है। बैंक आपसे MPIN, OTP या पासवर्ड कभी नहीं मांगता।', 'വേണ്ട! ഇത് തട്ടിപ്പാണ്. ബാങ്ക് നിങ്ങളുടെ MPIN, OTP, പാസ്‌വേഡ് എന്നിവ ഒരിക്കലും ചോദിക്കില്ല.')), opt(tr('Cut the call and tell my family', 'कॉल काटूँ और परिवार को बताऊँ', 'കോൾ കട്ട് ചെയ്ത് വീട്ടുകാരോട് പറയും'), true, tr('Right! Cut the call. If you are worried, go to your bank branch.', 'सही! कॉल काट दीजिए। चिंता हो, तो अपनी बैंक शाखा में जाइए।', 'ശരി! കോൾ കട്ട് ചെയ്യൂ. പേടിയുണ്ടെങ്കിൽ നിങ്ങളുടെ ബാങ്ക് ശാഖയിൽ പോകൂ.'))]),
    ],
  },



};

export const APP2_KEYWORDS = {
  'yono-balance': [['yono', 5], ['योनो', 5], ['യോനോ', 5], ['sbi', 4], ['एसबीआई', 4], ['balance', 3], ['बैलेंस', 3], ['ബാലൻസ്', 3], ['bank', 2], ['बैंक', 2], ['ബാങ്ക്', 2], ['mpin', 3]],
};
