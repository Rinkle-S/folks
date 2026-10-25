# Nook lesson scripts (exact text from the app)

Generated 2026-10-25 from `lib/lessons.js` and the guide data, for the 18 lessons that are live. Practice and Watch use the same words: Watch reads each "Voice" line by itself, Practice reads it when the step appears and reads the "Hint" only after the second wrong tap. English first, then Hindi and Malayalam. Names (Rahul, Sunita Didi...) change by language when the app runs (see `lib/persona.js`).

Kinds: **info** = the person taps Next/Start; **tap** = the person taps the glowing target; **input** = the person types digits; **quiz** = the person picks an answer.

## Contents

**Google Pay**
1. Pay at a shop by scanning a QR code (`qr-pay`, 12 steps)
2. Send money to someone you know (`send-money`, 15 steps)
3. Recharge your mobile (`recharge`, 9 steps)
4. Check your bank balance in Google Pay (`gd-gpay-balance`, 7 steps)

**WhatsApp**
5. Find an old file or photo on WhatsApp (`whatsapp-docs`, 8 steps)
6. Put a status on WhatsApp (`whatsapp-status`, 7 steps)
7. Make a video call on WhatsApp (`video-call`, 7 steps)

**Uber**
8. Book a cab with Uber (`uber-cab`, 11 steps)
9. Cancel a ride (`gd-uber-cancel`, 7 steps)
10. Check the driver and car before you get in (`gd-ride-driver-check`, 7 steps)
11. Pay for a ride and rate it (`gd-ride-pay-upi`, 7 steps)

**YONO SBI**
12. Check your balance on YONO SBI (`yono-balance`, 6 steps)

**Google Maps**
13. Find the way with Google Maps (`maps-directions`, 8 steps)
14. Use maps without internet (`gd-maps-offline`, 7 steps)

**Phone basics**
15. Turn on the flashlight (`flashlight`, 4 steps)
16. Make the words bigger (`bigger-text`, 5 steps)
17. Install an app from the Play Store (`gd-install-app`, 10 steps)
18. Learn what common icons mean (`gd-icon-meanings`, 13 steps)


---

# Google Pay

## 1. Pay at a shop by scanning a QR code
`qr-pay` · 3 min

- **English title:** Pay at a shop by scanning a QR code
- **Hindi title:** दुकान पर QR स्कैन करके पेमेंट करें
- **Malayalam title:** കടയിൽ QR സ്കാൻ ചെയ്ത് പണം അടയ്ക്കാം

**Takeaways at the end**
- English: Start with 'Scan any QR code' | Match the shop's name before you pay | A PIN is only for paying, never for receiving money
- Hindi: 'Scan any QR code' से शुरू करें | पैसे देने से पहले दुकान का नाम मिलाएं | PIN सिर्फ़ पैसे देने के लिए है, पैसे लेने के लिए कभी नहीं
- Malayalam: 'Scan any QR code' കൊണ്ട് തുടങ്ങൂ | പണം അടയ്ക്കുന്നതിന് മുമ്പ് കടയുടെ പേര് ഒത്തുനോക്കൂ | PIN പണം അടയ്ക്കാൻ മാത്രം, പണം കിട്ടാൻ ഒരിക്കലും വേണ്ട

**"Now try it for real" line**
- English: Next time at a shop, try the same steps on your real Google Pay. If you get stuck, open Nook again.
- Hindi: अगली बार दुकान पर अपने असली Google Pay में ऐसे ही करके देखिए। कहीं अटकें, तो Nook फिर से खोलिए।
- Malayalam: അടുത്ത തവണ കടയിൽ, നിങ്ങളുടെ യഥാർത്ഥ Google Pay-ൽ ഇതേ ഘട്ടങ്ങൾ ചെയ്തുനോക്കൂ. എവിടെയെങ്കിലും കുടുങ്ങിയാൽ, Nook വീണ്ടും തുറക്കൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Hello! Today we'll pay 50 rupees at a shop with a QR code. This is only practice. No real money. Take your time.

**Voice (Hindi):** नमस्ते! आज हम QR कोड से दुकान पर 50 रुपये देना सीखेंगे। यह सिर्फ़ अभ्यास है। असली पैसे नहीं लगेंगे। आराम से कीजिए।

**Voice (Malayalam):** നമസ്കാരം! ഇന്ന് QR കോഡ് കൊണ്ട് കടയിൽ 50 രൂപ അടയ്ക്കാൻ പഠിക്കാം. ഇത് പരിശീലനം മാത്രം. യഥാർത്ഥ പണം പോകില്ല. സാവധാനം ചെയ്യൂ.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങൂ


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-gpay_

**Voice (English):** Find the Google Pay icon on your phone. It is white, with a blue, red, yellow and green shape. The name is written under it. Tap it.

**Voice (Hindi):** फ़ोन में Google Pay का निशान ढूंढिए। वह सफ़ेद है, उस पर नीला, लाल, पीला और हरा निशान है। नीचे नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ Google Pay അടയാളം കണ്ടെത്തൂ. അത് വെള്ള നിറമാണ്, നീല, ചുവപ്പ്, മഞ്ഞ, പച്ച നിറത്തിലുള്ള അടയാളം ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `open-scan`
_kind: tap · screen: gp-home · tap target: scan_

**Voice (English):** This is Google Pay. First, tap 'Scan any QR code', the first button, with the square scanner icon.

**Voice (Hindi):** यह Google Pay है। सबसे पहले 'Scan any QR code' दबाइए, पहला बटन, चौकोर निशान वाला।

**Voice (Malayalam):** ഇതാണ് Google Pay. ആദ്യം, ചതുരത്തിലുള്ള സ്കാനർ അടയാളമുള്ള ആദ്യത്തെ ബട്ടൺ, 'Scan any QR code', അമർത്തൂ.

**Hint (English):** Tap the first button on the top left: 'Scan any QR code'. I've made it glow.

**Hint (Hindi):** ऊपर बाईं तरफ़ पहला बटन 'Scan any QR code' दबाइए। मैंने उसे चमका दिया है।

**Hint (Malayalam):** മുകളിൽ ഇടതുവശത്തെ ആദ്യത്തെ ബട്ടൺ, 'Scan any QR code', അമർത്തൂ. ഞാൻ അത് തിളങ്ങുന്നതാക്കിയിട്ടുണ്ട്.


### Step 3: `scan-qr`
_kind: tap · screen: gp-scan · tap target: qr_

**Voice (English):** The camera is open. In real life, you point it at the shop's QR code. Now, tap the QR code on the screen.

**Voice (Hindi):** कैमरा खुल गया। असल में आप इसे दुकान के QR कोड की तरफ़ करते हैं। अभी स्क्रीन पर QR कोड दबाइए।

**Voice (Malayalam):** ക്യാമറ തുറന്നു. സാധാരണ ഇത് കടയിലെ QR കോഡിന് നേരെ പിടിക്കും. ഇപ്പോൾ സ്ക്രീനിലെ QR കോഡ് അമർത്തൂ.

**Hint (English):** Tap the black-and-white square code in the middle.

**Hint (Hindi):** बीच में जो काला-सफ़ेद चौकोर कोड है, उसे दबाइए।

**Hint (Malayalam):** നടുവിലുള്ള കറുപ്പും വെളുപ്പും ചതുര കോഡ് അമർത്തൂ.


### Step 4: `check-name`
_kind: quiz · screen: gp-amount_

**Voice (English):** Wait! Check the name before you pay. The shop's board says 'Sunrise General Store'. Is the same name on the screen?

**Voice (Hindi):** रुकिए! पैसे देने से पहले नाम देखिए। दुकान के बोर्ड पर लिखा है 'सनराइज़ जनरल स्टोर'। क्या स्क्रीन पर भी वही नाम है?

**Voice (Malayalam):** നിൽക്കൂ! പണം അടയ്ക്കുന്നതിന് മുമ്പ് പേര് നോക്കൂ. കടയുടെ ബോർഡിൽ 'Sunrise General Store' എന്നാണ്. സ്ക്രീനിലും അതേ പേരാണോ?

**Answers:**
1. (correct) Yes, the name matches
   - EN why: Exactly right! Always match the name. If it's different, don't pay.
   - HI: हाँ, नाम वही है / बिल्कुल सही! हर बार नाम मिलाइए। नाम अलग हो, तो पैसे मत भेजिए।
   - ML: അതെ, പേര് ഒന്നുതന്നെ / തികച്ചും ശരി! എപ്പോഴും പേര് ഒത്തുനോക്കൂ. പേര് വേറെയാണെങ്കിൽ, പണം അടയ്ക്കരുത്.
2. No need to check the name
   - EN why: Checking matters. If the QR is wrong, the money goes to someone else.
   - HI: नाम देखने की ज़रूरत नहीं / नाम देखना ज़रूरी है। QR गलत हो, तो पैसे किसी और के पास चले जाते हैं।
   - ML: പേര് നോക്കേണ്ട ആവശ്യമില്ല / നോക്കുന്നത് പ്രധാനമാണ്. QR തെറ്റാണെങ്കിൽ, പണം മറ്റാർക്കോ പോകും.


### Step 5: `amount`
_kind: input · screen: gp-amount_

**Voice (English):** Now type the amount. Press 5, 0. That makes 50 rupees.

**Voice (Hindi):** अब रकम लिखिए। 5, 0 दबाइए। यानी 50 रुपये।

**Voice (Malayalam):** ഇനി തുക ടൈപ്പ് ചെയ്യൂ. 5, 0 അമർത്തൂ. അപ്പോൾ 50 രൂപയാകും.

**Hint (English):** Press the glowing button.

**Hint (Hindi):** जो बटन चमक रहा है, वही दबाइए।

**Hint (Malayalam):** തിളങ്ങുന്ന ബട്ടൺ അമർത്തൂ.


### Step 6: `arrow`
_kind: tap · screen: gp-amount · tap target: next_

**Voice (English):** 50 rupees is entered. Now tap the round blue arrow button.

**Voice (Hindi):** 50 रुपये लिख गए। अब गोल नीले तीर वाला बटन दबाइए।

**Voice (Malayalam):** 50 രൂപ ചേർത്തു. ഇനി അമ്പടയാളമുള്ള നീല വട്ട ബട്ടൺ അമർത്തൂ.

**Hint (English):** Tap the round blue button with the arrow, on the right.

**Hint (Hindi):** दाईं तरफ़ गोल नीला तीर वाला बटन दबाइए।

**Hint (Malayalam):** വലതുവശത്ത്, അമ്പടയാളമുള്ള നീല വട്ട ബട്ടൺ അമർത്തൂ.


### Step 7: `choose-account`
_kind: tap · screen: gp-amount · tap target: pay-final_

**Voice (English):** The money will go from your bank account. Tap 'Pay ₹50'.

**Voice (Hindi):** पैसे आपके बैंक खाते से जाएंगे। 'Pay ₹50' दबाइए।

**Voice (Malayalam):** പണം നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ടിൽ നിന്ന് പോകും. 'Pay ₹50' അമർത്തൂ.

**Hint (English):** Tap the big blue 'Pay ₹50' button.

**Hint (Hindi):** नीचे बड़ा नीला 'Pay ₹50' बटन दबाइए।

**Hint (Malayalam):** വലിയ നീല 'Pay ₹50' ബട്ടൺ അമർത്തൂ.


### Step 8: `pin`
_kind: input · screen: gp-pin_

**Voice (English):** Now type any 4 numbers you like. This is just practice, so please do not type your real PIN.

**Voice (Hindi):** अब कोई भी 4 नंबर डालिए। यह सिर्फ़ अभ्यास है, इसलिए अपना असली PIN मत डालिए।

**Voice (Malayalam):** ഇനി ഇഷ്ടമുള്ള ഏതെങ്കിലും 4 നമ്പർ അടിക്കൂ. ഇത് പരിശീലനം മാത്രമാണ്, അതിനാൽ നിങ്ങളുടെ യഥാർത്ഥ PIN അടിക്കരുത്.

**Hint (English):** Type any 4 numbers. This is just practice.

**Hint (Hindi):** कोई भी 4 नंबर डालिए। यह सिर्फ़ अभ्यास है।

**Hint (Malayalam):** ഏതെങ്കിലും 4 നമ്പർ അടിക്കൂ. ഇത് പരിശീലനം മാത്രമാണ്.


### Step 9: `pin-ok`
_kind: tap · screen: gp-pin · tap target: pin-ok_

**Voice (English):** Now press the tick at the bottom right to confirm.

**Voice (Hindi):** अब पक्का करने के लिए नीचे दाईं तरफ़ सही का निशान दबाइए।

**Voice (Malayalam):** ഉറപ്പാക്കാൻ ഇനി താഴെ വലതുവശത്തെ ടിക്ക് അമർത്തൂ.

**Hint (English):** Press the tick button at the bottom right.

**Hint (Hindi):** नीचे दाईं तरफ़ सही (✓) वाला बटन दबाइए।

**Hint (Malayalam):** താഴെ വലതുവശത്തെ ടിക്ക് ബട്ടൺ അമർത്തൂ.


### Step 10: `success`
_kind: tap · screen: gp-success · tap target: done_

**Voice (English):** Done! 50 rupees went to Sunrise General Store. You can show this screen to the shopkeeper. Then tap “Done” at the bottom to close it.

**Voice (Hindi):** हो गया! 50 रुपये सनराइज़ जनरल स्टोर को चले गए। यह स्क्रीन दुकानदार को दिखा सकते हैं। फिर बंद करने के लिए नीचे “Done” दबाइए।

**Voice (Malayalam):** കഴിഞ്ഞു! 50 രൂപ Sunrise General Store-ലേക്ക് പോയി. ഈ സ്ക്രീൻ കടക്കാരനെ കാണിക്കാം. പിന്നെ അടയ്ക്കാൻ താഴെയുള്ള “Done” അമർത്തൂ.

**Hint (English):** Tap “Done” at the bottom.

**Hint (Hindi):** नीचे “Done” दबाइए।

**Hint (Malayalam):** താഴെയുള്ള “Done” അമർത്തൂ.


### Step 11: `scam-quiz`
_kind: quiz · screen: gp-home · shows the fake money request_

**Voice (English):** One important thing. Someone calls and says: 'I'm sending you 5,000 rupees, just enter your PIN.' Then this request appears. Should you enter your PIN?

**Voice (Hindi):** एक ज़रूरी बात। किसी ने फ़ोन करके कहा: 'आपको 5000 रुपये भेज रहा हूँ, बस PIN डाल दीजिए।' और यह request आ गई। क्या PIN डालना चाहिए?

**Voice (Malayalam):** ഒരു പ്രധാന കാര്യം. ഒരാൾ വിളിച്ച് പറയുന്നു: 'ഞാൻ നിങ്ങൾക്ക് 5,000 രൂപ അയക്കുന്നു, PIN മാത്രം നൽകൂ.' പിന്നാലെ ഈ റിക്വസ്റ്റ് വരുന്നു. PIN നൽകണോ?

**Answers:**
1. Yes, I'll get the money
   - EN why: No! You never need a PIN to receive money. If you enter it, money leaves your account.
   - HI: हाँ, पैसे मिलेंगे / नहीं! पैसे लेने के लिए PIN कभी नहीं लगता। PIN डाला, तो आपके ही पैसे कटेंगे।
   - ML: അതെ, എനിക്ക് പണം കിട്ടും / വേണ്ട! പണം കിട്ടാൻ ഒരിക്കലും PIN വേണ്ട. PIN നൽകിയാൽ, നിങ്ങളുടെ അക്കൗണ്ടിൽ നിന്ന് പണം പോകും.
2. (correct) No, a PIN is only for paying
   - EN why: Well done! You never need a PIN to receive money.
   - HI: नहीं, PIN सिर्फ़ पैसे देने के लिए है / शाबाश! पैसे लेने के लिए PIN कभी नहीं लगता।
   - ML: വേണ്ട, PIN പണം അടയ്ക്കാൻ മാത്രമാണ് / വളരെ നന്നായി! പണം കിട്ടാൻ ഒരിക്കലും PIN വേണ്ട.


### Step 12: `decline`
_kind: tap · screen: gp-home · tap target: decline · shows the fake money request_

**Voice (English):** Now refuse this request. Tap 'Decline'.

**Voice (Hindi):** अब इस request को मना कीजिए, 'Decline' दबाइए।

**Voice (Malayalam):** ഇനി ഈ റിക്വസ്റ്റ് നിരസിക്കൂ. 'Decline' അമർത്തൂ.

**Hint (English):** Not 'Pay'! Tap the 'Decline' button on the left.

**Hint (Hindi):** 'Pay' नहीं! बाईं तरफ़ का 'Decline' बटन दबाइए।

**Hint (Malayalam):** 'Pay' അല്ല! ഇടതുവശത്തെ 'Decline' ബട്ടൺ അമർത്തൂ.


## 2. Send money to someone you know
`send-money` · 3 min

- **English title:** Send money to someone you know
- **Hindi title:** किसी जान-पहचान वाले को पैसे भेजें
- **Malayalam title:** പരിചയമുള്ള ഒരാൾക്ക് പണം അയക്കാം

**Takeaways at the end**
- English: 'Pay anyone' → pick the person → check the name and number | Check the banking name before you pay | Not saved in your contacts? In 'Pay anyone', type their phone number | Send the receipt with “Share screenshot” | A PIN is only for paying, never for receiving money | Never send money back to a stranger who says they paid you 'by mistake'
- Hindi: 'Pay anyone' → व्यक्ति चुनें → नाम और नंबर जांचें | पैसे भेजने से पहले बैंकिंग नाम जांचें | संपर्क में नहीं है? 'Pay anyone' में उनका फ़ोन नंबर डालिए | “Share screenshot” से रसीद भेजिए | PIN सिर्फ़ पैसे देने के लिए है, पैसे लेने के लिए कभी नहीं | जो अनजान व्यक्ति कहे 'गलती से पैसे भेज दिए', उसे पैसे वापस न भेजें
- Malayalam: 'Pay anyone' → ആളെ തിരഞ്ഞെടുക്കൂ → പേരും നമ്പറും നോക്കൂ | പണം അയക്കും മുമ്പ് ബാങ്കിംഗ് പേര് നോക്കൂ | കോൺടാക്റ്റിൽ ഇല്ലേ? 'Pay anyone'-ൽ അവരുടെ ഫോൺ നമ്പർ ടൈപ്പ് ചെയ്യൂ | “Share screenshot” ഉപയോഗിച്ച് രസീത് അയക്കൂ | PIN പണം അടയ്ക്കാൻ മാത്രം, പണം കിട്ടാൻ ഒരിക്കലും വേണ്ട | 'അബദ്ധത്തിൽ' പണം അയച്ചു എന്ന് പറയുന്ന അപരിചിതന് ഒരിക്കലും പണം തിരിച്ചയക്കരുത്

**"Now try it for real" line**
- English: Try sending a small amount, like 1 rupee, to your son or daughter on your real Google Pay.
- Hindi: अपने असली Google Pay से अपने बेटे या बेटी को छोटी रकम, जैसे 1 रुपया, भेजकर देखिए।
- Malayalam: നിങ്ങളുടെ യഥാർത്ഥ Google Pay-ൽ, മകനോ മകൾക്കോ 1 രൂപ പോലെ ചെറിയ തുക അയച്ചുനോക്കൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Today we'll send 500 rupees to Sunita Didi on Google Pay. This is only practice. No real money moves.

**Voice (Hindi):** आज हम Google Pay पर सुनीता दीदी को 500 रुपये भेजना सीखेंगे। यह सिर्फ़ अभ्यास है। असली पैसे नहीं जाएंगे।

**Voice (Malayalam):** ഇന്ന് Google Pay-ൽ സുനിത ദീദിക്ക് 500 രൂപ അയയ്ക്കാൻ പഠിക്കാം. ഇത് പരിശീലനം മാത്രം. യഥാർത്ഥ പണം പോകില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങൂ


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-gpay_

**Voice (English):** Find the Google Pay icon on your phone. It is white, with a blue, red, yellow and green shape. The name is written under it. Tap it.

**Voice (Hindi):** फ़ोन में Google Pay का निशान ढूंढिए। वह सफ़ेद है, उस पर नीला, लाल, पीला और हरा निशान है। नीचे नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ Google Pay അടയാളം കണ്ടെത്തൂ. അത് വെള്ള നിറമാണ്, നീല, ചുവപ്പ്, മഞ്ഞ, പച്ച നിറത്തിലുള്ള അടയാളം ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `pay-contacts`
_kind: tap · screen: gp-home · tap target: pay-anyone_

**Voice (English):** Tap 'Pay anyone', the second button at the top.

**Voice (Hindi):** ऊपर दूसरा बटन 'Pay anyone' दबाइए।

**Voice (Malayalam):** മുകളിലെ രണ്ടാമത്തെ ബട്ടൺ, 'Pay anyone', അമർത്തൂ.

**Hint (English):** Tap 'Pay anyone', next to the scanner button.

**Hint (Hindi):** स्कैनर वाले बटन के बगल में 'Pay anyone' दबाइए।

**Hint (Malayalam):** സ്കാനർ ബട്ടണിന്റെ അടുത്തുള്ള 'Pay anyone' അമർത്തൂ.


### Step 3: `pick-contact`
_kind: tap · screen: gp-contacts · tap target: c-sunita_

**Voice (English):** These are the people you can pay. Tap 'Sunita Didi' under 'Recent'. Always check the name and the number.

**Voice (Hindi):** ये वे लोग हैं जिन्हें आप पैसे भेज सकते हैं। 'Recent' के नीचे 'Sunita Didi' दबाइए। हमेशा नाम और नंबर जांच लीजिए।

**Voice (Malayalam):** ഇവർക്കെല്ലാം നിങ്ങൾക്ക് പണം അയക്കാം. 'Recent'-ന് താഴെയുള്ള 'Sunita Chechi' അമർത്തൂ. എപ്പോഴും പേരും നമ്പറും നോക്കൂ.

**Hint (English):** Tap the 'Sunita Didi' row.

**Hint (Hindi):** 'Sunita Didi' वाली लाइन दबाइए।

**Hint (Malayalam):** 'Sunita Chechi' എന്ന വരി അമർത്തൂ.


### Step 4: `tap-pay`
_kind: tap · screen: gp-chat · tap target: pay_

**Voice (English):** This is your chat with Sunita Didi. To send her money, tap the blue 'Pay' button at the bottom left.

**Voice (Hindi):** यह सुनीता दीदी के साथ आपकी चैट है। उन्हें पैसे भेजने के लिए नीचे बाईं तरफ़ नीला 'Pay' बटन दबाइए।

**Voice (Malayalam):** ഇത് Sunita Chechi-യുമായുള്ള നിങ്ങളുടെ ചാറ്റ് ആണ്. പണം അയക്കാൻ താഴെ ഇടതുവശത്തെ നീല 'Pay' ബട്ടൺ അമർത്തൂ.

**Hint (English):** Tap the blue 'Pay' button at the bottom left.

**Hint (Hindi):** नीचे बाईं तरफ़ नीला 'Pay' बटन दबाइए।

**Hint (Malayalam):** താഴെ ഇടതുവശത്തെ നീല 'Pay' ബട്ടൺ അമർത്തൂ.


### Step 5: `amount`
_kind: input · screen: gp-amount_

**Voice (English):** Now type the amount. Press 5, 0, 0. That makes 500 rupees.

**Voice (Hindi):** अब रकम लिखिए। 5, 0, 0 दबाइए। यानी 500 रुपये।

**Voice (Malayalam):** ഇനി തുക ടൈപ്പ് ചെയ്യൂ. 5, 0, 0 അമർത്തൂ. അപ്പോൾ 500 രൂപയാകും.

**Hint (English):** Press the glowing button.

**Hint (Hindi):** जो बटन चमक रहा है, वही दबाइए।

**Hint (Malayalam):** തിളങ്ങുന്ന ബട്ടൺ അമർത്തൂ.


### Step 6: `arrow`
_kind: tap · screen: gp-amount · tap target: next_

**Voice (English):** 500 rupees is entered. Now tap the round blue arrow button.

**Voice (Hindi):** 500 रुपये लिख गए। अब गोल नीले तीर वाला बटन दबाइए।

**Voice (Malayalam):** 500 രൂപ ചേർത്തു. ഇനി അമ്പടയാളമുള്ള നീല വട്ട ബട്ടൺ അമർത്തൂ.

**Hint (English):** Tap the round blue button with the arrow, on the right.

**Hint (Hindi):** दाईं तरफ़ गोल नीला तीर वाला बटन दबाइए।

**Hint (Malayalam):** വലതുവശത്ത്, അമ്പടയാളമുള്ള നീല വട്ട ബട്ടൺ അമർത്തൂ.


### Step 7: `choose-account`
_kind: tap · screen: gp-amount · tap target: pay-final_

**Voice (English):** The money will go from your bank account. Tap 'Pay ₹500'.

**Voice (Hindi):** पैसे आपके बैंक खाते से जाएंगे। 'Pay ₹500' दबाइए।

**Voice (Malayalam):** പണം നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ടിൽ നിന്ന് പോകും. 'Pay ₹500' അമർത്തൂ.

**Hint (English):** Tap the big blue 'Pay ₹500' button.

**Hint (Hindi):** नीचे बड़ा नीला 'Pay ₹500' बटन दबाइए।

**Hint (Malayalam):** വലിയ നീല 'Pay ₹500' ബട്ടൺ അമർത്തൂ.


### Step 8: `pin`
_kind: input · screen: gp-pin_

**Voice (English):** Now type any 4 numbers you like. This is just practice, so please do not type your real PIN.

**Voice (Hindi):** अब कोई भी 4 नंबर डालिए। यह सिर्फ़ अभ्यास है, इसलिए अपना असली PIN मत डालिए।

**Voice (Malayalam):** ഇനി ഇഷ്ടമുള്ള ഏതെങ്കിലും 4 നമ്പർ അടിക്കൂ. ഇത് പരിശീലനം മാത്രമാണ്, അതിനാൽ നിങ്ങളുടെ യഥാർത്ഥ PIN അടിക്കരുത്.

**Hint (English):** Type any 4 numbers. This is just practice.

**Hint (Hindi):** कोई भी 4 नंबर डालिए। यह सिर्फ़ अभ्यास है।

**Hint (Malayalam):** ഏതെങ്കിലും 4 നമ്പർ അടിക്കൂ. ഇത് പരിശീലനം മാത്രമാണ്.


### Step 9: `pin-ok`
_kind: tap · screen: gp-pin · tap target: pin-ok_

**Voice (English):** Now press the tick at the bottom right to confirm.

**Voice (Hindi):** अब पक्का करने के लिए नीचे दाईं तरफ़ सही का निशान दबाइए।

**Voice (Malayalam):** ഉറപ്പാക്കാൻ ഇനി താഴെ വലതുവശത്തെ ടിക്ക് അമർത്തൂ.

**Hint (English):** Press the tick button at the bottom right.

**Hint (Hindi):** नीचे दाईं तरफ़ सही (✓) वाला बटन दबाइए।

**Hint (Malayalam):** താഴെ വലതുവശത്തെ ടിക്ക് ബട്ടൺ അമർത്തൂ.


### Step 10: `success`
_kind: tap · screen: gp-success · tap target: share_

**Voice (English):** Done! 500 rupees reached Sunita Didi. You can send her the receipt. Tap “Share screenshot”.

**Voice (Hindi):** हो गया! 500 रुपये सुनीता दीदी को पहुँच गए। उन्हें रसीद भेज सकते हैं। “Share screenshot” दबाइए।

**Voice (Malayalam):** കഴിഞ്ഞു! 500 രൂപ Sunita Chechi-ക്ക് കിട്ടി. അവർക്ക് രസീത് അയക്കാം. “Share screenshot” അമർത്തൂ.

**Hint (English):** Tap “Share screenshot”.

**Hint (Hindi):** “Share screenshot” बटन दबाइए।

**Hint (Malayalam):** “Share screenshot” ബട്ടൺ അമർത്തൂ.


### Step 11: `share-pick`
_kind: tap · screen: gp-share · tap target: share-wa_

**Voice (English):** Choose how to send it. Tap 'WhatsApp'.

**Voice (Hindi):** भेजने का तरीका चुनिए। 'WhatsApp' दबाइए।

**Voice (Malayalam):** എങ്ങനെ അയക്കണമെന്ന് തിരഞ്ഞെടുക്കൂ. 'WhatsApp' അമർത്തൂ.

**Hint (English):** Tap the green 'WhatsApp' icon.

**Hint (Hindi):** हरा 'WhatsApp' निशान दबाइए।

**Hint (Malayalam):** പച്ച 'WhatsApp' ചിഹ്നം അമർത്തൂ.


### Step 12: `share-close`
_kind: tap · screen: gp-success · tap target: done_

**Voice (English):** Receipt sent! Now tap “Done” at the bottom to close.

**Voice (Hindi):** रसीद भेज दी! अब बंद करने के लिए नीचे “Done” दबाइए।

**Voice (Malayalam):** രസീത് അയച്ചു! ഇനി അടയ്ക്കാൻ താഴെയുള്ള “Done” അമർത്തൂ.

**Hint (English):** Tap “Done” at the bottom.

**Hint (Hindi):** नीचे “Done” दबाइए।

**Hint (Malayalam):** താഴെയുള്ള “Done” അമർത്തൂ.


### Step 13: `mistake-scam`
_kind: quiz · screen: gp-home_

**Voice (English):** One more thing. A stranger calls: 'I sent you 2,000 rupees by mistake, please send it back.' What should you do?

**Voice (Hindi):** एक और बात। कोई अनजान व्यक्ति फ़ोन करके कहता है: 'मैंने गलती से आपको 2000 रुपये भेज दिए, वापस भेज दीजिए।' आपको क्या करना चाहिए?

**Voice (Malayalam):** ഒരു കാര്യം കൂടി. ഒരു അപരിചിതൻ വിളിക്കുന്നു: 'ഞാൻ അബദ്ധത്തിൽ നിങ്ങൾക്ക് 2,000 രൂപ അയച്ചു, ദയവായി തിരിച്ചയക്കൂ.' എന്ത് ചെയ്യണം?

**Answers:**
1. Send it back right away
   - EN why: Don't! This is a common scam. Often no money came at all.
   - HI: तुरंत वापस भेज दूँ / ऐसा मत कीजिए! यह आम धोखा है। अक्सर कोई पैसा आया ही नहीं होता।
   - ML: ഉടനെ തിരിച്ചയക്കാം / അരുത്! ഇത് സാധാരണമായ ഒരു തട്ടിപ്പാണ്. പലപ്പോഴും ഒരു പണവും വന്നിട്ടുണ്ടാവില്ല.
2. (correct) First check my own transaction history, and ask my son or daughter
   - EN why: Right! Check 'See transaction history' yourself. Never send money back just because a stranger called.
   - HI: पहले अपनी transaction history देखूँ, और बेटे/बेटी से पूछूँ / सही! खुद 'See transaction history' में देखिए। किसी अनजान के फ़ोन पर पैसे वापस मत भेजिए।
   - ML: ആദ്യം എന്റെ സ്വന്തം ഇടപാട് ചരിത്രം നോക്കാം, മകനോടോ മകളോടോ ചോദിക്കാം / ശരി! 'See transaction history' സ്വയം നോക്കൂ. ഒരു അപരിചിതൻ വിളിച്ചു എന്നതുകൊണ്ട് മാത്രം ഒരിക്കലും പണം തിരിച്ചയക്കരുത്.


### Step 14: `scam-quiz`
_kind: quiz · screen: gp-home · shows the fake money request_

**Voice (English):** One important thing. Someone calls and says: 'I'm sending you 5,000 rupees, just enter your PIN.' Then this request appears. Should you enter your PIN?

**Voice (Hindi):** एक ज़रूरी बात। किसी ने फ़ोन करके कहा: 'आपको 5000 रुपये भेज रहा हूँ, बस PIN डाल दीजिए।' और यह request आ गई। क्या PIN डालना चाहिए?

**Voice (Malayalam):** ഒരു പ്രധാന കാര്യം. ഒരാൾ വിളിച്ച് പറയുന്നു: 'ഞാൻ നിങ്ങൾക്ക് 5,000 രൂപ അയക്കുന്നു, PIN മാത്രം നൽകൂ.' പിന്നാലെ ഈ റിക്വസ്റ്റ് വരുന്നു. PIN നൽകണോ?

**Answers:**
1. Yes, I'll get the money
   - EN why: No! You never need a PIN to receive money. If you enter it, money leaves your account.
   - HI: हाँ, पैसे मिलेंगे / नहीं! पैसे लेने के लिए PIN कभी नहीं लगता। PIN डाला, तो आपके ही पैसे कटेंगे।
   - ML: അതെ, എനിക്ക് പണം കിട്ടും / വേണ്ട! പണം കിട്ടാൻ ഒരിക്കലും PIN വേണ്ട. PIN നൽകിയാൽ, നിങ്ങളുടെ അക്കൗണ്ടിൽ നിന്ന് പണം പോകും.
2. (correct) No, a PIN is only for paying
   - EN why: Well done! You never need a PIN to receive money.
   - HI: नहीं, PIN सिर्फ़ पैसे देने के लिए है / शाबाश! पैसे लेने के लिए PIN कभी नहीं लगता।
   - ML: വേണ്ട, PIN പണം അടയ്ക്കാൻ മാത്രമാണ് / വളരെ നന്നായി! പണം കിട്ടാൻ ഒരിക്കലും PIN വേണ്ട.


### Step 15: `decline`
_kind: tap · screen: gp-home · tap target: decline · shows the fake money request_

**Voice (English):** Now refuse this request. Tap 'Decline'.

**Voice (Hindi):** अब इस request को मना कीजिए, 'Decline' दबाइए।

**Voice (Malayalam):** ഇനി ഈ റിക്വസ്റ്റ് നിരസിക്കൂ. 'Decline' അമർത്തൂ.

**Hint (English):** Not 'Pay'! Tap the 'Decline' button on the left.

**Hint (Hindi):** 'Pay' नहीं! बाईं तरफ़ का 'Decline' बटन दबाइए।

**Hint (Malayalam):** 'Pay' അല്ല! ഇടതുവശത്തെ 'Decline' ബട്ടൺ അമർത്തൂ.


## 3. Recharge your mobile
`recharge` · 2 min

- **English title:** Recharge your mobile
- **Hindi title:** अपना मोबाइल रिचार्ज करें
- **Malayalam title:** മൊബൈൽ റീചാർജ് ചെയ്യാം

**Takeaways at the end**
- English: 'Mobile recharge' → 'My recharges' → pick your plan | Pay inside Google Pay with your UPI PIN | Never recharge through a link in an SMS
- Hindi: 'Mobile recharge' → 'My recharges' → अपना प्लान चुनें | Google Pay के अंदर ही UPI PIN से पेमेंट करें | SMS में आए लिंक से कभी रिचार्ज न करें
- Malayalam: 'Mobile recharge' → 'My recharges' → നിങ്ങളുടെ പ്ലാൻ തിരഞ്ഞെടുക്കൂ | Google Pay-ന്റെ ഉള്ളിൽ UPI PIN കൊണ്ട് പണം അടയ്ക്കൂ | SMS-ലെ ലിങ്ക് വഴി ഒരിക്കലും റീചാർജ് ചെയ്യരുത്

**"Now try it for real" line**
- English: When your plan is about to end, recharge from 'Mobile recharge' on your real Google Pay.
- Hindi: जब आपका प्लान ख़त्म होने वाला हो, असली Google Pay में 'Mobile recharge' से रिचार्ज कीजिए।
- Malayalam: പ്ലാൻ തീരാറാകുമ്പോൾ, യഥാർത്ഥ Google Pay-ലെ 'Mobile recharge'-ൽ നിന്ന് റീചാർജ് ചെയ്യൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Today we'll recharge your mobile number on Google Pay. This is only practice. No real money.

**Voice (Hindi):** आज हम Google Pay पर आपके मोबाइल नंबर का रिचार्ज करना सीखेंगे। यह सिर्फ़ अभ्यास है। असली पैसे नहीं लगेंगे।

**Voice (Malayalam):** ഇന്ന് Google Pay-ൽ നിങ്ങളുടെ മൊബൈൽ നമ്പർ റീചാർജ് ചെയ്യാൻ പഠിക്കാം. ഇത് പരിശീലനം മാത്രം. യഥാർത്ഥ പണം പോകില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങൂ


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-gpay_

**Voice (English):** Find the Google Pay icon on your phone. It is white, with a blue, red, yellow and green shape. The name is written under it. Tap it.

**Voice (Hindi):** फ़ोन में Google Pay का निशान ढूंढिए। वह सफ़ेद है, उस पर नीला, लाल, पीला और हरा निशान है। नीचे नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ Google Pay അടയാളം കണ്ടെത്തൂ. അത് വെള്ള നിറമാണ്, നീല, ചുവപ്പ്, മഞ്ഞ, പച്ച നിറത്തിലുള്ള അടയാളം ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `open-recharge`
_kind: tap · screen: gp-home · tap target: recharge_

**Voice (English):** Tap 'Mobile recharge', the fourth button at the top.

**Voice (Hindi):** ऊपर चौथा बटन 'Mobile recharge' दबाइए।

**Voice (Malayalam):** മുകളിലെ നാലാമത്തെ ബട്ടൺ, 'Mobile recharge', അമർത്തൂ.

**Hint (English):** Tap 'Mobile recharge', on the right in the top row.

**Hint (Hindi):** ऊपर वाली लाइन में दाईं तरफ़ 'Mobile recharge' दबाइए।

**Hint (Malayalam):** മുകളിലെ വരിയിൽ വലതുവശത്തുള്ള 'Mobile recharge' അമർത്തൂ.


### Step 3: `my-number`
_kind: tap · screen: gp-recharge · tap target: my-number_

**Voice (English):** Your own number is under 'My recharges'. Tap it.

**Voice (Hindi):** 'My recharges' के नीचे आपका अपना नंबर है। उसे दबाइए।

**Voice (Malayalam):** നിങ്ങളുടെ സ്വന്തം നമ്പർ 'My recharges'-ന് താഴെയുണ്ട്. അത് അമർത്തൂ.

**Hint (English):** Tap the row that says 'Kamala Nair (You)'.

**Hint (Hindi):** 'Kamala Nair (You)' वाली लाइन दबाइए।

**Hint (Malayalam):** 'Kamala Nair (You)' എന്ന വരി അമർത്തൂ.


### Step 4: `pick-plan`
_kind: tap · screen: gp-plans · tap target: plan-299_

**Voice (English):** These are the plans. Pick the one you usually take. Today, it's 299 rupees for 28 days. Tap it.

**Voice (Hindi):** ये प्लान हैं। जो प्लान आप हमेशा लेते हैं, वही चुनिए। आज 299 रुपये, 28 दिन वाला। उसे दबाइए।

**Voice (Malayalam):** ഇവയാണ് പ്ലാനുകൾ. സാധാരണ എടുക്കുന്നത് തിരഞ്ഞെടുക്കൂ. ഇന്ന് അത് 28 ദിവസത്തേക്ക് 299 രൂപയാണ്. അത് അമർത്തൂ.

**Hint (English):** Tap the first plan, ₹299.

**Hint (Hindi):** पहला प्लान, 299 रुपये वाला, दबाइए।

**Hint (Malayalam):** ആദ്യത്തെ പ്ലാൻ, ₹299, അമർത്തൂ.


### Step 5: `choose-account`
_kind: tap · screen: gp-amount · tap target: pay-final_

**Voice (English):** The money will go from your bank account. Tap 'Pay ₹299'.

**Voice (Hindi):** पैसे आपके बैंक खाते से जाएंगे। 'Pay ₹299' दबाइए।

**Voice (Malayalam):** പണം നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ടിൽ നിന്ന് പോകും. 'Pay ₹299' അമർത്തൂ.

**Hint (English):** Tap the big blue 'Pay ₹299' button.

**Hint (Hindi):** नीचे बड़ा नीला 'Pay ₹299' बटन दबाइए।

**Hint (Malayalam):** വലിയ നീല 'Pay ₹299' ബട്ടൺ അമർത്തൂ.


### Step 6: `pin`
_kind: input · screen: gp-pin_

**Voice (English):** Now type any 4 numbers you like. This is just practice, so please do not type your real PIN.

**Voice (Hindi):** अब कोई भी 4 नंबर डालिए। यह सिर्फ़ अभ्यास है, इसलिए अपना असली PIN मत डालिए।

**Voice (Malayalam):** ഇനി ഇഷ്ടമുള്ള ഏതെങ്കിലും 4 നമ്പർ അടിക്കൂ. ഇത് പരിശീലനം മാത്രമാണ്, അതിനാൽ നിങ്ങളുടെ യഥാർത്ഥ PIN അടിക്കരുത്.

**Hint (English):** Type any 4 numbers. This is just practice.

**Hint (Hindi):** कोई भी 4 नंबर डालिए। यह सिर्फ़ अभ्यास है।

**Hint (Malayalam):** ഏതെങ്കിലും 4 നമ്പർ അടിക്കൂ. ഇത് പരിശീലനം മാത്രമാണ്.


### Step 7: `pin-ok`
_kind: tap · screen: gp-pin · tap target: pin-ok_

**Voice (English):** Now press the tick at the bottom right to confirm.

**Voice (Hindi):** अब पक्का करने के लिए नीचे दाईं तरफ़ सही का निशान दबाइए।

**Voice (Malayalam):** ഉറപ്പാക്കാൻ ഇനി താഴെ വലതുവശത്തെ ടിക്ക് അമർത്തൂ.

**Hint (English):** Press the tick button at the bottom right.

**Hint (Hindi):** नीचे दाईं तरफ़ सही (✓) वाला बटन दबाइए।

**Hint (Malayalam):** താഴെ വലതുവശത്തെ ടിക്ക് ബട്ടൺ അമർത്തൂ.


### Step 8: `success`
_kind: tap · screen: gp-success · tap target: done_

**Voice (English):** Recharge done! Your number is recharged for 28 days. Tap “Done” at the bottom to close.

**Voice (Hindi):** रिचार्ज हो गया! आपका नंबर 28 दिन के लिए रिचार्ज हो गया। बंद करने के लिए नीचे “Done” दबाइए।

**Voice (Malayalam):** റീചാർജ് കഴിഞ്ഞു! നിങ്ങളുടെ നമ്പർ 28 ദിവസത്തേക്ക് റീചാർജ് ആയി. അടയ്ക്കാൻ താഴെയുള്ള “Done” അമർത്തൂ.

**Hint (English):** Tap “Done” at the bottom.

**Hint (Hindi):** नीचे “Done” दबाइए।

**Hint (Malayalam):** താഴെയുള്ള “Done” അമർത്തൂ.


### Step 9: `sms-scam`
_kind: quiz · screen: gp-home_

**Voice (English):** You get an SMS: 'Your SIM will be blocked today. Recharge now at this link.' What do you do?

**Voice (Hindi):** आपको SMS आता है: 'आपका SIM आज बंद हो जाएगा। इस लिंक पर अभी रिचार्ज करें।' आप क्या करेंगे?

**Voice (Malayalam):** നിങ്ങൾക്ക് ഒരു SMS വരുന്നു: 'നിങ്ങളുടെ SIM ഇന്ന് ബ്ലോക്ക് ആകും. ഈ ലിങ്കിൽ ഇപ്പോൾ റീചാർജ് ചെയ്യൂ.' എന്ത് ചെയ്യും?

**Answers:**
1. Tap the link and recharge
   - EN why: No! Links in messages like this are scams. Recharge only inside your own payment app.
   - HI: लिंक दबाकर रिचार्ज करूँ / नहीं! ऐसे मैसेज के लिंक धोखा होते हैं। सिर्फ़ अपने पेमेंट ऐप के अंदर रिचार्ज कीजिए।
   - ML: ലിങ്ക് അമർത്തി റീചാർജ് ചെയ്യാം / വേണ്ട! ഇതുപോലുള്ള മെസ്സേജുകളിലെ ലിങ്കുകൾ തട്ടിപ്പാണ്. സ്വന്തം പേയ്മെന്റ് ആപ്പിന്റെ ഉള്ളിൽ മാത്രം റീചാർജ് ചെയ്യൂ.
2. (correct) Ignore it. Recharge only inside Google Pay
   - EN why: Exactly! Recharge only from your own app, never from a link.
   - HI: अनदेखा करूँ, सिर्फ़ Google Pay में रिचार्ज करूँ / बिल्कुल सही! सिर्फ़ अपने ऐप से रिचार्ज कीजिए, लिंक से कभी नहीं।
   - ML: അത് അവഗണിക്കാം. Google Pay-ന്റെ ഉള്ളിൽ മാത്രം റീചാർജ് ചെയ്യാം / തികച്ചും ശരി! സ്വന്തം ആപ്പിൽ നിന്ന് മാത്രം റീചാർജ് ചെയ്യൂ, ലിങ്കിൽ നിന്ന് ഒരിക്കലും അരുത്.


## 4. Check your bank balance in Google Pay
`gd-gpay-balance` · 2 min

- **English title:** Check your bank balance in Google Pay
- **Hindi title:** Google Pay में बैंक बैलेंस देखें
- **Malayalam title:** Google Pay-ൽ ബാങ്ക് ബാലൻസ് നോക്കാം

**Takeaways at the end**
- English: Check your bank balance in Google Pay | Go slowly, one step at a time | If you are unsure, ask family before you tap
- Hindi: Google Pay में बैंक बैलेंस देखें | आराम से, एक-एक कदम | अगर पक्का नहीं हैं, तो दबाने से पहले परिवार से पूछिए
- Malayalam: Google Pay-ൽ ബാങ്ക് ബാലൻസ് നോക്കാം | സാവധാനം, ഓരോ ഘട്ടമായി | ഉറപ്പില്ലെങ്കിൽ അമർത്തുന്നതിന് മുമ്പ് വീട്ടിൽ ചോദിക്കൂ

**"Now try it for real" line**
- English: Try it with a small amount first, like ₹10. The shopkeeper can wait while you check the name.
- Hindi: पहले छोटी रकम से आज़माइए, जैसे ₹10। नाम जाँचते समय दुकानदार इंतज़ार कर सकता है।
- Malayalam: ആദ്യം ₹10 പോലെ ചെറിയ തുകയിൽ ശ്രമിക്കൂ. പേര് പരിശോധിക്കുമ്പോൾ കടക്കാരൻ കാത്തിരിക്കും.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Let's practise: Check your bank balance in Google Pay. This is only practice, nothing real happens.

**Voice (Hindi):** चलिए अभ्यास करें: Google Pay में बैंक बैलेंस देखें। यह सिर्फ़ अभ्यास है, कुछ असली नहीं होगा।

**Voice (Malayalam):** നമുക്ക് പരിശീലിക്കാം: Google Pay-ൽ ബാങ്ക് ബാലൻസ് നോക്കാം. ഇത് പരിശീലനം മാത്രമാണ്, യഥാർത്ഥത്തിൽ ഒന്നും നടക്കില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങാം


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-gpay_

**Voice (English):** Find the Google Pay icon on your phone. It is white, with a blue, red, yellow and green shape. The name is written under it. Tap it.

**Voice (Hindi):** फ़ोन में Google Pay का निशान ढूंढिए। वह सफ़ेद है, उस पर नीला, लाल, पीला और हरा निशान है। नीचे नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ Google Pay അടയാളം കണ്ടെത്തൂ. അത് വെള്ള നിറമാണ്, നീല, ചുവപ്പ്, മഞ്ഞ, പച്ച നിറത്തിലുള്ള അടയാളം ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `s0`
_kind: tap · screen: kit / gp-home · tap target: tab-money_

**Voice (English):** Open Google Pay. At the bottom, tap "Money".

**Voice (Hindi):** Google Pay खोलिए। नीचे "Money" दबाइए।

**Voice (Malayalam):** Google Pay തുറക്കൂ. താഴെ "Money" അമർത്തൂ.

**Hint (English):** Tap "Money".

**Hint (Hindi):** "Money" दबाइए।

**Hint (Malayalam):** "Money" അമർത്തൂ.


### Step 3: `s1`
_kind: tap · screen: kit / gp-money · tap target: bank-sbi_

**Voice (English):** Next to your bank account, tap "Check balance".

**Voice (Hindi):** अपने बैंक खाते के पास "Check balance" दबाइए।

**Voice (Malayalam):** നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ടിന്റെ അടുത്തുള്ള "Check balance" അമർത്തൂ.

**Hint (English):** Tap "Check balance".

**Hint (Hindi):** "Check balance" दबाइए।

**Hint (Malayalam):** "Check balance" അമർത്തൂ.


### Step 4: `s2-0`
_kind: info · screen: kit / gp-pin_

**Voice (English):** Your phone now asks for your UPI PIN. In practice you do not type it. Tap Next to see the balance.

**Voice (Hindi):** अब फ़ोन आपका UPI PIN माँगता है। अभ्यास में इसे डालना नहीं है। बैलेंस देखने के लिए Next दबाइए।

**Voice (Malayalam):** ഇപ്പോൾ ഫോൺ നിങ്ങളുടെ UPI PIN ചോദിക്കും. പരിശീലനത്തിൽ അത് അടിക്കേണ്ട. ബാലൻസ് കാണാൻ Next അമർത്തൂ.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 5: `s2-1`
_kind: info · screen: kit / gp-balance_

**Voice (English):** Your phone now asks for your UPI PIN. In practice you do not type it. Tap Next to see the balance.

**Voice (Hindi):** अब फ़ोन आपका UPI PIN माँगता है। अभ्यास में इसे डालना नहीं है। बैलेंस देखने के लिए Next दबाइए।

**Voice (Malayalam):** ഇപ്പോൾ ഫോൺ നിങ്ങളുടെ UPI PIN ചോദിക്കും. പരിശീലനത്തിൽ അത് അടിക്കേണ്ട. ബാലൻസ് കാണാൻ Next അമർത്തൂ.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 6: `careful`
_kind: info · screen: kit / done_

**Voice (English):** Type your UPI PIN yourself. Never tell it to anyone, not even the bank.

**Voice (Hindi):** UPI PIN खुद डालिए। इसे किसी को मत बताइए, बैंक वालों को भी नहीं।

**Voice (Malayalam):** UPI PIN സ്വയം അടിക്കൂ. ആരോടും പറയരുത്, ബാങ്കുകാരോട് പോലും.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 7: `done`
_kind: info · screen: kit / done_

**Voice (English):** Well done! Next time at the shop, open Google Pay, take your time and check the name before you pay.

**Voice (Hindi):** शाबाश! अगली बार दुकान पर Google Pay खोलिए, आराम से, और पैसे देने से पहले नाम जाँच लीजिए।

**Voice (Malayalam):** നന്നായി! അടുത്ത തവണ കടയിൽ Google Pay തുറക്കൂ, ധൃതിയില്ലാതെ, പണം നൽകുന്നതിന് മുമ്പ് പേര് പരിശോധിക്കൂ.

**Button:** English: Finish · Hindi: पूरा करें · Malayalam: തീർന്നു



---

# WhatsApp

## 5. Find an old file or photo on WhatsApp
`whatsapp-docs` · 2 min

- **English title:** Find an old file or photo on WhatsApp
- **Hindi title:** WhatsApp पर पुरानी फ़ाइल या फ़ोटो ढूंढें
- **Malayalam title:** WhatsApp-ൽ പഴയ ഫയലോ ഫോട്ടോയോ കണ്ടെത്താം

**Takeaways at the end**
- English: Open the chat of the person who sent it | Tap their name at the top → 'Media, links and docs' | Photos are in 'Media', PDFs are in 'Docs'
- Hindi: जिसने भेजा था, उसकी चैट खोलें | ऊपर नाम दबाएं → 'Media, links and docs' | फ़ोटो 'Media' में, PDF 'Docs' में
- Malayalam: അയച്ച ആളുടെ ചാറ്റ് തുറക്കൂ | മുകളിൽ അവരുടെ പേര് അമർത്തൂ → 'Media, links and docs' | ഫോട്ടോകൾ 'Media'-യിൽ, PDF-കൾ 'Docs'-ൽ

**"Now try it for real" line**
- English: Now try finding a file someone sent you on your real WhatsApp, the same way.
- Hindi: अब अपने असली WhatsApp में किसी की भेजी फ़ाइल ऐसे ही ढूंढकर देखिए।
- Malayalam: ഇനി യഥാർത്ഥ WhatsApp-ൽ ആരെങ്കിലും അയച്ച ഒരു ഫയൽ ഇതുപോലെ കണ്ടെത്തിനോക്കൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Ramesh Bhaiya sent the electricity bill two weeks ago, as a PDF. Today we'll find it quickly, without scrolling. This is practice. No message will be sent.

**Voice (Hindi):** रमेश भैया ने दो हफ़्ते पहले बिजली का बिल PDF में भेजा था। आज हम उसे बिना ऊपर-ऊपर घुमाए जल्दी ढूंढेंगे। यह अभ्यास है। कोई संदेश नहीं जाएगा।

**Voice (Malayalam):** രണ്ട് ആഴ്ച മുമ്പ് രമേഷ് ഭയ്യ കറന്റ് ബിൽ PDF ആയി അയച്ചിരുന്നു. ഇന്ന് മുകളിലേക്ക് സ്ക്രോൾ ചെയ്യാതെ അത് വേഗം കണ്ടെത്താം. ഇത് പരിശീലനം മാത്രം. സന്ദേശം പോകില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങൂ


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-whatsapp_

**Voice (English):** Find the WhatsApp icon on your phone. It is green, with a white phone in the middle. The name is written under it. Tap it.

**Voice (Hindi):** फ़ोन में WhatsApp का निशान ढूंढिए। वह हरा है, बीच में सफ़ेद फ़ोन है। नीचे नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ WhatsApp അടയാളം കണ്ടെത്തൂ. അത് പച്ച നിറമാണ്, നടുവിൽ വെള്ള ഫോൺ ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `open-chat`
_kind: tap · screen: wa-chats · tap target: chat-ramesh_

**Voice (English):** This is your chat list. Open the chat of the person who sent the file, tap 'Ramesh Bhaiya'.

**Voice (Hindi):** यह आपकी चैट की लिस्ट है। जिसने फ़ाइल भेजी थी, उसकी चैट खोलिए, 'Ramesh Bhaiya' दबाइए।

**Voice (Malayalam):** ഇതാണ് നിങ്ങളുടെ ചാറ്റ് ലിസ്റ്റ്. ഫയൽ അയച്ച ആളുടെ ചാറ്റ് തുറക്കൂ, 'Ramesh Chettan' അമർത്തൂ.

**Hint (English):** Tap the 'Ramesh Bhaiya' row.

**Hint (Hindi):** 'Ramesh Bhaiya' वाली लाइन दबाइए।

**Hint (Malayalam):** 'Ramesh Chettan' എന്ന വരി അമർത്തൂ.


### Step 3: `tap-name`
_kind: tap · screen: wa-chat · tap target: contact-name_

**Voice (English):** The bill is far up in old messages. You don't need to scroll. Tap the name 'Ramesh Bhaiya' at the very top.

**Voice (Hindi):** बिल बहुत पुराने संदेशों में ऊपर है। ऊपर घुमाने की ज़रूरत नहीं। सबसे ऊपर 'Ramesh Bhaiya' नाम दबाइए।

**Voice (Malayalam):** ബിൽ പഴയ സന്ദേശങ്ങളിൽ വളരെ മുകളിലാണ്. സ്ക്രോൾ ചെയ്യേണ്ട. ഏറ്റവും മുകളിലെ 'Ramesh Chettan' എന്ന പേര് അമർത്തൂ.

**Hint (English):** Tap the name at the very top of the screen.

**Hint (Hindi):** स्क्रीन के सबसे ऊपर लिखा नाम दबाइए।

**Hint (Malayalam):** സ്ക്രീനിന്റെ ഏറ്റവും മുകളിലെ പേര് അമർത്തൂ.


### Step 4: `media-row`
_kind: tap · screen: wa-info · tap target: media-row_

**Voice (English):** Here it says 'Media, links and docs'. It has every photo and file they sent. Tap it.

**Voice (Hindi):** यहाँ 'Media, links and docs' लिखा है। इसमें उनकी भेजी हर फ़ोटो और फ़ाइल है। इसे दबाइए।

**Voice (Malayalam):** ഇവിടെ 'Media, links and docs' എന്നുണ്ട്. അവർ അയച്ച എല്ലാ ഫോട്ടോയും ഫയലും അതിലുണ്ട്. അത് അമർത്തൂ.

**Hint (English):** Tap the 'Media, links and docs' row.

**Hint (Hindi):** 'Media, links and docs' वाली लाइन दबाइए।

**Hint (Malayalam):** 'Media, links and docs' എന്ന വരി അമർത്തൂ.


### Step 5: `docs-tab`
_kind: tap · screen: wa-media · tap target: docs-tab_

**Voice (English):** These are photos. PDF files are under 'Docs'. Tap 'Docs' at the top.

**Voice (Hindi):** ये फ़ोटो हैं। PDF फ़ाइलें 'Docs' में होती हैं। ऊपर 'Docs' दबाइए।

**Voice (Malayalam):** ഇവ ഫോട്ടോകളാണ്. PDF ഫയലുകൾ 'Docs'-ലാണ്. മുകളിലെ 'Docs' അമർത്തൂ.

**Hint (English):** Tap 'Docs' in the middle at the top.

**Hint (Hindi):** ऊपर बीच में 'Docs' लिखा है, उसे दबाइए।

**Hint (Malayalam):** മുകളിൽ നടുവിലുള്ള 'Docs' അമർത്തൂ.


### Step 6: `open-bill`
_kind: tap · screen: wa-media · tap target: bill_

**Voice (English):** Here are all the files. Tap the electricity bill.

**Voice (Hindi):** ये रहीं सारी फ़ाइलें। बिजली का बिल दबाइए।

**Voice (Malayalam):** എല്ലാ ഫയലുകളും ഇവിടെയുണ്ട്. കറന്റ് ബിൽ അമർത്തൂ.

**Hint (English):** Tap 'Electricity_bill_Sept.pdf'.

**Hint (Hindi):** 'Electricity_bill_Sept.pdf' दबाइए।

**Hint (Malayalam):** 'Electricity_bill_Sept.pdf' അമർത്തൂ.


### Step 7: `opened`
_kind: tap · screen: wa-pdf · tap target: done_

**Voice (English):** The bill is open! You can read it or forward it now. Tap 'Done'.

**Voice (Hindi):** बिल खुल गया! अब आप इसे देख सकते हैं या आगे भेज सकते हैं। 'Done' दबाइए।

**Voice (Malayalam):** ബിൽ തുറന്നു! ഇപ്പോൾ വായിക്കാം, അല്ലെങ്കിൽ ഫോർവേഡ് ചെയ്യാം. 'Done' അമർത്തൂ.

**Hint (English):** Tap “Done” at the bottom.

**Hint (Hindi):** नीचे “Done” दबाइए।

**Hint (Malayalam):** താഴെയുള്ള “Done” അമർത്തൂ.


### Step 8: `photo-quiz`
_kind: quiz · screen: wa-media_

**Voice (English):** One question: to find a photo Ramesh Bhaiya sent, which tab would you open?

**Voice (Hindi):** एक सवाल: अगर रमेश भैया की भेजी कोई फ़ोटो ढूंढनी हो, तो कौन सा टैब खोलेंगे?

**Voice (Malayalam):** ഒരു ചോദ്യം: Ramesh Chettan അയച്ച ഒരു ഫോട്ടോ കണ്ടെത്താൻ, ഏത് ടാബ് തുറക്കും?

**Answers:**
1. (correct) Media
   - EN why: Right! Photos and videos are in 'Media', PDFs in 'Docs'.
   - HI: Media / सही! फ़ोटो और वीडियो 'Media' में, PDF 'Docs' में।
   - ML: Media / ശരി! ഫോട്ടോകളും വീഡിയോകളും 'Media'-യിൽ, PDF-കൾ 'Docs'-ൽ.
2. Docs
   - EN why: 'Docs' has files like PDFs. Photos are in 'Media'.
   - HI: Docs / 'Docs' में PDF जैसी फ़ाइलें होती हैं। फ़ोटो 'Media' में मिलती हैं।
   - ML: Docs / 'Docs'-ൽ PDF പോലുള്ള ഫയലുകളാണ്. ഫോട്ടോകൾ 'Media'-യിലാണ്.
3. Links
   - EN why: 'Links' has website links. Photos are in 'Media'.
   - HI: Links / 'Links' में वेबसाइट के लिंक होते हैं। फ़ोटो 'Media' में मिलती हैं।
   - ML: Links / 'Links'-ൽ വെബ്സൈറ്റ് ലിങ്കുകളാണ്. ഫോട്ടോകൾ 'Media'-യിലാണ്.


## 6. Put a status on WhatsApp
`whatsapp-status` · 2 min

- **English title:** Put a status on WhatsApp
- **Hindi title:** WhatsApp पर स्टेटस लगाएं
- **Malayalam title:** WhatsApp-ൽ സ്റ്റാറ്റസ് ഇടാം

**Takeaways at the end**
- English: Status is in 'Updates' at the bottom | Pencil button = write a text status | Only your contacts see it, and it disappears after 24 hours
- Hindi: स्टेटस नीचे 'Updates' में होता है | पेंसिल वाला बटन = लिखकर स्टेटस | सिर्फ़ आपके contacts देखते हैं, और 24 घंटे में हट जाता है
- Malayalam: സ്റ്റാറ്റസ് താഴെ 'Updates'-ൽ ആണ് | പെൻസിൽ ബട്ടൺ = എഴുതി സ്റ്റാറ്റസ് ഇടാൻ | നിങ്ങളുടെ കോൺടാക്റ്റുകൾ മാത്രം കാണും, 24 മണിക്കൂറിന് ശേഷം മാഞ്ഞുപോകും

**"Now try it for real" line**
- English: Put a real good morning wish as your status on WhatsApp, and ask your family to check it.
- Hindi: अपने असली WhatsApp पर सुप्रभात की शुभकामना का स्टेटस लगाइए, और परिवार से पूछिए कि उन्हें दिखा या नहीं।
- Malayalam: WhatsApp-ൽ ശരിക്കും ഒരു ആശംസ സ്റ്റാറ്റസ് ആയി ഇടൂ, വീട്ടുകാരോട് അത് കണ്ടോ എന്ന് ചോദിക്കൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Good morning! Today we'll put a 'Good Morning' status on WhatsApp. All your contacts can see it. This is practice. Nothing will be posted.

**Voice (Hindi):** सुप्रभात! आज हम WhatsApp पर 'Good Morning' स्टेटस लगाना सीखेंगे। आपके सब लोग उसे देख सकेंगे। यह अभ्यास है। कुछ भी पोस्ट नहीं होगा।

**Voice (Malayalam):** സുപ്രഭാതം! ഇന്ന് WhatsApp-ൽ 'Good Morning' സ്റ്റാറ്റസ് ഇടാൻ പഠിക്കാം. നിങ്ങളുടെ എല്ലാ കോൺടാക്റ്റുകൾക്കും അത് കാണാം. ഇത് പരിശീലനം മാത്രം. ഒന്നും പോസ്റ്റ് ആകില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങൂ


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-whatsapp_

**Voice (English):** Find the WhatsApp icon on your phone. It is green, with a white phone in the middle. The name is written under it. Tap it.

**Voice (Hindi):** फ़ोन में WhatsApp का निशान ढूंढिए। वह हरा है, बीच में सफ़ेद फ़ोन है। नीचे नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ WhatsApp അടയാളം കണ്ടെത്തൂ. അത് പച്ച നിറമാണ്, നടുവിൽ വെള്ള ഫോൺ ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `open-updates`
_kind: tap · screen: wa-chats · tap target: nav-updates_

**Voice (English):** Status is kept in 'Updates'. Tap 'Updates' at the bottom.

**Voice (Hindi):** स्टेटस 'Updates' में होता है। नीचे 'Updates' दबाइए।

**Voice (Malayalam):** സ്റ്റാറ്റസ് 'Updates'-ൽ ആണ്. താഴെയുള്ള 'Updates' അമർത്തൂ.

**Hint (English):** Tap 'Updates' at the bottom, second from the left.

**Hint (Hindi):** नीचे बाईं तरफ़ से दूसरा, 'Updates' दबाइए।

**Hint (Malayalam):** താഴെ ഇടത്തുനിന്ന് രണ്ടാമത്തെ, 'Updates', അമർത്തൂ.


### Step 3: `pencil`
_kind: tap · screen: wa-updates · tap target: pencil_

**Voice (English):** To write a status, tap the small pencil button at the bottom right. It is just above the green camera button.

**Voice (Hindi):** स्टेटस लिखने के लिए नीचे दाईं तरफ़ छोटा पेंसिल बटन दबाइए। वह हरे कैमरा बटन के ठीक ऊपर है।

**Voice (Malayalam):** സ്റ്റാറ്റസ് എഴുതാൻ താഴെ വലതുവശത്തെ ചെറിയ പെൻസിൽ ബട്ടൺ അമർത്തൂ. അത് പച്ച ക്യാമറ ബട്ടണിന് തൊട്ടു മുകളിലാണ്.

**Hint (English):** Tap the small grey pencil button, above the green one.

**Hint (Hindi):** हरे बटन के ऊपर छोटा सलेटी पेंसिल वाला बटन दबाइए।

**Hint (Malayalam):** പച്ച ബട്ടണിന് മുകളിലെ ചെറിയ ചാര നിറമുള്ള പെൻസിൽ ബട്ടൺ അമർത്തൂ.


### Step 4: `type`
_kind: tap · screen: wa-text-status · tap target: text-area_

**Voice (English):** Tap in the middle to write your wish. For practice, just tap and we'll type it for you.

**Voice (Hindi):** बीच में दबाकर अपनी शुभकामना लिखिए। अभ्यास में बस दबाइए, हम आपके लिए लिख देंगे।

**Voice (Malayalam):** ആശംസ എഴുതാൻ നടുവിൽ അമർത്തൂ. പരിശീലനത്തിന്, വെറുതെ അമർത്തിയാൽ മതി, ഞങ്ങൾ എഴുതിത്തരാം.

**Hint (English):** Tap where it says 'Type a status'.

**Hint (Hindi):** जहाँ 'Type a status' लिखा है, वहाँ दबाइए।

**Hint (Malayalam):** 'Type a status' എന്ന് എഴുതിയിടത്ത് അമർത്തൂ.


### Step 5: `colour`
_kind: tap · screen: wa-text-status · tap target: palette_

**Voice (English):** Nice! Want a different colour? Tap the palette icon at the top right.

**Voice (Hindi):** बढ़िया! रंग बदलना है? ऊपर दाईं तरफ़ रंगों वाला निशान दबाइए।

**Voice (Malayalam):** നന്നായി! വേറെ നിറം വേണോ? മുകളിൽ വലതുവശത്തെ നിറങ്ങളുടെ അടയാളം അമർത്തൂ.

**Hint (English):** Tap the palette icon at the top right corner.

**Hint (Hindi):** ऊपर दाएं कोने में रंगों वाला निशान दबाइए।

**Hint (Malayalam):** മുകളിൽ വലത്തേ മൂലയിലെ നിറങ്ങളുടെ അടയാളം അമർത്തൂ.


### Step 6: `send`
_kind: tap · screen: wa-text-status · tap target: send_

**Voice (English):** Now tap the green send button at the bottom right.

**Voice (Hindi):** अब नीचे दाईं तरफ़ हरा भेजने वाला बटन दबाइए।

**Voice (Malayalam):** ഇനി താഴെ വലതുവശത്തെ പച്ച അയക്കൽ ബട്ടൺ അമർത്തൂ.

**Hint (English):** Tap the round green button at the bottom right.

**Hint (Hindi):** नीचे दाईं तरफ़ गोल हरा बटन दबाइए।

**Hint (Malayalam):** താഴെ വലതുവശത്തെ പച്ച വട്ട ബട്ടൺ അമർത്തൂ.


### Step 7: `who-sees`
_kind: quiz · screen: wa-updates_

**Voice (English):** Your status is up! Who can see it?

**Voice (Hindi):** आपका स्टेटस लग गया! इसे कौन देख सकता है?

**Voice (Malayalam):** നിങ്ങളുടെ സ്റ്റാറ്റസ് ഇട്ടു! ആർക്കൊക്കെ അത് കാണാം?

**Answers:**
1. Everyone on WhatsApp
   - EN why: No, only your contacts can see it, and it disappears after 24 hours.
   - HI: WhatsApp पर सब लोग / नहीं, सिर्फ़ आपके contacts देख सकते हैं, और 24 घंटे में हट जाता है।
   - ML: WhatsApp-ലെ എല്ലാവർക്കും / അല്ല, നിങ്ങളുടെ കോൺടാക്റ്റുകൾക്ക് മാത്രം കാണാം, 24 മണിക്കൂറിന് ശേഷം മാഞ്ഞുപോകും.
2. (correct) My contacts, for 24 hours
   - EN why: Right! Your contacts can see it, and it disappears after 24 hours.
   - HI: मेरे contacts, 24 घंटे तक / सही! आपके contacts इसे देख सकते हैं, और यह 24 घंटे में हट जाता है।
   - ML: എന്റെ കോൺടാക്റ്റുകൾക്ക്, 24 മണിക്കൂർ / ശരി! നിങ്ങളുടെ കോൺടാക്റ്റുകൾക്ക് കാണാം, 24 മണിക്കൂറിന് ശേഷം മാഞ്ഞുപോകും.


## 7. Make a video call on WhatsApp
`video-call` · 2 min

- **English title:** Make a video call on WhatsApp
- **Hindi title:** WhatsApp पर वीडियो कॉल करें
- **Malayalam title:** WhatsApp-ൽ വീഡിയോ കോൾ ചെയ്യാം

**Takeaways at the end**
- English: Open the chat, then tap the video camera at the top | Flip the camera to show what is in front of you | Red button ends the call. Police never do 'digital arrest' on video calls
- Hindi: चैट खोलें, फिर ऊपर वीडियो कैमरा दबाएं | सामने की चीज़ दिखाने के लिए कैमरा पलटें | लाल बटन से कॉल बंद होती है। पुलिस वीडियो कॉल पर 'डिजिटल अरेस्ट' नहीं करती
- Malayalam: ചാറ്റ് തുറന്ന്, മുകളിലെ വീഡിയോ ക്യാമറ അമർത്തൂ | മുന്നിലുള്ളത് കാണിക്കാൻ ക്യാമറ തിരിക്കൂ | ചുവന്ന ബട്ടൺ കോൾ അവസാനിപ്പിക്കും. പോലീസ് ഒരിക്കലും വീഡിയോ കോളിൽ 'ഡിജിറ്റൽ അറസ്റ്റ്' ചെയ്യില്ല

**"Now try it for real" line**
- English: Video call your son or daughter on your real WhatsApp, and show them something with the back camera.
- Hindi: अपने असली WhatsApp से बेटे या बेटी को वीडियो कॉल कीजिए, और पीछे वाले कैमरे से कुछ दिखाइए।
- Malayalam: യഥാർത്ഥ WhatsApp-ൽ മകനെയോ മകളെയോ വീഡിയോ കോൾ ചെയ്യൂ, പിന്നിലെ ക്യാമറ കൊണ്ട് എന്തെങ്കിലും കാണിക്കൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Today we'll video call your son Rahul on WhatsApp. This is practice. No real call will go.

**Voice (Hindi):** आज हम WhatsApp पर आपके बेटे राहुल को वीडियो कॉल करना सीखेंगे। यह अभ्यास है। असली कॉल नहीं जाएगी।

**Voice (Malayalam):** ഇന്ന് WhatsApp-ൽ നിങ്ങളുടെ മകൻ രാഹുലിനെ വീഡിയോ കോൾ ചെയ്യാൻ പഠിക്കാം. ഇത് പരിശീലനം മാത്രം. യഥാർത്ഥ കോൾ പോകില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങൂ


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-whatsapp_

**Voice (English):** Find the WhatsApp icon on your phone. It is green, with a white phone in the middle. The name is written under it. Tap it.

**Voice (Hindi):** फ़ोन में WhatsApp का निशान ढूंढिए। वह हरा है, बीच में सफ़ेद फ़ोन है। नीचे नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ WhatsApp അടയാളം കണ്ടെത്തൂ. അത് പച്ച നിറമാണ്, നടുവിൽ വെള്ള ഫോൺ ഉണ്ട്. താഴെ പേര് എഴുതിയിരിക്കും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `open-chat`
_kind: tap · screen: wa-chats · tap target: chat-rahul_

**Voice (English):** Open Rahul's chat. Tap 'Rahul (Beta)'.

**Voice (Hindi):** राहुल की चैट खोलिए। 'Rahul (Beta)' दबाइए।

**Voice (Malayalam):** Rahul-ന്റെ ചാറ്റ് തുറക്കൂ. 'Rahul (Beta)' അമർത്തൂ.

**Hint (English):** Tap the 'Rahul (Beta)' row.

**Hint (Hindi):** 'Rahul (Beta)' वाली लाइन दबाइए।

**Hint (Malayalam):** 'Rahul (Beta)' എന്ന വരി അമർത്തൂ.


### Step 3: `video-icon`
_kind: tap · screen: wa-chat · tap target: video-call_

**Voice (English):** At the top right, there are two icons: a video camera and a phone. Tap the video camera.

**Voice (Hindi):** ऊपर दाईं तरफ़ दो निशान हैं: वीडियो कैमरा और फ़ोन। वीडियो कैमरा दबाइए।

**Voice (Malayalam):** മുകളിൽ വലതുവശത്ത് രണ്ട് അടയാളങ്ങൾ ഉണ്ട്: വീഡിയോ ക്യാമറയും ഫോണും. വീഡിയോ ക്യാമറ അമർത്തൂ.

**Hint (English):** Tap the video camera icon at the top right.

**Hint (Hindi):** ऊपर दाईं तरफ़ वीडियो कैमरा वाला निशान दबाइए।

**Hint (Malayalam):** മുകളിൽ വലതുവശത്തെ വീഡിയോ ക്യാമറ അടയാളം അമർത്തൂ.


### Step 4: `ringing`
_kind: info · screen: wa-calling_

**Voice (English):** It's ringing. You can see yourself on the screen. Wait for Rahul to pick up.

**Voice (Hindi):** घंटी जा रही है। स्क्रीन पर आप खुद को देख सकते हैं। राहुल के फ़ोन उठाने का इंतज़ार कीजिए।

**Voice (Malayalam):** റിംഗ് ചെയ്യുന്നു. സ്ക്രീനിൽ നിങ്ങളെ കാണാം. Rahul എടുക്കുന്നത് വരെ കാത്തിരിക്കൂ.

**Button:** English: Rahul picked up · Hindi: राहुल ने फ़ोन उठा लिया · Malayalam: Rahul എടുത്തു


### Step 5: `flip`
_kind: tap · screen: wa-video · tap target: flip_

**Voice (English):** Rahul is on the call! Let us show him a plant in front of you. Tap the button that turns the camera around.

**Voice (Hindi):** राहुल कॉल पर हैं! आपके सामने जो पौधा है, वो उन्हें दिखाते हैं। कैमरा घुमाने वाला बटन दबाइए।

**Voice (Malayalam):** രാഹുൽ കോളിൽ ഉണ്ട്! നിങ്ങളുടെ മുന്നിലെ ചെടി അവനെ കാണിക്കാം. ക്യാമറ തിരിക്കുന്ന ബട്ടൺ അമർത്തൂ.

**Hint (English):** Tap the button with two curved arrows, on your own small picture at the bottom right.

**Hint (Hindi):** नीचे दाईं तरफ़ आपकी छोटी तस्वीर पर, दो घूमे हुए तीरों वाला बटन दबाइए।

**Hint (Malayalam):** താഴെ വലതുവശത്ത് നിങ്ങളുടെ ചെറിയ ചിത്രത്തിൽ, രണ്ട് വളഞ്ഞ അമ്പടയാളങ്ങളുള്ള ബട്ടൺ അമർത്തൂ.


### Step 6: `end`
_kind: tap · screen: wa-video · tap target: end_

**Voice (English):** Now Rahul sees your plant. When you are done talking, tap the red button to end the call.

**Voice (Hindi):** अब राहुल आपका पौधा देख रहे हैं। बात पूरी हो जाए, तो कॉल बंद करने के लिए लाल बटन दबाइए।

**Voice (Malayalam):** ഇപ്പോൾ Rahul നിങ്ങളുടെ ചെടി കാണുന്നു. സംസാരിച്ചു കഴിഞ്ഞാൽ, കോൾ അവസാനിപ്പിക്കാൻ ചുവന്ന ബട്ടൺ അമർത്തൂ.

**Hint (English):** Tap the red button at the bottom right.

**Hint (Hindi):** नीचे दाईं तरफ़ लाल बटन दबाइए।

**Hint (Malayalam):** താഴെ വലതുവശത്തെ ചുവന്ന ബട്ടൺ അമർത്തൂ.


### Step 7: `digital-arrest`
_kind: quiz · screen: wa-chats_

**Voice (English):** Be careful. A video call comes from a man in police uniform. He says you are under 'digital arrest' and must pay money. What do you do?

**Voice (Hindi):** सावधान! पुलिस की वर्दी में एक आदमी वीडियो कॉल करता है। कहता है कि आप 'डिजिटल अरेस्ट' में हैं और पैसे देने होंगे। आप क्या करेंगे?

**Voice (Malayalam):** ശ്രദ്ധിക്കൂ! പോലീസ് യൂണിഫോമിൽ ഒരാൾ വീഡിയോ കോൾ ചെയ്യുന്നു. നിങ്ങൾ 'ഡിജിറ്റൽ അറസ്റ്റിൽ' ആണെന്നും പണം അടയ്ക്കണമെന്നും പറയുന്നു. നിങ്ങൾ എന്ത് ചെയ്യും?

**Answers:**
1. Pay so I am not arrested
   - EN why: No! There is no such thing as 'digital arrest'. Police never arrest anyone or ask for money on a video call.
   - HI: पैसे दे दूँ, ताकि गिरफ़्तारी न हो / नहीं! 'डिजिटल अरेस्ट' जैसी कोई चीज़ नहीं होती। पुलिस वीडियो कॉल पर न गिरफ़्तार करती है, न पैसे मांगती है।
   - ML: അറസ്റ്റ് ഒഴിവാക്കാൻ പണം അടയ്ക്കാം / അരുത്! 'ഡിജിറ്റൽ അറസ്റ്റ്' എന്നൊന്നില്ല. പോലീസ് ഒരിക്കലും വീഡിയോ കോളിൽ ആരെയും അറസ്റ്റ് ചെയ്യുകയോ പണം ചോദിക്കുകയോ ഇല്ല.
2. (correct) Cut the call and tell my family
   - EN why: Exactly right. Cut the call, tell your family, and you can report it on 1930, the cyber crime helpline.
   - HI: कॉल काटूँ और परिवार को बताऊँ / बिल्कुल सही। कॉल काटिए, परिवार को बताइए, और 1930 साइबर क्राइम हेल्पलाइन पर शिकायत कर सकते हैं।
   - ML: കോൾ കട്ട് ചെയ്ത് വീട്ടുകാരോട് പറയാം / തികച്ചും ശരി. കോൾ കട്ട് ചെയ്യൂ, വീട്ടുകാരോട് പറയൂ, സൈബർ ക്രൈം ഹെൽപ്ലൈനായ 1930-ൽ റിപ്പോർട്ട് ചെയ്യാം.



---

# Uber

## 8. Book a cab with Uber
`uber-cab` · 3 min

- **English title:** Book a cab with Uber
- **Hindi title:** Uber से कैब बुक करें
- **Malayalam title:** Uber-ൽ കാബ് ബുക്ക് ചെയ്യാം

**Takeaways at the end**
- English: Start with the big 'Where to?' box | The fare is shown before you book | Match the car number before you get in, then share your trip
- Hindi: बड़े 'Where to?' वाले डिब्बे से शुरू करें | किराया बुक करने से पहले दिख जाता है | बैठने से पहले गाड़ी का नंबर मिलाएं, फिर अपनी यात्रा share करें
- Malayalam: വലിയ 'Where to?' പെട്ടിയിൽ നിന്ന് തുടങ്ങൂ | ബുക്ക് ചെയ്യുന്നതിന് മുമ്പ് ചാർജ് കാണിക്കും | കയറുന്നതിന് മുമ്പ് കാറിന്റെ നമ്പർ ഒത്തുനോക്കൂ, എന്നിട്ട് യാത്ര ഷെയർ ചെയ്യൂ

**"Now try it for real" line**
- English: Next time you need a cab, book it on your real Uber with the same steps. Share the trip with family.
- Hindi: अगली बार कैब चाहिए, तो अपने असली Uber पर ऐसे ही बुक कीजिए। यात्रा परिवार के साथ share कीजिए।
- Malayalam: അടുത്ത തവണ കാബ് വേണമെങ്കിൽ, യഥാർത്ഥ Uber-ൽ ഇതേ ഘട്ടങ്ങളിലൂടെ ബുക്ക് ചെയ്യൂ. യാത്ര വീട്ടുകാരുമായി ഷെയർ ചെയ്യൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Today we'll book an Uber cab to City Hospital, and share the trip with family. This is only practice. No cab will come. No money is spent.

**Voice (Hindi):** आज हम Uber से सिटी हॉस्पिटल के लिए कैब बुक करेंगे, और सफ़र परिवार को दिखाएंगे। यह सिर्फ़ अभ्यास है। कोई कैब नहीं आएगी। पैसे नहीं लगेंगे।

**Voice (Malayalam):** ഇന്ന് Uber-ൽ സിറ്റി ഹോസ്പിറ്റലിലേക്ക് ക്യാബ് ബുക്ക് ചെയ്യാം, യാത്ര വീട്ടുകാരുമായി പങ്കിടാം. ഇത് പരിശീലനം മാത്രം. ക്യാബ് വരില്ല. പണം പോകില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങൂ


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-uber_

**Voice (English):** Find the Uber icon on your phone. It is black, with the word 'Uber' in white. The name is written under it too. Tap it.

**Voice (Hindi):** फ़ोन में Uber का निशान ढूंढिए। वह काला है, उस पर सफ़ेद में 'Uber' लिखा है। नीचे भी नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ Uber അടയാളം കണ്ടെത്തൂ. അത് കറുപ്പ് നിറമാണ്, വെള്ള അക്ഷരത്തിൽ 'Uber' എന്ന് എഴുതിയിട്ടുണ്ട്. താഴെയും പേര് ഉണ്ടാകും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `where`
_kind: tap · screen: ub-home · tap target: where_

**Voice (English):** This is Uber. Tap the big grey box that says 'Where to?'.

**Voice (Hindi):** यह Uber है। 'Where to?' लिखे बड़े सलेटी डिब्बे को दबाइए।

**Voice (Malayalam):** ഇതാണ് Uber. 'Where to?' എന്നെഴുതിയ വലിയ ചാര നിറമുള്ള പെട്ടി അമർത്തൂ.

**Hint (English):** Tap the grey box near the top, with 'Where to?' in it.

**Hint (Hindi):** ऊपर सलेटी डिब्बा, जिसमें 'Where to?' लिखा है, उसे दबाइए।

**Hint (Malayalam):** മുകളിൽ 'Where to?' എന്നെഴുതിയ ചാര നിറമുള്ള പെട്ടി അമർത്തൂ.


### Step 3: `place`
_kind: tap · screen: ub-search · tap target: place_

**Voice (English):** Uber already knows where you are. Now choose where you are going. Tap 'City Hospital'.

**Voice (Hindi):** Uber को पता है कि आप अभी कहाँ हैं। अब बताइए कहाँ जाना है। 'City Hospital' दबाइए।

**Voice (Malayalam):** നിങ്ങൾ എവിടെയാണെന്ന് Uber-ന് അറിയാം. ഇനി എവിടേക്കാണ് പോകേണ്ടതെന്ന് തിരഞ്ഞെടുക്കൂ. 'City Hospital' അമർത്തൂ.

**Hint (English):** Tap 'City Hospital', the first place in the list.

**Hint (Hindi):** लिस्ट में पहली जगह, 'City Hospital', दबाइए।

**Hint (Malayalam):** ലിസ്റ്റിലെ ആദ്യത്തെ സ്ഥലം, 'City Hospital', അമർത്തൂ.


### Step 4: `pick-ride`
_kind: tap · screen: ub-rides · tap target: ride-go_

**Voice (English):** Uber shows the rides and their fares before you book. Go Non AC is an everyday car for 186 rupees. Tap 'Go Non AC'.

**Voice (Hindi):** बुक करने से पहले Uber गाड़ियाँ और उनका किराया दिखाता है। Go Non AC रोज़ की कार है, 186 रुपये। 'Go Non AC' दबाइए।

**Voice (Malayalam):** ബുക്ക് ചെയ്യുന്നതിന് മുമ്പ് വണ്ടികളും അവയുടെ ചാർജും Uber കാണിക്കും. Go Non AC സാധാരണ കാറാണ്, 186 രൂപ. 'Go Non AC' അമർത്തൂ.

**Hint (English):** Tap the third row, 'Go Non AC', 186 rupees.

**Hint (Hindi):** तीसरी लाइन, 'Go Non AC', 186 रुपये, दबाइए।

**Hint (Malayalam):** മൂന്നാമത്തെ വരി, 'Go Non AC', 186 രൂപ, അമർത്തൂ.


### Step 5: `choose`
_kind: tap · screen: ub-rides · tap target: choose_

**Voice (English):** It says 'Cash' at the bottom, so you pay the driver in cash at the end. Now tap the black 'Choose Go Non AC' button.

**Voice (Hindi):** नीचे 'Cash' लिखा है, यानी पैसे आख़िर में ड्राइवर को नकद देंगे। अब काला 'Choose Go Non AC' बटन दबाइए।

**Voice (Malayalam):** താഴെ 'Cash' എന്നുണ്ട്, അതായത് അവസാനം ഡ്രൈവർക്ക് പണമായി കൊടുക്കാം. ഇനി കറുത്ത 'Choose Go Non AC' ബട്ടൺ അമർത്തൂ.

**Hint (English):** Tap the long black button at the bottom.

**Hint (Hindi):** सबसे नीचे लंबा काला बटन दबाइए।

**Hint (Malayalam):** താഴെയുള്ള നീണ്ട കറുത്ത ബട്ടൺ അമർത്തൂ.


### Step 6: `confirm`
_kind: tap · screen: ub-pickup · tap target: confirm_

**Voice (English):** Uber asks where to pick you up. The pin is on your gate. Tap 'Confirm pickup'.

**Voice (Hindi):** Uber पूछता है कि आपको कहाँ से लेना है। निशान आपके गेट पर है। 'Confirm pickup' दबाइए।

**Voice (Malayalam):** നിങ്ങളെ എവിടെ നിന്ന് കയറ്റണമെന്ന് Uber ചോദിക്കുന്നു. അടയാളം നിങ്ങളുടെ ഗേറ്റിലാണ്. 'Confirm pickup' അമർത്തൂ.

**Hint (English):** Tap the black 'Confirm pickup' button at the bottom.

**Hint (Hindi):** नीचे काला 'Confirm pickup' बटन दबाइए।

**Hint (Malayalam):** താഴെയുള്ള കറുത്ത 'Confirm pickup' ബട്ടൺ അമർത്തൂ.


### Step 7: `check-car`
_kind: quiz · screen: ub-driver_

**Voice (English):** Your driver Rakesh is coming in a white Swift Dzire, number D L 3 C A B 1 2 3 4. A white car stops near you. What do you do first?

**Voice (Hindi):** आपके ड्राइवर राकेश सफ़ेद Swift Dzire में आ रहे हैं, नंबर D L 3 C A B 1 2 3 4। एक सफ़ेद गाड़ी आपके पास रुकती है। सबसे पहले क्या करेंगे?

**Voice (Malayalam):** നിങ്ങളുടെ ഡ്രൈവർ രാകേഷ് വെള്ള Swift Dzire-ൽ വരുന്നു, നമ്പർ D L 3 C A B 1 2 3 4. ഒരു വെള്ള കാർ നിങ്ങളുടെ അടുത്ത് നിർത്തുന്നു. ആദ്യം എന്ത് ചെയ്യും?

**Answers:**
1. (correct) Match the number plate with the app
   - EN why: Exactly! Many cars look alike. Only get in if the number matches the one in the app.
   - HI: गाड़ी का नंबर ऐप से मिलाऊँ / बिल्कुल सही! कई गाड़ियाँ एक जैसी दिखती हैं। नंबर ऐप वाले से मिले, तभी बैठिए।
   - ML: നമ്പർ പ്ലേറ്റ് ആപ്പുമായി ഒത്തുനോക്കാം / തികച്ചും ശരി! പല കാറുകളും ഒരുപോലെയിരിക്കും. ആപ്പിലെ നമ്പറുമായി ഒത്തുവന്നാൽ മാത്രം കയറൂ.
2. It's white, so just get in
   - EN why: Careful. Many cars are white. Always match the number plate first.
   - HI: सफ़ेद है, बस बैठ जाऊँ / ध्यान दीजिए। बहुत सी गाड़ियाँ सफ़ेद होती हैं। पहले हमेशा नंबर मिलाइए।
   - ML: വെള്ളയാണല്ലോ, കയറാം / ശ്രദ്ധിക്കൂ. പല കാറുകളും വെള്ളയാണ്. എപ്പോഴും ആദ്യം നമ്പർ പ്ലേറ്റ് ഒത്തുനോക്കൂ.


### Step 8: `ride-pin`
_kind: quiz · screen: ub-driver_

**Voice (English):** The app shows your PIN, 4821. The driver needs it to start the ride. When is it okay to tell it?

**Voice (Hindi):** ऐप में आपका PIN दिख रहा है, 4821। सवारी शुरू करने के लिए ड्राइवर को यह चाहिए। इसे कब बताना ठीक है?

**Voice (Malayalam):** ആപ്പിൽ നിങ്ങളുടെ PIN, 4821, കാണിക്കുന്നു. യാത്ര തുടങ്ങാൻ ഡ്രൈവർക്ക് അത് വേണം. എപ്പോഴാണ് അത് പറയേണ്ടത്?

**Answers:**
1. When someone calls and asks for it
   - EN why: No. Never tell it on a phone call. Tell it only to the driver, inside the right car.
   - HI: जब कोई फ़ोन करके पूछे / नहीं। फ़ोन पर कभी मत बताइए। सिर्फ़ सही गाड़ी में बैठकर, ड्राइवर को बताइए।
   - ML: ആരെങ്കിലും വിളിച്ച് ചോദിക്കുമ്പോൾ / അല്ല. ഫോൺ കോളിൽ ഒരിക്കലും പറയരുത്. ശരിയായ കാറിനുള്ളിൽ, ഡ്രൈവറോട് മാത്രം പറയൂ.
2. (correct) Only after I sit in the right car
   - EN why: Right! The PIN makes sure you are in the right car with the right driver.
   - HI: सही गाड़ी में बैठने के बाद ही / सही! PIN से पक्का होता है कि आप सही गाड़ी में, सही ड्राइवर के साथ हैं।
   - ML: ശരിയായ കാറിൽ കയറിയ ശേഷം മാത്രം / ശരി! നിങ്ങൾ ശരിയായ കാറിൽ ശരിയായ ഡ്രൈവറുടെ കൂടെയാണെന്ന് PIN ഉറപ്പാക്കുന്നു.


### Step 9: `share`
_kind: tap · screen: ub-driver · tap target: share_

**Voice (English):** Last, let your family follow your ride. We pulled the panel up for you. Next to 'Share trip status', tap 'Share'.

**Voice (Hindi):** आख़िर में, परिवार को आपकी यात्रा दिखती रहे। पैनल ऊपर खींच दिया है। 'Share trip status' के पास 'Share' दबाइए।

**Voice (Malayalam):** അവസാനമായി, വീട്ടുകാർക്ക് നിങ്ങളുടെ യാത്ര കാണിക്കാം. പാനൽ മുകളിലേക്ക് വലിച്ചിട്ടുണ്ട്. 'Share trip status'-ന് അടുത്തുള്ള 'Share' അമർത്തൂ.

**Hint (English):** Tap 'Share', next to 'Share trip status'.

**Hint (Hindi):** 'Share trip status' के पास 'Share' दबाइए।

**Hint (Malayalam):** 'Share trip status'-ന് അടുത്തുള്ള 'Share' അമർത്തൂ.


### Step 10: `contact`
_kind: tap · screen: ub-share · tap target: contact_

**Voice (English):** Choose who to send it to. Tap 'Sunita'.

**Voice (Hindi):** किसे भेजना है, चुनिए। 'Sunita' दबाइए।

**Voice (Malayalam):** ആർക്കാണ് അയക്കേണ്ടതെന്ന് തിരഞ്ഞെടുക്കൂ. 'Sunita' അമർത്തൂ.

**Hint (English):** Tap the pink circle with 'S', Sunita.

**Hint (Hindi):** गुलाबी गोले वाला 'S', सुनीता, दबाइए।

**Hint (Malayalam):** 'S' എന്നെഴുതിയ പിങ്ക് വട്ടം, Sunita, അമർത്തൂ.


### Step 11: `shared`
_kind: info · screen: ub-driver_

**Voice (English):** Shared! Sunita can now see your car and where you are, until you reach. Well done.

**Voice (Hindi):** Share हो गया! अब सुनीता आपकी गाड़ी और आप कहाँ हैं, पहुँचने तक देख सकती हैं। शाबाश।

**Voice (Malayalam):** ഷെയർ ചെയ്തു! എത്തുന്നത് വരെ Sunita-ക്ക് നിങ്ങളുടെ കാറും നിങ്ങൾ എവിടെയാണെന്നും കാണാം. വളരെ നന്നായി.

**Button:** English: Finish · Hindi: पूरा करें · Malayalam: പൂർത്തിയാക്കൂ


## 9. Cancel a ride
`gd-uber-cancel` · 2 min

- **English title:** Cancel a ride
- **Hindi title:** राइड रद्द करें
- **Malayalam title:** റൈഡ് റദ്ദാക്കാം

**Takeaways at the end**
- English: Cancel a ride | Go slowly, one step at a time | If you are unsure, ask family before you tap
- Hindi: राइड रद्द करें | आराम से, एक-एक कदम | अगर पक्का नहीं हैं, तो दबाने से पहले परिवार से पूछिए
- Malayalam: റൈഡ് റദ്ദാക്കാം | സാവധാനം, ഓരോ ഘട്ടമായി | ഉറപ്പില്ലെങ്കിൽ അമർത്തുന്നതിന് മുമ്പ് വീട്ടിൽ ചോദിക്കൂ

**"Now try it for real" line**
- English: Try it on a short ride first. Share your trip with family before you get in.
- Hindi: पहले छोटी राइड पर आज़माइए। बैठने से पहले यात्रा परिवार को भेज दीजिए।
- Malayalam: ആദ്യം ഒരു ചെറിയ യാത്രയിൽ ശ്രമിക്കൂ. കയറുന്നതിന് മുമ്പ് യാത്ര വീട്ടുകാർക്ക് പങ്കിടൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Let's practise: Cancel a ride. This is only practice, nothing real happens.

**Voice (Hindi):** चलिए अभ्यास करें: राइड रद्द करें। यह सिर्फ़ अभ्यास है, कुछ असली नहीं होगा।

**Voice (Malayalam):** നമുക്ക് പരിശീലിക്കാം: റൈഡ് റദ്ദാക്കാം. ഇത് പരിശീലനം മാത്രമാണ്, യഥാർത്ഥത്തിൽ ഒന്നും നടക്കില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങാം


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-uber_

**Voice (English):** Find the Uber icon on your phone. It is black, with the word 'Uber' in white. The name is written under it too. Tap it.

**Voice (Hindi):** फ़ोन में Uber का निशान ढूंढिए। वह काला है, उस पर सफ़ेद में 'Uber' लिखा है। नीचे भी नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ Uber അടയാളം കണ്ടെത്തൂ. അത് കറുപ്പ് നിറമാണ്, വെള്ള അക്ഷരത്തിൽ 'Uber' എന്ന് എഴുതിയിട്ടുണ്ട്. താഴെയും പേര് ഉണ്ടാകും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `s0-0`
_kind: info · screen: kit / ub-driver_

**Voice (English):** While your ride is booked, swipe the bottom panel up. Tap "Cancel ride".

**Voice (Hindi):** राइड बुक होने पर नीचे का पैनल ऊपर खींचिए। "Cancel ride" दबाइए।

**Voice (Malayalam):** റൈഡ് ബുക്ക് ചെയ്തിരിക്കുമ്പോൾ താഴത്തെ പാനൽ മുകളിലേക്ക് വലിക്കൂ. "Cancel ride" അമർത്തൂ.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 3: `s0-1`
_kind: tap · screen: kit / ub-driver · tap target: cancel_

**Voice (English):** While your ride is booked, swipe the bottom panel up. Tap "Cancel ride".

**Voice (Hindi):** राइड बुक होने पर नीचे का पैनल ऊपर खींचिए। "Cancel ride" दबाइए।

**Voice (Malayalam):** റൈഡ് ബുക്ക് ചെയ്തിരിക്കുമ്പോൾ താഴത്തെ പാനൽ മുകളിലേക്ക് വലിക്കൂ. "Cancel ride" അമർത്തൂ.

**Hint (English):** While your ride is booked, swipe the bottom panel up. Tap "Cancel ride".

**Hint (Hindi):** राइड बुक होने पर नीचे का पैनल ऊपर खींचिए। "Cancel ride" दबाइए।

**Hint (Malayalam):** റൈഡ് ബുക്ക് ചെയ്തിരിക്കുമ്പോൾ താഴത്തെ പാനൽ മുകളിലേക്ക് വലിക്കൂ. "Cancel ride" അമർത്തൂ.


### Step 4: `s1`
_kind: tap · screen: kit / ub-cancel · tap target: yes_

**Voice (English):** Uber may offer to find another driver. To cancel, tap "YES, CANCEL". If a fee applies, the app shows it first.

**Voice (Hindi):** Uber दूसरा ड्राइवर ढूँढने को कह सकता है। रद्द करने के लिए "YES, CANCEL" दबाइए। कोई शुल्क हो तो ऐप पहले दिखाता है।

**Voice (Malayalam):** Uber മറ്റൊരു ഡ്രൈവറെ കണ്ടെത്താമെന്ന് പറഞ്ഞേക്കാം. റദ്ദാക്കാൻ "YES, CANCEL" അമർത്തൂ. ഫീസ് ഉണ്ടെങ്കിൽ ആപ്പ് ആദ്യം കാണിക്കും.

**Hint (English):** Tap "YES, CANCEL".

**Hint (Hindi):** "YES, CANCEL" दबाइए।

**Hint (Malayalam):** "YES, CANCEL" അമർത്തൂ.


### Step 5: `s2`
_kind: tap · screen: kit / ub-why · tap target: reason_

**Voice (English):** Choose why you are cancelling. The ride is cancelled.

**Voice (Hindi):** रद्द करने का कारण चुनिए। राइड रद्द हो जाती है।

**Voice (Malayalam):** റദ്ദാക്കുന്നതിന്റെ കാരണം തിരഞ്ഞെടുക്കൂ. റൈഡ് റദ്ദാകും.

**Hint (English):** Choose why you are cancelling. The ride is cancelled.

**Hint (Hindi):** रद्द करने का कारण चुनिए। राइड रद्द हो जाती है।

**Hint (Malayalam):** റദ്ദാക്കുന്നതിന്റെ കാരണം തിരഞ്ഞെടുക്കൂ. റൈഡ് റദ്ദാകും.


### Step 6: `careful`
_kind: info · screen: kit / done_

**Voice (English):** If the driver is already near, you may be charged a small fee.

**Voice (Hindi):** ड्राइवर पहले से पास हो तो थोड़ा शुल्क लग सकता है।

**Voice (Malayalam):** ഡ്രൈവർ അടുത്ത് എത്തിയെങ്കിൽ ചെറിയ ഫീസ് ഈടാക്കിയേക്കാം.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 7: `done`
_kind: info · screen: kit / done_

**Voice (English):** Well done! Before your next ride you know what to check: the car number, and sharing your trip with family.

**Voice (Hindi):** शाबाश! अगली राइड से पहले आपको पता है क्या जाँचना है: गाड़ी का नंबर, और यात्रा परिवार को भेजना।

**Voice (Malayalam):** നന്നായി! അടുത്ത യാത്രയ്ക്ക് മുമ്പ് എന്ത് പരിശോധിക്കണമെന്ന് നിങ്ങൾക്കറിയാം: വണ്ടി നമ്പർ, യാത്ര വീട്ടുകാർക്ക് പങ്കിടുന്നത്.

**Button:** English: Finish · Hindi: पूरा करें · Malayalam: തീർന്നു


## 10. Check the driver and car before you get in
`gd-ride-driver-check` · 2 min

- **English title:** Check the driver and car before you get in
- **Hindi title:** बैठने से पहले ड्राइवर और गाड़ी जाँचिए
- **Malayalam title:** കയറുന്നതിന് മുമ്പ് ഡ്രൈവറെയും വണ്ടിയെയും പരിശോധിക്കാം

**Takeaways at the end**
- English: Check the driver and car before you get in | Go slowly, one step at a time | If you are unsure, ask family before you tap
- Hindi: बैठने से पहले ड्राइवर और गाड़ी जाँचिए | आराम से, एक-एक कदम | अगर पक्का नहीं हैं, तो दबाने से पहले परिवार से पूछिए
- Malayalam: കയറുന്നതിന് മുമ്പ് ഡ്രൈവറെയും വണ്ടിയെയും പരിശോധിക്കാം | സാവധാനം, ഓരോ ഘട്ടമായി | ഉറപ്പില്ലെങ്കിൽ അമർത്തുന്നതിന് മുമ്പ് വീട്ടിൽ ചോദിക്കൂ

**"Now try it for real" line**
- English: Try it on a short ride first. Share your trip with family before you get in.
- Hindi: पहले छोटी राइड पर आज़माइए। बैठने से पहले यात्रा परिवार को भेज दीजिए।
- Malayalam: ആദ്യം ഒരു ചെറിയ യാത്രയിൽ ശ്രമിക്കൂ. കയറുന്നതിന് മുമ്പ് യാത്ര വീട്ടുകാർക്ക് പങ്കിടൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Let's practise: Check the driver and car before you get in. This is only practice, nothing real happens.

**Voice (Hindi):** चलिए अभ्यास करें: बैठने से पहले ड्राइवर और गाड़ी जाँचिए। यह सिर्फ़ अभ्यास है, कुछ असली नहीं होगा।

**Voice (Malayalam):** നമുക്ക് പരിശീലിക്കാം: കയറുന്നതിന് മുമ്പ് ഡ്രൈവറെയും വണ്ടിയെയും പരിശോധിക്കാം. ഇത് പരിശീലനം മാത്രമാണ്, യഥാർത്ഥത്തിൽ ഒന്നും നടക്കില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങാം


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-uber_

**Voice (English):** Find the Uber icon on your phone. It is black, with the word 'Uber' in white. The name is written under it too. Tap it.

**Voice (Hindi):** फ़ोन में Uber का निशान ढूंढिए। वह काला है, उस पर सफ़ेद में 'Uber' लिखा है। नीचे भी नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ Uber അടയാളം കണ്ടെത്തൂ. അത് കറുപ്പ് നിറമാണ്, വെള്ള അക്ഷരത്തിൽ 'Uber' എന്ന് എഴുതിയിട്ടുണ്ട്. താഴെയും പേര് ഉണ്ടാകും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `s0`
_kind: info · screen: kit / ub-driver_

**Voice (English):** When the driver is near, open the app and look at the car number, the car colour and the driver's photo.

**Voice (Hindi):** ड्राइवर पास आए तो ऐप खोलकर गाड़ी का नंबर, रंग और ड्राइवर की फ़ोटो देखिए।

**Voice (Malayalam):** ഡ്രൈവർ അടുത്തെത്തുമ്പോൾ ആപ്പ് തുറന്ന് വണ്ടി നമ്പർ, നിറം, ഡ്രൈവറുടെ ഫോട്ടോ എന്നിവ നോക്കൂ.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 3: `s1`
_kind: info · screen: kit / ub-driver_

**Voice (English):** Match them with the car in front of you before you open the door.

**Voice (Hindi):** दरवाज़ा खोलने से पहले इन्हें सामने की गाड़ी से मिलाइए।

**Voice (Malayalam):** വാതിൽ തുറക്കും മുമ്പ് ഇവ മുന്നിലെ വണ്ടിയുമായി ഒത്തുനോക്കൂ.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 4: `s2`
_kind: info · screen: kit / ub-driver_

**Voice (English):** Ask the driver "Whom are you here for?" Let the driver say your name first.

**Voice (Hindi):** ड्राइवर से पूछिए, "आप किसके लिए आए हैं?" पहले ड्राइवर को आपका नाम बोलने दीजिए।

**Voice (Malayalam):** ഡ്രൈവറോട് "ആർക്കുവേണ്ടിയാണ് വന്നത്?" എന്ന് ചോദിക്കൂ. ആദ്യം ഡ്രൈവർ നിങ്ങളുടെ പേര് പറയട്ടെ.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 5: `s3`
_kind: info · screen: kit / ub-driver_

**Voice (English):** Only then tell the driver your 4-digit code from the app, and get in.

**Voice (Hindi):** उसके बाद ही ऐप वाला 4 अंकों का कोड ड्राइवर को बताइए और बैठिए।

**Voice (Malayalam):** അതിന് ശേഷം മാത്രം ആപ്പിലെ 4 അക്ക കോഡ് ഡ്രൈവറോട് പറഞ്ഞ് കയറൂ.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 6: `careful`
_kind: info · screen: kit / done_

**Voice (English):** If the car or the driver does not match, do not get in. Cancel the ride in the app.

**Voice (Hindi):** गाड़ी या ड्राइवर न मिले तो न बैठिए। ऐप में राइड रद्द कर दीजिए।

**Voice (Malayalam):** വണ്ടിയോ ഡ്രൈവറോ ഒത്തുവന്നില്ലെങ്കിൽ കയറരുത്. ആപ്പിൽ റൈഡ് റദ്ദാക്കൂ.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 7: `done`
_kind: info · screen: kit / done_

**Voice (English):** Well done! Before your next ride you know what to check: the car number, and sharing your trip with family.

**Voice (Hindi):** शाबाश! अगली राइड से पहले आपको पता है क्या जाँचना है: गाड़ी का नंबर, और यात्रा परिवार को भेजना।

**Voice (Malayalam):** നന്നായി! അടുത്ത യാത്രയ്ക്ക് മുമ്പ് എന്ത് പരിശോധിക്കണമെന്ന് നിങ്ങൾക്കറിയാം: വണ്ടി നമ്പർ, യാത്ര വീട്ടുകാർക്ക് പങ്കിടുന്നത്.

**Button:** English: Finish · Hindi: पूरा करें · Malayalam: തീർന്നു


## 11. Pay for a ride and rate it
`gd-ride-pay-upi` · 2 min

- **English title:** Pay for a ride and rate it
- **Hindi title:** राइड के पैसे दें और रेटिंग दें
- **Malayalam title:** റൈഡിന് പണം നൽകി റേറ്റിംഗ് നൽകാം

**Takeaways at the end**
- English: Pay for a ride and rate it | Go slowly, one step at a time | If you are unsure, ask family before you tap
- Hindi: राइड के पैसे दें और रेटिंग दें | आराम से, एक-एक कदम | अगर पक्का नहीं हैं, तो दबाने से पहले परिवार से पूछिए
- Malayalam: റൈഡിന് പണം നൽകി റേറ്റിംഗ് നൽകാം | സാവധാനം, ഓരോ ഘട്ടമായി | ഉറപ്പില്ലെങ്കിൽ അമർത്തുന്നതിന് മുമ്പ് വീട്ടിൽ ചോദിക്കൂ

**"Now try it for real" line**
- English: Try it on a short ride first. Share your trip with family before you get in.
- Hindi: पहले छोटी राइड पर आज़माइए। बैठने से पहले यात्रा परिवार को भेज दीजिए।
- Malayalam: ആദ്യം ഒരു ചെറിയ യാത്രയിൽ ശ്രമിക്കൂ. കയറുന്നതിന് മുമ്പ് യാത്ര വീട്ടുകാർക്ക് പങ്കിടൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Let's practise: Pay for a ride and rate it. This is only practice, nothing real happens.

**Voice (Hindi):** चलिए अभ्यास करें: राइड के पैसे दें और रेटिंग दें। यह सिर्फ़ अभ्यास है, कुछ असली नहीं होगा।

**Voice (Malayalam):** നമുക്ക് പരിശീലിക്കാം: റൈഡിന് പണം നൽകി റേറ്റിംഗ് നൽകാം. ഇത് പരിശീലനം മാത്രമാണ്, യഥാർത്ഥത്തിൽ ഒന്നും നടക്കില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങാം


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-uber_

**Voice (English):** Find the Uber icon on your phone. It is black, with the word 'Uber' in white. The name is written under it too. Tap it.

**Voice (Hindi):** फ़ोन में Uber का निशान ढूंढिए। वह काला है, उस पर सफ़ेद में 'Uber' लिखा है। नीचे भी नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ Uber അടയാളം കണ്ടെത്തൂ. അത് കറുപ്പ് നിറമാണ്, വെള്ള അക്ഷരത്തിൽ 'Uber' എന്ന് എഴുതിയിട്ടുണ്ട്. താഴെയും പേര് ഉണ്ടാകും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `s0`
_kind: tap · screen: kit / ub-rides · tap target: pay_

**Voice (English):** Before you book, on "Choose a ride", tap "Cash" at the bottom.

**Voice (Hindi):** बुक करने से पहले "Choose a ride" पर नीचे "Cash" दबाइए।

**Voice (Malayalam):** ബുക്ക് ചെയ്യുന്നതിന് മുമ്പ് "Choose a ride"-ൽ താഴെയുള്ള "Cash" അമർത്തൂ.

**Hint (English):** Tap "Choose a ride".

**Hint (Hindi):** "Choose a ride" दबाइए।

**Hint (Malayalam):** "Choose a ride" അമർത്തൂ.


### Step 3: `s1-0`
_kind: tap · screen: kit / ub-pay · tap target: upi_

**Voice (English):** Choose "Cash" or "UPI". UPI is set up once, before the ride. You cannot change it during the ride.

**Voice (Hindi):** "Cash" या "UPI" चुनिए। UPI राइड से पहले एक बार जोड़ा जाता है। राइड के बीच में इसे बदल नहीं सकते।

**Voice (Malayalam):** "Cash" അല്ലെങ്കിൽ "UPI" തിരഞ്ഞെടുക്കൂ. UPI യാത്രയ്ക്ക് മുമ്പ് ഒരിക്കൽ ചേർക്കണം. യാത്രയ്ക്കിടയിൽ ഇത് മാറ്റാനാകില്ല.

**Hint (English):** Tap "Cash".

**Hint (Hindi):** "Cash" दबाइए।

**Hint (Malayalam):** "Cash" അമർത്തൂ.


### Step 4: `s1-1`
_kind: info · screen: kit / ub-rides_

**Voice (English):** Choose "Cash" or "UPI". UPI is set up once, before the ride. You cannot change it during the ride.

**Voice (Hindi):** "Cash" या "UPI" चुनिए। UPI राइड से पहले एक बार जोड़ा जाता है। राइड के बीच में इसे बदल नहीं सकते।

**Voice (Malayalam):** "Cash" അല്ലെങ്കിൽ "UPI" തിരഞ്ഞെടുക്കൂ. UPI യാത്രയ്ക്ക് മുമ്പ് ഒരിക്കൽ ചേർക്കണം. യാത്രയ്ക്കിടയിൽ ഇത് മാറ്റാനാകില്ല.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 5: `s2`
_kind: tap · screen: kit / ub-rate · tap target: stars_

**Voice (English):** When the ride ends, the app asks how it was. Tap the stars: five is very good.

**Voice (Hindi):** राइड खत्म होने पर ऐप पूछता है कि कैसी रही। तारे दबाइए: पाँच यानी बहुत अच्छा।

**Voice (Malayalam):** യാത്ര കഴിയുമ്പോൾ എങ്ങനെയുണ്ടായിരുന്നുവെന്ന് ആപ്പ് ചോദിക്കും. നക്ഷത്രങ്ങൾ അമർത്തൂ: അഞ്ച് എന്നാൽ വളരെ നല്ലത്.

**Hint (English):** When the ride ends, the app asks how it was. Tap the stars: five is very good.

**Hint (Hindi):** राइड खत्म होने पर ऐप पूछता है कि कैसी रही। तारे दबाइए: पाँच यानी बहुत अच्छा।

**Hint (Malayalam):** യാത്ര കഴിയുമ്പോൾ എങ്ങനെയുണ്ടായിരുന്നുവെന്ന് ആപ്പ് ചോദിക്കും. നക്ഷത്രങ്ങൾ അമർത്തൂ: അഞ്ച് എന്നാൽ വളരെ നല്ലത്.


### Step 6: `s3`
_kind: tap · screen: kit / ub-rate · tap target: submit_

**Voice (English):** With fewer stars, tap what went wrong. A tip is your choice; you can skip it. Tap "Done". If you paid cash, give the driver only the amount on the screen.

**Voice (Hindi):** कम तारे दें तो बताइए क्या ठीक नहीं था। टिप देना आपकी मर्ज़ी है, छोड़ भी सकते हैं। "Done" दबाइए। नकद दिया हो तो चालक को स्क्रीन पर दिखी रकम ही दीजिए।

**Voice (Malayalam):** കുറവ് നക്ഷത്രങ്ങളാണെങ്കിൽ എന്താണ് ശരിയാകാത്തതെന്ന് അമർത്തൂ. ടിപ്പ് നിങ്ങളുടെ ഇഷ്ടം, വേണ്ടെങ്കിൽ ഒഴിവാക്കാം. "Done" അമർത്തൂ. പണമായി കൊടുത്തെങ്കിൽ സ്ക്രീനിൽ കാണുന്ന തുക മാത്രം ഡ്രൈവർക്ക് നൽകൂ.

**Hint (English):** Tap "Done".

**Hint (Hindi):** "Done" दबाइए।

**Hint (Malayalam):** "Done" അമർത്തൂ.


### Step 7: `done`
_kind: info · screen: kit / done_

**Voice (English):** Well done! Before your next ride you know what to check: the car number, and sharing your trip with family.

**Voice (Hindi):** शाबाश! अगली राइड से पहले आपको पता है क्या जाँचना है: गाड़ी का नंबर, और यात्रा परिवार को भेजना।

**Voice (Malayalam):** നന്നായി! അടുത്ത യാത്രയ്ക്ക് മുമ്പ് എന്ത് പരിശോധിക്കണമെന്ന് നിങ്ങൾക്കറിയാം: വണ്ടി നമ്പർ, യാത്ര വീട്ടുകാർക്ക് പങ്കിടുന്നത്.

**Button:** English: Finish · Hindi: पूरा करें · Malayalam: തീർന്നു



---

# YONO SBI

## 12. Check your balance on YONO SBI
`yono-balance` · 3 min

- **English title:** Check your balance on YONO SBI
- **Hindi title:** YONO SBI पर बैलेंस देखें
- **Malayalam title:** YONO SBI-ൽ ബാലൻസ് നോക്കാം

**Takeaways at the end**
- English: Type your secret MPIN to enter | Tap 'Accounts', then 'View balance' | The bank never asks for your MPIN on a call
- Hindi: अंदर जाने के लिए अपना गुप्त MPIN डालें | 'Accounts' फिर 'View balance' दबाएं | बैंक कॉल पर कभी MPIN नहीं मांगता
- Malayalam: അകത്ത് കടക്കാൻ നിങ്ങളുടെ രഹസ്യ MPIN അടിക്കുക | 'Accounts' അമർത്തി 'View balance' അമർത്തുക | ബാങ്ക് കോളിൽ ഒരിക്കലും MPIN ചോദിക്കില്ല

**"Now try it for real" line**
- English: Open your real YONO SBI, type your own MPIN with your hand covering the screen, and check your balance.
- Hindi: अपना असली YONO SBI खोलिए, हाथ से स्क्रीन ढककर अपना MPIN डालिए और बैलेंस देखिए।
- Malayalam: നിങ്ങളുടെ YONO SBI തുറന്ന്, കൈ കൊണ്ട് സ്ക്രീൻ മറച്ച് സ്വന്തം MPIN അടിച്ച് ബാലൻസ് നോക്കൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Today we'll check how much money is in your SBI account, using YONO SBI. This is only practice. We use a practice MPIN.

**Voice (Hindi):** आज हम YONO SBI से देखेंगे कि आपके SBI खाते में कितने पैसे हैं। यह सिर्फ़ अभ्यास है। हम अभ्यास वाला MPIN इस्तेमाल करेंगे।

**Voice (Malayalam):** ഇന്ന് YONO SBI കൊണ്ട് നിങ്ങളുടെ SBI അക്കൗണ്ടിൽ എത്ര പണം ഉണ്ടെന്ന് നോക്കാം. ഇത് പരിശീലനം മാത്രം. പരിശീലനത്തിനുള്ള MPIN ആണ് ഉപയോഗിക്കുന്നത്.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങാം


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-yono_

**Voice (English):** Find the YONO SBI icon on your phone. It is purple and pink, with the word 'yono' in white and 'SBI' under it. The name is written under it too. Tap it.

**Voice (Hindi):** फ़ोन में YONO SBI का निशान ढूंढिए। वह बैंगनी-गुलाबी है, उस पर सफ़ेद में 'yono' और उसके नीचे 'SBI' लिखा है। नीचे भी नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ YONO SBI അടയാളം കണ്ടെത്തൂ. അത് പർപ്പിൾ-പിങ്ക് നിറമാണ്, വെള്ള അക്ഷരത്തിൽ 'yono' എന്നും അതിന് താഴെ 'SBI' എന്നും ഉണ്ട്. താഴെയും പേര് ഉണ്ടാകും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `mpin`
_kind: input · screen: kit / bk-login-typed_

**Voice (English):** Now type any 6 numbers you like. This is just practice, so please do not type your real PIN.

**Voice (Hindi):** अब कोई भी 6 नंबर डालिए। यह सिर्फ़ अभ्यास है, इसलिए अपना असली PIN मत डालिए।

**Voice (Malayalam):** ഇനി ഇഷ്ടമുള്ള ഏതെങ്കിലും 6 നമ്പർ അടിക്കൂ. ഇത് പരിശീലനം മാത്രമാണ്, അതിനാൽ നിങ്ങളുടെ യഥാർത്ഥ PIN അടിക്കരുത്.

**Hint (English):** Type any 6 numbers. This is just practice.

**Hint (Hindi):** कोई भी 6 नंबर डालिए। यह सिर्फ़ अभ्यास है।

**Hint (Malayalam):** ഏതെങ്കിലും 6 നമ്പർ അടിക്കൂ. ഇത് പരിശീലനം മാത്രമാണ്.


### Step 3: `accounts`
_kind: tap · screen: kit / bk-home · tap target: tile-accounts_

**Voice (English):** You are inside. Tap 'Accounts', the first button.

**Voice (Hindi):** आप अंदर आ गए। 'Accounts', पहला बटन, दबाइए।

**Voice (Malayalam):** നിങ്ങൾ അകത്ത് എത്തി. 'Accounts', ആദ്യത്തെ ബട്ടൺ, അമർത്തൂ.

**Hint (English):** Tap the first button, with the bank icon.

**Hint (Hindi):** पहला बटन, जिसमें बैंक का निशान है, दबाइए।

**Hint (Malayalam):** ആദ്യത്തെ ബട്ടൺ, ബാങ്ക് അടയാളം ഉള്ളത്, അമർത്തൂ.


### Step 4: `balance`
_kind: tap · screen: kit / bk-account · tap target: balance_

**Voice (English):** Here is your savings account. The amount is hidden for safety. Tap 'View balance'.

**Voice (Hindi):** यह रहा आपका बचत खाता। सुरक्षा के लिए रकम छिपी है। 'View balance' दबाइए।

**Voice (Malayalam):** ഇതാ നിങ്ങളുടെ സേവിങ്സ് അക്കൗണ്ട്. സുരക്ഷയ്ക്കായി തുക മറച്ചിരിക്കുന്നു. 'View balance' അമർത്തൂ.

**Hint (English):** Tap the purple button at the bottom.

**Hint (Hindi):** नीचे बैंगनी बटन दबाइए।

**Hint (Malayalam):** താഴെ പർപ്പിൾ ബട്ടൺ അമർത്തൂ.


### Step 5: `shown`
_kind: info · screen: kit / bk-account_

**Voice (English):** This is your balance, 24,350 rupees. Below are the last three things that happened in your account. You can only see this. Nobody else can.

**Voice (Hindi):** यह आपका बैलेंस है, 24,350 रुपये। नीचे आपके खाते में हुई आख़िरी तीन बातें हैं। इसे सिर्फ़ आप देख सकते हैं।

**Voice (Malayalam):** ഇതാണ് നിങ്ങളുടെ ബാലൻസ്, 24,350 രൂപ. താഴെ നിങ്ങളുടെ അക്കൗണ്ടിൽ നടന്ന അവസാന മൂന്ന് കാര്യങ്ങൾ ഉണ്ട്. ഇത് നിങ്ങൾക്ക് മാത്രമേ കാണാൻ കഴിയൂ.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 6: `mpin-call`
_kind: quiz · screen: kit / bk-account_

**Voice (English):** A caller says: 'I am from SBI. Your account will be blocked. Tell me your MPIN to stop it.' What do you do?

**Voice (Hindi):** कोई फ़ोन करके कहता है: 'मैं SBI से हूँ। आपका खाता बंद हो जाएगा। उसे रोकने के लिए अपना MPIN बताइए।' आप क्या करेंगे?

**Voice (Malayalam):** ഒരാൾ വിളിച്ച് പറയുന്നു: 'ഞാൻ SBI-യിൽ നിന്നാണ്. നിങ്ങളുടെ അക്കൗണ്ട് ബ്ലോക്ക് ആകും. അത് തടയാൻ നിങ്ങളുടെ MPIN പറയൂ.' നിങ്ങൾ എന്ത് ചെയ്യും?

**Answers:**
1. Tell the MPIN to save my account
   - EN why: No! This is a scam. The bank never asks for your MPIN, OTP or password.
   - HI: अपना खाता बचाने के लिए MPIN बता दूँ / नहीं! यह ठगी है। बैंक आपसे MPIN, OTP या पासवर्ड कभी नहीं मांगता।
   - ML: അക്കൗണ്ട് രക്ഷിക്കാൻ MPIN പറയും / വേണ്ട! ഇത് തട്ടിപ്പാണ്. ബാങ്ക് നിങ്ങളുടെ MPIN, OTP, പാസ്‌വേഡ് എന്നിവ ഒരിക്കലും ചോദിക്കില്ല.
2. (correct) Cut the call and tell my family
   - EN why: Right! Cut the call. If you are worried, go to your bank branch.
   - HI: कॉल काटूँ और परिवार को बताऊँ / सही! कॉल काट दीजिए। चिंता हो, तो अपनी बैंक शाखा में जाइए।
   - ML: കോൾ കട്ട് ചെയ്ത് വീട്ടുകാരോട് പറയും / ശരി! കോൾ കട്ട് ചെയ്യൂ. പേടിയുണ്ടെങ്കിൽ നിങ്ങളുടെ ബാങ്ക് ശാഖയിൽ പോകൂ.



---

# Google Maps

## 13. Find the way with Google Maps
`maps-directions` · 3 min

- **English title:** Find the way with Google Maps
- **Hindi title:** Google Maps से रास्ता ढूंढें
- **Malayalam title:** Google Maps കൊണ്ട് വഴി കണ്ടെത്താം

**Takeaways at the end**
- English: Search the place name | Tap 'Directions', then pick car, bike or walk | Tap 'Start' and listen to the voice
- Hindi: जगह का नाम खोजें | 'Directions' दबाएं, फिर कार, बाइक या पैदल चुनें | 'Start' दबाएं और आवाज़ सुनें
- Malayalam: സ്ഥലത്തിന്റെ പേര് തിരയുക | 'Directions' അമർത്തി കാർ, ബൈക്ക് അല്ലെങ്കിൽ നടത്തം തിരഞ്ഞെടുക്കുക | 'Start' അമർത്തി ശബ്ദം കേൾക്കുക

**"Now try it for real" line**
- English: Before your next trip, search the place on your real Google Maps, and read how long it takes.
- Hindi: अगली यात्रा से पहले अपने असली Google Maps में जगह खोजिए और देखिए कितना समय लगेगा।
- Malayalam: അടുത്ത യാത്രയ്ക്ക് മുമ്പ് നിങ്ങളുടെ Google Maps-ൽ സ്ഥലം തിരഞ്ഞ് എത്ര സമയം എടുക്കും എന്ന് നോക്കൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Today we'll find the way to City Hospital with Google Maps. This is only practice.

**Voice (Hindi):** आज हम Google Maps से सिटी हॉस्पिटल का रास्ता ढूंढेंगे। यह सिर्फ़ अभ्यास है।

**Voice (Malayalam):** ഇന്ന് Google Maps കൊണ്ട് സിറ്റി ഹോസ്പിറ്റലിലേക്കുള്ള വഴി കണ്ടെത്താം. ഇത് പരിശീലനം മാത്രം.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങാം


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-maps_

**Voice (English):** Find the Google Maps icon on your phone. It is a pin in red, yellow, green and blue. The name is written under it. Tap it.

**Voice (Hindi):** फ़ोन में Google Maps का निशान ढूंढिए। वह लाल, पीले, हरे और नीले रंग का जगह बताने वाला निशान है। नीचे नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ Google Maps അടയാളം കണ്ടെത്തൂ. അത് ചുവപ്പ്, മഞ്ഞ, പച്ച, നീല നിറങ്ങളുള്ള ഒരു മാപ്പ് പിൻ ആണ്. താഴെ പേര് എഴുതിയിരിക്കും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `search`
_kind: tap · screen: kit / mp-home · tap target: search_

**Voice (English):** This is Google Maps. Tap the search box at the top.

**Voice (Hindi):** यह Google Maps है। ऊपर सर्च बॉक्स दबाइए।

**Voice (Malayalam):** ഇത് Google Maps ആണ്. മുകളിലെ സെർച്ച് ബോക്സ് അമർത്തൂ.

**Hint (English):** Tap the box that says 'Search here'.

**Hint (Hindi):** 'Search here' लिखा डिब्बा दबाइए।

**Hint (Malayalam):** 'Search here' എന്ന് എഴുതിയ പെട്ടി അമർത്തൂ.


### Step 3: `suggest`
_kind: tap · screen: kit / mp-search · tap target: sugg_

**Voice (English):** We typed 'city hospital'. Tap the first line.

**Voice (Hindi):** हमने 'city hospital' लिख दिया है। पहली लाइन दबाइए।

**Voice (Malayalam):** ഞങ്ങൾ 'city hospital' എഴുതിയിട്ടുണ്ട്. ആദ്യത്തെ വരി അമർത്തൂ.

**Hint (English):** Tap the first line.

**Hint (Hindi):** पहली लाइन दबाइए।

**Hint (Malayalam):** ആദ്യത്തെ വരി അമർത്തൂ.


### Step 4: `directions`
_kind: tap · screen: kit / mp-place-h · tap target: directions_

**Voice (English):** This is the hospital on the map. Tap the blue 'Directions' button.

**Voice (Hindi):** यह नक्शे पर अस्पताल है। नीला 'Directions' बटन दबाइए।

**Voice (Malayalam):** ഇതാണ് മാപ്പിലെ ആശുപത്രി. നീല 'Directions' ബട്ടൺ അമർത്തൂ.

**Hint (English):** Tap 'Directions', on the left.

**Hint (Hindi):** बाईं तरफ़ 'Directions' दबाइए।

**Hint (Malayalam):** ഇടതുവശത്തെ 'Directions' അമർത്തൂ.


### Step 5: `mode`
_kind: tap · screen: kit / mp-route · tap target: car_

**Voice (English):** Now choose how you will go. Tap the car, 12 minutes.

**Voice (Hindi):** अब चुनिए कि कैसे जाएंगे। कार, 12 मिनट, दबाइए।

**Voice (Malayalam):** ഇനി എങ്ങനെ പോകുമെന്ന് തിരഞ്ഞെടുക്കൂ. കാർ, 12 മിനിറ്റ്, അമർത്തൂ.

**Hint (English):** Tap the first one, the car.

**Hint (Hindi):** पहला, कार, दबाइए।

**Hint (Malayalam):** ആദ്യത്തേത്, കാർ, അമർത്തൂ.


### Step 6: `start`
_kind: tap · screen: kit / mp-route · tap target: start_

**Voice (English):** By car it takes 12 minutes. Tap the blue 'Start' button.

**Voice (Hindi):** कार से 12 मिनट लगते हैं। नीला 'Start' बटन दबाइए।

**Voice (Malayalam):** കാറിൽ 12 മിനിറ്റ് എടുക്കും. നീല 'Start' ബട്ടൺ അമർത്തൂ.

**Hint (English):** Tap Start at the bottom.

**Hint (Hindi):** नीचे Start दबाइए।

**Hint (Malayalam):** താഴെ Start അമർത്തൂ.


### Step 7: `nav`
_kind: info · screen: kit / mp-navigate_

**Voice (English):** Maps shows the way, and a voice tells you, like turn left in 200 metres. Listen to the voice, and look at the phone only when you are not driving.

**Voice (Hindi):** Maps रास्ता दिखाता है, और आवाज़ बताती है, जैसे 200 मीटर बाद बाएं मुड़िए। आवाज़ सुनिए, और गाड़ी चलाते समय फ़ोन मत देखिए।

**Voice (Malayalam):** Maps വഴി കാണിക്കും, ഒരു ശബ്ദം പറഞ്ഞുതരും, ഉദാഹരണത്തിന് 200 മീറ്റർ കഴിഞ്ഞ് ഇടത്തേക്ക് തിരിയൂ. ശബ്ദം കേൾക്കൂ, വണ്ടി ഓടിക്കുമ്പോൾ ഫോണിലേക്ക് നോക്കരുത്.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 8: `driving`
_kind: quiz · screen: kit / mp-navigate_

**Voice (English):** You are driving a car with Maps on. Where should the phone be?

**Voice (Hindi):** आप कार चला रहे हैं और Maps चालू है। फ़ोन कहाँ होना चाहिए?

**Voice (Malayalam):** നിങ്ങൾ കാർ ഓടിക്കുന്നു, Maps ഓണാണ്. ഫോൺ എവിടെ ആയിരിക്കണം?

**Answers:**
1. (correct) In a holder, and I listen to the voice
   - EN why: Right! Keep the phone in a holder and use the voice. It is safer.
   - HI: होल्डर में, और मैं आवाज़ सुनूँ / सही! फ़ोन होल्डर में रखिए और आवाज़ से चलिए। यह ज़्यादा सुरक्षित है।
   - ML: ഹോൾഡറിൽ, ഞാൻ ശബ്ദം കേൾക്കും / ശരി! ഫോൺ ഹോൾഡറിൽ വെച്ച് ശബ്ദം കേട്ട് പോകൂ. അതാണ് കൂടുതൽ സുരക്ഷിതം.
2. In my hand, so I can look at it
   - EN why: No. Holding a phone while driving is dangerous. Use a holder, or ask someone to guide you.
   - HI: हाथ में, ताकि देखता रहूँ / नहीं। गाड़ी चलाते समय फ़ोन हाथ में रखना खतरनाक है। होल्डर लगाइए, या किसी से रास्ता बताने को कहिए।
   - ML: കയ്യിൽ, അങ്ങനെ നോക്കാമല്ലോ / വേണ്ട. വണ്ടി ഓടിക്കുമ്പോൾ ഫോൺ കയ്യിൽ പിടിക്കുന്നത് അപകടമാണ്. ഹോൾഡർ ഉപയോഗിക്കൂ, അല്ലെങ്കിൽ ആരെയെങ്കിലും വഴി പറഞ്ഞുതരാൻ പറയൂ.


## 14. Use maps without internet
`gd-maps-offline` · 2 min

- **English title:** Use maps without internet
- **Hindi title:** बिना इंटरनेट के नक्शा इस्तेमाल करें
- **Malayalam title:** ഇന്റർനെറ്റ് ഇല്ലാതെ മാപ്പ് ഉപയോഗിക്കാം

**Takeaways at the end**
- English: Use maps without internet | Go slowly, one step at a time | If you are unsure, ask family before you tap
- Hindi: बिना इंटरनेट के नक्शा इस्तेमाल करें | आराम से, एक-एक कदम | अगर पक्का नहीं हैं, तो दबाने से पहले परिवार से पूछिए
- Malayalam: ഇന്റർനെറ്റ് ഇല്ലാതെ മാപ്പ് ഉപയോഗിക്കാം | സാവധാനം, ഓരോ ഘട്ടമായി | ഉറപ്പില്ലെങ്കിൽ അമർത്തുന്നതിന് മുമ്പ് വീട്ടിൽ ചോദിക്കൂ

**"Now try it for real" line**
- English: Try it at home now, with no hurry.
- Hindi: अभी घर पर, बिना जल्दी के आज़माइए।
- Malayalam: ഇപ്പോൾ വീട്ടിൽ, ധൃതിയില്ലാതെ ശ്രമിക്കൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Let's practise: Use maps without internet. This is only practice, nothing real happens.

**Voice (Hindi):** चलिए अभ्यास करें: बिना इंटरनेट के नक्शा इस्तेमाल करें। यह सिर्फ़ अभ्यास है, कुछ असली नहीं होगा।

**Voice (Malayalam):** നമുക്ക് പരിശീലിക്കാം: ഇന്റർനെറ്റ് ഇല്ലാതെ മാപ്പ് ഉപയോഗിക്കാം. ഇത് പരിശീലനം മാത്രമാണ്, യഥാർത്ഥത്തിൽ ഒന്നും നടക്കില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങാം


### Step 1: `open-app`
_kind: tap · screen: phone-home · tap target: app-maps_

**Voice (English):** Find the Google Maps icon on your phone. It is a pin in red, yellow, green and blue. The name is written under it. Tap it.

**Voice (Hindi):** फ़ोन में Google Maps का निशान ढूंढिए। वह लाल, पीले, हरे और नीले रंग का जगह बताने वाला निशान है। नीचे नाम लिखा है। उसे दबाइए।

**Voice (Malayalam):** ഫോണിൽ Google Maps അടയാളം കണ്ടെത്തൂ. അത് ചുവപ്പ്, മഞ്ഞ, പച്ച, നീല നിറങ്ങളുള്ള ഒരു മാപ്പ് പിൻ ആണ്. താഴെ പേര് എഴുതിയിരിക്കും. അത് അമർത്തൂ.

**Hint (English):** Read the names under the icons. Can't find it? Put your finger at the bottom of the screen and slide it up. All apps will show.

**Hint (Hindi):** निशानों के नीचे लिखे नाम पढ़िए। न मिले, तो उंगली स्क्रीन के नीचे रखकर ऊपर सरकाइए। सारे ऐप दिख जाएंगे।

**Hint (Malayalam):** അടയാളങ്ങൾക്ക് താഴെയുള്ള പേരുകൾ വായിക്കൂ. കിട്ടിയില്ലെങ്കിൽ, സ്ക്രീനിന്റെ താഴെ വിരൽ വെച്ച് മുകളിലേക്ക് നീക്കൂ. എല്ലാ ആപ്പുകളും കാണാം.


### Step 2: `s0`
_kind: info · screen: kit / mp-home_

**Voice (English):** Do this while you have Wi-Fi. Open Google Maps.

**Voice (Hindi):** यह तब कीजिए जब Wi-Fi हो। Google Maps खोलिए।

**Voice (Malayalam):** Wi-Fi ഉള്ളപ്പോൾ ഇത് ചെയ്യൂ. Google Maps തുറക്കൂ.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 3: `s1-0`
_kind: tap · screen: kit / mp-home · tap target: me_

**Voice (English):** Tap your round photo at the top right, then "Offline maps".

**Voice (Hindi):** ऊपर दाईं तरफ़ अपनी गोल फ़ोटो दबाइए, फिर "Offline maps"।

**Voice (Malayalam):** മുകളിൽ വലത് നിങ്ങളുടെ വട്ട ഫോട്ടോ അമർത്തി "Offline maps" അമർത്തൂ.

**Hint (English):** Tap "Offline maps".

**Hint (Hindi):** "Offline maps" दबाइए।

**Hint (Malayalam):** "Offline maps" അമർത്തൂ.


### Step 4: `s1-1`
_kind: tap · screen: kit / mp-home · tap target: offline_

**Voice (English):** Tap your round photo at the top right, then "Offline maps".

**Voice (Hindi):** ऊपर दाईं तरफ़ अपनी गोल फ़ोटो दबाइए, फिर "Offline maps"।

**Voice (Malayalam):** മുകളിൽ വലത് നിങ്ങളുടെ വട്ട ഫോട്ടോ അമർത്തി "Offline maps" അമർത്തൂ.

**Hint (English):** Tap your round photo at the top right, then "Offline maps".

**Hint (Hindi):** ऊपर दाईं तरफ़ अपनी गोल फ़ोटो दबाइए, फिर "Offline maps"।

**Hint (Malayalam):** മുകളിൽ വലത് നിങ്ങളുടെ വട്ട ഫോട്ടോ അമർത്തി "Offline maps" അമർത്തൂ.


### Step 5: `s2-0`
_kind: tap · screen: kit / mp-offline · tap target: select_

**Voice (English):** Tap "Select your own map", move the box over your area, and tap "Download".

**Voice (Hindi):** "Select your own map" दबाइए, डिब्बे को अपने इलाके पर रखिए, और "Download" दबाइए।

**Voice (Malayalam):** "Select your own map" അമർത്തി ബോക്സ് നിങ്ങളുടെ പ്രദേശത്ത് വെച്ച് "Download" അമർത്തൂ.

**Hint (English):** Tap "Select your own map".

**Hint (Hindi):** "Select your own map" दबाइए।

**Hint (Malayalam):** "Select your own map" അമർത്തൂ.


### Step 6: `s2-1`
_kind: tap · screen: kit / mp-offline · tap target: download_

**Voice (English):** Tap "Select your own map", move the box over your area, and tap "Download".

**Voice (Hindi):** "Select your own map" दबाइए, डिब्बे को अपने इलाके पर रखिए, और "Download" दबाइए।

**Voice (Malayalam):** "Select your own map" അമർത്തി ബോക്സ് നിങ്ങളുടെ പ്രദേശത്ത് വെച്ച് "Download" അമർത്തൂ.

**Hint (English):** Tap "Select your own map", move the box over your area, and tap "Download".

**Hint (Hindi):** "Select your own map" दबाइए, डिब्बे को अपने इलाके पर रखिए, और "Download" दबाइए।

**Hint (Malayalam):** "Select your own map" അമർത്തി ബോക്സ് നിങ്ങളുടെ പ്രദേശത്ത് വെച്ച് "Download" അമർത്തൂ.


### Step 7: `done`
_kind: info · screen: kit / done_

**Voice (English):** Well done! Try it at home first, before you need it on the road or at the station.

**Voice (Hindi):** शाबाश! पहले घर पर आज़माइए, ताकि सड़क पर या स्टेशन पर ज़रूरत पड़े तो आसानी रहे।

**Voice (Malayalam):** നന്നായി! വഴിയിലോ സ്റ്റേഷനിലോ ആവശ്യം വരും മുമ്പ് വീട്ടിൽ വെച്ച് ശ്രമിക്കൂ.

**Button:** English: Finish · Hindi: पूरा करें · Malayalam: തീർന്നു



---

# Phone basics

## 15. Turn on the flashlight
`flashlight` · 2 min

- **English title:** Turn on the flashlight
- **Hindi title:** टॉर्च चालू करें
- **Malayalam title:** ടോർച്ച് ഓൺ ചെയ്യാം

**Takeaways at the end**
- English: Slide your finger down from the very top | Tap 'Flashlight' | Tap it again to switch it off
- Hindi: सबसे ऊपर से उंगली नीचे सरकाएं | 'Flashlight' दबाएं | बंद करने के लिए फिर दबाएं
- Malayalam: ഏറ്റവും മുകളിൽ നിന്ന് വിരൽ താഴേക്ക് നീക്കുക | 'Flashlight' അമർത്തുക | ഓഫ് ചെയ്യാൻ വീണ്ടും അമർത്തുക

**"Now try it for real" line**
- English: Slide down from the top of your own phone and switch the flashlight on and off once.
- Hindi: अपने फ़ोन में ऊपर से नीचे सरकाइए और टॉर्च एक बार चालू और बंद कीजिए।
- Malayalam: നിങ്ങളുടെ ഫോണിൽ മുകളിൽ നിന്ന് താഴേക്ക് നീക്കി ടോർച്ച് ഒരു തവണ ഓൺ ചെയ്ത് ഓഫ് ചെയ്യൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Today we'll turn on the flashlight. It helps in the dark, like in a power cut. This is practice.

**Voice (Hindi):** आज हम टॉर्च चालू करना सीखेंगे। अंधेरे में, जैसे बिजली जाने पर, यह काम आती है। यह अभ्यास है।

**Voice (Malayalam):** ഇന്ന് ടോർച്ച് ഓൺ ചെയ്യാൻ പഠിക്കാം. കറന്റ് പോകുമ്പോൾ പോലെ ഇരുട്ടിൽ ഇത് സഹായിക്കും. ഇത് പരിശീലനം ആണ്.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങാം


### Step 1: `swipe`
_kind: tap · screen: kit / and-home · tap target: pull_

**Voice (English):** Put your finger at the very top of the screen and slide it down. For practice, tap the glowing line.

**Voice (Hindi):** उंगली को स्क्रीन के बिल्कुल ऊपर रखकर नीचे सरकाइए। अभ्यास के लिए चमकती लाइन दबाइए।

**Voice (Malayalam):** വിരൽ സ്ക്രീനിന്റെ ഏറ്റവും മുകളിൽ വെച്ച് താഴേക്ക് നീക്കൂ. പരിശീലനത്തിന് തിളങ്ങുന്ന വര അമർത്തൂ.

**Hint (English):** Tap the line at the top of the screen.

**Hint (Hindi):** स्क्रीन के ऊपर वाली लाइन दबाइए।

**Hint (Malayalam):** സ്ക്രീനിന്റെ മുകളിലെ വര അമർത്തൂ.


### Step 2: `flash-on`
_kind: tap · screen: kit / and-qs · tap target: qs-torch_

**Voice (English):** You see small round buttons. Tap the one that says 'Flashlight'.

**Voice (Hindi):** छोटे गोल बटन दिख रहे हैं। जिस पर 'Flashlight' लिखा है, उसे दबाइए।

**Voice (Malayalam):** ചെറിയ വട്ട ബട്ടണുകൾ കാണാം. 'Flashlight' എന്നുള്ളത് അമർത്തൂ.

**Hint (English):** Tap 'Flashlight', the third button.

**Hint (Hindi):** 'Flashlight', तीसरा बटन, दबाइए।

**Hint (Malayalam):** 'Flashlight', മൂന്നാമത്തെ ബട്ടൺ, അമർത്തൂ.


### Step 3: `flash-off`
_kind: tap · screen: kit / and-qs · tap target: qs-torch_

**Voice (English):** The button is blue now. The light at the back of your phone is on. Tap it again to turn it off.

**Voice (Hindi):** बटन नीला हो गया। फ़ोन के पीछे की रोशनी जल गई। बंद करने के लिए इसे फिर दबाइए।

**Voice (Malayalam):** ബട്ടൺ നീലയായി. ഫോണിന്റെ പിന്നിലെ ലൈറ്റ് കത്തി. ഓഫ് ചെയ്യാൻ വീണ്ടും അമർത്തൂ.

**Hint (English):** Tap the blue Flashlight button.

**Hint (Hindi):** नीला Flashlight बटन दबाइए।

**Hint (Malayalam):** നീല Flashlight ബട്ടൺ അമർത്തൂ.


### Step 4: `switch-off`
_kind: quiz · screen: kit / and-qs_

**Voice (English):** Why should you switch the flashlight off when you are done?

**Voice (Hindi):** काम होने पर टॉर्च बंद क्यों करनी चाहिए?

**Voice (Malayalam):** കഴിഞ്ഞാൽ ടോർച്ച് ഓഫ് ചെയ്യേണ്ടത് എന്തുകൊണ്ട്?

**Answers:**
1. (correct) It uses the battery
   - EN why: Right! A flashlight left on drains the battery fast.
   - HI: इससे बैटरी खर्च होती है / सही! टॉर्च जलती रहे तो बैटरी जल्दी खत्म होती है।
   - ML: ബാറ്ററി തീരും / ശരി! ടോർച്ച് കത്തിക്കിടന്നാൽ ബാറ്ററി വേഗം തീരും.
2. It breaks the phone
   - EN why: No, it does not break the phone. But it drains the battery, so switch it off.
   - HI: इससे फ़ोन टूट जाता है / नहीं, फ़ोन नहीं टूटता। पर बैटरी खत्म होती है, इसलिए बंद कर दीजिए।
   - ML: ഫോൺ പൊട്ടിപ്പോകും / ഇല്ല, ഫോൺ പൊട്ടില്ല. പക്ഷേ ബാറ്ററി തീരും, അതുകൊണ്ട് ഓഫ് ചെയ്യൂ.


## 16. Make the words bigger
`bigger-text` · 2 min

- **English title:** Make the words bigger
- **Hindi title:** अक्षर बड़े करें
- **Malayalam title:** അക്ഷരങ്ങൾ വലുതാക്കാം

**Takeaways at the end**
- English: Settings, then 'Display' | Open 'Font size' | Tap the biggest A
- Hindi: Settings, फिर 'Display' | 'Font size' खोलें | सबसे बड़ा A दबाएं
- Malayalam: Settings, പിന്നെ 'Display' | 'Font size' തുറക്കുക | ഏറ്റവും വലിയ A അമർത്തുക

**"Now try it for real" line**
- English: Make the words bigger on your real phone, and see if it is easier to read.
- Hindi: अपने असली फ़ोन में अक्षर बड़े कीजिए और देखिए पढ़ना आसान होता है या नहीं।
- Malayalam: നിങ്ങളുടെ ഫോണിൽ അക്ഷരങ്ങൾ വലുതാക്കി, വായിക്കാൻ എളുപ്പമായോ എന്ന് നോക്കൂ.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Is it hard to read the small words on your phone? Today we'll make them bigger. This is practice.

**Voice (Hindi):** फ़ोन के छोटे अक्षर पढ़ने में दिक्कत होती है? आज हम उन्हें बड़ा करेंगे। यह अभ्यास है।

**Voice (Malayalam):** ഫോണിലെ ചെറിയ അക്ഷരങ്ങൾ വായിക്കാൻ ബുദ്ധിമുട്ടുണ്ടോ? ഇന്ന് അവ വലുതാക്കാം. ഇത് പരിശീലനം ആണ്.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങാം


### Step 1: `open-settings`
_kind: tap · screen: kit / and-home · tap target: open-settings_

**Voice (English):** Tap Settings, the grey gear icon.

**Voice (Hindi):** Settings दबाइए, सलेटी गियर वाला निशान।

**Voice (Malayalam):** Settings അമർത്തൂ, ചാര നിറത്തിലുള്ള ഗിയർ അടയാളം.

**Hint (English):** Tap the gear icon in the second row.

**Hint (Hindi):** दूसरी लाइन में गियर का निशान दबाइए।

**Hint (Malayalam):** രണ്ടാമത്തെ വരിയിലെ ഗിയർ അടയാളം അമർത്തൂ.


### Step 2: `display`
_kind: tap · screen: kit / and-settings · tap target: set-display_

**Voice (English):** Tap 'Display', the one with the sun.

**Voice (Hindi):** 'Display' दबाइए, जिसमें सूरज का निशान है।

**Voice (Malayalam):** 'Display' അമർത്തൂ, സൂര്യന്റെ അടയാളം ഉള്ളത്.

**Hint (English):** Tap the fourth row, 'Display'.

**Hint (Hindi):** चौथी लाइन 'Display' दबाइए।

**Hint (Malayalam):** നാലാമത്തെ വരി 'Display' അമർത്തൂ.


### Step 3: `font`
_kind: tap · screen: kit / and-page · tap target: font_

**Voice (English):** Tap 'Font size and style'.

**Voice (Hindi):** 'Font size and style' दबाइए।

**Voice (Malayalam):** 'Font size and style' അമർത്തൂ.

**Hint (English):** Tap the middle row, with the big A.

**Hint (Hindi):** बीच की लाइन, जिसमें बड़ा A है, दबाइए।

**Hint (Malayalam):** നടുവിലെ വരി, വലിയ A ഉള്ളത്, അമർത്തൂ.


### Step 4: `biggest`
_kind: tap · screen: kit / and-font · tap target: s4_

**Voice (English):** These words are small. Under them are four dots. The last dot is the biggest. Tap it.

**Voice (Hindi):** ये अक्षर छोटे हैं। इनके नीचे चार बिंदु हैं। आख़िरी बिंदु सबसे बड़ा है। उसे दबाइए।

**Voice (Malayalam):** ഈ അക്ഷരങ്ങൾ ചെറുതാണ്. താഴെ നാല് കുത്തുകൾ ഉണ്ട്. അവസാനത്തെ കുത്ത് ഏറ്റവും വലുത്. അത് അമർത്തൂ.

**Hint (English):** Tap the dot on the far right.

**Hint (Hindi):** सबसे दाईं तरफ़ का बिंदु दबाइए।

**Hint (Malayalam):** ഏറ്റവും വലതുവശത്തെ കുത്ത് അമർത്തൂ.


### Step 5: `result`
_kind: info · screen: kit / and-font_

**Voice (English):** Look! The words are big now. All your apps will use this bigger size. You can change it back any time.

**Voice (Hindi):** देखिए! अब अक्षर बड़े हो गए। आपके सारे ऐप अब यही बड़ा आकार इस्तेमाल करेंगे। आप कभी भी वापस बदल सकते हैं।

**Voice (Malayalam):** നോക്കൂ! അക്ഷരങ്ങൾ വലുതായി. നിങ്ങളുടെ എല്ലാ ആപ്പുകളും ഇനി ഈ വലിയ വലുപ്പം ഉപയോഗിക്കും. എപ്പോൾ വേണമെങ്കിലും തിരികെ മാറ്റാം.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


## 17. Install an app from the Play Store
`gd-install-app` · 4 min

- **English title:** Install an app from the Play Store
- **Hindi title:** Play Store से ऐप डालें
- **Malayalam title:** Play Store-ൽ നിന്ന് ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യാം

**Takeaways at the end**
- English: Install an app from the Play Store | Go slowly, one step at a time | If you are unsure, ask family before you tap
- Hindi: Play Store से ऐप डालें | आराम से, एक-एक कदम | अगर पक्का नहीं हैं, तो दबाने से पहले परिवार से पूछिए
- Malayalam: Play Store-ൽ നിന്ന് ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യാം | സാവധാനം, ഓരോ ഘട്ടമായി | ഉറപ്പില്ലെങ്കിൽ അമർത്തുന്നതിന് മുമ്പ് വീട്ടിൽ ചോദിക്കൂ

**"Now try it for real" line**
- English: Try it right now. You can always switch it back.
- Hindi: अभी आज़माइए। आप इसे कभी भी वापस बदल सकते हैं।
- Malayalam: ഇപ്പോൾ തന്നെ ശ്രമിക്കൂ. എപ്പോൾ വേണമെങ്കിലും തിരികെ മാറ്റാം.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Let's practise: Install an app from the Play Store. This is only practice, nothing real happens.

**Voice (Hindi):** चलिए अभ्यास करें: Play Store से ऐप डालें। यह सिर्फ़ अभ्यास है, कुछ असली नहीं होगा।

**Voice (Malayalam):** നമുക്ക് പരിശീലിക്കാം: Play Store-ൽ നിന്ന് ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യാം. ഇത് പരിശീലനം മാത്രമാണ്, യഥാർത്ഥത്തിൽ ഒന്നും നടക്കില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങാം


### Step 1: `s0`
_kind: tap · screen: kit / and-home · tap target: open-play_

**Voice (English):** Open the "Play Store" app (the colourful triangle).

**Voice (Hindi):** "Play Store" ऐप खोलिए (रंगीन तिकोना निशान)।

**Voice (Malayalam):** "Play Store" ആപ്പ് തുറക്കൂ (നിറമുള്ള ത്രികോണം).

**Hint (English):** Tap "Play Store".

**Hint (Hindi):** "Play Store" दबाइए।

**Hint (Malayalam):** "Play Store" അമർത്തൂ.


### Step 2: `s1`
_kind: tap · screen: kit / and-play · tap target: search_

**Voice (English):** Tap the search box at the top.

**Voice (Hindi):** ऊपर सर्च बॉक्स दबाइए।

**Voice (Malayalam):** മുകളിലെ സെർച്ച് ബോക്സ് അമർത്തൂ.

**Hint (English):** Tap the search box at the top.

**Hint (Hindi):** ऊपर सर्च बॉक्स दबाइए।

**Hint (Malayalam):** മുകളിലെ സെർച്ച് ബോക്സ് അമർത്തൂ.


### Step 3: `s2`
_kind: info · screen: kit / and-play_

**Voice (English):** Type the app name. Some results say "Sponsored". Those are ads, so do not tap them.

**Voice (Hindi):** ऐप का नाम लिखिए। कुछ नतीजों पर "Sponsored" लिखा होता है। वे विज्ञापन हैं, उन्हें मत दबाइए।

**Voice (Malayalam):** ആപ്പിന്റെ പേര് എഴുതൂ. ചില ഫലങ്ങളിൽ "Sponsored" എന്ന് കാണും. അവ പരസ്യങ്ങളാണ്, അമർത്തരുത്.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 4: `s3`
_kind: tap · screen: kit / and-play · tap target: result_

**Voice (English):** Tap the real app. Check the company name under it, like "PhonePe Private Limited".

**Voice (Hindi):** असली ऐप दबाइए। नीचे कंपनी का नाम देखिए, जैसे "PhonePe Private Limited"।

**Voice (Malayalam):** യഥാർത്ഥ ആപ്പ് അമർത്തൂ. താഴെ കമ്പനിയുടെ പേര് നോക്കൂ, ഉദാ. "PhonePe Private Limited".

**Hint (English):** Tap "PhonePe Private Limited".

**Hint (Hindi):** "PhonePe Private Limited" दबाइए।

**Hint (Malayalam):** "PhonePe Private Limited" അമർത്തൂ.


### Step 5: `s4`
_kind: info · screen: kit / and-play_

**Voice (English):** Check the rating and the downloads. A real app has a good rating and millions of downloads.

**Voice (Hindi):** रेटिंग और डाउनलोड देखिए। असली ऐप की रेटिंग अच्छी और करोड़ों डाउनलोड होते हैं।

**Voice (Malayalam):** റേറ്റിംഗും ഡൗൺലോഡുകളും നോക്കൂ. യഥാർത്ഥ ആപ്പിന് നല്ല റേറ്റിംഗും കോടിക്കണക്കിന് ഡൗൺലോഡുകളും ഉണ്ടാകും.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 6: `s5`
_kind: tap · screen: kit / and-play · tap target: install_

**Voice (English):** Tap the green "Install" button.

**Voice (Hindi):** हरा "Install" बटन दबाइए।

**Voice (Malayalam):** പച്ച "Install" ബട്ടൺ അമർത്തൂ.

**Hint (English):** Tap "Install".

**Hint (Hindi):** "Install" दबाइए।

**Hint (Malayalam):** "Install" അമർത്തൂ.


### Step 7: `s6`
_kind: info · screen: kit / and-play_

**Voice (English):** Wait while it installs. Do not press anything.

**Voice (Hindi):** इंस्टॉल होने तक रुकिए। कुछ मत दबाइए।

**Voice (Malayalam):** ഇൻസ്റ്റാൾ ആകുന്നത് വരെ കാത്തിരിക്കൂ. ഒന്നും അമർത്തരുത്.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 8: `s7`
_kind: tap · screen: kit / and-play · tap target: open_

**Voice (English):** When it finishes, tap "Open".

**Voice (Hindi):** पूरा होने पर "Open" दबाइए।

**Voice (Malayalam):** തീർന്നാൽ "Open" അമർത്തൂ.

**Hint (English):** Tap "Open".

**Hint (Hindi):** "Open" दबाइए।

**Hint (Malayalam):** "Open" അമർത്തൂ.


### Step 9: `careful`
_kind: info · screen: kit / done_

**Voice (English):** Install only from the Play Store. Never from a link someone sent.

**Voice (Hindi):** ऐप सिर्फ़ Play Store से डालिए। किसी के भेजे लिंक से कभी नहीं।

**Voice (Malayalam):** ആപ്പ് Play Store-ൽ നിന്ന് മാത്രം ഇൻസ്റ്റാൾ ചെയ്യൂ. ആരെങ്കിലും അയച്ച ലിങ്കിൽ നിന്ന് ഒരിക്കലും വേണ്ട.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 10: `done`
_kind: info · screen: kit / done_

**Voice (English):** Well done! Nothing here can harm your phone. Open Settings and try it now, one step at a time.

**Voice (Hindi):** शाबाश! इसमें आपके फ़ोन को कोई नुकसान नहीं होगा। सेटिंग खोलकर अभी आज़माइए, एक-एक कदम।

**Voice (Malayalam):** നന്നായി! ഇതിൽ നിങ്ങളുടെ ഫോണിന് ഒരു കേടും വരില്ല. സെറ്റിംഗ്സ് തുറന്ന് ഇപ്പോൾ ഓരോ ഘട്ടമായി ശ്രമിക്കൂ.

**Button:** English: Finish · Hindi: पूरा करें · Malayalam: തീർന്നു


## 18. Learn what common icons mean
`gd-icon-meanings` · 6 min

- **English title:** Learn what common icons mean
- **Hindi title:** आम निशानों का मतलब समझिए
- **Malayalam title:** സാധാരണ ചിഹ്നങ്ങളുടെ അർത്ഥം അറിയാം

**Takeaways at the end**
- English: Learn what common icons mean | Go slowly, one step at a time | If you are unsure, ask family before you tap
- Hindi: आम निशानों का मतलब समझिए | आराम से, एक-एक कदम | अगर पक्का नहीं हैं, तो दबाने से पहले परिवार से पूछिए
- Malayalam: സാധാരണ ചിഹ്നങ്ങളുടെ അർത്ഥം അറിയാം | സാവധാനം, ഓരോ ഘട്ടമായി | ഉറപ്പില്ലെങ്കിൽ അമർത്തുന്നതിന് മുമ്പ് വീട്ടിൽ ചോദിക്കൂ

**"Now try it for real" line**
- English: Try it right now. You can always switch it back.
- Hindi: अभी आज़माइए। आप इसे कभी भी वापस बदल सकते हैं।
- Malayalam: ഇപ്പോൾ തന്നെ ശ്രമിക്കൂ. എപ്പോൾ വേണമെങ്കിലും തിരികെ മാറ്റാം.

### Opening (before step 1): `intro`
_kind: info · screen: intro_

**Voice (English):** Let's practise: Learn what common icons mean. This is only practice, nothing real happens.

**Voice (Hindi):** चलिए अभ्यास करें: आम निशानों का मतलब समझिए। यह सिर्फ़ अभ्यास है, कुछ असली नहीं होगा।

**Voice (Malayalam):** നമുക്ക് പരിശീലിക്കാം: സാധാരണ ചിഹ്നങ്ങളുടെ അർത്ഥം അറിയാം. ഇത് പരിശീലനം മാത്രമാണ്, യഥാർത്ഥത്തിൽ ഒന്നും നടക്കില്ല.

**Button:** English: Start · Hindi: शुरू करें · Malayalam: തുടങ്ങാം


### Step 1: `s0`
_kind: info · screen: kit / icon-board_

**Voice (English):** Many apps use the same small pictures, called icons. Once you know them, every app feels familiar.

**Voice (Hindi):** कई ऐप वही छोटे चित्र इस्तेमाल करते हैं, जिन्हें आइकन कहते हैं। इन्हें जान लेने पर हर ऐप जाना-पहचाना लगता है।

**Voice (Malayalam):** പല ആപ്പുകളും ഒരേ ചെറിയ ചിത്രങ്ങൾ ഉപയോഗിക്കുന്നു, അവയെ ഐക്കണുകൾ എന്ന് പറയും. ഇവ അറിഞ്ഞാൽ ഏത് ആപ്പും പരിചിതമായി തോന്നും.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 2: `s1`
_kind: tap · screen: kit / icon-board · tap target: search_

**Voice (English):** Tap the magnifying glass. It means "search". Use it to find a video, an app or a chat.

**Voice (Hindi):** आवर्धक शीशे (मैग्निफ़ाइंग ग्लास) को दबाइए। इसका मतलब है "खोजना"। इससे वीडियो, ऐप या चैट ढूँढ़ी जाती है।

**Voice (Malayalam):** ലെൻസ് (മാഗ്നിഫൈയിംഗ് ഗ്ലാസ്) അമർത്തൂ. ഇതിന്റെ അർത്ഥം "തിരയുക". വീഡിയോ, ആപ്പ്, ചാറ്റ് എന്നിവ കണ്ടെത്താൻ ഇത് ഉപയോഗിക്കാം.

**Hint (English):** Tap "search".

**Hint (Hindi):** "search" दबाइए।

**Hint (Malayalam):** "search" അമർത്തൂ.


### Step 3: `s2`
_kind: tap · screen: kit / icon-board · tap target: back_

**Voice (English):** Tap the arrow pointing left. It means "go back" to the screen you were on before.

**Voice (Hindi):** बाईं तरफ़ वाला तीर दबाइए। इसका मतलब है "पीछे जाना", यानी पिछली स्क्रीन पर लौटना।

**Voice (Malayalam):** ഇടത്തോട്ടുള്ള അമ്പടയാളം അമർത്തൂ. ഇതിന്റെ അർത്ഥം "പിന്നോട്ട് പോകുക", അതായത് മുമ്പത്തെ സ്ക്രീനിലേക്ക് മടങ്ങുക.

**Hint (English):** Tap "go back".

**Hint (Hindi):** "go back" दबाइए।

**Hint (Malayalam):** "go back" അമർത്തൂ.


### Step 4: `s3`
_kind: tap · screen: kit / icon-board · tap target: home_

**Voice (English):** Tap the little house. It means "home". It takes you to the first screen of the app, or of the phone.

**Voice (Hindi):** छोटा घर दबाइए। इसका मतलब है "होम"। यह आपको ऐप की, या फ़ोन की पहली स्क्रीन पर ले जाता है।

**Voice (Malayalam):** ചെറിയ വീട് അമർത്തൂ. ഇതിന്റെ അർത്ഥം "ഹോം". ഇത് ആപ്പിന്റെ, അല്ലെങ്കിൽ ഫോണിന്റെ, ആദ്യ സ്ക്രീനിലേക്ക് കൊണ്ടുപോകും.

**Hint (English):** Tap "home".

**Hint (Hindi):** "home" दबाइए।

**Hint (Malayalam):** "home" അമർത്തൂ.


### Step 5: `s4`
_kind: tap · screen: kit / icon-board · tap target: share_

**Voice (English):** Tap the one with three dots joined by lines. It means "share". Use it to send a photo or a link to someone.

**Voice (Hindi):** तीन बिंदु और उन्हें जोड़ती लकीरों वाला दबाइए। इसका मतलब है "शेयर करना"। इससे किसी को फ़ोटो या लिंक भेजा जाता है।

**Voice (Malayalam):** വരകളാൽ ബന്ധിപ്പിച്ച മൂന്ന് കുത്തുകളുള്ളത് അമർത്തൂ. ഇതിന്റെ അർത്ഥം "പങ്കിടുക". ആർക്കെങ്കിലും ഫോട്ടോയോ ലിങ്കോ അയയ്ക്കാൻ ഇത് ഉപയോഗിക്കാം.

**Hint (English):** Tap "share".

**Hint (Hindi):** "share" दबाइए।

**Hint (Malayalam):** "share" അമർത്തൂ.


### Step 6: `s5`
_kind: tap · screen: kit / icon-board · tap target: settings_

**Voice (English):** Tap the gear. It means "settings". Use it to change how the app or the phone works.

**Voice (Hindi):** गियर (चक्का) दबाइए। इसका मतलब है "सेटिंग्स"। इससे ऐप या फ़ोन के काम करने का तरीका बदला जाता है।

**Voice (Malayalam):** ഗിയർ അമർത്തൂ. ഇതിന്റെ അർത്ഥം "സെറ്റിംഗ്സ്". ആപ്പോ ഫോണോ പ്രവർത്തിക്കുന്ന രീതി മാറ്റാൻ ഇത് ഉപയോഗിക്കാം.

**Hint (English):** Tap "settings".

**Hint (Hindi):** "settings" दबाइए।

**Hint (Malayalam):** "settings" അമർത്തൂ.


### Step 7: `s6`
_kind: tap · screen: kit / icon-board · tap target: menu_

**Voice (English):** Tap the icon with three straight lines. It means "menu". It opens the list of things the app can do.

**Voice (Hindi):** तीन सीधी लकीरों वाला निशान दबाइए। इसका मतलब है "मेन्यू"। यह ऐप के सारे काम की सूची खोलता है।

**Voice (Malayalam):** മൂന്ന് നേർവരകളുള്ള ചിഹ്നം അമർത്തൂ. ഇതിന്റെ അർത്ഥം "മെനു". ആപ്പിന് ചെയ്യാവുന്ന കാര്യങ്ങളുടെ പട്ടിക ഇത് തുറക്കും.

**Hint (English):** Tap "menu".

**Hint (Hindi):** "menu" दबाइए।

**Hint (Malayalam):** "menu" അമർത്തൂ.


### Step 8: `s7`
_kind: tap · screen: kit / icon-board · tap target: more_

**Voice (English):** Tap the icon with three dots. It means "more". It shows extra options for what you are looking at.

**Voice (Hindi):** तीन बिंदुओं वाला निशान दबाइए। इसका मतलब है "और"। यह सामने दिख रही चीज़ के और विकल्प दिखाता है।

**Voice (Malayalam):** മൂന്ന് കുത്തുകളുള്ള ചിഹ്നം അമർത്തൂ. ഇതിന്റെ അർത്ഥം "കൂടുതൽ". കാണുന്ന കാര്യത്തിനുള്ള മറ്റ് ഓപ്ഷനുകൾ ഇത് കാണിക്കും.

**Hint (English):** Tap "more".

**Hint (Hindi):** "more" दबाइए।

**Hint (Malayalam):** "more" അമർത്തൂ.


### Step 9: `s8`
_kind: tap · screen: kit / icon-board · tap target: camera_

**Voice (English):** Tap the camera. It means "take a photo or a video", or "scan something".

**Voice (Hindi):** कैमरा दबाइए। इसका मतलब है "फ़ोटो या वीडियो लेना", या "कुछ स्कैन करना"।

**Voice (Malayalam):** ക്യാമറ അമർത്തൂ. ഇതിന്റെ അർത്ഥം "ഫോട്ടോയോ വീഡിയോയോ എടുക്കുക", അല്ലെങ്കിൽ "എന്തെങ്കിലും സ്കാൻ ചെയ്യുക".

**Hint (English):** Tap "take a photo or a video".

**Hint (Hindi):** "take a photo or a video" दबाइए।

**Hint (Malayalam):** "take a photo or a video" അമർത്തൂ.


### Step 10: `s9`
_kind: tap · screen: kit / icon-board · tap target: mic_

**Voice (English):** Tap the microphone. It means "speak". Use it to say a word instead of typing it, or to record your voice.

**Voice (Hindi):** माइक दबाइए। इसका मतलब है "बोलना"। टाइप करने की जगह बोलकर लिखवाने, या अपनी आवाज़ रिकॉर्ड करने के लिए इसे दबाते हैं।

**Voice (Malayalam):** മൈക്ക് അമർത്തൂ. ഇതിന്റെ അർത്ഥം "സംസാരിക്കുക". ടൈപ്പ് ചെയ്യുന്നതിന് പകരം പറയാനോ, നിങ്ങളുടെ ശബ്ദം റെക്കോർഡ് ചെയ്യാനോ ഇത് ഉപയോഗിക്കാം.

**Hint (English):** Tap "speak".

**Hint (Hindi):** "speak" दबाइए।

**Hint (Malayalam):** "speak" അമർത്തൂ.


### Step 11: `s10`
_kind: info · screen: kit / icon-same_

**Voice (English):** Look: the search icon is the same in YouTube, the Play Store and WhatsApp. Same picture, same meaning.

**Voice (Hindi):** देखिए: खोज का निशान YouTube, Play Store और WhatsApp में एक ही है। वही चित्र, वही मतलब।

**Voice (Malayalam):** നോക്കൂ: തിരയാനുള്ള ചിഹ്നം YouTube, Play Store, WhatsApp എന്നിവയിൽ ഒന്നുതന്നെയാണ്. ഒരേ ചിത്രം, ഒരേ അർത്ഥം.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 12: `careful`
_kind: info · screen: kit / done_

**Voice (English):** If you are not sure what an icon does, tap and look. Nothing bad happens when you open a menu.

**Voice (Hindi):** किसी निशान का काम न पता हो, तो दबाकर देखिए। मेन्यू खोलने से कुछ बिगड़ता नहीं।

**Voice (Malayalam):** ഒരു ചിഹ്നം എന്താണെന്ന് അറിയില്ലെങ്കിൽ അമർത്തി നോക്കൂ. മെനു തുറന്നാൽ ഒന്നും സംഭവിക്കില്ല.

**Button:** English: Next · Hindi: आगे · Malayalam: അടുത്തത്


### Step 13: `done`
_kind: info · screen: kit / done_

**Voice (English):** Well done! Nothing here can harm your phone. Open Settings and try it now, one step at a time.

**Voice (Hindi):** शाबाश! इसमें आपके फ़ोन को कोई नुकसान नहीं होगा। सेटिंग खोलकर अभी आज़माइए, एक-एक कदम।

**Voice (Malayalam):** നന്നായി! ഇതിൽ നിങ്ങളുടെ ഫോണിന് ഒരു കേടും വരില്ല. സെറ്റിംഗ്സ് തുറന്ന് ഇപ്പോൾ ഓരോ ഘട്ടമായി ശ്രമിക്കൂ.

**Button:** English: Finish · Hindi: पूरा करें · Malayalam: തീർന്നു

