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
      en: "Now refuse this request — tap 'Decline'.",
      hi: "अब इस request को मना कीजिए — 'Decline' दबाइए।",
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
          en: `Now type the amount: press ${digits} — ${amount} rupees.`,
          hi: `अब रकम लिखिए: ${digits} दबाइए — ${amount} रुपये।`,
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
    app: 'gpay',
    appName: 'Google Pay',
    emoji: '🛒',
    minutes: 3,
    title: { en: 'Pay at a shop by scanning a QR code', hi: 'दुकान पर QR स्कैन करके पेमेंट करें' },
    payee: { name: 'SHARMA GENERAL STORE', initial: 'S', color: '#5f6368', bank: 'Banking name: SHARMA GENERAL STORE' },
    takeaways: {
      en: [
        "Start with 'Scan any QR code'",
        "Match the shop's name before you pay",
        'A PIN is only for paying — never for receiving money',
      ],
      hi: [
        "'Scan any QR code' से शुरू करें",
        'पैसे देने से पहले दुकान का नाम मिलाएं',
        'PIN सिर्फ़ पैसे देने के लिए है — पैसे लेने के लिए कभी नहीं',
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
          en: "Hello! Today we'll learn to pay 50 rupees at a shop by scanning a QR code on Google Pay. This is only practice — no real money will be used. Take your time.",
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
          en: "This is Google Pay. First, tap 'Scan any QR code' — the first button, with the square scanner icon.",
          hi: "यह Google Pay है। सबसे पहले 'Scan any QR code' दबाइए — पहला बटन, चौकोर निशान वाला।",
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
          en: "Wait! Check the name before you pay. The shop's board says 'Sharma General Store'. Is the same name on the screen?",
          hi: "रुकिए! पैसे देने से पहले नाम देखिए। दुकान के बोर्ड पर लिखा है 'शर्मा जनरल स्टोर'। क्या स्क्रीन पर भी वही नाम है?",
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
          en: "Done! 50 rupees went to Sharma General Store. You can show this screen to the shopkeeper. Now tap 'Done'.",
          hi: "हो गया! 50 रुपये शर्मा जनरल स्टोर को चले गए। यह स्क्रीन दुकानदार को दिखा सकते हैं। अब 'Done' दबाइए।",
        },
      }),
      scamCollect.quiz,
      scamCollect.decline,
    ],
  },

  'send-money': {
    id: 'send-money',
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
          en: "Today we'll learn to send 500 rupees to Sunita Didi on Google Pay. This is only practice — no real money moves.",
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
          en: "Tap 'Pay contacts' — the second button at the top.",
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
        hint: { en: "Tap the blue 'Pay' button at the bottom — not 'Request'.", hi: "नीचे नीला 'Pay' बटन दबाइए — 'Request' नहीं।" },
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
          en: "Today we'll learn to recharge your own mobile number on Google Pay. This is only practice — no real money.",
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
          en: "Tap 'Mobile recharge' — the last button in the second row.",
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
        hint: { en: "Tap the row that says 'Kamla Devi (You)'.", hi: "'Kamla Devi (You)' वाली लाइन दबाइए।" },
      },
      {
        id: 'pick-plan',
        screen: 'gp-plans',
        kind: 'tap',
        target: 'plan-299',
        say: {
          en: 'These are the plans. Pick the one you usually take — today, 299 rupees for 28 days. Tap it.',
          hi: 'ये प्लान हैं। जो प्लान आप हमेशा लेते हैं, वही चुनिए — आज 299 रुपये, 28 दिन वाला। उसे दबाइए।',
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
            text: { en: 'Ignore it — recharge only inside Google Pay', hi: 'अनदेखा करूँ — सिर्फ़ Google Pay में रिचार्ज करूँ' },
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
          en: "Ramesh Bhaiya sent the electricity bill as a PDF two weeks ago. Today we'll learn to find it — without scrolling up and up. This is practice; no message will be sent.",
          hi: 'रमेश भैया ने दो हफ़्ते पहले बिजली का बिल PDF में भेजा था। आज हम उसे ढूंढना सीखेंगे — बिना ऊपर-ऊपर स्क्रॉल किए। यह अभ्यास है, कोई मैसेज नहीं जाएगा।',
        },
        button: { en: 'Start', hi: 'शुरू करें' },
      },
      {
        id: 'open-chat',
        screen: 'wa-chats',
        kind: 'tap',
        target: 'chat-ramesh',
        say: {
          en: "This is your chat list. Open the chat of the person who sent the file — tap 'Ramesh Bhaiya'.",
          hi: "यह आपकी चैट की लिस्ट है। जिसने फ़ाइल भेजी थी, उसकी चैट खोलिए — 'Ramesh Bhaiya' दबाइए।",
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
        hint: { en: "Tap 'Bijli_bill_Sept.pdf'.", hi: "'Bijli_bill_Sept.pdf' दबाइए।" },
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
      en: 'Put a real Diwali wish as your status on WhatsApp, and ask your family to check it.',
      hi: 'अपने असली WhatsApp पर दिवाली की शुभकामना का स्टेटस लगाइए, और परिवार से पूछिए कि उन्हें दिखा या नहीं।',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          en: "Diwali is coming! Today we'll learn to put a 'Happy Diwali' status on WhatsApp, for all your contacts to see. This is practice — nothing will be posted.",
          hi: "दिवाली आ रही है! आज हम WhatsApp पर 'शुभ दीपावली' का स्टेटस लगाना सीखेंगे, जिसे आपके सभी contacts देख सकें। यह अभ्यास है, कुछ भी पोस्ट नहीं होगा।",
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
          en: 'To write a text status, tap the small pencil button at the bottom right — just above the green camera button.',
          hi: 'लिखकर स्टेटस लगाने के लिए, नीचे दाईं तरफ़ छोटा पेंसिल वाला बटन दबाइए — हरे कैमरा बटन के ठीक ऊपर।',
        },
        hint: { en: 'Tap the small grey pencil button, above the green one.', hi: 'हरे बटन के ऊपर छोटा सलेटी पेंसिल वाला बटन दबाइए।' },
      },
      {
        id: 'type',
        screen: 'wa-text-status',
        kind: 'tap',
        target: 'text-area',
        say: {
          en: "Tap in the middle to write your wish. For practice, just tap — we'll type it for you.",
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
              en: 'No — only your contacts can see it, and it disappears after 24 hours.',
              hi: 'नहीं — सिर्फ़ आपके contacts देख सकते हैं, और 24 घंटे में हट जाता है।',
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
};

// Lessons people can ask for that aren't built yet. Taps and voice requests are logged as demand.
export const COMING_SOON = [
  { id: 'scan-doc', emoji: '🖨️', title: { en: 'Scan a paper into a PDF', hi: 'कागज़ स्कैन करके PDF बनाएं' } },
  { id: 'video-call', emoji: '📹', title: { en: 'Make a WhatsApp video call', hi: 'WhatsApp पर वीडियो कॉल करें' } },
  { id: 'electricity-bill', emoji: '💡', title: { en: 'Pay the electricity bill', hi: 'बिजली का बिल भरें' } },
];

// Words parents might say, in English, Hindi and Hinglish. [word, weight]
export const KEYWORDS = {
  'qr-pay': [
    ['qr', 3], ['क्यूआर', 3], ['क्यू आर', 3], ['स्कैनर', 2], ['scanner', 2], ['स्कैन', 1], ['scan', 1],
    ['दुकान', 2], ['dukan', 2], ['shop', 2], ['पेमेंट', 1], ['payment', 1], ['pay', 1], ['upi', 1], ['यूपीआई', 1],
    ['भुगतान', 1], ['पैसे देने', 2], ['google pay', 1], ['gpay', 1], ['phonepe', 1], ['फोनपे', 1],
  ],
  'send-money': [
    ['भेज', 3], ['bhej', 3], ['send money', 4], ['send', 2], ['transfer', 3], ['ट्रांसफर', 3],
    ['पैसे भेज', 4], ['paise bhej', 4],
  ],
  recharge: [['recharge', 4], ['रिचार्ज', 4], ['रीचार्ज', 4], ['plan', 2], ['प्लान', 2]],
  'whatsapp-docs': [
    ['whatsapp', 1], ['व्हाट्सएप', 1], ['व्हाट्सऐप', 1], ['वॉट्सऐप', 1], ['वाट्सएप', 1],
    ['पुरानी', 2], ['पुराना', 2], ['purani', 2], ['old', 2], ['फोटो', 2], ['फ़ोटो', 2], ['photo', 2],
    ['pdf', 2], ['पीडीएफ', 2], ['document', 2], ['डॉक्यूमेंट', 2], ['फाइल', 2], ['फ़ाइल', 2], ['file', 2],
    ['ढूंढ', 2], ['ढूँढ', 2], ['dhoond', 2], ['find', 2], ['media', 2], ['मीडिया', 2],
  ],
  'whatsapp-status': [['status', 4], ['स्टेटस', 4], ['diwali', 1], ['दिवाली', 1]],
  'scan-doc': [['कागज़', 4], ['कागज', 4], ['paper', 3], ['scan document', 4]],
  'video-call': [['video call', 4], ['वीडियो कॉल', 4], ['वीडियो', 3], ['video', 3]],
  'electricity-bill': [['बिजली', 4], ['bijli', 4], ['electricity', 4], ['light bill', 4], ['bill', 1], ['बिल', 1]],
};

export function findLesson(id) {
  return LESSONS[id] || null;
}

export function findSoon(id) {
  return COMING_SOON.find((s) => s.id === id) || null;
}
