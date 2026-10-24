import { g } from './build';

export const APP_GUIDES = [
  // Rides
  g('uber-book', 'uber', 'Uber', ['Book a cab on Uber', 'Uber पर कैब बुक करें', 'Uber-ൽ ക്യാബ് ബുക്ക് ചെയ്യാം'], ['book cab', 'book taxi', 'book ride', 'uber book', 'कैब बुक', 'टैक्सी', 'ക്യാബ് ബുക്ക്'], [
    ['Open Uber. Tap "Where to?".', 'Uber खोलिए। "Where to?" दबाइए।', 'Uber തുറക്കൂ. "Where to?" അമർത്തൂ.'],
    ['Type where you want to go and tap the right place from the list.', 'जहाँ जाना है वह लिखिए और लिस्ट में सही जगह दबाइए।', 'എവിടേക്കാണ് പോകേണ്ടത് എന്ന് എഴുതി ലിസ്റ്റിൽ ശരിയായ സ്ഥലം അമർത്തൂ.'],
    ['Check the pick-up point on the map. Move the pin if needed.', 'नक्शे पर पिक-अप की जगह देखिए। ज़रूरत हो तो पिन खिसकाइए।', 'മാപ്പിൽ പിക്കപ്പ് സ്ഥലം നോക്കൂ. വേണമെങ്കിൽ പിൻ നീക്കൂ.'],
    ['Choose the ride type and see the price. Tap "Confirm".', 'गाड़ी का प्रकार चुनिए और किराया देखिए। "Confirm" दबाइए।', 'വാഹന തരം തിരഞ്ഞെടുത്ത് വില നോക്കൂ. "Confirm" അമർത്തൂ.'],
    ['When the driver comes, check the car number and tell the driver your 4-digit code.', 'ड्राइवर आए तो गाड़ी का नंबर मिलाइए और उसे अपना 4 अंकों का कोड बताइए।', 'ഡ്രൈവർ വരുമ്പോൾ വണ്ടി നമ്പർ ഒത്തുനോക്കി നിങ്ങളുടെ 4 അക്ക കോഡ് പറയൂ.'],
  ], ['Always check the car number before you get in.', 'बैठने से पहले गाड़ी का नंबर ज़रूर मिलाइए।', 'കയറുന്നതിന് മുമ്പ് വണ്ടി നമ്പർ തീർച്ചയായും നോക്കൂ.']),
  g('uber-cancel', 'uber', 'Uber', ['Cancel a ride', 'राइड रद्द करें', 'റൈഡ് റദ്ദാക്കാം'], ['cancel ride', 'cancel cab', 'cancel taxi', 'कैब रद्द', 'राइड कैंसल', 'റൈഡ് റദ്ദ്'], [
    ['Open the app while your ride is booked.', 'राइड बुक होने पर ऐप खोलिए।', 'റൈഡ് ബുക്ക് ചെയ്തിരിക്കുമ്പോൾ ആപ്പ് തുറക്കൂ.'],
    ['Swipe the bottom panel up and tap "Cancel trip" (or "Cancel ride").', 'नीचे का पैनल ऊपर खींचकर "Cancel trip" (या "Cancel ride") दबाइए।', 'താഴത്തെ പാനൽ മുകളിലേക്ക് വലിച്ച് "Cancel trip" (അല്ലെങ്കിൽ "Cancel ride") അമർത്തൂ.'],
    ['Choose a reason and confirm.', 'कारण चुनकर पुष्टि कीजिए।', 'കാരണം തിരഞ്ഞെടുത്ത് ഉറപ്പാക്കൂ.'],
  ], ['If the driver is already near, you may be charged a small fee.', 'ड्राइवर पहले से पास हो तो थोड़ा शुल्क लग सकता है।', 'ഡ്രൈവർ അടുത്ത് എത്തിയെങ്കിൽ ചെറിയ ഫീസ് ഈടാക്കിയേക്കാം.']),
  g('ride-share-trip', 'uber', 'Uber', ['Share your trip with family', 'अपनी यात्रा परिवार के साथ शेयर करें', 'യാത്ര വീട്ടുകാരുമായി പങ്കിടാം'], ['share trip', 'share ride', 'share status', 'trip share', 'यात्रा शेयर', 'യാത്ര പങ്കിടാ'], [
    ['During the ride, swipe the bottom panel up.', 'राइड के दौरान नीचे का पैनल ऊपर खींचिए।', 'യാത്രയ്ക്കിടയിൽ താഴത്തെ പാനൽ മുകളിലേക്ക് വലിക്കൂ.'],
    ['Tap "Share trip status".', '"Share trip status" दबाइए।', '"Share trip status" അമർത്തൂ.'],
    ['Pick a family member or WhatsApp. They can follow your ride on a map.', 'परिवार का कोई सदस्य या WhatsApp चुनिए। वे नक्शे पर आपकी राइड देख सकेंगे।', 'വീട്ടിലെ ഒരാളെയോ WhatsApp-നെയോ തിരഞ്ഞെടുക്കൂ. അവർക്ക് മാപ്പിൽ നിങ്ങളുടെ യാത്ര പിന്തുടരാം.'],
  ]),
  g('rapido-book', 'rapido', 'Rapido', ['Book an auto on Rapido', 'Rapido पर ऑटो बुक करें', 'Rapido-ൽ ഓട്ടോ ബുക്ക് ചെയ്യാം'], ['book auto', 'rapido auto', 'rapido bike', 'ऑटो बुक', 'ഓട്ടോ ബുക്ക്'], [
    ['Open Rapido. Type your destination in "Where to?".', 'Rapido खोलिए। "Where to?" में गंतव्य लिखिए।', 'Rapido തുറക്കൂ. "Where to?"-ൽ ലക്ഷ്യസ്ഥാനം എഴുതൂ.'],
    ['Tap "Auto" and see the fare.', '"Auto" दबाइए और किराया देखिए।', '"Auto" അമർത്തി നിരക്ക് നോക്കൂ.'],
    ['Tap the yellow button to book.', 'बुक करने के लिए पीला बटन दबाइए।', 'ബുക്ക് ചെയ്യാൻ മഞ്ഞ ബട്ടൺ അമർത്തൂ.'],
    ['Check the driver\'s vehicle number when he arrives.', 'आने पर चालक की गाड़ी का नंबर देखिए।', 'ഡ്രൈവർ വരുമ്പോൾ വാഹന നമ്പർ നോക്കൂ.'],
  ]),
  g('ride-driver-check', 'uber', 'Uber', ['Check the driver and car before you get in', 'बैठने से पहले ड्राइवर और गाड़ी जाँचिए', 'കയറുന്നതിന് മുമ്പ് ഡ്രൈവറെയും വണ്ടിയെയും പരിശോധിക്കാം'], ['driver check', 'check driver', 'car number', 'check car', 'ड्राइवर जाँच', 'गाड़ी का नंबर', 'ഡ്രൈവർ'], [
    ['When the driver is near, open the app and look at the car number, the car colour and the driver\'s photo.', 'ड्राइवर पास आए तो ऐप खोलकर गाड़ी का नंबर, रंग और ड्राइवर की फ़ोटो देखिए।', 'ഡ്രൈവർ അടുത്തെത്തുമ്പോൾ ആപ്പ് തുറന്ന് വണ്ടി നമ്പർ, നിറം, ഡ്രൈവറുടെ ഫോട്ടോ എന്നിവ നോക്കൂ.'],
    ['Match them with the car in front of you before you open the door.', 'दरवाज़ा खोलने से पहले इन्हें सामने की गाड़ी से मिलाइए।', 'വാതിൽ തുറക്കും മുമ്പ് ഇവ മുന്നിലെ വണ്ടിയുമായി ഒത്തുനോക്കൂ.'],
    ['Ask the driver "Whom are you here for?" Let the driver say your name first.', 'ड्राइवर से पूछिए, "आप किसके लिए आए हैं?" पहले ड्राइवर को आपका नाम बोलने दीजिए।', 'ഡ്രൈവറോട് "ആർക്കുവേണ്ടിയാണ് വന്നത്?" എന്ന് ചോദിക്കൂ. ആദ്യം ഡ്രൈവർ നിങ്ങളുടെ പേര് പറയട്ടെ.'],
    ['Only then tell the driver your 4-digit code from the app, and get in.', 'उसके बाद ही ऐप वाला 4 अंकों का कोड ड्राइवर को बताइए और बैठिए।', 'അതിന് ശേഷം മാത്രം ആപ്പിലെ 4 അക്ക കോഡ് ഡ്രൈവറോട് പറഞ്ഞ് കയറൂ.'],
  ], ['If the car or the driver does not match, do not get in. Cancel the ride in the app.', 'गाड़ी या ड्राइवर न मिले तो न बैठिए। ऐप में राइड रद्द कर दीजिए।', 'വണ്ടിയോ ഡ്രൈവറോ ഒത്തുവന്നില്ലെങ്കിൽ കയറരുത്. ആപ്പിൽ റൈഡ് റദ്ദാക്കൂ.']),
  g('ride-rate', 'uber', 'Uber', ['Rate your ride and report a problem', 'राइड को रेटिंग दें और परेशानी बताएँ', 'റൈഡിന് റേറ്റിംഗ് നൽകാം, പ്രശ്നം അറിയിക്കാം'], ['rate ride', 'rating', 'ride problem', 'report driver', 'रेटिंग', 'റേറ്റിംഗ്'], [
    ['When you reach, the app asks how the ride was. Tap the stars.', 'पहुँचने पर ऐप पूछता है कि राइड कैसी रही। तारे दबाइए।', 'എത്തിയാൽ യാത്ര എങ്ങനെയായിരുന്നുവെന്ന് ആപ്പ് ചോദിക്കും. നക്ഷത്രങ്ങൾ അമർത്തൂ.'],
    ['Five stars is very good. If something was wrong, choose fewer stars and tap what happened.', 'पाँच तारे यानी बहुत अच्छा। कुछ ठीक न रहा हो तो कम तारे चुनिए और बताइए क्या हुआ।', 'അഞ്ച് നക്ഷത്രം വളരെ നല്ലത്. എന്തെങ്കിലും ശരിയായില്ലെങ്കിൽ കുറച്ച് നക്ഷത്രം തിരഞ്ഞെടുത്ത് എന്താണ് സംഭവിച്ചതെന്ന് അമർത്തൂ.'],
    ['To report a problem later, open "Activity", tap the ride, then tap "Help".', 'बाद में परेशानी बतानी हो तो "Activity" खोलिए, राइड दबाइए, फिर "Help" दबाइए।', 'പിന്നീട് പ്രശ്നം അറിയിക്കണമെങ്കിൽ "Activity" തുറന്ന് റൈഡ് അമർത്തി "Help" അമർത്തൂ.'],
  ]),
  g('ride-lost-item', 'uber', 'Uber', ['If you left something in the car', 'गाड़ी में कुछ छूट जाए तो', 'വണ്ടിയിൽ എന്തെങ്കിലും മറന്നുവെച്ചാൽ'], ['lost item', 'left something', 'forgot bag', 'lost phone cab', 'सामान छूट', 'സാധനം മറന്ന'], [
    ['Open the app and tap "Activity" at the bottom.', 'ऐप खोलकर नीचे "Activity" दबाइए।', 'ആപ്പ് തുറന്ന് താഴെ "Activity" അമർത്തൂ.'],
    ['Tap the ride you just took, tap "Help", then tap "I lost something".', 'अभी की राइड दबाइए, "Help" दबाइए, फिर "I lost something" दबाइए।', 'ഇപ്പോൾ പോയ റൈഡ് അമർത്തി "Help" അമർത്തൂ, എന്നിട്ട് "I lost something" അമർത്തൂ.'],
    ['Tap "Contact driver about a lost item". The app connects you without showing your number.', '"Contact driver about a lost item" दबाइए। ऐप आपका नंबर दिखाए बिना बात करवाता है।', '"Contact driver about a lost item" അമർത്തൂ. നിങ്ങളുടെ നമ്പർ കാണിക്കാതെ ആപ്പ് സംസാരിപ്പിക്കും.'],
  ], ['Do this soon after the ride. Drivers answer faster the same day.', 'यह राइड के जल्दी बाद कीजिए। ड्राइवर उसी दिन जल्दी जवाब देते हैं।', 'ഇത് യാത്രയ്ക്ക് തൊട്ടുപിന്നാലെ ചെയ്യൂ. അന്നുതന്നെ ഡ്രൈവർമാർ വേഗം മറുപടി നൽകും.']),
  g('rapido-cancel', 'rapido', 'Rapido', ['Cancel an auto on Rapido', 'Rapido पर ऑटो रद्द करें', 'Rapido-ൽ ഓട്ടോ റദ്ദാക്കാം'], ['rapido cancel', 'cancel auto', 'cancel bike', 'ऑटो रद्द', 'ഓട്ടോ റദ്ദ'], [
    ['Open Rapido while your auto is booked.', 'ऑटो बुक होने पर Rapido खोलिए।', 'ഓട്ടോ ബുക്ക് ചെയ്തിരിക്കുമ്പോൾ Rapido തുറക്കൂ.'],
    ['Tap "Cancel" at the bottom of the screen.', 'स्क्रीन के नीचे "Cancel" दबाइए।', 'സ്ക്രീനിന്റെ താഴെ "Cancel" അമർത്തൂ.'],
    ['Choose a reason and tap "Confirm cancel".', 'कारण चुनकर "Confirm cancel" दबाइए।', 'കാരണം തിരഞ്ഞെടുത്ത് "Confirm cancel" അമർത്തൂ.'],
  ], ['If the driver is already close, a small fee may be charged.', 'ड्राइवर पहले से पास हो तो थोड़ा शुल्क लग सकता है।', 'ഡ്രൈവർ അടുത്തെത്തിയിട്ടുണ്ടെങ്കിൽ ചെറിയ ഫീസ് ഈടാക്കാം.']),
  g('ride-pay-upi', 'uber', 'Uber', ['Choose how to pay for a ride', 'राइड के पैसे कैसे दें, चुनें', 'റൈഡിന് എങ്ങനെ പണം നൽകണമെന്ന് തിരഞ്ഞെടുക്കാം'], ['pay for ride', 'ride payment', 'pay cash cab', 'pay upi cab', 'राइड के पैसे', 'റൈഡ് പേയ്മെന്റ്'], [
    ['Before booking, look for "Payment" or the small money icon.', 'बुक करने से पहले "Payment" या छोटा पैसे का निशान देखिए।', 'ബുക്ക് ചെയ്യുന്നതിന് മുമ്പ് "Payment" അല്ലെങ്കിൽ ചെറിയ പണ ചിഹ്നം നോക്കൂ.'],
    ['Tap it and choose "Cash" or "UPI".', 'उसे दबाकर "Cash" या "UPI" चुनिए।', 'അത് അമർത്തി "Cash" അല്ലെങ്കിൽ "UPI" തിരഞ്ഞെടുക്കൂ.'],
    ['For cash, pay the driver the amount on the screen at the end. Do not pay extra.', 'नकद में, अंत में स्क्रीन पर दिखी रकम ही चालक को दीजिए। ज़्यादा मत दीजिए।', 'പണമാണെങ്കിൽ അവസാനം സ്ക്രീനിൽ കാണുന്ന തുക മാത്രം ഡ്രൈവർക്ക് നൽകൂ. കൂടുതൽ നൽകരുത്.'],
  ]),
  // IRCTC
  g('irctc-cancel', 'irctc', 'IRCTC', ['Cancel a train ticket', 'ट्रेन टिकट रद्द करें', 'ട്രെയിൻ ടിക്കറ്റ് റദ്ദാക്കാം'], ['cancel train ticket', 'cancel irctc', 'ticket cancel', 'टिकट रद्द', 'ടിക്കറ്റ് റദ്ദ്'], [
    ['Open IRCTC Rail Connect and log in.', 'IRCTC Rail Connect खोलकर लॉगिन कीजिए।', 'IRCTC Rail Connect തുറന്ന് ലോഗിൻ ചെയ്യൂ.'],
    ['Tap "Booked Ticket History" or "My Bookings".', '"Booked Ticket History" या "My Bookings" दबाइए।', '"Booked Ticket History" അല്ലെങ്കിൽ "My Bookings" അമർത്തൂ.'],
    ['Tap the ticket, then "Cancel Ticket". Choose the passenger.', 'टिकट दबाइए, फिर "Cancel Ticket"। यात्री चुनिए।', 'ടിക്കറ്റ് അമർത്തി "Cancel Ticket" അമർത്തൂ. യാത്രക്കാരനെ തിരഞ്ഞെടുക്കൂ.'],
    ['Check the money you get back, then confirm with the OTP.', 'लौटने वाली रकम देखिए, फिर OTP से पुष्टि कीजिए।', 'തിരികെ കിട്ടുന്ന തുക നോക്കി OTP കൊണ്ട് ഉറപ്പാക്കൂ.'],
  ], ['Cancel well before the train leaves. Late cancellation returns much less.', 'ट्रेन छूटने से काफ़ी पहले रद्द कीजिए। देर से रद्द करने पर बहुत कम पैसे लौटते हैं।', 'ട്രെയിൻ പുറപ്പെടുന്നതിന് വളരെ മുമ്പ് റദ്ദാക്കൂ. വൈകിയാൽ വളരെ കുറച്ച് മാത്രമേ തിരികെ കിട്ടൂ.']),
  g('irctc-running', 'irctc', 'IRCTC', ['Where is my train now?', 'मेरी ट्रेन अभी कहाँ है?', 'എന്റെ ട്രെയിൻ ഇപ്പോൾ എവിടെ?'], ['train running status', 'where is train', 'train late', 'train live', 'ट्रेन कहाँ', 'ट्रेन लेट', 'ട്രെയിൻ എവിടെ', 'ട്രെയിൻ വൈകി'], [
    ['Open IRCTC Rail Connect. Tap "Train Running Status" (or search "Where is my train" on Google).', 'IRCTC Rail Connect खोलिए। "Train Running Status" दबाइए (या Google पर "Where is my train" खोजिए)।', 'IRCTC Rail Connect തുറക്കൂ. "Train Running Status" അമർത്തൂ (അല്ലെങ്കിൽ Google-ൽ "Where is my train" തിരയൂ).'],
    ['Type the 5-digit train number from your ticket.', 'टिकट पर लिखा 5 अंकों का ट्रेन नंबर डालिए।', 'ടിക്കറ്റിലെ 5 അക്ക ട്രെയിൻ നമ്പർ അടിക്കൂ.'],
    ['Choose the day you started. You see the last station and how late it is.', 'जिस दिन यात्रा शुरू हुई वह दिन चुनिए। आख़िरी स्टेशन और देरी दिखेगी।', 'യാത്ര തുടങ്ങിയ ദിവസം തിരഞ്ഞെടുക്കൂ. അവസാന സ്റ്റേഷനും എത്ര വൈകിയെന്നും കാണാം.'],
  ]),
  g('irctc-seats', 'irctc', 'IRCTC', ['Check if seats are free', 'देखें सीटें खाली हैं या नहीं', 'സീറ്റ് ഒഴിവുണ്ടോ എന്ന് നോക്കാം'], ['seat availability', 'seats available', 'check seats', 'सीट खाली', 'सीट उपलब्ध', 'സീറ്റ് ഒഴിവ്'], [
    ['Open IRCTC and tap "Book Ticket". Choose From, To and the date.', 'IRCTC खोलकर "Book Ticket" दबाइए। कहाँ से, कहाँ तक और तारीख़ चुनिए।', 'IRCTC തുറന്ന് "Book Ticket" അമർത്തൂ. എവിടെ നിന്ന്, എവിടേക്ക്, തീയതി തിരഞ്ഞെടുക്കൂ.'],
    ['Tap "Search". Tap a class like SL or 3A under a train.', '"Search" दबाइए। ट्रेन के नीचे SL या 3A जैसी क्लास दबाइए।', '"Search" അമർത്തൂ. ട്രെയിനിന് താഴെ SL അല്ലെങ്കിൽ 3A പോലുള്ള ക്ലാസ് അമർത്തൂ.'],
    ['"AVAILABLE" means free seats. "RAC" means a half seat. "WL" means waiting, so no seat yet.', '"AVAILABLE" यानी सीट खाली। "RAC" यानी आधी सीट। "WL" यानी वेटिंग, अभी सीट नहीं।', '"AVAILABLE" എന്നാൽ സീറ്റ് ഒഴിവ്. "RAC" എന്നാൽ പകുതി സീറ്റ്. "WL" എന്നാൽ വെയ്റ്റിങ്, സീറ്റ് ഇല്ല.'],
  ]),
  g('irctc-show-ticket', 'irctc', 'IRCTC', ['Show your ticket on the train', 'ट्रेन में अपना टिकट दिखाएं', 'ട്രെയിനിൽ ടിക്കറ്റ് കാണിക്കാം'], ['show ticket', 'e ticket', 'ticket on phone', 'tc ticket', 'टिकट दिखा', 'ടിക്കറ്റ് കാണിക്ക'], [
    ['Open IRCTC Rail Connect and log in.', 'IRCTC Rail Connect खोलकर लॉगिन कीजिए।', 'IRCTC Rail Connect തുറന്ന് ലോഗിൻ ചെയ്യൂ.'],
    ['Tap "My Bookings" and then your journey.', '"My Bookings" दबाइए, फिर अपनी यात्रा।', '"My Bookings" അമർത്തി നിങ്ങളുടെ യാത്ര അമർത്തൂ.'],
    ['Show this screen and your ID card to the ticket checker. A screenshot also helps if the internet is slow.', 'टिकट चेकर को यह स्क्रीन और अपना पहचान पत्र दिखाइए। इंटरनेट धीमा हो तो स्क्रीनशॉट भी काम आता है।', 'ടിക്കറ്റ് പരിശോധകന് ഈ സ്ക്രീനും തിരിച്ചറിയൽ കാർഡും കാണിക്കൂ. ഇന്റർനെറ്റ് മന്ദഗതിയിലാണെങ്കിൽ സ്ക്രീൻഷോട്ടും സഹായിക്കും.'],
  ]),
  // Maps
  g('maps-nearby', 'maps', 'Google Maps', ['Find a hospital, ATM or shop nearby', 'पास का अस्पताल, ATM या दुकान ढूंढें', 'അടുത്തുള്ള ആശുപത്രി, ATM, കട കണ്ടെത്താം'], ['nearby', 'near me', 'nearest hospital', 'nearest atm', 'nearest petrol', 'पास में', 'आसपास', 'അടുത്തുള്ള'], [
    ['Open Google Maps.', 'Google Maps खोलिए।', 'Google Maps തുറക്കൂ.'],
    ['Tap a button under the search box, like "Hospitals", "ATMs" or "Petrol".', 'सर्च बॉक्स के नीचे "Hospitals", "ATMs" या "Petrol" जैसा बटन दबाइए।', 'സെർച്ച് ബോക്സിന് താഴെ "Hospitals", "ATMs" അല്ലെങ്കിൽ "Petrol" പോലുള്ള ബട്ടൺ അമർത്തൂ.'],
    ['Tap a place on the list. Check "Open" and the distance.', 'लिस्ट में कोई जगह दबाइए। "Open" और दूरी देखिए।', 'ലിസ്റ്റിലെ ഒരു സ്ഥലം അമർത്തൂ. "Open" എന്നും ദൂരവും നോക്കൂ.'],
    ['Tap "Directions" to go there.', 'वहाँ जाने के लिए "Directions" दबाइए।', 'അവിടേക്ക് പോകാൻ "Directions" അമർത്തൂ.'],
  ]),
  g('maps-save-home', 'maps', 'Google Maps', ['Save your home address', 'घर का पता सेव करें', 'വീട്ടു വിലാസം സേവ് ചെയ്യാം'], ['save home', 'home address', 'set home', 'घर का पता', 'വീട്ടു വിലാസം'], [
    ['Open Google Maps and tap "Saved" at the bottom.', 'Google Maps खोलकर नीचे "Saved" दबाइए।', 'Google Maps തുറന്ന് താഴെ "Saved" അമർത്തൂ.'],
    ['Tap "Home" under Your lists.', '"Home" दबाइए।', '"Home" അമർത്തൂ.'],
    ['Type your address and pick it. Now "Home" is one tap away.', 'अपना पता लिखकर चुनिए। अब "Home" बस एक दबाव दूर है।', 'നിങ്ങളുടെ വിലാസം എഴുതി തിരഞ്ഞെടുക്കൂ. ഇനി "Home" ഒറ്റ അമർത്തലിൽ.'],
  ]),
  g('maps-offline', 'maps', 'Google Maps', ['Use maps without internet', 'बिना इंटरनेट के नक्शा इस्तेमाल करें', 'ഇന്റർനെറ്റ് ഇല്ലാതെ മാപ്പ് ഉപയോഗിക്കാം'], ['offline map', 'without internet', 'no network map', 'ऑफ़लाइन नक्शा', 'ഓഫ്‌ലൈൻ മാപ്പ്'], [
    ['Do this while you have Wi-Fi. Open Google Maps.', 'यह तब कीजिए जब Wi-Fi हो। Google Maps खोलिए।', 'Wi-Fi ഉള്ളപ്പോൾ ഇത് ചെയ്യൂ. Google Maps തുറക്കൂ.'],
    ['Tap your round photo at the top right, then "Offline maps".', 'ऊपर दाईं तरफ़ अपनी गोल फ़ोटो दबाइए, फिर "Offline maps"।', 'മുകളിൽ വലത് നിങ്ങളുടെ വട്ട ഫോട്ടോ അമർത്തി "Offline maps" അമർത്തൂ.'],
    ['Tap "Select your own map", move the box over your area, and tap "Download".', '"Select your own map" दबाइए, डिब्बे को अपने इलाके पर रखिए, और "Download" दबाइए।', '"Select your own map" അമർത്തി ബോക്സ് നിങ്ങളുടെ പ്രദേശത്ത് വെച്ച് "Download" അമർത്തൂ.'],
  ]),
  g('maps-voice', 'maps', 'Google Maps', ['Change the voice or turn it up in Maps', 'Maps की आवाज़ बदलें या तेज़ करें', 'Maps ശബ്ദം മാറ്റാം കൂട്ടാം'], ['maps voice', 'navigation voice', 'maps sound', 'maps volume', 'मैप्स की आवाज़', 'മാപ്പ് ശബ്ദം'], [
    ['While directions are on, tap the speaker icon on the screen.', 'रास्ता चलते समय स्क्रीन पर स्पीकर का निशान दबाइए।', 'വഴി കാണിക്കുമ്പോൾ സ്ക്രീനിലെ സ്പീക്കർ ചിഹ്നം അമർത്തൂ.'],
    ['Choose the loud speaker option so the voice plays.', 'आवाज़ चलाने के लिए तेज़ स्पीकर वाला विकल्प चुनिए।', 'ശബ്ദം കേൾക്കാൻ ഉച്ചത്തിലുള്ള സ്പീക്കർ ഓപ്ഷൻ തിരഞ്ഞെടുക്കൂ.'],
    ['Use the volume buttons on the side of your phone to make it louder.', 'फ़ोन की साइड के volume बटन से आवाज़ तेज़ कीजिए।', 'ഫോണിന്റെ വശത്തെ വോളിയം ബട്ടൺ കൊണ്ട് ശബ്ദം കൂട്ടൂ.'],
  ]),
  // Email, calls
  g('gmail-send', 'phone', 'Gmail', ['Send an email', 'ईमेल भेजें', 'ഇമെയിൽ അയക്കാം'], ['send email', 'write email', 'gmail', 'mail bhejna', 'ईमेल', 'ജിമെയിൽ', 'ഇമെയിൽ'], [
    ['Open the "Gmail" app. Tap the "Compose" (pencil) button at the bottom right.', '"Gmail" ऐप खोलिए। नीचे दाईं तरफ़ "Compose" (पेंसिल) बटन दबाइए।', '"Gmail" ആപ്പ് തുറക്കൂ. താഴെ വലത് "Compose" (പെൻസിൽ) ബട്ടൺ അമർത്തൂ.'],
    ['In "To", type the email address of the person.', '"To" में उस व्यक്തി का ईमेल पता लिखिए।', '"To"-ൽ ആ ആളുടെ ഇമെയിൽ വിലാസം എഴുതൂ.'],
    ['Type a "Subject" (a few words about it) and the message.', '"Subject" (उसके बारे में कुछ शब्द) और संदेश लिखिए।', '"Subject" (അതിനെക്കുറിച്ച് കുറച്ച് വാക്കുകൾ) എഴുതി സന്ദേശം എഴുതൂ.'],
    ['Tap the arrow at the top right to send. To attach a file, tap the paper-clip first.', 'भेजने के लिए ऊपर दाईं तरफ़ तीर दबाइए। फ़ाइल जोड़नी हो तो पहले पेपर-क्लिप दबाइए।', 'അയക്കാൻ മുകളിൽ വലത് അമ്പ് അമർത്തൂ. ഫയൽ ചേർക്കണമെങ്കിൽ ആദ്യം പേപ്പർ ക്ലിപ്പ് അമർത്തൂ.'],
  ]),
  g('open-link-safe', 'phone', 'Phone', ['Is this link or message safe?', 'क्या यह लिंक या संदेश सुरक्षित है?', 'ഈ ലിങ്ക് അല്ലെങ്കിൽ മെസ്സേജ് സുരക്ഷിതമാണോ?'], ['link safe', 'fake message', 'is this scam', 'suspicious link', 'लिंक सुरक्षित', 'ठगी का संदेश', 'സംശയമുള്ള ലിങ്ക്', 'വ്യാജ'], [
    ['Do not tap the link. Do not reply.', 'लिंक मत दबाइए। जवाब मत दीजिए।', 'ലിങ്ക് അമർത്തരുത്. മറുപടി നൽകരുത്.'],
    ['Warning signs: it says "urgent", "you won a prize", "your account will be blocked", or asks for OTP, PIN or card number.', 'खतरे के निशान: "तुरंत", "इनाम जीता", "खाता बंद हो जाएगा", या OTP, PIN, कार्ड नंबर माँगना।', 'അപകട സൂചനകൾ: "അടിയന്തരം", "സമ്മാനം നേടി", "അക്കൗണ്ട് ബ്ലോക്ക് ആകും", അല്ലെങ്കിൽ OTP, PIN, കാർഡ് നമ്പർ ചോദിക്കൽ.'],
    ['Real banks never ask for your PIN, OTP or password on a call or message.', 'असली बैंक फ़ोन या संदेश पर आपका PIN, OTP या पासवर्ड कभी नहीं माँगते।', 'യഥാർത്ഥ ബാങ്കുകൾ കോളിലോ മെസ്സേജിലോ നിങ്ങളുടെ PIN, OTP, പാസ്‌വേഡ് ഒരിക്കലും ചോദിക്കില്ല.'],
    ['Show it to a family member. If unsure, ask someone first.', 'परिवार के किसी सदस्य को दिखाइए। पक्का न हो तो पहले किसी से पूछिए।', 'വീട്ടിലെ ഒരാളെ കാണിക്കൂ. ഉറപ്പില്ലെങ്കിൽ ആദ്യം ആരോടെങ്കിലും ചോദിക്കൂ.'],
  ], ['If you already shared a PIN or OTP, call 1930 at once.', 'PIN या OTP बता दिया हो तो तुरंत 1930 पर फ़ोन कीजिए।', 'PIN അല്ലെങ്കിൽ OTP പറഞ്ഞുപോയെങ്കിൽ ഉടൻ 1930 ൽ വിളിക്കൂ.']),
];
