import { g } from './build';

export const APP_GUIDES = [
  // Rides
  g('uber-book', 'uber', 'Uber', ['Book a cab on Uber', 'Uber पर कैब बुक करें', 'Uber-ൽ ക്യാബ് ബുക്ക് ചെയ്യാം'], ['book cab', 'book taxi', 'book ride', 'uber book', 'कैब बुक', 'टैक्सी', 'ക്യാബ് ബുക്ക്'], [
    ['Open Uber. Tap "Where to?".', 'Uber खोलिए। "Where to?" दबाइए।', 'Uber തുറക്കൂ. "Where to?" അമർത്തൂ.'],
    ['Type where you want to go and tap the right place from the list.', 'जहाँ जाना है वह लिखिए और लिस्ट में सही जगह दबाइए।', 'എവിടേക്കാണ് പോകേണ്ടത് എന്ന് എഴുതി ലിസ്റ്റിൽ ശരിയായ സ്ഥലം അമർത്തൂ.'],
    ['Check the pick-up point on the map. Move the pin if needed.', 'नक्शे पर पिक-अप की जगह देखिए। ज़रूरत हो तो पिन खिसकाइए।', 'മാപ്പിൽ പിക്കപ്പ് സ്ഥലം നോക്കൂ. വേണമെങ്കിൽ പിൻ നീക്കൂ.'],
    ['Choose the ride type and see the price. Tap "Confirm".', 'गाड़ी का प्रकार चुनिए और किराया देखिए। "Confirm" दबाइए।', 'വാഹന തരം തിരഞ്ഞെടുത്ത് വില നോക്കൂ. "Confirm" അമർത്തൂ.'],
    ['Match the car number and driver details first. In the matching car, share the ride PIN with the booked driver before the trip starts.', 'पहले गाड़ी का नंबर और ड्राइवर की जानकारी मिलाइए। सही गाड़ी में बैठकर यात्रा शुरू होने से पहले बुक किए ड्राइवर को यात्रा का PIN बताइए।', 'ആദ്യം വണ്ടി നമ്പറും ഡ്രൈവർ വിവരങ്ങളും ഒത്തുനോക്കൂ. ശരിയായ കാറിൽ കയറി യാത്ര തുടങ്ങുന്നതിന് മുമ്പ് ബുക്ക് ചെയ്ത ഡ്രൈവറോട് യാത്രാ PIN പറയൂ.'],
  ], ['Always check the car number before you get in.', 'बैठने से पहले गाड़ी का नंबर ज़रूर मिलाइए।', 'കയറുന്നതിന് മുമ്പ് വണ്ടി നമ്പർ തീർച്ചയായും നോക്കൂ.']),
  g('uber-cancel', 'uber', 'Uber', ['Cancel a ride', 'राइड रद्द करें', 'റൈഡ് റദ്ദാക്കാം'], ['cancel ride', 'cancel cab', 'cancel taxi', 'कैब रद्द', 'राइड कैंसल', 'റൈഡ് റദ്ദ്'], [
    ['While your ride is booked, swipe the bottom panel up. Tap "Cancel ride".', 'राइड बुक होने पर नीचे का पैनल ऊपर खींचिए। "Cancel ride" दबाइए।', 'റൈഡ് ബുക്ക് ചെയ്തിരിക്കുമ്പോൾ താഴത്തെ പാനൽ മുകളിലേക്ക് വലിക്കൂ. "Cancel ride" അമർത്തൂ.'],
    ['Uber may offer to find another driver. To cancel, tap "YES, CANCEL". If a fee applies, the app shows it first.', 'Uber दूसरा ड्राइवर ढूँढने को कह सकता है। रद्द करने के लिए "YES, CANCEL" दबाइए। कोई शुल्क हो तो ऐप पहले दिखाता है।', 'Uber മറ്റൊരു ഡ്രൈവറെ കണ്ടെത്താമെന്ന് പറഞ്ഞേക്കാം. റദ്ദാക്കാൻ "YES, CANCEL" അമർത്തൂ. ഫീസ് ഉണ്ടെങ്കിൽ ആപ്പ് ആദ്യം കാണിക്കും.'],
    ['Choose why you are cancelling. The ride is cancelled.', 'रद्द करने का कारण चुनिए। राइड रद्द हो जाती है।', 'റദ്ദാക്കുന്നതിന്റെ കാരണം തിരഞ്ഞെടുക്കൂ. റൈഡ് റദ്ദാകും.'],
  ], ['If the driver is already near, you may be charged a small fee.', 'ड्राइवर पहले से पास हो तो थोड़ा शुल्क लग सकता है।', 'ഡ്രൈവർ അടുത്ത് എത്തിയെങ്കിൽ ചെറിയ ഫീസ് ഈടാക്കിയേക്കാം.']),
  g('ride-share-trip', 'uber', 'Uber', ['Share your trip with family', 'अपनी यात्रा परिवार के साथ शेयर करें', 'യാത്ര വീട്ടുകാരുമായി പങ്കിടാം'], ['share trip', 'share ride', 'share status', 'trip share', 'यात्रा शेयर', 'യാത്ര പങ്കിടാ'], [
    ['During the ride, swipe the bottom panel up to see "Ride details".', 'राइड के दौरान नीचे का पैनल ऊपर खींचिए, "Ride details" दिखेगा।', 'യാത്രയ്ക്കിടയിൽ താഴത്തെ പാനൽ മുകളിലേക്ക് വലിക്കൂ, "Ride details" കാണാം.'],
    ['Next to "Share trip status", tap "Share".', '"Share trip status" के पास "Share" दबाइए।', '"Share trip status"-ന് അടുത്തുള്ള "Share" അമർത്തൂ.'],
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
    ['Once the details match, get in and share the ride PIN with the booked driver before the trip starts. This is not your banking PIN.', 'जानकारी मिल जाए तो बैठिए और यात्रा शुरू होने से पहले बुक किए ड्राइवर को यात्रा का PIN बताइए। यह बैंक वाला PIN नहीं है।', 'വിവരങ്ങൾ ഒത്തുവന്നാൽ കയറി യാത്ര തുടങ്ങുന്നതിന് മുമ്പ് ബുക്ക് ചെയ്ത ഡ്രൈവറോട് യാത്രാ PIN പറയൂ. ഇത് ബാങ്ക് PIN അല്ല.'],
  ], ['If the car or driver does not match, stay outside. Check your booking, contact the booked driver in the app and wait safely for the matching car. Use in-app help or cancel if the mismatch cannot be resolved or you feel unsafe.', 'गाड़ी या ड्राइवर मेल न खाए तो बाहर रहिए। बुकिंग जाँचकर ऐप से बुक किए ड्राइवर से बात कीजिए और सही गाड़ी का सुरक्षित जगह इंतज़ार कीजिए। बात न सुलझे या असुरक्षित लगे तो ऐप में मदद लीजिए या रद्द कीजिए।', 'കാറോ ഡ്രൈവറോ ഒത്തുവരുന്നില്ലെങ്കിൽ പുറത്ത് നിൽക്കൂ. ബുക്കിങ് പരിശോധിച്ച് ആപ്പിലൂടെ ബുക്ക് ചെയ്ത ഡ്രൈവറെ ബന്ധപ്പെടൂ. ശരിയായ കാറിനായി സുരക്ഷിതമായി കാത്തിരിക്കൂ. പരിഹാരമില്ലെങ്കിലോ സുരക്ഷിതമല്ലെങ്കിലോ ആപ്പിൽ സഹായം തേടൂ അല്ലെങ്കിൽ റദ്ദാക്കൂ.']),
  g('ride-rate', 'uber', 'Uber', ['Rate your ride and report a problem', 'राइड को रेटिंग दें और परेशानी बताएँ', 'റൈഡിന് റേറ്റിംഗ് നൽകാം, പ്രശ്നം അറിയിക്കാം'], ['rate ride', 'rating', 'ride problem', 'report driver', 'रेटिंग', 'റേറ്റിംഗ്'], [
    ['Open Uber and tap "Activity" at the bottom.', 'Uber खोलिए और नीचे "Activity" दबाइए।', 'Uber തുറന്ന് താഴെ "Activity" അമർത്തൂ.'],
    ['Under "Past", tap your ride.', '"Past" में अपनी राइड दबाइए।', '"Past"-ന് താഴെ നിങ്ങളുടെ റൈഡ് അമർത്തൂ.'],
    ['Next to "No rating", tap "Rate".', '"No rating" के पास "Rate" दबाइए।', '"No rating"-ന് അടുത്തുള്ള "Rate" അമർത്തൂ.'],
    ['Tap the stars. Five is very good. With fewer stars, tap what went wrong, then "Done". For a bigger problem, use "Customer Support" on the ride page.', 'तारे दबाइए। पाँच यानी बहुत अच्छा। कम तारे दें तो बताइए क्या ठीक नहीं था, फिर "Done"। बड़ी परेशानी हो तो राइड वाले पेज पर "Customer Support" दबाइए।', 'നക്ഷത്രങ്ങൾ അമർത്തൂ. അഞ്ച് എന്നാൽ വളരെ നല്ലത്. കുറവ് നക്ഷത്രങ്ങളാണെങ്കിൽ എന്താണ് ശരിയാകാത്തതെന്ന് അമർത്തി "Done" അമർത്തൂ. വലിയ പ്രശ്നമുണ്ടെങ്കിൽ റൈഡ് പേജിലെ "Customer Support" ഉപയോഗിക്കൂ.'],
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
  g('ride-pay-upi', 'uber', 'Uber', ['Pay for a ride and rate it', 'राइड के पैसे दें और रेटिंग दें', 'റൈഡിന് പണം നൽകി റേറ്റിംഗ് നൽകാം'], ['pay for ride', 'rate ride', 'rating', 'rate driver', 'tip driver', 'रेटिंग', 'റേറ്റിംഗ്', 'ride payment', 'pay cash cab', 'pay upi cab', 'राइड के पैसे', 'റൈഡ് പേയ്മെന്റ്'], [
    ['Before you book, on "Choose a ride", tap "Cash" at the bottom.', 'बुक करने से पहले "Choose a ride" पर नीचे "Cash" दबाइए।', 'ബുക്ക് ചെയ്യുന്നതിന് മുമ്പ് "Choose a ride"-ൽ താഴെയുള്ള "Cash" അമർത്തൂ.'],
    ['Choose your payment method before booking. For UPI, select your own linked account. Check the method and fare before confirming.', 'बुक करने से पहले भुगतान का तरीका चुनिए। UPI के लिए अपना जुड़ा खाता चुनिए। पुष्टि से पहले तरीका और किराया जाँचिए।', 'ബുക്ക് ചെയ്യുന്നതിന് മുമ്പ് പണമടയ്ക്കുന്ന രീതി തിരഞ്ഞെടുക്കൂ. UPI-യ്ക്ക് സ്വന്തം ലിങ്ക് ചെയ്ത അക്കൗണ്ട് തിരഞ്ഞെടുക്കൂ. സ്ഥിരീകരിക്കുന്നതിന് മുമ്പ് രീതിയും നിരക്കും പരിശോധിക്കൂ.'],
    ['When the ride ends, the app asks how it was. Tap the stars: five is very good.', 'राइड खत्म होने पर ऐप पूछता है कि कैसी रही। तारे दबाइए: पाँच यानी बहुत अच्छा।', 'യാത്ര കഴിയുമ്പോൾ എങ്ങനെയുണ്ടായിരുന്നുവെന്ന് ആപ്പ് ചോദിക്കും. നക്ഷത്രങ്ങൾ അമർത്തൂ: അഞ്ച് എന്നാൽ വളരെ നല്ലത്.'],
    ['With fewer stars, tap what went wrong. A tip is your choice; you can skip it. Tap "Done". If you paid cash, give the driver only the amount on the screen.', 'कम तारे दें तो बताइए क्या ठीक नहीं था। टिप देना आपकी मर्ज़ी है, छोड़ भी सकते हैं। "Done" दबाइए। नकद दिया हो तो चालक को स्क्रीन पर दिखी रकम ही दीजिए।', 'കുറവ് നക്ഷത്രങ്ങളാണെങ്കിൽ എന്താണ് ശരിയാകാത്തതെന്ന് അമർത്തൂ. ടിപ്പ് നിങ്ങളുടെ ഇഷ്ടം, വേണ്ടെങ്കിൽ ഒഴിവാക്കാം. "Done" അമർത്തൂ. പണമായി കൊടുത്തെങ്കിൽ സ്ക്രീനിൽ കാണുന്ന തുക മാത്രം ഡ്രൈവർക്ക് നൽകൂ.'],
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
  // Zomato: written from general knowledge of the app, to be checked against real screenshots (see docs/ROADMAP-NOTES.md).
  g('zomato-order', 'zomato', 'Zomato', ['Order food on Zomato', 'Zomato पर खाना मंगाएं', 'Zomato-ൽ ഭക്ഷണം ഓർഡർ ചെയ്യാം'], ['zomato', 'order food', 'food order', 'food delivery', 'order khana', 'खाना मंगा', 'ज़ोमैटो', 'जोमैटो', 'ഭക്ഷണം ഓർഡർ', 'സൊമാറ്റോ'], [
    ['Open the Zomato app. Say yes if it asks to use your location, so it shows restaurants near you.', 'Zomato ऐप खोलिए। अगर लोकेशन की इजाज़त माँगे तो हाँ कीजिए, ताकि पास के रेस्टोरेंट दिखें।', 'Zomato ആപ്പ് തുറക്കൂ. ലൊക്കേഷൻ ചോദിച്ചാൽ ശരി നൽകൂ, അപ്പോൾ അടുത്തുള്ള റെസ്റ്റോറന്റുകൾ കാണാം.'],
    ['Tap the search box at the top. Type the dish or the restaurant name.', 'ऊपर सर्च बॉक्स दबाइए। खाने या रेस्टोरेंट का नाम लिखिए।', 'മുകളിലെ സെർച്ച് ബോക്സ് അമർത്തൂ. വിഭവത്തിന്റെയോ റെസ്റ്റോറന്റിന്റെയോ പേര് എഴുതൂ.'],
    ['Tap a restaurant in the list. Look at its rating and how long delivery takes.', 'लिस्ट में एक रेस्टोरेंट दबाइए। उसकी रेटिंग और डिलीवरी में लगने वाला समय देखिए।', 'ലിസ്റ്റിലെ ഒരു റെസ്റ്റോറന്റ് അമർത്തൂ. അതിന്റെ റേറ്റിംഗും ഡെലിവറിക്ക് എടുക്കുന്ന സമയവും നോക്കൂ.'],
    ['Tap "ADD" next to the dish you want.', 'जो खाना चाहिए, उसके पास "ADD" दबाइए।', 'വേണ്ട വിഭവത്തിന്റെ അടുത്തുള്ള "ADD" അമർത്തൂ.'],
    ['Tap "View cart" at the bottom.', 'नीचे "View cart" दबाइए।', 'താഴെയുള്ള "View cart" അമർത്തൂ.'],
    ['Check the address and the bill. Delivery fee and taxes are added, so read the total before you pay.', 'पता और बिल देखिए। डिलीवरी शुल्क और टैक्स जुड़ते हैं, इसलिए पैसे देने से पहले कुल रकम पढ़िए।', 'വിലാസവും ബില്ലും നോക്കൂ. ഡെലിവറി ചാർജും നികുതിയും കൂടും, അതുകൊണ്ട് പണം അടയ്ക്കും മുമ്പ് ആകെ തുക വായിക്കൂ.'],
    ['Choose how to pay, then tap the button at the bottom to place your order.', 'पैसे कैसे देने हैं, यह चुनिए। फिर ऑर्डर देने के लिए नीचे वाला बटन दबाइए।', 'എങ്ങനെ പണം അടയ്ക്കണമെന്ന് തിരഞ്ഞെടുക്കൂ. എന്നിട്ട് ഓർഡർ ചെയ്യാൻ താഴെയുള്ള ബട്ടൺ അമർത്തൂ.'],
    ['Wait for your food. You can follow the delivery person on the map.', 'खाने का इंतज़ार कीजिए। मैप पर डिलीवरी करने वाले को देख सकते हैं।', 'ഭക്ഷണത്തിനായി കാത്തിരിക്കൂ. ഡെലിവറി ചെയ്യുന്നയാളെ മാപ്പിൽ കാണാം.'],
  ], ['Nobody needs your UPI PIN. Never read out an OTP to someone who calls about your order.', 'आपका UPI PIN किसी को नहीं चाहिए। ऑर्डर के बारे में फ़ोन करने वाले को OTP कभी न बताइए।', 'നിങ്ങളുടെ UPI PIN ആർക്കും വേണ്ട. ഓർഡറിനെക്കുറിച്ച് വിളിക്കുന്നവരോട് OTP ഒരിക്കലും പറയരുത്.']),
];
