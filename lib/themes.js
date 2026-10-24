// Learn by topic: short courses grouped by level. Each topic has a short "good to know" intro, then lessons in a
// sensible order (lesson ids; "gd-" ones are quick guides with practice screens). The level is only a way to group topics;
// every topic is open to everyone. Add a topic by adding an entry here.
const t = (en, hi, ml) => ({ en, hi, ml });

export const LEVELS = [
  { id: 1, title: t('Beginner', 'शुरुआत', 'തുടക്കം'), sub: t('The basics, step by step', 'बुनियादी बातें, कदम-कदम', 'അടിസ്ഥാന കാര്യങ്ങൾ, ഘട്ടം ഘട്ടമായി') },
  { id: 2, title: t('Everyday', 'रोज़ के काम', 'ദൈനംദിനം'), sub: t('Rides and everyday tasks', 'सवारी और रोज़ के काम', 'യാത്രയും ദൈനംദിന കാര്യങ്ങളും') },
  { id: 3, title: t('Confident', 'आत्मविश्वास', 'ആത്മവിശ്വാസം'), sub: t('Make the phone your own', 'फ़ोन को अपना बनाइए', 'ഫോൺ സ്വന്തമാക്കൂ') },
];

export const THEMES = [
  {
    id: 'apps-play-store',
    level: 1,
    icon: '🧩',
    title: t('Apps, icons and the Play Store', 'ऐप, निशान और Play Store', 'ആപ്പുകൾ, ചിഹ്നങ്ങൾ, Play Store'),
    lead: t('The Play Store is the safe shop for apps. Learn to find, check and install them.', 'Play Store ऐप की सुरक्षित दुकान है। ऐप ढूंढना, जाँचना और डालना सीखिए।', 'ആപ്പുകൾക്കുള്ള സുരക്ഷിത കടയാണ് Play Store. ആപ്പുകൾ കണ്ടെത്താനും പരിശോധിക്കാനും ഇൻസ്റ്റാൾ ചെയ്യാനും പഠിക്കൂ.'),
    cards: [
      [t('What is the Play Store?', 'Play Store क्या है?', 'എന്താണ് Play Store?'), t('It is the shop on your phone where you get apps. Always use it for new apps, never a link someone sends.', 'यह आपके फ़ोन की वह दुकान है जहाँ से ऐप मिलते हैं। नए ऐप हमेशा यहीं से लीजिए, किसी के भेजे लिंक से नहीं।', 'ആപ്പുകൾ കിട്ടുന്ന നിങ്ങളുടെ ഫോണിലെ കടയാണിത്. പുതിയ ആപ്പുകൾക്ക് എപ്പോഴും ഇത് ഉപയോഗിക്കൂ, ആരെങ്കിലും അയച്ച ലിങ്ക് വേണ്ട.')],
      [t('Icons are a shared language', 'निशान एक साझा भाषा हैं', 'ചിഹ്നങ്ങൾ പൊതുഭാഷയാണ്'), t('A magnifying glass means search. Three dots mean more options. Once you know them, every app feels familiar.', 'आवर्धक शीशे का मतलब खोज है। तीन बिंदुओं का मतलब और विकल्प है। इन्हें जानने पर हर ऐप जाना-पहचाना लगता है।', 'ലെൻസ് എന്നാൽ തിരയൽ. മൂന്ന് കുത്തുകൾ എന്നാൽ കൂടുതൽ ഓപ്ഷനുകൾ. ഇവ അറിഞ്ഞാൽ ഏത് ആപ്പും പരിചിതമാകും.')],
      [t('Check before you install', 'डालने से पहले जाँचिए', 'ഇൻസ്റ്റാൾ ചെയ്യും മുമ്പ് പരിശോധിക്കൂ'), t('Look at the company name, the rating and the downloads. "Sponsored" means someone paid to show it.', 'कंपनी का नाम, रेटिंग और डाउनलोड देखिए। "Sponsored" का मतलब है किसी ने दिखाने के पैसे दिए हैं।', 'കമ്പനിയുടെ പേര്, റേറ്റിംഗ്, ഡൗൺലോഡുകൾ എന്നിവ നോക്കൂ. "Sponsored" എന്നാൽ ആരോ പണം നൽകി കാണിക്കുന്നത്.')],
    ],
    lessons: ['gd-icon-meanings', 'gd-install-app'],
  },
  {
    id: 'stay-safe',
    level: 1,
    icon: '🛡️',
    title: t('Stay safe: scams, fake news and privacy', 'सुरक्षित रहिए: धोखा, झूठी खबरें और निजता', 'സുരക്ഷിതരായിരിക്കൂ: തട്ടിപ്പ്, വ്യാജ വാർത്ത, സ്വകാര്യത'),
    lead: t('Things can go wrong in a few taps. Learn what to watch for.', 'कुछ दबाने में ही गड़बड़ हो सकती है। जानिए किस पर नज़र रखनी है।', 'ഏതാനും അമർത്തലുകൾ കൊണ്ട് കാര്യങ്ങൾ തെറ്റാം. എന്തിനെ ശ്രദ്ധിക്കണമെന്ന് അറിയൂ.'),
    cards: [
      [t('Things to watch for', 'ध्यान रखने की बातें', 'ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ'), t('Scam messages, fake links, fake apps and passwords given away by mistake. They all try to hurry you.', 'धोखे वाले मैसेज, नकली लिंक, नकली ऐप और गलती से बताए गए पासवर्ड। सब आपको जल्दी में डालना चाहते हैं।', 'തട്ടിപ്പ് മെസ്സേജുകൾ, വ്യാജ ലിങ്കുകൾ, വ്യാജ ആപ്പുകൾ, അബദ്ധത്തിൽ പറഞ്ഞുപോയ പാസ്‌വേഡുകൾ. എല്ലാം നിങ്ങളെ തിടുക്കപ്പെടുത്താൻ നോക്കുന്നു.')],
      [t('Check forwards', 'फ़ॉरवर्ड जाँचिए', 'ഫോർവേഡുകൾ പരിശോധിക്കൂ'), t('A message forwarded many times is not proof. Search it, or ask your family, before you share.', 'कई बार फ़ॉरवर्ड हुआ मैसेज सबूत नहीं है। आगे भेजने से पहले खोजिए, या परिवार से पूछिए।', 'പലതവണ ഫോർവേഡ് ചെയ്ത മെസ്സേജ് തെളിവല്ല. പങ്കിടും മുമ്പ് തിരയൂ, അല്ലെങ്കിൽ വീട്ടുകാരോട് ചോദിക്കൂ.')],
      [t('Protect your privacy', 'अपनी निजता बचाइए', 'സ്വകാര്യത സംരക്ഷിക്കൂ'), t('Never share your OTP or PIN. Lock your phone. Think about what you post and who can see it.', 'OTP या PIN किसी को न बताइए। फ़ोन लॉक रखिए। सोचिए कि आप क्या डालते हैं और कौन देख सकता है।', 'OTP, PIN എന്നിവ ആരോടും പറയരുത്. ഫോൺ ലോക്ക് ചെയ്യൂ. എന്ത് പോസ്റ്റ് ചെയ്യുന്നു, ആർക്ക് കാണാം എന്ന് ചിന്തിക്കൂ.')],
    ],
    lessons: ['gd-ride-driver-check', 'gd-ride-share-trip'],
    links: [{ href: '/guide/open-link-safe', title: t('Quick guide: is this link or message safe?', 'छोटी गाइड: क्या यह लिंक या संदेश सुरक्षित है?', 'ചെറിയ ഗൈഡ്: ഈ ലിങ്ക് അല്ലെങ്കിൽ സന്ദേശം സുരക്ഷിതമാണോ?') }, { href: '/scams', title: t('Practise spotting scams', 'धोखा पहचानने का अभ्यास', 'തട്ടിപ്പ് തിരിച്ചറിയാൻ പരിശീലിക്കൂ') }],
  },
  {
    id: 'rides',
    level: 2,
    icon: '🚕',
    title: t('Rides with Uber', 'Uber से सवारी', 'Uber-ൽ യാത്ര'),
    lead: t('Book a taxi from home. See the price first and share your trip with family.', 'घर बैठे टैक्सी बुक कीजिए। पहले किराया देखिए और सफ़र परिवार को दिखाइए।', 'വീട്ടിലിരുന്ന് ടാക്സി ബുക്ക് ചെയ്യൂ. ആദ്യം നിരക്ക് കാണാം, യാത്ര വീട്ടുകാരുമായി പങ്കിടാം.'),
    cards: [
      [t('Why use a ride app', 'सवारी ऐप क्यों', 'എന്തിന് റൈഡ് ആപ്പ്'), t('You see the fare before you go, the driver and car details, and you can share the trip.', 'जाने से पहले किराया, ड्राइवर और गाड़ी की जानकारी दिखती है, और सफ़र शेयर कर सकते हैं।', 'പോകും മുമ്പ് നിരക്കും ഡ്രൈവറുടെയും വാഹനത്തിന്റെയും വിവരങ്ങളും കാണാം, യാത്ര പങ്കിടുകയും ചെയ്യാം.')],
      [t('Booking a ride', 'सवारी बुक करना', 'റൈഡ് ബുക്ക് ചെയ്യൽ'), t('Choose where to go, pick a vehicle, check the fare, then confirm.', 'कहाँ जाना है चुनिए, गाड़ी का प्रकार चुनिए, किराया देखिए, फिर पक्का कीजिए।', 'എങ്ങോട്ട് പോകണമെന്ന് തിരഞ്ഞെടുക്കൂ, വാഹനം തിരഞ്ഞെടുക്കൂ, നിരക്ക് നോക്കൂ, പിന്നെ സ്ഥിരീകരിക്കൂ.')],
      [t('Stay safe on a ride', 'सफ़र में सुरक्षित रहिए', 'യാത്രയിൽ സുരക്ഷിതരായിരിക്കൂ'), t('Check that the car number and driver name match the app. Share your trip. You can cancel before it starts.', 'गाड़ी का नंबर और ड्राइवर का नाम ऐप से मिलाइए। सफ़र शेयर कीजिए। शुरू होने से पहले रद्द कर सकते हैं।', 'വാഹന നമ്പറും ഡ്രൈവറുടെ പേരും ആപ്പിലേതുമായി ഒത്തുനോക്കൂ. യാത്ര പങ്കിടൂ. തുടങ്ങും മുമ്പ് റദ്ദാക്കാം.')],
    ],
    lessons: ['uber-cab', 'gd-uber-cancel', 'gd-ride-driver-check', 'gd-ride-share-trip', 'gd-ride-rate', 'gd-ride-pay-upi'],
  },
  {
    id: 'connect-voice',
    level: 3,
    icon: '🎙️',
    title: t('Video calls and talking to your phone', 'वीडियो कॉल और फ़ोन से बोलना', 'വീഡിയോ കോളും ഫോണിനോട് സംസാരിക്കലും'),
    lead: t('See your family, and talk instead of typing.', 'परिवार को देखिए, और टाइप करने की जगह फ़ोन से बोलिए।', 'വീട്ടുകാരെ കാണൂ, ടൈപ്പ് ചെയ്യുന്നതിന് പകരം ഫോണിനോട് സംസാരിക്കൂ.'),
    cards: [
      [t('See your family', 'परिवार को देखिए', 'വീട്ടുകാരെ കാണൂ'), t('A video call shows their face as well as their voice. It is free on WhatsApp.', 'वीडियो कॉल में आवाज़ के साथ चेहरा भी दिखता है। WhatsApp पर यह मुफ़्त है।', 'വീഡിയോ കോളിൽ ശബ്ദത്തോടൊപ്പം മുഖവും കാണാം. WhatsApp-ൽ ഇത് സൗജന്യമാണ്.')],
      [t('Talk instead of typing', 'टाइप की जगह बोलिए', 'ടൈപ്പ് ചെയ്യുന്നതിന് പകരം സംസാരിക്കൂ'), t('Tap the microphone and say what you want. Search works by voice in YouTube and Maps.', 'माइक दबाकर बोलिए। YouTube और Maps में खोज आवाज़ से भी होती है।', 'മൈക്ക് അമർത്തി ആവശ്യം പറയൂ. YouTube, Maps എന്നിവയിൽ തിരയൽ ശബ്ദം കൊണ്ടും ചെയ്യാം.')],
    ],
    lessons: ['video-call'],
  },
];
