// IRCTC, Paytm and Google Maps lessons. Screens are drawn from blocks (see components/screens/Gen.js).
import { tr, intro, tap, note, quiz, opt, input } from './guide';

const IR = { brand: '#213d77', ink: '#ffffff', bg: '#ffffff', soft: '#eef1f8' };
const PT = { brand: '#00b9f1', ink: '#ffffff', bg: '#f5fbff', soft: '#e3f4fc', text: '#002e6e' };
const MP = { brand: '#1a73e8', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f4' };

const fix = (en, hi, ml) => ({ en, hi, ml });
const of = (app, appName) => ({ app, appName });

const irBar = (title = 'IRCTC Rail Connect', back = false) => ({ t: 'bar', tone: 'brand', title, back });
const irSearch = (extra = {}) => ({ skin: IR, blocks: [irBar('Book ticket', true), { t: 'field', id: 'from', label: 'From', value: 'Kochi (ERS)' }, { t: 'field', id: 'to', label: 'To', value: extra.to || '', ph: 'Choose station' }, { t: 'field', label: 'Date', value: 'Tomorrow, 24 Oct' }, { t: 'field', label: 'Class', value: 'Sleeper (SL)' }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'search', label: 'Search trains' }] }] });

export const APP3_LESSONS = {
  'irctc-ticket': {
    id: 'irctc-ticket',
    icon: 'list',
    emoji: '🚆',
    ...of('irctc', 'IRCTC Rail Connect'),
    minutes: 5,
    title: tr('Book a train ticket on IRCTC', 'IRCTC पर ट्रेन टिकट बुक करें', 'IRCTC-യിൽ ട്രെയിൻ ടിക്കറ്റ് ബുക്ക് ചെയ്യാം'),
    takeaways: fix(
      ['Choose where from, where to and the date', 'Pick the lower berth if climbing is hard', 'Keep the PNR number from the ticket'],
      ['कहाँ से, कहाँ तक और तारीख़ चुनें', 'चढ़ना मुश्किल हो, तो नीचे वाली बर्थ चुनें', 'टिकट का PNR नंबर संभालकर रखें'],
      ['എവിടെ നിന്ന്, എവിടേക്ക്, തീയതി എന്നിവ തിരഞ്ഞെടുക്കുക', 'കയറാൻ ബുദ്ധിമുട്ടാണെങ്കിൽ താഴത്തെ ബർത്ത് തിരഞ്ഞെടുക്കുക', 'ടിക്കറ്റിലെ PNR നമ്പർ സൂക്ഷിച്ചുവെക്കുക']
    ),
    share: tr('I learned to book a train ticket with Nook! 🚆', 'मैंने Nook से ट्रेन टिकट बुक करना सीखा! 🚆', 'ഞാൻ Nook കൊണ്ട് ട്രെയിൻ ടിക്കറ്റ് ബുക്ക് ചെയ്യാൻ പഠിച്ചു! 🚆'),
    realTry: tr('Next time you travel, search a train on your real IRCTC app first, before you book.', 'अगली बार यात्रा करें, तो पहले अपने असली IRCTC ऐप में ट्रेन खोजिए, और बुकिंग से पहले सारी जानकारी जाँच लीजिए।', 'അടുത്ത യാത്രയ്ക്ക് മുമ്പ് നിങ്ങളുടെ IRCTC ആപ്പിൽ ട്രെയിൻ തിരയൂ, ബുക്ക് ചെയ്യുന്നതിന് മുമ്പ് എല്ലാ വിവരങ്ങളും പരിശോധിക്കൂ.'),
    steps: [
      intro(tr("Today we'll book a train ticket from Kochi to Chennai on IRCTC. This is only practice. No ticket will be booked and no money is used.", 'आज हम IRCTC पर कोच्चि से चेन्नई का ट्रेन टिकट बुक करेंगे। यह सिर्फ़ अभ्यास है। कोई टिकट नहीं कटेगा, कोई पैसा नहीं लगेगा।', 'ഇന്ന് IRCTC-യിൽ കൊച്ചിയിൽ നിന്ന് ചെന്നൈയിലേക്ക് ട്രെയിൻ ടിക്കറ്റ് ബുക്ക് ചെയ്യാം. ഇത് പരിശീലനം മാത്രം. ടിക്കറ്റ് ബുക്ക് ആകില്ല, പണം പോകില്ല.')),
      tap('login', 'login', { skin: IR, blocks: [irBar(), { t: 'hero', e: '🚆', title: 'Welcome', sub: 'Login to book tickets' }, { t: 'field', label: 'User ID', value: 'kamla_devi' }, { t: 'field', label: 'Password', value: '••••••••' }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'login', label: 'Login' }] }] },
        tr("IRCTC needs you to log in first. We filled the user ID and password for practice. Tap 'Login'.", "IRCTC में पहले लॉगिन करना होता है। अभ्यास के लिए हमने यूज़र आईडी और पासवर्ड भर दिया है। 'Login' दबाइए।", "IRCTC-യിൽ ആദ്യം ലോഗിൻ ചെയ്യണം. പരിശീലനത്തിന് യൂസർ ഐഡിയും പാസ്‌വേഡും ഞങ്ങൾ നിറച്ചിട്ടുണ്ട്. 'Login' അമർത്തൂ."), tr('Tap the blue Login button.', 'नीला Login बटन दबाइए।', 'നീല Login ബട്ടൺ അമർത്തൂ.')),
      tap('to', 'to', irSearch(), tr("Kochi is already filled in as the starting station. Now tap the 'To' box to choose where you are going.", "शुरुआत का स्टेशन कोच्चि पहले से भरा है। अब कहाँ जाना है, यह चुनने के लिए 'To' वाला डिब्बा दबाइए।", "തുടങ്ങുന്ന സ്റ്റേഷൻ കൊച്ചി നേരത്തെ നിറച്ചിട്ടുണ്ട്. ഇനി എവിടേക്കാണ് പോകേണ്ടത് എന്ന് തിരഞ്ഞെടുക്കാൻ 'To' പെട്ടി അമർത്തൂ."), tr("Tap the box that says 'To'.", "'To' लिखा डिब्बा दबाइए।", "'To' എന്ന് എഴുതിയ പെട്ടി അമർത്തൂ.")),
      tap('station', 'mas', { skin: IR, blocks: [irBar('Choose station', true), { t: 'search', text: 'chennai' }, { t: 'rows', items: [{ id: 'mas', e: '🚉', title: 'CHENNAI CENTRAL (MAS)', sub: 'Chennai' }, { e: '🚉', title: 'CHENNAI EGMORE (MS)', sub: 'Chennai' }, { e: '🚉', title: 'CHENGALPATTU (CGL)', sub: 'Near Chennai' }] }] },
        tr("We typed 'chennai'. Tap 'Chennai Central', the first one.", "हमने 'chennai' लिख दिया है। 'Chennai Central', पहला वाला, दबाइए।", "ഞങ്ങൾ 'chennai' എഴുതിയിട്ടുണ്ട്. 'Chennai Central', ആദ്യത്തേത്, അമർത്തൂ."), tr('Tap the first line.', 'पहली लाइन दबाइए।', 'ആദ്യത്തെ വരി അമർത്തൂ.')),
      tap('search', 'search', irSearch({ to: 'CHENNAI CENTRAL (MAS)' }), tr('Everything is filled: from Kochi, to Chennai Central, tomorrow, in Sleeper class. Tap the blue button, Search trains.', 'सब भर गया: कोच्चि से, चेन्नई सेंट्रल तक, कल, स्लीपर क्लास। नीला बटन, Search trains, दबाइए।', 'എല്ലാം നിറഞ്ഞു: കൊച്ചിയിൽ നിന്ന്, ചെന്നൈ സെൻട്രലിലേക്ക്, നാളെ, സ്ലീപ്പർ ക്ലാസ്. നീല ബട്ടൺ, Search trains, അമർത്തൂ.'), tr('Tap the blue button at the bottom.', 'नीचे नीला बटन दबाइए।', 'താഴെ നീല ബട്ടൺ അമർത്തൂ.')),
      tap('train', 'train1', { skin: IR, blocks: [irBar('Kochi to Chennai', true), { t: 'cards', title: '3 trains found', items: [{ id: 'train1', e: '🚆', title: 'Chennai Mail 12624', sub: 'Leaves 6:40 PM · Arrives 5:10 AM', price: 'Sleeper ₹ 520', tag: 'AVAILABLE 23', tone: 'good' }, { e: '🚆', title: 'Alleppey Express 22640', sub: 'Leaves 9:05 PM · Arrives 7:30 AM', price: 'Sleeper ₹ 520', tag: 'WL 12' }, { e: '🚆', title: 'Kerala Express 12626', sub: 'Leaves 10:30 AM · Arrives 11:50 PM', price: 'Sleeper ₹ 495', tag: 'RAC 4' }] }] },
        tr("These are the trains. Look at the green word 'AVAILABLE', it means there are seats. 'WL' means waiting, no seat yet. Tap Chennai Mail, the first one.", "ये ट्रेनें हैं। हरे रंग का 'AVAILABLE' लिखा हो, तो सीट है। 'WL' का मतलब वेटिंग, यानी अभी सीट नहीं। पहली, Chennai Mail, दबाइए।", "ഇവയാണ് ട്രെയിനുകൾ. പച്ച നിറത്തിൽ 'AVAILABLE' എന്ന് കണ്ടാൽ സീറ്റ് ഉണ്ട്. 'WL' എന്നാൽ വെയ്റ്റിങ്, സീറ്റ് ഇല്ല. ആദ്യത്തേത്, Chennai Mail, അമർത്തൂ."), tr("Tap the first train, the one that says AVAILABLE.", "पहली ट्रेन, जिस पर AVAILABLE लिखा है, दबाइए।", "ആദ്യത്തെ ട്രെയിൻ, AVAILABLE എന്ന് എഴുതിയത്, അമർത്തൂ.")),
      tap('book', 'book', { skin: IR, blocks: [irBar('Chennai Mail 12624', true), { t: 'hero', e: '🚆', title: 'Sleeper (SL)', sub: 'Tomorrow, 24 Oct · AVAILABLE 23 · ₹ 520' }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'book', label: 'Book now' }] }] },
        tr("Seats are available in Sleeper class, for 520 rupees. Tap 'Book now'.", "स्लीपर क्लास में 520 रुपये में सीट मिल रही है। 'Book now' दबाइए।", "സ്ലീപ്പർ ക്ലാസിൽ 520 രൂപയ്ക്ക് സീറ്റ് ഉണ്ട്. 'Book now' അമർത്തൂ."), tr('Tap the blue Book now button.', 'नीला Book now बटन दबाइए।', 'നീല Book now ബട്ടൺ അമർത്തൂ.')),
      tap('berth', 'lower', { skin: IR, blocks: [irBar('Passenger details', true), { t: 'field', label: 'Passenger', value: 'Kamala Nair, 63, Female' }, { t: 'text', text: 'Berth preference' }, { t: 'chips', items: [{ id: 'lower', label: 'Lower' }, { label: 'Middle' }, { label: 'Upper' }, { label: 'No preference' }] }, { t: 'text', text: 'A lower berth is easy to reach. Senior citizens are often given lower berths first.' }] },
        tr("Here are your details. For berth preference, tap 'Lower'. It is easier, with no climbing.", "यह आपकी जानकारी है। बर्थ पसंद के लिए 'Lower' दबाइए। यह आसान है, चढ़ना नहीं पड़ता।", "ഇതാണ് നിങ്ങളുടെ വിവരങ്ങൾ. ബർത്ത് മുൻഗണനയ്ക്ക് 'Lower' അമർത്തൂ. അത് എളുപ്പമാണ്, കയറേണ്ടതില്ല."), tr("Tap 'Lower', the first one.", "पहला, 'Lower', दबाइए।", "ആദ്യത്തേത്, 'Lower', അമർത്തൂ.")),
      tap('pay', 'upi', { skin: IR, blocks: [irBar('Payment', true), { t: 'rows', title: 'Total to pay: ₹ 540 (₹ 520 + ₹ 20 service)', items: [{ id: 'upi', e: '📲', title: 'Pay with UPI', sub: 'Google Pay, PhonePe, Paytm' }, { e: '💳', title: 'Cards' }, { e: '🏦', title: 'Net banking' }] }] },
        tr("The total is 540 rupees, with a small service charge. Tap 'Pay with UPI'. Your UPI app opens, and you enter your PIN only there.", "कुल 540 रुपये हैं, छोटे सर्विस चार्ज के साथ। 'Pay with UPI' दबाइए। आपका UPI ऐप खुलेगा, और PIN सिर्फ़ वहीं डालिए।", "ആകെ 540 രൂപ, ചെറിയ സർവീസ് ചാർജ് ഉൾപ്പെടെ. 'Pay with UPI' അമർത്തൂ. നിങ്ങളുടെ UPI ആപ്പ് തുറക്കും, PIN അവിടെ മാത്രം അടിക്കൂ."), tr('Tap the first line.', 'पहली लाइन दबाइए।', 'ആദ്യത്തെ വരി അമർത്തൂ.')),
      note('ticket', { skin: IR, blocks: [irBar('Ticket booked', false), { t: 'hero', tone: 'good', e: '🎫', title: 'CONFIRMED', sub: 'PNR 4521878899 · Coach S5 · Seat 32 · Lower' }, { t: 'text', text: 'Chennai Mail 12624 · Kochi to Chennai · Tomorrow, 6:40 PM' }] },
        tr('Your ticket is confirmed! The 10-number PNR is your ticket number. Take a screenshot, and carry an ID card when you travel.', 'आपका टिकट कन्फ़र्म हो गया! 10 अंकों का PNR आपके टिकट का नंबर है। स्क्रीनशॉट ले लीजिए, और यात्रा में पहचान पत्र साथ रखिए।', 'നിങ്ങളുടെ ടിക്കറ്റ് കൺഫേം ആയി! 10 അക്ക PNR ആണ് ടിക്കറ്റ് നമ്പർ. സ്ക്രീൻഷോട്ട് എടുക്കൂ, യാത്രയിൽ തിരിച്ചറിയൽ കാർഡ് കരുതൂ.')),
      quiz('tatkal', { skin: IR, blocks: [{ t: 'hero', e: '💬', title: 'Message on WhatsApp', sub: 'Confirmed Tatkal ticket for ₹ 2,000 extra. Click the link to pay.' }] },
        tr("A stranger sends a WhatsApp message: 'I can get you a confirmed ticket for 2,000 rupees extra. Pay on this link.' What do you do?", "कोई अनजान व्यक्ति WhatsApp पर लिखता है: 'मैं 2000 रुपये ज़्यादा में कन्फ़र्म टिकट दिला दूँगा। इस लिंक पर पैसे दीजिए।' आप क्या करेंगे?", "ഒരു അപരിചിതൻ WhatsApp-ൽ എഴുതുന്നു: 'ഞാൻ 2000 രൂപ കൂടുതൽ വാങ്ങി കൺഫേം ടിക്കറ്റ് തരാം. ഈ ലിങ്കിൽ പണം അടയ്ക്കൂ.' നിങ്ങൾ എന്ത് ചെയ്യും?"),
        [opt(tr('Pay, it saves me trouble', 'पैसे दे दूँ, झंझट बचेगी', 'അടയ്ക്കും, ബുദ്ധിമുട്ട് ഒഴിവാകും'), false, tr('No! This is a common scam. Book only on the IRCTC app or at the station counter.', 'नहीं! यह आम ठगी है। टिकट सिर्फ़ IRCTC ऐप या स्टेशन की खिड़की से लीजिए।', 'വേണ്ട! ഇത് സാധാരണ തട്ടിപ്പാണ്. IRCTC ആപ്പിൽ നിന്നോ സ്റ്റേഷൻ കൗണ്ടറിൽ നിന്നോ മാത്രം ബുക്ക് ചെയ്യൂ.')), opt(tr('Ignore it and book on the IRCTC app', 'छोड़ दूँ और IRCTC ऐप से बुक करूँ', 'അവഗണിച്ച് IRCTC ആപ്പിൽ ബുക്ക് ചെയ്യും'), true, tr('Right! Only the IRCTC app or the counter gives real tickets.', 'सही! असली टिकट सिर्फ़ IRCTC ऐप या खिड़की से मिलते हैं।', 'ശരി! യഥാർത്ഥ ടിക്കറ്റ് IRCTC ആപ്പിലോ കൗണ്ടറിലോ മാത്രമേ കിട്ടൂ.'))]),
    ],
  },

  'irctc-pnr': {
    id: 'irctc-pnr',
    icon: 'search',
    emoji: '🎫',
    ...of('irctc', 'IRCTC Rail Connect'),
    minutes: 2,
    title: tr('Check if your ticket is confirmed (PNR)', 'देखें कि टिकट कन्फ़र्म है या नहीं (PNR)', 'ടിക്കറ്റ് കൺഫേം ആയോ എന്ന് നോക്കാം (PNR)'),
    takeaways: fix(
      ["Tap 'PNR Status'", 'Type the 10-number PNR from your ticket', "'CNF' means confirmed, 'WL' means waiting"],
      ["'PNR Status' दबाएं", 'टिकट का 10 अंकों का PNR लिखें', "'CNF' यानी कन्फ़र्म, 'WL' यानी वेटिंग"],
      ["'PNR Status' അമർത്തുക", 'ടിക്കറ്റിലെ 10 അക്ക PNR അടിക്കുക', "'CNF' എന്നാൽ കൺഫേം, 'WL' എന്നാൽ വെയ്റ്റിങ്"]
    ),
    share: tr('I learned to check my train PNR with Nook! 🎫', 'मैंने Nook से ट्रेन का PNR देखना सीखा! 🎫', 'ഞാൻ Nook കൊണ്ട് ട്രെയിൻ PNR നോക്കാൻ പഠിച്ചു! 🎫'),
    realTry: tr('Before your next journey, check the PNR status of your real ticket in the IRCTC app.', 'अगली यात्रा से पहले IRCTC ऐप में अपने असली टिकट का PNR स्टेटस देखिए।', 'അടുത്ത യാത്രയ്ക്ക് മുമ്പ് IRCTC ആപ്പിൽ നിങ്ങളുടെ ടിക്കറ്റിന്റെ PNR സ്റ്റാറ്റസ് നോക്കൂ.'),
    steps: [
      intro(tr("You booked a train ticket long ago, but you are not sure it is confirmed. Today we'll check it with the PNR number. This is only practice.", 'आपने बहुत पहले ट्रेन टिकट बुक किया था, पर पक्का नहीं पता कि कन्फ़र्म है या नहीं। आज हम PNR नंबर से जांचेंगे। यह सिर्फ़ अभ्यास है।', 'നിങ്ങൾ കുറച്ച് മുമ്പ് ട്രെയിൻ ടിക്കറ്റ് ബുക്ക് ചെയ്തിരുന്നു, പക്ഷേ കൺഫേം ആയോ എന്ന് ഉറപ്പില്ല. ഇന്ന് PNR നമ്പർ കൊണ്ട് പരിശോധിക്കാം. ഇത് പരിശീലനം മാത്രം.')),
      tap('pnr-tile', 'pnr', { skin: IR, blocks: [irBar(), { t: 'grid', items: [{ e: '🎫', label: 'Book ticket' }, { id: 'pnr', e: '🔎', label: 'PNR Status' }, { e: '🚉', label: 'Train running' }, { e: '❌', label: 'Cancel' }] }] },
        tr("Tap 'PNR Status', the second button.", "'PNR Status', दूसरा बटन, दबाइए।", "'PNR Status', രണ്ടാമത്തെ ബട്ടൺ, അമർത്തൂ."), tr('Tap the button with the magnifying glass.', 'आवर्धक शीशे वाला बटन दबाइए।', 'ഭൂതക്കണ്ണാടി ഉള്ള ബട്ടൺ അമർത്തൂ.')),
      tap('check', 'check', { skin: IR, blocks: [irBar('PNR Status', true), { t: 'field', label: 'PNR number (10 digits)', value: '4521878899' }, { t: 'text', text: 'Find the PNR on your ticket, or in the SMS from IRCTC. We filled it for practice.' }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'check', label: 'Check status' }] }] },
        tr("Your ticket has a 10-number PNR. We filled it in for practice. Tap 'Check status'.", "आपके टिकट पर 10 अंकों का PNR होता है। अभ्यास के लिए हमने भर दिया है। 'Check status' दबाइए।", "നിങ്ങളുടെ ടിക്കറ്റിൽ 10 അക്ക PNR ഉണ്ട്. പരിശീലനത്തിന് ഞങ്ങൾ നിറച്ചിട്ടുണ്ട്. 'Check status' അമർത്തൂ."), tr('Tap the blue button.', 'नीला बटन दबाइए।', 'നീല ബട്ടൺ അമർത്തൂ.')),
      quiz('result', { skin: IR, blocks: [irBar('PNR Status', true), { t: 'hero', tone: 'good', e: '🎫', title: 'CNF', sub: 'Chennai Mail 12624 · Coach S5 · Seat 32 · Lower berth' }, { t: 'text', text: 'CNF means Confirmed. WL means Waiting List.' }] },
        tr("The status says 'CNF', coach S5, seat 32. What does 'CNF' mean?", "स्टेटस में 'CNF', कोच S5, सीट 32 लिखा है। 'CNF' का क्या मतलब है?", "സ്റ്റാറ്റസിൽ 'CNF', കോച്ച് S5, സീറ്റ് 32 എന്ന് കാണിക്കുന്നു. 'CNF' എന്നാൽ എന്താണ്?"),
        [opt(tr('Confirmed, I have a seat', 'कन्फ़र्म, मेरी सीट पक्की है', 'കൺഫേം, എനിക്ക് സീറ്റ് ഉണ്ട്'), true, tr('Right! CNF is confirmed. Go to coach S5 and find seat 32.', 'सही! CNF यानी कन्फ़र्म। कोच S5 में जाकर सीट 32 ढूंढिए।', 'ശരി! CNF എന്നാൽ കൺഫേം. കോച്ച് S5-ൽ പോയി സീറ്റ് 32 കണ്ടെത്തൂ.')), opt(tr('Cancelled', 'रद्द हो गया', 'റദ്ദാക്കി'), false, tr("No. CNF means Confirmed. 'WL' would mean you are still waiting.", "नहीं। CNF यानी कन्फ़र्म। 'WL' का मतलब होता कि आप अभी वेटिंग में हैं।", "അല്ല. CNF എന്നാൽ കൺഫേം. 'WL' ആയിരുന്നെങ്കിൽ നിങ്ങൾ ഇപ്പോഴും വെയ്റ്റിങ്ങിൽ ആണെന്നാണ് അർത്ഥം."))]),
    ],
  },

  'paytm-pay': {
    id: 'paytm-pay',
    icon: 'scan',
    emoji: '💙',
    ...of('paytm', 'Paytm'),
    minutes: 3,
    title: tr('Pay at a shop with Paytm', 'Paytm से दुकान पर पैसे दें', 'Paytm കൊണ്ട് കടയിൽ പണം അടയ്ക്കാം'),
    takeaways: fix(
      ["Tap 'Scan & Pay' and scan the shop's QR code", 'Type the amount and check the shop name', 'Enter your UPI PIN only in the PIN screen'],
      ["'Scan & Pay' दबाएं और दुकान का QR कोड स्कैन करें", 'रकम लिखें और दुकान का नाम जांचें', 'UPI PIN सिर्फ़ PIN वाली स्क्रीन पर डालें'],
      ["'Scan & Pay' അമർത്തി കടയുടെ QR കോഡ് സ്കാൻ ചെയ്യുക", 'തുക അടിച്ച് കടയുടെ പേര് നോക്കുക', 'UPI PIN PIN സ്ക്രീനിൽ മാത്രം അടിക്കുക']
    ),
    share: tr('I learned to pay with Paytm using Nook! 💙', 'मैंने Nook से Paytm से पैसे देना सीखा! 💙', 'ഞാൻ Nook കൊണ്ട് Paytm-ൽ പണം അടയ്ക്കാൻ പഠിച്ചു! 💙'),
    realTry: tr("At a shop that shows a Paytm QR code, pay a small amount with your real Paytm. Check the shop's name first.", 'जिस दुकान पर Paytm QR कोड हो, वहाँ अपने असली Paytm से थोड़े पैसे दीजिए। पहले दुकान का नाम जांचिए।', 'Paytm QR കോഡ് ഉള്ള ഒരു കടയിൽ നിങ്ങളുടെ Paytm കൊണ്ട് ചെറിയ തുക അടയ്ക്കൂ. ആദ്യം കടയുടെ പേര് നോക്കൂ.'),
    steps: [
      intro(tr("Today we'll pay 50 rupees at a shop using Paytm. This is only practice. No real money will move.", 'आज हम Paytm से दुकान पर 50 रुपये देना सीखेंगे। यह सिर्फ़ अभ्यास है। असली पैसे नहीं जाएंगे।', 'ഇന്ന് Paytm കൊണ്ട് കടയിൽ 50 രൂപ അടയ്ക്കാൻ പഠിക്കാം. ഇത് പരിശീലനം മാത്രം. യഥാർത്ഥ പണം പോകില്ല.')),
      tap('scan', 'scan', { skin: PT, blocks: [{ t: 'bar', title: 'paytm', right: [{ icon: 'bell' }] }, { t: 'grid', items: [{ id: 'scan', e: '📷', label: 'Scan & Pay' }, { e: '📱', label: 'To Mobile' }, { e: '🏦', label: 'To Bank' }, { e: '🔄', label: 'Balance & History' }, { e: '📞', label: 'Recharge' }, { e: '🧾', label: 'Pay Bills' }, { e: '🚆', label: 'Tickets' }, { e: '➕', label: 'More' }] }] },
        tr("This is Paytm. Tap 'Scan & Pay', the first button.", "यह Paytm है। 'Scan & Pay', पहला बटन, दबाइए।", "ഇത് Paytm ആണ്. 'Scan & Pay', ആദ്യത്തെ ബട്ടൺ, അമർത്തൂ."), tr('Tap the first button, with the camera.', 'पहला बटन, कैमरा वाला, दबाइए।', 'ആദ്യത്തെ ബട്ടൺ, ക്യാമറ ഉള്ളത്, അമർത്തൂ.')),
      tap('qr', 'qr', { skin: PT, blocks: [{ t: 'bar', title: 'Scan any QR', back: true }, { t: 'hero', id: 'qr', e: '▦', title: 'Tap the QR code to scan', sub: 'In real life, point the camera at the shop QR code' }] },
        tr('The camera is open. In real life you point it at the shop\'s QR code. For practice, tap the QR code on the screen.', 'कैमरा खुल गया। असल में आप उसे दुकान के QR कोड की तरफ़ करते हैं। अभ्यास के लिए स्क्रीन पर QR कोड दबाइए।', 'ക്യാമറ തുറന്നു. സാധാരണ കടയിലെ QR കോഡിന് നേരെ പിടിക്കും. പരിശീലനത്തിന് സ്ക്രീനിലെ QR കോഡ് അമർത്തൂ.'), tr('Tap the big QR square in the middle.', 'बीच का बड़ा QR चौकोर दबाइए।', 'നടുവിലെ വലിയ QR ചതുരം അമർത്തൂ.')),
      input('amount', 'amount', '50', { skin: PT, blocks: [{ t: 'bar', title: 'Pay', back: true }, { t: 'hero', e: '🏪', title: 'Sunrise General Store', sub: 'Check this name. It is the same as the shop board.' }, { t: 'field', label: 'Amount', value: '₹ 50' }, { t: 'gap', grow: true }, { t: 'keypad' }] },
        tr("The shop's name is 'Sunrise General Store'. It matches the board, so it is right. Now type the amount. Press 5, 0.", "दुकान का नाम 'Sunrise General Store' है। वो बोर्ड से मिलता है, इसलिए सही है। अब रकम लिखिए। 5, 0 दबाइए।", "കടയുടെ പേര് 'Sunrise General Store' ആണ്. ബോർഡുമായി ഒത്തുനോക്കി, ശരിയാണ്. ഇനി തുക അടിക്കൂ. 5, 0 അമർത്തൂ."), tr('Press the glowing number.', 'चमकता हुआ नंबर दबाइए।', 'തിളങ്ങുന്ന നമ്പർ അമർത്തൂ.')),
      tap('proceed', 'proceed', { skin: PT, blocks: [{ t: 'bar', title: 'Pay', back: true }, { t: 'hero', e: '🏪', title: 'Sunrise General Store', sub: '₹ 50' }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'proceed', label: 'Proceed to Pay ₹ 50' }] }] },
        tr("50 rupees to Sunrise General Store. Tap the blue button 'Proceed to Pay'.", "Sunrise General Store को 50 रुपये। नीला बटन 'Proceed to Pay' दबाइए।", "Sunrise General Store-ന് 50 രൂപ. നീല ബട്ടൺ 'Proceed to Pay' അമർത്തൂ."), tr('Tap the blue button at the bottom.', 'नीचे नीला बटन दबाइए।', 'താഴെ നീല ബട്ടൺ അമർത്തൂ.')),
      input('pin', 'pin', '1234', { skin: PT, blocks: [{ t: 'hero', e: '🔐', title: 'Enter UPI PIN', sub: 'To pay ₹ 50 to Sunrise General Store' }, { t: 'dots', total: 4 }, { t: 'gap', grow: true }, { t: 'keypad' }] },
        tr('Now type the UPI PIN. For practice, press 1, 2, 3, 4. Never tell your real PIN to anyone.', 'अब UPI PIN डालिए। अभ्यास के लिए 1, 2, 3, 4 दबाइए। असली PIN किसी को कभी न बताइए।', 'ഇനി UPI PIN അടിക്കൂ. പരിശീലനത്തിന് 1, 2, 3, 4 അമർത്തൂ. യഥാർത്ഥ PIN ആരോടും പറയരുത്.'), tr('Press the glowing number.', 'चमकता हुआ नंबर दबाइए।', 'തിളങ്ങുന്ന നമ്പർ അമർത്തൂ.')),
      note('done', { skin: PT, blocks: [{ t: 'bar', title: 'Payment successful' }, { t: 'hero', tone: 'good', e: '✅', title: '₹ 50 paid', sub: 'Sunrise General Store' }] },
        tr('Payment successful! Show this green screen to the shopkeeper.', 'भुगतान हो गया! यह हरी स्क्रीन दुकानदार को दिखाइए।', 'പേയ്മെന്റ് വിജയിച്ചു! ഈ പച്ച സ്ക്രീൻ കടക്കാരനെ കാണിക്കൂ.')),
      quiz('cashback', { skin: PT, blocks: [{ t: 'hero', e: '💬', title: 'SMS', sub: 'Paytm cashback of ₹ 500 is waiting. Click paytm-reward.in and enter your UPI PIN.' }] },
        tr("You get an SMS: 'Paytm cashback of 500 rupees is waiting. Click this link and enter your UPI PIN.' What do you do?", "आपको SMS आता है: 'Paytm का 500 रुपये का कैशबैक इंतज़ार कर रहा है। इस लिंक पर जाकर अपना UPI PIN डालिए।' आप क्या करेंगे?", "ഒരു SMS വരുന്നു: 'Paytm-ന്റെ 500 രൂപ ക്യാഷ്ബാക്ക് കാത്തിരിക്കുന്നു. ഈ ലിങ്കിൽ പോയി നിങ്ങളുടെ UPI PIN അടിക്കൂ.' നിങ്ങൾ എന്ത് ചെയ്യും?"),
        [opt(tr('Click it, I want the cashback', 'दबा दूँ, कैशबैक चाहिए', 'അമർത്തും, ക്യാഷ്ബാക്ക് വേണം'), false, tr('No! You never need a PIN to receive money. This link steals your money.', 'नहीं! पैसे पाने के लिए PIN कभी नहीं लगता। यह लिंक आपके पैसे चुरा लेगा।', 'വേണ്ട! പണം കിട്ടാൻ ഒരിക്കലും PIN വേണ്ട. ഈ ലിങ്ക് നിങ്ങളുടെ പണം മോഷ്ടിക്കും.')), opt(tr('Delete it and tell my family', 'हटा दूँ और परिवार को बताऊँ', 'ഡിലീറ്റ് ചെയ്ത് വീട്ടുകാരോട് പറയും'), true, tr('Right! A PIN is only for paying. Delete such messages.', 'सही! PIN सिर्फ़ पैसे देने के लिए है। ऐसे संदेश हटा दीजिए।', 'ശരി! PIN പണം അടയ്ക്കാൻ മാത്രമാണ്. ഇത്തരം സന്ദേശങ്ങൾ ഡിലീറ്റ് ചെയ്യൂ.'))]),
    ],
  },

  'maps-directions': {
    id: 'maps-directions',
    icon: 'pin',
    emoji: '🗺️',
    ...of('maps', 'Google Maps'),
    minutes: 3,
    title: tr('Find the way with Google Maps', 'Google Maps से रास्ता ढूंढें', 'Google Maps കൊണ്ട് വഴി കണ്ടെത്താം'),
    takeaways: fix(
      ['Search the place name', "Tap 'Directions', then pick car, bike or walk", "Tap 'Start' and listen to the voice"],
      ['जगह का नाम खोजें', "'Directions' दबाएं, फिर कार, बाइक या पैदल चुनें", "'Start' दबाएं और आवाज़ सुनें"],
      ['സ്ഥലത്തിന്റെ പേര് തിരയുക', "'Directions' അമർത്തി കാർ, ബൈക്ക് അല്ലെങ്കിൽ നടത്തം തിരഞ്ഞെടുക്കുക", "'Start' അമർത്തി ശബ്ദം കേൾക്കുക"]
    ),
    share: tr('I learned to find the way with Google Maps on Nook! 🗺️', 'मैंने Nook से Google Maps से रास्ता ढूंढना सीखा! 🗺️', 'ഞാൻ Nook കൊണ്ട് Google Maps-ൽ വഴി കണ്ടെത്താൻ പഠിച്ചു! 🗺️'),
    realTry: tr('Before your next trip, search the place on your real Google Maps, and read how long it takes.', 'अगली यात्रा से पहले अपने असली Google Maps में जगह खोजिए और देखिए कितना समय लगेगा।', 'അടുത്ത യാത്രയ്ക്ക് മുമ്പ് നിങ്ങളുടെ Google Maps-ൽ സ്ഥലം തിരഞ്ഞ് എത്ര സമയം എടുക്കും എന്ന് നോക്കൂ.'),
    steps: [
      intro(tr("Today we'll find the way to City Hospital with Google Maps. This is only practice.", 'आज हम Google Maps से सिटी हॉस्पिटल का रास्ता ढूंढेंगे। यह सिर्फ़ अभ्यास है।', 'ഇന്ന് Google Maps കൊണ്ട് സിറ്റി ഹോസ്പിറ്റലിലേക്കുള്ള വഴി കണ്ടെത്താം. ഇത് പരിശീലനം മാത്രം.')),
      tap('search', 'search', { skin: MP, blocks: [{ t: 'search', id: 'search', ph: 'Search here', mic: true }, { t: 'chips', items: [{ label: '🍴 Restaurants' }, { label: '⛽ Petrol' }, { label: '🏥 Hospitals' }, { label: '🏧 ATMs' }] }, { t: 'view', e: '🗺️' }] },
        tr('This is Google Maps. Tap the search box at the top.', 'यह Google Maps है। ऊपर सर्च बॉक्स दबाइए।', 'ഇത് Google Maps ആണ്. മുകളിലെ സെർച്ച് ബോക്സ് അമർത്തൂ.'), tr("Tap the box that says 'Search here'.", "'Search here' लिखा डिब्बा दबाइए।", "'Search here' എന്ന് എഴുതിയ പെട്ടി അമർത്തൂ.")),
      tap('suggest', 'sugg', { skin: MP, blocks: [{ t: 'search', text: 'city hospital' }, { t: 'rows', items: [{ id: 'sugg', e: '🏥', title: 'City Hospital', sub: '3.2 km · Main Road' }, { e: '🏥', title: 'City Hospital Pharmacy', sub: '3.3 km' }, { e: '🏥', title: 'City Heart Clinic', sub: '5 km' }] }] },
        tr("We typed 'city hospital'. Tap the first line.", "हमने 'city hospital' लिख दिया है। पहली लाइन दबाइए।", "ഞങ്ങൾ 'city hospital' എഴുതിയിട്ടുണ്ട്. ആദ്യത്തെ വരി അമർത്തൂ."), tr('Tap the first line.', 'पहली लाइन दबाइए।', 'ആദ്യത്തെ വരി അമർത്തൂ.')),
      tap('directions', 'directions', { skin: MP, blocks: [{ t: 'view', e: '📍' }, { t: 'hero', e: '🏥', title: 'City Hospital', sub: '★ 4.2 · Open 24 hours · 3.2 km' }, { t: 'buttons', row: true, items: [{ id: 'directions', label: 'Directions' }, { label: 'Call', tone: 'ghost' }] }] },
        tr("This is the hospital on the map. Tap the blue 'Directions' button.", "यह नक्शे पर अस्पताल है। नीला 'Directions' बटन दबाइए।", "ഇതാണ് മാപ്പിലെ ആശുപത്രി. നീല 'Directions' ബട്ടൺ അമർത്തൂ."), tr("Tap 'Directions', on the left.", "बाईं तरफ़ 'Directions' दबाइए।", "ഇടതുവശത്തെ 'Directions' അമർത്തൂ.")),
      tap('mode', 'car', { skin: MP, blocks: [{ t: 'bar', title: 'Your location to City Hospital', back: true }, { t: 'chips', items: [{ id: 'car', label: '🚗 12 min', on: false }, { id: 'bike', label: '🏍️ 10 min' }, { id: 'walk', label: '🚶 41 min' }] }, { t: 'view', e: '🗺️' }] },
        tr('Now choose how you will go. Tap the car, 12 minutes.', 'अब चुनिए कि कैसे जाएंगे। कार, 12 मिनट, दबाइए।', 'ഇനി എങ്ങനെ പോകുമെന്ന് തിരഞ്ഞെടുക്കൂ. കാർ, 12 മിനിറ്റ്, അമർത്തൂ.'), tr('Tap the first one, the car.', 'पहला, कार, दबाइए।', 'ആദ്യത്തേത്, കാർ, അമർത്തൂ.')),
      tap('start', 'start', { skin: MP, blocks: [{ t: 'bar', title: 'Your location to City Hospital', back: true }, { t: 'chips', items: [{ label: '🚗 12 min', on: true }, { label: '🏍️ 10 min' }, { label: '🚶 41 min' }] }, { t: 'view', e: '🗺️' }, { t: 'buttons', items: [{ id: 'start', label: '▶ Start' }] }] },
        tr("By car it takes 12 minutes. Tap the blue 'Start' button.", "कार से 12 मिनट लगते हैं। नीला 'Start' बटन दबाइए।", "കാറിൽ 12 മിനിറ്റ് എടുക്കും. നീല 'Start' ബട്ടൺ അമർത്തൂ."), tr('Tap Start at the bottom.', 'नीचे Start दबाइए।', 'താഴെ Start അമർത്തൂ.')),
      note('nav', { skin: MP, blocks: [{ t: 'hero', tone: 'brand', e: '⬅️', title: 'Turn left in 200 m', sub: 'onto Main Road' }, { t: 'view', e: '🧭' }, { t: 'text', text: '12 min · 3.2 km · Arrive 1:42 PM' }] },
        tr('Maps shows the way, and a voice tells you, like turn left in 200 metres. Listen to the voice, and look at the phone only when you are not driving.', 'Maps रास्ता दिखाता है, और आवाज़ बताती है, जैसे 200 मीटर बाद बाएं मुड़िए। आवाज़ सुनिए, और गाड़ी चलाते समय फ़ोन मत देखिए।', 'Maps വഴി കാണിക്കും, ഒരു ശബ്ദം പറഞ്ഞുതരും, ഉദാഹരണത്തിന് 200 മീറ്റർ കഴിഞ്ഞ് ഇടത്തേക്ക് തിരിയൂ. ശബ്ദം കേൾക്കൂ, വണ്ടി ഓടിക്കുമ്പോൾ ഫോണിലേക്ക് നോക്കരുത്.')),
      quiz('driving', { skin: MP, blocks: [{ t: 'hero', e: '🚗', title: 'Driving to the hospital', sub: 'Maps is giving directions' }] },
        tr('You are driving a car with Maps on. Where should the phone be?', 'आप कार चला रहे हैं और Maps चालू है। फ़ोन कहाँ होना चाहिए?', 'നിങ്ങൾ കാർ ഓടിക്കുന്നു, Maps ഓണാണ്. ഫോൺ എവിടെ ആയിരിക്കണം?'),
        [opt(tr('In a holder, and I listen to the voice', 'होल्डर में, और मैं आवाज़ सुनूँ', 'ഹോൾഡറിൽ, ഞാൻ ശബ്ദം കേൾക്കും'), true, tr('Right! Keep the phone in a holder and use the voice. It is safer.', 'सही! फ़ोन होल्डर में रखिए और आवाज़ से चलिए। यह ज़्यादा सुरक्षित है।', 'ശരി! ഫോൺ ഹോൾഡറിൽ വെച്ച് ശബ്ദം കേട്ട് പോകൂ. അതാണ് കൂടുതൽ സുരക്ഷിതം.')), opt(tr('In my hand, so I can look at it', 'हाथ में, ताकि देखता रहूँ', 'കയ്യിൽ, അങ്ങനെ നോക്കാമല്ലോ'), false, tr('No. Holding a phone while driving is dangerous. Use a holder, or ask someone to guide you.', 'नहीं। गाड़ी चलाते समय फ़ोन हाथ में रखना खतरनाक है। होल्डर लगाइए, या किसी से रास्ता बताने को कहिए।', 'വേണ്ട. വണ്ടി ഓടിക്കുമ്പോൾ ഫോൺ കയ്യിൽ പിടിക്കുന്നത് അപകടമാണ്. ഹോൾഡർ ഉപയോഗിക്കൂ, അല്ലെങ്കിൽ ആരെയെങ്കിലും വഴി പറഞ്ഞുതരാൻ പറയൂ.'))]),
    ],
  },

  'maps-share-location': {
    id: 'maps-share-location',
    icon: 'share',
    emoji: '📍',
    ...of('maps', 'Google Maps'),
    minutes: 3,
    title: tr('Share where you are with family', 'परिवार को अपनी जगह बताएं', 'നിങ്ങൾ എവിടെയാണെന്ന് വീട്ടുകാരെ അറിയിക്കാം'),
    takeaways: fix(
      ['Tap the blue dot, then Share location', 'Choose for how long', 'Share only with people you trust'],
      ['नीले बिंदु को दबाएं, फिर Share location', 'कितनी देर के लिए, यह चुनें', 'सिर्फ़ भरोसे के लोगों के साथ share करें'],
      ['നീല കുത്ത് അമർത്തി Share location അമർത്തുക', 'എത്ര നേരത്തേക്ക് എന്ന് തിരഞ്ഞെടുക്കുക', 'വിശ്വസ്തരുമായി മാത്രം പങ്കിടുക']
    ),
    share: tr('I learned to share my location on Google Maps with Nook! 📍', 'मैंने Nook से Google Maps पर अपनी जगह share करना सीखा! 📍', 'ഞാൻ Nook കൊണ്ട് Google Maps-ൽ എന്റെ ലൊക്കേഷൻ പങ്കിടാൻ പഠിച്ചു! 📍'),
    realTry: tr('Next time you go out alone, share your location with a family member for one hour, then stop sharing.', 'अगली बार अकेले बाहर जाएं, तो एक घंटे के लिए परिवार में किसी के साथ अपनी जगह share कीजिए, फिर बंद कर दीजिए।', 'അടുത്ത തവണ ഒറ്റയ്ക്ക് പുറത്തുപോകുമ്പോൾ ഒരു മണിക്കൂർ നേരത്തേക്ക് വീട്ടിലെ ആർക്കെങ്കിലും ലൊക്കേഷൻ പങ്കിടൂ, പിന്നെ നിർത്തൂ.'),
    steps: [
      intro(tr("Today we'll share where you are with Sunita, so your family knows you are safe. This is only practice. Nothing will be shared.", 'आज हम सुनीता को अपनी जगह बताएंगे, ताकि परिवार को पता रहे कि आप सुरक्षित हैं। यह सिर्फ़ अभ्यास है। कुछ भी share नहीं होगा।', 'ഇന്ന് നിങ്ങൾ സുരക്ഷിതരാണെന്ന് വീട്ടുകാർ അറിയാൻ സുനിതയ്ക്ക് നിങ്ങളുടെ ലൊക്കേഷൻ പങ്കിടാം. ഇത് പരിശീലനം മാത്രം. ഒന്നും പങ്കിടില്ല.')),
      tap('dot', 'dot', { skin: MP, blocks: [{ t: 'search', ph: 'Search here', mic: true }, { t: 'view', e: '🗺️' }, { t: 'hero', id: 'dot', e: '🔵', title: 'You are here', sub: 'Tap the blue dot' }] },
        tr('The blue dot on the map is you. Tap the blue dot.', 'नक्शे पर नीला बिंदु आप हैं। नीले बिंदु को दबाइए।', 'മാപ്പിലെ നീല കുത്ത് നിങ്ങളാണ്. നീല കുത്ത് അമർത്തൂ.'), tr('Tap the blue dot below the map.', 'नक्शे के नीचे नीला बिंदु दबाइए।', 'മാപ്പിന് താഴെയുള്ള നീല കുത്ത് അമർത്തൂ.')),
      tap('share', 'share', { skin: MP, blocks: [{ t: 'view', e: '🗺️' }, { t: 'rows', title: 'Your location', items: [{ e: '📍', title: 'Green Park, Main Road', sub: 'Accurate to 10 m', noChev: true }, { id: 'share', e: '📤', title: 'Share location', sub: 'Let family see where you are' }, { e: '💾', title: 'Save parking' }] }] },
        tr("Tap 'Share location'.", "'Share location' दबाइए।", "'Share location' അമർത്തൂ."), tr('Tap the second line.', 'दूसरी लाइन दबाइए।', 'രണ്ടാമത്തെ വരി അമർത്തൂ.')),
      tap('time', 'hour', { skin: MP, blocks: [{ t: 'bar', title: 'Share your location', back: true }, { t: 'text', text: 'For how long?' }, { t: 'rows', items: [{ id: 'hour', e: '⏱️', title: '1 hour', sub: 'Best for a short trip' }, { e: '⏳', title: 'Until you turn this off', sub: 'Keeps sharing for days' }] }] },
        tr("Choose how long. Tap '1 hour'. It stops by itself after that, which is safest.", "कितनी देर के लिए, चुनिए। '1 hour' दबाइए। उसके बाद यह अपने-आप बंद हो जाएगा, जो सबसे सुरक्षित है।", "എത്ര നേരത്തേക്ക് എന്ന് തിരഞ്ഞെടുക്കൂ. '1 hour' അമർത്തൂ. അതിനുശേഷം അത് തനിയെ നിൽക്കും, അതാണ് ഏറ്റവും സുരക്ഷിതം."), tr("Tap '1 hour', the first line.", "पहली लाइन '1 hour' दबाइए।", "ആദ്യത്തെ വരി '1 hour' അമർത്തൂ.")),
      tap('person', 'sunita', { skin: MP, blocks: [{ t: 'bar', title: 'Share with', back: true }, { t: 'rows', items: [{ id: 'sunita', e: '👩', title: 'Sunita Didi', sub: 'Family' }, { e: '👦', title: 'Rahul (Beta)', sub: 'Family' }, { e: '👤', title: 'Unknown number', sub: '+91 98xxx xx210' }] }] },
        tr('Who should see where you are? Tap Sunita Didi, a person from your family.', 'आप कहाँ हैं, यह किसे दिखाना है? परिवार की सुनीता दीदी को दबाइए।', 'നിങ്ങൾ എവിടെയാണെന്ന് ആർക്ക് കാണാം? വീട്ടിലെ സുനിത ദീദിയെ അമർത്തൂ.'), tr("Tap 'Sunita Didi', the first one.", "पहली, 'Sunita Didi', दबाइए।", "ആദ്യത്തെ, 'Sunita Didi', അമർത്തൂ.")),
      quiz('trust', { skin: MP, blocks: [{ t: 'hero', tone: 'good', e: '📍', title: 'Sharing with Sunita Didi', sub: 'For 1 hour' }] },
        tr('Your location is shared with Sunita for one hour. A stranger on the phone asks you to share your location with him too. What do you do?', 'आपकी जगह एक घंटे के लिए सुनीता के साथ share हो गई। फ़ोन पर एक अजनबी कहता है कि अपनी जगह उसे भी share कीजिए। आप क्या करेंगे?', 'നിങ്ങളുടെ ലൊക്കേഷൻ ഒരു മണിക്കൂർ നേരത്തേക്ക് സുനിതയ്ക്ക് പങ്കിട്ടു. ഫോണിൽ ഒരു അപരിചിതൻ ലൊക്കേഷൻ തനിക്കും പങ്കിടാൻ പറയുന്നു. നിങ്ങൾ എന്ത് ചെയ്യും?'),
        [opt(tr('Share it, he sounds friendly', 'share कर दूँ, वो भला लगता है', 'പങ്കിടും, നല്ലയാളാണെന്ന് തോന്നുന്നു'), false, tr('No! Never share where you are with someone you do not know. Share only with family.', 'नहीं! जिसे आप नहीं जानते, उसे अपनी जगह कभी न बताएं। सिर्फ़ परिवार के साथ share कीजिए।', 'വേണ്ട! അറിയാത്ത ഒരാൾക്ക് നിങ്ങൾ എവിടെയാണെന്ന് ഒരിക്കലും പങ്കിടരുത്. വീട്ടുകാരുമായി മാത്രം പങ്കിടൂ.')), opt(tr('No, only my family', 'नहीं, सिर्फ़ परिवार को', 'വേണ്ട, വീട്ടുകാർക്ക് മാത്രം'), true, tr('Right! Only family you trust, and only for a short time.', 'सही! सिर्फ़ भरोसे का परिवार, और सिर्फ़ थोड़ी देर के लिए।', 'ശരി! വിശ്വസ്തരായ വീട്ടുകാർക്ക് മാത്രം, കുറച്ച് നേരത്തേക്ക് മാത്രം.'))]),
    ],
  },
};

export const APP3_KEYWORDS = {
  'irctc-ticket': [['irctc', 5], ['आईआरसीटीसी', 5], ['ഐആർസിടിസി', 5], ['train', 4], ['ट्रेन', 4], ['ട്രെയിൻ', 4], ['ticket', 3], ['टिकट', 3], ['ടിക്കറ്റ്', 3], ['railway', 3], ['रेल', 3], ['റെയിൽ', 3], ['berth', 2]],
  'irctc-pnr': [['pnr', 5], ['पीएनआर', 5], ['പിഎൻആർ', 5], ['confirm', 3], ['कन्फ़र्म', 3], ['कन्फर्म', 3], ['waiting', 3], ['वेटिंग', 3], ['train status', 3]],
  'paytm-pay': [['paytm', 5], ['पेटीएम', 5], ['പേടിഎം', 5], ['qr', 2], ['scan', 1]],
  'maps-directions': [['maps', 5], ['map', 4], ['मैप', 4], ['नक्शा', 4], ['മാപ്പ്', 4], ['route', 3], ['रास्ता', 4], ['വഴി', 4], ['direction', 4], ['navigate', 4], ['navigation', 4], ['how to reach', 3], ['पहुँच', 2]],
  'maps-share-location': [['share location', 5], ['live location', 5], ['location', 3], ['लोकेशन', 4], ['ലൊക്കേഷൻ', 4], ['जगह बता', 3], ['where i am', 3], ['मैं कहाँ', 3]],
};
