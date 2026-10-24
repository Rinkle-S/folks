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
    lessons: ['uber-cab', 'gd-uber-cancel', 'gd-ride-driver-check', 'gd-ride-pay-upi'],
  },
];
