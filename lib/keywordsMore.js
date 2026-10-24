// More words a parent may say or type for each practice lesson, in English, Hinglish, Hindi and a little Malayalam.
// [word, weight]. Merged into KEYWORDS (lib/lessons.js). Latin words must start a word; Hindi and Malayalam match anywhere.
// Weight 3 or more counts as "the task" for matching; 1 to 2 only helps rank.
export const EXTRA_KEYWORDS = {
  'qr-pay': [
    ['pay money at shop', 4], ['pay the shopkeeper', 4], ['pay shopkeeper', 4], ['pay at shop', 4],
    ['pay in shop', 4], ['shop payment', 4], ['scan and pay', 4], ['scan to pay', 4], ['scan qr', 4], ['qr code', 4],
    ['online payment', 2], ['digital payment', 2], ['pay by phone', 3], ['pay with phone', 3], ['pay using phone', 3],
    ['pay vegetable', 3], ['pay sabzi', 3], ['sabzi wale ko', 3], ['dukan pe pay', 4], ['dukan mein pay', 4], ['dukandar', 3],
    ['paise dene', 3], ['paise dena', 3], ['paisa dena', 3], ['payment karna', 3], ['payment kaise', 3], ['pay kaise', 2],
    ['दुकानदार', 3], ['दुकान पर पैसे', 4], ['पैसे कैसे दें', 3], ['पेमेंट कैसे', 3], ['पेमेंट करना', 3], ['स्कैन करके', 3],
    ['പണം കൊടുക്ക', 3], ['കടയിൽ', 3], ['ക്യുആർ കോഡ്', 4],
  ],
  'send-money': [
    ['money', 1], ['paise', 1], ['पैसे', 1],
    ['pay money to', 5], ['money to my', 4], ['pay my', 3], ['pay someone', 4], ['pay a person', 4], ['pay my son', 4], ['pay my daughter', 4], ['pay friend', 4],
    ['pay relative', 4], ['send paise', 4], ['send rupees', 4], ['give money', 3], ['money to son', 4], ['money to daughter', 4],
    ['money to friend', 4], ['transfer money', 4], ['pay to contact', 4], ['pay contact', 4], ['pay a contact', 4],
    ['bank transfer', 3], ['paise bhejna', 4], ['paise bhejne', 4], ['paisa bhejna', 4], ['beta ko paise', 4], ['bete ko paise', 4],
    ['किसी को पैसे', 4], ['बेटे को पैसे', 4], ['पैसे देने', 2], ['पैसे भेजना', 4], ['पैसे ट्रांसफर', 4],
    ['പണം അയയ്ക്ക', 4], ['മകന് പണം', 4],
  ],
  recharge: [
    ['mobile recharge', 5], ['phone recharge', 5], ['recharge karna', 5], ['recharge kaise', 5], ['top up', 4], ['topup', 4],
    ['data pack', 4], ['data plan', 4], ['prepaid', 3], ['validity', 3], ['talktime', 3], ['talk time', 3], ['balance khatam', 3],
    ['internet khatam', 3], ['jio', 3], ['airtel', 3], ['vi recharge', 3], ['रिचार्ज करना', 5], ['नेट खत्म', 3], ['डेटा खत्म', 3],
    ['മൊബൈൽ റീചാർജ്', 5],
  ],
  'whatsapp-docs': [
    ['find old photo', 4], ['find old file', 4], ['find old pdf', 4], ['find pdf', 4], ['find the file', 4], ['find a file', 4],
    ['find photo', 3], ['lost photo', 3], ['lost file', 3], ['where is my file', 4], ['where is the photo', 4], ['where did the photo go', 4],
    ['downloaded file', 3], ['downloaded pdf', 3], ['sent me a file', 4], ['sent me pdf', 4], ['bill pdf', 3], ['old message', 2],
    ['old whatsapp', 3], ['file kahan', 4], ['photo kahan', 4], ['file kaise dhundhe', 4], ['file dhoondna', 4],
    ['फ़ाइल कहाँ', 4], ['फाइल कहां', 4], ['फोटो कहां', 4], ['पुरानी फोटो', 4], ['पुरानी फाइल', 4], ['ഫയൽ എവിടെ', 4], ['ഫോട്ടോ എവിടെ', 4],
  ],
  'whatsapp-status': [
    ['put status', 4], ['put a status', 4], ['post status', 4], ['post a status', 4], ['set status', 4], ['set a status', 4],
    ['add status', 4], ['add a status', 4], ['whatsapp status', 5], ['status lagana', 5], ['status kaise lagaye', 5],
    ['good morning message', 3], ['good morning status', 4], ['greeting', 2], ['wish everyone', 3], ['festival wish', 3],
    ['स्टेटस लगाना', 5], ['स्टेटस कैसे', 5], ['सुप्रभात', 3], ['സ്റ്റാറ്റസ് ഇടുക', 5],
  ],
  'video-call': [
    ['video call', 5], ['videocall', 5], ['see my son', 4], ['see my daughter', 4], ['grandchild', 3], ['grandson', 3], ['granddaughter', 3], ['grandchildren', 3], ['पोते', 3], ['पोता', 3], ['नाती', 3], ['പേരക്കുട്ടി', 3], ['talk face to face', 4], ['face to face', 3], ['call with video', 5], ['show my face', 3],
    ['call beta', 3], ['beta ko video', 5], ['video call kaise', 5], ['video call karna', 5], ['video lagana', 4],
    ['वीडियो कॉल कैसे', 5], ['वीडियो कॉल करना', 5], ['बेटे को वीडियो', 5], ['വീഡിയോ കോൾ ചെയ്യ', 5],
  ],
  'electricity-bill': [
    ['pay light bill', 5], ['pay current bill', 5], ['pay electricity', 5], ['electricity board', 4], ['eb bill', 4], ['kseb', 5],
    ['bescom', 5], ['msedcl', 5], ['bill payment', 3], ['pay my bill', 3], ['pay the bill', 3], ['bill bharna', 5], ['bijli ka bill', 5],
    ['बिजली का बिल', 5], ['बिल भरना', 4], ['बिल कैसे भरें', 4], ['കറന്റ് ബിൽ അടയ്ക്ക', 5], ['കെഎസ്ഇബി', 5],
  ],
  'uber-cab': [
    ['book cab', 5], ['book a cab', 5], ['book taxi', 5], ['book a taxi', 5], ['call a cab', 5], ['call taxi', 5], ['need a cab', 5],
    ['go to hospital by cab', 4], ['ride', 2], ['car booking', 4], ['taxi kaise', 5], ['cab kaise', 5], ['cab bulana', 5], ['gaadi book', 4],
    ['टैक्सी बुक', 5], ['कैब बुक', 5], ['गाड़ी बुक', 4], ['ടാക്സി ബുക്ക്', 5],
  ],
  flashlight: [['torch', 4], ['टॉर्च', 4], ['light on', 3], ['phone light', 4], ['phone ki light', 4], ['light jalana', 4], ['अंधेरे', 2], ['ടോർച്ച്', 4]],
  hotspot: [['share internet', 4], ['share net', 4], ['share data', 4], ['internet share', 4], ['tethering', 4], ['net share', 4], ['internet dena', 4], ['हॉटस्पॉट', 4]],
  selfie: [
    ['take photo', 4], ['take a photo', 4], ['take picture', 4], ['click photo', 4], ['click a photo', 4], ['photo lena', 4], ['photo kheenchna', 4],
    ['camera kaise', 4], ['open camera', 4], ['front camera', 3], ['फोटो खींचना', 4], ['फोटो लेना', 4], ['कैमरा', 3], ['സെൽഫി', 4], ['ഫോട്ടോ എടുക്ക', 4],
  ],
  silent: [
    ['silent mode', 5], ['silent karna', 5], ['mute phone', 4], ['mute the phone', 4], ['phone mute', 4], ['stop ringing', 4],
    ['ringtone off', 4], ['no sound', 3], ['vibrate', 3], ['awaaz band', 4], ['आवाज़ बंद', 4], ['साइलेंट', 4], ['സൈലന്റ്', 4],
  ],
  'bigger-text': [
    ['make text big', 5], ['make it big', 5], ['make bigger', 5], ['zoom text', 4], ['big text', 5], ['bigger text', 5], ['larger text', 5], ['large text', 5], ['big letters', 5], ['big font', 5], ['font size', 5],
    ['text size', 5], ['cannot read', 4], ['cant read', 4], ['too small', 4], ['small letters', 4], ['akshar bade', 5], ['अक्षर बड़े', 5],
    ['बड़े अक्षर', 5], ['फॉन्ट', 4], ['വലിയ അക്ഷരം', 5],
  ],
  screenshot: [['screen shot', 5], ['screen capture', 4], ['save screen', 4], ['save this screen', 4], ['photo of screen', 4], ['स्क्रीनशॉट', 5], ['സ്ക്രീൻഷോട്ട്', 5]],
  wifi: [['wi-fi', 5], ['wi fi', 5], ['wifi password', 5], ['connect internet', 4], ['connect to internet', 4], ['no internet', 3], ['वाईफाई', 5], ['वाई फाई', 5], ['വൈഫൈ', 5]],
  'speaker-call': [['loudspeaker', 5], ['loud speaker', 5], ['speaker on', 5], ['speaker phone', 5], ['speakerphone', 5], ['cannot hear', 3], ['स्पीकर', 4], ['സ്പീക്കർ', 4]],
  'block-number': [
    ['block number', 5], ['block a number', 5], ['block caller', 5], ['spam call', 4], ['spam calls', 4], ['fake call', 3], ['unknown call', 3],
    ['stop calls', 3], ['number block', 5], ['ब्लॉक', 4], ['स्पैम', 3], ['ബ്ലോക്ക്', 4],
  ],
  'yono-balance': [
    ['bank balance', 4], ['check balance', 4], ['balance check', 4], ['how much money', 3], ['account balance', 4], ['balance kaise', 4],
    ['sbi balance', 5], ['paise kitne', 3], ['बैलेंस', 4], ['बैलेन्स', 4], ['खाते में कितने', 4], ['ബാലൻസ്', 4],
  ],
  'irctc-ticket': [
    ['book train', 5], ['book a train', 5], ['train ticket', 5], ['train booking', 5], ['railway ticket', 5], ['reservation', 3],
    ['ticket book', 4], ['ticket kaise', 4], ['train ka ticket', 5], ['train se jana', 3], ['रेल टिकट', 5], ['ट्रेन टिकट', 5], ['ട്രെയിൻ ടിക്കറ്റ്', 5],
  ],
  'irctc-pnr': [
    ['pnr', 5], ['pnr status', 5], ['ticket confirmed', 5], ['confirm ticket', 4], ['is my ticket confirmed', 5], ['waiting list', 4],
    ['waiting ticket', 4], ['wl ticket', 4], ['rac', 3], ['पीएनआर', 5], ['कन्फर्म', 4], ['वेटिंग', 4],
  ],
  'maps-directions': [
    ['directions', 5], ['find way', 5], ['find the way', 5], ['how to reach', 5], ['how do i get to', 5], ['way to', 3], ['route', 4],
    ['navigate', 5], ['navigation', 5], ['rasta', 4], ['raasta', 4], ['address kaise', 4], ['रास्ता', 5], ['नेविगेशन', 5], ['വഴി', 4],
  ],
  'maps-share-location': [
    ['share location', 5], ['share my location', 5], ['send location', 5], ['send my location', 5], ['where i am', 4], ['live location', 5],
    ['location bhejna', 5], ['location share', 5], ['लोकेशन', 5], ['ലൊക്കേഷൻ', 5],
  ],
};

// The same idea for quick guides: extra plain words that should find them. Guides use plain strings (see lib/guides).
export const EXTRA_GUIDE_KW = {
  'save-contact': ['add number', 'add a number', 'new number', 'store number', 'save phone number', 'number save', 'number save karna', 'नंबर सेव करना', 'कॉन्टैक्ट सेव'],
  'wa-send-photo': ['send picture', 'photo bhejna', 'photo send', 'फोटो भेजना'],
  'wa-voice-message': ['voice note', 'record voice', 'send voice', 'awaaz bhejna', 'आवाज़ भेजना'],
  'wa-create-group': ['new group', 'family group', 'make group', 'group banana', 'ग्रुप बनाना'],
  'gpay-balance': ['bank balance', 'balance check', 'how much money in bank', 'बैलेंस देखना'],
  'gpay-history': ['past payments', 'old payments', 'payment history', 'transaction history', 'did i pay', 'पुराने पेमेंट'],
  'gpay-pay-number': ['pay to number', 'pay phone number', 'pay by number', 'number pe pay', 'नंबर पर पैसे'],
  'upi-report-fraud': ['wrong person', 'wrong number', 'galat number', 'paise galat', 'sent to wrong', 'गलत नंबर', 'गलत आदमी'],
  'qr-gallery': ['qr from gallery', 'qr in photos', 'saved qr', 'qr photo', 'gallery se qr'],
  'uber-cancel': ['cancel cab', 'cancel taxi', 'cancel booking', 'cab cancel', 'cancel my ride'],
  'irctc-cancel': ['cancel train', 'cancel ticket', 'ticket cancel', 'refund ticket', 'टिकट कैंसिल'],
  'irctc-running': ['train late', 'where is train', 'train status', 'train kahan hai', 'ट्रेन कहां'],
  'maps-nearby': ['near me', 'nearby hospital', 'nearest atm', 'nearest hospital', 'medical shop', 'chemist near', 'पास में'],
  'alarm': ['wake me', 'wake up', 'alarm lagana', 'अलार्म लगाना'],
  'emergency-sos': ['emergency', 'sos', 'call police', 'ambulance', 'आपातकाल'],
  'open-link-safe': ['is this link safe', 'suspicious link', 'fake link', 'fake message', 'scam link', 'link safe', 'अजीब लिंक'],
};
