// Stay safe reading lessons: three common frauds, three short pages each, then a one-card quick check.
// Every text has en, hi and ml so each screen stays in the chosen language (checked by npm run check:ml).
export const SAFE_LESSONS = [
  {
    id: 'digital-arrest',
    icon: '📞',
    title: {
      en: '"Digital arrest" calls',
      hi: '"डिजिटल अरेस्ट" वाले कॉल',
      ml: '"ഡിജിറ്റൽ അറസ്റ്റ്" കോളുകൾ',
    },
    spot: {
      h: { en: 'Spot the fake call', hi: 'नकली कॉल पहचानिए', ml: 'വ്യാജ കോൾ തിരിച്ചറിയൂ' },
      from: { en: 'WhatsApp video call', hi: 'WhatsApp वीडियो कॉल', ml: 'WhatsApp വീഡിയോ കോൾ' },
      who: { en: '"Officer Rana, CBI"', hi: '"अधिकारी राणा, CBI"', ml: '"ഓഫീസർ റാണ, CBI"' },
      msg: [
        { t: { en: 'A parcel in your name has illegal things. You are under ', hi: 'आपके नाम के पार्सल में गैरकानूनी सामान है। आप ', ml: 'നിങ്ങളുടെ പേരിലുള്ള പാഴ്സലിൽ നിയമവിരുദ്ധ സാധനങ്ങളുണ്ട്. നിങ്ങൾ ' } },
        { m: 1, t: { en: 'digital arrest', hi: 'डिजिटल अरेस्ट में हैं', ml: 'ഡിജിറ്റൽ അറസ്റ്റിലാണ്' } },
        { t: { en: '. Stay on this call. ', hi: '। इस कॉल पर बने रहिए। ', ml: '. ഈ കോളിൽ തുടരൂ. ' } },
        { m: 2, t: { en: 'Tell no one', hi: 'किसी को न बताइए', ml: 'ആരോടും പറയരുത്' } },
        { t: { en: '.', hi: '।', ml: '.' } },
      ],
      flags: [
        { en: 'A "police" video call', hi: '"पुलिस" का वीडियो कॉल', ml: '"പോലീസ്" വീഡിയോ കോൾ' },
        { en: 'You must stay and tell no one', hi: 'आपको रुकना है और किसी को नहीं बताना', ml: 'ആരോടും പറയാതെ കോളിൽ തുടരണം' },
        { en: 'Police do not arrest by video call', hi: 'पुलिस वीडियो कॉल पर गिरफ़्तार नहीं करती', ml: 'പോലീസ് വീഡിയോ കോളിൽ അറസ്റ്റ് ചെയ്യില്ല' },
      ],
      remember: { en: 'There is no such thing as "digital arrest".', hi: '"डिजिटल अरेस्ट" जैसा कुछ होता ही नहीं।', ml: '"ഡിജിറ്റൽ അറസ്റ്റ്" എന്നൊന്ന് ഇല്ല.' },
    },
    how: {
      sub: { en: 'It always happens in 3 steps.', hi: 'यह हमेशा 3 कदमों में होता है।', ml: 'ഇത് എപ്പോഴും 3 ഘട്ടങ്ങളിലാണ്.' },
      steps: [
        {
          t: { en: 'They scare you', hi: 'वे आपको डराते हैं', ml: 'അവർ പേടിപ്പിക്കുന്നു' },
          d: { en: 'A "courier" or "customs" call says your parcel or number is used in a crime.', hi: '"कूरियर" या "कस्टम" का कॉल कहता है कि आपका पार्सल या नंबर अपराध में इस्तेमाल हुआ है।', ml: '"കൊറിയർ" അല്ലെങ്കിൽ "കസ്റ്റംസ്" കോൾ നിങ്ങളുടെ പാഴ്സലോ നമ്പറോ കുറ്റകൃത്യത്തിൽ ഉപയോഗിച്ചെന്ന് പറയുന്നു.' },
        },
        {
          t: { en: 'They keep you on video', hi: 'वे आपको वीडियो पर रोकते हैं', ml: 'അവർ വീഡിയോയിൽ തടഞ്ഞുവെക്കുന്നു' },
          d: { en: 'A "senior officer" in uniform shows fake papers. You are told to stay and tell no one.', hi: 'वर्दी में एक "बड़ा अधिकारी" नकली कागज़ दिखाता है। कहा जाता है कि रुकिए और किसी को मत बताइए।', ml: 'യൂണിഫോമിലുള്ള "ഉന്നത ഉദ്യോഗസ്ഥൻ" വ്യാജ പേപ്പറുകൾ കാണിക്കുന്നു. തുടരാനും ആരോടും പറയാതിരിക്കാനും പറയുന്നു.' },
        },
        {
          t: { en: 'They ask for money', hi: 'वे पैसे माँगते हैं', ml: 'അവർ പണം ചോദിക്കുന്നു' },
          d: { en: 'To "prove you are innocent", you must move money to a "safe account".', hi: '"बेगुनाही साबित करने" के लिए आपको "सुरक्षित खाते" में पैसे भेजने को कहा जाता है।', ml: '"നിരപരാധിത്വം തെളിയിക്കാൻ" "സുരക്ഷിത അക്കൗണ്ടിലേക്ക്" പണം അയയ്ക്കാൻ പറയുന്നു.' },
        },
      ],
      remember: { en: 'They want you scared and alone.', hi: 'वे चाहते हैं कि आप डरे हुए और अकेले रहें।', ml: 'നിങ്ങൾ പേടിച്ച് തനിച്ചാകണമെന്നാണ് അവർക്ക്.' },
    },
    todo: {
      rule: { en: 'Real police never ask for money on a call.', hi: 'असली पुलिस कॉल पर कभी पैसे नहीं माँगती।', ml: 'യഥാർത്ഥ പോലീസ് കോളിൽ ഒരിക്കലും പണം ചോദിക്കില്ല.' },
      acts: [
        { en: '<b>Hang up.</b> Tell someone you trust.', hi: '<b>कॉल काट दीजिए।</b> किसी भरोसेमंद को बताइए।', ml: '<b>കോൾ കട്ട് ചെയ്യൂ.</b> വിശ്വസിക്കുന്ന ഒരാളോട് പറയൂ.' },
        { en: '<b>Send no money.</b> Not even a little.', hi: '<b>पैसे मत भेजिए।</b> थोड़े भी नहीं।', ml: '<b>പണം അയയ്ക്കരുത്.</b> ഒരു ചെറിയ തുകയും.' },
      ],
    },
    check: {
      from: { en: 'Video call · "Inspector Verma"', hi: 'वीडियो कॉल · "इंस्पेक्टर वर्मा"', ml: 'വീഡിയോ കോൾ · "ഇൻസ്പെക്ടർ വർമ്മ"' },
      msg: {
        en: 'You are under digital arrest. Do not hang up. Transfer ₹50,000 to a safe account to prove you are innocent.',
        hi: 'आप डिजिटल अरेस्ट में हैं। कॉल मत काटिए। बेगुनाही साबित करने के लिए ₹50,000 सुरक्षित खाते में भेजिए।',
        ml: 'നിങ്ങൾ ഡിജിറ്റൽ അറസ്റ്റിലാണ്. കോൾ കട്ട് ചെയ്യരുത്. നിരപരാധിത്വം തെളിയിക്കാൻ ₹50,000 സുരക്ഷിത അക്കൗണ്ടിലേക്ക് അയയ്ക്കൂ.',
      },
      why: {
        en: 'No police office arrests anyone on a video call, or asks for money. Hang up and call 1930.',
        hi: 'कोई पुलिस वीडियो कॉल पर गिरफ़्तार नहीं करती और न पैसे माँगती है। कॉल काटिए और 1930 पर बताइए।',
        ml: 'ഒരു പോലീസും വീഡിയോ കോളിൽ അറസ്റ്റ് ചെയ്യുകയോ പണം ചോദിക്കുകയോ ഇല്ല. കോൾ കട്ട് ചെയ്ത് 1930 വിളിക്കൂ.',
      },
    },
  },
  {
    id: 'account-blocked',
    icon: '🏦',
    title: {
      en: '"Your account is blocked"',
      hi: '"आपका खाता बंद हो गया है"',
      ml: '"നിങ്ങളുടെ അക്കൗണ്ട് ബ്ലോക്ക് ആയി"',
    },
    spot: {
      h: { en: 'Spot the fake message', hi: 'नकली मैसेज पहचानिए', ml: 'വ്യാജ മെസ്സേജ് തിരിച്ചറിയൂ' },
      from: { en: '+91 98xxx xx210', hi: '+91 98xxx xx210', ml: '+91 98xxx xx210' },
      who: null,
      msg: [
        { t: { en: 'Dear customer, your bank account will be ', hi: 'प्रिय ग्राहक, आपका बैंक खाता ', ml: 'പ്രിയ ഉപഭോക്താവേ, നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ട് ' } },
        { m: 2, t: { en: 'blocked today', hi: 'आज बंद हो जाएगा', ml: 'ഇന്ന് ബ്ലോക്ക് ആകും' } },
        { t: { en: '. Update KYC now: ', hi: '। अभी KYC अपडेट करें: ', ml: '. ഇപ്പോൾ KYC അപ്ഡേറ്റ് ചെയ്യൂ: ' } },
        { m: 3, t: { en: 'bit-kyc.in', hi: 'bit-kyc.in', ml: 'bit-kyc.in' }, link: 1 },
      ],
      flags: [
        { en: "A number you don't know", hi: 'एक अनजान नंबर', ml: 'അറിയാത്ത ഒരു നമ്പർ' },
        { en: 'It rushes you: "today", "now"', hi: 'यह जल्दी करवाता है: "आज", "अभी"', ml: 'ധൃതി കൂട്ടുന്നു: "ഇന്ന്", "ഇപ്പോൾ"' },
        { en: 'A strange link to tap', hi: 'दबाने के लिए अजीब लिंक', ml: 'അമർത്താൻ ഒരു വിചിത്ര ലിങ്ക്' },
      ],
      remember: { en: 'Banks never send a link to "unblock" your account.', hi: 'बैंक खाता "खोलने" के लिए कभी लिंक नहीं भेजते।', ml: 'അക്കൗണ്ട് "അൺബ്ലോക്ക്" ചെയ്യാൻ ബാങ്ക് ഒരിക്കലും ലിങ്ക് അയയ്ക്കില്ല.' },
    },
    how: {
      sub: { en: 'It always happens in 3 steps.', hi: 'यह हमेशा 3 कदमों में होता है।', ml: 'ഇത് എപ്പോഴും 3 ഘട്ടങ്ങളിലാണ്.' },
      steps: [
        {
          t: { en: 'They contact you', hi: 'वे आपसे संपर्क करते हैं', ml: 'അവർ നിങ്ങളെ ബന്ധപ്പെടുന്നു' },
          d: { en: "By SMS, call or WhatsApp. Often with a bank's name or logo.", hi: 'SMS, कॉल या WhatsApp से। अक्सर बैंक के नाम या लोगो के साथ।', ml: 'SMS, കോൾ അല്ലെങ്കിൽ WhatsApp വഴി. പലപ്പോഴും ബാങ്കിന്റെ പേരോ ലോഗോയോ ഉണ്ടാകും.' },
        },
        {
          t: { en: 'They scare you', hi: 'वे आपको डराते हैं', ml: 'അവർ പേടിപ്പിക്കുന്നു' },
          d: { en: '"Your account is blocked." "Your card is being misused."', hi: '"आपका खाता बंद हो गया है।" "आपके कार्ड का गलत इस्तेमाल हो रहा है।"', ml: '"നിങ്ങളുടെ അക്കൗണ്ട് ബ്ലോക്ക് ആയി." "നിങ്ങളുടെ കാർഡ് ദുരുപയോഗം ചെയ്യപ്പെടുന്നു."' },
        },
        {
          t: { en: 'They ask for your code', hi: 'वे आपका कोड माँगते हैं', ml: 'അവർ നിങ്ങളുടെ കോഡ് ചോദിക്കുന്നു' },
          d: { en: 'Your OTP (the code sent to your phone), PIN, or the 3 numbers on the back of your card.', hi: 'आपका OTP (फ़ोन पर आया कोड), PIN, या कार्ड के पीछे के 3 अंक।', ml: 'നിങ്ങളുടെ OTP (ഫോണിൽ വന്ന കോഡ്), PIN, അല്ലെങ്കിൽ കാർഡിന്റെ പിന്നിലെ 3 അക്കങ്ങൾ.' },
        },
      ],
      remember: { en: "They want you to panic, so you don't stop to think.", hi: 'वे चाहते हैं कि आप घबराएँ, ताकि आप सोचने न रुकें।', ml: 'നിങ്ങൾ പരിഭ്രമിക്കണം, ചിന്തിക്കാൻ നിൽക്കരുത് എന്നാണ് അവരുടെ ആഗ്രഹം.' },
    },
    todo: {
      rule: { en: 'Never share your OTP or PIN. Not even with "the bank".', hi: 'OTP या PIN कभी किसी को न बताइए। "बैंक" को भी नहीं।', ml: 'OTP-യോ PIN-ഓ ആരോടും പറയരുത്. "ബാങ്കി"നോട് പോലും.' },
      acts: [
        { en: "<b>Don't tap the link.</b> Delete the message.", hi: '<b>लिंक मत दबाइए।</b> मैसेज मिटा दीजिए।', ml: '<b>ലിങ്ക് അമർത്തരുത്.</b> മെസ്സേജ് ഡിലീറ്റ് ചെയ്യൂ.' },
        { en: '<b>Worried?</b> Call your bank yourself, using the number on your card.', hi: '<b>चिंता है?</b> कार्ड पर छपे नंबर से खुद बैंक को फ़ोन कीजिए।', ml: '<b>ആശങ്കയുണ്ടോ?</b> കാർഡിലെ നമ്പറിൽ സ്വയം ബാങ്കിനെ വിളിക്കൂ.' },
      ],
    },
    check: {
      from: { en: 'Bank Help Desk · WhatsApp', hi: 'बैंक हेल्प डेस्क · WhatsApp', ml: 'ബാങ്ക് ഹെൽപ്പ് ഡെസ്ക് · WhatsApp' },
      msg: {
        en: 'Your debit card is blocked due to misuse. Please share the OTP we just sent to unblock it.',
        hi: 'आपका डेबिट कार्ड गलत इस्तेमाल के कारण बंद हो गया है। खोलने के लिए अभी भेजा गया OTP बताइए।',
        ml: 'ദുരുപയോഗം കാരണം നിങ്ങളുടെ ഡെബിറ്റ് കാർഡ് ബ്ലോക്ക് ആയി. തുറക്കാൻ ഇപ്പോൾ അയച്ച OTP പറയൂ.',
      },
      why: {
        en: "A real bank never asks for your OTP. Don't reply. Block the number.",
        hi: 'असली बैंक आपका OTP कभी नहीं माँगता। जवाब मत दीजिए। नंबर ब्लॉक कर दीजिए।',
        ml: 'യഥാർത്ഥ ബാങ്ക് നിങ്ങളുടെ OTP ഒരിക്കലും ചോദിക്കില്ല. മറുപടി നൽകരുത്. നമ്പർ ബ്ലോക്ക് ചെയ്യൂ.',
      },
    },
  },
  {
    id: 'fake-investment',
    icon: '📈',
    title: {
      en: 'Fake investment groups',
      hi: 'नकली निवेश ग्रुप',
      ml: 'വ്യാജ നിക്ഷേപ ഗ്രൂപ്പുകൾ',
    },
    spot: {
      h: { en: 'Spot the fake group', hi: 'नकली ग्रुप पहचानिए', ml: 'വ്യാജ ഗ്രൂപ്പ് തിരിച്ചറിയൂ' },
      from: { en: 'WhatsApp group · "VIP Stock Club"', hi: 'WhatsApp ग्रुप · "VIP स्टॉक क्लब"', ml: 'WhatsApp ഗ്രൂപ്പ് · "VIP സ്റ്റോക്ക് ക്ലബ്"' },
      who: null,
      msg: [
        { t: { en: 'Join our free trading group. ', hi: 'हमारे मुफ़्त ट्रेडिंग ग्रुप से जुड़िए। ', ml: 'ഞങ്ങളുടെ സൗജന്യ ട്രേഡിംഗ് ഗ്രൂപ്പിൽ ചേരൂ. ' } },
        { m: 2, t: { en: '₹10,000 becomes ₹40,000 in a month', hi: '₹10,000 एक महीने में ₹40,000 बन जाते हैं', ml: '₹10,000 ഒരു മാസം കൊണ്ട് ₹40,000 ആകും' } },
        { t: { en: '. ', hi: '। ', ml: '. ' } },
        { m: 3, t: { en: 'Guaranteed', hi: 'गारंटी के साथ', ml: 'ഉറപ്പായും' } },
        { t: { en: '.', hi: '।', ml: '.' } },
      ],
      flags: [
        { en: "An invite from someone you don't know", hi: 'अनजान व्यक्ति का न्योता', ml: 'അറിയാത്ത ഒരാളുടെ ക്ഷണം' },
        { en: 'Big profit, "guaranteed"', hi: 'बड़ा मुनाफ़ा, "गारंटी" के साथ', ml: 'വലിയ ലാഭം, "ഉറപ്പ്"' },
        { en: 'Other "members" show profit screenshots', hi: 'दूसरे "सदस्य" मुनाफ़े के स्क्रीनशॉट दिखाते हैं', ml: 'മറ്റ് "അംഗങ്ങൾ" ലാഭത്തിന്റെ സ്ക്രീൻഷോട്ട് കാണിക്കുന്നു' },
      ],
      remember: { en: 'Nobody can promise a safe, high profit.', hi: 'कोई भी सुरक्षित और ऊँचे मुनाफ़े का वादा नहीं कर सकता।', ml: 'സുരക്ഷിതവും ഉയർന്നതുമായ ലാഭം ആർക്കും ഉറപ്പു നൽകാനാവില്ല.' },
    },
    how: {
      sub: { en: 'It always happens in 3 steps.', hi: 'यह हमेशा 3 कदमों में होता है।', ml: 'ഇത് എപ്പോഴും 3 ഘട്ടങ്ങളിലാണ്.' },
      steps: [
        {
          t: { en: 'They invite you', hi: 'वे आपको जोड़ते हैं', ml: 'അവർ നിങ്ങളെ ക്ഷണിക്കുന്നു' },
          d: { en: 'A "VIP" or "free course" group on WhatsApp or Telegram, often with a famous face.', hi: 'WhatsApp या Telegram पर "VIP" या "मुफ़्त कोर्स" ग्रुप, अक्सर किसी मशहूर चेहरे के साथ।', ml: 'WhatsApp അല്ലെങ്കിൽ Telegram-ലെ "VIP" അല്ലെങ്കിൽ "സൗജന്യ കോഴ്സ്" ഗ്രൂപ്പ്, പലപ്പോഴും പ്രശസ്തരുടെ മുഖത്തോടെ.' },
        },
        {
          t: { en: 'They show fake profits', hi: 'वे नकली मुनाफ़ा दिखाते हैं', ml: 'അവർ വ്യാജ ലാഭം കാണിക്കുന്നു' },
          d: { en: 'Other "members" post big profits. You put in a small amount and it seems to grow.', hi: 'दूसरे "सदस्य" बड़ा मुनाफ़ा दिखाते हैं। आप थोड़े पैसे लगाते हैं और वह बढ़ता दिखता है।', ml: 'മറ്റ് "അംഗങ്ങൾ" വലിയ ലാഭം പോസ്റ്റ് ചെയ്യുന്നു. നിങ്ങൾ ചെറിയ തുക ഇടുമ്പോൾ അത് വളരുന്നതായി തോന്നും.' },
        },
        {
          t: { en: 'They ask for more', hi: 'वे और माँगते हैं', ml: 'അവർ കൂടുതൽ ചോദിക്കുന്നു' },
          d: { en: 'To take money out, there is always one more fee. Then the group goes quiet.', hi: 'पैसे निकालने के लिए हर बार एक और फ़ीस लगती है। फिर ग्रुप चुप हो जाता है।', ml: 'പണം എടുക്കാൻ എപ്പോഴും ഒരു ഫീസ് കൂടി വേണം. പിന്നെ ഗ്രൂപ്പ് നിശ്ശബ്ദമാകും.' },
        },
      ],
      remember: { en: 'The profits you see are fake. The money you send is real.', hi: 'जो मुनाफ़ा दिखता है वह नकली है। जो पैसे आप भेजते हैं वे असली हैं।', ml: 'കാണുന്ന ലാഭം വ്യാജമാണ്. നിങ്ങൾ അയയ്ക്കുന്ന പണം യഥാർത്ഥമാണ്.' },
    },
    todo: {
      rule: { en: 'Ask someone you trust before you invest.', hi: 'पैसे लगाने से पहले किसी भरोसेमंद से पूछिए।', ml: 'നിക്ഷേപിക്കുന്നതിന് മുൻപ് വിശ്വസിക്കുന്ന ഒരാളോട് ചോദിക്കൂ.' },
      acts: [
        { en: '<b>Leave the group.</b> Send no money.', hi: '<b>ग्रुप छोड़ दीजिए।</b> पैसे मत भेजिए।', ml: '<b>ഗ്രൂപ്പ് വിടൂ.</b> പണം അയയ്ക്കരുത്.' },
        { en: '<b>Invest only</b> through registered brokers. Check the name on the SEBI website.', hi: '<b>निवेश केवल</b> रजिस्टर्ड ब्रोकर से कीजिए। SEBI की वेबसाइट पर नाम देखिए।', ml: '<b>നിക്ഷേപം</b> രജിസ്റ്റർ ചെയ്ത ബ്രോക്കർമാർ വഴി മാത്രം. SEBI വെബ്സൈറ്റിൽ പേര് പരിശോധിക്കൂ.' },
      ],
    },
    check: {
      from: { en: 'WhatsApp group · "Stock Tips VIP"', hi: 'WhatsApp ग्रुप · "स्टॉक टिप्स VIP"', ml: 'WhatsApp ഗ്രൂപ്പ് · "സ്റ്റോക്ക് ടിപ്സ് VIP"' },
      msg: {
        en: 'Congratulations! Our members earned 12% this week, guaranteed. Send ₹5,000 to this account today to join.',
        hi: 'बधाई हो! हमारे सदस्यों ने इस हफ़्ते 12% कमाया, गारंटी के साथ। जुड़ने के लिए आज इस खाते में ₹5,000 भेजिए।',
        ml: 'അഭിനന്ദനങ്ങൾ! ഞങ്ങളുടെ അംഗങ്ങൾ ഈ ആഴ്ച 12% നേടി, ഉറപ്പായും. ചേരാൻ ഇന്ന് ഈ അക്കൗണ്ടിലേക്ക് ₹5,000 അയയ്ക്കൂ.',
      },
      why: {
        en: 'Nobody can guarantee profit. Leave the group and send nothing.',
        hi: 'मुनाफ़े की गारंटी कोई नहीं दे सकता। ग्रुप छोड़िए और कुछ मत भेजिए।',
        ml: 'ലാഭത്തിന് ആർക്കും ഉറപ്പ് നൽകാനാവില്ല. ഗ്രൂപ്പ് വിടൂ, ഒന്നും അയയ്ക്കരുത്.',
      },
    },
  },
];

export const SAFE_UI = {
  en: {
    title: 'Stay safe',
    lead: 'Learn the 3 big scams. Then test yourself.',
    progress: 'Your progress',
    doneOf: (n) => `${n} of 3 lessons done`,
    lessons: 'Lessons',
    pages: '3 short pages · 2 min',
    start: 'Start',
    done: 'Done',
    testTitle: 'Real or fake? Test yourself',
    testSub: '6 messages · about 3 min',
    testStart: 'Start the test',
    lost: 'Lost money to a scam?',
    call: 'Call 1930 · Free',
    callBig: 'Call 1930',
    callSub: 'Cyber fraud helpline · Free',
    lessonsBack: 'Lessons',
    listen: 'Listen',
    pageOf: (a) => `Page ${a} of 3`,
    next: 'Next',
    back: 'Back',
    remember: 'REMEMBER',
    golden: 'THE GOLDEN RULE',
    todoH: 'What to do',
    already: 'Already shared a code or lost money? Call now. The sooner, the better.',
    share: 'Share with family',
    quick: 'Quick check',
    realQ: 'Is this message real or fake?',
    noReal: "Don't worry, nothing here is a real link.",
    real: "It's real",
    fake: "It's fake",
    rightFake: "Right! It's fake.",
    notQuite: 'Not quite. This one is fake.',
    finish: 'Finish lesson',
    lostShort: 'Lost money? Call 1930',
    upNext: 'Up next',
    startsIn: (n) => `Starting in ${n}`,
    stop: 'Stop',
    startNow: 'Start now',
    allDone: 'All 3 lessons done. Well done!',
    allDoneSub: 'Now test what you learned.',
    tips: 'Three things to remember',
    home: 'Back to Stay safe',
    again: 'Try again',
    testOf: (a, b) => `Question ${a} of ${b}`,
    shareMsg: 'I am learning to spot phone scams on Nook. It is free and takes 2 minutes a lesson:',
  },
  hi: {
    title: 'सुरक्षित रहिए',
    lead: '3 बड़े धोखे सीखिए। फिर खुद को परखिए।',
    progress: 'आपकी प्रगति',
    doneOf: (n) => `3 में से ${n} पाठ पूरे`,
    lessons: 'पाठ',
    pages: '3 छोटे पन्ने · 2 मिनट',
    start: 'शुरू करें',
    done: 'पूरा',
    testTitle: 'असली या नकली? खुद को परखिए',
    testSub: '6 मैसेज · लगभग 3 मिनट',
    testStart: 'परीक्षा शुरू करें',
    lost: 'किसी धोखे में पैसे चले गए?',
    call: '1930 पर फ़ोन करें · मुफ़्त',
    callBig: '1930 पर फ़ोन करें',
    callSub: 'साइबर ठगी हेल्पलाइन · मुफ़्त',
    lessonsBack: 'पाठ',
    listen: 'सुनिए',
    pageOf: (a) => `पन्ना ${a} / 3`,
    next: 'आगे',
    back: 'पीछे',
    remember: 'याद रखिए',
    golden: 'सुनहरा नियम',
    todoH: 'क्या करें',
    already: 'कोड बता दिया या पैसे चले गए? अभी फ़ोन कीजिए। जितनी जल्दी, उतना अच्छा।',
    share: 'परिवार को भेजिए',
    quick: 'छोटी जाँच',
    realQ: 'यह मैसेज असली है या नकली?',
    noReal: 'चिंता मत कीजिए, यहाँ कोई लिंक असली नहीं है।',
    real: 'असली है',
    fake: 'नकली है',
    rightFake: 'सही! यह नकली है।',
    notQuite: 'ठीक नहीं। यह नकली है।',
    finish: 'पाठ पूरा करें',
    lostShort: 'पैसे गए? 1930 पर फ़ोन करें',
    upNext: 'अगला पाठ',
    startsIn: (n) => `${n} में शुरू`,
    stop: 'रोकें',
    startNow: 'अभी शुरू करें',
    allDone: 'तीनों पाठ पूरे। शाबाश!',
    allDoneSub: 'अब जो सीखा उसे परखिए।',
    tips: 'तीन बातें याद रखिए',
    home: 'सुरक्षित रहिए पर वापस',
    again: 'फिर कोशिश करें',
    testOf: (a, b) => `सवाल ${a} / ${b}`,
    shareMsg: 'मैं Nook पर फ़ोन के धोखे पहचानना सीख रहा/रही हूँ। यह मुफ़्त है, हर पाठ 2 मिनट का:',
  },
  ml: {
    title: 'സുരക്ഷിതരായിരിക്കൂ',
    lead: '3 വലിയ തട്ടിപ്പുകൾ പഠിക്കൂ. പിന്നെ സ്വയം പരീക്ഷിക്കൂ.',
    progress: 'നിങ്ങളുടെ പുരോഗതി',
    doneOf: (n) => `3-ൽ ${n} പാഠങ്ങൾ കഴിഞ്ഞു`,
    lessons: 'പാഠങ്ങൾ',
    pages: '3 ചെറിയ പേജുകൾ · 2 മിനിറ്റ്',
    start: 'തുടങ്ങൂ',
    done: 'കഴിഞ്ഞു',
    testTitle: 'ശരിയോ വ്യാജമോ? സ്വയം പരീക്ഷിക്കൂ',
    testSub: '6 മെസ്സേജുകൾ · ഏകദേശം 3 മിനിറ്റ്',
    testStart: 'പരീക്ഷ തുടങ്ങൂ',
    lost: 'തട്ടിപ്പിൽ പണം പോയോ?',
    call: '1930 വിളിക്കൂ · സൗജന്യം',
    callBig: '1930 വിളിക്കൂ',
    callSub: 'സൈബർ തട്ടിപ്പ് ഹെൽപ്പ്‌ലൈൻ · സൗജന്യം',
    lessonsBack: 'പാഠങ്ങൾ',
    listen: 'കേൾക്കൂ',
    pageOf: (a) => `പേജ് ${a} / 3`,
    next: 'അടുത്തത്',
    back: 'പിന്നോട്ട്',
    remember: 'ഓർക്കൂ',
    golden: 'സുവർണ്ണ നിയമം',
    todoH: 'എന്ത് ചെയ്യണം',
    already: 'കോഡ് പറഞ്ഞുപോയോ, പണം പോയോ? ഇപ്പോൾ വിളിക്കൂ. എത്ര വേഗം, അത്ര നല്ലത്.',
    share: 'കുടുംബത്തിന് അയയ്ക്കൂ',
    quick: 'ചെറിയ പരിശോധന',
    realQ: 'ഈ മെസ്സേജ് ശരിയോ വ്യാജമോ?',
    noReal: 'വിഷമിക്കേണ്ട, ഇവിടെ ഒരു ലിങ്കും യഥാർത്ഥമല്ല.',
    real: 'ശരിയാണ്',
    fake: 'വ്യാജമാണ്',
    rightFake: 'ശരി! ഇത് വ്യാജമാണ്.',
    notQuite: 'ശരിയായില്ല. ഇത് വ്യാജമാണ്.',
    finish: 'പാഠം പൂർത്തിയാക്കൂ',
    lostShort: 'പണം പോയോ? 1930 വിളിക്കൂ',
    upNext: 'അടുത്ത പാഠം',
    startsIn: (n) => `${n} സെക്കൻഡിൽ തുടങ്ങും`,
    stop: 'നിർത്തൂ',
    startNow: 'ഇപ്പോൾ തുടങ്ങൂ',
    allDone: '3 പാഠങ്ങളും കഴിഞ്ഞു. നന്നായി!',
    allDoneSub: 'ഇനി പഠിച്ചത് പരീക്ഷിക്കൂ.',
    tips: 'മൂന്ന് കാര്യങ്ങൾ ഓർക്കൂ',
    home: 'സുരക്ഷിതരായിരിക്കൂ-ലേക്ക് മടങ്ങൂ',
    again: 'വീണ്ടും ശ്രമിക്കൂ',
    testOf: (a, b) => `ചോദ്യം ${a} / ${b}`,
    shareMsg: 'ഞാൻ Nook-ൽ ഫോൺ തട്ടിപ്പുകൾ തിരിച്ചറിയാൻ പഠിക്കുന്നു. സൗജന്യമാണ്, ഓരോ പാഠവും 2 മിനിറ്റ്:',
  },
};

export const SAFE_DONE_KEY = 'folks_safe_done';

// Lessons this phone has finished (ids), kept only on the phone.
export function readDone() {
  try {
    return JSON.parse(localStorage.getItem(SAFE_DONE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function markDone(id) {
  try {
    const d = readDone();
    if (!d.includes(id)) localStorage.setItem(SAFE_DONE_KEY, JSON.stringify([...d, id]));
  } catch {}
}
