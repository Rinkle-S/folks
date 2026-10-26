// Reviewed against the official sources listed in docs/SCAM-HELP-REVIEW.md.
const t = (en,hi,ml)=>({en,hi,ml});
export const SCAM_HELP = {
  title:t('If you lost money','अगर पैसे चले गए हों','പണം നഷ്ടപ്പെട്ടാൽ'),
  entry:t('Lost money to a scam? Call 1930','ठगी में पैसे गए? 1930 पर फ़ोन कीजिए','തട്ടിപ്പിൽ പണം പോയോ? 1930 വിളിക്കൂ'),
  entryQuestion:t('Lost money to a scam?','ठगी में पैसे गए?','തട്ടിപ്പിൽ പണം പോയോ?'),
  entrySub:t('What to do next, step by step','आगे क्या करें, कदम-कदम','ഇനി ചെയ്യേണ്ടത്, ഘട്ടം ഘട്ടമായി'),
  step:t('Step','कदम','ഘട്ടം'), of:t('of','में से','ആകെ'),
  call:t('Call 1930','1930 पर फ़ोन कीजिए','1930 വിളിക്കൂ'),
  callNow:t('Call 1930 now','अभी 1930 पर फ़ोन कीजिए','ഇപ്പോൾ 1930 വിളിക്കൂ'),
  callSub:t('Cyber fraud helpline · Free','साइबर ठगी हेल्पलाइन · मुफ़्त','സൈബർ തട്ടിപ്പ് ഹെൽപ്പ്‌ലൈൻ · സൗജന്യം'),
  print:t('Print guide','गाइड प्रिंट कीजिए','ഗൈഡ് പ്രിന്റ് ചെയ്യൂ'),
  share:t('Send to family','परिवार को भेजिए','കുടുംബത്തിന് അയയ്ക്കൂ'),
  shareFailed:t('Could not share. Please try again.','भेज नहीं पाए। फिर कोशिश कीजिए।','അയയ്ക്കാനായില്ല. വീണ്ടും ശ്രമിക്കൂ.'),
  done:t('Done','हो गया','കഴിഞ്ഞു'),
  next:[t('Next: call your bank','आगे: बैंक को फ़ोन','അടുത്തത്: ബാങ്കിനെ വിളിക്കൂ'),t('Next: complaint online','आगे: ऑनलाइन शिकायत','അടുത്തത്: ഓൺലൈൻ പരാതി'),t('Next: the 3 day rule','आगे: 3 दिन का नियम','അടുത്തത്: 3 ദിവസ നിയമം'),t('Next: speak up','आगे: किसी को बताइए','അടുത്തത്: ഒരാളോട് പറയൂ'),t('Next: more help','आगे: और मदद','അടുത്തത്: കൂടുതൽ സഹായം')],
  pages:[
    {
      title:t('Lost money to a scam? Act now.','ठगी में पैसे गए? अभी कदम उठाइए।','തട്ടിപ്പിൽ പണം പോയോ? ഇപ്പോൾ നടപടി എടുക്കൂ.'),
      lead:t('It is not your fault. Scammers fool careful people every day.','यह आपकी गलती नहीं है। ठग सावधान लोगों को भी रोज़ फँसाते हैं।','ഇത് നിങ്ങളുടെ തെറ്റല്ല. സൂക്ഷിക്കുന്നവരെയും തട്ടിപ്പുകാർ ദിവസവും കബളിപ്പിക്കുന്നു.'),
      urgent:t('Call 1930 first. The sooner you call, the better the chance of stopping the money before it moves. Recovery is not guaranteed.','पहले 1930 पर फ़ोन कीजिए। जितनी जल्दी बताएँगे, पैसे आगे जाने से रोकने की संभावना उतनी बेहतर है। पैसे वापस मिलने की गारंटी नहीं है।','ആദ്യം 1930 വിളിക്കൂ. എത്ര വേഗം വിളിക്കുന്നുവോ, പണം മറ്റൊരിടത്തേക്ക് പോകുന്നത് തടയാനുള്ള സാധ്യത അത്ര കൂടുതലാണ്. പണം തിരികെ കിട്ടുമെന്ന് ഉറപ്പില്ല.'),
      listHeading:t('Tell them:','उन्हें बताइए:','അവരോട് പറയൂ:'),
      items:[t('How much money was taken','कितने पैसे गए','എത്ര പണം നഷ്ടപ്പെട്ടു'),t('When: date and time','कब: तारीख और समय','എപ്പോൾ: തീയതിയും സമയവും'),t('How you paid: UPI, card or bank','कैसे दिए: UPI, कार्ड या बैंक','എങ്ങനെ അടച്ചു: UPI, കാർഡ്, ബാങ്ക്'),t('Scammer’s number or UPI ID','ठग का नंबर या UPI ID','തട്ടിപ്പുകാരന്റെ നമ്പറോ UPI ID-യോ')],
      takeaway:t('Write down the complaint number they give you. It also comes by SMS.','शिकायत नंबर लिख लीजिए। यह SMS से भी आता है।','അവർ തരുന്ന പരാതി നമ്പർ എഴുതിവയ്ക്കൂ. SMS വഴിയും ഇത് വരും.'),
    },
    {
      title:t('Call your bank','अपने बैंक को फ़ोन कीजिए','നിങ്ങളുടെ ബാങ്കിനെ വിളിക്കൂ'),
      lead:t('Use the number on the back of your card or in your bank’s app.','कार्ड के पीछे या बैंक के ऐप में दिए नंबर पर फ़ोन कीजिए।','കാർഡിന്റെ പിന്നിലോ ബാങ്ക് ആപ്പിലോ ഉള്ള നമ്പർ ഉപയോഗിക്കൂ.'),
      listHeading:t('Ask them to:','उनसे कहिए:','അവരോട് ആവശ്യപ്പെടൂ:'),
      items:[t('Block the affected card, UPI or net banking.','जिस कार्ड, UPI या नेट बैंकिंग से पैसे गए, उसे बंद करें।','പണം നഷ്ടപ്പെട്ട കാർഡ്, UPI, നെറ്റ് ബാങ്കിങ് എന്നിവ തടയുക.'),t('Record it as fraud. Give them your 1930 complaint number, if you have it.','ठगी की शिकायत दर्ज करें। 1930 का शिकायत नंबर मिला हो, तो बताइए।','തട്ടിപ്പായി രേഖപ്പെടുത്തുക. 1930 പരാതി നമ്പർ ലഭിച്ചിട്ടുണ്ടെങ്കിൽ നൽകൂ.'),t('Give you a bank reference number for your report.','बैंक की शिकायत का संदर्भ नंबर दें।','ബാങ്കിലെ പരാതിക്ക് ഒരു റഫറൻസ് നമ്പർ നൽകുക.')],
      extraHeading:t('And from now on:','अब से:','ഇനി മുതൽ:'),
      extra:[t('Stop talking to the scammer.','ठग से बात बंद कीजिए।','തട്ടിപ്പുകാരനോട് സംസാരിക്കുന്നത് നിർത്തൂ.'),t('Do not send any more money.','और पैसे मत भेजिए।','ഇനി പണം അയയ്ക്കരുത്.'),t('Do not delete messages. They are proof.','संदेश मत मिटाइए। वे सबूत हैं।','സന്ദേശങ്ങൾ ഇല്ലാതാക്കരുത്. അവ തെളിവാണ്.')],
      takeaway:t('Never call a number the scammer gave you, even if they say it is the bank.','ठग के दिए नंबर पर कभी फ़ोन मत कीजिए, चाहे वह उसे बैंक का नंबर कहे।','തട്ടിപ്പുകാരൻ നൽകിയ നമ്പറിൽ ഒരിക്കലും വിളിക്കരുത്, അത് ബാങ്കിന്റേതാണെന്ന് പറഞ്ഞാലും.'),
    },
    {
      title:t('Finish the complaint online','ऑनलाइन शिकायत पूरी कीजिए','ഓൺലൈനിൽ പരാതി പൂർത്തിയാക്കൂ'),
      lead:t('Fill in the details on cybercrime.gov.in using your 1930 complaint number. It is fine to ask someone you trust to help.','1930 के शिकायत नंबर से cybercrime.gov.in पर जानकारी भरिए। भरोसेमंद व्यक्ति की मदद लेना ठीक है।','1930 പരാതി നമ്പർ ഉപയോഗിച്ച് cybercrime.gov.in-ൽ വിവരങ്ങൾ നൽകൂ. വിശ്വസിക്കുന്ന ഒരാളോട് സഹായം ചോദിക്കാം.'),
      // Current portal entry verified in a browser; do not use the mockup placeholder.
      portal:t('Start with “Register a Complaint”. Report the financial fraud.','“Register a Complaint” से शुरू कीजिए। पैसे की ठगी की शिकायत कीजिए।','“Register a Complaint” വഴി തുടങ്ങൂ. പണത്തട്ടിപ്പ് റിപ്പോർട്ട് ചെയ്യൂ.'),
      listHeading:t('Keep this proof ready:','ये सबूत तैयार रखिए:','ഈ തെളിവുകൾ തയ്യാറാക്കൂ:'),
      items:[t('Screenshots of chats or messages','बातचीत या संदेशों के स्क्रीनशॉट','ചാറ്റുകളുടെയോ സന്ദേശങ്ങളുടെയോ സ്ക്രീൻഷോട്ടുകൾ'),t('Bank SMS showing the money debited','पैसे कटने का बैंक SMS','പണം കുറഞ്ഞതായി കാണിക്കുന്ന ബാങ്ക് SMS'),t('Scammer’s number, UPI ID or link','ठग का नंबर, UPI ID या लिंक','തട്ടിപ്പുകാരന്റെ നമ്പർ, UPI ID, ലിങ്ക്'),t('Date, time and amount','तारीख, समय और रकम','തീയതി, സമയം, തുക')],
      takeaway:t('No 1930 number yet? You can still file on the website directly.','1930 का नंबर अभी नहीं मिला? वेबसाइट पर सीधे शिकायत कर सकते हैं।','1930 നമ്പർ കിട്ടിയില്ലേ? വെബ്സൈറ്റിൽ നേരിട്ട് പരാതി നൽകാം.'),
    },
    {
      title:t('Your money back: the 3 day rule','पैसे वापस: 3 दिन का नियम','പണം തിരികെ: 3 ദിവസ നിയമം'),
      lead:t('RBI rules protect you in certain unauthorised electronic transactions. Tell your bank quickly.','कुछ बिना अनुमति हुए इलेक्ट्रॉनिक लेनदेन में RBI के नियम सुरक्षा देते हैं। बैंक को जल्दी बताइए।','അനുമതിയില്ലാതെ നടക്കുന്ന ചില ഇലക്ട്രോണിക് ഇടപാടുകളിൽ RBI നിയമങ്ങൾ സംരക്ഷണം നൽകുന്നു. ബാങ്കിനെ വേഗം അറിയിക്കൂ.'),
      rule:t('If a breach was neither your fault nor the bank’s, report it within 3 working days of receiving the bank’s transaction alert. Under this rule, you have zero liability.','अगर गड़बड़ी न आपकी, न बैंक की गलती से हुई हो, तो बैंक का लेनदेन संदेश मिलने के 3 कामकाजी दिनों के भीतर बताइए। इस नियम में नुकसान की ज़िम्मेदारी आपकी नहीं है।','നിങ്ങളുടെയോ ബാങ്കിന്റെയോ തെറ്റല്ലാത്ത സുരക്ഷാ വീഴ്ചയാണെങ്കിൽ, ബാങ്കിന്റെ ഇടപാട് അറിയിപ്പ് ലഭിച്ച് 3 പ്രവൃത്തി ദിവസത്തിനകം റിപ്പോർട്ട് ചെയ്യൂ. ഈ നിയമപ്രകാരം നഷ്ടത്തിന് നിങ്ങൾ ഉത്തരവാദിയല്ല.'),
      credit:t('For covered unauthorised transactions, the bank must give provisional credit within 10 working days of your report. This is not a promise of final recovery for every scam.','इस नियम में आने वाले बिना अनुमति के लेनदेन में, शिकायत के 10 कामकाजी दिनों में बैंक को अस्थायी रकम जमा करनी होती है। हर ठगी में पूरी रकम वापस मिलने का वादा नहीं है।','നിയമം ബാധകമായ അനുമതിയില്ലാത്ത ഇടപാടുകളിൽ, റിപ്പോർട്ട് ചെയ്ത് 10 പ്രവൃത്തി ദിവസത്തിനകം ബാങ്ക് താൽക്കാലിക ക്രെഡിറ്റ് നൽകണം. എല്ലാ തട്ടിപ്പിലും പണം ഉറപ്പായി തിരിച്ചുകിട്ടുമെന്ന വാഗ്ദാനമല്ല ഇത്.'),
      caution:t('Shared your OTP or PIN? You may bear losses before you report. Under these rules, losses after you report are the bank’s responsibility. Still report now, even if you sent the money yourself.','OTP या PIN बता दिया? शिकायत से पहले का नुकसान आपकी ज़िम्मेदारी हो सकता है। इन नियमों में शिकायत के बाद का नुकसान बैंक की ज़िम्मेदारी है। खुद पैसे भेजे हों, तब भी अभी शिकायत कीजिए।','OTP അല്ലെങ്കിൽ PIN പറഞ്ഞോ? റിപ്പോർട്ട് ചെയ്യുന്നതിന് മുമ്പുള്ള നഷ്ടം നിങ്ങൾ വഹിക്കേണ്ടി വന്നേക്കാം. ഈ നിയമപ്രകാരം റിപ്പോർട്ടിന് ശേഷമുള്ള നഷ്ടം ബാങ്കിന്റെ ഉത്തരവാദിത്തമാണ്. സ്വയം പണം അയച്ചതാണെങ്കിലും ഇപ്പോൾ റിപ്പോർട്ട് ചെയ്യൂ.'),
      takeaway:t('Later than 3 working days? Still report it. Ask your bank how the rules apply to your case.','3 कामकाजी दिन से ज़्यादा हो गए? फिर भी शिकायत कीजिए। बैंक से पूछिए कि आपके मामले में कौन से नियम लागू हैं।','3 പ്രവൃത്തി ദിവസം കഴിഞ്ഞോ? എന്നാലും റിപ്പോർട്ട് ചെയ്യൂ. നിങ്ങളുടെ കേസിൽ നിയമങ്ങൾ എങ്ങനെ ബാധകമാണെന്ന് ബാങ്കിനോട് ചോദിക്കൂ.'),
    },
    {
      title:t('Speak up, and watch for a second scam','किसी को बताइए, दोबारा ठगी से बचिए','ഒരാളോട് പറയൂ, മറ്റൊരു തട്ടിപ്പും ശ്രദ്ധിക്കൂ'),
      cards:[
        {title:t('Tell family or a friend today','आज ही परिवार या दोस्त को बताइए','ഇന്നുതന്നെ കുടുംബത്തോടോ സുഹൃത്തിനോടോ പറയൂ'),text:t('You do not have to handle this alone. Someone you trust can help you report and keep the proof.','यह अकेले सँभालने की ज़रूरत नहीं है। भरोसेमंद व्यक्ति शिकायत करने और सबूत रखने में मदद कर सकता है।','ഇത് ഒറ്റയ്ക്ക് നേരിടേണ്ടതില്ല. വിശ്വസിക്കുന്ന ഒരാൾക്ക് റിപ്പോർട്ട് ചെയ്യാനും തെളിവ് സൂക്ഷിക്കാനും സഹായിക്കാം.')},
        {title:t('“We can get your money back”','“हम आपके पैसे वापस दिला देंगे”','“നിങ്ങളുടെ പണം തിരികെ തരാം”'),text:t('Do not pay anyone who promises recovery for a fee. Calling 1930 and filing on cybercrime.gov.in are free. Never share an OTP or PIN with a caller.','पैसे वापस दिलाने की फीस माँगने वाले को पैसे मत दीजिए। 1930 पर फ़ोन और cybercrime.gov.in पर शिकायत मुफ़्त हैं। कॉल करने वाले को OTP या PIN कभी मत बताइए।','ഫീസ് വാങ്ങി പണം തിരികെ തരാമെന്ന് പറയുന്നവർക്ക് പണം നൽകരുത്. 1930-ൽ വിളിക്കുന്നതും cybercrime.gov.in-ൽ പരാതിപ്പെടുന്നതും സൗജന്യമാണ്. വിളിക്കുന്നവരോട് OTP, PIN എന്നിവ പറയരുത്.')},
        {title:t('Be patient','धीरज रखिए','ക്ഷമയോടെ കാത്തിരിക്കൂ'),text:t('Recovery takes time and is not certain. Check your complaint status on cybercrime.gov.in using your complaint number.','पैसे वापस मिलने में समय लगता है और यह पक्का नहीं है। शिकायत नंबर से cybercrime.gov.in पर स्थिति देखिए।','പണം തിരിച്ചുകിട്ടാൻ സമയമെടുക്കും, ഉറപ്പുമില്ല. പരാതി നമ്പർ ഉപയോഗിച്ച് cybercrime.gov.in-ൽ നില പരിശോധിക്കൂ.')},
      ],
      takeaway:t('Keep your complaint numbers and proof together. Let someone you trust support you.','शिकायत नंबर और सबूत साथ रखिए। भरोसेमंद व्यक्ति का साथ लीजिए।','പരാതി നമ്പറുകളും തെളിവുകളും ഒന്നിച്ച് സൂക്ഷിക്കൂ. വിശ്വസിക്കുന്ന ഒരാളുടെ സഹായം സ്വീകരിക്കൂ.'),
    },
    {
      title:t('More help','और मदद','കൂടുതൽ സഹായം'),
      emergency:t('In danger or threatened','खतरा या धमकी हो','അപകടത്തിലോ ഭീഷണിയിലോ ആണെങ്കിൽ'),
      women:t('Women’s helpline','महिला हेल्पलाइन','വനിതാ ഹെൽപ്പ്‌ലൈൻ'),
      womenNote:t('181 availability varies by state. If it does not connect and you are in danger, call 112.','181 की सेवा राज्य के अनुसार है। फ़ोन न लगे और खतरा हो, तो 112 पर फ़ोन कीजिए।','181 ലഭ്യത സംസ്ഥാനമനുസരിച്ചാണ്. ബന്ധപ്പെടാനാകാതെ അപകടത്തിലാണെങ്കിൽ 112 വിളിക്കൂ.'),
      cards:[
        {title:t('Threats to share an intimate photo or video','निजी फोटो या वीडियो फैलाने की धमकी','സ്വകാര്യ ഫോട്ടോയോ വീഡിയോയോ പ്രചരിപ്പിക്കുമെന്ന ഭീഷണി'),text:t('Do not pay. Save the evidence, then block and report on cybercrime.gov.in. StopNCII.org can help adults protect intimate images taken at age 18 or older on participating platforms. It cannot remove them from the whole internet.','पैसे मत दीजिए। सबूत बचाइए, फिर ब्लॉक करके cybercrime.gov.in पर शिकायत कीजिए। StopNCII.org वयस्कों की 18 साल या उसके बाद ली गई निजी तस्वीरों के लिए जुड़े प्लेटफ़ॉर्म पर मदद कर सकता है। यह पूरे इंटरनेट से नहीं हटा सकता।','പണം നൽകരുത്. തെളിവ് സൂക്ഷിച്ചശേഷം ബ്ലോക്ക് ചെയ്ത് cybercrime.gov.in-ൽ റിപ്പോർട്ട് ചെയ്യൂ. 18 വയസ്സോ അതിലധികമോ പ്രായത്തിൽ എടുത്ത സ്വകാര്യ ചിത്രങ്ങൾക്ക് മുതിർന്നവരെ സഹായിക്കാൻ StopNCII.org-ന് കഴിയും, പങ്കാളി പ്ലാറ്റ്ഫോമുകളിൽ മാത്രം. ഇന്റർനെറ്റ് മുഴുവൻ നിന്ന് നീക്കാൻ കഴിയില്ല.')},
        {title:t('Suspicious call or message, but no money lost','शक वाला कॉल या संदेश, लेकिन पैसे नहीं गए','സംശയകരമായ കോളോ സന്ദേശമോ, പണം നഷ്ടപ്പെട്ടിട്ടില്ല'),text:t('Report the call, SMS or WhatsApp message through Chakshu on Sanchar Saathi. Money already lost? Use 1930 and cybercrime.gov.in instead.','कॉल, SMS या WhatsApp संदेश की जानकारी Sanchar Saathi के Chakshu पर दीजिए। पैसे जा चुके हैं? 1930 और cybercrime.gov.in का इस्तेमाल कीजिए।','കോൾ, SMS, WhatsApp സന്ദേശം എന്നിവ Sanchar Saathi-യിലെ Chakshu വഴി റിപ്പോർട്ട് ചെയ്യൂ. പണം നഷ്ടപ്പെട്ടോ? 1930, cybercrime.gov.in എന്നിവ ഉപയോഗിക്കൂ.')},
        {title:t('Rather talk in person?','सामने जाकर बात करना चाहेंगे?','നേരിട്ട് സംസാരിക്കണോ?'),text:t('Go to your nearest police station or cyber cell. Take your complaint numbers and proof.','नज़दीकी पुलिस थाने या साइबर सेल जाइए। शिकायत नंबर और सबूत साथ ले जाइए।','അടുത്തുള്ള പോലീസ് സ്റ്റേഷനിലോ സൈബർ സെല്ലിലോ പോകൂ. പരാതി നമ്പറുകളും തെളിവുകളും കൊണ്ടുപോകൂ.')},
      ],
      takeaway:t('You are not alone. Help is available, even if you are unsure what happened.','आप अकेले नहीं हैं। क्या हुआ, यह साफ़ न हो, तब भी मदद मिल सकती है।','നിങ്ങൾ ഒറ്റയ്ക്കല്ല. എന്താണ് സംഭവിച്ചതെന്ന് ഉറപ്പില്ലെങ്കിലും സഹായം ലഭിക്കും.'),
    },
  ],
};
export function scamHelp(lang) {
  const local = v => Array.isArray(v) ? v.map(local) : v && typeof v==='object' ? 'en' in v ? v[lang] || v.en : Object.fromEntries(Object.entries(v).map(([k,x])=>[k,local(x)])) : v;
  return local(SCAM_HELP);
}
