import { g } from './build';

const PH = 'phone';
const PN = 'Phone';

export const PHONE_GUIDES = [
  g('ringtone', PH, PN, ['Change your ringtone', 'रिंगटोन बदलें', 'റിങ്ടോൺ മാറ്റാം'], ['ringtone', 'ring tone', 'रिंगटोन', 'റിങ്ടോൺ', 'call sound'], [
    ['Open "Settings" on your phone (the gear icon).', 'फ़ोन में "Settings" खोलिए (गियर वाला निशान)।', 'ഫോണിലെ "Settings" തുറക്കൂ (ഗിയർ ചിഹ്നം).'],
    ['Tap "Sound" or "Sound and vibration".', '"Sound" या "Sound and vibration" दबाइए।', '"Sound" അല്ലെങ്കിൽ "Sound and vibration" അമർത്തൂ.'],
    ['Tap "Ringtone".', '"Ringtone" दबाइए।', '"Ringtone" അമർത്തൂ.'],
    ['Tap a tune to hear it. Tap the one you like.', 'किसी धुन को दबाकर सुनिए। जो पसंद आए उसे चुनिए।', 'ഒരു ട്യൂൺ അമർത്തി കേൾക്കൂ. ഇഷ്ടമുള്ളത് തിരഞ്ഞെടുക്കൂ.'],
    ['Press the back arrow. The new ringtone is saved.', 'पीछे वाला तीर दबाइए। नई रिंगटोन लग गई।', 'പിന്നോട്ടുള്ള അമ്പ് അമർത്തൂ. പുതിയ റിങ്ടോൺ സേവ് ആയി.'],
  ]),
  g('alarm', PH, PN, ['Set an alarm', 'अलार्म लगाएं', 'അലാറം വെക്കാം'], ['alarm', 'wake up', 'अलार्म', 'अलार्म', 'അലാറം', 'remind me to wake'], [
    ['Open the "Clock" app.', '"Clock" ऐप खोलिए।', '"Clock" ആപ്പ് തുറക്കൂ.'],
    ['Tap "Alarm" at the bottom.', 'नीचे "Alarm" दबाइए।', 'താഴെ "Alarm" അമർത്തൂ.'],
    ['Tap the "+" button.', '"+" वाला बटन दबाइए।', '"+" ബട്ടൺ അമർത്തൂ.'],
    ['Turn the dial to set the hour and minutes. Choose AM or PM.', 'घंटे और मिनट सेट कीजिए। AM या PM चुनिए।', 'മണിക്കൂറും മിനിറ്റും സെറ്റ് ചെയ്യൂ. AM അല്ലെങ്കിൽ PM തിരഞ്ഞെടുക്കൂ.'],
    ['Tap "Save" or "OK". The alarm is on when its switch is blue or green.', '"Save" या "OK" दबाइए। अलार्म चालू तब है जब स्विच नीला या हरा हो।', '"Save" അല്ലെങ്കിൽ "OK" അമർത്തൂ. സ്വിച്ച് നീലയോ പച്ചയോ ആണെങ്കിൽ അലാറം ഓൺ ആണ്.'],
  ]),
  g('save-contact', PH, PN, ['Save a new contact', 'नया नंबर सेव करें', 'പുതിയ നമ്പർ സേവ് ചെയ്യാം'], ['save contact', 'save number', 'add contact', 'new contact', 'नंबर सेव', 'कॉन्टैक्ट', 'നമ്പർ സേവ്', 'കോൺടാക്ട്'], [
    ['Open the "Phone" app (the green phone icon).', '"Phone" ऐप खोलिए (हरा फ़ोन वाला निशान)।', '"Phone" ആപ്പ് തുറക്കൂ (പച്ച ഫോൺ ചിഹ്നം).'],
    ['Tap "Contacts" at the bottom, then the "+" button.', 'नीचे "Contacts" दबाइए, फिर "+" दबाइए।', 'താഴെ "Contacts" അമർത്തി "+" അമർത്തൂ.'],
    ['Type the name, then the phone number.', 'नाम लिखिए, फिर फ़ोन नंबर।', 'പേര് എഴുതൂ, പിന്നെ ഫോൺ നമ്പർ.'],
    ['Tap "Save". Now you can find them by name.', '"Save" दबाइए। अब आप नाम से उन्हें ढूंढ सकते हैं।', '"Save" അമർത്തൂ. ഇനി പേര് കൊണ്ട് കണ്ടെത്താം.'],
  ]),
  g('dark-mode', PH, PN, ['Turn on dark mode', 'डार्क मोड चालू करें', 'ഡാർക്ക് മോഡ് ഓണാക്കാം'], ['dark mode', 'night mode', 'black screen', 'डार्क मोड', 'ഡാർക്ക് മോഡ്'], [
    ['Open "Settings".', '"Settings" खोलिए।', '"Settings" തുറക്കൂ.'],
    ['Tap "Display".', '"Display" दबाइए।', '"Display" അമർത്തൂ.'],
    ['Turn on "Dark mode" or "Dark theme".', '"Dark mode" या "Dark theme" चालू कीजिए।', '"Dark mode" അല്ലെങ്കിൽ "Dark theme" ഓണാക്കൂ.'],
  ]),
  g('wallpaper', PH, PN, ['Change the wallpaper', 'वॉलपेपर बदलें', 'വാൾപേപ്പർ മാറ്റാം'], ['wallpaper', 'background photo', 'home screen picture', 'वॉलपेपर', 'വാൾപേപ്പർ'], [
    ['Press and hold an empty space on your home screen.', 'होम स्क्रीन पर किसी खाली जगह को दबाए रखिए।', 'ഹോം സ്ക്രീനിലെ ഒരു ഒഴിഞ്ഞ സ്ഥലത്ത് അമർത്തിപ്പിടിക്കൂ.'],
    ['Tap "Wallpaper" or "Wallpaper and style".', '"Wallpaper" या "Wallpaper and style" दबाइए।', '"Wallpaper" അല്ലെങ്കിൽ "Wallpaper and style" അമർത്തൂ.'],
    ['Choose one of the pictures, or your own photo from "Gallery".', 'कोई तस्वीर चुनिए, या "Gallery" से अपनी फ़ोटो।', 'ഒരു ചിത്രം തിരഞ്ഞെടുക്കൂ, അല്ലെങ്കിൽ "Gallery"യിൽ നിന്ന് നിങ്ങളുടെ ഫോട്ടോ.'],
    ['Tap "Set wallpaper" and choose "Home screen".', '"Set wallpaper" दबाइए और "Home screen" चुनिए।', '"Set wallpaper" അമർത്തി "Home screen" തിരഞ്ഞെടുക്കൂ.'],
  ]),
  g('play-explore', 'playstore', 'Play Store', ['Find your way around the Play Store', 'Play Store में रास्ता पहचानिए', 'Play Store-ൽ വഴി കണ്ടെത്താം'], ['play store', 'app store', 'explore apps', 'top charts', 'new apps', 'ऐप स्टोर', 'नए ऐप', 'ആപ്പ് സ്റ്റോർ', 'പുതിയ ആപ്പുകൾ'], [
    ['Open "Play Store" on your phone (the colourful triangle).', '"Play Store" खोलिए (रंगीन तिकोना निशान)।', '"Play Store" തുറക്കൂ (നിറമുള്ള ത്രികോണം).'],
    ['Look at the words near the top: "For you", "Top charts" and "Kids". Each one shows a different kind of apps.', 'ऊपर लिखे शब्द देखिए: "For you", "Top charts" और "Kids"। हर एक में अलग तरह के ऐप हैं।', 'മുകളിലെ വാക്കുകൾ നോക്കൂ: "For you", "Top charts", "Kids". ഓരോന്നിലും വ്യത്യസ്ത തരം ആപ്പുകളാണ്.'],
    ['Tap "Top charts" to see the apps that most people download.', '"Top charts" दबाइए, ताकि सबसे ज़्यादा डाउनलोड होने वाले ऐप दिखें।', '"Top charts" അമർത്തൂ, ഏറ്റവും കൂടുതൽ പേർ ഡൗൺലോഡ് ചെയ്യുന്ന ആപ്പുകൾ കാണാം.'],
    ['This is a list of popular apps. Popular does not always mean safe, so still check the company name.', 'यह लोकप्रिय ऐप की सूची है। लोकप्रिय का मतलब हमेशा सुरक्षित नहीं होता, इसलिए कंपनी का नाम ज़रूर देखिए।', 'ഇത് ജനപ്രിയ ആപ്പുകളുടെ പട്ടികയാണ്. ജനപ്രിയം എന്നാൽ എപ്പോഴും സുരക്ഷിതം എന്നല്ല, കമ്പനിയുടെ പേര് നോക്കണം.'],
    ['When you know what you want, tap the search box at the top.', 'जब पता हो कि क्या चाहिए, तो ऊपर सर्च बॉक्स दबाइए।', 'എന്താണ് വേണ്ടതെന്ന് അറിയാമെങ്കിൽ മുകളിലെ സെർച്ച് ബോക്സ് അമർത്തൂ.'],
  ], ['"Sponsored" or "Ad" means someone paid to show that app. It is not a recommendation.', '"Sponsored" या "Ad" का मतलब है किसी ने दिखाने के पैसे दिए हैं। यह सिफ़ारिश नहीं है।', '"Sponsored" അല്ലെങ്കിൽ "Ad" എന്നാൽ ആരോ പണം നൽകി കാണിക്കുന്നതാണ്. അത് ശുപാർശയല്ല.']),
  g('install-app', PH, PN, ['Install an app from the Play Store', 'Play Store से ऐप डालें', 'Play Store-ൽ നിന്ന് ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യാം'], ['install app', 'download app', 'play store', 'get an app', 'ऐप डाउनलोड', 'ऐप इंस्टॉल', 'ആപ്പ് ഇൻസ്റ്റാൾ', 'ആപ്പ് ഡൗൺലോഡ്'], [
    ['Open the "Play Store" app (the colourful triangle).', '"Play Store" ऐप खोलिए (रंगीन तिकोना निशान)।', '"Play Store" ആപ്പ് തുറക്കൂ (നിറമുള്ള ത്രികോണം).'],
    ['Tap the search box at the top.', 'ऊपर सर्च बॉक्स दबाइए।', 'മുകളിലെ സെർച്ച് ബോക്സ് അമർത്തൂ.'],
    ['Type the app name. Some results say "Sponsored". Those are ads, so do not tap them.', 'ऐप का नाम लिखिए। कुछ नतीजों पर "Sponsored" लिखा होता है। वे विज्ञापन हैं, उन्हें मत दबाइए।', 'ആപ്പിന്റെ പേര് എഴുതൂ. ചില ഫലങ്ങളിൽ "Sponsored" എന്ന് കാണും. അവ പരസ്യങ്ങളാണ്, അമർത്തരുത്.'],
    ['Tap the real app. Check the company name under it, like "PhonePe Private Limited".', 'असली ऐप दबाइए। नीचे कंपनी का नाम देखिए, जैसे "PhonePe Private Limited"।', 'യഥാർത്ഥ ആപ്പ് അമർത്തൂ. താഴെ കമ്പനിയുടെ പേര് നോക്കൂ, ഉദാ. "PhonePe Private Limited".'],
    ['Check the app name and developer. Ratings and downloads are clues, not proof. If unsure, check the official website or ask someone you trust.', 'ऐप और बनाने वाली कंपनी का नाम जाँचिए। रेटिंग और डाउनलोड संकेत हैं, सबूत नहीं। संदेह हो तो आधिकारिक वेबसाइट देखिए या भरोसेमंद व्यक्ति से पूछिए।', 'ആപ്പിന്റെയും ഡെവലപ്പറുടെയും പേര് പരിശോധിക്കൂ. റേറ്റിങ്ങും ഡൗൺലോഡുകളും സൂചനകളാണ്, തെളിവല്ല. സംശയമുണ്ടെങ്കിൽ ഔദ്യോഗിക വെബ്സൈറ്റ് നോക്കൂ അല്ലെങ്കിൽ വിശ്വസിക്കുന്ന ഒരാളോട് ചോദിക്കൂ.'],
    ['Tap the green "Install" button.', 'हरा "Install" बटन दबाइए।', 'പച്ച "Install" ബട്ടൺ അമർത്തൂ.'],
    ['Wait while it installs. Do not press anything.', 'इंस्टॉल होने तक रुकिए। कुछ मत दबाइए।', 'ഇൻസ്റ്റാൾ ആകുന്നത് വരെ കാത്തിരിക്കൂ. ഒന്നും അമർത്തരുത്.'],
    ['When it finishes, tap "Open".', 'पूरा होने पर "Open" दबाइए।', 'തീർന്നാൽ "Open" അമർത്തൂ.'],
  ], ['Install only from the Play Store. Never from a link someone sent.', 'ऐप सिर्फ़ Play Store से डालिए। किसी के भेजे लिंक से कभी नहीं।', 'ആപ്പ് Play Store-ൽ നിന്ന് മാത്രം ഇൻസ്റ്റാൾ ചെയ്യൂ. ആരെങ്കിലും അയച്ച ലിങ്കിൽ നിന്ന് ഒരിക്കലും വേണ്ട.']),
  g('play-update-apps', PH, PN, ['Keep your apps up to date', 'ऐप अपडेट रखिए', 'ആപ്പുകൾ അപ്ഡേറ്റ് ആയി സൂക്ഷിക്കാം'], ['update apps', 'update app', 'app update', 'ऐप अपडेट', 'ആപ്പ് അപ്ഡേറ്റ്'], [
    ['Open the "Play Store" app.', '"Play Store" ऐप खोलिए।', '"Play Store" ആപ്പ് തുറക്കൂ.'],
    ['Tap your round picture at the top right.', 'ऊपर दाईं तरफ़ अपनी गोल तस्वीर दबाइए।', 'മുകളിൽ വലതുവശത്തെ നിങ്ങളുടെ വൃത്താകൃതിയിലുള്ള ചിത്രം അമർത്തൂ.'],
    ['Tap "Manage apps & device".', '"Manage apps & device" दबाइए।', '"Manage apps & device" അമർത്തൂ.'],
    ['If it says "Updates available", tap "Update all".', 'अगर "Updates available" लिखा हो, तो "Update all" दबाइए।', '"Updates available" എന്ന് കണ്ടാൽ "Update all" അമർത്തൂ.'],
    ['Wait until the updates finish. You can keep using your phone.', 'अपडेट पूरे होने तक रुकिए। इस बीच फ़ोन चला सकते हैं।', 'അപ്ഡേറ്റ് തീരുന്നത് വരെ കാത്തിരിക്കൂ. അതിനിടയിൽ ഫോൺ ഉപയോഗിക്കാം.'],
  ], ['Updates fix security problems. Update only inside the Play Store, never from a link.', 'अपडेट सुरक्षा की कमियाँ ठीक करते हैं। अपडेट सिर्फ़ Play Store में कीजिए, लिंक से कभी नहीं।', 'അപ്ഡേറ്റുകൾ സുരക്ഷാ പ്രശ്നങ്ങൾ പരിഹരിക്കുന്നു. Play Store-ൽ മാത്രം അപ്ഡേറ്റ് ചെയ്യൂ, ലിങ്ക് വഴി വേണ്ട.']),
  g('icon-meanings', PH, PN, ['Learn what common icons mean', 'आम निशानों का मतलब समझिए', 'സാധാരണ ചിഹ്നങ്ങളുടെ അർത്ഥം അറിയാം'], ['icons', 'icon meaning', 'symbols', 'magnifying glass', 'three dots', 'निशान', 'आइकन', 'ചിഹ്നം', 'ഐക്കൺ'], [
    ['Many apps use the same small pictures, called icons. Once you know them, every app feels familiar.', 'कई ऐप वही छोटे चित्र इस्तेमाल करते हैं, जिन्हें आइकन कहते हैं। इन्हें जान लेने पर हर ऐप जाना-पहचाना लगता है।', 'പല ആപ്പുകളും ഒരേ ചെറിയ ചിത്രങ്ങൾ ഉപയോഗിക്കുന്നു, അവയെ ഐക്കണുകൾ എന്ന് പറയും. ഇവ അറിഞ്ഞാൽ ഏത് ആപ്പും പരിചിതമായി തോന്നും.'],
    ['Tap the magnifying glass. It means "search". Use it to find a video, an app or a chat.', 'आवर्धक शीशे (मैग्निफ़ाइंग ग्लास) को दबाइए। इसका मतलब है "खोजना"। इससे वीडियो, ऐप या चैट ढूँढ़ी जाती है।', 'ലെൻസ് (മാഗ്നിഫൈയിംഗ് ഗ്ലാസ്) അമർത്തൂ. ഇതിന്റെ അർത്ഥം "തിരയുക". വീഡിയോ, ആപ്പ്, ചാറ്റ് എന്നിവ കണ്ടെത്താൻ ഇത് ഉപയോഗിക്കാം.'],
    ['Tap the arrow pointing left. It means "go back" to the screen you were on before.', 'बाईं तरफ़ वाला तीर दबाइए। इसका मतलब है "पीछे जाना", यानी पिछली स्क्रीन पर लौटना।', 'ഇടത്തോട്ടുള്ള അമ്പടയാളം അമർത്തൂ. ഇതിന്റെ അർത്ഥം "പിന്നോട്ട് പോകുക", അതായത് മുമ്പത്തെ സ്ക്രീനിലേക്ക് മടങ്ങുക.'],
    ['Tap the little house. It means "home". It takes you to the first screen of the app, or of the phone.', 'छोटा घर दबाइए। इसका मतलब है "होम"। यह आपको ऐप की, या फ़ोन की पहली स्क्रीन पर ले जाता है।', 'ചെറിയ വീട് അമർത്തൂ. ഇതിന്റെ അർത്ഥം "ഹോം". ഇത് ആപ്പിന്റെ, അല്ലെങ്കിൽ ഫോണിന്റെ, ആദ്യ സ്ക്രീനിലേക്ക് കൊണ്ടുപോകും.'],
    ['Tap the one with three dots joined by lines. It means "share". Use it to send a photo or a link to someone.', 'तीन बिंदु और उन्हें जोड़ती लकीरों वाला दबाइए। इसका मतलब है "शेयर करना"। इससे किसी को फ़ोटो या लिंक भेजा जाता है।', 'വരകളാൽ ബന്ധിപ്പിച്ച മൂന്ന് കുത്തുകളുള്ളത് അമർത്തൂ. ഇതിന്റെ അർത്ഥം "പങ്കിടുക". ആർക്കെങ്കിലും ഫോട്ടോയോ ലിങ്കോ അയയ്ക്കാൻ ഇത് ഉപയോഗിക്കാം.'],
    ['Tap the gear. It means "settings". Use it to change how the app or the phone works.', 'गियर (चक्का) दबाइए। इसका मतलब है "सेटिंग्स"। इससे ऐप या फ़ोन के काम करने का तरीका बदला जाता है।', 'ഗിയർ അമർത്തൂ. ഇതിന്റെ അർത്ഥം "സെറ്റിംഗ്സ്". ആപ്പോ ഫോണോ പ്രവർത്തിക്കുന്ന രീതി മാറ്റാൻ ഇത് ഉപയോഗിക്കാം.'],
    ['Tap the icon with three straight lines. It means "menu". It opens the list of things the app can do.', 'तीन सीधी लकीरों वाला निशान दबाइए। इसका मतलब है "मेन्यू"। यह ऐप के सारे काम की सूची खोलता है।', 'മൂന്ന് നേർവരകളുള്ള ചിഹ്നം അമർത്തൂ. ഇതിന്റെ അർത്ഥം "മെനു". ആപ്പിന് ചെയ്യാവുന്ന കാര്യങ്ങളുടെ പട്ടിക ഇത് തുറക്കും.'],
    ['Tap the icon with three dots. It means "more". It shows extra options for what you are looking at.', 'तीन बिंदुओं वाला निशान दबाइए। इसका मतलब है "और"। यह सामने दिख रही चीज़ के और विकल्प दिखाता है।', 'മൂന്ന് കുത്തുകളുള്ള ചിഹ്നം അമർത്തൂ. ഇതിന്റെ അർത്ഥം "കൂടുതൽ". കാണുന്ന കാര്യത്തിനുള്ള മറ്റ് ഓപ്ഷനുകൾ ഇത് കാണിക്കും.'],
    ['Tap the camera. It means "take a photo or a video", or "scan something".', 'कैमरा दबाइए। इसका मतलब है "फ़ोटो या वीडियो लेना", या "कुछ स्कैन करना"।', 'ക്യാമറ അമർത്തൂ. ഇതിന്റെ അർത്ഥം "ഫോട്ടോയോ വീഡിയോയോ എടുക്കുക", അല്ലെങ്കിൽ "എന്തെങ്കിലും സ്കാൻ ചെയ്യുക".'],
    ['Tap the microphone. It means "speak". Use it to say a word instead of typing it, or to record your voice.', 'माइक दबाइए। इसका मतलब है "बोलना"। टाइप करने की जगह बोलकर लिखवाने, या अपनी आवाज़ रिकॉर्ड करने के लिए इसे दबाते हैं।', 'മൈക്ക് അമർത്തൂ. ഇതിന്റെ അർത്ഥം "സംസാരിക്കുക". ടൈപ്പ് ചെയ്യുന്നതിന് പകരം പറയാനോ, നിങ്ങളുടെ ശബ്ദം റെക്കോർഡ് ചെയ്യാനോ ഇത് ഉപയോഗിക്കാം.'],
    ['Look: the search icon is the same in YouTube, the Play Store and WhatsApp. Same picture, same meaning.', 'देखिए: खोज का निशान YouTube, Play Store और WhatsApp में एक ही है। वही चित्र, वही मतलब।', 'നോക്കൂ: തിരയാനുള്ള ചിഹ്നം YouTube, Play Store, WhatsApp എന്നിവയിൽ ഒന്നുതന്നെയാണ്. ഒരേ ചിത്രം, ഒരേ അർത്ഥം.'],
  ], ['Read what a button does before confirming a payment, deletion, or sharing.', 'भुगतान, मिटाने या साझा करने की पुष्टि से पहले बटन का मतलब पढ़िए।', 'പണമടയ്ക്കൽ, മായ്ക്കൽ, പങ്കിടൽ എന്നിവ സ്ഥിരീകരിക്കുന്നതിന് മുമ്പ് ബട്ടൺ എന്താണെന്ന് വായിക്കൂ.']),
  g('update-app', PH, PN, ['Update an app', 'ऐप अपडेट करें', 'ആപ്പ് അപ്ഡേറ്റ് ചെയ്യാം'], ['update app', 'app update', 'अपडेट', 'അപ്ഡേറ്റ്', 'new version'], [
    ['Open the "Play Store".', '"Play Store" खोलिए।', '"Play Store" തുറക്കൂ.'],
    ['Tap your round profile picture at the top right.', 'ऊपर दाईं तरफ़ अपनी गोल फ़ोटो दबाइए।', 'മുകളിൽ വലത് നിങ്ങളുടെ വട്ടത്തിലുള്ള ഫോട്ടോ അമർത്തൂ.'],
    ['Tap "Manage apps and device".', '"Manage apps and device" दबाइए।', '"Manage apps and device" അമർത്തൂ.'],
    ['Tap "Update all", or "Update" next to one app.', '"Update all" दबाइए, या किसी एक ऐप के आगे "Update"।', '"Update all" അമർത്തൂ, അല്ലെങ്കിൽ ഒരു ആപ്പിന്റെ അടുത്തുള്ള "Update".'],
  ]),
  g('bluetooth', PH, PN, ['Turn on Bluetooth', 'ब्लूटूथ चालू करें', 'ബ്ലൂടൂത്ത് ഓണാക്കാം'], ['bluetooth', 'ब्लूटूथ', 'ബ്ലൂടൂത്ത്', 'earphones connect', 'speaker connect'], [
    ['Swipe down from the top of the screen.', 'स्क्रीन के ऊपर से नीचे की ओर खींचिए।', 'സ്ക്രീനിന്റെ മുകളിൽ നിന്ന് താഴേക്ക് വലിക്കൂ.'],
    ['Tap the "Bluetooth" tile to turn it on. Press and hold it to see devices.', '"Bluetooth" वाला बटन दबाकर चालू कीजिए। डिवाइस देखने के लिए उसे दबाए रखिए।', '"Bluetooth" ടൈൽ അമർത്തി ഓണാക്കൂ. ഉപകരണങ്ങൾ കാണാൻ അമർത്തിപ്പിടിക്കൂ.'],
    ['Switch on your earphones or speaker. Tap its name in the list.', 'अपने ईयरफ़ोन या स्पीकर को चालू कीजिए। लिस्ट में उसका नाम दबाइए।', 'ഇയർഫോണോ സ്പീക്കറോ ഓണാക്കൂ. ലിസ്റ്റിൽ അതിന്റെ പേര് അമർത്തൂ.'],
  ]),
  g('airplane-mode', PH, PN, ['Turn on aeroplane mode', 'एयरप्लेन मोड चालू करें', 'എയർപ്ലെയിൻ മോഡ് ഓണാക്കാം'], ['airplane mode', 'aeroplane mode', 'flight mode', 'एयरप्लेन', 'ഫ്ലൈറ്റ് മോഡ്', 'എയർപ്ലെയിൻ'], [
    ['Swipe down from the top of the screen.', 'स्क्रीन के ऊपर से नीचे की ओर खींचिए।', 'സ്ക്രീനിന്റെ മുകളിൽ നിന്ന് താഴേക്ക് വലിക്കൂ.'],
    ['Tap the aeroplane icon. Calls and internet stop.', 'हवाई जहाज़ वाला निशान दबाइए। कॉल और इंटरनेट बंद हो जाएंगे।', 'വിമാന ചിഹ്നം അമർത്തൂ. കോളും ഇന്റർനെറ്റും നിൽക്കും.'],
    ['Tap it again to turn it off when you land.', 'उतरने के बाद उसे फिर दबाकर बंद कीजिए।', 'ഇറങ്ങിയ ശേഷം വീണ്ടും അമർത്തി ഓഫ് ആക്കൂ.'],
  ]),
  g('free-space', PH, PN, ['Free up space on your phone', 'फ़ोन में जगह खाली करें', 'ഫോണിൽ സ്ഥലം ഒഴിവാക്കാം'], ['storage full', 'free space', 'phone full', 'clear space', 'स्टोरेज', 'जगह खाली', 'സ്റ്റോറേജ്', 'സ്ഥലം'], [
    ['Open "Settings", then "Storage".', '"Settings" खोलिए, फिर "Storage"।', '"Settings" തുറന്ന് "Storage" അമർത്തൂ.'],
    ['Tap "Free up space" or "Clean".', '"Free up space" या "Clean" दबाइए।', '"Free up space" അല്ലെങ്കിൽ "Clean" അമർത്തൂ.'],
    ['Look at what is big: videos, WhatsApp files, old photos.', 'देखिए क्या बड़ा है: वीडियो, WhatsApp की फ़ाइलें, पुरानी फ़ोटो।', 'വലുത് എന്താണെന്ന് നോക്കൂ: വീഡിയോ, WhatsApp ഫയലുകൾ, പഴയ ഫോട്ടോ.'],
    ['Delete only what you do not need. Ask someone if unsure.', 'सिर्फ़ वही हटाइए जो ज़रूरी नहीं। पक्का न हो तो किसी से पूछ लीजिए।', 'ആവശ്യമില്ലാത്തത് മാത്രം ഡിലീറ്റ് ചെയ്യൂ. ഉറപ്പില്ലെങ്കിൽ ആരോടെങ്കിലും ചോദിക്കൂ.'],
  ], ['Back up photos first. A deleted photo may be gone for good.', 'पहले फ़ोटो का बैकअप लीजिए। हटाई गई फ़ोटो हमेशा के लिए जा सकती है।', 'ആദ്യം ഫോട്ടോകൾ ബാക്കപ്പ് എടുക്കൂ. ഡിലീറ്റ് ചെയ്ത ഫോട്ടോ എന്നെന്നേക്കുമായി പോയേക്കാം.']),
  g('battery-saver', PH, PN, ['Save battery', 'बैटरी बचाएं', 'ബാറ്ററി ലാഭിക്കാം'], ['battery saver', 'save battery', 'battery low', 'battery drain', 'बैटरी', 'ബാറ്ററി'], [
    ['Open "Settings", then "Battery".', '"Settings" खोलिए, फिर "Battery"।', '"Settings" തുറന്ന് "Battery" അമർത്തൂ.'],
    ['Turn on "Battery saver" or "Power saving".', '"Battery saver" या "Power saving" चालू कीजिए।', '"Battery saver" അല്ലെങ്കിൽ "Power saving" ഓണാക്കൂ.'],
    ['Also lower the screen brightness: swipe down from the top and slide the brightness bar left.', 'स्क्रीन की रोशनी भी कम कीजिए: ऊपर से नीचे खींचकर ब्राइटनेस की पट्टी बाईं ओर सरकाइए।', 'സ്ക്രീൻ വെളിച്ചവും കുറയ്ക്കൂ: മുകളിൽ നിന്ന് താഴേക്ക് വലിച്ച് ബ്രൈറ്റ്നസ് ബാർ ഇടത്തേക്ക് നീക്കൂ.'],
  ]),
  g('screen-lock', PH, PN, ['Set a screen lock', 'स्क्रीन लॉक लगाएं', 'സ്ക്രീൻ ലോക്ക് സെറ്റ് ചെയ്യാം'], ['screen lock', 'lock phone', 'phone pin', 'password lock', 'पैटर्न', 'स्क्रीन लॉक', 'ലോക്ക്', 'സ്ക്രീൻ ലോക്ക്'], [
    ['Open "Settings", then "Security" or "Lock screen".', '"Settings" खोलिए, फिर "Security" या "Lock screen"।', '"Settings" തുറന്ന് "Security" അല്ലെങ്കിൽ "Lock screen" അമർത്തൂ.'],
    ['Tap "Screen lock".', '"Screen lock" दबाइए।', '"Screen lock" അമർത്തൂ.'],
    ['Choose "PIN". Type a number you will remember, twice.', '"PIN" चुनिए। कोई ऐसा नंबर लिखिए जो आपको याद रहे, दो बार।', '"PIN" തിരഞ്ഞെടുക്കൂ. ഓർമ്മയിൽ നിൽക്കുന്ന ഒരു നമ്പർ രണ്ടു തവണ അടിക്കൂ.'],
    ['Do not use 1234 or your birth year. Write it somewhere safe at home.', '1234 या जन्म का साल मत रखिए। इसे घर में किसी सुरक्षित जगह लिख लीजिए।', '1234 അല്ലെങ്കിൽ ജനിച്ച വർഷം വേണ്ട. വീട്ടിൽ സുരക്ഷിതമായ ഒരിടത്ത് എഴുതിവെക്കൂ.'],
  ]),
  g('fingerprint', PH, PN, ['Add your fingerprint', 'फ़िंगरप्रिंट जोड़ें', 'വിരലടയാളം ചേർക്കാം'], ['fingerprint', 'finger lock', 'thumb', 'फ़िंगरप्रिंट', 'ഫിംഗർപ്രിന്റ്', 'വിരലടയാളം'], [
    ['Open "Settings", then "Security" or "Biometrics".', '"Settings" खोलिए, फिर "Security" या "Biometrics"।', '"Settings" തുറന്ന് "Security" അല്ലെങ്കിൽ "Biometrics" അമർത്തൂ.'],
    ['Tap "Fingerprint".', '"Fingerprint" दबाइए।', '"Fingerprint" അമർത്തൂ.'],
    ['Type your screen lock PIN if asked.', 'माँगा जाए तो स्क्रीन लॉक का PIN लिखिए।', 'ചോദിച്ചാൽ സ്ക്രീൻ ലോക്ക് PIN അടിക്കൂ.'],
    ['Place your finger on the sensor again and again, moving it a little each time, until it is full.', 'सेंसर पर उंगली बार-बार रखिए, हर बार थोड़ा हटाकर, जब तक पूरा न हो जाए।', 'സെൻസറിൽ വിരൽ വീണ്ടും വീണ്ടും വെക്കൂ, ഓരോ തവണയും കുറച്ച് നീക്കി, നിറയുന്നത് വരെ.'],
  ]),
  g('find-phone', PH, PN, ['Find a lost phone', 'खोया फ़ोन ढूंढें', 'നഷ്ടപ്പെട്ട ഫോൺ കണ്ടെത്താം'], ['lost phone', 'find my phone', 'find phone', 'stolen phone', 'phone lost', 'खोया फ़ोन', 'फ़ोन खो', 'ഫോൺ നഷ്ടം', 'ഫോൺ കാണാനില്ല'], [
    ['On another phone or computer, open the browser and go to android.com/find.', 'किसी दूसरे फ़ोन या कंप्यूटर के ब्राउज़र में android.com/find खोलिए।', 'മറ്റൊരു ഫോണിലോ കമ്പ്യൂട്ടറിലോ ബ്രൗസറിൽ android.com/find തുറക്കൂ.'],
    ['Sign in with the same Google account as the lost phone.', 'खोए फ़ोन वाले Google खाते से ही साइन इन कीजिए।', 'നഷ്ടപ്പെട്ട ഫോണിലെ അതേ Google അക്കൗണ്ട് കൊണ്ട് സൈൻ ഇൻ ചെയ്യൂ.'],
    ['Pick your phone. You can see it on the map, or tap "Play sound" to make it ring.', 'अपना फ़ोन चुनिए। नक्शे पर दिखेगा, या "Play sound" दबाकर उसे बजाइए।', 'നിങ്ങളുടെ ഫോൺ തിരഞ്ഞെടുക്കൂ. മാപ്പിൽ കാണാം, അല്ലെങ്കിൽ "Play sound" അമർത്തി റിങ് ചെയ്യിക്കൂ.'],
    ['If stolen, tap "Secure device", and also tell the police and your phone company to block the SIM.', 'चोरी हो गया हो तो "Secure device" दबाइए, पुलिस और फ़ोन कंपनी को भी बताइए ताकि सिम बंद हो।', 'മോഷണം പോയെങ്കിൽ "Secure device" അമർത്തൂ, പോലീസിനോടും ഫോൺ കമ്പനിയോടും പറഞ്ഞ് സിം ബ്ലോക്ക് ചെയ്യിക്കൂ.'],
  ]),
  g('phone-language', PH, PN, ['Change the phone language', 'फ़ोन की भाषा बदलें', 'ഫോണിന്റെ ഭാഷ മാറ്റാം'], ['change language', 'phone language', 'hindi on phone', 'malayalam on phone', 'भाषा बदल', 'ഭാഷ മാറ്റ'], [
    ['Open "Settings", then "System" or "General management".', '"Settings" खोलिए, फिर "System" या "General management"।', '"Settings" തുറന്ന് "System" അല്ലെങ്കിൽ "General management" അമർത്തൂ.'],
    ['Tap "Languages".', '"Languages" दबाइए।', '"Languages" അമർത്തൂ.'],
    ['Tap "Add a language", pick yours, and drag it to the top.', '"Add a language" दबाइए, अपनी भाषा चुनिए, और उसे सबसे ऊपर खींचिए।', '"Add a language" അമർത്തി നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുത്ത് ഏറ്റവും മുകളിലേക്ക് വലിക്കൂ.'],
  ]),
  g('call-volume', PH, PN, ['Make the call voice louder', 'कॉल की आवाज़ तेज़ करें', 'കോൾ ശബ്ദം കൂട്ടാം'], ['call volume', 'cannot hear', 'voice low', 'louder', 'आवाज़ तेज़', 'आवाज़ कम', 'ശബ്ദം കൂട്ട', 'ശബ്ദം കുറവ്'], [
    ['While on a call, press the volume "+" button on the side of the phone.', 'कॉल के दौरान फ़ोन की साइड वाला volume "+" बटन दबाइए।', 'കോളിനിടയിൽ ഫോണിന്റെ വശത്തുള്ള volume "+" ബട്ടൺ അമർത്തൂ.'],
    ['Or tap the "Speaker" button on the call screen.', 'या कॉल स्क्रीन पर "Speaker" बटन दबाइए।', 'അല്ലെങ്കിൽ കോൾ സ്ക്രീനിലെ "Speaker" ബട്ടൺ അമർത്തൂ.'],
    ['Check the microphone hole at the bottom is not blocked by a cover or dust.', 'देखिए नीचे का माइक का छेद कवर या धूल से बंद तो नहीं।', 'താഴെയുള്ള മൈക്ക് ദ്വാരം കവറോ പൊടിയോ കൊണ്ട് അടഞ്ഞിട്ടില്ലെന്ന് നോക്കൂ.'],
  ]),
  g('restart-phone', PH, PN, ['Restart a hanging phone', 'अटका हुआ फ़ोन फिर चालू करें', 'ഹാങ് ആയ ഫോൺ റീസ്റ്റാർട്ട് ചെയ്യാം'], ['restart', 'reboot', 'phone hang', 'phone stuck', 'not responding', 'अटक', 'हैंग', 'ഹാങ്'], [
    ['Press and hold the power button on the side for a few seconds.', 'साइड का पावर बटन कुछ सेकंड दबाए रखिए।', 'വശത്തെ പവർ ബട്ടൺ കുറച്ച് സെക്കൻഡ് അമർത്തിപ്പിടിക്കൂ.'],
    ['Tap "Restart".', '"Restart" दबाइए।', '"Restart" അമർത്തൂ.'],
    ['If the screen does not respond, hold the power button for about 15 seconds until it switches off. Then switch it on.', 'स्क्रीन न चले तो पावर बटन करीब 15 सेकंड दबाए रखिए जब तक फ़ोन बंद न हो। फिर चालू कीजिए।', 'സ്ക്രീൻ പ്രതികരിക്കുന്നില്ലെങ്കിൽ പവർ ബട്ടൺ ഏകദേശം 15 സെക്കൻഡ് അമർത്തിപ്പിടിക്കൂ, ഓഫ് ആകുന്നത് വരെ. പിന്നെ ഓൺ ചെയ്യൂ.'],
  ]),
  g('uninstall-app', PH, PN, ['Remove an app you do not need', 'बेकार ऐप हटाएं', 'ആവശ്യമില്ലാത്ത ആപ്പ് നീക്കം ചെയ്യാം'], ['uninstall', 'delete app', 'remove app', 'ऐप हटा', 'ऐप डिलीट', 'ആപ്പ് ഡിലീറ്റ്', 'ആപ്പ് നീക്ക'], [
    ['Press and hold the app icon.', 'ऐप के निशान को दबाए रखिए।', 'ആപ്പിന്റെ ചിഹ്നം അമർത്തിപ്പിടിക്കൂ.'],
    ['Tap "Uninstall" (or "App info", then "Uninstall").', '"Uninstall" दबाइए (या "App info", फिर "Uninstall")।', '"Uninstall" അമർത്തൂ (അല്ലെങ്കിൽ "App info", പിന്നെ "Uninstall").'],
    ['Tap "OK". You can install it again later from the Play Store.', '"OK" दबाइए। बाद में Play Store से फिर डाल सकते हैं।', '"OK" അമർത്തൂ. പിന്നീട് Play Store-ൽ നിന്ന് വീണ്ടും ഇൻസ്റ്റാൾ ചെയ്യാം.'],
  ], ['Do not remove Google Pay or your bank app by mistake.', 'गलती से Google Pay या बैंक का ऐप मत हटाइए।', 'അബദ്ധത്തിൽ Google Pay-യോ ബാങ്ക് ആപ്പോ നീക്കരുത്.']),
  g('mute-notifications', PH, PN, ['Stop notifications from an app', 'किसी ऐप की सूचनाएं बंद करें', 'ഒരു ആപ്പിന്റെ നോട്ടിഫിക്കേഷൻ നിർത്താം'], ['notifications', 'stop notifications', 'too many messages', 'notification off', 'सूचना', 'नोटिफ़िकेशन', 'നോട്ടിഫിക്കേഷൻ'], [
    ['Press and hold the app icon, then tap the "i" or "App info".', 'ऐप के निशान को दबाए रखिए, फिर "i" या "App info" दबाइए।', 'ആപ്പ് ചിഹ്നം അമർത്തിപ്പിടിച്ച് "i" അല്ലെങ്കിൽ "App info" അമർത്തൂ.'],
    ['Tap "Notifications".', '"Notifications" दबाइए।', '"Notifications" അമർത്തൂ.'],
    ['Turn the main switch off.', 'ऊपर वाला मुख्य स्विच बंद कीजिए।', 'മുകളിലെ പ്രധാന സ്വിച്ച് ഓഫ് ആക്കൂ.'],
  ]),
  g('do-not-disturb', PH, PN, ['Stop calls at night (Do Not Disturb)', 'रात में कॉल बंद करें (Do Not Disturb)', 'രാത്രി കോൾ നിർത്താം (Do Not Disturb)'], ['do not disturb', 'dnd', 'night calls', 'sleep mode', 'कॉल बंद', 'डू नॉट डिस्टर्ब', 'ഡു നോട്ട് ഡിസ്റ്റർബ്'], [
    ['Swipe down from the top of the screen.', 'स्क्रीन के ऊपर से नीचे की ओर खींचिए।', 'സ്ക്രീനിന്റെ മുകളിൽ നിന്ന് താഴേക്ക് വലിക്കൂ.'],
    ['Tap "Do Not Disturb" to turn it on.', '"Do Not Disturb" दबाकर चालू कीजिए।', '"Do Not Disturb" അമർത്തി ഓണാക്കൂ.'],
    ['Press and hold it to allow calls from family only.', 'उसे दबाए रखिए और सिर्फ़ परिवार की कॉल की अनुमति दीजिए।', 'അമർത്തിപ്പിടിച്ച് വീട്ടുകാരുടെ കോൾ മാത്രം അനുവദിക്കൂ.'],
  ]),
  g('emergency-sos', PH, PN, ['Call for help in an emergency', 'आपातकाल में मदद बुलाएं', 'അടിയന്തരഘട്ടത്തിൽ സഹായം വിളിക്കാം'], ['emergency', 'sos', 'help call', 'ambulance', 'police', 'आपातकाल', 'एम्बुलेंस', 'അടിയന്തര', 'ആംബുലൻസ്'], [
    ['Dial 112 from the phone keypad. It works even without balance or a lock.', 'फ़ोन के कीपैड से 112 डायल कीजिए। बैलेंस या लॉक न हो तब भी चलता है।', 'ഫോൺ കീപാഡിൽ 112 ഡയൽ ചെയ്യൂ. ബാലൻസോ ലോക്ക് തുറക്കലോ ഇല്ലെങ്കിലും പ്രവർത്തിക്കും.'],
    ['On many phones, pressing the power button 5 times quickly also calls for help. Ask someone to set it up in Settings.', 'कई फ़ोन में पावर बटन 5 बार जल्दी दबाने से भी मदद बुलती है। Settings में किसी से सेट करवा लीजिए।', 'പല ഫോണിലും പവർ ബട്ടൺ 5 തവണ വേഗം അമർത്തിയാലും സഹായം വിളിക്കും. Settings-ൽ ആരെയെങ്കിലും കൊണ്ട് സെറ്റ് ചെയ്യിക്കൂ.'],
    ['Add a family member as an "Emergency contact" in your Contacts.', 'Contacts में परिवार के एक सदस्य को "Emergency contact" बनाइए।', 'Contacts-ൽ വീട്ടിലെ ഒരാളെ "Emergency contact" ആക്കൂ.'],
  ]),
  g('share-photo-whatsapp', PH, PN, ['Send a photo to someone', 'किसी को फ़ोटो भेजें', 'ഒരാൾക്ക് ഫോട്ടോ അയക്കാം'], ['send photo', 'share photo', 'send picture', 'फ़ोटो भेज', 'फोटो भेज', 'ഫോട്ടോ അയക്ക'], [
    ['Open the "Photos" or "Gallery" app and tap the photo.', '"Photos" या "Gallery" ऐप खोलकर फ़ोटो दबाइए।', '"Photos" അല്ലെങ്കിൽ "Gallery" ആപ്പ് തുറന്ന് ഫോട്ടോ അമർത്തൂ.'],
    ['Tap the "Share" icon (three dots joined by lines).', '"Share" निशान दबाइए (रेखाओं से जुड़े तीन बिंदु)।', '"Share" ചിഹ്നം അമർത്തൂ (വരകൾ കൊണ്ട് ബന്ധിപ്പിച്ച മൂന്ന് കുത്തുകൾ).'],
    ['Tap "WhatsApp", then the person you want to send it to.', '"WhatsApp" दबाइए, फिर जिसे भेजना है उसका नाम।', '"WhatsApp" അമർത്തി ആർക്കാണോ അയക്കേണ്ടത് അവരുടെ പേര് അമർത്തൂ.'],
    ['Tap the green send arrow.', 'हरा भेजने वाला तीर दबाइए।', 'പച്ച അയക്കൽ അമ്പ് അമർത്തൂ.'],
  ]),
  g('google-photos-backup', PH, PN, ['Back up your photos', 'फ़ोटो का बैकअप लें', 'ഫോട്ടോ ബാക്കപ്പ് എടുക്കാം'], ['backup photos', 'photo backup', 'google photos', 'save photos safe', 'फ़ोटो बैकअप', 'ഫോട്ടോ ബാക്കപ്പ്'], [
    ['Open the "Google Photos" app.', '"Google Photos" ऐप खोलिए।', '"Google Photos" ആപ്പ് തുറക്കൂ.'],
    ['Tap your round profile picture at the top right.', 'ऊपर दाईं तरफ़ अपनी गोल फ़ोटो दबाइए।', 'മുകളിൽ വലത് നിങ്ങളുടെ വട്ട ഫോട്ടോ അമർത്തൂ.'],
    ['Tap "Turn on backup".', '"Turn on backup" दबाइए।', '"Turn on backup" അമർത്തൂ.'],
    ['Choose "Save" or "Confirm". Your photos are now copied to your Google account.', '"Save" या "Confirm" चुनिए। अब आपकी फ़ोटो Google खाते में कॉपी होती रहेंगी।', '"Save" അല്ലെങ്കിൽ "Confirm" തിരഞ്ഞെടുക്കൂ. ഇനി നിങ്ങളുടെ ഫോട്ടോ Google അക്കൗണ്ടിലേക്ക് പകർത്തപ്പെടും.'],
  ]),
  g('recover-photo', PH, PN, ['Get back a deleted photo', 'डिलीट हुई फ़ोटो वापस लाएं', 'ഡിലീറ്റ് ആയ ഫോട്ടോ തിരികെ എടുക്കാം'], ['deleted photo', 'recover photo', 'restore photo', 'photo gone', 'फ़ोटो वापस', 'ഫോട്ടോ തിരികെ'], [
    ['Open the "Google Photos" app.', '"Google Photos" ऐप खोलिए।', '"Google Photos" ആപ്പ് തുറക്കൂ.'],
    ['Tap "Library" at the bottom, then "Bin" or "Trash".', 'नीचे "Library" दबाइए, फिर "Bin" या "Trash"।', 'താഴെ "Library" അമർത്തി "Bin" അല്ലെങ്കിൽ "Trash" അമർത്തൂ.'],
    ['Press and hold the photo, then tap "Restore".', 'फ़ोटो को दबाए रखिए, फिर "Restore" दबाइए।', 'ഫോട്ടോ അമർത്തിപ്പിടിച്ച് "Restore" അമർത്തൂ.'],
  ], ['Deleted photos stay in the bin only for about 30 to 60 days.', 'डिलीट की गई फ़ोटो बिन में सिर्फ़ करीब 30 से 60 दिन रहती हैं।', 'ഡിലീറ്റ് ചെയ്ത ഫോട്ടോ ബിന്നിൽ ഏകദേശം 30 മുതൽ 60 ദിവസം മാത്രമേ ഉണ്ടാകൂ.']),
];
