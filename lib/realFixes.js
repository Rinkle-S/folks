// Wording for "Read the steps" and "Do it on my real phone", for steps whose practice wording only makes sense on the
// practice screen ("type any 6 numbers", "it is already filled", "tap the glowing line"). On the real phone a person uses
// their own details. Keyed by lesson id, then step id. Everything here is in all three languages.
const SWIPE = {
  en: 'Put your finger at the very top of the screen and slide it down.',
  hi: 'उंगली को स्क्रीन के बिल्कुल ऊपर रखकर नीचे सरकाइए।',
  ml: 'വിരൽ സ്ക്രീനിന്റെ ഏറ്റവും മുകളിൽ വെച്ച് താഴേക്ക് നീക്കൂ.',
};

export const REAL_FIXES = {
  flashlight: { swipe: SWIPE },
  silent: { swipe: SWIPE },
  screenshot: {
    press: {
      en: 'We want to save this ticket. On the side of your phone, press the Volume down button and the Power button together, for one second.',
      hi: 'हम यह टिकट सेव करना चाहते हैं। फ़ोन की साइड में Volume down और Power बटन एक साथ एक सेकंड दबाइए।',
      ml: 'ഈ ടിക്കറ്റ് സൂക്ഷിക്കണം. ഫോണിന്റെ വശത്തുള്ള Volume down, Power ബട്ടണുകൾ ഒരു സെക്കൻഡ് ഒരുമിച്ച് അമർത്തൂ.',
    },
  },
  wifi: {
    connect: {
      en: 'It asks for the password. Type it from the back of your router. Then tap Connect.',
      hi: 'यह पासवर्ड मांग रहा है। राउटर के पीछे से देखकर लिखिए। फिर Connect दबाइए।',
      ml: 'പാസ്‌വേഡ് ചോദിക്കുന്നു. റൂട്ടറിന്റെ പിന്നിൽ നിന്ന് നോക്കി അടിക്കൂ. എന്നിട്ട് Connect അമർത്തൂ.',
    },
  },
  'yono-balance': {
    mpin: {
      en: 'Now type your own PIN. Cover the screen with your hand, and never tell your PIN to anyone.',
      hi: 'अब अपना असली PIN डालिए। स्क्रीन को हाथ से ढक लीजिए, और PIN किसी को कभी न बताइए।',
      ml: 'ഇനി നിങ്ങളുടെ സ്വന്തം PIN അടിക്കൂ. സ്ക്രീൻ കൈ കൊണ്ട് മറയ്ക്കൂ, PIN ആരോടും പറയരുത്.',
    },
  },
  'irctc-ticket': {
    login: {
      en: "IRCTC needs you to log in first. Type your own user ID and password, then tap 'Login'.",
      hi: "IRCTC में पहले लॉगिन करना होता है। अपना यूज़र आईडी और पासवर्ड लिखिए, फिर 'Login' दबाइए।",
      ml: "IRCTC-യിൽ ആദ്യം ലോഗിൻ ചെയ്യണം. നിങ്ങളുടെ സ്വന്തം യൂസർ ഐഡിയും പാസ്‌വേഡും അടിച്ച് 'Login' അമർത്തൂ.",
    },
    to: {
      en: "Check the station you are starting from. Then tap the 'To' box to choose where you are going.",
      hi: "देखिए कि आप किस स्टेशन से चल रहे हैं। फिर कहाँ जाना है, यह चुनने के लिए 'To' वाला डिब्बा दबाइए।",
      ml: "നിങ്ങൾ തുടങ്ങുന്ന സ്റ്റേഷൻ നോക്കൂ. പിന്നെ എവിടേക്കാണ് പോകേണ്ടത് എന്ന് തിരഞ്ഞെടുക്കാൻ 'To' പെട്ടി അമർത്തൂ.",
    },
  },
  'irctc-pnr': {
    check: {
      en: "Type the 10-number PNR printed on your ticket. Then tap 'Check status'.",
      hi: "टिकट पर छपा 10 अंकों का PNR लिखिए। फिर 'Check status' दबाइए।",
      ml: "ടിക്കറ്റിൽ അച്ചടിച്ച 10 അക്ക PNR അടിക്കൂ. എന്നിട്ട് 'Check status' അമർത്തൂ.",
    },
  },
};
