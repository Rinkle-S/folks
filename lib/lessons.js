import { MORE_LESSONS, MORE_KEYWORDS, MORE_REAL } from './lessonsMore';
import { PHONE_LESSONS, PHONE_KEYWORDS } from './lessonsPhone';
import { APP1_LESSONS, APP1_KEYWORDS } from './lessonsApps1';
import { APP2_LESSONS, APP2_KEYWORDS } from './lessonsApps2';
import { APP3_LESSONS, APP3_KEYWORDS } from './lessonsApps3';
import { GUIDE_LESSONS } from './lessonsGuides';
import { applyKitOverrides } from './kitOverrides';
import { fillMl, localiseMlNames, ML_KEYWORDS } from './ml';
import { applyPlain } from './plain';
import { applyAnyPin } from './practicePin';
import { applyQuizFocus } from './quizFocus';
// All lesson content lives here. Adding a lesson = adding data, not code.
// Each step: { id, screen, kind: 'info' | 'tap' | 'input' | 'quiz', say, hint, ... }
// Text is { en, hi } so every lesson works in English and Hindi.
// lesson.app says which app the practice screens copy, so a later "child picks the parent's app"
// setting can offer other versions (e.g. PhonePe, Paytm).

const scamCollect = {
  quiz: {
    id: 'scam-quiz',
    screen: 'gp-home',
    request: true,
    kind: 'quiz',
    say: {
      en: "One important thing. Someone calls and says: 'I'm sending you 5,000 rupees, just enter your PIN.' Then this request appears. Should you enter your PIN?",
      hi: "एक ज़रूरी बात। किसी ने फ़ोन करके कहा: 'आपको 5000 रुपये भेज रहा हूँ, बस PIN डाल दीजिए।' और यह request आ गई। क्या PIN डालना चाहिए?",
    },
    options: [
      {
        text: { en: "Yes, I'll get the money", hi: 'हाँ, पैसे मिलेंगे' },
        correct: false,
        why: {
          en: 'No! You never need a PIN to receive money. If you enter it, money leaves your account.',
          hi: 'नहीं! पैसे लेने के लिए PIN कभी नहीं लगता। PIN डाला, तो आपके ही पैसे कटेंगे।',
        },
      },
      {
        text: { en: 'No, a PIN is only for paying', hi: 'नहीं, PIN सिर्फ़ पैसे देने के लिए है' },
        correct: true,
        why: {
          en: 'Well done! You never need a PIN to receive money.',
          hi: 'शाबाश! पैसे लेने के लिए PIN कभी नहीं लगता।',
        },
      },
    ],
  },
  decline: {
    id: 'decline',
    screen: 'gp-home',
    request: true,
    kind: 'tap',
    target: 'decline',
    say: {
      en: "Now refuse this request. Tap 'Decline'.",
      hi: "अब इस request को मना कीजिए, 'Decline' दबाइए।",
    },
    hint: {
      en: "Not 'Pay'! Tap the 'Decline' button on the left.",
      hi: "'Pay' नहीं! बाईं तरफ़ का 'Decline' बटन दबाइए।",
    },
  },
};

// The shared "pay from Google Pay" steps: amount → arrow → choose account → PIN → tick → success.
function gpayPaySteps({ amount, typeAmount = true, doneSay }) {
  const digits = amount.split('').join(', ');
  const steps = [];
  if (typeAmount) {
    steps.push(
      {
        id: 'amount',
        screen: 'gp-amount',
        kind: 'input',
        field: 'amount',
        expected: amount,
        say: {
          en: `Now type the amount. Press ${digits}. That makes ${amount} rupees.`,
          hi: `अब रकम लिखिए। ${digits} दबाइए। यानी ${amount} रुपये।`,
        },
        hint: { en: 'Press the glowing button.', hi: 'जो बटन चमक रहा है, वही दबाइए।' },
      },
      {
        id: 'arrow',
        screen: 'gp-amount',
        kind: 'tap',
        target: 'next',
        say: {
          en: `${amount} rupees is entered. Now tap the round blue arrow button.`,
          hi: `${amount} रुपये लिख गए। अब गोल नीले तीर वाला बटन दबाइए।`,
        },
        hint: {
          en: 'Tap the round blue button with the arrow, on the right.',
          hi: 'दाईं तरफ़ गोल नीला तीर वाला बटन दबाइए।',
        },
      }
    );
  }
  steps.push(
    {
      id: 'choose-account',
      screen: 'gp-amount',
      sheet: true,
      kind: 'tap',
      target: 'pay-final',
      say: {
        en: `Google Pay shows which bank account the money will go from. Tap 'Pay ₹${amount}'.`,
        hi: `Google Pay दिखाता है कि किस बैंक खाते से पैसे जाएंगे। 'Pay ₹${amount}' दबाइए।`,
      },
      hint: { en: `Tap the big blue 'Pay ₹${amount}' button.`, hi: `नीचे बड़ा नीला 'Pay ₹${amount}' बटन दबाइए।` },
    },
    {
      id: 'pin',
      screen: 'gp-pin',
      kind: 'input',
      field: 'pin',
      expected: '1234',
      say: {
        en: 'Now enter the UPI PIN. For practice, press 1, 2, 3, 4. Remember: enter your real PIN only in your own payment app, and never tell anyone.',
        hi: 'अब UPI PIN डालना है। अभ्यास के लिए 1, 2, 3, 4 दबाइए। याद रखिए: असली PIN सिर्फ़ अपने पेमेंट ऐप में डालें, और किसी को कभी न बताएं।',
      },
      hint: { en: 'Press the glowing number.', hi: 'चमकता हुआ नंबर दबाइए।' },
    },
    {
      id: 'pin-ok',
      screen: 'gp-pin',
      kind: 'tap',
      target: 'pin-ok',
      say: {
        en: 'Now press the tick at the bottom right to confirm.',
        hi: 'अब पक्का करने के लिए नीचे दाईं तरफ़ सही का निशान दबाइए।',
      },
      hint: { en: 'Press the tick button at the bottom right.', hi: 'नीचे दाईं तरफ़ सही (✓) वाला बटन दबाइए।' },
    },
    {
      id: 'success',
      screen: 'gp-success',
      kind: 'tap',
      target: 'done',
      say: doneSay,
      hint: { en: "Tap the 'Done' button at the bottom.", hi: "नीचे 'Done' बटन दबाइए।" },
    }
  );
  return steps;
}

export const LESSONS = {
  'qr-pay': {
    id: 'qr-pay',
    icon: 'scan',
    app: 'gpay',
    appName: 'Google Pay',
    emoji: '🛒',
    minutes: 3,
    title: { en: 'Pay at a shop by scanning a QR code', hi: 'दुकान पर QR स्कैन करके पेमेंट करें' },
    payee: { name: 'SUNRISE GENERAL STORE', initial: 'S', color: '#5f6368', bank: 'Banking name: SUNRISE GENERAL STORE' },
    takeaways: {
      en: [
        "Start with 'Scan any QR code'",
        "Match the shop's name before you pay",
        'A PIN is only for paying, never for receiving money',
      ],
      hi: [
        "'Scan any QR code' से शुरू करें",
        'पैसे देने से पहले दुकान का नाम मिलाएं',
        'PIN सिर्फ़ पैसे देने के लिए है, पैसे लेने के लिए कभी नहीं',
      ],
    },
    share: { en: 'I learned to pay by scanning a QR code on Folks! 🎉', hi: 'मैंने Folks पर QR स्कैन करके पेमेंट करना सीख लिया! 🎉' },
    realTry: {
      en: 'Next time at a shop, try the same steps on your real Google Pay. If you get stuck, open Folks again.',
      hi: 'अगली बार दुकान पर अपने असली Google Pay में ऐसे ही करके देखिए। कहीं अटकें, तो Folks फिर से खोलिए।',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Hello! Today we'll learn to pay 50 rupees at a shop by scanning a QR code on Google Pay. This is only practice, so no real money will be used. Take your time.",
          hi: 'नमस्ते! आज हम Google Pay से दुकान पर QR कोड स्कैन करके 50 रुपये देना सीखेंगे। यह सिर्फ़ अभ्यास है, असली पैसे नहीं कटेंगे। आराम से कीजिए।',
        },
        button: { en: 'Start', hi: 'शुरू करें' },
      },
      {
        id: 'open-scan',
        screen: 'gp-home',
        kind: 'tap',
        target: 'scan',
        say: {
          en: "This is Google Pay. First, tap 'Scan any QR code', the first button, with the square scanner icon.",
          hi: "यह Google Pay है। सबसे पहले 'Scan any QR code' दबाइए, पहला बटन, चौकोर निशान वाला।",
        },
        hint: {
          en: "Tap the first button on the top left: 'Scan any QR code'. I've made it glow.",
          hi: "ऊपर बाईं तरफ़ पहला बटन 'Scan any QR code' दबाइए। मैंने उसे चमका दिया है।",
        },
      },
      {
        id: 'scan-qr',
        screen: 'gp-scan',
        kind: 'tap',
        target: 'qr',
        say: {
          en: "The camera is open. In real life you'd point your phone at the shop's QR code. For practice, tap the QR code to scan it.",
          hi: 'कैमरा खुल गया। असल में आप फ़ोन को दुकान के QR कोड की ओर करेंगे। अभ्यास में, QR कोड को छूकर स्कैन कीजिए।',
        },
        hint: { en: 'Tap the black-and-white square code in the middle.', hi: 'बीच में जो काला-सफ़ेद चौकोर कोड है, उसे दबाइए।' },
      },
      {
        id: 'check-name',
        screen: 'gp-amount',
        kind: 'quiz',
        say: {
          en: "Wait! Check the name before you pay. The shop's board says 'Sunrise General Store'. Is the same name on the screen?",
          hi: "रुकिए! पैसे देने से पहले नाम देखिए। दुकान के बोर्ड पर लिखा है 'सनराइज़ जनरल स्टोर'। क्या स्क्रीन पर भी वही नाम है?",
        },
        options: [
          {
            text: { en: 'Yes, the name matches', hi: 'हाँ, नाम वही है' },
            correct: true,
            why: {
              en: "Exactly right! Always match the name. If it's different, don't pay.",
              hi: 'बिल्कुल सही! हर बार नाम मिलाइए। नाम अलग हो, तो पैसे मत भेजिए।',
            },
          },
          {
            text: { en: 'No need to check the name', hi: 'नाम देखने की ज़रूरत नहीं' },
            correct: false,
            why: {
              en: 'Checking matters. If the QR is wrong, the money goes to someone else.',
              hi: 'नाम देखना ज़रूरी है। QR गलत हो, तो पैसे किसी और के पास चले जाते हैं।',
            },
          },
        ],
      },
      ...gpayPaySteps({
        amount: '50',
        doneSay: {
          en: "Done! 50 rupees went to Sunrise General Store. You can show this screen to the shopkeeper. Now tap 'Done'.",
          hi: "हो गया! 50 रुपये सनराइज़ जनरल स्टोर को चले गए। यह स्क्रीन दुकानदार को दिखा सकते हैं। अब 'Done' दबाइए।",
        },
      }),
      scamCollect.quiz,
      scamCollect.decline,
    ],
  },

  'send-money': {
    id: 'send-money',
    icon: 'rupee',
    app: 'gpay',
    appName: 'Google Pay',
    emoji: '💸',
    minutes: 3,
    title: { en: 'Send money to someone you know', hi: 'किसी जान-पहचान वाले को पैसे भेजें' },
    payee: { name: 'Sunita Didi', initial: 'S', color: '#e8710a', sub: '+91 98110 24567', bank: 'Banking name: SUNITA SHARMA' },
    takeaways: {
      en: [
        "'Pay contacts' → pick the person → check the name and number",
        "'Pay' sends money, 'Request' asks for money",
        "Never send money back to a stranger who says they paid you 'by mistake'",
      ],
      hi: [
        "'Pay contacts' → व्यक्ति चुनें → नाम और नंबर जांचें",
        "'Pay' से पैसे जाते हैं, 'Request' से पैसे मांगे जाते हैं",
        "जो अनजान व्यक्ति कहे 'गलती से पैसे भेज दिए', उसे पैसे वापस न भेजें",
      ],
    },
    share: { en: 'I learned to send money on Google Pay with Folks! 🎉', hi: 'मैंने Folks पर Google Pay से पैसे भेजना सीख लिया! 🎉' },
    realTry: {
      en: 'Try sending a small amount, like 1 rupee, to your son or daughter on your real Google Pay.',
      hi: 'अपने असली Google Pay से अपने बेटे या बेटी को छोटी रकम, जैसे 1 रुपया, भेजकर देखिए।',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Today we'll learn to send 500 rupees to Sunita Didi on Google Pay. This is only practice, so no real money moves.",
          hi: 'आज हम Google Pay से सुनीता दीदी को 500 रुपये भेजना सीखेंगे। यह सिर्फ़ अभ्यास है, असली पैसे नहीं जाएंगे।',
        },
        button: { en: 'Start', hi: 'शुरू करें' },
      },
      {
        id: 'pay-contacts',
        screen: 'gp-home',
        kind: 'tap',
        target: 'pay-contacts',
        say: {
          en: "Tap 'Pay contacts', the second button at the top.",
          hi: "ऊपर दूसरा बटन 'Pay contacts' दबाइए।",
        },
        hint: { en: "Tap 'Pay contacts', next to the scanner button.", hi: "स्कैनर वाले बटन के बगल में 'Pay contacts' दबाइए।" },
      },
      {
        id: 'pick-contact',
        screen: 'gp-contacts',
        kind: 'tap',
        target: 'c-sunita',
        say: {
          en: "These are your contacts. Tap 'Sunita Didi'. Always check the name and the number.",
          hi: "ये आपके contacts हैं। 'Sunita Didi' दबाइए। हमेशा नाम और नंबर जांच लीजिए।",
        },
        hint: { en: "Tap the 'Sunita Didi' row.", hi: "'Sunita Didi' वाली लाइन दबाइए।" },
      },
      {
        id: 'tap-pay',
        screen: 'gp-chat',
        kind: 'tap',
        target: 'pay',
        say: {
          en: "'Pay' sends money from you. 'Request' asks them to send you money. We want to send, so tap 'Pay'.",
          hi: "'Pay' से आप पैसे भेजते हैं। 'Request' से आप उनसे पैसे मांगते हैं। हमें भेजने हैं, तो 'Pay' दबाइए।",
        },
        hint: { en: "Tap the blue 'Pay' button at the bottom, not 'Request'.", hi: "नीचे नीला 'Pay' बटन दबाइए, 'Request' नहीं।" },
      },
      ...gpayPaySteps({
        amount: '500',
        doneSay: {
          en: "Done! 500 rupees reached Sunita Didi. Tap 'Done'.",
          hi: "हो गया! 500 रुपये सुनीता दीदी को पहुँच गए। 'Done' दबाइए।",
        },
      }),
      {
        id: 'mistake-scam',
        screen: 'gp-home',
        kind: 'quiz',
        say: {
          en: "One more thing. A stranger calls: 'I sent you 2,000 rupees by mistake, please send it back.' What should you do?",
          hi: "एक और बात। कोई अनजान व्यक्ति फ़ोन करके कहता है: 'मैंने गलती से आपको 2000 रुपये भेज दिए, वापस भेज दीजिए।' आपको क्या करना चाहिए?",
        },
        options: [
          {
            text: { en: 'Send it back right away', hi: 'तुरंत वापस भेज दूँ' },
            correct: false,
            why: {
              en: "Don't! This is a common scam. Often no money came at all.",
              hi: 'ऐसा मत कीजिए! यह आम धोखा है। अक्सर कोई पैसा आया ही नहीं होता।',
            },
          },
          {
            text: {
              en: 'First check my own transaction history, and ask my son or daughter',
              hi: 'पहले अपनी transaction history देखूँ, और बेटे/बेटी से पूछूँ',
            },
            correct: true,
            why: {
              en: "Right! Check 'See transaction history' yourself. Never send money back just because a stranger called.",
              hi: "सही! खुद 'See transaction history' में देखिए। किसी अनजान के फ़ोन पर पैसे वापस मत भेजिए।",
            },
          },
        ],
      },
    ],
  },

  recharge: {
    id: 'recharge',
    icon: 'recharge',
    app: 'gpay',
    appName: 'Google Pay',
    emoji: '📶',
    minutes: 2,
    title: { en: 'Recharge your mobile', hi: 'अपना मोबाइल रिचार्ज करें' },
    payee: { name: 'Prepaid recharge', initial: 'K', color: '#1967d2', bank: '+91 98765 43210 · ₹299 plan' },
    amount: '299',
    successTitle: 'Recharge successful · +91 98765 43210',
    takeaways: {
      en: [
        "'Mobile recharge' → 'My number' → pick your plan",
        'Pay inside Google Pay with your UPI PIN',
        'Never recharge through a link in an SMS',
      ],
      hi: [
        "'Mobile recharge' → 'My number' → अपना प्लान चुनें",
        'Google Pay के अंदर ही UPI PIN से पेमेंट करें',
        'SMS में आए लिंक से कभी रिचार्ज न करें',
      ],
    },
    share: { en: 'I learned to recharge my phone on Google Pay with Folks! 🎉', hi: 'मैंने Folks पर Google Pay से फ़ोन रिचार्ज करना सीख लिया! 🎉' },
    realTry: {
      en: "When your plan is about to end, recharge from 'Mobile recharge' on your real Google Pay.",
      hi: "जब आपका प्लान ख़त्म होने वाला हो, असली Google Pay में 'Mobile recharge' से रिचार्ज कीजिए।",
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Today we'll learn to recharge your own mobile number on Google Pay. This is only practice, so no real money is used.",
          hi: 'आज हम Google Pay से अपना मोबाइल नंबर रिचार्ज करना सीखेंगे। यह सिर्फ़ अभ्यास है, असली पैसे नहीं कटेंगे।',
        },
        button: { en: 'Start', hi: 'शुरू करें' },
      },
      {
        id: 'open-recharge',
        screen: 'gp-home',
        kind: 'tap',
        target: 'recharge',
        say: {
          en: "Tap 'Mobile recharge', the last button in the second row.",
          hi: "दूसरी लाइन का आख़िरी बटन 'Mobile recharge' दबाइए।",
        },
        hint: { en: "Tap 'Mobile recharge', on the right in the second row.", hi: "दूसरी लाइन में दाईं तरफ़ 'Mobile recharge' दबाइए।" },
      },
      {
        id: 'my-number',
        screen: 'gp-recharge',
        kind: 'tap',
        target: 'my-number',
        say: {
          en: "Your own number is at the top, under 'My number'. Tap it.",
          hi: "सबसे ऊपर 'My number' में आपका अपना नंबर है। उसे दबाइए।",
        },
        hint: { en: "Tap the row that says 'Kamala Nair (You)'.", hi: "'Kamala Nair (You)' वाली लाइन दबाइए।" },
      },
      {
        id: 'pick-plan',
        screen: 'gp-plans',
        kind: 'tap',
        target: 'plan-299',
        say: {
          en: "These are the plans. Pick the one you usually take. Today, it's 299 rupees for 28 days. Tap it.",
          hi: 'ये प्लान हैं। जो प्लान आप हमेशा लेते हैं, वही चुनिए। आज 299 रुपये, 28 दिन वाला। उसे दबाइए।',
        },
        hint: { en: 'Tap the first plan, ₹299.', hi: 'पहला प्लान, 299 रुपये वाला, दबाइए।' },
      },
      ...gpayPaySteps({
        amount: '299',
        typeAmount: false,
        doneSay: {
          en: "Recharge done! Your number is recharged for 28 days. Tap 'Done'.",
          hi: "रिचार्ज हो गया! आपका नंबर 28 दिन के लिए रिचार्ज हो गया। 'Done' दबाइए।",
        },
      }),
      {
        id: 'sms-scam',
        screen: 'gp-home',
        kind: 'quiz',
        say: {
          en: "You get an SMS: 'Your SIM will be blocked today. Recharge now at this link.' What do you do?",
          hi: "आपको SMS आता है: 'आपका SIM आज बंद हो जाएगा। इस लिंक पर अभी रिचार्ज करें।' आप क्या करेंगे?",
        },
        options: [
          {
            text: { en: 'Tap the link and recharge', hi: 'लिंक दबाकर रिचार्ज करूँ' },
            correct: false,
            why: {
              en: 'No! Links in messages like this are scams. Recharge only inside your own payment app.',
              hi: 'नहीं! ऐसे मैसेज के लिंक धोखा होते हैं। सिर्फ़ अपने पेमेंट ऐप के अंदर रिचार्ज कीजिए।',
            },
          },
          {
            text: { en: 'Ignore it. Recharge only inside Google Pay', hi: 'अनदेखा करूँ, सिर्फ़ Google Pay में रिचार्ज करूँ' },
            correct: true,
            why: {
              en: 'Exactly! Recharge only from your own app, never from a link.',
              hi: 'बिल्कुल सही! सिर्फ़ अपने ऐप से रिचार्ज कीजिए, लिंक से कभी नहीं।',
            },
          },
        ],
      },
    ],
  },

  'whatsapp-docs': {
    id: 'whatsapp-docs',
    icon: 'bills',
    app: 'whatsapp',
    appName: 'WhatsApp',
    emoji: '📄',
    minutes: 2,
    title: { en: 'Find an old file or photo on WhatsApp', hi: 'WhatsApp पर पुरानी फ़ाइल या फ़ोटो ढूंढें' },
    takeaways: {
      en: [
        'Open the chat of the person who sent it',
        "Tap their name at the top → 'Media, links and docs'",
        "Photos are in 'Media', PDFs are in 'Docs'",
      ],
      hi: ['जिसने भेजा था, उसकी चैट खोलें', "ऊपर नाम दबाएं → 'Media, links and docs'", "फ़ोटो 'Media' में, PDF 'Docs' में"],
    },
    share: { en: 'I learned to find old WhatsApp files on Folks! 🎉', hi: 'मैंने Folks पर WhatsApp की पुरानी फ़ाइल ढूंढना सीख लिया! 🎉' },
    realTry: {
      en: 'Now try finding a file someone sent you on your real WhatsApp, the same way.',
      hi: 'अब अपने असली WhatsApp में किसी की भेजी फ़ाइल ऐसे ही ढूंढकर देखिए।',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Ramesh Bhaiya sent the electricity bill as a PDF two weeks ago. Today we'll learn to find it, without scrolling up and up. This is practice; no message will be sent.",
          hi: 'रमेश भैया ने दो हफ़्ते पहले बिजली का बिल PDF में भेजा था। आज हम उसे ढूंढना सीखेंगे, बिना ऊपर-ऊपर स्क्रॉल किए। यह अभ्यास है, कोई मैसेज नहीं जाएगा।',
        },
        button: { en: 'Start', hi: 'शुरू करें' },
      },
      {
        id: 'open-chat',
        screen: 'wa-chats',
        kind: 'tap',
        target: 'chat-ramesh',
        say: {
          en: "This is your chat list. Open the chat of the person who sent the file, tap 'Ramesh Bhaiya'.",
          hi: "यह आपकी चैट की लिस्ट है। जिसने फ़ाइल भेजी थी, उसकी चैट खोलिए, 'Ramesh Bhaiya' दबाइए।",
        },
        hint: { en: "Tap the 'Ramesh Bhaiya' row.", hi: "'Ramesh Bhaiya' वाली लाइन दबाइए।" },
      },
      {
        id: 'tap-name',
        screen: 'wa-chat',
        kind: 'tap',
        target: 'contact-name',
        say: {
          en: "The bill is far up in old messages, but you don't need to scroll. Tap their name 'Ramesh Bhaiya' at the very top.",
          hi: "बिल बहुत पुराने मैसेज में है, पर स्क्रॉल करने की ज़रूरत नहीं। सबसे ऊपर उनका नाम 'Ramesh Bhaiya' दबाइए।",
        },
        hint: { en: 'Tap the name at the very top of the screen.', hi: 'स्क्रीन के सबसे ऊपर लिखा नाम दबाइए।' },
      },
      {
        id: 'media-row',
        screen: 'wa-info',
        kind: 'tap',
        target: 'media-row',
        say: {
          en: "Here it says 'Media, links and docs'. It has every photo and file they sent. Tap it.",
          hi: "यहाँ 'Media, links and docs' लिखा है। इसमें उनकी भेजी हर फ़ोटो और फ़ाइल है। इसे दबाइए।",
        },
        hint: { en: "Tap the 'Media, links and docs' row.", hi: "'Media, links and docs' वाली लाइन दबाइए।" },
      },
      {
        id: 'docs-tab',
        screen: 'wa-media',
        tab: 'media',
        kind: 'tap',
        target: 'docs-tab',
        say: {
          en: "These are photos. PDF files are under 'Docs'. Tap 'Docs' at the top.",
          hi: "ये फ़ोटो हैं। PDF फ़ाइलें 'Docs' में होती हैं। ऊपर 'Docs' दबाइए।",
        },
        hint: { en: "Tap 'Docs' in the middle at the top.", hi: "ऊपर बीच में 'Docs' लिखा है, उसे दबाइए।" },
      },
      {
        id: 'open-bill',
        screen: 'wa-media',
        tab: 'docs',
        kind: 'tap',
        target: 'bill',
        say: { en: 'Here are all the files. Tap the electricity bill.', hi: 'ये रहीं सारी फ़ाइलें। बिजली का बिल दबाइए।' },
        hint: { en: "Tap 'Electricity_bill_Sept.pdf'.", hi: "'Electricity_bill_Sept.pdf' दबाइए।" },
      },
      {
        id: 'opened',
        screen: 'wa-pdf',
        kind: 'tap',
        target: 'done',
        say: {
          en: "The bill is open! You can read it or forward it now. Tap 'Done'.",
          hi: "बिल खुल गया! अब आप इसे देख सकते हैं या आगे भेज सकते हैं। 'Done' दबाइए।",
        },
        hint: { en: "Tap 'Done' at the bottom.", hi: "नीचे 'Done' दबाइए।" },
      },
      {
        id: 'photo-quiz',
        screen: 'wa-media',
        tab: 'docs',
        kind: 'quiz',
        say: {
          en: 'One question: to find a photo Ramesh Bhaiya sent, which tab would you open?',
          hi: 'एक सवाल: अगर रमेश भैया की भेजी कोई फ़ोटो ढूंढनी हो, तो कौन सा टैब खोलेंगे?',
        },
        options: [
          {
            text: { en: 'Media', hi: 'Media' },
            correct: true,
            why: { en: "Right! Photos and videos are in 'Media', PDFs in 'Docs'.", hi: "सही! फ़ोटो और वीडियो 'Media' में, PDF 'Docs' में।" },
          },
          {
            text: { en: 'Docs', hi: 'Docs' },
            correct: false,
            why: { en: "'Docs' has files like PDFs. Photos are in 'Media'.", hi: "'Docs' में PDF जैसी फ़ाइलें होती हैं। फ़ोटो 'Media' में मिलती हैं।" },
          },
          {
            text: { en: 'Links', hi: 'Links' },
            correct: false,
            why: { en: "'Links' has website links. Photos are in 'Media'.", hi: "'Links' में वेबसाइट के लिंक होते हैं। फ़ोटो 'Media' में मिलती हैं।" },
          },
        ],
      },
    ],
  },

  'whatsapp-status': {
    id: 'whatsapp-status',
    icon: 'updates',
    app: 'whatsapp',
    appName: 'WhatsApp',
    emoji: '🪔',
    minutes: 2,
    title: { en: 'Put a status on WhatsApp', hi: 'WhatsApp पर स्टेटस लगाएं' },
    takeaways: {
      en: [
        "Status is in 'Updates' at the bottom",
        'Pencil button = write a text status',
        'Only your contacts see it, and it disappears after 24 hours',
      ],
      hi: [
        "स्टेटस नीचे 'Updates' में होता है",
        'पेंसिल वाला बटन = लिखकर स्टेटस',
        'सिर्फ़ आपके contacts देखते हैं, और 24 घंटे में हट जाता है',
      ],
    },
    share: { en: 'I learned to put a WhatsApp status on Folks! 🪔', hi: 'मैंने Folks पर WhatsApp स्टेटस लगाना सीख लिया! 🪔' },
    realTry: {
      en: 'Put a real good morning wish as your status on WhatsApp, and ask your family to check it.',
      hi: 'अपने असली WhatsApp पर सुप्रभात की शुभकामना का स्टेटस लगाइए, और परिवार से पूछिए कि उन्हें दिखा या नहीं।',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Good morning! Today we'll learn to put a 'Good Morning' status on WhatsApp, for all your contacts to see. This is practice, nothing will be posted.",
          hi: "सुप्रभात! आज हम WhatsApp पर 'Good Morning' का स्टेटस लगाना सीखेंगे, जिसे आपके सभी contacts देख सकें। यह अभ्यास है, कुछ भी पोस्ट नहीं होगा।",
        },
        button: { en: 'Start', hi: 'शुरू करें' },
      },
      {
        id: 'open-updates',
        screen: 'wa-chats',
        kind: 'tap',
        target: 'nav-updates',
        say: {
          en: "Status is kept in 'Updates'. Tap 'Updates' at the bottom.",
          hi: "स्टेटस 'Updates' में होता है। नीचे 'Updates' दबाइए।",
        },
        hint: { en: "Tap 'Updates' at the bottom, second from the left.", hi: "नीचे बाईं तरफ़ से दूसरा, 'Updates' दबाइए।" },
      },
      {
        id: 'pencil',
        screen: 'wa-updates',
        kind: 'tap',
        target: 'pencil',
        say: {
          en: 'To write a text status, tap the small pencil button at the bottom right, just above the green camera button.',
          hi: 'लिखकर स्टेटस लगाने के लिए, नीचे दाईं तरफ़ छोटा पेंसिल वाला बटन दबाइए, हरे कैमरा बटन के ठीक ऊपर।',
        },
        hint: { en: 'Tap the small grey pencil button, above the green one.', hi: 'हरे बटन के ऊपर छोटा सलेटी पेंसिल वाला बटन दबाइए।' },
      },
      {
        id: 'type',
        screen: 'wa-text-status',
        kind: 'tap',
        target: 'text-area',
        say: {
          en: "Tap in the middle to write your wish. For practice, just tap and we'll type it for you.",
          hi: 'बीच में दबाकर अपनी शुभकामना लिखिए। अभ्यास में बस दबाइए, हम आपके लिए लिख देंगे।',
        },
        hint: { en: "Tap where it says 'Type a status'.", hi: "जहाँ 'Type a status' लिखा है, वहाँ दबाइए।" },
      },
      {
        id: 'colour',
        screen: 'wa-text-status',
        typed: true,
        kind: 'tap',
        target: 'palette',
        say: {
          en: 'Nice! Want a different colour? Tap the palette icon at the top right.',
          hi: 'बढ़िया! रंग बदलना है? ऊपर दाईं तरफ़ रंगों वाला निशान दबाइए।',
        },
        hint: { en: 'Tap the palette icon at the top right corner.', hi: 'ऊपर दाएं कोने में रंगों वाला निशान दबाइए।' },
      },
      {
        id: 'send',
        screen: 'wa-text-status',
        typed: true,
        color: 1,
        kind: 'tap',
        target: 'send',
        say: { en: 'Now tap the green send button at the bottom right.', hi: 'अब नीचे दाईं तरफ़ हरा भेजने वाला बटन दबाइए।' },
        hint: { en: 'Tap the round green button at the bottom right.', hi: 'नीचे दाईं तरफ़ गोल हरा बटन दबाइए।' },
      },
      {
        id: 'who-sees',
        screen: 'wa-updates',
        posted: true,
        kind: 'quiz',
        say: { en: 'Your status is up! Who can see it?', hi: 'आपका स्टेटस लग गया! इसे कौन देख सकता है?' },
        options: [
          {
            text: { en: 'Everyone on WhatsApp', hi: 'WhatsApp पर सब लोग' },
            correct: false,
            why: {
              en: 'No, only your contacts can see it, and it disappears after 24 hours.',
              hi: 'नहीं, सिर्फ़ आपके contacts देख सकते हैं, और 24 घंटे में हट जाता है।',
            },
          },
          {
            text: { en: 'My contacts, for 24 hours', hi: 'मेरे contacts, 24 घंटे तक' },
            correct: true,
            why: {
              en: 'Right! Your contacts can see it, and it disappears after 24 hours.',
              hi: 'सही! आपके contacts इसे देख सकते हैं, और यह 24 घंटे में हट जाता है।',
            },
          },
        ],
      },
    ],
  },

  'electricity-bill': {
    id: 'electricity-bill',
    icon: 'bulb',
    app: 'gpay',
    appName: 'Google Pay',
    emoji: '💡',
    minutes: 3,
    title: { en: 'Pay the electricity bill', hi: 'बिजली का बिल भरें' },
    payee: { name: 'State Electricity Board', initial: 'B', color: '#b06000', bank: 'Electricity bill · Consumer no. 452187' },
    amount: '1,240',
    successTitle: 'Electricity bill paid · Consumer no. 452187',
    takeaways: {
      en: [
        "'Pay bills' → 'Electricity' → pick your board",
        'Type the consumer number from your paper bill, then check the name',
        "Bills are paid inside the app. Never pay because of a 'power cut tonight' SMS",
      ],
      hi: [
        "'Pay bills' → 'Electricity' → अपना बिजली बोर्ड चुनें",
        'कागज़ के बिल से consumer नंबर लिखें, फिर नाम जांचें',
        "बिल ऐप के अंदर ही भरें। 'आज रात बिजली कटेगी' वाले SMS पर कभी पैसे न दें",
      ],
    },
    share: { en: 'I learned to pay the electricity bill on Google Pay with Folks! 💡', hi: 'मैंने Folks पर Google Pay से बिजली का बिल भरना सीख लिया! 💡' },
    realTry: {
      en: "When the next bill comes, keep the paper bill next to you and pay it from 'Pay bills' on your real Google Pay.",
      hi: "अगला बिल आए, तो कागज़ का बिल पास रखिए और असली Google Pay में 'Pay bills' से भरिए।",
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Today we'll learn to pay the electricity bill on Google Pay. Keep your paper bill handy, because we'll need the consumer number on it. This is only practice, so no real money is used.",
          hi: 'आज हम Google Pay से बिजली का बिल भरना सीखेंगे। कागज़ का बिल पास रखिए, उस पर लिखा consumer नंबर चाहिए होगा। यह सिर्फ़ अभ्यास है, असली पैसे नहीं कटेंगे।',
        },
        button: { en: 'Start', hi: 'शुरू करें' },
      },
      {
        id: 'pay-bills',
        screen: 'gp-home',
        kind: 'tap',
        target: 'pay-bills',
        say: { en: "Tap 'Pay bills', in the second row.", hi: "दूसरी लाइन में 'Pay bills' दबाइए।" },
        hint: { en: "Tap 'Pay bills', the third button in the second row.", hi: "दूसरी लाइन का तीसरा बटन 'Pay bills' दबाइए।" },
      },
      {
        id: 'electricity',
        screen: 'gp-bills',
        kind: 'tap',
        target: 'cat-electricity',
        say: { en: "These are all the bills you can pay. Tap 'Electricity'.", hi: "ये सारे बिल यहाँ भर सकते हैं। 'Electricity' दबाइए।" },
        hint: { en: "Tap 'Electricity', the first one, with the bulb.", hi: "बल्ब वाला पहला बटन 'Electricity' दबाइए।" },
      },
      {
        id: 'board',
        screen: 'gp-boards',
        kind: 'tap',
        target: 'board-1',
        say: {
          en: 'Pick your electricity board. Its name is printed at the top of your paper bill. For practice, tap State Electricity Board.',
          hi: 'अपना बिजली बोर्ड चुनिए। उसका नाम आपके कागज़ के बिल पर सबसे ऊपर लिखा होता है। अभ्यास में State Electricity Board दबाइए।',
        },
        hint: { en: "Tap 'State Electricity Board', the first in the list.", hi: "लिस्ट में पहला, 'State Electricity Board' दबाइए।" },
      },
      {
        id: 'consumer',
        screen: 'gp-consumer',
        kind: 'input',
        field: 'consumer',
        expected: '452187',
        say: {
          en: 'Now type the consumer number from your bill. For practice, type 4, 5, 2, 1, 8, 7.',
          hi: 'अब बिल पर लिखा consumer नंबर लिखिए। अभ्यास के लिए 4, 5, 2, 1, 8, 7 दबाइए।',
        },
        hint: { en: 'Press the glowing number.', hi: 'चमकता हुआ नंबर दबाइए।' },
      },
      {
        id: 'confirm-number',
        screen: 'gp-consumer',
        kind: 'tap',
        target: 'fetch',
        say: { en: "Now tap 'Confirm' to get your bill.", hi: "अब बिल देखने के लिए 'Confirm' दबाइए।" },
        hint: { en: "Tap the blue 'Confirm' button.", hi: "नीला 'Confirm' बटन दबाइए।" },
      },
      {
        id: 'check-bill',
        screen: 'gp-bill',
        kind: 'quiz',
        say: {
          en: 'Google Pay found the bill. Before paying, check the name. Your paper bill says Kamala Nair. Is it the same here?',
          hi: 'Google Pay ने बिल ढूंढ लिया। पैसे देने से पहले नाम देखिए। आपके कागज़ के बिल पर Kamala Nair लिखा है। क्या यहाँ भी वही नाम है?',
        },
        options: [
          {
            text: { en: 'Yes, it is my bill', hi: 'हाँ, यह मेरा ही बिल है' },
            correct: true,
            why: {
              en: 'Good. If the name or amount looks wrong, check the consumer number again.',
              hi: 'बढ़िया। नाम या रकम गलत लगे, तो consumer नंबर दोबारा जांचिए।',
            },
          },
          {
            text: { en: 'It does not matter', hi: 'इससे फ़र्क नहीं पड़ता' },
            correct: false,
            why: {
              en: "It matters. With a wrong number, you'd pay someone else's bill.",
              hi: 'फ़र्क पड़ता है। गलत नंबर से आप किसी और का बिल भर देंगे।',
            },
          },
        ],
      },
      {
        id: 'pay-bill',
        screen: 'gp-bill',
        kind: 'tap',
        target: 'pay-bill',
        say: { en: "The bill is 1,240 rupees. Tap 'Pay ₹1,240'.", hi: "बिल 1,240 रुपये का है। 'Pay ₹1,240' दबाइए।" },
        hint: { en: 'Tap the blue Pay button at the bottom.', hi: 'नीचे नीला Pay बटन दबाइए।' },
      },
      ...gpayPaySteps({
        amount: '1,240',
        typeAmount: false,
        doneSay: {
          en: "Bill paid! Google Pay keeps the receipt in your history. Tap 'Done'.",
          hi: "बिल भर गया! इसकी रसीद Google Pay की history में रहती है। 'Done' दबाइए।",
        },
      }),
      {
        id: 'power-cut-scam',
        screen: 'gp-home',
        kind: 'quiz',
        say: {
          en: "You get an SMS: 'Your electricity will be cut tonight at 9:30. Call our officer on this number.' What do you do?",
          hi: "आपको SMS आता है: 'आज रात 9:30 बजे आपकी बिजली कट जाएगी। इस नंबर पर हमारे अफ़सर को फ़ोन करें।' आप क्या करेंगे?",
        },
        options: [
          {
            text: { en: 'Call the number quickly', hi: 'जल्दी से उस नंबर पर फ़ोन करूँ' },
            correct: false,
            why: {
              en: "Don't call. This is a common scam to get your money or OTP. Check the bill in Google Pay instead.",
              hi: 'फ़ोन मत कीजिए। यह आम धोखा है, पैसे या OTP लेने के लिए। इसके बजाय Google Pay में बिल देखिए।',
            },
          },
          {
            text: {
              en: 'Ignore it, and check my bill in Google Pay',
              hi: 'अनदेखा करूँ, और Google Pay में अपना बिल देखूँ',
            },
            correct: true,
            why: {
              en: 'Right! Boards never threaten you by SMS. If unsure, call the number printed on your paper bill.',
              hi: 'सही! बिजली बोर्ड SMS से धमकी नहीं देते। शक हो, तो कागज़ के बिल पर छपे नंबर पर फ़ोन कीजिए।',
            },
          },
        ],
      },
    ],
  },

  'video-call': {
    id: 'video-call',
    icon: 'video',
    app: 'whatsapp',
    appName: 'WhatsApp',
    emoji: '📹',
    minutes: 2,
    title: { en: 'Make a video call on WhatsApp', hi: 'WhatsApp पर वीडियो कॉल करें' },
    contact: { name: 'Rahul (Beta)', ini: 'R', color: '#2563eb', t: 'chat-rahul' },
    takeaways: {
      en: [
        'Open the chat, then tap the video camera at the top',
        'Flip the camera to show what is in front of you',
        "Red button ends the call. Police never do 'digital arrest' on video calls",
      ],
      hi: [
        'चैट खोलें, फिर ऊपर वीडियो कैमरा दबाएं',
        'सामने की चीज़ दिखाने के लिए कैमरा पलटें',
        "लाल बटन से कॉल बंद होती है। पुलिस वीडियो कॉल पर 'डिजिटल अरेस्ट' नहीं करती",
      ],
    },
    share: { en: 'I learned to make WhatsApp video calls on Folks! 📹', hi: 'मैंने Folks पर WhatsApp वीडियो कॉल करना सीख लिया! 📹' },
    realTry: {
      en: 'Video call your son or daughter on your real WhatsApp, and show them something with the back camera.',
      hi: 'अपने असली WhatsApp से बेटे या बेटी को वीडियो कॉल कीजिए, और पीछे वाले कैमरे से कुछ दिखाइए।',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Today we'll learn to video call your son Rahul on WhatsApp. This is practice, so no call will actually be made.",
          hi: 'आज हम WhatsApp पर अपने बेटे राहुल को वीडियो कॉल करना सीखेंगे। यह अभ्यास है, असली कॉल नहीं लगेगी।',
        },
        button: { en: 'Start', hi: 'शुरू करें' },
      },
      {
        id: 'open-chat',
        screen: 'wa-chats',
        kind: 'tap',
        target: 'chat-rahul',
        say: { en: "Open Rahul's chat. Tap 'Rahul (Beta)'.", hi: "राहुल की चैट खोलिए। 'Rahul (Beta)' दबाइए।" },
        hint: { en: "Tap the 'Rahul (Beta)' row.", hi: "'Rahul (Beta)' वाली लाइन दबाइए।" },
      },
      {
        id: 'video-icon',
        screen: 'wa-chat',
        kind: 'tap',
        target: 'video-call',
        say: {
          en: 'At the top right there are two icons: a video camera and a phone. The video camera makes a video call. Tap it.',
          hi: 'ऊपर दाईं तरफ़ दो निशान हैं: वीडियो कैमरा और फ़ोन। वीडियो कैमरा से वीडियो कॉल होती है। उसे दबाइए।',
        },
        hint: { en: 'Tap the video camera icon at the top right.', hi: 'ऊपर दाईं तरफ़ वीडियो कैमरा वाला निशान दबाइए।' },
      },
      {
        id: 'ringing',
        screen: 'wa-calling',
        kind: 'info',
        say: {
          en: "It's ringing. You can see yourself on the screen. Wait for Rahul to pick up.",
          hi: 'घंटी जा रही है। स्क्रीन पर आप खुद को देख सकते हैं। राहुल के फ़ोन उठाने का इंतज़ार कीजिए।',
        },
        button: { en: 'Rahul picked up', hi: 'राहुल ने फ़ोन उठा लिया' },
      },
      {
        id: 'flip',
        screen: 'wa-video',
        kind: 'tap',
        target: 'flip',
        say: {
          en: 'Rahul is on the call! To show him something in front of you, like a plant, flip the camera. Tap the flip camera button.',
          hi: 'राहुल कॉल पर हैं! सामने की कोई चीज़ दिखानी हो, जैसे पौधा, तो कैमरा पलटिए। कैमरा पलटने वाला बटन दबाइए।',
        },
        hint: { en: 'Tap the button with two curved arrows, at the bottom left.', hi: 'नीचे बाईं तरफ़, दो घूमे हुए तीरों वाला बटन दबाइए।' },
      },
      {
        id: 'end',
        screen: 'wa-video',
        flipped: true,
        kind: 'tap',
        target: 'end',
        say: { en: 'Now Rahul sees your plant. When you are done talking, tap the red button to end the call.', hi: 'अब राहुल आपका पौधा देख रहे हैं। बात पूरी हो जाए, तो कॉल बंद करने के लिए लाल बटन दबाइए।' },
        hint: { en: 'Tap the red button at the bottom right.', hi: 'नीचे दाईं तरफ़ लाल बटन दबाइए।' },
      },
      {
        id: 'digital-arrest',
        screen: 'wa-chats',
        kind: 'quiz',
        say: {
          en: "One important thing. A video call comes from someone in police uniform. He says you are under 'digital arrest' and must pay money. What do you do?",
          hi: "एक ज़रूरी बात। पुलिस की वर्दी में कोई वीडियो कॉल करता है। कहता है कि आप 'डिजिटल अरेस्ट' में हैं और पैसे देने होंगे। आप क्या करेंगे?",
        },
        options: [
          {
            text: { en: 'Pay so I am not arrested', hi: 'पैसे दे दूँ, ताकि गिरफ़्तारी न हो' },
            correct: false,
            why: {
              en: "No! There is no such thing as 'digital arrest'. Police never arrest anyone or ask for money on a video call.",
              hi: "नहीं! 'डिजिटल अरेस्ट' जैसी कोई चीज़ नहीं होती। पुलिस वीडियो कॉल पर न गिरफ़्तार करती है, न पैसे मांगती है।",
            },
          },
          {
            text: { en: 'Cut the call and tell my family', hi: 'कॉल काटूँ और परिवार को बताऊँ' },
            correct: true,
            why: {
              en: 'Exactly right. Cut the call, tell your family, and you can report it on 1930, the cyber crime helpline.',
              hi: 'बिल्कुल सही। कॉल काटिए, परिवार को बताइए, और 1930 साइबर क्राइम हेल्पलाइन पर शिकायत कर सकते हैं।',
            },
          },
        ],
      },
    ],
  },

  'scan-doc': {
    id: 'scan-doc',
    icon: 'camera',
    app: 'drive',
    appName: 'Google Drive',
    emoji: '🖨️',
    minutes: 2,
    title: { en: 'Scan a paper into a PDF', hi: 'कागज़ स्कैन करके PDF बनाएं' },
    takeaways: {
      en: ["Google Drive → '+ New' → 'Scan'", 'Fit the paper in the frame and tap the big round button', 'Give it a name you will remember, then Save'],
      hi: ["Google Drive → '+ New' → 'Scan'", 'कागज़ को फ़्रेम में रखें और बड़ा गोल बटन दबाएं', 'याद रहने वाला नाम दें, फिर Save करें'],
    },
    share: { en: 'I learned to scan papers into PDFs on Folks! 🖨️', hi: 'मैंने Folks पर कागज़ से PDF बनाना सीख लिया! 🖨️' },
    realTry: {
      en: 'Scan a real paper, like a medical report, with Google Drive on your phone, and send it to your son or daughter.',
      hi: 'अपने फ़ोन के Google Drive से कोई असली कागज़, जैसे मेडिकल रिपोर्ट, स्कैन कीजिए और बेटे या बेटी को भेजिए।',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "The doctor's office wants your medical report as a PDF. Today we'll learn to scan a paper into a PDF with Google Drive. This is practice, so nothing will be saved.",
          hi: 'डॉक्टर के यहाँ से मेडिकल रिपोर्ट PDF में मांगी है। आज हम Google Drive से कागज़ को स्कैन करके PDF बनाना सीखेंगे। यह अभ्यास है, कुछ भी सेव नहीं होगा।',
        },
        button: { en: 'Start', hi: 'शुरू करें' },
      },
      {
        id: 'new',
        screen: 'drive-home',
        kind: 'tap',
        target: 'new',
        say: { en: "This is Google Drive. Tap the '+ New' button at the bottom right.", hi: "यह Google Drive है। नीचे दाईं तरफ़ '+ New' बटन दबाइए।" },
        hint: { en: "Tap the big '+ New' button at the bottom right.", hi: "नीचे दाईं तरफ़ बड़ा '+ New' बटन दबाइए।" },
      },
      {
        id: 'scan',
        screen: 'drive-new',
        kind: 'tap',
        target: 'scan',
        say: { en: "A menu opens. Tap 'Scan', the one with the camera.", hi: "एक मेन्यू खुला। कैमरा वाला 'Scan' दबाइए।" },
        hint: { en: "Tap 'Scan'.", hi: "'Scan' दबाइए।" },
      },
      {
        id: 'shutter',
        screen: 'drive-scanner',
        kind: 'tap',
        target: 'shutter',
        say: {
          en: 'Keep the paper on a table and hold the phone above it, so the whole page fits in the frame. Then tap the big round button.',
          hi: 'कागज़ को मेज़ पर रखिए और फ़ोन उसके ऊपर पकड़िए, ताकि पूरा पेज फ़्रेम में आ जाए। फिर बड़ा गोल बटन दबाइए।',
        },
        hint: { en: 'Tap the big white round button at the bottom.', hi: 'नीचे बड़ा सफ़ेद गोल बटन दबाइए।' },
      },
      {
        id: 'review',
        screen: 'drive-review',
        kind: 'tap',
        target: 'done',
        say: {
          en: "Here is your scan. If it's blurry, you can tap 'Retake'. This one looks clear, so tap 'Done'.",
          hi: "यह रहा आपका स्कैन। धुंधला हो, तो 'Retake' दबा सकते हैं। यह साफ़ है, तो 'Done' दबाइए।",
        },
        hint: { en: "Tap 'Done' at the bottom right.", hi: "नीचे दाईं तरफ़ 'Done' दबाइए।" },
      },
      {
        id: 'save',
        screen: 'drive-save',
        kind: 'tap',
        target: 'save',
        say: {
          en: "Give it a name you'll remember. We've named it 'Medical report'. Now tap 'Save'.",
          hi: "ऐसा नाम दीजिए जो याद रहे। हमने 'Medical report' नाम दिया है। अब 'Save' दबाइए।",
        },
        hint: { en: "Tap 'Save' at the bottom right.", hi: "नीचे दाईं तरफ़ 'Save' दबाइए।" },
      },
      {
        id: 'where',
        screen: 'drive-home',
        saved: true,
        kind: 'quiz',
        say: { en: 'Saved! Where will you find this PDF later?', hi: 'सेव हो गया! यह PDF बाद में कहाँ मिलेगी?' },
        options: [
          {
            text: { en: 'In Google Drive, at the top', hi: 'Google Drive में, सबसे ऊपर' },
            correct: true,
            why: {
              en: 'Right! It stays in Google Drive. From there you can share it on WhatsApp too.',
              hi: 'सही! यह Google Drive में रहती है। वहीं से इसे WhatsApp पर भी भेज सकते हैं।',
            },
          },
          {
            text: { en: 'It disappears after saving', hi: 'सेव करने के बाद गायब हो जाती है' },
            correct: false,
            why: {
              en: "No, it doesn't disappear. Look at the top of Google Drive.",
              hi: 'नहीं, गायब नहीं होती। Google Drive में सबसे ऊपर देखिए।',
            },
          },
        ],
      },
    ],
  },
};

// Order of app groups on the home screen.
Object.assign(LESSONS, MORE_LESSONS);
Object.assign(LESSONS, PHONE_LESSONS, APP1_LESSONS, APP2_LESSONS, APP3_LESSONS);
Object.assign(LESSONS, GUIDE_LESSONS);
applyKitOverrides(LESSONS);

// Step 1 of every lesson: find the app on the phone. Parents may not know which icon it is.
const FIND_APP = {
  gpay: {
    en: "First, find Google Pay on your phone. Its icon is a white square with a colourful shape in blue, red, yellow and green, and 'Google Pay' or 'GPay' is written under it. Tap it.",
    hi: "सबसे पहले फ़ोन में Google Pay ढूंढिए। उसका निशान सफ़ेद चौकोर है, जिसमें नीला, लाल, पीला और हरा रंग-बिरंगा आकार है, और नीचे 'Google Pay' या 'GPay' लिखा होता है। उसे दबाइए।",
  },
  whatsapp: {
    en: "First, find WhatsApp on your phone. Its icon is green, with a white phone inside a speech bubble, and 'WhatsApp' is written under it. Tap it.",
    hi: "सबसे पहले फ़ोन में WhatsApp ढूंढिए। उसका निशान हरा है, बातचीत के गोले में सफ़ेद फ़ोन, और नीचे 'WhatsApp' लिखा होता है। उसे दबाइए।",
  },
  youtube: {
    en: "First, find YouTube on your phone. Its icon is white with a red rectangle in the middle, and a white triangle inside it. 'YouTube' is written under it. Tap it.",
    hi: "सबसे पहले फ़ोन में YouTube ढूंढिए। उसका निशान सफ़ेद है, बीच में लाल डिब्बा और उसमें सफ़ेद तिकोना, और नीचे 'YouTube' लिखा होता है। उसे दबाइए।",
  },
  uber: {
    en: "First, find Uber on your phone. Its icon is black with the word 'Uber' in white, and 'Uber' is written under it. Tap it.",
    hi: "सबसे पहले फ़ोन में Uber ढूंढिए। उसका निशान काला है, सफ़ेद में 'Uber' लिखा, और नीचे भी 'Uber' लिखा होता है। उसे दबाइए।",
  },
  rapido: {
    en: "First, find Rapido on your phone. Its icon is bright yellow with the word 'rapido' in black, and 'Rapido' is written under it. Tap it.",
    hi: "सबसे पहले फ़ोन में Rapido ढूंढिए। उसका निशान चमकीला पीला है, जिस पर काले रंग में 'rapido' लिखा है, और नीचे 'Rapido' लिखा होता है। उसे दबाइए।",
  },
  swiggy: {
    en: "First, find Swiggy on your phone. Its icon is orange with a white shape like a map pin, and 'Swiggy' is written under it. Tap it.",
    hi: "सबसे पहले फ़ोन में Swiggy ढूंढिए। उसका निशान नारंगी है, सफ़ेद जगह वाले निशान जैसा, और नीचे 'Swiggy' लिखा होता है। उसे दबाइए।",
  },
  drive: {
    en: "First, find Google Drive on your phone. Its icon is a triangle in green, yellow and blue, and 'Drive' is written under it. Tap it.",
    hi: "सबसे पहले फ़ोन में Google Drive ढूंढिए। उसका निशान हरा, पीला और नीला तिकोना है, और नीचे 'Drive' लिखा होता है। उसे दबाइए।",
  },
};

// Find-the-app text for the newer apps. Same plain style as above.
const findApp = (name, enLook, hiLook, mlLook, nameHi = name, nameMl = name) => ({
  en: `Find the ${name} icon on your phone. ${enLook} Tap it.`,
  hi: `फ़ोन में ${nameHi} का निशान ढूंढिए। ${hiLook} उसे दबाइए।`,
  ml: `ഫോണിൽ ${nameMl} അടയാളം കണ്ടെത്തൂ. ${mlLook} അത് അമർത്തൂ.`,
});
Object.assign(FIND_APP, {
  flipkart: findApp('Flipkart', 'It is yellow, with a blue shopping bag and the letter f. The name is written under it.', 'वह पीला है, उस पर नीला शॉपिंग बैग और अक्षर f है। नीचे नाम लिखा है।', 'അത് മഞ്ഞ നിറമാണ്, നീല ഷോപ്പിങ് ബാഗും f എന്ന അക്ഷരവും ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും.'),
  instagram: findApp('Instagram', 'It has pink, purple and orange colours, with a white camera outline. The name is written under it.', 'उस पर गुलाबी, बैंगनी और नारंगी रंग हैं, और सफ़ेद कैमरे की रेखा है। नीचे नाम लिखा है।', 'അതിൽ പിങ്ക്, പർപ്പിൾ, ഓറഞ്ച് നിറങ്ങളും വെളുത്ത ക്യാമറ വരയും ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും.'),
  spotify: findApp('Spotify', 'It is black, with a green circle and three black curved lines. The name is written under it.', 'वह काला है, उसमें हरा गोला और तीन काली मुड़ी हुई लाइनें हैं। नीचे नाम लिखा है।', 'അത് കറുപ്പ് നിറമാണ്, പച്ച വൃത്തവും മൂന്ന് കറുത്ത വളഞ്ഞ വരകളും ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും.'),
  yono: findApp('YONO SBI', "It is purple and pink, with the word 'yono' in white and 'SBI' under it. The name is written under it too.", "वह बैंगनी-गुलाबी है, उस पर सफ़ेद में 'yono' और उसके नीचे 'SBI' लिखा है। नीचे भी नाम लिखा है।", "അത് പർപ്പിൾ-പിങ്ക് നിറമാണ്, വെള്ള അക്ഷരത്തിൽ 'yono' എന്നും അതിന് താഴെ 'SBI' എന്നും ഉണ്ട്. താഴെയും പേര് ഉണ്ടാകും."),
  icici: findApp('ICICI iMobile', "It is a brown and orange letter i, inside a swirl, with no square around it. The name 'iMobile' is written under it.", "वह भूरे और नारंगी रंग का अक्षर i है, घुमाव के अंदर, उसके चारों तरफ़ चौकोर नहीं है। नीचे 'iMobile' लिखा है।", "അത് തവിട്ടും ഓറഞ്ചും നിറത്തിലുള്ള i എന്ന അക്ഷരമാണ്, ചുറ്റും ചതുരം ഇല്ല. താഴെ 'iMobile' എന്ന് എഴുതിയിരിക്കും.", 'ICICI iMobile', 'ICICI iMobile'),
  blinkit: findApp('Blinkit', "It is yellow, with the word 'blinkit' in black and green. The name is written under it.", "वह पीला है, उस पर काले और हरे रंग में 'blinkit' लिखा है। नीचे नाम लिखा है।", "അത് മഞ്ഞ നിറമാണ്, കറുപ്പും പച്ചയും അക്ഷരത്തിൽ 'blinkit' എന്ന് എഴുതിയിട്ടുണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും."),
  zepto: findApp('Zepto', "It is purple, with the word 'zepto' in white. The name is written under it.", "वह बैंगनी है, उस पर सफ़ेद में 'zepto' लिखा है। नीचे नाम लिखा है।", "അത് പർപ്പിൾ നിറമാണ്, വെള്ള അക്ഷരത്തിൽ 'zepto' എന്ന് എഴുതിയിട്ടുണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും."),
  irctc: findApp('IRCTC Rail Connect', "It is round, with orange, pink and blue colours and a blue railway sign in the middle. The name 'IRCTC' is written under it.", "वह गोल है, उसमें नारंगी, गुलाबी और नीला रंग है, और बीच में नीला रेलवे का निशान है। नीचे 'IRCTC' लिखा है।", "അത് വൃത്താകൃതിയാണ്, ഓറഞ്ച്, പിങ്ക്, നീല നിറങ്ങളും നടുവിൽ നീല റെയിൽവേ അടയാളവും ഉണ്ട്. താഴെ 'IRCTC' എന്ന് എഴുതിയിരിക്കും."),
  paytm: findApp('Paytm', "It is white, with the word 'paytm' in dark blue and light blue. The name is written under it.", "वह सफ़ेद है, उस पर गहरे और हल्के नीले रंग में 'paytm' लिखा है। नीचे नाम लिखा है।", "അത് വെള്ള നിറമാണ്, കടും നീലയിലും ഇളം നീലയിലും 'paytm' എന്ന് എഴുതിയിട്ടുണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും."),
  maps: findApp('Google Maps', 'It is a pin in red, yellow, green and blue. The name is written under it.', 'वह लाल, पीले, हरे और नीले रंग का जगह बताने वाला निशान है। नीचे नाम लिखा है।', 'അത് ചുവപ്പ്, മഞ്ഞ, പച്ച, നീല നിറങ്ങളുള്ള ഒരു മാപ്പ് പിൻ ആണ്. താഴെ പേര് എഴുതിയിരിക്കും.', 'Google Maps', 'Google Maps'),
});
const FIND_HINT = {
  en: "Look at the names written under the icons. If you can't see it on your phone, swipe up from the bottom to see all apps.",
  hi: 'निशानों के नीचे लिखे नाम पढ़िए। अपने फ़ोन पर न दिखे, तो नीचे से ऊपर की ओर उंगली सरकाइए, सारे ऐप दिख जाएंगे।',
};
for (const l of Object.values(LESSONS)) {
  if (!FIND_APP[l.app] || l.steps.some((s) => s.id === 'open-app')) continue;
  // Guide lessons start with "Open the app"; the home-screen step below already does that.
  if (l.id.startsWith('gd-')) l.steps = l.steps.filter((s, i) => !(i === 1 && s.openApp));
  l.steps.splice(1, 0, { id: 'open-app', screen: 'phone-home', kind: 'tap', target: `app-${l.app}`, say: FIND_APP[l.app], hint: FIND_HINT });
}

export const APPS = [
  { id: 'gpay', name: 'Google Pay' },
  { id: 'whatsapp', name: 'WhatsApp' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'uber', name: 'Uber' },
  { id: 'rapido', name: 'Rapido' },
  { id: 'swiggy', name: 'Swiggy' },
  { id: 'drive', name: 'Google Drive' },
  { id: 'flipkart', name: 'Flipkart' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'spotify', name: 'Spotify' },
  { id: 'yono', name: 'YONO SBI' },
  { id: 'blinkit', name: 'Blinkit' },
  { id: 'irctc', name: 'IRCTC' },
  { id: 'paytm', name: 'Paytm' },
  { id: 'maps', name: 'Google Maps' },
  { id: 'phone', name: 'Phone basics' },
];

// Lessons people can ask for that aren't built yet (none right now). Requests with no match are
// still logged through "Ask my son/daughter".
export const COMING_SOON = [];

// Words parents might say, in English, Hindi and Hinglish. [word, weight]
export const KEYWORDS = {
  'qr-pay': [
    ['qr', 3], ['क्यूआर', 3], ['क्यू आर', 3], ['स्कैनर', 2], ['scanner', 2], ['स्कैन', 1], ['scan', 1],
    ['दुकान', 2], ['dukan', 2], ['shop', 2], ['पेमेंट', 1], ['payment', 1], ['pay', 1], ['upi', 1], ['यूपीआई', 1],
    ['भुगतान', 1], ['पैसे देने', 2], ['google pay', 1], ['gpay', 1], ['phonepe', 1], ['फोनपे', 1],
  ],
  'send-money': [
    ['भेज', 1], ['bhej', 1], ['send money', 4], ['send', 1], ['transfer', 3], ['ट्रांसफर', 3],
    ['पैसे भेज', 4], ['paise bhej', 4], ['money bhej', 4], ['पैसा भेज', 4], ['paisa bhej', 4],
  ],
  recharge: [['recharge', 4], ['रिचार्ज', 4], ['रीचार्ज', 4], ['plan', 2], ['प्लान', 2]],
  'whatsapp-docs': [
    ['whatsapp', 1], ['व्हाट्सएप', 1], ['व्हाट्सऐप', 1], ['वॉट्सऐप', 1], ['वाट्सएप', 1],
    ['पुरानी', 2], ['पुराना', 2], ['purani', 2], ['old', 2], ['फोटो', 2], ['फ़ोटो', 2], ['photo', 2],
    ['pdf', 2], ['पीडीएफ', 2], ['document', 2], ['डॉक्यूमेंट', 2], ['फाइल', 2], ['फ़ाइल', 2], ['file', 2],
    ['ढूंढ', 2], ['ढूँढ', 2], ['dhoond', 2], ['find', 2], ['media', 2], ['मीडिया', 2],
  ],
  'whatsapp-status': [['status', 4], ['स्टेटस', 4], ['diwali', 1], ['दिवाली', 1]],
  'scan-doc': [
    ['कागज़', 4], ['कागज', 4], ['paper', 3], ['scan document', 5], ['document scan', 5], ['pdf बना', 5],
    ['make pdf', 5], ['make a pdf', 5], ['drive', 3], ['ड्राइव', 3],
  ],
  'video-call': [['video call', 5], ['वीडियो कॉल', 5], ['वीडियो', 3], ['video', 3], ['call', 1], ['कॉल', 1]],
  'electricity-bill': [
    ['बिजली', 5], ['bijli', 5], ['electricity', 5], ['light bill', 5], ['current bill', 5], ['bill', 2], ['बिल', 2],
  ],
};

Object.assign(KEYWORDS, MORE_KEYWORDS);
Object.assign(KEYWORDS, PHONE_KEYWORDS, APP1_KEYWORDS, APP2_KEYWORDS, APP3_KEYWORDS);

export function findLesson(id) {
  return LESSONS[id] || null;
}

export function findSoon(id) {
  return COMING_SOON.find((s) => s.id === id) || null;
}

// Wording for "Do it on my real phone" mode, where the practice wording doesn't fit.
// Steps not listed here reuse their normal instruction. Quiz steps become "Remember" tips.
const PAY_REAL = {
  amount: { en: 'Type the amount you want to pay.', hi: 'जितने पैसे देने हैं, वो रकम लिखिए।' },
  'choose-account': {
    en: 'Check the bank account shown, then tap the blue Pay button.',
    hi: 'दिखाया गया बैंक खाता देखिए, फिर नीला Pay बटन दबाइए।',
  },
  pin: {
    en: 'Enter your own UPI PIN. Cover the screen with your hand, and never tell your PIN to anyone.',
    hi: 'अपना UPI PIN डालिए। स्क्रीन को हाथ से ढक लीजिए, और PIN कभी किसी को न बताइए।',
  },
  success: { en: "Done! You'll see a green tick. Tap 'Done'.", hi: "हो गया! हरा सही का निशान दिखेगा। 'Done' दबाइए।" },
};

export const REAL = {
  'qr-pay': {
    ...PAY_REAL,
    'scan-qr': {
      en: "Point your phone's camera at the shop's QR code. It scans by itself.",
      hi: 'फ़ोन का कैमरा दुकान के QR कोड की ओर कीजिए। वो अपने-आप स्कैन हो जाएगा।',
    },
    'check-name': {
      en: "Check that the name on the screen matches the shop's name. If it doesn't, don't pay.",
      hi: 'देखिए कि स्क्रीन पर लिखा नाम दुकान के नाम से मिलता है। न मिले, तो पैसे मत दीजिए।',
    },
    success: {
      en: "Done! Show the green tick screen to the shopkeeper, then tap 'Done'.",
      hi: "हो गया! हरे निशान वाली स्क्रीन दुकानदार को दिखाइए, फिर 'Done' दबाइए।",
    },
  },
  'send-money': {
    ...PAY_REAL,
    'pick-contact': {
      en: 'Tap the person you want to pay. Check their name and number carefully.',
      hi: 'जिसे पैसे भेजने हैं, उसका नाम दबाइए। नाम और नंबर ध्यान से जांचिए।',
    },
  },
  recharge: {
    ...PAY_REAL,
    'pick-plan': { en: 'Pick the plan you usually take, and tap it.', hi: 'जो प्लान आप हमेशा लेते हैं, उसे चुनकर दबाइए।' },
  },
  'electricity-bill': {
    ...PAY_REAL,
    board: {
      en: 'Pick your electricity board. Its name is printed at the top of your paper bill.',
      hi: 'अपना बिजली बोर्ड चुनिए। उसका नाम कागज़ के बिल पर सबसे ऊपर लिखा होता है।',
    },
    consumer: { en: 'Type the consumer number from your paper bill.', hi: 'कागज़ के बिल पर लिखा consumer नंबर लिखिए।' },
    'check-bill': {
      en: 'Check that the name and amount match your paper bill.',
      hi: 'देखिए कि नाम और रकम आपके कागज़ के बिल से मिलते हैं।',
    },
    'pay-bill': { en: 'Tap the blue Pay button.', hi: 'नीला Pay बटन दबाइए।' },
  },
  'whatsapp-docs': {
    'open-chat': { en: 'Open the chat of the person who sent the file.', hi: 'जिसने फ़ाइल भेजी थी, उसकी चैट खोलिए।' },
    'tap-name': { en: 'Tap their name at the very top of the chat.', hi: 'चैट में सबसे ऊपर उनका नाम दबाइए।' },
    'docs-tab': {
      en: "Tap 'Docs' for PDFs and documents. Photos are under 'Media'.",
      hi: "PDF और कागज़ों के लिए 'Docs' दबाइए। फ़ोटो 'Media' में होती हैं।",
    },
    'open-bill': { en: 'Find your file in the list and tap it.', hi: 'लिस्ट में अपनी फ़ाइल ढूंढकर दबाइए।' },
    opened: { en: 'Your file is open. You can read it or forward it.', hi: 'आपकी फ़ाइल खुल गई। अब इसे पढ़ सकते हैं या आगे भेज सकते हैं।' },
  },
  'whatsapp-status': {
    type: { en: 'Tap in the middle and type your message.', hi: 'बीच में दबाकर अपना संदेश लिखिए।' },
  },
  'video-call': {
    'open-chat': { en: 'Open the chat of the person you want to call.', hi: 'जिसे कॉल करना है, उसकी चैट खोलिए।' },
    ringing: { en: 'Wait for them to pick up. You will see yourself on the screen.', hi: 'उनके फ़ोन उठाने का इंतज़ार कीजिए। स्क्रीन पर आप खुद को देखेंगे।' },
    flip: {
      en: 'To show something in front of you, tap the flip camera button.',
      hi: 'सामने की कोई चीज़ दिखानी हो, तो कैमरा पलटने वाला बटन दबाइए।',
    },
  },
  'scan-doc': {
    save: { en: "Type a name you will remember, then tap 'Save'.", hi: "याद रहने वाला नाम लिखिए, फिर 'Save' दबाइए।" },
  },
};

Object.assign(REAL, MORE_REAL);
for (const [id, words] of Object.entries(ML_KEYWORDS)) KEYWORDS[id] = [...(KEYWORDS[id] || []), ...words];
applyPlain(LESSONS);
applyPlain(REAL);
applyAnyPin(LESSONS);
applyQuizFocus(LESSONS);
for (const k of Object.keys(LESSONS)) if (['icici', 'zepto'].includes(LESSONS[k].app)) delete LESSONS[k];
fillMl(LESSONS);
fillMl(REAL);
localiseMlNames(LESSONS);
localiseMlNames(REAL);

// Steps that only make sense as practice (the fake scam request), hidden in "real phone" mode.
export const FOLLOW_SKIP = { 'qr-pay': ['decline'] };
