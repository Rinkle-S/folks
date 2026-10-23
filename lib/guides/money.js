import { g } from './build';

const PIN = ['Type your UPI PIN yourself. Never tell it to anyone, not even the bank.', 'UPI PIN खुद डालिए। इसे किसी को मत बताइए, बैंक वालों को भी नहीं।', 'UPI PIN സ്വയം അടിക്കൂ. ആരോടും പറയരുത്, ബാങ്കുകാരോട് പോലും.'];

export const MONEY_GUIDES = [
  g('gpay-balance', 'gpay', 'Google Pay', ['Check your bank balance in Google Pay', 'Google Pay में बैंक बैलेंस देखें', 'Google Pay-ൽ ബാങ്ക് ബാലൻസ് നോക്കാം'], ['check balance gpay', 'bank balance google pay', 'balance check upi', 'बैलेंस देख', 'ബാലൻസ് നോക്ക'], [
    ['Open Google Pay. Scroll down and tap "Check bank balance".', 'Google Pay खोलिए। नीचे जाकर "Check bank balance" दबाइए।', 'Google Pay തുറക്കൂ. താഴേക്ക് പോയി "Check bank balance" അമർത്തൂ.'],
    ['Tap your bank account.', 'अपना बैंक खाता दबाइए।', 'നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ട് അമർത്തൂ.'],
    ['Type your UPI PIN. The balance shows on the screen.', 'अपना UPI PIN डालिए। बैलेंस स्क्रीन पर दिखेगा।', 'നിങ്ങളുടെ UPI PIN അടിക്കൂ. ബാലൻസ് സ്ക്രീനിൽ കാണും.'],
  ], PIN),
  g('gpay-history', 'gpay', 'Google Pay', ['See your past payments', 'पुराने भुगतान देखें', 'മുമ്പത്തെ പേയ്മെന്റുകൾ കാണാം'], ['payment history', 'transaction history', 'past payments', 'who did i pay', 'पुराने भुगतान', 'लेन-देन', 'പേയ്മെന്റ് ഹിസ്റ്ററി'], [
    ['Open Google Pay. Scroll down on the home screen.', 'Google Pay खोलिए। होम स्क्रीन पर नीचे जाइए।', 'Google Pay തുറക്കൂ. ഹോം സ്ക്രീനിൽ താഴേക്ക് പോകൂ.'],
    ['Tap "Show all transactions" or "History".', '"Show all transactions" या "History" दबाइए।', '"Show all transactions" അല്ലെങ്കിൽ "History" അമർത്തൂ.'],
    ['Tap any payment to see the date, amount and who got it.', 'किसी भी भुगतान पर दबाकर तारीख़, रकम और पाने वाले को देखिए।', 'ഏതെങ്കിലും പേയ്മെന്റ് അമർത്തി തീയതിയും തുകയും ആർക്കാണെന്നും കാണൂ.'],
  ]),
  g('gpay-reset-pin', 'gpay', 'Google Pay', ['Reset a forgotten UPI PIN', 'भूला हुआ UPI PIN दोबारा बनाएं', 'മറന്ന UPI PIN പുതുതായി ഉണ്ടാക്കാം'], ['forgot pin', 'reset pin', 'change pin', 'upi pin forgot', 'pin भूल', 'पिन भूल', 'पिन बदल', 'PIN മറന്ന', 'പിൻ മാറ്റ'], [
    ['Open Google Pay. Tap your round photo at the top right.', 'Google Pay खोलिए। ऊपर दाईं तरफ़ अपनी गोल फ़ोटो दबाइए।', 'Google Pay തുറക്കൂ. മുകളിൽ വലത് നിങ്ങളുടെ വട്ട ഫോട്ടോ അമർത്തൂ.'],
    ['Tap "Bank account", then your bank.', '"Bank account" दबाइए, फिर अपना बैंक।', '"Bank account" അമർത്തി നിങ്ങളുടെ ബാങ്ക് അമർത്തൂ.'],
    ['Tap the three dots, then "Forgot UPI PIN" or "Change UPI PIN".', 'तीन बिंदु दबाइए, फिर "Forgot UPI PIN" या "Change UPI PIN"।', 'മൂന്ന് കുത്തുകൾ അമർത്തി "Forgot UPI PIN" അല്ലെങ്കിൽ "Change UPI PIN" അമർത്തൂ.'],
    ['Type the last 6 digits of your debit card and the expiry date. Then you get an SMS code.', 'डेबिट कार्ड के आख़िरी 6 अंक और एक्सपायरी तारीख़ डालिए। फिर SMS से कोड आएगा।', 'ഡെബിറ്റ് കാർഡിന്റെ അവസാന 6 അക്കങ്ങളും കാലാവധി തീയതിയും അടിക്കൂ. പിന്നെ SMS-ൽ കോഡ് വരും.'],
    ['Type the SMS code yourself, then choose a new PIN.', 'SMS का कोड खुद डालिए, फिर नया PIN चुनिए।', 'SMS കോഡ് സ്വയം അടിച്ച് പുതിയ PIN തിരഞ്ഞെടുക്കൂ.'],
  ], ['Never read out the SMS code to anyone who calls you.', 'फ़ोन करने वाले किसी को SMS का कोड कभी मत बताइए।', 'വിളിക്കുന്ന ആരോടും SMS കോഡ് വായിച്ചു പറയരുത്.']),
  g('gpay-add-bank', 'gpay', 'Google Pay', ['Add a bank account', 'बैंक खाता जोड़ें', 'ബാങ്ക് അക്കൗണ്ട് ചേർക്കാം'], ['add bank', 'link bank', 'add account', 'bank account add', 'बैंक खाता जोड़', 'ബാങ്ക് അക്കൗണ്ട് ചേർ'], [
    ['Open Google Pay. Tap your round photo, then "Bank account".', 'Google Pay खोलिए। अपनी गोल फ़ोटो, फिर "Bank account" दबाइए।', 'Google Pay തുറക്കൂ. നിങ്ങളുടെ വട്ട ഫോട്ടോ, പിന്നെ "Bank account" അമർത്തൂ.'],
    ['Tap "Add bank account" and choose your bank.', '"Add bank account" दबाकर अपना बैंक चुनिए।', '"Add bank account" അമർത്തി നിങ്ങളുടെ ബാങ്ക് തിരഞ്ഞെടുക്കൂ.'],
    ['Allow the SMS check. The phone number must be the same one linked to the bank.', 'SMS की जांच की अनुमति दीजिए। फ़ोन नंबर वही होना चाहिए जो बैंक से जुड़ा है।', 'SMS പരിശോധനയ്ക്ക് അനുമതി നൽകൂ. ഫോൺ നമ്പർ ബാങ്കുമായി ബന്ധിപ്പിച്ചിട്ടുള്ളതായിരിക്കണം.'],
    ['Choose your account, then set a UPI PIN if asked.', 'अपना खाता चुनिए, फिर माँगा जाए तो UPI PIN बनाइए।', 'നിങ്ങളുടെ അക്കൗണ്ട് തിരഞ്ഞെടുത്ത് ചോദിച്ചാൽ UPI PIN ഉണ്ടാക്കൂ.'],
  ], PIN),
  g('gpay-pay-number', 'gpay', 'Google Pay', ['Pay a phone number', 'फ़ोन नंबर पर पैसे भेजें', 'ഫോൺ നമ്പറിലേക്ക് പണം അയക്കാം'], ['pay phone number', 'send money number', 'pay mobile number', 'नंबर पर पैसे', 'നമ്പറിലേക്ക് പണം'], [
    ['Open Google Pay. Tap "Pay phone number" (or "New payment").', 'Google Pay खोलिए। "Pay phone number" (या "New payment") दबाइए।', 'Google Pay തുറക്കൂ. "Pay phone number" (അല്ലെങ്കിൽ "New payment") അമർത്തൂ.'],
    ['Type the 10-digit number.', '10 अंकों का नंबर लिखिए।', '10 അക്ക നമ്പർ എഴുതൂ.'],
    ['Check the NAME shown on the screen. It must be the person you mean.', 'स्क्रीन पर दिखा नाम देखिए। यह वही व्यक्ति होना चाहिए जिसे भेजना है।', 'സ്ക്രീനിൽ കാണുന്ന പേര് നോക്കൂ. നിങ്ങൾ ഉദ്ദേശിച്ച ആൾ തന്നെ ആയിരിക്കണം.'],
    ['Type the amount, tap "Pay", then type your UPI PIN.', 'रकम लिखिए, "Pay" दबाइए, फिर UPI PIN डालिए।', 'തുക എഴുതി "Pay" അമർത്തി UPI PIN അടിക്കൂ.'],
  ], ['If the name is not who you expected, stop. Do not pay.', 'नाम वह न हो जिसकी आपको उम्मीद थी, तो रुकिए। पैसे मत भेजिए।', 'പേര് പ്രതീക്ഷിച്ച ആളുടേത് അല്ലെങ്കിൽ നിർത്തൂ. പണം അയക്കരുത്.']),
  g('gpay-request-money', 'gpay', 'Google Pay', ['Ask someone to pay you', 'किसी से पैसे माँगें', 'ഒരാളോട് പണം ചോദിക്കാം'], ['request money', 'ask for money', 'collect money', 'पैसे माँग', 'പണം ചോദിക്ക'], [
    ['Open Google Pay and tap the person you want to ask.', 'Google Pay खोलकर जिनसे माँगना है उनका नाम दबाइए।', 'Google Pay തുറന്ന് ആരോടാണോ ചോദിക്കേണ്ടത് അവരെ അമർത്തൂ.'],
    ['Tap "Request".', '"Request" दबाइए।', '"Request" അമർത്തൂ.'],
    ['Type the amount and tap "Request".', 'रकम लिखकर "Request" दबाइए।', 'തുക എഴുതി "Request" അമർത്തൂ.'],
  ], ['You never type a PIN to RECEIVE money. If anything asks for your PIN, it is a scam.', 'पैसे पाने के लिए PIN कभी नहीं लगता। कोई PIN माँगे तो वह ठगी है।', 'പണം സ്വീകരിക്കാൻ PIN വേണ്ട. PIN ചോദിച്ചാൽ അത് തട്ടിപ്പാണ്.']),
  g('upi-failed', 'gpay', 'Google Pay', ['Money was debited but not received', 'पैसे कटे पर पहुँचे नहीं', 'പണം ഡെബിറ്റ് ആയി പക്ഷേ കിട്ടിയില്ല'], ['money deducted', 'payment failed', 'money cut', 'not received', 'पैसे कट', 'पैसे नहीं पहुँचे', 'പണം പോയി'], [
    ['Wait. Most failed payments come back to your account in 1 to 3 days.', 'रुकिए। ज़्यादातर नाकाम भुगतान 1 से 3 दिन में आपके खाते में लौट आते हैं।', 'കാത്തിരിക്കൂ. പരാജയപ്പെട്ട മിക്ക പേയ്മെന്റും 1 മുതൽ 3 ദിവസത്തിനുള്ളിൽ തിരികെ വരും.'],
    ['Open that payment in Google Pay history and tap "Get help" or "Having issues?".', 'Google Pay की हिस्ट्री में वह भुगतान खोलकर "Get help" या "Having issues?" दबाइए।', 'Google Pay ഹിസ്റ്ററിയിൽ ആ പേയ്മെന്റ് തുറന്ന് "Get help" അല്ലെങ്കിൽ "Having issues?" അമർത്തൂ.'],
    ['Write down the transaction ID and date.', 'ट्रांज़ैक्शन ID और तारीख़ लिख लीजिए।', 'ട്രാൻസാക്ഷൻ ID-യും തീയതിയും എഴുതിവെക്കൂ.'],
    ['If it does not return in 3 days, call your bank\'s helpline from their official website or the back of your card. Do not search for a number online.', '3 दिन में न लौटे तो बैंक की आधिकारिक वेबसाइट या कार्ड के पीछे के नंबर पर फ़ोन कीजिए। नंबर इंटरनेट पर मत खोजिए।', '3 ദിവസത്തിനുള്ളിൽ തിരികെ വന്നില്ലെങ്കിൽ ബാങ്കിന്റെ ഔദ്യോഗിക വെബ്സൈറ്റിലോ കാർഡിന്റെ പിന്നിലോ ഉള്ള നമ്പറിൽ വിളിക്കൂ. നമ്പർ ഓൺലൈനിൽ തിരയരുത്.'],
  ], ['Fake helpline numbers on the internet are a common scam.', 'इंटरनेट पर नकली हेल्पलाइन नंबर ठगी का आम तरीका हैं।', 'ഇന്റർനെറ്റിലെ വ്യാജ ഹെൽപ്പ്‌ലൈൻ നമ്പറുകൾ സാധാരണ തട്ടിപ്പാണ്.']),
  g('upi-report-fraud', 'gpay', 'Google Pay', ['You paid a scammer: what to do now', 'ठग को पैसे चले गए: अब क्या करें', 'തട്ടിപ്പുകാരന് പണം പോയി: ഇനി എന്ത് ചെയ്യണം'], ['cheated', 'fraud', 'scam money', 'lost money', 'cyber crime', 'ठगी', 'धोखा', 'साइबर', 'തട്ടിപ്പ്', 'പണം നഷ്ടം'], [
    ['Call 1930 right now. This is the national cyber crime helpline. Faster is better.', 'अभी 1930 पर फ़ोन कीजिए। यह साइबर अपराध की राष्ट्रीय हेल्पलाइन है। जितना जल्दी, उतना अच्छा।', 'ഇപ്പോൾ തന്നെ 1930 ൽ വിളിക്കൂ. ഇത് സൈബർ കുറ്റകൃത്യങ്ങൾക്കുള്ള ദേശീയ ഹെൽപ്പ്‌ലൈൻ ആണ്. എത്ര വേഗമോ അത്രയും നല്ലത്.'],
    ['Tell them the amount, the time, and the phone number or UPI ID you paid.', 'उन्हें रकम, समय, और जिस फ़ोन नंबर या UPI ID पर भेजा वह बताइए।', 'തുക, സമയം, പണം അയച്ച ഫോൺ നമ്പർ അല്ലെങ്കിൽ UPI ID എന്നിവ പറയൂ.'],
    ['Then report on cybercrime.gov.in, or ask a family member to help.', 'फिर cybercrime.gov.in पर शिकायत कीजिए, या परिवार में किसी से मदद लीजिए।', 'പിന്നെ cybercrime.gov.in ൽ പരാതി നൽകൂ, അല്ലെങ്കിൽ വീട്ടിലെ ആരുടെയെങ്കിലും സഹായം തേടൂ.'],
    ['Call your bank and tell them too.', 'अपने बैंक को भी फ़ोन करके बताइए।', 'നിങ്ങളുടെ ബാങ്കിനെയും വിളിച്ച് അറിയിക്കൂ.'],
  ], ['It is not your fault. Many clever people fall for scams. Do not wait or feel shy.', 'यह आपकी गलती नहीं है। कई समझदार लोग ठगे जाते हैं। रुकिए मत, शर्माइए मत।', 'ഇത് നിങ്ങളുടെ തെറ്റല്ല. പല മിടുക്കരും തട്ടിപ്പിനിരയാകുന്നു. കാത്തിരിക്കരുത്, നാണിക്കരുത്.']),
  g('qr-gallery', 'gpay', 'Google Pay', ['Pay a QR code saved in your photos', 'फ़ोटो में रखा QR कोड भरें', 'ഫോട്ടോയിലുള്ള QR കോഡ് വഴി പണം അടയ്ക്കാം'], ['qr from gallery', 'scan qr photo', 'qr screenshot', 'गैलरी QR', 'ഗാലറി QR'], [
    ['Open Google Pay and tap "Scan any QR code".', 'Google Pay खोलकर "Scan any QR code" दबाइए।', 'Google Pay തുറന്ന് "Scan any QR code" അമർത്തൂ.'],
    ['Tap the small picture icon (gallery) at the top.', 'ऊपर छोटा तस्वीर वाला निशान (गैलरी) दबाइए।', 'മുകളിലെ ചെറിയ ചിത്ര ചിഹ്നം (ഗാലറി) അമർത്തൂ.'],
    ['Pick the picture with the QR code. Check the name, then pay as usual.', 'QR कोड वाली तस्वीर चुनिए। नाम जांचिए, फिर हमेशा की तरह भुगतान कीजिए।', 'QR കോഡ് ഉള്ള ചിത്രം തിരഞ്ഞെടുക്കൂ. പേര് നോക്കി പതിവുപോലെ പണം അടയ്ക്കൂ.'],
  ]),
  g('phonepe-send', 'phonepe', 'PhonePe', ['Send money on PhonePe', 'PhonePe से पैसे भेजें', 'PhonePe-ൽ പണം അയക്കാം'], ['phonepe send', 'phonepe pay', 'phonepe money', 'फोनपे पैसे', 'ഫോൺപേ'], [
    ['Open PhonePe. Tap "To Mobile Number" or "To Contact".', 'PhonePe खोलिए। "To Mobile Number" या "To Contact" दबाइए।', 'PhonePe തുറക്കൂ. "To Mobile Number" അല്ലെങ്കിൽ "To Contact" അമർത്തൂ.'],
    ['Pick the person. Check the name shown.', 'व्यक्ति चुनिए। दिखा हुआ नाम जांचिए।', 'ആളെ തിരഞ്ഞെടുക്കൂ. കാണുന്ന പേര് നോക്കൂ.'],
    ['Type the amount and tap "Send".', 'रकम लिखकर "Send" दबाइए।', 'തുക എഴുതി "Send" അമർത്തൂ.'],
    ['Choose your bank and type your UPI PIN.', 'अपना बैंक चुनिए और UPI PIN डालिए।', 'നിങ്ങളുടെ ബാങ്ക് തിരഞ്ഞെടുത്ത് UPI PIN അടിക്കൂ.'],
  ], PIN),
  g('phonepe-history', 'phonepe', 'PhonePe', ['See past payments on PhonePe', 'PhonePe में पुराने भुगतान देखें', 'PhonePe-ൽ മുമ്പത്തെ പേയ്മെന്റുകൾ കാണാം'], ['phonepe history', 'phonepe past payments', 'phonepe statement', 'फोनपे हिस्ट्री', 'ഫോൺപേ ഹിസ്റ്ററി'], [
    ['Open PhonePe. Tap "History" at the bottom.', 'PhonePe खोलिए। नीचे "History" दबाइए।', 'PhonePe തുറക്കൂ. താഴെ "History" അമർത്തൂ.'],
    ['Scroll to see all payments. Tap one to see details.', 'सब भुगतान देखने के लिए नीचे जाइए। ब्योरे के लिए किसी एक को दबाइए।', 'എല്ലാ പേയ്മെന്റും കാണാൻ താഴേക്ക് പോകൂ. വിവരങ്ങൾക്ക് ഒന്ന് അമർത്തൂ.'],
  ]),
  g('paytm-balance', 'paytm', 'Paytm', ['Check bank balance on Paytm', 'Paytm में बैंक बैलेंस देखें', 'Paytm-ൽ ബാങ്ക് ബാലൻസ് നോക്കാം'], ['paytm balance', 'paytm check balance', 'पेटीएम बैलेंस', 'പേടിഎം ബാലൻസ്'], [
    ['Open Paytm. Tap "Balance and History".', 'Paytm खोलिए। "Balance and History" दबाइए।', 'Paytm തുറക്കൂ. "Balance and History" അമർത്തൂ.'],
    ['Tap "Check Balance" next to your bank.', 'अपने बैंक के आगे "Check Balance" दबाइए।', 'നിങ്ങളുടെ ബാങ്കിന് അടുത്തുള്ള "Check Balance" അമർത്തൂ.'],
    ['Type your UPI PIN. The balance shows.', 'UPI PIN डालिए। बैलेंस दिखेगा।', 'UPI PIN അടിക്കൂ. ബാലൻസ് കാണും.'],
  ], PIN),
  g('paytm-send', 'paytm', 'Paytm', ['Send money to someone on Paytm', 'Paytm से किसी को पैसे भेजें', 'Paytm-ൽ ഒരാൾക്ക് പണം അയക്കാം'], ['paytm send money', 'paytm to mobile', 'paytm transfer', 'पेटीएम से पैसे भेज', 'പേടിഎം പണം അയക്ക'], [
    ['Open Paytm. Tap "To Mobile".', 'Paytm खोलिए। "To Mobile" दबाइए।', 'Paytm തുറക്കൂ. "To Mobile" അമർത്തൂ.'],
    ['Type the number or pick a name. Check the name shown.', 'नंबर लिखिए या नाम चुनिए। दिखा हुआ नाम जांचिए।', 'നമ്പർ എഴുതുകയോ പേര് തിരഞ്ഞെടുക്കുകയോ ചെയ്യൂ. കാണുന്ന പേര് നോക്കൂ.'],
    ['Type the amount and tap the blue pay button.', 'रकम लिखकर नीला भुगतान बटन दबाइए।', 'തുക എഴുതി നീല പേയ്മെന്റ് ബട്ടൺ അമർത്തൂ.'],
    ['Choose your bank and type your UPI PIN.', 'अपना बैंक चुनिए और UPI PIN डालिए।', 'ബാങ്ക് തിരഞ്ഞെടുത്ത് UPI PIN അടിക്കൂ.'],
  ], PIN),
  g('yono-send', 'yono', 'YONO SBI', ['Send money from YONO SBI', 'YONO SBI से पैसे भेजें', 'YONO SBI-ൽ നിന്ന് പണം അയക്കാം'], ['yono send money', 'yono transfer', 'sbi transfer', 'sbi send money', 'योनो पैसे भेज', 'യോനോ പണം അയക്ക', 'neft', 'imps'], [
    ['Open YONO SBI and log in with your MPIN or fingerprint.', 'YONO SBI खोलिए और MPIN या फ़िंगरप्रिंट से लॉगिन कीजिए।', 'YONO SBI തുറന്ന് MPIN അല്ലെങ്കിൽ വിരലടയാളം കൊണ്ട് ലോഗിൻ ചെയ്യൂ.'],
    ['Tap "Pay and Transfer" or "Fund Transfer".', '"Pay and Transfer" या "Fund Transfer" दबाइए।', '"Pay and Transfer" അല്ലെങ്കിൽ "Fund Transfer" അമർത്തൂ.'],
    ['Pick a person you have saved before (a "payee"). If new, tap "Add beneficiary" first.', 'पहले से सेव व्यक्ति (payee) चुनिए। नया हो तो पहले "Add beneficiary" दबाइए।', 'മുമ്പ് സേവ് ചെയ്ത ആളെ (payee) തിരഞ്ഞെടുക്കൂ. പുതിയ ആളാണെങ്കിൽ ആദ്യം "Add beneficiary" അമർത്തൂ.'],
    ['Type the amount. Choose the type, like IMPS (instant).', 'रकम लिखिए। तरीका चुनिए, जैसे IMPS (तुरंत)।', 'തുക എഴുതൂ. IMPS (ഉടൻ) പോലുള്ള രീതി തിരഞ്ഞെടുക്കൂ.'],
    ['Check the name and amount once more. Then confirm with the OTP or MPIN you are asked for.', 'नाम और रकम एक बार फिर जांचिए। फिर माँगे गए OTP या MPIN से पुष्टि कीजिए।', 'പേരും തുകയും ഒരിക്കൽ കൂടി നോക്കൂ. പിന്നെ ചോദിക്കുന്ന OTP അല്ലെങ്കിൽ MPIN കൊണ്ട് ഉറപ്പാക്കൂ.'],
  ], ['Do a small amount first for a new person, and ask someone at home the first time.', 'नए व्यक्ति को पहले थोड़ी रकम भेजिए, और पहली बार घर में किसी से पूछ लीजिए।', 'പുതിയ ആൾക്ക് ആദ്യം ചെറിയ തുക അയക്കൂ, ആദ്യമായി ചെയ്യുമ്പോൾ വീട്ടിൽ ആരോടെങ്കിലും ചോദിക്കൂ.']),
  g('yono-add-beneficiary', 'yono', 'YONO SBI', ['Add a new payee in YONO SBI', 'YONO SBI में नया payee जोड़ें', 'YONO SBI-ൽ പുതിയ payee ചേർക്കാം'], ['add beneficiary', 'add payee', 'new payee', 'new beneficiary', 'बेनिफिशियरी', 'ബെനിഫിഷ്യറി'], [
    ['Open YONO SBI and log in.', 'YONO SBI खोलकर लॉगिन कीजिए।', 'YONO SBI തുറന്ന് ലോഗിൻ ചെയ്യൂ.'],
    ['Tap "Pay and Transfer", then "Manage Beneficiary" or "Add Beneficiary".', '"Pay and Transfer" दबाइए, फिर "Manage Beneficiary" या "Add Beneficiary"।', '"Pay and Transfer" അമർത്തി "Manage Beneficiary" അല്ലെങ്കിൽ "Add Beneficiary" അമർത്തൂ.'],
    ['Type their name, account number, and bank IFSC code. Ask them to send you these in a message.', 'उनका नाम, खाता संख्या और बैंक का IFSC कोड लिखिए। उनसे ये संदेश में भिजवा लीजिए।', 'അവരുടെ പേര്, അക്കൗണ്ട് നമ്പർ, ബാങ്ക് IFSC കോഡ് എന്നിവ എഴുതൂ. ഇവ മെസ്സേജിൽ അയച്ചുതരാൻ പറയൂ.'],
    ['Type the account number again to check. Confirm with the OTP sent to your phone.', 'जांचने के लिए खाता संख्या दोबारा लिखिए। फ़ोन पर आए OTP से पुष्टि कीजिए।', 'പരിശോധിക്കാൻ അക്കൗണ്ട് നമ്പർ വീണ്ടും എഴുതൂ. ഫോണിൽ വന്ന OTP കൊണ്ട് ഉറപ്പാക്കൂ.'],
  ], ['Never share your OTP with anyone who calls you.', 'फ़ोन करने वाले किसी को अपना OTP मत बताइए।', 'വിളിക്കുന്ന ആരോടും നിങ്ങളുടെ OTP പറയരുത്.']),
  g('yono-statement', 'yono', 'YONO SBI', ['Download your bank statement from YONO', 'YONO से बैंक स्टेटमेंट निकालें', 'YONO-യിൽ നിന്ന് ബാങ്ക് സ്റ്റേറ്റ്മെന്റ് എടുക്കാം'], ['yono statement', 'sbi statement', 'bank statement', 'passbook', 'स्टेटमेंट', 'पासबुक', 'സ്റ്റേറ്റ്മെന്റ്', 'പാസ്ബുക്ക്'], [
    ['Open YONO SBI and log in.', 'YONO SBI खोलकर लॉगिन कीजिए।', 'YONO SBI തുറന്ന് ലോഗിൻ ചെയ്യൂ.'],
    ['Tap your account, then "Statement" or "Mini statement".', 'अपना खाता दबाइए, फिर "Statement" या "Mini statement"।', 'നിങ്ങളുടെ അക്കൗണ്ട് അമർത്തി "Statement" അല്ലെങ്കിൽ "Mini statement" അമർത്തൂ.'],
    ['Pick the dates you need, like the last 3 months.', 'जिन तारीख़ों का चाहिए वे चुनिए, जैसे पिछले 3 महीने।', 'വേണ്ട തീയതികൾ തിരഞ്ഞെടുക്കൂ, ഉദാ. കഴിഞ്ഞ 3 മാസം.'],
    ['Tap "Download" or "Share" to get the PDF. It may ask for a password: usually your date of birth or the last digits of your account number.', '"Download" या "Share" दबाकर PDF लीजिए। पासवर्ड माँग सकता है: आमतौर पर जन्म की तारीख़ या खाते के आख़िरी अंक।', '"Download" അല്ലെങ്കിൽ "Share" അമർത്തി PDF എടുക്കൂ. പാസ്‌വേഡ് ചോദിച്ചേക്കാം: സാധാരണ ജനനത്തീയതി അല്ലെങ്കിൽ അക്കൗണ്ട് നമ്പറിന്റെ അവസാന അക്കങ്ങൾ.'],
  ]),
  g('yono-change-mpin', 'yono', 'YONO SBI', ['Change your YONO MPIN', 'YONO का MPIN बदलें', 'YONO MPIN മാറ്റാം'], ['change mpin', 'mpin forgot', 'yono mpin', 'yono login problem', 'mpin', 'एमपिन', 'എംപിൻ'], [
    ['Log in to YONO SBI.', 'YONO SBI में लॉगिन कीजिए।', 'YONO SBI-ൽ ലോഗിൻ ചെയ്യൂ.'],
    ['Tap the menu or your profile, then "Settings" or "Change MPIN".', 'मेन्यू या प्रोफ़ाइल दबाइए, फिर "Settings" या "Change MPIN"।', 'മെനു അല്ലെങ്കിൽ പ്രൊഫൈൽ അമർത്തി "Settings" അല്ലെങ്കിൽ "Change MPIN" അമർത്തൂ.'],
    ['Type the old MPIN, then the new 6-digit MPIN twice.', 'पुराना MPIN लिखिए, फिर नया 6 अंकों का MPIN दो बार।', 'പഴയ MPIN എഴുതി പുതിയ 6 അക്ക MPIN രണ്ടു തവണ എഴുതൂ.'],
    ['If you forgot it, tap "Forgot MPIN" on the login screen. It will ask for your debit card details and an OTP.', 'भूल गए हों तो लॉगिन स्क्रीन पर "Forgot MPIN" दबाइए। यह डेबिट कार्ड की जानकारी और OTP माँगेगा।', 'മറന്നുപോയെങ്കിൽ ലോഗിൻ സ്ക്രീനിൽ "Forgot MPIN" അമർത്തൂ. ഡെബിറ്റ് കാർഡ് വിവരങ്ങളും OTP-യും ചോദിക്കും.'],
  ], ['Never tell your MPIN to anyone, even a person who says they are from SBI.', 'अपना MPIN किसी को मत बताइए, SBI का बताने वाले को भी नहीं।', 'MPIN ആരോടും പറയരുത്, SBI-യിൽ നിന്നാണെന്ന് പറയുന്നവരോട് പോലും.']),
  g('yono-account-details', 'yono', 'YONO SBI', ['Find your account number and IFSC', 'अपना खाता नंबर और IFSC देखें', 'അക്കൗണ്ട് നമ്പറും IFSC-യും കണ്ടെത്താം'], ['account number', 'ifsc', 'find account number', 'खाता नंबर', 'अकाउंट नंबर', 'അക്കൗണ്ട് നമ്പർ'], [
    ['Open YONO SBI and log in.', 'YONO SBI खोलकर लॉगिन कीजिए।', 'YONO SBI തുറന്ന് ലോഗിൻ ചെയ്യൂ.'],
    ['Tap your account. The account number is shown there.', 'अपना खाता दबाइए। खाता नंबर वहीं दिखेगा।', 'നിങ്ങളുടെ അക്കൗണ്ട് അമർത്തൂ. അക്കൗണ്ട് നമ്പർ അവിടെ കാണും.'],
    ['Tap "Account details" to see the IFSC code and branch.', '"Account details" दबाकर IFSC कोड और शाखा देखिए।', '"Account details" അമർത്തി IFSC കോഡും ബ്രാഞ്ചും കാണൂ.'],
    ['Your passbook first page also has these numbers.', 'आपकी पासबुक के पहले पन्ने पर भी ये नंबर होते हैं।', 'നിങ്ങളുടെ പാസ്ബുക്കിന്റെ ആദ്യ പേജിലും ഈ നമ്പറുകൾ ഉണ്ട്.'],
  ]),
  g('icici-transfer', 'icici', 'ICICI iMobile', ['Send money from ICICI iMobile', 'ICICI iMobile से पैसे भेजें', 'ICICI iMobile-ൽ നിന്ന് പണം അയക്കാം'], ['icici send money', 'icici transfer', 'imobile transfer', 'आईसीआईसीआई पैसे भेज', 'ഐസിഐസിഐ പണം അയക്ക'], [
    ['Open iMobile Pay and log in.', 'iMobile Pay खोलकर लॉगिन कीजिए।', 'iMobile Pay തുറന്ന് ലോഗിൻ ചെയ്യൂ.'],
    ['Tap "Pay" or "Transfer", then "To Bank Account" or "To Mobile".', '"Pay" या "Transfer" दबाइए, फिर "To Bank Account" या "To Mobile"।', '"Pay" അല്ലെങ്കിൽ "Transfer" അമർത്തി "To Bank Account" അല്ലെങ്കിൽ "To Mobile" അമർത്തൂ.'],
    ['Pick a saved payee, or add a new one.', 'सेव किया हुआ व्यक्ति चुनिए, या नया जोड़िए।', 'സേവ് ചെയ്ത ആളെ തിരഞ്ഞെടുക്കൂ, അല്ലെങ്കിൽ പുതിയ ആളെ ചേർക്കൂ.'],
    ['Type the amount, check the name, and confirm with your PIN or OTP.', 'रकम लिखिए, नाम जांचिए, और PIN या OTP से पुष्टि कीजिए।', 'തുക എഴുതി പേര് നോക്കി PIN അല്ലെങ്കിൽ OTP കൊണ്ട് ഉറപ്പാക്കൂ.'],
  ], ['Start with a small amount for a new person.', 'नए व्यक्ति को पहले थोड़ी रकम भेजिए।', 'പുതിയ ആൾക്ക് ആദ്യം ചെറിയ തുക അയക്കൂ.']),
  g('icici-statement', 'icici', 'ICICI iMobile', ['Get your ICICI statement', 'ICICI का स्टेटमेंट निकालें', 'ICICI സ്റ്റേറ്റ്മെന്റ് എടുക്കാം'], ['icici statement', 'imobile statement', 'आईसीआईसीआई स्टेटमेंट', 'ഐസിഐസിഐ സ്റ്റേറ്റ്മെന്റ്'], [
    ['Open iMobile Pay and log in.', 'iMobile Pay खोलकर लॉगिन कीजिए।', 'iMobile Pay തുറന്ന് ലോഗിൻ ചെയ്യൂ.'],
    ['Tap your savings account.', 'अपना बचत खाता दबाइए।', 'നിങ്ങളുടെ സേവിങ്സ് അക്കൗണ്ട് അമർത്തൂ.'],
    ['Tap "View all transactions" or "Statement".', '"View all transactions" या "Statement" दबाइए।', '"View all transactions" അല്ലെങ്കിൽ "Statement" അമർത്തൂ.'],
    ['Choose dates, then tap "Download" or "Email".', 'तारीख़ें चुनिए, फिर "Download" या "Email" दबाइए।', 'തീയതികൾ തിരഞ്ഞെടുത്ത് "Download" അല്ലെങ്കിൽ "Email" അമർത്തൂ.'],
  ]),
  g('block-card', 'phone', 'Bank', ['Block a lost debit card', 'खोया डेबिट कार्ड बंद करें', 'നഷ്ടപ്പെട്ട ഡെബിറ്റ് കാർഡ് ബ്ലോക്ക് ചെയ്യാം'], ['block card', 'lost card', 'stolen card', 'card block', 'कार्ड ब्लॉक', 'कार्ड खो', 'കാർഡ് ബ്ലോക്ക്', 'കാർഡ് നഷ്ടം'], [
    ['Open your bank\'s own app (YONO, iMobile or your bank).', 'अपने बैंक का ऐप खोलिए (YONO, iMobile या आपके बैंक का)।', 'നിങ്ങളുടെ ബാങ്കിന്റെ ആപ്പ് തുറക്കൂ (YONO, iMobile അല്ലെങ്കിൽ നിങ്ങളുടെ ബാങ്കിന്റെ).'],
    ['Look under "Cards" for "Block card" or "Card controls".', '"Cards" में "Block card" या "Card controls" ढूंढिए।', '"Cards"-ന് കീഴിൽ "Block card" അല്ലെങ്കിൽ "Card controls" കണ്ടെത്തൂ.'],
    ['Block the card, then ask the bank for a new one.', 'कार्ड बंद कीजिए, फिर बैंक से नया माँगिए।', 'കാർഡ് ബ്ലോക്ക് ചെയ്ത് ബാങ്കിനോട് പുതിയത് ആവശ്യപ്പെടൂ.'],
    ['If you cannot, call the helpline printed on your bank\'s official website or passbook. Do it at once.', 'न हो सके तो बैंक की आधिकारिक वेबसाइट या पासबुक पर छपे हेल्पलाइन नंबर पर तुरंत फ़ोन कीजिए।', 'സാധിക്കുന്നില്ലെങ്കിൽ ബാങ്കിന്റെ ഔദ്യോഗിക വെബ്സൈറ്റിലോ പാസ്ബുക്കിലോ ഉള്ള ഹെൽപ്പ്‌ലൈനിൽ ഉടൻ വിളിക്കൂ.'],
  ]),
];
