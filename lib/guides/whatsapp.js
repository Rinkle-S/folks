import { g } from './build';
const W = 'whatsapp';
const N = 'WhatsApp';

export const WHATSAPP_GUIDES = [
  g('wa-create-group', W, N, ['Make a WhatsApp group', 'WhatsApp ग्रुप बनाएं', 'WhatsApp ഗ്രൂപ്പ് ഉണ്ടാക്കാം'], ['create group', 'make group', 'new group', 'whatsapp group', 'ग्रुप बना', 'ग्रुप', 'ഗ്രൂപ്പ്'], [
    ['Open WhatsApp. Tap the green "+" or chat button at the bottom right.', 'WhatsApp खोलिए। नीचे दाईं तरफ़ हरा "+" या चैट वाला बटन दबाइए।', 'WhatsApp തുറക്കൂ. താഴെ വലത് പച്ച "+" അല്ലെങ്കിൽ ചാറ്റ് ബട്ടൺ അമർത്തൂ.'],
    ['Tap "New group".', '"New group" दबाइए।', '"New group" അമർത്തൂ.'],
    ['Tap the people you want to add. They appear at the top.', 'जिन्हें जोड़ना है उन पर दबाइए। वे ऊपर दिखेंगे।', 'ചേർക്കേണ്ടവരെ അമർത്തൂ. അവർ മുകളിൽ കാണും.'],
    ['Tap the green arrow at the bottom right.', 'नीचे दाईं तरफ़ हरा तीर दबाइए।', 'താഴെ വലത് പച്ച അമ്പ് അമർത്തൂ.'],
    ['Type a group name, like "Family". Tap the green tick.', 'ग्रुप का नाम लिखिए, जैसे "Family"। हरा सही का निशान दबाइए।', 'ഗ്രൂപ്പിന്റെ പേര് എഴുതൂ, ഉദാ. "Family". പച്ച ടിക്ക് അമർത്തൂ.'],
  ]),
  g('wa-leave-group', W, N, ['Leave a WhatsApp group', 'WhatsApp ग्रुप छोड़ें', 'WhatsApp ഗ്രൂപ്പിൽ നിന്ന് പുറത്തുവരാം'], ['leave group', 'exit group', 'ग्रुप छोड़', 'ഗ്രൂപ്പ് വിടുക', 'ഗ്രൂപ്പിൽ നിന്ന്'], [
    ['Open the group chat.', 'ग्रुप की चैट खोलिए।', 'ഗ്രൂപ്പ് ചാറ്റ് തുറക്കൂ.'],
    ['Tap the three dots at the top right, then "More", then "Exit group".', 'ऊपर दाईं तरफ़ तीन बिंदु दबाइए, फिर "More", फिर "Exit group"।', 'മുകളിൽ വലത് മൂന്ന് കുത്തുകൾ അമർത്തി "More", പിന്നെ "Exit group" അമർത്തൂ.'],
    ['Tap "Exit" to confirm. Others will see that you left.', 'पक्का करने के लिए "Exit" दबाइए। बाकी लोग देखेंगे कि आप निकल गए।', 'ഉറപ്പാക്കാൻ "Exit" അമർത്തൂ. നിങ്ങൾ പോയത് മറ്റുള്ളവർ കാണും.'],
  ]),
  g('wa-send-photo', W, N, ['Send a photo on WhatsApp', 'WhatsApp पर फ़ोटो भेजें', 'WhatsApp-ൽ ഫോട്ടോ അയക്കാം'], ['whatsapp photo', 'send photo whatsapp', 'send picture whatsapp', 'फ़ोटो भेज', 'ഫോട്ടോ അയക്ക'], [
    ['Open the chat with the person.', 'उस व्यक्ति की चैट खोलिए।', 'ആ ആളുടെ ചാറ്റ് തുറക്കൂ.'],
    ['Tap the paper-clip icon next to the message box.', 'मैसेज बॉक्स के पास पेपर-क्लिप का निशान दबाइए।', 'മെസ്സേജ് ബോക്സിന് അടുത്തുള്ള പേപ്പർ ക്ലിപ്പ് ചിഹ്നം അമർത്തൂ.'],
    ['Tap "Gallery" and tap the photo. You can tap more than one.', '"Gallery" दबाकर फ़ोटो चुनिए। एक से ज़्यादा भी चुन सकते हैं।', '"Gallery" അമർത്തി ഫോട്ടോ തിരഞ്ഞെടുക്കൂ. ഒന്നിൽ കൂടുതലും ആകാം.'],
    ['Tap the green send arrow.', 'हरा भेजने वाला तीर दबाइए।', 'പച്ച അയക്കൽ അമ്പ് അമർത്തൂ.'],
  ]),
  g('wa-voice-message', W, N, ['Send a voice message', 'आवाज़ वाला संदेश भेजें', 'വോയ്സ് മെസ്സേജ് അയക്കാം'], ['voice message', 'voice note', 'record voice', 'audio message', 'आवाज़ संदेश', 'वॉइस मैसेज', 'വോയ്സ് മെസ്സേജ്'], [
    ['Open the chat with the person.', 'उस व्यक्ति की चैट खोलिए।', 'ആ ആളുടെ ചാറ്റ് തുറക്കൂ.'],
    ['Press and hold the microphone button on the right. Keep holding while you speak.', 'दाईं तरफ़ माइक का बटन दबाए रखिए। बोलते समय छोड़िए मत।', 'വലതുവശത്തെ മൈക്ക് ബട്ടൺ അമർത്തിപ്പിടിക്കൂ. സംസാരിക്കുമ്പോൾ വിടരുത്.'],
    ['Let go to send. To cancel, slide your finger to the left before letting go.', 'छोड़ते ही भेज दिया जाएगा। रद्द करना हो तो छोड़ने से पहले उंगली बाईं ओर सरकाइए।', 'വിട്ടാൽ അയക്കും. റദ്ദാക്കാൻ വിടുന്നതിന് മുമ്പ് വിരൽ ഇടത്തേക്ക് നീക്കൂ.'],
  ]),
  g('wa-delete-message', W, N, ['Delete a message you sent by mistake', 'गलती से भेजा संदेश हटाएं', 'തെറ്റി അയച്ച മെസ്സേജ് ഡിലീറ്റ് ചെയ്യാം'], ['delete message', 'unsend', 'wrong message', 'delete for everyone', 'मैसेज डिलीट', 'संदेश हटा', 'മെസ്സേജ് ഡിലീറ്റ്'], [
    ['Press and hold the message you sent.', 'जो संदेश भेजा है उसे दबाए रखिए।', 'അയച്ച മെസ്സേജ് അമർത്തിപ്പിടിക്കൂ.'],
    ['Tap the dustbin icon at the top.', 'ऊपर कूड़ेदान का निशान दबाइए।', 'മുകളിലെ ചവറ്റുകുട്ട ചിഹ്നം അമർത്തൂ.'],
    ['Tap "Delete for everyone". Do not choose "Delete for me", that only removes it on your phone.', '"Delete for everyone" दबाइए। "Delete for me" मत चुनिए, उससे सिर्फ़ आपके फ़ोन से हटता है।', '"Delete for everyone" അമർത്തൂ. "Delete for me" വേണ്ട, അത് നിങ്ങളുടെ ഫോണിൽ നിന്ന് മാത്രമേ മാറ്റൂ.'],
  ], ['This works only for a short time after sending, and the other person may already have seen it.', 'यह भेजने के कुछ देर बाद तक ही चलता है, और दूसरे ने शायद देख भी लिया हो।', 'അയച്ച് കുറച്ച് നേരത്തേക്ക് മാത്രമേ ഇത് നടക്കൂ, മറ്റേയാൾ ഒരുപക്ഷേ കണ്ടിട്ടുണ്ടാകാം.']),
  g('wa-profile-photo', W, N, ['Change your WhatsApp photo', 'WhatsApp की फ़ोटो बदलें', 'WhatsApp ഫോട്ടോ മാറ്റാം'], ['profile photo', 'dp', 'display picture', 'change photo whatsapp', 'प्रोफ़ाइल फ़ोटो', 'പ്രൊഫൈൽ ഫോട്ടോ'], [
    ['Open WhatsApp. Tap the three dots at the top right, then "Settings".', 'WhatsApp खोलिए। ऊपर दाईं तरफ़ तीन बिंदु, फिर "Settings" दबाइए।', 'WhatsApp തുറക്കൂ. മുകളിൽ വലത് മൂന്ന് കുത്തുകൾ, പിന്നെ "Settings" അമർത്തൂ.'],
    ['Tap your name or round photo at the top.', 'ऊपर अपना नाम या गोल फ़ोटो दबाइए।', 'മുകളിൽ നിങ്ങളുടെ പേരോ വട്ട ഫോട്ടോയോ അമർത്തൂ.'],
    ['Tap the small camera icon on the photo.', 'फ़ोटो पर छोटा कैमरा निशान दबाइए।', 'ഫോട്ടോയിലെ ചെറിയ ക്യാമറ ചിഹ്നം അമർത്തൂ.'],
    ['Choose "Gallery", pick a photo, and tap "Done".', '"Gallery" चुनिए, फ़ोटो चुनिए, और "Done" दबाइए।', '"Gallery" തിരഞ്ഞെടുത്ത് ഫോട്ടോ എടുത്ത് "Done" അമർത്തൂ.'],
  ]),
  g('wa-share-location', W, N, ['Send your location on WhatsApp', 'WhatsApp पर अपनी जगह भेजें', 'WhatsApp-ൽ ലൊക്കേഷൻ അയക്കാം'], ['send location', 'share location whatsapp', 'where am i', 'लोकेशन भेज', 'ലൊക്കേഷൻ അയക്ക'], [
    ['Open the chat with the person.', 'उस व्यक्ति की चैट खोलिए।', 'ആ ആളുടെ ചാറ്റ് തുറക്കൂ.'],
    ['Tap the paper-clip icon, then "Location".', 'पेपर-क्लिप का निशान दबाइए, फिर "Location"।', 'പേപ്പർ ക്ലിപ്പ് ചിഹ്നം അമർത്തി "Location" അമർത്തൂ.'],
    ['Tap "Send your current location".', '"Send your current location" दबाइए।', '"Send your current location" അമർത്തൂ.'],
  ], ['Share your location only with family you trust.', 'अपनी जगह सिर्फ़ भरोसे के परिवार को बताइए।', 'ലൊക്കേഷൻ വിശ്വസ്തരായ വീട്ടുകാർക്ക് മാത്രം പങ്കിടൂ.']),
  g('wa-mute-chat', W, N, ['Mute a noisy chat or group', 'शोर वाली चैट म्यूट करें', 'ശബ്ദമുള്ള ചാറ്റ് മ്യൂട്ട് ചെയ്യാം'], ['mute', 'mute group', 'too many messages', 'म्यूट', 'മ്യൂട്ട്'], [
    ['In the chat list, press and hold the chat.', 'चैट की लिस्ट में उस चैट को दबाए रखिए।', 'ചാറ്റ് ലിസ്റ്റിൽ ആ ചാറ്റ് അമർത്തിപ്പിടിക്കൂ.'],
    ['Tap the crossed speaker icon at the top.', 'ऊपर कटा हुआ स्पीकर निशान दबाइए।', 'മുകളിലെ വരയിട്ട സ്പീക്കർ ചിഹ്നം അമർത്തൂ.'],
    ['Choose "Always" or a time, then tap "OK".', '"Always" या कोई समय चुनिए, फिर "OK" दबाइए।', '"Always" അല്ലെങ്കിൽ ഒരു സമയം തിരഞ്ഞെടുത്ത് "OK" അമർത്തൂ.'],
  ]),
  g('wa-block-contact', W, N, ['Block someone on WhatsApp', 'WhatsApp पर किसी को ब्लॉक करें', 'WhatsApp-ൽ ഒരാളെ ബ്ലോക്ക് ചെയ്യാം'], ['block on whatsapp', 'block contact whatsapp', 'block unknown', 'spam whatsapp', 'ब्लॉक', 'ബ്ലോക്ക് whatsapp'], [
    ['Open the chat of the unknown person.', 'अनजान व्यक्ति की चैट खोलिए।', 'അപരിചിതന്റെ ചാറ്റ് തുറക്കൂ.'],
    ['Tap the three dots at the top right, then "More", then "Block".', 'ऊपर दाईं तरफ़ तीन बिंदु, फिर "More", फिर "Block" दबाइए।', 'മുകളിൽ വലത് മൂന്ന് കുത്തുകൾ, "More", പിന്നെ "Block" അമർത്തൂ.'],
    ['Tick "Report" too if it is a scam, then tap "Block".', 'ठगी हो तो "Report" पर भी सही लगाइए, फिर "Block" दबाइए।', 'തട്ടിപ്പാണെങ്കിൽ "Report" ടിക്ക് ചെയ്ത് "Block" അമർത്തൂ.'],
  ]),
  g('wa-backup', W, N, ['Back up your WhatsApp chats', 'WhatsApp चैट का बैकअप लें', 'WhatsApp ചാറ്റ് ബാക്കപ്പ് എടുക്കാം'], ['whatsapp backup', 'backup chats', 'save chats', 'new phone whatsapp', 'चैट बैकअप', 'ചാറ്റ് ബാക്കപ്പ്'], [
    ['Open WhatsApp. Tap the three dots, then "Settings".', 'WhatsApp खोलिए। तीन बिंदु, फिर "Settings" दबाइए।', 'WhatsApp തുറക്കൂ. മൂന്ന് കുത്തുകൾ, പിന്നെ "Settings" അമർത്തൂ.'],
    ['Tap "Chats", then "Chat backup".', '"Chats" दबाइए, फिर "Chat backup"।', '"Chats" അമർത്തി "Chat backup" അമർത്തൂ.'],
    ['Choose your Google account, then tap "Back up".', 'अपना Google खाता चुनिए, फिर "Back up" दबाइए।', 'നിങ്ങളുടെ Google അക്കൗണ്ട് തിരഞ്ഞെടുത്ത് "Back up" അമർത്തൂ.'],
    ['Do this before you change your phone.', 'फ़ोन बदलने से पहले यह ज़रूर कीजिए।', 'ഫോൺ മാറ്റുന്നതിന് മുമ്പ് ഇത് ചെയ്യൂ.'],
  ]),
  g('wa-reply', W, N, ['Reply to one particular message', 'किसी खास संदेश का जवाब दें', 'ഒരു പ്രത്യേക മെസ്സേജിന് മറുപടി നൽകാം'], ['reply to message', 'reply particular', 'quote message', 'जवाब दें', 'മറുപടി'], [
    ['Find the message in the chat.', 'चैट में वह संदेश ढूंढिए।', 'ചാറ്റിൽ ആ മെസ്സേജ് കണ്ടെത്തൂ.'],
    ['Swipe it from left to right with your finger.', 'उसे उंगली से बाएं से दाएं खींचिए।', 'വിരൽ കൊണ്ട് ഇടത്ത് നിന്ന് വലത്തോട്ട് വലിക്കൂ.'],
    ['Type your reply and tap send. Your reply shows with the old message above it.', 'जवाब लिखकर भेज दीजिए। पुराना संदेश आपके जवाब के ऊपर दिखेगा।', 'മറുപടി എഴുതി അയക്കൂ. പഴയ മെസ്സേജ് നിങ്ങളുടെ മറുപടിക്ക് മുകളിൽ കാണും.'],
  ]),
  g('wa-forward', W, N, ['Forward a message', 'संदेश आगे भेजें', 'മെസ്സേജ് ഫോർവേഡ് ചെയ്യാം'], ['forward', 'forward message', 'फ़ॉरवर्ड', 'आगे भेज', 'ഫോർവേഡ്'], [
    ['Press and hold the message.', 'संदेश को दबाए रखिए।', 'മെസ്സേജ് അമർത്തിപ്പിടിക്കൂ.'],
    ['Tap the arrow icon at the top (pointing right).', 'ऊपर दाईं ओर इशारा करता तीर दबाइए।', 'മുകളിൽ വലത്തോട്ടുള്ള അമ്പ് ചിഹ്നം അമർത്തൂ.'],
    ['Tap the people you want, then the green send arrow.', 'जिन्हें भेजना है उन्हें चुनिए, फिर हरा भेजने वाला तीर दबाइए।', 'അയക്കേണ്ടവരെ തിരഞ്ഞെടുത്ത് പച്ച അയക്കൽ അമ്പ് അമർത്തൂ.'],
  ], ['Do not forward messages you are not sure are true. Many forwards are false.', 'जिस संदेश के सच होने का भरोसा न हो उसे आगे मत भेजिए। कई फ़ॉरवर्ड झूठे होते हैं।', 'സത്യമാണെന്ന് ഉറപ്പില്ലാത്ത മെസ്സേജ് ഫോർവേഡ് ചെയ്യരുത്. പല ഫോർവേഡും തെറ്റാണ്.']),
  g('wa-send-document', W, N, ['Send a PDF or document', 'PDF या दस्तावेज़ भेजें', 'PDF അല്ലെങ്കിൽ രേഖ അയക്കാം'], ['send pdf', 'send document', 'send file', 'pdf भेज', 'दस्तावेज़ भेज', 'PDF അയക്ക'], [
    ['Open the chat with the person.', 'उस व्यक्ति की चैट खोलिए।', 'ആ ആളുടെ ചാറ്റ് തുറക്കൂ.'],
    ['Tap the paper-clip icon, then "Document".', 'पेपर-क्लिप का निशान दबाइए, फिर "Document"।', 'പേപ്പർ ക്ലിപ്പ് ചിഹ്നം അമർത്തി "Document" അമർത്തൂ.'],
    ['Tap "Browse other docs" and find the file. Tap it.', '"Browse other docs" दबाकर फ़ाइल ढूंढिए। उसे दबाइए।', '"Browse other docs" അമർത്തി ഫയൽ കണ്ടെത്തി അമർത്തൂ.'],
    ['Tap "Send".', '"Send" दबाइए।', '"Send" അമർത്തൂ.'],
  ]),
  g('wa-add-contact-chat', W, N, ['Start a chat with a new number', 'नए नंबर से चैट शुरू करें', 'പുതിയ നമ്പറുമായി ചാറ്റ് തുടങ്ങാം'], ['new number whatsapp', 'chat new contact', 'message unknown number', 'नए नंबर', 'പുതിയ നമ്പർ whatsapp'], [
    ['Save the number in your Contacts first.', 'पहले नंबर Contacts में सेव कीजिए।', 'ആദ്യം നമ്പർ Contacts-ൽ സേവ് ചെയ്യൂ.'],
    ['Open WhatsApp and tap the green chat button at the bottom right.', 'WhatsApp खोलकर नीचे दाईं तरफ़ हरा चैट बटन दबाइए।', 'WhatsApp തുറന്ന് താഴെ വലത് പച്ച ചാറ്റ് ബട്ടൺ അമർത്തൂ.'],
    ['Type the name in the search box and tap it. If it does not show, pull the list down to refresh.', 'सर्च बॉक्स में नाम लिखकर दबाइए। न दिखे तो लिस्ट को नीचे खींचकर रिफ़्रेश कीजिए।', 'സെർച്ച് ബോക്സിൽ പേര് എഴുതി അമർത്തൂ. കാണുന്നില്ലെങ്കിൽ ലിസ്റ്റ് താഴേക്ക് വലിച്ച് റിഫ്രഷ് ചെയ്യൂ.'],
  ]),
  g('wa-disappearing', W, N, ['Make messages vanish by themselves', 'संदेश अपने-आप मिटाएं', 'മെസ്സേജ് തനിയെ മായ്ക്കാം'], ['disappearing messages', 'auto delete', 'vanish', 'अपने आप मिट', 'തനിയെ മായ'], [
    ['Open the chat, then tap the person\'s name at the top.', 'चैट खोलिए, फिर ऊपर उस व्यक्ति का नाम दबाइए।', 'ചാറ്റ് തുറന്ന് മുകളിൽ ആ ആളുടെ പേര് അമർത്തൂ.'],
    ['Tap "Disappearing messages".', '"Disappearing messages" दबाइए।', '"Disappearing messages" അമർത്തൂ.'],
    ['Choose 24 hours, 7 days or 90 days.', '24 घंटे, 7 दिन या 90 दिन चुनिए।', '24 മണിക്കൂർ, 7 ദിവസം അല്ലെങ്കിൽ 90 ദിവസം തിരഞ്ഞെടുക്കൂ.'],
  ]),
];
