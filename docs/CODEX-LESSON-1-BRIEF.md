# Brief for Codex: rebuild lesson 1 "Pay at a shop" (`qr-pay`) and its player behaviour

Owner: Rinkle. Read `CLAUDE.md` and `docs/SESSION-HANDOFF.md` first. This brief is the single source of truth for the wording below. **Do not reword anything.** Where Hindi (hi) and Malayalam (ml) are given, use them exactly; they were drafted by Claude and need a native read later.

## 0. Rules that must still hold
- Sarvam stays off; do not test audio. No API keys. No em dashes in app text. English is the default.
- Big text (18px and up), tap areas at least 56px high, calm colours, one clear action per screen. No flashing.
- `npm run build` and `npm run check:ml` must pass before every push. Push small commits to `main`.
- Every screen fully in the chosen language. Malayalam text is keyed by the exact English string in `lib/mlContent1.js` and `lib/mlContent2.js`. If you change an English string, change its key too. Hindi is written inline in the lesson data (`{ en, hi }`).
- Never accept a real PIN (any digits are accepted, nothing typed is stored). Kind wording: say "debited" and "scammer", never blame the user.
- Do not change other lessons, except shared steps (see section 2).

## 1. What to build (behaviour changes)

### 1.1 Scene screen (new), first screen of every Practise and Watch lesson
- Shown before the "How do you want to learn?" screen. Skipped for "Read the steps" (real-phone mode) and skipped when the lesson has no `scene` field (other lessons keep today's intro for now).
- Lesson data: add `scene: { say: {en,hi,ml} }` to `qr-pay`. Text is in section 3.
- Layout: PRACTICE banner, a large emoji (shop and vegetables), a heading "Let's pretend" (hi/ml in section 4), the scene text as three short paragraphs, one big primary button **Ready**, and a small "Listen again" link.
- The scene text is spoken as soon as the screen opens. **Ready works immediately**: tapping it stops the voice and goes on. Not numbered; step counter still starts at "Step 1 of 12" on the phone home screen.
- Remove the old "this is practice" card (`components/PracticeIntro.js` and where `Player.js` shows it), its Settings row (`practiceNoteRow`), the "What is practice?" row (`practiceWhat`/`practiceShow`) and the `folks_practice_note` logic in `lib/client.js`. Keep the orange PRACTICE banner and the faint watermark on every practice screen, and the yellow PIN note. Update the FAQ line in `lib/help.js` that mentions the reminder card.
- Mode choice: if the person has a saved default mode, the scene still comes first, then that mode starts.
- No step voice may start before Ready (the current code already waits on the practice card; reuse that gate for the scene).

### 1.2 Quiz behaviour (all quizzes, `Player.js` `pickOption`, around line 459 and the options render near line 787)
- A wrong pick is shown in soft red with a cross (`✕`). The correct answer is shown in green with a tick (`✓`). The reason text is shown under the answers. A **Next** button appears. The person is not forced to pick again.
- A right pick shows green, the reason, and Next (as today).

### 1.3 Pointing hand placement (steps 1 and 6 especially)
- The hand must never cover the label or icon it points to. Place it at the lower right of the glowing target with the fingertip touching the target's edge. For small targets (the round arrow) place it just below. If it would leave the screen on the right, flip to the left of the target. See the `bubble`/hand placement code in `Player.js` (the `place` function around line 266).

### 1.4 Shop-board strip (step 4 only)
- Above the question, inside the practice screen at the top (under the banner), show a bordered strip: **"Shop board: SUNRISE GENERAL STORE"** with a small shop icon. Only on the `check-name` step. hi/ml in section 4.

### 1.5 Safety check (steps 11 and 12, the pretend scam call)
- Replace the orange PRACTICE banner on these two steps with a soft teal banner: **"SAFETY CHECK: a pretend call"** (white text on teal `#2b7f72`). No red, no warning triangle.
- Step 11 only: at the top of the question card show a heading with a teal shield icon: **"Let's do a quick safety check."** and, smaller, **"This call is pretend."** Speak this sentence before the question: "Let's do a quick safety check. This call is pretend."
- Step 12 keeps the teal banner, no heading.
- The word "scam" must not appear on screen in these two steps.

### 1.6 Success step (10)
- Teach only **Done** (no "Share screenshot" in this lesson). The lesson stays at 12 numbered steps.

## 2. Shared code warning
`qr-pay` shares code with other Google Pay lessons: `gpayPaySteps()` (steps amount, arrow, choose-account, pin, pin-ok, success) and `scamCollect` (scam-quiz, decline) in `lib/lessons.js`. The new wording for arrow, Pay, PIN, tick, scam question and Decline is **meant to apply to all of them** (it will be reviewed lesson by lesson after this). Keep the amount line and the success line lesson-specific (`amount` and `doneSay` parameters). Do not change other lessons' own steps.

## 3. Script (English with hi and ml)
"Same" means: keep the current text, hi and ml.

### Scene (new)
- en: Let's pretend you are at a vegetable shop. The shopkeeper says: 50 rupees, please. We learn how you can pay it with Google Pay, by scanning the shop's QR code.
  This is a practice phone. The money is pretend, and nothing real is spent. Take your time.
- hi: मान लीजिए आप सब्ज़ी की दुकान पर हैं। दुकानदार कहता है: 50 रुपये दीजिए। हम सीखेंगे कि Google Pay से, दुकान का QR कोड स्कैन करके, यह पैसे कैसे देते हैं।
  यह एक अभ्यास फ़ोन है। पैसे नकली हैं, और असली कुछ खर्च नहीं होता। आराम से कीजिए।
- ml: നിങ്ങൾ ഒരു പച്ചക്കറിക്കടയിലാണെന്ന് സങ്കൽപ്പിക്കൂ. കടക്കാരൻ പറയുന്നു: 50 രൂപ തരൂ. Google Pay ഉപയോഗിച്ച്, കടയിലെ QR കോഡ് സ്കാൻ ചെയ്ത് ഇത് എങ്ങനെ അടയ്ക്കാമെന്ന് നമ്മൾ പഠിക്കും.
  ഇത് ഒരു പരിശീലന ഫോൺ ആണ്. പണം സാങ്കൽപ്പികമാണ്, യഥാർത്ഥത്തിൽ ഒന്നും ചെലവാകില്ല. സാവധാനം ചെയ്യൂ.

### Step 1 `open-app` (phone home)
- voice en: Find the Google Pay icon. It is white, with a coloured G. Tap it.
- voice hi: Google Pay का निशान ढूंढिए। वह सफ़ेद है और उस पर रंगीन G बना है। उसे दबाइए।
- voice ml: Google Pay അടയാളം കണ്ടെത്തൂ. അത് വെള്ള നിറമാണ്, അതിൽ നിറമുള്ള G ഉണ്ട്. അത് അമർത്തൂ.
- hint en: Can't see it? Slide your finger up from the bottom of the screen to see all the apps that you have.
- hint hi: दिख नहीं रहा? स्क्रीन के नीचे से उंगली ऊपर सरकाइए, आपके सारे ऐप दिख जाएँगे।
- hint ml: കാണുന്നില്ലേ? സ്ക്രീനിന്റെ താഴെ നിന്ന് വിരൽ മുകളിലേക്ക് നീക്കൂ, നിങ്ങളുടെ എല്ലാ ആപ്പുകളും കാണാം.
- Note: this step is shared by every Google Pay lesson (apply to all).

### Step 2 `open-scan` (Google Pay home)
- voice en: This is Google Pay. To pay at the shop, tap 'Scan any QR code', the first button, with the square scanner icon.
- voice hi: यह Google Pay है। दुकान पर पैसे देने के लिए 'Scan any QR code' दबाइए, पहला बटन, चौकोर स्कैनर के निशान वाला।
- voice ml: ഇതാണ് Google Pay. കടയിൽ പണം അടയ്ക്കാൻ 'Scan any QR code' അമർത്തൂ, ചതുരത്തിലുള്ള സ്കാനർ ചിഹ്നമുള്ള ആദ്യത്തെ ബട്ടൺ.
- hint en: Tap the glowing button at the top left.
- hint hi: ऊपर बाईं तरफ़ चमकता हुआ बटन दबाइए।
- hint ml: മുകളിൽ ഇടതുവശത്തുള്ള തിളങ്ങുന്ന ബട്ടൺ അമർത്തൂ.

### Step 3 `scan-qr` (scanner)
- voice en: The camera opens. In real life you hold your phone still, and it scans the shop's QR code by itself. For practice, tap the QR code on the screen.
- voice hi: कैमरा खुल गया। असल में आप फ़ोन को स्थिर पकड़ते हैं और वह दुकान का QR कोड अपने-आप स्कैन कर लेता है। अभ्यास के लिए, स्क्रीन पर QR कोड दबाइए।
- voice ml: ക്യാമറ തുറന്നു. യഥാർത്ഥത്തിൽ നിങ്ങൾ ഫോൺ അനക്കാതെ പിടിക്കും, അത് കടയിലെ QR കോഡ് സ്വയം സ്കാൻ ചെയ്യും. പരിശീലനത്തിനായി സ്ക്രീനിലെ QR കോഡ് അമർത്തൂ.
- hint: same ("Tap the black-and-white square code in the middle.")

### Step 4 `check-name` (question, with the shop-board strip)
- strip en: Shop board: SUNRISE GENERAL STORE
- strip hi: दुकान का बोर्ड: SUNRISE GENERAL STORE
- strip ml: കടയുടെ ബോർഡ്: SUNRISE GENERAL STORE
- voice en: Wait! Look at the name before you pay. The shop board says 'Sunrise General Store'. Does the name on your Google Pay screen match?
- voice hi: रुकिए! पैसे देने से पहले नाम देखिए। दुकान के बोर्ड पर 'सनराइज़ जनरल स्टोर' लिखा है। क्या आपकी Google Pay स्क्रीन पर वही नाम है?
- voice ml: നിൽക്കൂ! പണം അടയ്ക്കുന്നതിന് മുമ്പ് പേര് നോക്കൂ. കടയുടെ ബോർഡിൽ 'Sunrise General Store' എന്നാണ് എഴുതിയിരിക്കുന്നത്. നിങ്ങളുടെ Google Pay സ്ക്രീനിലെ പേര് അതുതന്നെയാണോ?
- answer 1 (correct) en: Yes, the name matches | hi: हाँ, नाम वही है | ml: അതെ, പേര് ഒന്നുതന്നെ
  - reason en: Good. If the name is ever different, ask the shopkeeper before you pay.
  - reason hi: बहुत अच्छे। कभी नाम अलग दिखे, तो पैसे देने से पहले दुकानदार से पूछिए।
  - reason ml: നല്ലത്. പേര് എപ്പോഴെങ്കിലും വ്യത്യസ്തമായാൽ, പണം അടയ്ക്കുന്നതിന് മുമ്പ് കടക്കാരനോട് ചോദിക്കൂ.
- answer 2 (wrong) en: I don't need to check | hi: मुझे देखने की ज़रूरत नहीं | ml: എനിക്ക് നോക്കേണ്ട ആവശ്യമില്ല
  - reason en: It is worth a quick look. If the QR is wrong, the money goes to someone else.
  - reason hi: एक बार देख लेना अच्छा है। QR गलत हो, तो पैसे किसी और के पास चले जाते हैं।
  - reason ml: ഒന്ന് നോക്കുന്നത് നല്ലതാണ്. QR തെറ്റാണെങ്കിൽ പണം മറ്റൊരാൾക്ക് പോകും.

### Step 5 `amount` (lesson-specific)
- voice en: Type the amount the shopkeeper asked for: 50 rupees. Press 5, then 0.
- voice hi: दुकानदार ने जितने माँगे हैं वह रकम लिखिए: 50 रुपये। पहले 5, फिर 0 दबाइए।
- voice ml: കടക്കാരൻ ചോദിച്ച തുക ടൈപ്പ് ചെയ്യൂ: 50 രൂപ. 5, പിന്നെ 0 അമർത്തൂ.
- hint en: Press the glowing number.
- hint hi: चमकता हुआ नंबर दबाइए।
- hint ml: തിളങ്ങുന്ന നമ്പർ അമർത്തൂ.

### Step 6 `arrow`
- voice en: 50 rupees is entered. Now tap the round blue arrow.
- voice hi: 50 रुपये लिख दिए। अब गोल नीला तीर दबाइए।
- voice ml: 50 രൂപ ടൈപ്പ് ചെയ്തു. ഇനി വൃത്താകൃതിയിലുള്ള നീല അമ്പ് അമർത്തൂ.
- hint: same. The hand must not cover the arrow (section 1.3).

### Step 7 `choose-account`
- voice en: Your money will be debited from your bank. Tap the blue 'Pay ₹50' button.
- voice hi: आपके बैंक से पैसे कट जाएँगे। नीला 'Pay ₹50' बटन दबाइए।
- voice ml: നിങ്ങളുടെ ബാങ്കിൽ നിന്ന് പണം കുറയും. നീല 'Pay ₹50' ബട്ടൺ അമർത്തൂ.
- hint: same.

### Step 8 `pin`
- voice en: Now type any 4 numbers. This is practice, so never type your real PIN here. At a real shop, type in your actual PIN.
- voice hi: अब कोई भी 4 नंबर डालिए। यह अभ्यास है, इसलिए यहाँ अपना असली PIN कभी न डालिए। असली दुकान पर अपना असली PIN डालिए।
- voice ml: ഇനി ഏതെങ്കിലും 4 നമ്പർ ടൈപ്പ് ചെയ്യൂ. ഇത് പരിശീലനമാണ്, അതിനാൽ ഇവിടെ നിങ്ങളുടെ യഥാർത്ഥ PIN ഒരിക്കലും ടൈപ്പ് ചെയ്യരുത്. യഥാർത്ഥ കടയിൽ നിങ്ങളുടെ യഥാർത്ഥ PIN അടിക്കൂ.
- hint: same.

### Step 9 `pin-ok`
- voice: same ("Now press the tick at the bottom right to confirm.")
- hint en: It is the blue tick at the bottom right.
- hint hi: यह नीचे दाईं तरफ़ का नीला सही का निशान है।
- hint ml: ഇത് താഴെ വലതുവശത്തുള്ള നീല ശരി ചിഹ്നമാണ്.

### Step 10 `success` (lesson-specific `doneSay`, target is `done`)
- voice en: Done! 50 rupees went to Sunrise General Store. Show this screen to the shopkeeper. Then tap 'Done'.
- voice hi: हो गया! 50 रुपये सनराइज़ जनरल स्टोर को चले गए। यह स्क्रीन दुकानदार को दिखाइए। फिर 'Done' दबाइए।
- voice ml: കഴിഞ്ഞു! 50 രൂപ Sunrise General Store-ന് പോയി. ഈ സ്ക്രീൻ കടക്കാരനെ കാണിക്കൂ. പിന്നെ 'Done' അമർത്തൂ.
- hint: same ("Tap 'Done' at the bottom.")

### Step 11 `scam-quiz` (Safety check, section 1.5)
- banner en: SAFETY CHECK: a pretend call | hi: सुरक्षा जाँच: एक नकली कॉल | ml: സുരക്ഷാ പരിശോധന: ഒരു സാങ്കൽപ്പിക കോൾ
- heading en: Let's do a quick safety check. | hi: चलिए, सुरक्षा की एक छोटी जाँच करें। | ml: നമുക്ക് സുരക്ഷയുടെ ഒരു ചെറിയ പരിശോധന നടത്താം.
- sub-heading en: This call is pretend. | hi: यह कॉल नकली है। | ml: ഈ കോൾ സാങ്കൽപ്പികമാണ്.
- spoken before the question en: Let's do a quick safety check. This call is pretend. | hi: चलिए, सुरक्षा की एक छोटी जाँच करें। यह कॉल नकली है। | ml: നമുക്ക് സുരക്ഷയുടെ ഒരു ചെറിയ പരിശോധന നടത്താം. ഈ കോൾ സാങ്കൽപ്പികമാണ്.
- voice en: One more thing. Someone phones and says: 'I am sending you 5,000 rupees. Just enter your PIN.' Then this request appears. Should you enter your PIN?
- voice hi: एक बात और। कोई फ़ोन करके कहता है: 'मैं आपको 5,000 रुपये भेज रहा हूँ। बस अपना PIN डाल दीजिए।' फिर यह request आती है। क्या आपको PIN डालना चाहिए?
- voice ml: ഒരു കാര്യം കൂടി. ആരോ ഫോണിൽ വിളിച്ച് പറയുന്നു: 'ഞാൻ നിങ്ങൾക്ക് 5,000 രൂപ അയയ്ക്കുന്നു. നിങ്ങളുടെ PIN അടിച്ചാൽ മതി.' അപ്പോൾ ഈ request വരുന്നു. നിങ്ങൾ PIN അടിക്കണോ?
- answers: unchanged ("Yes, I'll get the money" / "No, a PIN is only for paying").
- wrong answer reason en: Not this time. You never need a PIN to receive money. If you enter it, money leaves your account.
- wrong answer reason hi: इस बार नहीं। पैसे लेने के लिए PIN कभी नहीं लगता। PIN डाला, तो आपके खाते से पैसे कट जाएँगे।
- wrong answer reason ml: ഇത്തവണ അല്ല. പണം സ്വീകരിക്കാൻ PIN ഒരിക്കലും വേണ്ട. PIN അടിച്ചാൽ നിങ്ങളുടെ അക്കൗണ്ടിൽ നിന്ന് പണം പോകും.
- right answer reason: unchanged ("Well done! You never need a PIN to receive money.")

### Step 12 `decline` (Safety check banner, no heading)
- voice en: Now say no to this request. Tap 'Decline'.
- voice hi: अब इस request को मना कीजिए। 'Decline' दबाइए।
- voice ml: ഇനി ഈ request വേണ്ടെന്ന് പറയൂ. 'Decline' അമർത്തൂ.
- hint en: Tap 'Decline' on the left. It means no.
- hint hi: बाईं तरफ़ 'Decline' दबाइए। इसका मतलब है नहीं।
- hint ml: ഇടതുവശത്തുള്ള 'Decline' അമർത്തൂ. അതിന്റെ അർത്ഥം വേണ്ട എന്നാണ്.

### End of lesson
- closing en: Well done! That was a practice. At a real shop it looks the same, but the money is real. Take your time and check the name.
- closing hi: शाबाश! यह अभ्यास था। असली दुकान पर यह ऐसा ही दिखता है, पर पैसे असली होते हैं। आराम से कीजिए और नाम जाँच लीजिए।
- closing ml: നന്നായി! ഇത് പരിശീലനമായിരുന്നു. യഥാർത്ഥ കടയിൽ ഇത് ഇതുപോലെ തന്നെ കാണും, പക്ഷേ പണം യഥാർത്ഥമാണ്. സാവധാനം ചെയ്ത് പേര് പരിശോധിക്കൂ.
- takeaways en: Tap 'Scan any QR code' first. | Check the shop's name. If it is different, ask the shopkeeper. | A PIN is only for paying, never for receiving.
- takeaways hi: सबसे पहले 'Scan any QR code' दबाइए। | दुकान का नाम जाँचिए। अलग हो, तो दुकानदार से पूछिए। | PIN सिर्फ़ पैसे देने के लिए है, लेने के लिए कभी नहीं।
- takeaways ml: ആദ്യം 'Scan any QR code' അമർത്തൂ. | കടയുടെ പേര് പരിശോധിക്കൂ. വ്യത്യസ്തമാണെങ്കിൽ കടക്കാരനോട് ചോദിക്കൂ. | PIN പണം അടയ്ക്കാൻ മാത്രമാണ്, സ്വീകരിക്കാൻ ഒരിക്കലും അല്ല.
- realTry en: Next time at a shop, try the same steps on your real Google Pay. Start with a small amount. Stuck? Open Nook again.
- realTry hi: अगली बार दुकान पर अपने असली Google Pay में यही कदम आज़माइए। छोटी रकम से शुरू कीजिए। अटक जाएँ, तो Nook फिर खोलिए।
- realTry ml: അടുത്ത തവണ കടയിൽ നിങ്ങളുടെ യഥാർത്ഥ Google Pay-ൽ ഇതേ ഘട്ടങ്ങൾ ചെയ്തുനോക്കൂ. ചെറിയ തുകയിൽ തുടങ്ങൂ. കുടുങ്ങിയാൽ Nook വീണ്ടും തുറക്കൂ.

## 4. New interface strings (add to `lib/i18n.js` hi and en, and `lib/i18nMl.js`)
| key | en | hi | ml |
|---|---|---|---|
| sceneHeading | Let's pretend | मान लीजिए | സങ്കൽപ്പിക്കൂ |
| sceneReady | Ready | तैयार | തയ്യാർ |
| safetyBanner | SAFETY CHECK: a pretend call | सुरक्षा जाँच: एक नकली कॉल | സുരക്ഷാ പരിശോധന: ഒരു സാങ്കൽപ്പിക കോൾ |
| safetyHeading | Let's do a quick safety check. | चलिए, सुरक्षा की एक छोटी जाँच करें। | നമുക്ക് സുരക്ഷയുടെ ഒരു ചെറിയ പരിശോധന നടത്താം. |
| safetySub | This call is pretend. | यह कॉल नकली है। | ഈ കോൾ സാങ്കൽപ്പികമാണ്. |
| shopBoard | Shop board: SUNRISE GENERAL STORE | दुकान का बोर्ड: SUNRISE GENERAL STORE | കടയുടെ ബോർഡ്: SUNRISE GENERAL STORE |

"Listen again" and "Next" already exist; reuse them.

## 5. Small wording fixes I applied to the owner's text (veto if you disagree)
- Step 1 hint: "...to see all apps. that you have." became "...to see all the apps that you have."
- Step 12 hint: "...on the left, It means no." became "...on the left. It means no."
- Step 12 voice: the owner wrote "Now say no to this scam request." It is now "Now say no to this request." (no "scam" word, to match the gentler Safety check tag).
- Step 11 wrong answer: "No! You never need..." is now "Not this time. You never need..." (kind wording).
Everything else is exactly as the owner wrote it, including "That was a practice" in the closing.

## 6. Acceptance checks (do these before pushing)
1. `npm run build` and `npm run check:ml` pass.
2. Play `/lesson/qr-pay` start to end in English, Hindi and Malayalam, in Practise and in Watch. Check: scene first, Ready works at once, then mode choice, 12 numbered steps, the strip on step 4, Safety check banner and heading on step 11, banner on step 12, closing and takeaways.
3. Wrong pick on steps 4 and 11 shows red, the correct one green, the reason, and Next.
4. The hand never covers the label on step 1 or the arrow on step 6.
5. With a stubbed `speechSynthesis.speak`, confirm no step voice before Ready.
6. "Read the steps" mode shows no scene.
7. The other Google Pay lessons (`send-money`, `recharge`) still play start to finish with the shared steps.
8. Settings no longer shows the practice reminder rows, and the FAQ no longer mentions the reminder card.

## 7. Out of scope
New features, other lessons' own wording, Share screenshot, the fake QR sticker trap, Hindi or Malayalam fixes beyond what is listed here.
