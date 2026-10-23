import { fillMl, localiseMlNames } from './ml';
// "Spot the scam" cards: common Indian scams plus a few genuine messages, so parents learn to tell them apart.
export const SCAMS = [
  {
    id: 'kyc-link',
    kind: 'sms',
    from: 'VM-BNKALR',
    msg: {
      en: 'Dear customer, your bank account will be BLOCKED today. Update your KYC now: http://kyc-update-now.in',
      hi: 'प्रिय ग्राहक, आपका बैंक खाता आज बंद हो जाएगा। अभी KYC अपडेट करें: http://kyc-update-now.in',
    },
    answer: 'scam',
    why: {
      en: 'Banks never send KYC links by SMS. The link is a fake website that steals your details.',
      hi: 'बैंक SMS में KYC का लिंक कभी नहीं भेजते। यह नकली वेबसाइट है, जो आपकी जानकारी चुराती है।',
    },
    todo: {
      en: 'Do not tap the link. If worried, go to your branch or call the number on your passbook.',
      hi: 'लिंक मत दबाइए। चिंता हो, तो बैंक की शाखा जाइए या पासबुक पर छपे नंबर पर फ़ोन कीजिए।',
    },
  },
  {
    id: 'otp-genuine',
    kind: 'sms',
    from: 'AX-BANK',
    msg: {
      en: '482913 is your OTP to log in to your bank app. Do not share it with anyone. Bank never asks for OTP.',
      hi: '482913 आपके बैंक ऐप में लॉगिन का OTP है। इसे किसी से साझा न करें। बैंक कभी OTP नहीं मांगता।',
    },
    context: { en: 'You just tried to open your bank app yourself.', hi: 'आपने अभी खुद अपना बैंक ऐप खोलने की कोशिश की है।' },
    answer: 'safe',
    why: {
      en: 'This is a real message, because YOU just asked for it. Type the OTP only into your own app.',
      hi: 'यह असली मैसेज है, क्योंकि आपने खुद इसे मंगवाया। OTP सिर्फ़ अपने ऐप में डालिए।',
    },
    todo: {
      en: 'Never read an OTP out to anyone on a call, even if they say they are from the bank.',
      hi: 'फ़ोन पर किसी को भी OTP मत बताइए, चाहे वो खुद को बैंक वाला कहे।',
    },
  },
  {
    id: 'bank-call-otp',
    kind: 'call',
    from: '+91 70xxx xxx21',
    msg: {
      en: '"Madam, I am calling from your bank. Someone is misusing your card. To block it, tell me the OTP you just received."',
      hi: '"मैडम, मैं आपके बैंक से बोल रहा हूँ। कोई आपके कार्ड का गलत इस्तेमाल कर रहा है। इसे बंद करने के लिए अभी आया OTP बताइए।"',
    },
    answer: 'scam',
    why: {
      en: 'No real bank asks for your OTP. The OTP is the key to your money.',
      hi: 'कोई भी असली बैंक OTP नहीं मांगता। OTP आपके पैसों की चाबी है।',
    },
    todo: { en: 'Cut the call. Call your bank yourself using the number on your card.', hi: 'फ़ोन काटिए। कार्ड पर छपे नंबर पर खुद बैंक को फ़ोन कीजिए।' },
  },
  {
    id: 'son-known',
    kind: 'whatsapp',
    from: 'Rahul (Beta)',
    saved: true,
    msg: { en: 'Mummy, I will reach home by 7. Keep dinner ready 😊', hi: 'मम्मी, मैं 7 बजे तक घर पहुँच जाऊँगा। खाना तैयार रखना 😊' },
    answer: 'safe',
    why: {
      en: 'It comes from your son\'s saved number and asks for nothing. Normal family message.',
      hi: 'यह आपके बेटे के सेव किए हुए नंबर से है और कुछ नहीं मांग रहा। आम पारिवारिक मैसेज है।',
    },
    todo: { en: 'Nothing to worry about. Reply as usual!', hi: 'चिंता की कोई बात नहीं। हमेशा की तरह जवाब दीजिए!' },
  },
  {
    id: 'new-number',
    kind: 'whatsapp',
    from: '+91 89xxx xxx47',
    msg: {
      en: 'Mummy this is my new number, my phone broke. Very urgent, please send ₹15,000 to this UPI ID now. Will explain later.',
      hi: 'मम्मी, यह मेरा नया नंबर है, फ़ोन टूट गया। बहुत ज़रूरी है, अभी इस UPI ID पर ₹15,000 भेज दो। बाद में बताता हूँ।',
    },
    answer: 'scam',
    why: {
      en: 'Scammers pretend to be your child from a new number and rush you to pay.',
      hi: 'धोखेबाज़ नए नंबर से आपका बच्चा बनकर जल्दी पैसे भेजने का दबाव डालते हैं।',
    },
    todo: {
      en: 'Call your child on their OLD number first. Never pay before you have spoken to them.',
      hi: 'पहले बच्चे के पुराने नंबर पर फ़ोन कीजिए। बात किए बिना पैसे मत भेजिए।',
    },
  },
  {
    id: 'courier',
    kind: 'call',
    from: '+91 98xxx xxx10',
    msg: {
      en: '"This is the customs office. A parcel in your name has illegal items. Pay a ₹25,000 fine now or police will come."',
      hi: '"यह कस्टम दफ़्तर है। आपके नाम के पार्सल में गैरकानूनी सामान मिला है। अभी ₹25,000 जुर्माना भरिए, वरना पुलिस आएगी।"',
    },
    answer: 'scam',
    why: {
      en: 'Government offices never demand fines on a phone call. Fear and hurry are the trick.',
      hi: 'सरकारी दफ़्तर फ़ोन पर जुर्माना नहीं मांगते। डराना और जल्दी करवाना ही इनकी चाल है।',
    },
    todo: { en: 'Cut the call, tell your family, and report it on 1930.', hi: 'फ़ोन काटिए, परिवार को बताइए, और 1930 पर शिकायत कीजिए।' },
  },
  {
    id: 'debit-alert',
    kind: 'sms',
    from: 'AX-BANK',
    msg: {
      en: 'Rs 50.00 debited from A/c XX4321 to SUNRISE GENERAL STORE via UPI. Not you? Call the number on the back of your card.',
      hi: 'आपके खाते XX4321 से UPI द्वारा SUNRISE GENERAL STORE को ₹50 कटे। आपने नहीं किया? कार्ड के पीछे लिखे नंबर पर फ़ोन करें।',
    },
    context: { en: 'You just paid ₹50 at Sunrise General Store.', hi: 'आपने अभी सनराइज़ जनरल स्टोर पर ₹50 दिए हैं।' },
    answer: 'safe',
    why: {
      en: 'This is a normal payment alert for something you just did. It asks you for nothing.',
      hi: 'यह आपके किए हुए पेमेंट का आम अलर्ट है। यह आपसे कुछ नहीं मांगता।',
    },
    todo: {
      en: 'Read these alerts. If one shows a payment you did not make, call your bank at once.',
      hi: 'ऐसे अलर्ट पढ़िए। कोई ऐसा पेमेंट दिखे जो आपने नहीं किया, तो तुरंत बैंक को फ़ोन कीजिए।',
    },
  },
  {
    id: 'job',
    kind: 'whatsapp',
    from: '+1 (555) 014-2290',
    msg: {
      en: 'Hello! Part-time work from home. Earn ₹5,000 a day just by liking YouTube videos. Reply YES to join.',
      hi: 'नमस्ते! घर बैठे पार्ट-टाइम काम। सिर्फ़ YouTube वीडियो लाइक करके रोज़ ₹5,000 कमाएं। जुड़ने के लिए YES लिखें।',
    },
    answer: 'scam',
    why: {
      en: 'Easy money for simple tasks is a trap. Later they ask you to "invest" and your money is gone.',
      hi: 'आसान काम के बदले आसान पैसा जाल है। बाद में "निवेश" करवाते हैं और पैसा डूब जाता है।',
    },
    todo: { en: 'Do not reply. Block and report the number in WhatsApp.', hi: 'जवाब मत दीजिए। WhatsApp में नंबर को Block और Report कीजिए।' },
  },
  {
    id: 'mistake-credit',
    kind: 'sms',
    from: '+91 63xxx xxx08',
    msg: {
      en: 'Rs 2,000 credited to your account by mistake. Please return it to 98xxxxxx12 on UPI. Thank you.',
      hi: 'गलती से आपके खाते में ₹2,000 आ गए हैं। कृपया UPI से 98xxxxxx12 पर लौटा दें। धन्यवाद।',
    },
    answer: 'scam',
    why: {
      en: 'Real bank messages never come from a normal mobile number. Often no money came at all.',
      hi: 'असली बैंक के मैसेज आम मोबाइल नंबर से नहीं आते। अक्सर कोई पैसा आया ही नहीं होता।',
    },
    todo: {
      en: 'Check your own bank balance or transaction history. Never send money back to a stranger.',
      hi: 'अपना बैलेंस या transaction history खुद देखिए। किसी अनजान को पैसे वापस मत भेजिए।',
    },
  },
  {
    id: 'lottery',
    kind: 'sms',
    from: '+91 70xxx xxx99',
    msg: {
      en: 'CONGRATULATIONS! You have won ₹25 LAKH in the lucky draw. Pay ₹5,000 processing fee to claim your prize.',
      hi: 'बधाई हो! आपने लकी ड्रॉ में ₹25 लाख जीते हैं। इनाम पाने के लिए ₹5,000 प्रोसेसिंग फ़ीस भरें।',
    },
    answer: 'scam',
    why: {
      en: 'You cannot win a lottery you never entered, and real prizes never ask you to pay first.',
      hi: 'जिस लॉटरी में आपने हिस्सा ही नहीं लिया, वो आप जीत नहीं सकते। असली इनाम के लिए पहले पैसे नहीं देने पड़ते।',
    },
    todo: { en: 'Delete it. Never pay to receive money.', hi: 'मैसेज डिलीट कीजिए। पैसे पाने के लिए कभी पैसे मत दीजिए।' },
  },
];

fillMl(SCAMS);
localiseMlNames(SCAMS);
