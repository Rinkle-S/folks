// Reviewed QR lesson copy, applied after shared wording/PIN helpers. Other lessons keep their scripts.
const t = (en, hi, ml) => ({ en, hi, ml });

export function applyQrPractice(lessons) {
  for (const lesson of Object.values(lessons)) {
    if (lesson.app !== 'gpay') continue;
    const open = lesson.steps.find((s) => s.id === 'open-app');
    if (!open) continue;
    open.say = t('Find the Google Pay icon. It is white, with a coloured G. Tap it.', 'Google Pay का निशान ढूंढिए। वह सफ़ेद है और उस पर रंगीन G बना है। उसे दबाइए।', 'Google Pay അടയാളം കണ്ടെത്തൂ. അത് വെള്ള നിറമാണ്, അതിൽ നിറമുള്ള G ഉണ്ട്. അത് അമർത്തൂ.');
    open.hint = t("Can't see it? Slide your finger up from the bottom of the screen to see all the apps that you have.", 'दिख नहीं रहा? स्क्रीन के नीचे से उंगली ऊपर सरकाइए, आपके सारे ऐप दिख जाएँगे।', 'കാണുന്നില്ലേ? സ്ക്രീനിന്റെ താഴെ നിന്ന് വിരൽ മുകളിലേക്ക് നീക്കൂ, നിങ്ങളുടെ എല്ലാ ആപ്പുകളും കാണാം.');
  }
  const lesson = lessons['qr-pay'];
  lesson.scene = { say: t(
    "Let's pretend you are at a vegetable shop. The shopkeeper says: 50 rupees, please.\n\nWe learn how you can pay it with Google Pay, by scanning the shop's QR code.\n\nThis is a practice phone. The money is pretend, and nothing real is spent. Take your time.",
    'मान लीजिए आप सब्ज़ी की दुकान पर हैं। दुकानदार कहता है: 50 रुपये दीजिए।\n\nहम सीखेंगे कि Google Pay से, दुकान का QR कोड स्कैन करके, यह पैसे कैसे देते हैं।\n\nयह एक अभ्यास फ़ोन है। पैसे नकली हैं, और असली कुछ खर्च नहीं होता। आराम से कीजिए।',
    'നിങ്ങൾ ഒരു പച്ചക്കറിക്കടയിലാണെന്ന് സങ്കൽപ്പിക്കൂ. കടക്കാരൻ പറയുന്നു: 50 രൂപ തരൂ.\n\nGoogle Pay ഉപയോഗിച്ച്, കടയിലെ QR കോഡ് സ്കാൻ ചെയ്ത് ഇത് എങ്ങനെ അടയ്ക്കാമെന്ന് നമ്മൾ പഠിക്കും.\n\nഇത് ഒരു പരിശീലന ഫോൺ ആണ്. പണം സാങ്കൽപ്പികമാണ്, യഥാർത്ഥത്തിൽ ഒന്നും ചെലവാകില്ല. സാവധാനം ചെയ്യൂ.'
  ) };
  lesson.closing = t('Well done! That was a practice. At a real shop it looks the same, but the money is real. Take your time and check the name.', 'शाबाश! यह अभ्यास था। असली दुकान पर यह ऐसा ही दिखता है, पर पैसे असली होते हैं। आराम से कीजिए और नाम जाँच लीजिए।', 'നന്നായി! ഇത് പരിശീലനമായിരുന്നു. യഥാർത്ഥ കടയിൽ ഇത് ഇതുപോലെ തന്നെ കാണും, പക്ഷേ പണം യഥാർത്ഥമാണ്. സാവധാനം ചെയ്ത് പേര് പരിശോധിക്കൂ.');
  lesson.takeaways = t(
    ["Tap 'Scan any QR code' first.", "Check the shop's name. If it is different, ask the shopkeeper.", 'A PIN is only for paying, never for receiving.'],
    ["सबसे पहले 'Scan any QR code' दबाइए।", 'दुकान का नाम जाँचिए। अलग हो, तो दुकानदार से पूछिए।', 'PIN सिर्फ़ पैसे देने के लिए है, लेने के लिए कभी नहीं।'],
    ["ആദ്യം 'Scan any QR code' അമർത്തൂ.", 'കടയുടെ പേര് പരിശോധിക്കൂ. വ്യത്യസ്തമാണെങ്കിൽ കടക്കാരനോട് ചോദിക്കൂ.', 'PIN പണം അടയ്ക്കാൻ മാത്രമാണ്, സ്വീകരിക്കാൻ ഒരിക്കലും അല്ല.']
  );
  lesson.realTry = t('Next time at a shop, try the same steps on your real Google Pay. Start with a small amount. Stuck? Open Nook again.', 'अगली बार दुकान पर अपने असली Google Pay में यही कदम आज़माइए। छोटी रकम से शुरू कीजिए। अटक जाएँ, तो Nook फिर खोलिए।', 'അടുത്ത തവണ കടയിൽ നിങ്ങളുടെ യഥാർത്ഥ Google Pay-ൽ ഇതേ ഘട്ടങ്ങൾ ചെയ്തുനോക്കൂ. ചെറിയ തുകയിൽ തുടങ്ങൂ. കുടുങ്ങിയാൽ Nook വീണ്ടും തുറക്കൂ.');
  // The safety objects were shared with other payment lessons. Clone before changing QR-only copy.
  lesson.steps = lesson.steps.map((s) => ({ ...s, options: s.options?.map((o) => ({ ...o })) }));
  const step = (id) => lesson.steps.find((s) => s.id === id);
  step('open-scan').say = t("This is Google Pay. To pay at the shop, tap 'Scan any QR code', the first button, with the square scanner icon.", "यह Google Pay है। दुकान पर पैसे देने के लिए 'Scan any QR code' दबाइए, पहला बटन, चौकोर स्कैनर के निशान वाला।", "ഇതാണ് Google Pay. കടയിൽ പണം അടയ്ക്കാൻ 'Scan any QR code' അമർത്തൂ, ചതുരത്തിലുള്ള സ്കാനർ ചിഹ്നമുള്ള ആദ്യത്തെ ബട്ടൺ.");
  step('open-scan').hint = t('Tap the glowing button at the top left.', 'ऊपर बाईं तरफ़ चमकता हुआ बटन दबाइए।', 'മുകളിൽ ഇടതുവശത്തുള്ള തിളങ്ങുന്ന ബട്ടൺ അമർത്തൂ.');
  step('scan-qr').say = t("The camera opens. In real life you hold your phone still, and it scans the shop's QR code by itself. For practice, tap the QR code on the screen.", 'कैमरा खुल गया। असल में आप फ़ोन को स्थिर पकड़ते हैं और वह दुकान का QR कोड अपने-आप स्कैन कर लेता है। अभ्यास के लिए, स्क्रीन पर QR कोड दबाइए।', 'ക്യാമറ തുറന്നു. യഥാർത്ഥത്തിൽ നിങ്ങൾ ഫോൺ അനക്കാതെ പിടിക്കും, അത് കടയിലെ QR കോഡ് സ്വയം സ്കാൻ ചെയ്യും. പരിശീലനത്തിനായി സ്ക്രീനിലെ QR കോഡ് അമർത്തൂ.');
  step('check-name').say = t("Wait! Look at the name before you pay. The shop board says 'Sunrise General Store'. Does the name on your Google Pay screen match?", "रुकिए! पैसे देने से पहले नाम देखिए। दुकान के बोर्ड पर 'सनराइज़ जनरल स्टोर' लिखा है। क्या आपकी Google Pay स्क्रीन पर वही नाम है?", "നിൽക്കൂ! പണം അടയ്ക്കുന്നതിന് മുമ്പ് പേര് നോക്കൂ. കടയുടെ ബോർഡിൽ 'Sunrise General Store' എന്നാണ് എഴുതിയിരിക്കുന്നത്. നിങ്ങളുടെ Google Pay സ്ക്രീനിലെ പേര് അതുതന്നെയാണോ?");
  step('check-name').options = [
    { correct: true, text: t('Yes, the name matches', 'हाँ, नाम वही है', 'അതെ, പേര് ഒന്നുതന്നെ'), why: t('Good. If the name is ever different, ask the shopkeeper before you pay.', 'बहुत अच्छे। कभी नाम अलग दिखे, तो पैसे देने से पहले दुकानदार से पूछिए।', 'നല്ലത്. പേര് എപ്പോഴെങ്കിലും വ്യത്യസ്തമായാൽ, പണം അടയ്ക്കുന്നതിന് മുമ്പ് കടക്കാരനോട് ചോദിക്കൂ.') },
    { correct: false, text: t("I don't need to check", 'मुझे देखने की ज़रूरत नहीं', 'എനിക്ക് നോക്കേണ്ട ആവശ്യമില്ല'), why: t('It is worth a quick look. If the QR is wrong, the money goes to someone else.', 'एक बार देख लेना अच्छा है। QR गलत हो, तो पैसे किसी और के पास चले जाते हैं।', 'ഒന്ന് നോക്കുന്നത് നല്ലതാണ്. QR തെറ്റാണെങ്കിൽ പണം മറ്റൊരാൾക്ക് പോകും.') },
  ];
  step('amount').say = t('Type the amount the shopkeeper asked for: 50 rupees. Press 5, then 0.', 'दुकानदार ने जितने माँगे हैं वह रकम लिखिए: 50 रुपये। पहले 5, फिर 0 दबाइए।', 'കടക്കാരൻ ചോദിച്ച തുക ടൈപ്പ് ചെയ്യൂ: 50 രൂപ. 5, പിന്നെ 0 അമർത്തൂ.');
  step('amount').hint = t('Press the glowing number.', 'चमकता हुआ नंबर दबाइए।', 'തിളങ്ങുന്ന നമ്പർ അമർത്തൂ.');
  step('arrow').say = t('50 rupees is entered. Now tap the round blue arrow.', '50 रुपये लिख दिए। अब गोल नीला तीर दबाइए।', '50 രൂപ ടൈപ്പ് ചെയ്തു. ഇനി വൃത്താകൃതിയിലുള്ള നീല അമ്പ് അമർത്തൂ.');
  step('choose-account').say = t("Your money will be debited from your bank. Tap the blue 'Pay ₹50' button.", "आपके बैंक से पैसे कट जाएँगे। नीला 'Pay ₹50' बटन दबाइए।", "നിങ്ങളുടെ ബാങ്കിൽ നിന്ന് പണം കുറയും. നീല 'Pay ₹50' ബട്ടൺ അമർത്തൂ.");
  step('pin').say = t('Now type any 4 numbers. This is practice, so never type your real PIN here. At a real shop, type in your actual PIN.', 'अब कोई भी 4 नंबर डालिए। यह अभ्यास है, इसलिए यहाँ अपना असली PIN कभी न डालिए। असली दुकान पर अपना असली PIN डालिए।', 'ഇനി ഏതെങ്കിലും 4 നമ്പർ ടൈപ്പ് ചെയ്യൂ. ഇത് പരിശീലനമാണ്, അതിനാൽ ഇവിടെ നിങ്ങളുടെ യഥാർത്ഥ PIN ഒരിക്കലും ടൈപ്പ് ചെയ്യരുത്. യഥാർത്ഥ കടയിൽ നിങ്ങളുടെ യഥാർത്ഥ PIN അടിക്കൂ.');
  step('pin-ok').hint = t('It is the blue tick at the bottom right.', 'यह नीचे दाईं तरफ़ का नीला सही का निशान है।', 'ഇത് താഴെ വലതുവശത്തുള്ള നീല ശരി ചിഹ്നമാണ്.');
  step('success').say = t("Done! 50 rupees went to Sunrise General Store. Show this screen to the shopkeeper. Then tap 'Done'.", "हो गया! 50 रुपये सनराइज़ जनरल स्टोर को चले गए। यह स्क्रीन दुकानदार को दिखाइए। फिर 'Done' दबाइए।", "കഴിഞ്ഞു! 50 രൂപ Sunrise General Store-ന് പോയി. ഈ സ്ക്രീൻ കടക്കാരനെ കാണിക്കൂ. പിന്നെ 'Done' അമർത്തൂ.");
  step('scam-quiz').say = t("Someone phones and says: 'I am sending you 5,000 rupees. Just enter your PIN.' Then this request appears. Should you enter your PIN?", "कोई फ़ोन करके कहता है: 'मैं आपको 5,000 रुपये भेज रहा हूँ। बस अपना PIN डाल दीजिए।' फिर यह request आती है। क्या आपको PIN डालना चाहिए?", "ആരോ ഫോണിൽ വിളിച്ച് പറയുന്നു: 'ഞാൻ നിങ്ങൾക്ക് 5,000 രൂപ അയയ്ക്കുന്നു. നിങ്ങളുടെ PIN അടിച്ചാൽ മതി.' അപ്പോൾ ഈ request വരുന്നു. നിങ്ങൾ PIN അടിക്കണോ?");
  step('scam-quiz').options.find((o) => !o.correct).why = t('Not this time. You never need a PIN to receive money. If you enter it, money leaves your account.', 'इस बार नहीं। पैसे लेने के लिए PIN कभी नहीं लगता। PIN डाला, तो आपके खाते से पैसे कट जाएँगे।', 'ഇത്തവണ അല്ല. പണം സ്വീകരിക്കാൻ PIN ഒരിക്കലും വേണ്ട. PIN അടിച്ചാൽ നിങ്ങളുടെ അക്കൗണ്ടിൽ നിന്ന് പണം പോകും.');
  step('decline').say = t("Now say no to this request. Tap 'Decline'.", "अब इस request को मना कीजिए। 'Decline' दबाइए।", "ഇനി ഈ request വേണ്ടെന്ന് പറയൂ. 'Decline' അമർത്തൂ.");
  step('decline').hint = t("Tap 'Decline' on the left. It means no.", "बाईं तरफ़ 'Decline' दबाइए। इसका मतलब है नहीं।", "ഇടതുവശത്തുള്ള 'Decline' അമർത്തൂ. അതിന്റെ അർത്ഥം വേണ്ട എന്നാണ്.");
}
