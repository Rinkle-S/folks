// Help questions and short answers, in English, Hindi and Malayalam. Shown at /help (all) and /help/print (printing only).
const t = (en, hi, ml) => ({ en, hi, ml });

export const HELP_TITLES = {
  about: t('About Folks', 'Folks के बारे में', 'Folks-നെ കുറിച്ച്'),
  safe: t('Safety and privacy', 'सुरक्षा और निजता', 'സുരക്ഷയും സ്വകാര്യതയും'),
  use: t('Using the lessons', 'पाठ इस्तेमाल करना', 'പാഠങ്ങൾ ഉപയോഗിക്കുന്നത്'),
  print: t('Printing and saving', 'प्रिंट करना और सेव करना', 'പ്രിന്റ് ചെയ്യുന്നതും സൂക്ഷിക്കുന്നതും'),
};

export const HELP = {
  about: [
    [t('What is Folks?', 'Folks क्या है?', 'എന്താണ് Folks?'),
      t('Folks helps you practise everyday phone tasks on a safe look-alike screen, with a voice to guide you. Then you do it on your own phone.', 'Folks आपको फ़ोन के रोज़ के काम एक सुरक्षित नकली स्क्रीन पर सीखने देता है, आवाज़ आपका साथ देती है। फिर आप वही अपने फ़ोन पर करते हैं।', 'ഒരു സുരക്ഷിത ഡമ്മി സ്ക്രീനിൽ ഫോണിലെ ദൈനംദിന കാര്യങ്ങൾ പരിശീലിക്കാൻ Folks സഹായിക്കുന്നു, ഒപ്പം വഴികാട്ടാൻ ഒരു ശബ്ദവും. എന്നിട്ട് നിങ്ങളുടെ സ്വന്തം ഫോണിൽ ചെയ്യാം.')],
    [t('Does it cost anything?', 'क्या इसमें पैसे लगते हैं?', 'ഇതിന് പണം ചെലവുണ്ടോ?'),
      t('No. Folks is free.', 'नहीं। Folks मुफ़्त है।', 'ഇല്ല. Folks സൗജന്യമാണ്.')],
    [t('How do I change the language?', 'भाषा कैसे बदलूँ?', 'ഭാഷ എങ്ങനെ മാറ്റാം?'),
      t('Tap the gear at the top right of the first screen, then choose English, Hindi or Malayalam.', 'पहली स्क्रीन पर ऊपर दाईं तरफ़ गियर दबाइए, फिर English, हिन्दी या मलयालम चुनिए।', 'ആദ്യ സ്ക്രീനിൽ മുകളിൽ വലത് ഗിയർ അമർത്തൂ, എന്നിട്ട് English, ഹിന്ദി അല്ലെങ്കിൽ മലയാളം തിരഞ്ഞെടുക്കൂ.')],
  ],
  safe: [
    [t('Can I break something by tapping?', 'क्या दबाने से कुछ बिगड़ सकता है?', 'അമർത്തിയാൽ എന്തെങ്കിലും കേടാകുമോ?'),
      t('No. The practice screen is not your phone. No money moves and nothing is sent.', 'नहीं। अभ्यास की स्क्रीन आपका फ़ोन नहीं है। कोई पैसा नहीं जाता और कुछ भेजा नहीं जाता।', 'ഇല്ല. പരിശീലന സ്ക്രീൻ നിങ്ങളുടെ ഫോണല്ല. പണം പോകില്ല, ഒന്നും അയയ്ക്കില്ല.')],
    [t('Do I type my real PIN?', 'क्या मैं अपना असली PIN डालूँ?', 'എന്റെ യഥാർത്ഥ PIN അടിക്കണോ?'),
      t('Never. Any four digits work in practice, and nothing you type is saved. Do not tell your real PIN or OTP to anyone.', 'कभी नहीं। अभ्यास में कोई भी चार अंक चलते हैं, और आप जो भी डालें वह सेव नहीं होता। अपना असली PIN या OTP किसी को न बताइए।', 'ഒരിക്കലും വേണ്ട. പരിശീലനത്തിൽ ഏത് നാല് അക്കവും മതി, നിങ്ങൾ അടിക്കുന്നത് സൂക്ഷിക്കില്ല. യഥാർത്ഥ PIN-ഓ OTP-യോ ആരോടും പറയരുത്.')],
    [t('What does Folks keep about me?', 'Folks मेरे बारे में क्या रखता है?', 'Folks എന്നെ കുറിച്ച് എന്താണ് സൂക്ഷിക്കുന്നത്?'),
      t('Your name and answers stay on this phone. Folks only counts which lessons are used. It never asks for your PIN, OTP or bank details.', 'आपका नाम और जवाब इसी फ़ोन में रहते हैं। Folks सिर्फ़ गिनता है कि कौन से पाठ इस्तेमाल हुए। यह आपका PIN, OTP या बैंक की जानकारी कभी नहीं माँगता।', 'നിങ്ങളുടെ പേരും ഉത്തരങ്ങളും ഈ ഫോണിൽ തന്നെ നിൽക്കും. ഏത് പാഠങ്ങൾ ഉപയോഗിച്ചു എന്ന് മാത്രമേ Folks എണ്ണുകയുള്ളൂ. PIN, OTP, ബാങ്ക് വിവരങ്ങൾ ഒരിക്കലും ചോദിക്കില്ല.')],
    [t('I got a message that worries me.', 'मुझे एक संदेश मिला जो मुझे ठीक नहीं लगा।', 'എനിക്ക് ഒരു സന്ദേശം കിട്ടി, എനിക്ക് ആശങ്ക തോന്നുന്നു.'),
      t('Do not tap the link or share any OTP. Call 1930 or report at cybercrime.gov.in. The "Stay safe" tab has practice messages.', 'लिंक न दबाइए और कोई OTP न दीजिए। 1930 पर कॉल कीजिए या cybercrime.gov.in पर शिकायत कीजिए। "सुरक्षा" टैब में अभ्यास के संदेश हैं।', 'ലിങ്ക് അമർത്തരുത്, OTP പറയരുത്. 1930 വിളിക്കൂ, അല്ലെങ്കിൽ cybercrime.gov.in-ൽ പരാതി നൽകൂ. "സുരക്ഷ" ടാബിൽ പരിശീലന സന്ദേശങ്ങളുണ്ട്.')],
  ],
  use: [
    [t('I tapped the wrong thing.', 'मैंने गलत जगह दबा दिया।', 'ഞാൻ തെറ്റായ സ്ഥലത്ത് അമർത്തി.'),
      t('That is fine. Folks gives a gentle hint. Tap "Help" if you want to be shown.', 'कोई बात नहीं। Folks हल्का सा संकेत देता है। दिखवाना हो तो "मदद" दबाइए।', 'കുഴപ്പമില്ല. Folks ഒരു ചെറിയ സൂചന തരും. കാണിച്ചു തരണമെങ്കിൽ "സഹായം" അമർത്തൂ.')],
    [t('I cannot find my lesson.', 'मुझे अपना पाठ नहीं मिल रहा।', 'എന്റെ പാഠം കണ്ടെത്താൻ പറ്റുന്നില്ല.'),
      t('Type or say what you want on the first screen. If it is not there, tap "Ask someone to make this lesson".', 'पहली स्क्रीन पर लिखिए या बोलिए कि आप क्या सीखना चाहते हैं। न मिले तो "किसी से यह पाठ बनवाएं" दबाइए।', 'ആദ്യ സ്ക്രീനിൽ ആവശ്യം ടൈപ്പ് ചെയ്യൂ അല്ലെങ്കിൽ പറയൂ. ഇല്ലെങ്കിൽ "ഈ പാഠം ഉണ്ടാക്കാൻ ഒരാളോട് പറയൂ" അമർത്തൂ.')],
    [t('I would rather read than listen.', 'मैं सुनने से ज़्यादा पढ़ना चाहती/चाहता हूँ।', 'കേൾക്കുന്നതിനേക്കാൾ എനിക്ക് വായിക്കാനാണ് ഇഷ്ടം.'),
      t('Every step is written on the screen. Choose "Read the steps" at the start of a lesson.', 'हर कदम स्क्रीन पर लिखा होता है। पाठ की शुरुआत में "कदम पढ़ें" चुनिए।', 'ഓരോ ഘട്ടവും സ്ക്രീനിൽ എഴുതിയിട്ടുണ്ട്. പാഠത്തിന്റെ തുടക്കത്തിൽ "ഘട്ടങ്ങൾ വായിക്കാം" തിരഞ്ഞെടുക്കൂ.')],
    [t('What do I do after practising?', 'अभ्यास के बाद क्या करूँ?', 'പരിശീലനത്തിന് ശേഷം എന്ത് ചെയ്യണം?'),
      t('Open the real app and do the same steps slowly. Ask someone in the family to sit next to you the first time.', 'असली ऐप खोलिए और वही कदम धीरे-धीरे दोहराइए। पहली बार परिवार के किसी को पास बिठा लीजिए।', 'യഥാർത്ഥ ആപ്പ് തുറന്ന് അതേ ഘട്ടങ്ങൾ സാവധാനം ചെയ്യൂ. ആദ്യ തവണ വീട്ടിലെ ആരെങ്കിലും അടുത്തിരിക്കട്ടെ.')],
  ],
  print: [
    [t('How do I print this?', 'इसे प्रिंट कैसे करूँ?', 'ഇത് എങ്ങനെ പ്രിന്റ് ചെയ്യാം?'),
      t('Tap "Print or save", then "Print on paper". On the next screen pick your printer and tap the print button. If the top says "Save as PDF", tap it and choose your printer.', '"प्रिंट या सेव करें" दबाइए, फिर "काग़ज़ पर प्रिंट करें"। अगली स्क्रीन पर अपना प्रिंटर चुनिए और प्रिंट का बटन दबाइए। ऊपर "Save as PDF" लिखा हो तो उसे दबाकर अपना प्रिंटर चुनिए।', '"പ്രിന്റ് / സേവ്" അമർത്തൂ, എന്നിട്ട് "പേപ്പറിൽ പ്രിന്റ് ചെയ്യൂ". അടുത്ത സ്ക്രീനിൽ നിങ്ങളുടെ പ്രിന്റർ തിരഞ്ഞെടുത്ത് പ്രിന്റ് ബട്ടൺ അമർത്തൂ. മുകളിൽ "Save as PDF" എന്ന് കണ്ടാൽ അത് അമർത്തി പ്രിന്റർ തിരഞ്ഞെടുക്കൂ.')],
    [t('How do I keep a copy on my phone?', 'फ़ोन में एक कॉपी कैसे रखूँ?', 'ഫോണിൽ ഒരു കോപ്പി എങ്ങനെ സൂക്ഷിക്കാം?'),
      t('Tap "Print or save", then "Save as PDF on my phone". On the next screen choose "Save as PDF" and tap the round PDF button. The file goes to your Downloads.', '"प्रिंट या सेव करें" दबाइए, फिर "फ़ोन में PDF सेव करें"। अगली स्क्रीन पर "Save as PDF" चुनिए और गोल PDF बटन दबाइए। फ़ाइल आपके Downloads में चली जाएगी।', '"പ്രിന്റ് / സേവ്" അമർത്തൂ, എന്നിട്ട് "ഫോണിൽ PDF ആയി സേവ് ചെയ്യൂ". അടുത്ത സ്ക്രീനിൽ "Save as PDF" തിരഞ്ഞെടുത്ത് വട്ടത്തിലുള്ള PDF ബട്ടൺ അമർത്തൂ. ഫയൽ നിങ്ങളുടെ Downloads-ൽ എത്തും.')],
    [t('I do not have a printer.', 'मेरे पास प्रिंटर नहीं है।', 'എനിക്ക് പ്രിന്റർ ഇല്ല.'),
      t('Tap "Print or save", then "Send to family on WhatsApp". They can print it for you.', '"प्रिंट या सेव करें" दबाइए, फिर "परिवार को WhatsApp करें"। वे आपके लिए छपवा देंगे।', '"പ്രിന്റ് / സേവ്" അമർത്തൂ, എന്നിട്ട് "വീട്ടുകാർക്ക് WhatsApp ചെയ്യൂ". അവർ നിങ്ങൾക്ക് പ്രിന്റ് ചെയ്തു തരും.')],
    [t('Where is the print button?', 'प्रिंट का बटन कहाँ है?', 'പ്രിന്റ് ബട്ടൺ എവിടെയാണ്?'),
      t('Near the top of every guide, lesson, app page and topic page, just under the title.', 'हर गाइड, पाठ, ऐप के पेज और विषय के पेज पर, शीर्षक के ठीक नीचे, ऊपर की तरफ़।', 'ഓരോ ഗൈഡ്, പാഠം, ആപ്പ് പേജ്, വിഷയ പേജ് എന്നിവയുടെ മുകളിൽ, തലക്കെട്ടിന് തൊട്ടുതാഴെ.')],
    [t('What gets printed?', 'क्या छपता है?', 'എന്താണ് പ്രിന്റ് ആകുന്നത്?'),
      t('A guide or lesson prints its steps. An app prints all its guides. A topic prints all its lessons.', 'गाइड या पाठ अपने कदम छापता है। ऐप अपनी सारी गाइड छापता है। विषय अपने सारे पाठ छापता है।', 'ഒരു ഗൈഡോ പാഠമോ അതിന്റെ ഘട്ടങ്ങൾ പ്രിന്റ് ചെയ്യും. ഒരു ആപ്പ് അതിന്റെ എല്ലാ ഗൈഡുകളും, ഒരു വിഷയം അതിന്റെ എല്ലാ പാഠങ്ങളും.')],
  ],
};
