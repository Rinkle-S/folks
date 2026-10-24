// The WhatsApp wording used when a lesson or guide link is sent to a parent (the /send page and the Share buttons).
export const MSG = {
  en: {
    lesson: (title, link, sign) => `🙏 A short practice lesson for you: "${title}". It's only practice, no real money is used. Take your time, just tap this link:\n${link}${sign}`,
    guide: (title, link, sign) => `🙏 Here are the steps for: "${title}". Take your time, one step at a time. Tap this link:\n${link}${sign}`,
    setup: (link, sign) => `🙏 I set up Nook for you. It teaches phone things step by step, in your language, with practice screens. Just tap this link and it is ready:\n${link}${sign}`,
  },
  hi: {
    lesson: (title, link, sign) => `🙏 आपके लिए एक छोटा सा अभ्यास: "${title}"। यह सिर्फ़ प्रैक्टिस है, असली पैसे नहीं कटेंगे। आराम से सीखिए, यह लिंक दबाइए:\n${link}${sign}`,
    guide: (title, link, sign) => `🙏 यह रहे इसके कदम: "${title}"। आराम से, एक-एक कदम। यह लिंक दबाइए:\n${link}${sign}`,
    setup: (link, sign) => `🙏 मैंने आपके लिए Nook तैयार कर दिया है। यह फ़ोन की बातें कदम-कदम सिखाता है, आपकी भाषा में, अभ्यास स्क्रीन के साथ। बस यह लिंक दबाइए:\n${link}${sign}`,
  },
  ml: {
    lesson: (title, link, sign) => `🙏 നിങ്ങൾക്കായി ഒരു ചെറിയ പരിശീലന പാഠം: "${title}". ഇത് പരിശീലനം മാത്രമാണ്, യഥാർത്ഥ പണം പോകില്ല. സാവധാനം പഠിക്കൂ, ഈ ലിങ്ക് അമർത്തൂ:\n${link}${sign}`,
    guide: (title, link, sign) => `🙏 ഇതിന്റെ ഘട്ടങ്ങൾ ഇതാ: "${title}". സാവധാനം, ഓരോ ഘട്ടമായി. ഈ ലിങ്ക് അമർത്തൂ:\n${link}${sign}`,
    setup: (link, sign) => `🙏 ഞാൻ നിങ്ങൾക്കായി Nook സെറ്റ് ചെയ്തിട്ടുണ്ട്. ഫോണിലെ കാര്യങ്ങൾ നിങ്ങളുടെ ഭാഷയിൽ ഘട്ടം ഘട്ടമായി പഠിപ്പിക്കും. ഈ ലിങ്ക് അമർത്തൂ:\n${link}${sign}`,
  },
};
