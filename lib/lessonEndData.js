const words = (en,hi,ml) => ({en,hi,ml});
// Existing guide lessons had only two repetitive takeaways. Keep three short, useful reminders.
const GUIDE_TIPS = {
  'gd-install-app': [
    words('Open the Play Store and search for the app.', 'Play Store खोलकर ऐप ढूँढिए।', 'Play Store തുറന്ന് ആപ്പ് തിരയൂ.'),
    words('Check the developer before you install.', 'इंस्टॉल करने से पहले डेवलपर का नाम जाँचिए।', 'ഇൻസ്റ്റാൾ ചെയ്യുന്നതിന് മുമ്പ് ഡെവലപ്പറുടെ പേര് പരിശോധിക്കൂ.'),
    words('Read the permissions. Allow only what the app needs.', 'अनुमतियाँ पढ़िए। ऐप को जितनी ज़रूरत हो उतनी ही दीजिए।', 'അനുമതികൾ വായിക്കൂ. ആപ്പിന് ആവശ്യമുള്ളത് മാത്രം അനുവദിക്കൂ.'),
  ],
  'gd-icon-meanings': [
    words('The magnifying glass means Search.', 'आवर्धक काँच का निशान यानी खोजें।', 'ഭൂതക്കണ്ണാടി ചിഹ്നം തിരയാൻ ഉള്ളതാണ്.'),
    words('The back arrow takes you to the previous screen.', 'पीछे वाला तीर पिछले पेज पर ले जाता है।', 'പിന്നോട്ടുള്ള അമ്പ് മുമ്പത്തെ സ്ക്രീനിലേക്ക് കൊണ്ടുപോകും.'),
    words('Read the label beside an icon before tapping.', 'निशान दबाने से पहले उसके पास लिखा नाम पढ़िए।', 'ഐക്കൺ അമർത്തുന്നതിന് മുമ്പ് അടുത്തുള്ള പേര് വായിക്കൂ.'),
  ],
  'gd-uber-cancel': [
    words('Open your booked ride and choose Cancel ride.', 'बुक की हुई राइड खोलकर Cancel ride चुनिए।', 'ബുക്ക് ചെയ്ത റൈഡ് തുറന്ന് Cancel ride തിരഞ്ഞെടുക്കൂ.'),
    words('Read any cancellation fee before confirming.', 'पुष्टि करने से पहले रद्द करने का शुल्क पढ़िए।', 'സ്ഥിരീകരിക്കുന്നതിന് മുമ്പ് റദ്ദാക്കൽ ഫീസ് വായിക്കൂ.'),
    words('Choose the true reason and wait for confirmation.', 'सही कारण चुनिए और रद्द होने की पुष्टि का इंतज़ार कीजिए।', 'യഥാർത്ഥ കാരണം തിരഞ്ഞെടുത്ത് റദ്ദായതിന്റെ സ്ഥിരീകരണത്തിനായി കാത്തിരിക്കൂ.'),
  ],
  'gd-ride-driver-check': [
    words('Match the number plate, car and driver with your booking.', 'नंबर प्लेट, गाड़ी और ड्राइवर को अपनी बुकिंग से मिलाइए।', 'നമ്പർ പ്ലേറ്റും കാറും ഡ്രൈവറും ബുക്കിങ്ങുമായി ഒത്തുനോക്കൂ.'),
    words('Ask the driver whom they are picking up.', 'ड्राइवर से पूछिए कि वे किसे लेने आए हैं।', 'ആരെയാണ് കൊണ്ടുപോകാൻ വന്നതെന്ന് ഡ്രൈവറോട് ചോദിക്കൂ.'),
    words('If details differ, stay outside and contact your booked driver. Wait safely for the matching car.', 'जानकारी अलग हो तो बाहर रहकर बुक किए ड्राइवर से बात कीजिए। सही गाड़ी का सुरक्षित जगह इंतज़ार कीजिए।', 'വിവരങ്ങൾ വ്യത്യസ്തമാണെങ്കിൽ പുറത്ത് നിന്ന് ബുക്ക് ചെയ്ത ഡ്രൈവറെ ബന്ധപ്പെടൂ. ശരിയായ കാറിനായി സുരക്ഷിതമായി കാത്തിരിക്കൂ.'),
  ],
  'gd-ride-pay-upi': [
    words('Check the payment method before booking.', 'बुक करने से पहले भुगतान का तरीका जाँचिए।', 'ബുക്ക് ചെയ്യുന്നതിന് മുമ്പ് പണമടയ്ക്കുന്ന രീതി പരിശോധിക്കൂ.'),
    words('Check the payment status before paying again.', 'दोबारा पैसे देने से पहले भुगतान की स्थिति जाँचिए।', 'വീണ്ടും അടയ്ക്കുന്നതിന് മുമ്പ് പണമടച്ച നില പരിശോധിക്കൂ.'),
    words('Rate your ride if you want. A tip is optional.', 'चाहें तो राइड को रेटिंग दीजिए। टिप देना ज़रूरी नहीं।', 'വേണമെങ്കിൽ റൈഡിന് റേറ്റിങ് നൽകൂ. ടിപ്പ് നിർബന്ധമല്ല.'),
  ],
};
const SAFETY = {'qr-pay':[2], 'send-money':[1,2], recharge:[2], 'whatsapp-status':[2], 'video-call':[2], 'uber-cab':[2], 'yono-balance':[2], 'gd-install-app':[1,2], 'gd-gpay-balance':[1,2], 'gd-uber-cancel':[1], 'gd-ride-driver-check':[2], 'gd-ride-pay-upi':[1]};
export function applyLessonEndData(lessons) {
  const list = Object.values(lessons);
  for (const lesson of list) {
    const tips = GUIDE_TIPS[lesson.id] || lesson.takeaways.en.map((_,i)=>words(...['en','hi','ml'].map(lang=>lesson.takeaways[lang][i])));
    lesson.tips = tips.map((text,i)=>({text,safety:SAFETY[lesson.id]?.includes(i)||false}));
    const appLessons = list.filter(l=>l.app===lesson.app);
    lesson.nextLessonId = appLessons[appLessons.indexOf(lesson)+1]?.id || null;
  }
}
