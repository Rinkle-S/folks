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
const yoHome = () => ({ skin: YO, blocks: [{ t: 'bar', tone: 'brand', title: 'YONO SBI' }, { t: 'text', text: 'Hello, Kamla Devi', tone: 'big' }, { t: 'grid', items: [{ id: 'accounts', e: '🏦', label: 'Accounts' }, { e: '💸', label: 'Send money' }, { e: '💳', label: 'Cards' }, { e: '🧾', label: 'Pay bills' }, { e: '📈', label: 'Invest' }, { e: '🏠', label: 'Loans' }, { e: '🎁', label: 'Offers' }, { e: '❓', label: 'Help' }] }] });

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
    share: tr('I learned to check my balance on YONO SBI with Folks! 🏦', 'मैंने Folks से YONO SBI पर बैलेंस देखना सीखा! 🏦', 'ഞാൻ Folks കൊണ്ട് YONO SBI-ൽ ബാലൻസ് നോക്കാൻ പഠിച്ചു! 🏦'),
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

  'icici-transactions': {
    id: 'icici-transactions',
    icon: 'history',
    emoji: '📒',
    ...of('icici', 'ICICI iMobile'),
    minutes: 3,
    title: tr('See your last transactions on iMobile', 'iMobile पर आख़िरी लेन-देन देखें', 'iMobile-ൽ അവസാന ഇടപാടുകൾ നോക്കാം'),
    takeaways: fix(
      ['Enter your login PIN', "Open your account and tap 'Transactions'", 'If you see a payment you did not make, call your bank at once'],
      ['अपना लॉगिन PIN डालें', "अपना खाता खोलें और 'Transactions' दबाएं", 'जो भुगतान आपने नहीं किया वो दिखे, तो तुरंत बैंक को फ़ोन करें'],
      ['നിങ്ങളുടെ ലോഗിൻ PIN അടിക്കുക', "അക്കൗണ്ട് തുറന്ന് 'Transactions' അമർത്തുക", 'നിങ്ങൾ ചെയ്യാത്ത പേയ്മെന്റ് കണ്ടാൽ ഉടനെ ബാങ്കിനെ വിളിക്കുക']
    ),
    share: tr('I learned to check transactions on ICICI iMobile with Folks! 📒', 'मैंने Folks से ICICI iMobile पर लेन-देन देखना सीखा! 📒', 'ഞാൻ Folks കൊണ്ട് ICICI iMobile-ൽ ഇടപാടുകൾ നോക്കാൻ പഠിച്ചു! 📒'),
    realTry: tr('Once a week, open your real bank app and read your last transactions. Ask family about anything you do not know.', 'हफ़्ते में एक बार अपना असली बैंक ऐप खोलकर आख़िरी लेन-देन पढ़िए। कुछ समझ न आए, तो परिवार से पूछिए।', 'ആഴ്ചയിൽ ഒരു തവണ നിങ്ങളുടെ ബാങ്ക് ആപ്പ് തുറന്ന് അവസാന ഇടപാടുകൾ വായിക്കൂ. മനസ്സിലാകാത്തത് വീട്ടുകാരോട് ചോദിക്കൂ.'),
    steps: [
      intro(tr("Today we'll see where your money went in the last few days, using ICICI iMobile. This is only practice.", 'आज हम ICICI iMobile से देखेंगे कि पिछले कुछ दिनों में आपके पैसे कहाँ गए। यह सिर्फ़ अभ्यास है।', 'ഇന്ന് ICICI iMobile കൊണ്ട് കഴിഞ്ഞ ഏതാനും ദിവസങ്ങളിൽ നിങ്ങളുടെ പണം എവിടെ പോയി എന്ന് നോക്കാം. ഇത് പരിശീലനം മാത്രം.')),
      input('pin', 'pin', '1234', { skin: IC, blocks: [{ t: 'hero', e: '🏦', title: 'iMobile', sub: 'Enter your login PIN' }, { t: 'dots', total: 4 }, { t: 'gap', grow: true }, { t: 'keypad' }] },
        tr('The app asks for your login PIN. For practice, press 1, 2, 3, 4. Never tell your real PIN to anyone.', 'ऐप आपका लॉगिन PIN मांग रहा है। अभ्यास के लिए 1, 2, 3, 4 दबाइए। असली PIN किसी को कभी न बताइए।', 'ആപ്പ് നിങ്ങളുടെ ലോഗിൻ PIN ചോദിക്കുന്നു. പരിശീലനത്തിന് 1, 2, 3, 4 അമർത്തൂ. യഥാർത്ഥ PIN ആരോടും പറയരുത്.'), tr('Press the glowing number.', 'चमकता हुआ नंबर दबाइए।', 'തിളങ്ങുന്ന നമ്പർ അമർത്തൂ.')),
      tap('account', 'account', { skin: IC, blocks: [{ t: 'bar', tone: 'brand', title: 'iMobile' }, { t: 'text', text: 'Good afternoon, Kamla', tone: 'big' }, { t: 'cards', title: 'Your accounts', items: [{ id: 'account', e: '🏦', title: 'Savings Account', sub: 'XXXX 3307', price: 'Tap to open' }] }, { t: 'grid', items: [{ e: '💸', label: 'Pay' }, { e: '🧾', label: 'Bills' }, { e: '💳', label: 'Cards' }, { e: '📈', label: 'Invest' }] }] },
        tr('You are inside. Tap your savings account.', 'आप अंदर आ गए। अपना बचत खाता दबाइए।', 'നിങ്ങൾ അകത്ത് എത്തി. നിങ്ങളുടെ സേവിങ്സ് അക്കൗണ്ട് അമർത്തൂ.'), tr('Tap the card that says Savings Account.', "'Savings Account' लिखा कार्ड दबाइए।", "'Savings Account' എന്ന് എഴുതിയ കാർഡ് അമർത്തൂ.")),
      tap('transactions', 'tx', { skin: IC, blocks: [{ t: 'bar', tone: 'brand', title: 'Savings Account', back: true }, { t: 'hero', e: '💰', title: '₹ 31,420.50', sub: 'Available balance' }, { t: 'buttons', row: true, items: [{ id: 'tx', label: 'Transactions' }, { id: 'stmt', label: 'Statement', tone: 'ghost' }] }] },
        tr("Here is your balance. Tap 'Transactions' to see what was paid and received.", "यह आपका बैलेंस है। क्या दिया और क्या मिला, देखने के लिए 'Transactions' दबाइए।", "ഇതാണ് നിങ്ങളുടെ ബാലൻസ്. എന്ത് അടച്ചു, എന്ത് കിട്ടി എന്ന് കാണാൻ 'Transactions' അമർത്തൂ."), tr("Tap the first button, 'Transactions'.", "पहला बटन 'Transactions' दबाइए।", "ആദ്യത്തെ ബട്ടൺ 'Transactions' അമർത്തൂ.")),
      quiz('unknown', { skin: IC, blocks: [{ t: 'bar', tone: 'brand', title: 'Transactions', back: true }, { t: 'rows', items: [{ e: '⬆️', title: 'Sunrise General Store', sub: 'Today', right: '- ₹ 50', noChev: true }, { e: '⬆️', title: 'Quick Win Casino', sub: 'Yesterday, 11:42 PM', right: '- ₹ 4,999', noChev: true, bg: '#fce8e6' }, { e: '⬇️', title: 'Pension credit', sub: '1 Oct', right: '+ ₹ 18,000', noChev: true }] }] },
        tr("Look at these transactions. One is 4,999 rupees to 'Quick Win Casino', and you never paid it. What do you do?", "इन लेन-देन को देखिए। एक 'Quick Win Casino' को 4,999 रुपये का है, जो आपने कभी नहीं दिया। आप क्या करेंगे?", "ഈ ഇടപാടുകൾ നോക്കൂ. ഒന്ന് 'Quick Win Casino'-ക്ക് 4,999 രൂപയാണ്, നിങ്ങൾ ഒരിക്കലും അടച്ചിട്ടില്ല. നിങ്ങൾ എന്ത് ചെയ്യും?"),
        [opt(tr('Ignore it, it is a small amount', 'छोड़ दूँ, रकम छोटी है', 'വിടും, ചെറിയ തുകയാണ്'), false, tr('No! A payment you did not make is a warning. Someone may be using your account.', 'नहीं! जो भुगतान आपने नहीं किया, वो चेतावनी है। कोई आपका खाता इस्तेमाल कर रहा हो सकता है।', 'വേണ്ട! നിങ്ങൾ ചെയ്യാത്ത പേയ്മെന്റ് ഒരു മുന്നറിയിപ്പാണ്. ആരോ നിങ്ങളുടെ അക്കൗണ്ട് ഉപയോഗിക്കുന്നുണ്ടാകാം.')), opt(tr('Call my bank at once, on the number printed on my card', 'तुरंत बैंक को फ़ोन करूँ, कार्ड पर छपे नंबर पर', 'ഉടനെ കാർഡിൽ അച്ചടിച്ച നമ്പറിൽ ബാങ്കിനെ വിളിക്കും'), true, tr('Right! Call the number printed on your card or passbook, not a number from a message. Tell your family too.', 'सही! कार्ड या पासबुक पर छपे नंबर पर फ़ोन कीजिए, किसी संदेश वाले नंबर पर नहीं। परिवार को भी बताइए।', 'ശരി! കാർഡിലോ പാസ്ബുക്കിലോ അച്ചടിച്ച നമ്പറിൽ വിളിക്കൂ, സന്ദേശത്തിലെ നമ്പറിൽ അല്ല. വീട്ടുകാരോടും പറയൂ.'))]),
    ],
  },

  'blinkit-order': {
    id: 'blinkit-order',
    icon: 'bag',
    emoji: '🥛',
    ...of('blinkit', 'Blinkit'),
    minutes: 4,
    title: tr('Order milk and bread on Blinkit', 'Blinkit पर दूध और ब्रेड मंगाएं', 'Blinkit-ൽ പാലും ബ്രഡും ഓർഡർ ചെയ്യാം'),
    takeaways: fix(
      ["Search, then tap 'ADD' next to the item", "Open the cart and read every charge", "Choose 'Cash on Delivery' to pay when it comes"],
      ["खोजें, फिर चीज़ के बगल में 'ADD' दबाएं", 'कार्ट खोलकर हर शुल्क पढ़ें', "आने पर पैसे देने के लिए 'Cash on Delivery' चुनें"],
      ["തിരഞ്ഞ്, സാധനത്തിന് അടുത്തുള്ള 'ADD' അമർത്തുക", 'കാർട്ട് തുറന്ന് എല്ലാ ചാർജുകളും വായിക്കുക', "വരുമ്പോൾ പണം അടയ്ക്കാൻ 'Cash on Delivery' തിരഞ്ഞെടുക്കുക"]
    ),
    share: tr('I learned to order on Blinkit with Folks! 🥛', 'मैंने Folks से Blinkit पर ऑर्डर करना सीखा! 🥛', 'ഞാൻ Folks കൊണ്ട് Blinkit-ൽ ഓർഡർ ചെയ്യാൻ പഠിച്ചു! 🥛'),
    realTry: tr('Next time you run out of milk, order it on your real Blinkit, and read the bill before you place the order.', 'अगली बार दूध खत्म हो, तो अपने असली Blinkit से मंगाइए, और ऑर्डर देने से पहले बिल पढ़िए।', 'അടുത്ത തവണ പാൽ തീർന്നാൽ നിങ്ങളുടെ Blinkit-ൽ ഓർഡർ ചെയ്യൂ, ഓർഡർ ചെയ്യുന്നതിന് മുമ്പ് ബിൽ വായിക്കൂ.'),
    steps: [
      intro(tr("Today we'll order milk and bread on Blinkit, and pay cash when it comes. This is only practice. Nothing will come.", 'आज हम Blinkit पर दूध और ब्रेड मंगाएंगे, और आने पर नकद देंगे। यह सिर्फ़ अभ्यास है। कुछ भी नहीं आएगा।', 'ഇന്ന് Blinkit-ൽ പാലും ബ്രഡും ഓർഡർ ചെയ്യാം, വരുമ്പോൾ പണമായി കൊടുക്കാം. ഇത് പരിശീലനം മാത്രം. ഒന്നും വരില്ല.')),
      tap('search', 'search', { skin: BL, blocks: [{ t: 'text', text: 'Delivery in 10 minutes', tone: 'big' }, { t: 'text', text: 'Home · Gate 2, Green Park' }, { t: 'search', id: 'search', ph: "Search 'milk'" }, { t: 'grid', items: [{ e: '🥛', label: 'Dairy' }, { e: '🍞', label: 'Bread' }, { e: '🥬', label: 'Vegetables' }, { e: '🍌', label: 'Fruits' }] }] },
        tr('This is Blinkit. Tap the search box.', 'यह Blinkit है। सर्च बॉक्स दबाइए।', 'ഇത് Blinkit ആണ്. സെർച്ച് ബോക്സ് അമർത്തൂ.'), tr('Tap the white box that says Search milk.', "'Search milk' लिखा सफ़ेद डिब्बा दबाइए।", "'Search milk' എന്ന് എഴുതിയ വെളുത്ത പെട്ടി അമർത്തൂ.")),
      tap('add-milk', 'add-milk', { skin: BL, blocks: [{ t: 'search', text: 'milk' }, { t: 'cards', items: [{ e: '🥛', title: 'Toned Milk, 500 ml', sub: '10 mins', price: '₹ 29', tag: 'ADD', id: 'add-milk' }, { e: '🥛', title: 'Full Cream Milk, 1 litre', sub: '10 mins', price: '₹ 68' }, { e: '🍞', title: 'Brown Bread', sub: '10 mins', price: '₹ 45' }] }] },
        tr("We typed 'milk' for you. Next to the milk, tap the green 'ADD' button.", "हमने 'milk' लिख दिया है। दूध के बगल में हरा 'ADD' बटन दबाइए।", "ഞങ്ങൾ 'milk' എഴുതിയിട്ടുണ്ട്. പാലിന് അടുത്തുള്ള പച്ച 'ADD' ബട്ടൺ അമർത്തൂ."), tr("Tap 'ADD' on the first one, the milk for 29 rupees.", "पहले वाले, 29 रुपये के दूध, पर 'ADD' दबाइए।", "ആദ്യത്തേതിൽ, 29 രൂപയുടെ പാലിൽ, 'ADD' അമർത്തൂ.")),
      tap('add-bread', 'add-bread', { skin: BL, blocks: [{ t: 'search', text: 'milk' }, { t: 'cards', items: [{ e: '🥛', title: 'Toned Milk, 500 ml', sub: 'Added · 1', price: '₹ 29', tone: 'good' }, { e: '🥛', title: 'Full Cream Milk, 1 litre', sub: '10 mins', price: '₹ 68' }, { e: '🍞', title: 'Brown Bread', sub: '10 mins', price: '₹ 45', tag: 'ADD', id: 'add-bread' }] }] },
        tr('The milk is added. Now add the bread. Tap the green ADD next to Brown Bread.', 'दूध जुड़ गया। अब ब्रेड जोड़िए। Brown Bread के बगल में हरा ADD दबाइए।', 'പാൽ ചേർത്തു. ഇനി ബ്രഡ് ചേർക്കാം. Brown Bread-ന് അടുത്തുള്ള പച്ച ADD അമർത്തൂ.'), tr('Tap ADD on the last one, Brown Bread.', 'आख़िरी वाले, Brown Bread, पर ADD दबाइए।', 'അവസാനത്തേതിൽ, Brown Bread-ൽ, ADD അമർത്തൂ.')),
      tap('cart', 'cart-bar', { skin: BL, blocks: [{ t: 'search', text: 'milk' }, { t: 'cards', items: [{ e: '🥛', title: 'Toned Milk, 500 ml', sub: 'Added · 1', price: '₹ 29', tone: 'good' }, { e: '🍞', title: 'Brown Bread', sub: 'Added · 1', price: '₹ 45', tone: 'good' }] }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'cart-bar', label: '2 items · ₹ 74   View cart' }] }] },
        tr("Both are added. Tap the green bar at the bottom, 'View cart'.", "दोनों जुड़ गए। नीचे हरी पट्टी 'View cart' दबाइए।", "രണ്ടും ചേർത്തു. താഴെ പച്ച ബാർ 'View cart' അമർത്തൂ."), tr('Tap the green bar at the bottom.', 'नीचे हरी पट्टी दबाइए।', 'താഴെ പച്ച ബാർ അമർത്തൂ.')),
      quiz('total', { skin: BL, blocks: [{ t: 'bar', title: 'Cart', back: true }, { t: 'rows', title: 'Bill details', items: [{ e: '🧺', title: 'Items total', right: '₹ 74', noChev: true }, { e: '🚚', title: 'Delivery charge', right: '₹ 25', noChev: true }, { e: '👜', title: 'Handling charge', right: '₹ 4', noChev: true }, { e: '💰', title: 'Grand total', right: '₹ 103', noChev: true }] }] },
        tr('Read the bill. The items are 74 rupees. Delivery is 25 and handling is 4. How much will you pay in all?', 'बिल पढ़िए। सामान 74 रुपये का है। डिलीवरी 25 और हैंडलिंग 4। कुल कितने पैसे देंगे?', 'ബിൽ വായിക്കൂ. സാധനങ്ങൾ 74 രൂപ. ഡെലിവറി 25, ഹാൻഡ്ലിങ് 4. ആകെ എത്ര അടയ്ക്കണം?'),
        [opt(tr('₹ 74', '₹ 74', '₹ 74'), false, tr('No. Delivery and handling are added. 74 + 25 + 4 is 103.', 'नहीं। डिलीवरी और हैंडलिंग भी जुड़ेंगे। 74 + 25 + 4 यानी 103।', 'അല്ല. ഡെലിവറിയും ഹാൻഡ്ലിങ്ങും കൂടി ചേർക്കണം. 74 + 25 + 4 എന്നാൽ 103.')), opt(tr('₹ 103', '₹ 103', '₹ 103'), true, tr('Right! Small items cost more with delivery. It is good to read the bill, and to order more together.', 'सही! छोटे सामान डिलीवरी के साथ महंगे पड़ते हैं। बिल पढ़ना अच्छी आदत है, और कई चीज़ें साथ मंगाना भी।', 'ശരി! ചെറിയ സാധനങ്ങൾക്ക് ഡെലിവറി കൂടി ചേരുമ്പോൾ വില കൂടും. ബിൽ വായിക്കുന്നത് നല്ല ശീലമാണ്, കൂടുതൽ സാധനങ്ങൾ ഒരുമിച്ച് വാങ്ങുന്നതും.'))]),
      tap('pay', 'cod', { skin: BL, blocks: [{ t: 'bar', title: 'Payment', back: true }, { t: 'rows', items: [{ id: 'upi', e: '📲', title: 'UPI', sub: 'Google Pay, PhonePe, Paytm' }, { id: 'card', e: '💳', title: 'Cards' }, { id: 'cod', e: '💵', title: 'Cash on Delivery', sub: 'Pay ₹ 103 when it arrives' }] }] },
        tr("How do you want to pay? Tap 'Cash on Delivery'.", "पैसे कैसे देंगे? 'Cash on Delivery' दबाइए।", "എങ്ങനെ പണം അടയ്ക്കും? 'Cash on Delivery' അമർത്തൂ."), tr('Tap the third line.', 'तीसरी लाइन दबाइए।', 'മൂന്നാമത്തെ വരി അമർത്തൂ.')),
      tap('place', 'place', { skin: BL, blocks: [{ t: 'bar', title: 'Confirm', back: true }, { t: 'hero', e: '🛵', title: 'Arriving in 10 minutes', sub: 'Pay ₹ 103 in cash' }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'place', label: 'Place order' }] }] },
        tr("Tap the green 'Place order' button.", "हरा 'Place order' बटन दबाइए।", "പച്ച 'Place order' ബട്ടൺ അമർത്തൂ."), tr('Tap the green button at the bottom.', 'नीचे हरा बटन दबाइए।', 'താഴെ പച്ച ബട്ടൺ അമർത്തൂ.')),
      note('placed', { skin: BL, blocks: [{ t: 'bar', title: 'Order placed', back: true }, { t: 'hero', tone: 'good', e: '🛵', title: 'On the way', sub: 'Arriving in 10 minutes' }] },
        tr('Your order is placed. The delivery person will come to your gate. Keep exactly 103 rupees ready, in cash.', 'आपका ऑर्डर हो गया। डिलीवरी वाला आपके गेट पर आएगा। ठीक 103 रुपये नकद तैयार रखिए।', 'നിങ്ങളുടെ ഓർഡർ ആയി. ഡെലിവറി ചെയ്യുന്നയാൾ നിങ്ങളുടെ ഗേറ്റിൽ വരും. കൃത്യം 103 രൂപ പണമായി തയ്യാറാക്കി വെക്കൂ.')),
    ],
  },

  'zepto-fruits': {
    id: 'zepto-fruits',
    icon: 'bag',
    emoji: '🍌',
    ...of('zepto', 'Zepto'),
    minutes: 3,
    title: tr('Order fruits on Zepto', 'Zepto पर फल मंगाएं', 'Zepto-ൽ പഴങ്ങൾ ഓർഡർ ചെയ്യാം'),
    takeaways: fix(
      ["Tap '+' to add more, '-' to take one out", 'Check the weight and the price', "Read the bill, then place the order"],
      ["ज़्यादा के लिए '+', कम के लिए '-' दबाएं", 'वज़न और कीमत देखें', 'बिल पढ़ें, फिर ऑर्डर दें'],
      ["കൂടുതലിന് '+', കുറയ്ക്കാൻ '-' അമർത്തുക", 'തൂക്കവും വിലയും നോക്കുക', 'ബിൽ വായിച്ച് ഓർഡർ ചെയ്യുക']
    ),
    share: tr('I learned to order fruits on Zepto with Folks! 🍌', 'मैंने Folks से Zepto पर फल मंगाना सीखा! 🍌', 'ഞാൻ Folks കൊണ്ട് Zepto-ൽ പഴങ്ങൾ ഓർഡർ ചെയ്യാൻ പഠിച്ചു! 🍌'),
    realTry: tr('Order a dozen bananas on your real Zepto, and check the weight and the total first.', 'अपने असली Zepto से एक दर्जन केले मंगाइए, और पहले वज़न और कुल रकम देखिए।', 'നിങ്ങളുടെ Zepto-ൽ ഒരു ഡസൻ വാഴപ്പഴം ഓർഡർ ചെയ്യൂ, ആദ്യം തൂക്കവും ആകെ തുകയും നോക്കൂ.'),
    steps: [
      intro(tr("Today we'll order a dozen bananas on Zepto, and then pay by UPI. This is only practice. No fruit will come.", 'आज हम Zepto पर एक दर्जन केले मंगाएंगे, और फिर UPI से पैसे देंगे। यह सिर्फ़ अभ्यास है। कोई फल नहीं आएगा।', 'ഇന്ന് Zepto-ൽ ഒരു ഡസൻ വാഴപ്പഴം ഓർഡർ ചെയ്യാം, പിന്നെ UPI കൊണ്ട് പണം അടയ്ക്കാം. ഇത് പരിശീലനം മാത്രം. പഴം വരില്ല.')),
      tap('search', 'search', { skin: ZE, blocks: [{ t: 'bar', tone: 'brand', title: 'zepto' }, { t: 'search', id: 'search', ph: "Search 'banana'" }, { t: 'grid', items: [{ e: '🍌', label: 'Fruits' }, { e: '🥬', label: 'Vegetables' }, { e: '🥛', label: 'Dairy' }, { e: '🍪', label: 'Snacks' }] }] },
        tr('This is Zepto. Tap the search box.', 'यह Zepto है। सर्च बॉक्स दबाइए।', 'ഇത് Zepto ആണ്. സെർച്ച് ബോക്സ് അമർത്തൂ.'), tr('Tap the white box at the top.', 'ऊपर सफ़ेद डिब्बा दबाइए।', 'മുകളിലെ വെളുത്ത പെട്ടി അമർത്തൂ.')),
      tap('add', 'add', { skin: ZE, blocks: [{ t: 'search', text: 'banana' }, { t: 'cards', items: [{ e: '🍌', title: 'Banana, 12 pieces', sub: 'About 1 kg · 8 mins', price: '₹ 60', tag: 'ADD', id: 'add' }, { e: '🍎', title: 'Apple, 4 pieces', sub: 'About 600 g', price: '₹ 120' }] }] },
        tr("We typed 'banana'. Tap 'ADD' next to the bananas.", "हमने 'banana' लिख दिया है। केले के बगल में 'ADD' दबाइए।", "ഞങ്ങൾ 'banana' എഴുതിയിട്ടുണ്ട്. വാഴപ്പഴത്തിന് അടുത്തുള്ള 'ADD' അമർത്തൂ."), tr('Tap ADD on the first one, the bananas.', 'पहले वाले, केले, पर ADD दबाइए।', 'ആദ്യത്തേതിൽ, വാഴപ്പഴത്തിൽ, ADD അമർത്തൂ.')),
      tap('plus', 'plus', { skin: ZE, blocks: [{ t: 'search', text: 'banana' }, { t: 'cards', items: [{ e: '🍌', title: 'Banana, 12 pieces', sub: 'In cart: 1', price: '₹ 60', tone: 'good' }] }, { t: 'buttons', row: true, items: [{ id: 'minus', label: '-', tone: 'soft' }, { id: 'plus', label: '+  Add one more' }] }] },
        tr('You have one pack. Your family wants two, so tap the plus button once.', 'आपके पास एक पैक है। परिवार को दो चाहिए, इसलिए प्लस बटन एक बार दबाइए।', 'നിങ്ങളുടെ കയ്യിൽ ഒരു പാക്ക് ഉണ്ട്. വീട്ടുകാർക്ക് രണ്ട് വേണം, അതുകൊണ്ട് പ്ലസ് ബട്ടൺ ഒരു തവണ അമർത്തൂ.'), tr("Tap the purple '+' button.", "बैंगनी '+' बटन दबाइए।", "പർപ്പിൾ '+' ബട്ടൺ അമർത്തൂ.")),
      tap('cart', 'cart-bar', { skin: ZE, blocks: [{ t: 'search', text: 'banana' }, { t: 'cards', items: [{ e: '🍌', title: 'Banana, 12 pieces', sub: 'In cart: 2', price: '₹ 120', tone: 'good' }] }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'cart-bar', label: '2 items · ₹ 120   Go to cart' }] }] },
        tr("Two packs are in the cart. Tap the purple bar at the bottom.", "कार्ट में दो पैक हैं। नीचे बैंगनी पट्टी दबाइए।", "കാർട്ടിൽ രണ്ട് പാക്ക് ഉണ്ട്. താഴെ പർപ്പിൾ ബാർ അമർത്തൂ."), tr('Tap the purple bar at the bottom.', 'नीचे बैंगनी पट्टी दबाइए।', 'താഴെ പർപ്പിൾ ബാർ അമർത്തൂ.')),
      quiz('bill', { skin: ZE, blocks: [{ t: 'bar', tone: 'brand', title: 'Cart', back: true }, { t: 'rows', title: 'Bill', items: [{ e: '🍌', title: '2 packs of bananas', right: '₹ 120', noChev: true }, { e: '🚚', title: 'Delivery', right: 'Free', noChev: true }, { e: '👜', title: 'Handling', right: '₹ 5', noChev: true }, { e: '💰', title: 'To pay', right: '₹ 125', noChev: true }] }] },
        tr('The bananas are 120 rupees. Delivery is free and handling is 5. What is the total?', 'केले 120 रुपये के हैं। डिलीवरी मुफ़्त है और हैंडलिंग 5। कुल कितना हुआ?', 'വാഴപ്പഴം 120 രൂപ. ഡെലിവറി സൗജന്യം, ഹാൻഡ്ലിങ് 5. ആകെ എത്ര?'),
        [opt(tr('₹ 125', '₹ 125', '₹ 125'), true, tr('Right! 120 and 5 is 125.', 'सही! 120 और 5 मिलकर 125।', 'ശരി! 120 ഉം 5 ഉം ചേർന്നാൽ 125.')), opt(tr('₹ 120', '₹ 120', '₹ 120'), false, tr('Almost. Do not forget the 5 rupees for handling. The total is 125.', 'लगभग। हैंडलिंग के 5 रुपये मत भूलिए। कुल 125 है।', 'ഏതാണ്ട്. ഹാൻഡ്ലിങ്ങിന്റെ 5 രൂപ മറക്കരുത്. ആകെ 125 ആണ്.'))]),
      tap('upi', 'upi', { skin: ZE, blocks: [{ t: 'bar', tone: 'brand', title: 'Pay', back: true }, { t: 'rows', items: [{ id: 'upi', e: '📲', title: 'Pay with UPI', sub: 'Google Pay, PhonePe, Paytm' }, { e: '💳', title: 'Card' }, { e: '💵', title: 'Cash on Delivery', sub: 'Not available for this order' }] }] },
        tr("Tap 'Pay with UPI'. Your UPI app will open, and you enter your PIN there. Never type your PIN inside Zepto.", "'Pay with UPI' दबाइए। आपका UPI ऐप खुलेगा, और PIN वहीं डालना है। Zepto के अंदर PIN कभी न डालें।", "'Pay with UPI' അമർത്തൂ. നിങ്ങളുടെ UPI ആപ്പ് തുറക്കും, PIN അവിടെയാണ് അടിക്കേണ്ടത്. Zepto-യ്ക്ക് ഉള്ളിൽ ഒരിക്കലും PIN അടിക്കരുത്."), tr('Tap the first line.', 'पहली लाइन दबाइए।', 'ആദ്യത്തെ വരി അമർത്തൂ.')),
      note('done', { skin: ZE, blocks: [{ t: 'bar', tone: 'brand', title: 'Order placed', back: true }, { t: 'hero', tone: 'good', e: '✅', title: 'Payment done', sub: 'Your fruits come in 8 minutes' }] },
        tr('The payment is done, and the order is placed. Your fruits come in about eight minutes.', 'भुगतान हो गया और ऑर्डर लग गया। आपके फल करीब आठ मिनट में आएंगे।', 'പേയ്മെന്റ് കഴിഞ്ഞു, ഓർഡർ ആയി. നിങ്ങളുടെ പഴങ്ങൾ ഏകദേശം എട്ട് മിനിറ്റിൽ വരും.')),
    ],
  },
};

export const APP2_KEYWORDS = {
  'yono-balance': [['yono', 5], ['योनो', 5], ['യോനോ', 5], ['sbi', 4], ['एसबीआई', 4], ['balance', 4], ['बैलेंस', 4], ['ബാലൻസ്', 4], ['bank', 2], ['बैंक', 2], ['ബാങ്ക്', 2], ['mpin', 3]],
  'icici-transactions': [['icici', 5], ['आईसीआईसीआई', 5], ['ഐസിഐസിഐ', 5], ['imobile', 5], ['transaction', 4], ['लेन-देन', 4], ['ഇടപാട്', 4], ['statement', 3], ['स्टेटमेंट', 3], ['passbook', 2], ['पासबुक', 2]],
  'blinkit-order': [['blinkit', 5], ['ब्लिंकिट', 5], ['ബ്ലിങ്കിറ്റ്', 5], ['grocery', 4], ['ग्रोसरी', 4], ['milk', 3], ['दूध', 3], ['പാൽ', 3], ['bread', 2], ['ब्रेड', 2], ['quick delivery', 3]],
  'zepto-fruits': [['zepto', 5], ['ज़ेप्टो', 5], ['സെപ്റ്റോ', 5], ['fruit', 4], ['फल', 4], ['പഴം', 4], ['banana', 3], ['केले', 3], ['vegetable', 2], ['सब्ज़ी', 2], ['सब्जी', 2]],
};
