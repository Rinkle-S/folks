// All lesson content lives here. Adding a lesson = adding data, not code.
// Each step: { id, screen, kind: 'info' | 'tap' | 'input' | 'quiz', say, hint, ... }
// say/hint/etc. are { hi, en } so every lesson works in Hindi and English.

export const LESSONS = {
  'qr-pay': {
    id: 'qr-pay',
    emoji: '🛒',
    minutes: 2,
    title: {
      hi: 'दुकान पर QR स्कैन करके पेमेंट करें',
      en: 'Pay at a shop by scanning a QR code',
    },
    takeaways: {
      hi: [
        "'Scan' वाले चौकोर निशान से शुरू करें",
        'पैसे देने से पहले दुकान का नाम मिलाएं',
        'PIN सिर्फ़ पैसे देने के लिए है — पैसे लेने के लिए कभी नहीं',
      ],
      en: [
        "Start with the square 'Scan' icon",
        "Match the shop's name before you pay",
        'A PIN is only for paying — never for receiving money',
      ],
    },
    share: {
      hi: 'मैंने Folks पर QR स्कैन करके पेमेंट करना सीख लिया! 🎉',
      en: 'I learned to pay by scanning a QR code on Folks! 🎉',
    },
    realTry: {
      hi: 'अगली बार दुकान पर अपने असली पेमेंट ऐप से ऐसे ही करके देखिए। कहीं अटकें, तो Folks फिर से खोलिए।',
      en: 'Next time at a shop, try the same steps on your real payment app. If you get stuck, open Folks again.',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          hi: 'नमस्ते! आज हम दुकान पर QR कोड स्कैन करके 50 रुपये देना सीखेंगे। यह सिर्फ़ अभ्यास है, असली पैसे नहीं कटेंगे। आराम से कीजिए।',
          en: "Hello! Today we'll learn to pay 50 rupees at a shop by scanning a QR code. This is only practice — no real money will be used. Take your time.",
        },
        button: { hi: 'शुरू करें', en: 'Start' },
      },
      {
        id: 'open-scan',
        screen: 'upi-home',
        kind: 'tap',
        target: 'scan',
        say: {
          hi: "यह आपका पेमेंट ऐप है। सबसे पहले 'Scan' वाला चौकोर निशान दबाइए।",
          en: "This is your payment app. First, tap the square 'Scan' icon.",
        },
        hint: {
          hi: "जहाँ चौकोर निशान के साथ 'Scan' लिखा है, उसे दबाइए। मैंने उसे चमका दिया है।",
          en: "Tap the square icon that says 'Scan'. I've made it glow for you.",
        },
      },
      {
        id: 'scan-qr',
        screen: 'camera',
        kind: 'tap',
        target: 'qr',
        say: {
          hi: 'कैमरा खुल गया। असल में आप फ़ोन को दुकान के QR कोड की ओर करेंगे। अभ्यास में, QR कोड को छूकर स्कैन कीजिए।',
          en: "The camera is open. In real life you'd point your phone at the shop's QR code. For practice, tap the QR code to scan it.",
        },
        hint: {
          hi: 'बीच में जो काला-सफ़ेद चौकोर कोड है, उसे दबाइए।',
          en: 'Tap the black-and-white square code in the middle.',
        },
      },
      {
        id: 'check-name',
        screen: 'pay-to',
        kind: 'quiz',
        say: {
          hi: "रुकिए! पैसे देने से पहले नाम देखिए। दुकान के बोर्ड पर लिखा है 'शर्मा जनरल स्टोर'। क्या स्क्रीन पर भी वही नाम है?",
          en: "Wait! Check the name before you pay. The shop's board says 'Sharma General Store'. Is the same name on the screen?",
        },
        options: [
          {
            text: { hi: 'हाँ, नाम वही है', en: 'Yes, the name matches' },
            correct: true,
            why: {
              hi: 'बिल्कुल सही! हर बार नाम मिलाइए। नाम अलग हो, तो पैसे मत भेजिए।',
              en: "Exactly right! Always match the name. If it's different, don't pay.",
            },
          },
          {
            text: { hi: 'नाम देखने की ज़रूरत नहीं', en: 'No need to check the name' },
            correct: false,
            why: {
              hi: 'नाम देखना ज़रूरी है। QR गलत हो, तो पैसे किसी और के पास चले जाते हैं।',
              en: 'Checking matters. If the QR is wrong, the money goes to someone else.',
            },
          },
        ],
      },
      {
        id: 'amount',
        screen: 'pay-to',
        kind: 'input',
        field: 'amount',
        expected: '50',
        say: {
          hi: 'अब रकम लिखिए। नीचे के बटन से पहले 5, फिर 0 दबाइए — 50 रुपये।',
          en: 'Now type the amount. Press 5, then 0 — 50 rupees.',
        },
        hint: {
          hi: 'जो बटन चमक रहा है, वही दबाइए।',
          en: 'Press the glowing button.',
        },
      },
      {
        id: 'press-pay',
        screen: 'pay-to',
        kind: 'tap',
        target: 'pay',
        say: {
          hi: "50 रुपये लिख गए। अब नीचे 'Pay' बटन दबाइए।",
          en: "50 rupees is entered. Now tap the 'Pay' button.",
        },
        hint: {
          hi: "नीचे का बड़ा 'Pay' बटन दबाइए।",
          en: "Tap the big 'Pay' button at the bottom.",
        },
      },
      {
        id: 'pin',
        screen: 'pin',
        kind: 'input',
        field: 'pin',
        expected: '1234',
        say: {
          hi: 'अब UPI PIN डालना है। अभ्यास के लिए 1, 2, 3, 4 दबाइए। याद रखिए: असली PIN सिर्फ़ अपने पेमेंट ऐप में डालें, और किसी को कभी न बताएं।',
          en: 'Now enter the UPI PIN. For practice, press 1, 2, 3, 4. Remember: enter your real PIN only in your own payment app, and never tell anyone.',
        },
        hint: {
          hi: 'चमकता हुआ नंबर दबाइए।',
          en: 'Press the glowing number.',
        },
      },
      {
        id: 'success',
        screen: 'success',
        kind: 'tap',
        target: 'done',
        say: {
          hi: "हो गया! 50 रुपये शर्मा जनरल स्टोर को चले गए। यह स्क्रीन दुकानदार को दिखा सकते हैं। अब 'Done' दबाइए।",
          en: "Done! 50 rupees went to Sharma General Store. You can show this screen to the shopkeeper. Now tap 'Done'.",
        },
        hint: {
          hi: "नीचे 'Done' बटन दबाइए।",
          en: "Tap the 'Done' button at the bottom.",
        },
      },
      {
        id: 'scam-quiz',
        screen: 'collect',
        kind: 'quiz',
        say: {
          hi: "एक ज़रूरी बात। किसी ने फ़ोन करके कहा: 'आपको 5000 रुपये भेज रहा हूँ, बस PIN डाल दीजिए।' और यह request आ गई। क्या PIN डालना चाहिए?",
          en: "One important thing. Someone calls and says: 'I'm sending you 5,000 rupees, just enter your PIN.' Then this request appears. Should you enter your PIN?",
        },
        options: [
          {
            text: { hi: 'हाँ, पैसे मिलेंगे', en: "Yes, I'll get the money" },
            correct: false,
            why: {
              hi: 'नहीं! पैसे लेने के लिए PIN कभी नहीं लगता। PIN डाला, तो आपके ही पैसे कटेंगे।',
              en: 'No! You never need a PIN to receive money. If you enter it, money leaves your account.',
            },
          },
          {
            text: { hi: 'नहीं, PIN सिर्फ़ पैसे देने के लिए है', en: 'No, a PIN is only for paying' },
            correct: true,
            why: {
              hi: 'शाबाश! पैसे लेने के लिए PIN कभी नहीं लगता।',
              en: 'Well done! You never need a PIN to receive money.',
            },
          },
        ],
      },
      {
        id: 'decline',
        screen: 'collect',
        kind: 'tap',
        target: 'decline',
        say: {
          hi: "अब इस request को मना कीजिए — 'Decline' दबाइए।",
          en: "Now refuse this request — tap 'Decline'.",
        },
        hint: {
          hi: "'Pay' नहीं! बाईं तरफ़ का 'Decline' बटन दबाइए।",
          en: "Not 'Pay'! Tap the 'Decline' button on the left.",
        },
      },
    ],
  },

  'whatsapp-docs': {
    id: 'whatsapp-docs',
    emoji: '📄',
    minutes: 2,
    title: {
      hi: 'WhatsApp पर पुरानी फ़ाइल या फ़ोटो ढूंढें',
      en: 'Find an old file or photo on WhatsApp',
    },
    takeaways: {
      hi: [
        'जिसने भेजा था, उसकी चैट खोलें',
        "ऊपर नाम दबाएं → 'Media, links and docs'",
        "फ़ोटो 'Media' में, PDF 'Docs' में",
      ],
      en: [
        'Open the chat of the person who sent it',
        "Tap their name at the top → 'Media, links and docs'",
        "Photos are in 'Media', PDFs are in 'Docs'",
      ],
    },
    share: {
      hi: 'मैंने Folks पर WhatsApp की पुरानी फ़ाइल ढूंढना सीख लिया! 🎉',
      en: 'I learned to find old WhatsApp files on Folks! 🎉',
    },
    realTry: {
      hi: 'अब अपने असली WhatsApp में किसी की भेजी फ़ाइल ऐसे ही ढूंढकर देखिए।',
      en: 'Now try finding a file someone sent you on your real WhatsApp, the same way.',
    },
    steps: [
      {
        id: 'intro',
        screen: 'intro',
        kind: 'info',
        say: {
          hi: 'रमेश भैया ने दो हफ़्ते पहले बिजली का बिल PDF में भेजा था। आज हम उसे ढूंढना सीखेंगे — बिना ऊपर-ऊपर स्क्रॉल किए। यह अभ्यास है, कोई मैसेज नहीं जाएगा।',
          en: "Ramesh Bhaiya sent the electricity bill as a PDF two weeks ago. Today we'll learn to find it — without scrolling up and up. This is practice; no message will be sent.",
        },
        button: { hi: 'शुरू करें', en: 'Start' },
      },
      {
        id: 'open-chat',
        screen: 'chat-list',
        kind: 'tap',
        target: 'chat-ramesh',
        say: {
          hi: "यह आपकी चैट की लिस्ट है। जिसने फ़ाइल भेजी थी, उसकी चैट खोलिए — 'Ramesh Bhaiya' दबाइए।",
          en: "This is your chat list. Open the chat of the person who sent the file — tap 'Ramesh Bhaiya'.",
        },
        hint: {
          hi: "'Ramesh Bhaiya' वाली लाइन दबाइए।",
          en: "Tap the 'Ramesh Bhaiya' row.",
        },
      },
      {
        id: 'tap-name',
        screen: 'chat',
        kind: 'tap',
        target: 'contact-name',
        say: {
          hi: "बिल बहुत पुराने मैसेज में है, पर स्क्रॉल करने की ज़रूरत नहीं। सबसे ऊपर उनका नाम 'Ramesh Bhaiya' दबाइए।",
          en: "The bill is far up in old messages, but you don't need to scroll. Tap their name 'Ramesh Bhaiya' at the very top.",
        },
        hint: {
          hi: 'स्क्रीन के सबसे ऊपर, हरी पट्टी में लिखा नाम दबाइए।',
          en: 'Tap the name in the green bar at the very top of the screen.',
        },
      },
      {
        id: 'media-row',
        screen: 'contact-info',
        kind: 'tap',
        target: 'media-row',
        say: {
          hi: "यहाँ 'Media, links and docs' लिखा है। इसमें उनकी भेजी हर फ़ोटो और फ़ाइल है। इसे दबाइए।",
          en: "Here it says 'Media, links and docs'. It has every photo and file they sent. Tap it.",
        },
        hint: {
          hi: "'Media, links and docs' वाली लाइन दबाइए।",
          en: "Tap the 'Media, links and docs' row.",
        },
      },
      {
        id: 'docs-tab',
        screen: 'media',
        tab: 'media',
        kind: 'tap',
        target: 'docs-tab',
        say: {
          hi: "ये फ़ोटो हैं। PDF फ़ाइलें 'Docs' में होती हैं। ऊपर 'Docs' दबाइए।",
          en: "These are photos. PDF files are under 'Docs'. Tap 'Docs' at the top.",
        },
        hint: {
          hi: "ऊपर बीच में 'Docs' लिखा है, उसे दबाइए।",
          en: "Tap 'Docs' in the middle at the top.",
        },
      },
      {
        id: 'open-bill',
        screen: 'media',
        tab: 'docs',
        kind: 'tap',
        target: 'bill',
        say: {
          hi: 'ये रहीं सारी फ़ाइलें। बिजली का बिल दबाइए।',
          en: 'Here are all the files. Tap the electricity bill.',
        },
        hint: {
          hi: "'Bijli_bill_Sept.pdf' दबाइए।",
          en: "Tap 'Bijli_bill_Sept.pdf'.",
        },
      },
      {
        id: 'opened',
        screen: 'pdf',
        kind: 'tap',
        target: 'done',
        say: {
          hi: "बिल खुल गया! अब आप इसे देख सकते हैं या आगे भेज सकते हैं। 'Done' दबाइए।",
          en: "The bill is open! You can read it or forward it now. Tap 'Done'.",
        },
        hint: {
          hi: "नीचे 'Done' दबाइए।",
          en: "Tap 'Done' at the bottom.",
        },
      },
      {
        id: 'photo-quiz',
        screen: 'media',
        tab: 'docs',
        kind: 'quiz',
        say: {
          hi: 'एक सवाल: अगर रमेश भैया की भेजी कोई फ़ोटो ढूंढनी हो, तो कौन सा टैब खोलेंगे?',
          en: 'One question: to find a photo Ramesh Bhaiya sent, which tab would you open?',
        },
        options: [
          {
            text: { hi: 'Media', en: 'Media' },
            correct: true,
            why: {
              hi: "सही! फ़ोटो और वीडियो 'Media' में, PDF 'Docs' में।",
              en: "Right! Photos and videos are in 'Media', PDFs in 'Docs'.",
            },
          },
          {
            text: { hi: 'Docs', en: 'Docs' },
            correct: false,
            why: {
              hi: "'Docs' में PDF जैसी फ़ाइलें होती हैं। फ़ोटो 'Media' में मिलती हैं।",
              en: "'Docs' has files like PDFs. Photos are in 'Media'.",
            },
          },
          {
            text: { hi: 'Links', en: 'Links' },
            correct: false,
            why: {
              hi: "'Links' में वेबसाइट के लिंक होते हैं। फ़ोटो 'Media' में मिलती हैं।",
              en: "'Links' has website links. Photos are in 'Media'.",
            },
          },
        ],
      },
    ],
  },
};

// Lessons people can ask for that aren't built yet. Taps and voice requests are logged as demand.
export const COMING_SOON = [
  { id: 'send-money', emoji: '💸', title: { hi: 'किसी को पैसे भेजें', en: 'Send money to someone' } },
  { id: 'whatsapp-status', emoji: '🟢', title: { hi: 'WhatsApp स्टेटस लगाएं', en: 'Post a WhatsApp status' } },
  { id: 'recharge', emoji: '📶', title: { hi: 'मोबाइल रिचार्ज करें', en: 'Recharge your mobile' } },
  { id: 'scan-doc', emoji: '🖨️', title: { hi: 'कागज़ स्कैन करके PDF बनाएं', en: 'Scan a paper into a PDF' } },
];

// Words parents might say, in Hindi, Hinglish and English. [word, weight]
export const KEYWORDS = {
  'qr-pay': [
    ['qr', 3], ['क्यूआर', 3], ['क्यू आर', 3], ['स्कैनर', 2], ['scanner', 2], ['स्कैन', 1], ['scan', 1],
    ['दुकान', 2], ['dukan', 2], ['shop', 2], ['phonepe', 2], ['फोनपे', 2], ['फ़ोनपे', 2], ['फोन पे', 2],
    ['gpay', 2], ['google pay', 2], ['paytm', 2], ['पेटीएम', 2], ['पेमेंट', 1], ['payment', 1], ['pay', 1],
    ['upi', 1], ['यूपीआई', 1], ['भुगतान', 1], ['पैसे देने', 2], ['पैसे दे', 1],
  ],
  'whatsapp-docs': [
    ['whatsapp', 1], ['व्हाट्सएप', 1], ['व्हाट्सऐप', 1], ['वॉट्सऐप', 1], ['वाट्सएप', 1],
    ['पुरानी', 2], ['पुराना', 2], ['purani', 2], ['old', 2], ['फोटो', 2], ['फ़ोटो', 2], ['photo', 2],
    ['pdf', 2], ['पीडीएफ', 2], ['document', 2], ['डॉक्यूमेंट', 2], ['फाइल', 2], ['फ़ाइल', 2], ['file', 2],
    ['ढूंढ', 2], ['ढूँढ', 2], ['dhoond', 2], ['find', 2], ['बिल', 1], ['bill', 1], ['media', 2], ['मीडिया', 2],
  ],
  'send-money': [['भेज', 3], ['bhej', 3], ['send money', 4], ['transfer', 3], ['ट्रांसफर', 3]],
  'whatsapp-status': [['status', 4], ['स्टेटस', 4]],
  recharge: [['recharge', 4], ['रिचार्ज', 4]],
  'scan-doc': [['कागज़', 4], ['कागज', 4], ['paper', 3], ['scan document', 4]],
};

export function findLesson(id) {
  return LESSONS[id] || null;
}

export function findSoon(id) {
  return COMING_SOON.find((s) => s.id === id) || null;
}
