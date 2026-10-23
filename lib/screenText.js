// Text that is drawn inside practice screens (fake chats, a typed status, video captions) and is not
// part of a lesson's { en, hi, ml } data. Malayalam is keyed by the default text, like lib/ml.js.
// Anything without a Malayalam entry is shown as written, so a Malayalam screen never shows Hindi.
const ML_SCREEN = {
  // WhatsApp chat list previews
  'Sunita: 🙏 सुप्रभात': 'Sunita: 🙏 സുപ്രഭാതം',
  '✓✓ ठीक है, शाम को मिलते हैं': '✓✓ ശരി, വൈകുന്നേരം കാണാം',
  'Shall we go for a walk tomorrow?': 'നാളെ നടക്കാൻ പോകാമോ?',
  'Ok Mummy, call you in the evening': 'ശരി അമ്മേ, വൈകുന്നേരം വിളിക്കാം',
  'Congratulations! You won ₹25 lakh…': 'അഭിനന്ദനങ്ങൾ! നിങ്ങൾ ₹25 ലക്ഷം നേടി…',
  // Ramesh Bhaiya chat
  'नमस्ते! कैसे हो?': 'നമസ്കാരം! സുഖമാണോ?',
  'सब ठीक है 🙏': 'സുഖം തന്നെ 🙏',
  'कल बाज़ार चलेंगे?': 'നാളെ ചന്തയിൽ പോകാമോ?',
  'हाँ, 10 बजे': 'ശരി, 10 മണിക്ക്',
  'ठीक है, शाम को मिलते हैं': 'ശരി, വൈകുന്നേരം കാണാം',
  // Rahul (Beta) chat
  'Beta, khana khaya?': 'മോനേ, ഭക്ഷണം കഴിച്ചോ?',
  'Haan Mummy 😊': 'കഴിച്ചു അമ്മേ 😊',
  'Sunday ko dinner pe aa raha hoon?': 'ഞായറാഴ്ച അത്താഴത്തിന് വരട്ടെ?',
  'Haan beta, aa jao 😊': 'ശരി മോനേ, വാ 😊',
  // Family group chat
  '🙏 सुप्रभात': '🙏 സുപ്രഭാതം',
  'Photos from the party': 'പാർട്ടിയുടെ ഫോട്ടോകൾ',
  'Bahut sundar! ❤️': 'വളരെ മനോഹരം! ❤️',
  // Message from a stranger (the lottery scam)
  'Congratulations! You won ₹25 lakh in KBC lucky draw. Send ₹5,000 processing fee to claim. Click: kbc-prize.xyz':
    'അഭിനന്ദനങ്ങൾ! KBC ലക്കി ഡ്രോയിൽ നിങ്ങൾ ₹25 ലക്ഷം നേടി. സമ്മാനം ലഭിക്കാൻ ₹5,000 പ്രോസസ്സിംഗ് ഫീസ് അയയ്ക്കൂ. ക്ലിക്ക് ചെയ്യൂ: kbc-prize.xyz',
  // Greetings drawn inside other apps
  'Namaste, Kamla': 'നമസ്കാരം, Kamla',
  'Namaste! This is how the words will look in your apps and messages.': 'നമസ്കാരം! നിങ്ങളുടെ ആപ്പുകളിലും സന്ദേശങ്ങളിലും വാക്കുകൾ ഇങ്ങനെ കാണും.',
  // WhatsApp status text
  'Good Morning ☀️': 'സുപ്രഭാതം ☀️',
  // YouTube caption
  'Every morning brings a new song': 'ഓരോ പ്രഭാതവും ഒരു പുതിയ പാട്ട് കൊണ്ടുവരുന്നു',
};

// The yellow note on a practice PIN screen: any digits are fine, never the real PIN.
export const PIN_NOTE = {
  en: 'Practice only: type any 4 numbers. Never your real PIN.',
  hi: 'सिर्फ़ अभ्यास: कोई भी 4 नंबर डालिए। असली PIN कभी नहीं।',
  ml: 'പരിശീലനം മാത്രം: ഏതെങ്കിലും 4 നമ്പർ അടിക്കൂ. യഥാർത്ഥ PIN ഒരിക്കലും വേണ്ട.',
};

// Hindi for the few texts that are written in English by default.
const HI_SCREEN = {
  'Shall we go for a walk tomorrow?': 'कल सैर पर चलेंगे?',
  'Good Morning ☀️': 'सुप्रभात ☀️',
  'Every morning brings a new song': 'हर सुबह एक नया गीत लाती है',
};

export function st(text, lang) {
  if (lang === 'ml' && ML_SCREEN[text] !== undefined) return ML_SCREEN[text];
  if (lang === 'hi' && HI_SCREEN[text] !== undefined) return HI_SCREEN[text];
  return text;
}
