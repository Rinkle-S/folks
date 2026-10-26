// Plain-words pass for older parents: shorter sentences, one idea at a time, no jargon.
// Each rule finds a lesson sentence by its English text and swaps in the plainer wording
// (English, Hindi and Malayalam together). Applied in lessons.js before Malayalam is filled in.
import { ML } from './ml';

const AMOUNT = /^Google Pay shows which bank account the money will go from\. Tap 'Pay ₹([\d,]+)'\.$/;

const PIN_NEW = {
  en: 'Now type the UPI PIN. For practice, press 1, 2, 3, 4. Never tell your real PIN to anyone.',
  hi: 'अब UPI PIN डालिए। अभ्यास के लिए 1, 2, 3, 4 दबाइए। असली PIN किसी को कभी न बताइए।',
  ml: 'ഇനി UPI PIN അടിക്കൂ. പരിശീലനത്തിന് 1, 2, 3, 4 അമർത്തൂ. യഥാർത്ഥ PIN ആരോടും പറയരുത്.',
};
const PIN_REAL_NEW = {
  en: 'Type your own UPI PIN. Cover the screen with your hand. Never tell your PIN to anyone.',
  hi: 'अपना UPI PIN डालिए। स्क्रीन को हाथ से ढक लीजिए। PIN किसी को न बताइए।',
  ml: 'നിങ്ങളുടെ സ്വന്തം UPI PIN അടിക്കൂ. കൈ കൊണ്ട് സ്ക്രീൻ മറയ്ക്കൂ. PIN ആരോടും പറയരുത്.',
};

const FIND = (name, enLook, hiLook, mlLook, mlName = name) => ({
  en: `Find the ${name} icon on your phone. ${enLook} Tap it.`,
  hi: `फ़ोन में ${name} का निशान ढूंढिए। ${hiLook} उसे दबाइए।`,
  ml: `ഫോണിൽ ${mlName} അടയാളം കണ്ടെത്തൂ. ${mlLook} അത് അമർത്തൂ.`,
});

// [old English, new { en, hi, ml }]
const RULES = [
  // ---- find the app (first step of every lesson)
  [
    "First, find Google Pay on your phone. Its icon is a white square with a colourful shape in blue, red, yellow and green, and 'Google Pay' or 'GPay' is written under it. Tap it.",
    FIND(
      'Google Pay',
      "It is white, with a blue, red, yellow and green shape. The name is written under it.",
      'वह सफ़ेद है, उस पर नीला, लाल, पीला और हरा निशान है। नीचे नाम लिखा है।',
      'അത് വെള്ള നിറമാണ്, നീല, ചുവപ്പ്, മഞ്ഞ, പച്ച നിറത്തിലുള്ള അടയാളം ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും.'
    ),
  ],
  [
    "First, find WhatsApp on your phone. Its icon is green, with a white phone inside a speech bubble, and 'WhatsApp' is written under it. Tap it.",
    FIND(
      'WhatsApp',
      'It is green, with a white phone in the middle. The name is written under it.',
      'वह हरा है, बीच में सफ़ेद फ़ोन है। नीचे नाम लिखा है।',
      'അത് പച്ച നിറമാണ്, നടുവിൽ വെള്ള ഫോൺ ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും.'
    ),
  ],
  [
    "First, find YouTube on your phone. Its icon is white with a red rectangle in the middle, and a white triangle inside it. 'YouTube' is written under it. Tap it.",
    FIND(
      'YouTube',
      'It has a red box in the middle, with a white triangle inside. The name is written under it.',
      'उसके बीच में लाल डिब्बा है, उसमें सफ़ेद तिकोना है। नीचे नाम लिखा है।',
      'അതിന്റെ നടുവിൽ ചുവന്ന പെട്ടി ഉണ്ട്, അതിനുള്ളിൽ വെള്ള ത്രികോണം. താഴെ പേര് എഴുതിയിരിക്കും.'
    ),
  ],
  [
    "First, find Uber on your phone. Its icon is black with the word 'Uber' in white, and 'Uber' is written under it. Tap it.",
    FIND(
      'Uber',
      "It is black, with the word 'Uber' in white. The name is written under it too.",
      "वह काला है, उस पर सफ़ेद में 'Uber' लिखा है। नीचे भी नाम लिखा है।",
      "അത് കറുപ്പ് നിറമാണ്, വെള്ള അക്ഷരത്തിൽ 'Uber' എന്ന് എഴുതിയിട്ടുണ്ട്. താഴെയും പേര് ഉണ്ടാകും."
    ),
  ],
  [
    "First, find Rapido on your phone. Its icon is bright yellow with the word 'rapido' in black, and 'Rapido' is written under it. Tap it.",
    FIND(
      'Rapido',
      "It is bright yellow, with 'rapido' written in black. The name is written under it too.",
      "वह चमकीला पीला है, उस पर काले में 'rapido' लिखा है। नीचे भी नाम लिखा है।",
      "അത് തിളങ്ങുന്ന മഞ്ഞ നിറമാണ്, കറുത്ത അക്ഷരത്തിൽ 'rapido' എന്ന് എഴുതിയിട്ടുണ്ട്. താഴെയും പേര് ഉണ്ടാകും."
    ),
  ],
  [
    "First, find Swiggy on your phone. Its icon is orange with a white shape like a map pin, and 'Swiggy' is written under it. Tap it.",
    FIND(
      'Swiggy',
      'It is orange, with a white shape like a map pin. The name is written under it.',
      'वह नारंगी है, उसमें सफ़ेद रंग का जगह बताने वाला निशान है। नीचे नाम लिखा है।',
      'അത് ഓറഞ്ച് നിറമാണ്, വെള്ള നിറത്തിലുള്ള മാപ്പ് പിൻ പോലത്തെ അടയാളം ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും.'
    ),
  ],
  [
    "First, find Google Drive on your phone. Its icon is a triangle in green, yellow and blue, and 'Drive' is written under it. Tap it.",
    FIND(
      'Google Drive',
      "It is a triangle in green, yellow and blue. 'Drive' is written under it.",
      "वह हरे, पीले और नीले रंग का तिकोना है। नीचे 'Drive' लिखा है।",
      "അത് പച്ച, മഞ്ഞ, നീല നിറത്തിലുള്ള ത്രികോണമാണ്. താഴെ 'Drive' എന്ന് എഴുതിയിരിക്കും."
    ),
  ],
  [
    "Look at the names written under the icons. If you can't see it on your phone, swipe up from the bottom to see all apps.",
    {
      en: "Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.",
      hi: 'निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।',
      ml: 'അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.',
    },
  ],

  // ---- shared payment steps
  ['Now enter the UPI PIN. For practice, press 1, 2, 3, 4. Remember: enter your real PIN only in your own payment app, and never tell anyone.', PIN_NEW],
  ['Enter your own UPI PIN. Cover the screen with your hand, and never tell your PIN to anyone.', PIN_REAL_NEW],
  [
    AMOUNT,
    (m) => ({
      en: `The money will go from your bank account. Tap 'Pay ₹${m[1]}'.`,
      hi: `पैसे आपके बैंक खाते से जाएंगे। 'Pay ₹${m[1]}' दबाइए।`,
      ml: `പണം നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ടിൽ നിന്ന് പോകും. 'Pay ₹${m[1]}' അമർത്തൂ.`,
    }),
  ],

  [
    'Now type the consumer number from your bill. For practice, type 4, 5, 2, 1, 8, 7.',
    {
      en: 'Now type the customer number from your paper bill. For practice, type 4, 5, 2, 1, 8, 7.',
      hi: 'अब कागज़ के बिल से ग्राहक नंबर लिखिए। अभ्यास के लिए 4, 5, 2, 1, 8, 7 लिखिए।',
      ml: 'ഇനി പേപ്പർ ബില്ലിലെ കസ്റ്റമർ നമ്പർ അടിക്കൂ. പരിശീലനത്തിന് 4, 5, 2, 1, 8, 7 അടിക്കൂ.',
    },
  ],
  [
    'Type the consumer number from your paper bill.',
    {
      en: 'Type the customer number from your paper bill.',
      hi: 'कागज़ के बिल से ग्राहक नंबर लिखिए।',
      ml: 'പേപ്പർ ബില്ലിലെ കസ്റ്റമർ നമ്പർ അടിക്കൂ.',
    },
  ],
  // ---- intros: one short idea per sentence
  [
    "Hello! Today we'll learn to pay 50 rupees at a shop by scanning a QR code on Google Pay. This is only practice, so no real money will be used. Take your time.",
    {
      en: "Hello! Today we'll pay 50 rupees at a shop with a QR code. This is only practice. No real money. Take your time.",
      hi: 'नमस्ते! आज हम QR कोड से दुकान पर 50 रुपये देना सीखेंगे। यह सिर्फ़ अभ्यास है। असली पैसे नहीं लगेंगे। आराम से कीजिए।',
      ml: 'നമസ്കാരം! ഇന്ന് QR കോഡ് കൊണ്ട് കടയിൽ 50 രൂപ അടയ്ക്കാൻ പഠിക്കാം. ഇത് പരിശീലനം മാത്രം. യഥാർത്ഥ പണം പോകില്ല. സാവധാനം ചെയ്യൂ.',
    },
  ],
  [
    "The camera is open. In real life you'd point your phone at the shop's QR code. For practice, tap the QR code to scan it.",
    {
      en: "The camera is open. In real life, you point it at the shop's QR code. Now, tap the QR code on the screen.",
      hi: 'कैमरा खुल गया। असल में आप इसे दुकान के QR कोड की तरफ़ करते हैं। अभी स्क्रीन पर QR कोड दबाइए।',
      ml: 'ക്യാമറ തുറന്നു. സാധാരണ ഇത് കടയിലെ QR കോഡിന് നേരെ പിടിക്കും. ഇപ്പോൾ സ്ക്രീനിലെ QR കോഡ് അമർത്തൂ.',
    },
  ],
  [
    "Today we'll learn to send 500 rupees to Sunita Didi on Google Pay. This is only practice, so no real money moves.",
    {
      en: "Today we'll send 500 rupees to Sunita Didi on Google Pay. This is only practice. No real money moves.",
      hi: 'आज हम Google Pay पर सुनीता दीदी को 500 रुपये भेजना सीखेंगे। यह सिर्फ़ अभ्यास है। असली पैसे नहीं जाएंगे।',
      ml: 'ഇന്ന് Google Pay-ൽ സുനിത ദീദിക്ക് 500 രൂപ അയയ്ക്കാൻ പഠിക്കാം. ഇത് പരിശീലനം മാത്രം. യഥാർത്ഥ പണം പോകില്ല.',
    },
  ],
  [
    "Today we'll learn to recharge your own mobile number on Google Pay. This is only practice, so no real money is used.",
    {
      en: "Today we'll recharge your mobile number on Google Pay. This is only practice. No real money.",
      hi: 'आज हम Google Pay पर आपके मोबाइल नंबर का रिचार्ज करना सीखेंगे। यह सिर्फ़ अभ्यास है। असली पैसे नहीं लगेंगे।',
      ml: 'ഇന്ന് Google Pay-ൽ നിങ്ങളുടെ മൊബൈൽ നമ്പർ റീചാർജ് ചെയ്യാൻ പഠിക്കാം. ഇത് പരിശീലനം മാത്രം. യഥാർത്ഥ പണം പോകില്ല.',
    },
  ],
  [
    'Ramesh Bhaiya sent the electricity bill as a PDF two weeks ago. Today we\'ll learn to find it, without scrolling up and up. This is practice; no message will be sent.',
    {
      en: "Ramesh Bhaiya sent the electricity bill two weeks ago, as a PDF. Today we'll find it quickly, without scrolling. This is practice. No message will be sent.",
      hi: 'रमेश भैया ने दो हफ़्ते पहले बिजली का बिल PDF में भेजा था। आज हम उसे बिना ऊपर-ऊपर घुमाए जल्दी ढूंढेंगे। यह अभ्यास है। कोई संदेश नहीं जाएगा।',
      ml: 'രണ്ട് ആഴ്ച മുമ്പ് രമേഷ് ഭയ്യ കറന്റ് ബിൽ PDF ആയി അയച്ചിരുന്നു. ഇന്ന് മുകളിലേക്ക് സ്ക്രോൾ ചെയ്യാതെ അത് വേഗം കണ്ടെത്താം. ഇത് പരിശീലനം മാത്രം. സന്ദേശം പോകില്ല.',
    },
  ],
  [
    "The bill is far up in old messages, but you don't need to scroll. Tap their name 'Ramesh Bhaiya' at the very top.",
    {
      en: "The bill is far up in old messages. You don't need to scroll. Tap the name 'Ramesh Bhaiya' at the very top.",
      hi: "बिल बहुत पुराने संदेशों में ऊपर है। ऊपर घुमाने की ज़रूरत नहीं। सबसे ऊपर 'Ramesh Bhaiya' नाम दबाइए।",
      ml: "ബിൽ പഴയ സന്ദേശങ്ങളിൽ വളരെ മുകളിലാണ്. സ്ക്രോൾ ചെയ്യേണ്ട. ഏറ്റവും മുകളിലെ 'Ramesh Bhaiya' എന്ന പേര് അമർത്തൂ.",
    },
  ],
  [
    "Good morning! Today we'll learn to put a 'Good Morning' status on WhatsApp, for all your contacts to see. This is practice, nothing will be posted.",
    {
      en: "Good morning! Today we'll put a 'Good Morning' status on WhatsApp. All your contacts can see it. This is practice. Nothing will be posted.",
      hi: "सुप्रभात! आज हम WhatsApp पर 'Good Morning' स्टेटस लगाना सीखेंगे। आपके सब लोग उसे देख सकेंगे। यह अभ्यास है। कुछ भी पोस्ट नहीं होगा।",
      ml: "സുപ്രഭാതം! ഇന്ന് WhatsApp-ൽ 'Good Morning' സ്റ്റാറ്റസ് ഇടാൻ പഠിക്കാം. നിങ്ങളുടെ എല്ലാ കോൺടാക്റ്റുകൾക്കും അത് കാണാം. ഇത് പരിശീലനം മാത്രം. ഒന്നും പോസ്റ്റ് ആകില്ല.",
    },
  ],
  [
    'To write a text status, tap the small pencil button at the bottom right, just above the green camera button.',
    {
      en: 'To write a status, tap the small pencil button at the bottom right. It is just above the green camera button.',
      hi: 'स्टेटस लिखने के लिए नीचे दाईं तरफ़ छोटा पेंसिल बटन दबाइए। वह हरे कैमरा बटन के ठीक ऊपर है।',
      ml: 'സ്റ്റാറ്റസ് എഴുതാൻ താഴെ വലതുവശത്തെ ചെറിയ പെൻസിൽ ബട്ടൺ അമർത്തൂ. അത് പച്ച ക്യാമറ ബട്ടണിന് തൊട്ടു മുകളിലാണ്.',
    },
  ],
  [
    "Today we'll learn to pay the electricity bill on Google Pay. Keep your paper bill handy, because we'll need the consumer number on it. This is only practice, so no real money is used.",
    {
      en: "Today we'll pay the electricity bill on Google Pay. Keep your paper bill near you. We need the customer number on it. This is only practice. No real money.",
      hi: 'आज हम Google Pay पर बिजली का बिल भरना सीखेंगे। कागज़ का बिल पास रखिए। उस पर लिखा ग्राहक नंबर चाहिए होगा। यह सिर्फ़ अभ्यास है। असली पैसे नहीं लगेंगे।',
      ml: 'ഇന്ന് Google Pay-ൽ കറന്റ് ബിൽ അടയ്ക്കാൻ പഠിക്കാം. പേപ്പർ ബിൽ അടുത്ത് വെക്കൂ. അതിലെ കസ്റ്റമർ നമ്പർ വേണം. ഇത് പരിശീലനം മാത്രം. യഥാർത്ഥ പണം പോകില്ല.',
    },
  ],
  [
    'Pick your electricity board. Its name is printed at the top of your paper bill. For practice, tap State Electricity Board.',
    {
      en: "Pick your electricity board. Its name is at the top of your paper bill. For practice, tap 'State Electricity Board'.",
      hi: "अपना बिजली बोर्ड चुनिए। उसका नाम कागज़ के बिल पर सबसे ऊपर लिखा है। अभ्यास के लिए 'State Electricity Board' दबाइए।",
      ml: "നിങ്ങളുടെ വൈദ്യുതി ബോർഡ് തിരഞ്ഞെടുക്കൂ. അതിന്റെ പേര് പേപ്പർ ബില്ലിന്റെ മുകളിൽ ഉണ്ട്. പരിശീലനത്തിന് 'State Electricity Board' അമർത്തൂ.",
    },
  ],
  [
    'Google Pay found the bill. Before paying, check the name. Your paper bill says Kamala Nair. Is it the same here?',
    {
      en: 'Google Pay found the bill. Check the name before paying. Your paper bill says Kamala Nair. Is it the same here?',
      hi: 'Google Pay को बिल मिल गया। पैसे देने से पहले नाम देखिए। आपके कागज़ के बिल पर कमला नायर लिखा है। क्या यहाँ भी वही है?',
      ml: 'Google Pay-ക്ക് ബിൽ കിട്ടി. പണം അടയ്ക്കുന്നതിന് മുമ്പ് പേര് നോക്കൂ. നിങ്ങളുടെ പേപ്പർ ബില്ലിൽ Kamala Nair എന്നാണ്. ഇവിടെയും അതുതന്നെയാണോ?',
    },
  ],
  [
    "Today we'll learn to video call your son Rahul on WhatsApp. This is practice, so no call will actually be made.",
    {
      en: "Today we'll video call your son Rahul on WhatsApp. This is practice. No real call will go.",
      hi: 'आज हम WhatsApp पर आपके बेटे राहुल को वीडियो कॉल करना सीखेंगे। यह अभ्यास है। असली कॉल नहीं जाएगी।',
      ml: 'ഇന്ന് WhatsApp-ൽ നിങ്ങളുടെ മകൻ രാഹുലിനെ വീഡിയോ കോൾ ചെയ്യാൻ പഠിക്കാം. ഇത് പരിശീലനം മാത്രം. യഥാർത്ഥ കോൾ പോകില്ല.',
    },
  ],
  [
    'At the top right there are two icons: a video camera and a phone. The video camera makes a video call. Tap it.',
    {
      en: 'At the top right, there are two icons: a video camera and a phone. Tap the video camera.',
      hi: 'ऊपर दाईं तरफ़ दो निशान हैं: वीडियो कैमरा और फ़ोन। वीडियो कैमरा दबाइए।',
      ml: 'മുകളിൽ വലതുവശത്ത് രണ്ട് അടയാളങ്ങൾ ഉണ്ട്: വീഡിയോ ക്യാമറയും ഫോണും. വീഡിയോ ക്യാമറ അമർത്തൂ.',
    },
  ],
  [
    'Rahul is on the call! To show him something in front of you, like a plant, flip the camera. Tap the flip camera button.',
    {
      en: 'Rahul is on the call! Let us show him a plant in front of you. Tap the button that turns the camera around.',
      hi: 'राहुल कॉल पर हैं! आपके सामने जो पौधा है, वो उन्हें दिखाते हैं। कैमरा घुमाने वाला बटन दबाइए।',
      ml: 'രാഹുൽ കോളിൽ ഉണ്ട്! നിങ്ങളുടെ മുന്നിലെ ചെടി അവനെ കാണിക്കാം. ക്യാമറ തിരിക്കുന്ന ബട്ടൺ അമർത്തൂ.',
    },
  ],
  [
    "One important thing. A video call comes from someone in police uniform. He says you are under 'digital arrest' and must pay money. What do you do?",
    {
      en: "A video call comes from a man in police uniform. He says you are under 'digital arrest' and must pay money. What do you do?",
      hi: "पुलिस की वर्दी में एक आदमी वीडियो कॉल करता है। कहता है कि आप 'डिजिटल अरेस्ट' में हैं और पैसे देने होंगे। आप क्या करेंगे?",
      ml: "പോലീസ് യൂണിഫോമിൽ ഒരാൾ വീഡിയോ കോൾ ചെയ്യുന്നു. നിങ്ങൾ 'ഡിജിറ്റൽ അറസ്റ്റിൽ' ആണെന്നും പണം അടയ്ക്കണമെന്നും പറയുന്നു. നിങ്ങൾ എന്ത് ചെയ്യും?",
    },
  ],
  [
    "The doctor's office wants your medical report as a PDF. Today we'll learn to scan a paper into a PDF with Google Drive. This is practice, so nothing will be saved.",
    {
      en: "The doctor wants your medical report as a PDF. Today we'll scan a paper into a PDF with Google Drive. This is practice. Nothing will be saved.",
      hi: 'डॉक्टर ने आपकी मेडिकल रिपोर्ट PDF में मांगी है। आज हम Google Drive से कागज़ को PDF बनाना सीखेंगे। यह अभ्यास है। कुछ भी सेव नहीं होगा।',
      ml: 'ഡോക്ടർക്ക് നിങ്ങളുടെ മെഡിക്കൽ റിപ്പോർട്ട് PDF ആയി വേണം. ഇന്ന് Google Drive കൊണ്ട് പേപ്പർ PDF ആക്കാൻ പഠിക്കാം. ഇത് പരിശീലനം മാത്രം. ഒന്നും സേവ് ആകില്ല.',
    },
  ],
  [
    'Keep the paper on a table and hold the phone above it, so the whole page fits in the frame. Then tap the big round button.',
    {
      en: 'Put the paper on a table. Hold the phone above it, so the whole page is on the screen. Then tap the big round button.',
      hi: 'कागज़ को मेज़ पर रखिए। फ़ोन उसके ऊपर पकड़िए, ताकि पूरा पेज स्क्रीन पर आ जाए। फिर बड़ा गोल बटन दबाइए।',
      ml: 'പേപ്പർ മേശപ്പുറത്ത് വെക്കൂ. ഫോൺ അതിന് മുകളിൽ പിടിക്കൂ, മുഴുവൻ പേജും സ്ക്രീനിൽ വരണം. എന്നിട്ട് വലിയ വട്ട ബട്ടൺ അമർത്തൂ.',
    },
  ],
  [
    'Today we\'ll book an Uber cab to City Hospital, check the car, and share the trip with family. This is only practice. No cab will come and no money is spent.',
    {
      en: "Today we'll book an Uber cab to City Hospital, and share the trip with family. This is only practice. No cab will come. No money is spent.",
      hi: 'आज हम Uber से सिटी हॉस्पिटल के लिए कैब बुक करेंगे, और सफ़र परिवार को दिखाएंगे। यह सिर्फ़ अभ्यास है। कोई कैब नहीं आएगी। पैसे नहीं लगेंगे।',
      ml: 'ഇന്ന് Uber-ൽ സിറ്റി ഹോസ്പിറ്റലിലേക്ക് ക്യാബ് ബുക്ക് ചെയ്യാം, യാത്ര വീട്ടുകാരുമായി പങ്കിടാം. ഇത് പരിശീലനം മാത്രം. ക്യാബ് വരില്ല. പണം പോകില്ല.',
    },
  ],
  [
    'Uber shows the rides and their fares before you book. Uber Go is a small car for 186 rupees. Tap \'Uber Go\'.',
    {
      en: "Uber shows the fare before you book. Uber Go is a small car for 186 rupees. Tap 'Uber Go'.",
      hi: "Uber बुक करने से पहले किराया दिखाता है। Uber Go छोटी गाड़ी है, 186 रुपये की। 'Uber Go' दबाइए।",
      ml: "ബുക്ക് ചെയ്യുന്നതിന് മുമ്പ് Uber കൂലി കാണിക്കും. Uber Go ഒരു ചെറിയ കാർ ആണ്, 186 രൂപ. 'Uber Go' അമർത്തൂ.",
    },
  ],
  [
    "It says 'Cash' at the bottom, so you pay the driver in cash at the end. Now tap the black 'Choose Uber Go' button.",
    {
      en: "It says 'Cash' at the bottom. You will pay the driver in cash. Now tap the black 'Choose Uber Go' button.",
      hi: "नीचे 'Cash' लिखा है। आप ड्राइवर को नकद देंगे। अब काला 'Choose Uber Go' बटन दबाइए।",
      ml: "താഴെ 'Cash' എന്ന് ഉണ്ട്. ഡ്രൈവർക്ക് പണമായി കൊടുക്കാം. ഇനി കറുത്ത 'Choose Uber Go' ബട്ടൺ അമർത്തൂ.",
    },
  ],
  [
    'Your driver Rakesh is coming in a white Swift Dzire, number D L 3 C A B 1 2 3 4. A white car stops in front of you. What should you do first?',
    {
      en: 'Your driver Rakesh is coming in a white Swift Dzire, number D L 3 C A B 1 2 3 4. A white car stops near you. What do you do first?',
      hi: 'आपके ड्राइवर राकेश सफ़ेद Swift Dzire में आ रहे हैं, नंबर D L 3 C A B 1 2 3 4। एक सफ़ेद गाड़ी आपके पास रुकती है। सबसे पहले क्या करेंगे?',
      ml: 'നിങ്ങളുടെ ഡ്രൈവർ രാകേഷ് വെള്ള Swift Dzire-ൽ വരുന്നു, നമ്പർ D L 3 C A B 1 2 3 4. ഒരു വെള്ള കാർ നിങ്ങളുടെ അടുത്ത് നിർത്തുന്നു. ആദ്യം എന്ത് ചെയ്യും?',
    },
  ],
  [
    "Today we'll book an auto to the railway station with Rapido, and pay in cash. This is only practice. No auto will come.",
    {
      en: "Today we'll book an auto to the railway station with Rapido. You pay in cash. This is only practice. No auto will come.",
      hi: 'आज हम Rapido से रेलवे स्टेशन के लिए ऑटो बुक करेंगे। पैसे नकद देने होंगे। यह सिर्फ़ अभ्यास है। कोई ऑटो नहीं आएगा।',
      ml: 'ഇന്ന് Rapido-യിൽ റെയിൽവേ സ്റ്റേഷനിലേക്ക് ഓട്ടോ ബുക്ക് ചെയ്യാം. പണമായി കൊടുക്കാം. ഇത് പരിശീലനം മാത്രം. ഓട്ടോ വരില്ല.',
    },
  ],
  [
    'Rapido calls the driver a captain. Manjunath is coming in auto number K A 0 1 A B 4 5 2 1. When he arrives, he asks for your OTP, 5 1 7 2. What do you do?',
    {
      en: 'Rapido calls the driver a captain. Manjunath comes in auto number K A 0 1 A B 4 5 2 1. He asks for your OTP. That is a secret code to start the ride: 5 1 7 2. What do you do?',
      hi: 'Rapido ड्राइवर को captain कहता है। मंजुनाथ ऑटो नंबर K A 0 1 A B 4 5 2 1 में आते हैं। वो आपसे OTP मांगते हैं। यह सवारी शुरू करने का गुप्त कोड है: 5 1 7 2। आप क्या करेंगे?',
      ml: 'Rapido ഡ്രൈവറെ captain എന്ന് വിളിക്കും. മഞ്ജുനാഥ് ഓട്ടോ നമ്പർ K A 0 1 A B 4 5 2 1-ൽ വരുന്നു. അദ്ദേഹം OTP ചോദിക്കുന്നു. യാത്ര തുടങ്ങാനുള്ള രഹസ്യ കോഡ് ആണത്: 5 1 7 2. നിങ്ങൾ എന്ത് ചെയ്യും?',
    },
  ],
  [
    "Here you type what you want, or tap the mic and say it. We've typed 'old songs' for you. Tap the first suggestion.",
    {
      en: "You can type here, or tap the mic and speak. We have typed 'old songs' for you. Tap the first line.",
      hi: "यहाँ लिख सकते हैं, या माइक दबाकर बोल सकते हैं। हमने 'old songs' लिख दिया है। पहली लाइन दबाइए।",
      ml: "ഇവിടെ എഴുതാം, അല്ലെങ്കിൽ മൈക്ക് അമർത്തി പറയാം. നിങ്ങൾക്കായി 'old songs' എഴുതിയിട്ടുണ്ട്. ആദ്യത്തെ വരി അമർത്തൂ.",
    },
  ],
  [
    'Your song is playing. To see it bigger, tap the full screen button: the square corners at the bottom right of the video.',
    {
      en: 'Your song is playing. To make it bigger, tap the full screen button at the bottom right of the video. It looks like four corners.',
      hi: 'आपका गाना चल रहा है। इसे बड़ा करने के लिए वीडियो के नीचे दाईं तरफ़ फ़ुल स्क्रीन बटन दबाइए। वो चार कोनों जैसा दिखता है।',
      ml: 'നിങ്ങളുടെ പാട്ട് പ്ലേ ആകുന്നു. വലുതാക്കാൻ വീഡിയോയുടെ താഴെ വലതുവശത്തെ ഫുൾ സ്ക്രീൻ ബട്ടൺ അമർത്തൂ. അത് നാല് മൂലകൾ പോലെ ഇരിക്കും.',
    },
  ],
  [
    "Today we'll order two idlis from a nearby restaurant on Swiggy, and pay cash when the food arrives. This is only practice. No food will come.",
    {
      en: "Today we'll order two idlis on Swiggy. You pay cash when the food comes. This is only practice. No food will come.",
      hi: 'आज हम Swiggy पर दो इडली मंगाएंगे। खाना आने पर नकद पैसे देंगे। यह सिर्फ़ अभ्यास है। कोई खाना नहीं आएगा।',
      ml: 'ഇന്ന് Swiggy-യിൽ രണ്ട് ഇഡ്ഡലി ഓർഡർ ചെയ്യാം. ഭക്ഷണം വരുമ്പോൾ പണമായി കൊടുക്കാം. ഇത് പരിശീലനം മാത്രം. ഭക്ഷണം വരില്ല.',
    },
  ],
];

// Walks lesson data and swaps in the plain wording. Run once, before Malayalam is filled in.
export function applyPlain(node) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) return node.forEach(applyPlain);
  if ('en' in node && 'hi' in node && typeof node.en === 'string') {
    for (const [key, val] of RULES) {
      let r = null;
      if (typeof key === 'string') {
        if (key === node.en) r = val;
      } else {
        const m = node.en.match(key);
        if (m) r = val(m);
      }
      if (r) {
        node.en = r.en;
        node.hi = r.hi;
        ML[r.en] = r.ml;
        break;
      }
    }
    return;
  }
  Object.values(node).forEach(applyPlain);
}
