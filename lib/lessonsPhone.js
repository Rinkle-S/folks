// Phone basics: everyday things on the phone itself, not tied to one app.
// Same lesson shape as lessons.js. Practice screens are drawn from blocks (components/screens/Gen.js).
import { tr, intro, tap, note, quiz, opt, SKIN, homeScreen, settingsRoot, quickPanel } from './guide';

const base = { app: 'phone', appName: 'Phone basics', minutes: 2 };
const fix = (en, hi, ml) => ({ en, hi, ml });
const swipeHome = () => homeScreen([{ t: 'handle', id: 'swipe', label: 'Slide down from here' }]);
const swipeSay = tr(
  'Put your finger at the very top of the screen and slide it down. For practice, tap the glowing line.',
  'उंगली को स्क्रीन के बिल्कुल ऊपर रखकर नीचे सरकाइए। अभ्यास के लिए चमकती लाइन दबाइए।',
  'വിരൽ സ്ക്രീനിന്റെ ഏറ്റവും മുകളിൽ വെച്ച് താഴേക്ക് നീക്കൂ. പരിശീലനത്തിന് തിളങ്ങുന്ന വര അമർത്തൂ.'
);
const swipeHint = tr('Tap the line at the top of the screen.', 'स्क्रीन के ऊपर वाली लाइन दबाइए।', 'സ്ക്രീനിന്റെ മുകളിലെ വര അമർത്തൂ.');
const openSettings = tap(
  'open-settings',
  'app-settings',
  homeScreen(),
  tr('Tap Settings, the grey gear icon.', "Settings दबाइए, सलेटी गियर वाला निशान।", 'Settings അമർത്തൂ, ചാര നിറത്തിലുള്ള ഗിയർ അടയാളം.'),
  tr('Tap the gear icon in the second row.', 'दूसरी लाइन में गियर का निशान दबाइए।', 'രണ്ടാമത്തെ വരിയിലെ ഗിയർ അടയാളം അമർത്തൂ.')
);

export const PHONE_LESSONS = {
  flashlight: {
    id: 'flashlight',
    icon: 'bulb',
    emoji: '🔦',
    ...base,
    title: tr('Turn on the flashlight', 'टॉर्च चालू करें', 'ടോർച്ച് ഓൺ ചെയ്യാം'),
    takeaways: fix(
      ['Slide your finger down from the very top', "Tap 'Flashlight'", 'Tap it again to switch it off'],
      ['सबसे ऊपर से उंगली नीचे सरकाएं', "'Flashlight' दबाएं", 'बंद करने के लिए फिर दबाएं'],
      ['ഏറ്റവും മുകളിൽ നിന്ന് വിരൽ താഴേക്ക് നീക്കുക', "'Flashlight' അമർത്തുക", 'ഓഫ് ചെയ്യാൻ വീണ്ടും അമർത്തുക']
    ),
    share: tr('I learned to turn on the flashlight on Nook! 🔦', 'मैंने Nook पर टॉर्च चालू करना सीख लिया! 🔦', 'ഞാൻ Nook-ൽ ടോർച്ച് ഓൺ ചെയ്യാൻ പഠിച്ചു! 🔦'),
    realTry: tr(
      'Slide down from the top of your own phone and switch the flashlight on and off once.',
      'अपने फ़ोन में ऊपर से नीचे सरकाइए और टॉर्च एक बार चालू और बंद कीजिए।',
      'നിങ്ങളുടെ ഫോണിൽ മുകളിൽ നിന്ന് താഴേക്ക് നീക്കി ടോർച്ച് ഒരു തവണ ഓൺ ചെയ്ത് ഓഫ് ചെയ്യൂ.'
    ),
    steps: [
      intro(
        tr(
          "Today we'll turn on the flashlight. It helps in the dark, like in a power cut. This is practice.",
          'आज हम टॉर्च चालू करना सीखेंगे। अंधेरे में, जैसे बिजली जाने पर, यह काम आती है। यह अभ्यास है।',
          'ഇന്ന് ടോർച്ച് ഓൺ ചെയ്യാൻ പഠിക്കാം. കറന്റ് പോകുമ്പോൾ പോലെ ഇരുട്ടിൽ ഇത് സഹായിക്കും. ഇത് പരിശീലനം ആണ്.'
        )
      ),
      tap('swipe', 'swipe', swipeHome(), swipeSay, swipeHint),
      tap(
        'flash-on',
        'flash',
        quickPanel(),
        tr("You see small round buttons. Tap the one that says 'Flashlight'.", "छोटे गोल बटन दिख रहे हैं। जिस पर 'Flashlight' लिखा है, उसे दबाइए।", "ചെറിയ വട്ട ബട്ടണുകൾ കാണാം. 'Flashlight' എന്നുള്ളത് അമർത്തൂ."),
        tr("Tap 'Flashlight', the third button.", "'Flashlight', तीसरा बटन, दबाइए।", "'Flashlight', മൂന്നാമത്തെ ബട്ടൺ, അമർത്തൂ.")
      ),
      tap(
        'flash-off',
        'flash',
        quickPanel({ flash: true }),
        tr(
          'The button is blue now. The light at the back of your phone is on. Tap it again to turn it off.',
          'बटन नीला हो गया। फ़ोन के पीछे की रोशनी जल गई। बंद करने के लिए इसे फिर दबाइए।',
          'ബട്ടൺ നീലയായി. ഫോണിന്റെ പിന്നിലെ ലൈറ്റ് കത്തി. ഓഫ് ചെയ്യാൻ വീണ്ടും അമർത്തൂ.'
        ),
        tr('Tap the blue Flashlight button.', 'नीला Flashlight बटन दबाइए।', 'നീല Flashlight ബട്ടൺ അമർത്തൂ.')
      ),
      quiz(
        'switch-off',
        quickPanel(),
        tr('Why should you switch the flashlight off when you are done?', 'काम होने पर टॉर्च बंद क्यों करनी चाहिए?', 'കഴിഞ്ഞാൽ ടോർച്ച് ഓഫ് ചെയ്യേണ്ടത് എന്തുകൊണ്ട്?'),
        [
          opt(tr('It uses the battery', 'इससे बैटरी खर्च होती है', 'ബാറ്ററി തീരും'), true, tr('Right! A flashlight left on drains the battery fast.', 'सही! टॉर्च जलती रहे तो बैटरी जल्दी खत्म होती है।', 'ശരി! ടോർച്ച് കത്തിക്കിടന്നാൽ ബാറ്ററി വേഗം തീരും.')),
          opt(tr('It breaks the phone', 'इससे फ़ोन टूट जाता है', 'ഫോൺ പൊട്ടിപ്പോകും'), false, tr('No, it does not break the phone. But it drains the battery, so switch it off.', 'नहीं, फ़ोन नहीं टूटता। पर बैटरी खत्म होती है, इसलिए बंद कर दीजिए।', 'ഇല്ല, ഫോൺ പൊട്ടില്ല. പക്ഷേ ബാറ്ററി തീരും, അതുകൊണ്ട് ഓഫ് ചെയ്യൂ.'))
        ]
      ),
    ],
  },

  hotspot: {
    id: 'hotspot',
    icon: 'share',
    emoji: '📡',
    ...base,
    minutes: 3,
    title: tr('Share your phone internet (hotspot)', 'फ़ोन का इंटरनेट शेयर करें (हॉटस्पॉट)', 'ഫോണിലെ ഇന്റർനെറ്റ് പങ്കിടാം (ഹോട്ട്സ്പോട്ട്)'),
    takeaways: fix(
      ["Settings, then 'Connections'", "Switch on 'Mobile hotspot'", 'Tell only trusted people the name and password'],
      ["Settings, फिर 'Connections'", "'Mobile hotspot' चालू करें", 'नाम और पासवर्ड सिर्फ़ भरोसे के लोगों को बताएं'],
      ["Settings, പിന്നെ 'Connections'", "'Mobile hotspot' ഓൺ ചെയ്യുക", 'പേരും പാസ്‌വേഡും വിശ്വസ്തരോട് മാത്രം പറയുക']
    ),
    share: tr('I learned to share my phone internet on Nook! 📡', 'मैंने Nook पर फ़ोन का इंटरनेट शेयर करना सीखा! 📡', 'ഞാൻ Nook-ൽ ഫോണിലെ ഇന്റർനെറ്റ് പങ്കിടാൻ പഠിച്ചു! 📡'),
    realTry: tr(
      'When a family member needs internet on a laptop, turn on the hotspot on your real phone, and turn it off after.',
      'जब घर में किसी को लैपटॉप पर इंटरनेट चाहिए, तो अपने असली फ़ोन में हॉटस्पॉट चालू कीजिए, और बाद में बंद कर दीजिए।',
      'വീട്ടിൽ ആർക്കെങ്കിലും ലാപ്ടോപ്പിൽ ഇന്റർനെറ്റ് വേണമെങ്കിൽ, നിങ്ങളുടെ ഫോണിൽ ഹോട്ട്സ്പോട്ട് ഓൺ ചെയ്യൂ, കഴിഞ്ഞാൽ ഓഫ് ചെയ്യൂ.'
    ),
    steps: [
      intro(
        tr(
          "Your son's laptop has no internet. Today we'll share your phone's internet with it. This is called a hotspot. This is practice.",
          'बेटे के लैपटॉप में इंटरनेट नहीं है। आज हम अपने फ़ोन का इंटरनेट उसे देना सीखेंगे। इसे हॉटस्पॉट कहते हैं। यह अभ्यास है।',
          'മകന്റെ ലാപ്ടോപ്പിൽ ഇന്റർനെറ്റ് ഇല്ല. ഇന്ന് നിങ്ങളുടെ ഫോണിലെ ഇന്റർനെറ്റ് അതിന് കൊടുക്കാൻ പഠിക്കാം. ഇതിനെ ഹോട്ട്സ്പോട്ട് എന്ന് പറയും. ഇത് പരിശീലനം ആണ്.'
        )
      ),
      openSettings,
      tap(
        'connections',
        'connections',
        settingsRoot(),
        tr("Tap 'Connections', the first one.", "'Connections', पहला वाला, दबाइए।", "'Connections', ആദ്യത്തേത്, അമർത്തൂ."),
        tr("Tap the first row, 'Connections'.", "पहली लाइन 'Connections' दबाइए।", "ആദ്യത്തെ വരി 'Connections' അമർത്തൂ.")
      ),
      tap(
        'hotspot-row',
        'hotspot-row',
        {
          skin: SKIN.settings,
          blocks: [
            { t: 'bar', title: 'Connections', back: true },
            {
              t: 'rows',
              items: [
                { id: 'wifi-row', e: '📶', title: 'Wi-Fi', sub: 'Home_Network', right: 'On' },
                { id: 'bt-row', e: '🔷', title: 'Bluetooth', sub: 'Off' },
                { id: 'air-row', e: '✈️', title: 'Airplane mode', sub: 'Off' },
                { id: 'hotspot-row', e: '📡', title: 'Mobile Hotspot and Tethering', sub: 'Share your internet' },
                { id: 'data-row', e: '📊', title: 'Data usage', sub: '4.2 GB used' },
              ],
            },
          ],
        },
        tr("Tap 'Mobile Hotspot and Tethering'.", "'Mobile Hotspot and Tethering' दबाइए।", "'Mobile Hotspot and Tethering' അമർത്തൂ."),
        tr('Tap the fourth row, with the dish icon.', 'चौथी लाइन, जिसमें डिश का निशान है, दबाइए।', 'നാലാമത്തെ വരി, ഡിഷ് അടയാളം ഉള്ളത്, അമർത്തൂ.')
      ),
      tap(
        'hs-switch',
        'hs-switch',
        {
          skin: SKIN.settings,
          blocks: [
            { t: 'bar', title: 'Mobile Hotspot', back: true },
            { t: 'rows', items: [{ id: 'hs-switch', e: '📡', title: 'Mobile Hotspot', sub: 'Off', on: false }] },
            { t: 'text', text: 'When it is on, other devices can use your phone internet.' },
          ],
        },
        tr('Tap the switch to turn the hotspot on.', 'हॉटस्पॉट चालू करने के लिए स्विच दबाइए।', 'ഹോട്ട്സ്പോട്ട് ഓൺ ചെയ്യാൻ സ്വിച്ച് അമർത്തൂ.'),
        tr('Tap the switch on the right.', 'दाईं तरफ़ का स्विच दबाइए।', 'വലതുവശത്തെ സ്വിച്ച് അമർത്തൂ.')
      ),
      note(
        'hs-on',
        {
          skin: SKIN.settings,
          blocks: [
            { t: 'bar', title: 'Mobile Hotspot', back: true },
            { t: 'rows', items: [{ e: '📡', title: 'Mobile Hotspot', sub: 'On', on: true }] },
            { t: 'rows', items: [{ e: '🏷️', title: 'Network name', sub: 'Kamala_Phone', noChev: true }, { e: '🔑', title: 'Password', sub: '••••••••', noChev: true }] },
          ],
        },
        tr(
          'The hotspot is on. On the laptop, choose the network name shown here and type the password. Keep it private.',
          'हॉटस्पॉट चालू है। लैपटॉप में यहाँ दिखा नेटवर्क का नाम चुनिए और पासवर्ड डालिए। इसे गुप्त रखिए।',
          'ഹോട്ട്സ്പോട്ട് ഓൺ ആണ്. ലാപ്ടോപ്പിൽ ഇവിടെ കാണുന്ന നെറ്റ്‌വർക്ക് പേര് തിരഞ്ഞെടുത്ത് പാസ്‌വേഡ് അടിക്കൂ. അത് രഹസ്യമായി വെക്കൂ.'
        )
      ),
      quiz(
        'password',
        {
          skin: SKIN.settings,
          blocks: [{ t: 'bar', title: 'Mobile Hotspot', back: true }, { t: 'rows', items: [{ e: '📡', title: 'Mobile Hotspot', sub: 'On', on: true }] }],
        },
        tr('A stranger on the bus asks for your hotspot password. What do you do?', 'बस में एक अजनबी आपके हॉटस्पॉट का पासवर्ड मांगता है। आप क्या करेंगे?', 'ബസ്സിൽ ഒരു അപരിചിതൻ നിങ്ങളുടെ ഹോട്ട്സ്പോട്ട് പാസ്‌വേഡ് ചോദിക്കുന്നു. നിങ്ങൾ എന്ത് ചെയ്യും?'),
        [
          opt(tr('Say no politely', 'विनम्रता से मना कर दूँ', 'മര്യാദയോടെ പറ്റില്ലെന്ന് പറയും'), true, tr('Right! Share it only with people you trust, and turn the hotspot off afterwards.', 'सही! सिर्फ़ भरोसे के लोगों को बताइए, और काम होने पर हॉटस्पॉट बंद कर दीजिए।', 'ശരി! വിശ്വസ്തരോട് മാത്രം പറയൂ, കഴിഞ്ഞാൽ ഹോട്ട്സ്പോട്ട് ഓഫ് ചെയ്യൂ.')),
          opt(tr('Give it, he seems nice', 'दे दूँ, वो भला लगता है', 'കൊടുക്കും, നല്ലയാളാണെന്ന് തോന്നുന്നു'), false, tr('No. A stranger can use your data, and may see what you do. Keep it private.', 'नहीं। अजनबी आपका डेटा खर्च कर सकता है और आपकी चीज़ें देख भी सकता है। इसे गुप्त रखिए।', 'വേണ്ട. അപരിചിതൻ നിങ്ങളുടെ ഡാറ്റ ഉപയോഗിക്കും, നിങ്ങൾ ചെയ്യുന്നത് കാണാനും സാധ്യതയുണ്ട്. രഹസ്യമായി വെക്കൂ.'))
        ]
      ),
    ],
  },

  selfie: {
    id: 'selfie',
    icon: 'camera',
    emoji: '🤳',
    ...base,
    title: tr('Take a photo and a selfie', 'फ़ोटो और सेल्फ़ी लें', 'ഫോട്ടോയും സെൽഫിയും എടുക്കാം'),
    takeaways: fix(
      ['Open Camera', 'Tap the two-arrows button to switch to your face', 'Tap the big white circle to take the photo'],
      ['Camera खोलें', 'अपना चेहरा देखने के लिए दो तीरों वाला बटन दबाएं', 'फ़ोटो लेने के लिए बड़ा सफ़ेद गोला दबाएं'],
      ['Camera തുറക്കുക', 'നിങ്ങളുടെ മുഖം കാണാൻ രണ്ട് അമ്പുകളുള്ള ബട്ടൺ അമർത്തുക', 'ഫോട്ടോ എടുക്കാൻ വലിയ വെളുത്ത വൃത്തം അമർത്തുക']
    ),
    share: tr('I learned to take a selfie on Nook! 🤳', 'मैंने Nook पर सेल्फ़ी लेना सीखा! 🤳', 'ഞാൻ Nook-ൽ സെൽഫി എടുക്കാൻ പഠിച്ചു! 🤳'),
    realTry: tr('Take one photo of a plant with the back camera and one selfie with the front camera.', 'पीछे वाले कैमरे से एक पौधे की और आगे वाले कैमरे से एक सेल्फ़ी लीजिए।', 'പിൻ ക്യാമറ കൊണ്ട് ഒരു ചെടിയുടെ ഫോട്ടോയും മുൻ ക്യാമറ കൊണ്ട് ഒരു സെൽഫിയും എടുക്കൂ.'),
    steps: [
      intro(tr("Today we'll take a photo, and then a photo of yourself, called a selfie. This is practice.", 'आज हम फ़ोटो लेंगे, और फिर अपनी फ़ोटो, जिसे सेल्फ़ी कहते हैं। यह अभ्यास है।', 'ഇന്ന് ഒരു ഫോട്ടോ എടുക്കാം, പിന്നെ സ്വന്തം ഫോട്ടോ, അതിനെ സെൽഫി എന്ന് പറയും. ഇത് പരിശീലനം ആണ്.')),
      tap('open-camera', 'app-camera', homeScreen(), tr('Tap Camera, the grey camera icon.', 'Camera दबाइए, सलेटी कैमरा वाला निशान।', 'Camera അമർത്തൂ, ചാര നിറത്തിലുള്ള ക്യാമറ അടയാളം.'), tr('Tap the camera icon in the first row.', 'पहली लाइन में कैमरा का निशान दबाइए।', 'ആദ്യത്തെ വരിയിലെ ക്യാമറ അടയാളം അമർത്തൂ.')),
      tap('flip', 'flip', { skin: SKIN.dark, blocks: [{ t: 'view', e: '🪴', flip: 'flip', shutter: 'shutter', galleryId: 'thumb', top: [{ e: '⚡' }, { e: '⏱️' }] }] },
        tr('The camera shows the plant in front of you. To see your own face, tap the button with two arrows, at the bottom right.', 'कैमरा सामने का पौधा दिखा रहा है। अपना चेहरा देखने के लिए नीचे दाईं तरफ़ दो तीरों वाला बटन दबाइए।', 'ക്യാമറ നിങ്ങളുടെ മുന്നിലെ ചെടി കാണിക്കുന്നു. സ്വന്തം മുഖം കാണാൻ താഴെ വലതുവശത്തെ രണ്ട് അമ്പുകളുള്ള ബട്ടൺ അമർത്തൂ.'),
        tr('Tap the round button with two arrows, bottom right.', 'नीचे दाईं तरफ़ दो तीरों वाला गोल बटन दबाइए।', 'താഴെ വലതുവശത്തെ രണ്ട് അമ്പുകളുള്ള വട്ട ബട്ടൺ അമർത്തൂ.')),
      tap('shutter', 'shutter', { skin: SKIN.dark, blocks: [{ t: 'view', e: '🙂', front: true, flip: 'flip', shutter: 'shutter', galleryId: 'thumb', top: [{ e: '⚡' }, { e: '⏱️' }] }] },
        tr('Now you can see your face. Tap the big white circle to take the photo.', 'अब आपका चेहरा दिख रहा है। फ़ोटो लेने के लिए बड़ा सफ़ेद गोला दबाइए।', 'ഇപ്പോൾ നിങ്ങളുടെ മുഖം കാണാം. ഫോട്ടോ എടുക്കാൻ വലിയ വെളുത്ത വൃത്തം അമർത്തൂ.'),
        tr('Tap the big white circle in the middle at the bottom.', 'नीचे बीच में बड़ा सफ़ेद गोला दबाइए।', 'താഴെ നടുവിലെ വലിയ വെളുത്ത വൃത്തം അമർത്തൂ.')),
      tap('see-photo', 'thumb', { skin: SKIN.dark, blocks: [{ t: 'view', e: '🙂', front: true, flip: 'flip', shutter: 'shutter', galleryId: 'thumb', thumb: '🙂', top: [{ e: '⚡' }, { e: '⏱️' }] }, { t: 'toast', text: 'Photo saved' }] },
        tr('The photo is saved. Tap the small picture at the bottom left to see it.', 'फ़ोटो सेव हो गई। उसे देखने के लिए नीचे बाईं तरफ़ की छोटी तस्वीर दबाइए।', 'ഫോട്ടോ സേവ് ആയി. കാണാൻ താഴെ ഇടതുവശത്തെ ചെറിയ ചിത്രം അമർത്തൂ.'),
        tr('Tap the small picture at the bottom left.', 'नीचे बाईं तरफ़ की छोटी तस्वीर दबाइए।', 'താഴെ ഇടതുവശത്തെ ചെറിയ ചിത്രം അമർത്തൂ.')),
      note('result', { skin: SKIN.android, blocks: [{ t: 'bar', title: 'Gallery', back: true }, { t: 'hero', e: '🙂', title: 'Your selfie', sub: 'Saved in Gallery' }] },
        tr('Well done! This is your selfie. It is saved in Gallery, and you can send it on WhatsApp.', 'शाबाश! यह आपकी सेल्फ़ी है। यह Gallery में सेव है, और WhatsApp पर भेज सकते हैं।', 'ഭേഷ്! ഇതാണ് നിങ്ങളുടെ സെൽഫി. ഇത് Gallery-യിൽ സേവ് ആയി, WhatsApp-ൽ അയയ്ക്കാം.')),
    ],
  },

  silent: {
    id: 'silent',
    icon: 'bell',
    emoji: '🔕',
    ...base,
    title: tr('Put the phone on silent', 'फ़ोन साइलेंट पर करें', 'ഫോൺ സൈലന്റ് ആക്കാം'),
    takeaways: fix(
      ['Slide down from the top', "Tap 'Sound' once for vibrate, twice for mute", 'Tap again to bring the sound back'],
      ['ऊपर से नीचे सरकाएं', "'Sound' एक बार दबाएं तो वाइब्रेट, दो बार तो म्यूट", 'आवाज़ वापस लाने के लिए फिर दबाएं'],
      ['മുകളിൽ നിന്ന് താഴേക്ക് നീക്കുക', "'Sound' ഒരു തവണ അമർത്തിയാൽ വൈബ്രേറ്റ്, രണ്ട് തവണ മ്യൂട്ട്", 'ശബ്ദം തിരികെ വരാൻ വീണ്ടും അമർത്തുക']
    ),
    share: tr('I learned to put my phone on silent on Nook! 🔕', 'मैंने Nook पर फ़ोन साइलेंट करना सीखा! 🔕', 'ഞാൻ Nook-ൽ ഫോൺ സൈലന്റ് ആക്കാൻ പഠിച്ചു! 🔕'),
    realTry: tr('At a temple or a meeting, put your real phone on silent, and bring the sound back afterwards.', 'मंदिर या मीटिंग में अपना असली फ़ोन साइलेंट कीजिए, और बाद में आवाज़ वापस लाइए।', 'അമ്പലത്തിലോ മീറ്റിങ്ങിലോ നിങ്ങളുടെ ഫോൺ സൈലന്റ് ആക്കൂ, കഴിഞ്ഞാൽ ശബ്ദം തിരികെ കൊണ്ടുവരൂ.'),
    steps: [
      intro(tr("Today we'll make the phone quiet, for a temple or a meeting. This is practice.", 'आज हम फ़ोन को शांत करना सीखेंगे, मंदिर या मीटिंग के लिए। यह अभ्यास है।', 'ഇന്ന് അമ്പലത്തിലോ മീറ്റിങ്ങിലോ പോകുമ്പോൾ ഫോൺ നിശബ്ദമാക്കാൻ പഠിക്കാം. ഇത് പരിശീലനം ആണ്.')),
      tap('swipe', 'swipe', swipeHome(), swipeSay, swipeHint),
      tap('vibrate', 'sound', quickPanel(), tr("Tap the button that says 'Sound'. The phone will only vibrate now.", "जिस बटन पर 'Sound' लिखा है, उसे दबाइए। अब फ़ोन सिर्फ़ वाइब्रेट करेगा।", "'Sound' എന്നുള്ള ബട്ടൺ അമർത്തൂ. ഇപ്പോൾ ഫോൺ വൈബ്രേറ്റ് മാത്രം ചെയ്യും."), tr("Tap 'Sound', the fourth button.", "'Sound', चौथा बटन, दबाइए।", "'Sound', നാലാമത്തെ ബട്ടൺ, അമർത്തൂ.")),
      tap('mute', 'sound', quickPanel({ sound: 'Vibrate' }), tr("It says 'Vibrate' now. Tap again to make it fully quiet.", "अब 'Vibrate' लिखा है। पूरी तरह शांत करने के लिए फिर दबाइए।", "ഇപ്പോൾ 'Vibrate' എന്ന് കാണിക്കുന്നു. പൂർണ്ണമായും നിശബ്ദമാക്കാൻ വീണ്ടും അമർത്തൂ."), tr("Tap the same button, 'Vibrate'.", "वही बटन, 'Vibrate', दबाइए।", "അതേ ബട്ടൺ, 'Vibrate', അമർത്തൂ.")),
      tap('sound-back', 'sound', quickPanel({ sound: 'Mute' }), tr("Now it says 'Mute'. No ringing and no vibration. To bring the sound back, tap once more.", "अब 'Mute' लिखा है। न घंटी बजेगी, न वाइब्रेट होगा। आवाज़ वापस लाने के लिए एक बार और दबाइए।", "ഇപ്പോൾ 'Mute' എന്ന് കാണിക്കുന്നു. റിങ് ഇല്ല, വൈബ്രേഷനും ഇല്ല. ശബ്ദം തിരികെ കൊണ്ടുവരാൻ ഒരു തവണ കൂടി അമർത്തൂ."), tr("Tap the button that says 'Mute'.", "'Mute' लिखा बटन दबाइए।", "'Mute' എന്നുള്ള ബട്ടൺ അമർത്തൂ.")),
      note('back', quickPanel({ sound: 'Sound' }), tr("It says 'Sound' again, so your phone will ring. Always bring the sound back after the temple or meeting, so you don't miss calls.", "फिर 'Sound' लिखा है, यानी फ़ोन की घंटी बजेगी। मंदिर या मीटिंग के बाद आवाज़ ज़रूर वापस लाइए, ताकि कॉल न छूटे।", "വീണ്ടും 'Sound' എന്ന് കാണിക്കുന്നു, അതായത് ഫോൺ റിങ് ചെയ്യും. അമ്പലത്തിലോ മീറ്റിങ്ങിലോ കഴിഞ്ഞാൽ ശബ്ദം തിരികെ കൊണ്ടുവരണം, അല്ലെങ്കിൽ കോളുകൾ നഷ്ടപ്പെടും.")),
    ],
  },

  'bigger-text': {
    id: 'bigger-text',
    icon: 'text',
    emoji: '🔠',
    ...base,
    title: tr('Make the words bigger', 'अक्षर बड़े करें', 'അക്ഷരങ്ങൾ വലുതാക്കാം'),
    takeaways: fix(
      ["Settings, then 'Display'", "Open 'Font size'", 'Tap the biggest A'],
      ["Settings, फिर 'Display'", "'Font size' खोलें", 'सबसे बड़ा A दबाएं'],
      ["Settings, പിന്നെ 'Display'", "'Font size' തുറക്കുക", 'ഏറ്റവും വലിയ A അമർത്തുക']
    ),
    share: tr('I made the words bigger on my phone with Nook! 🔠', 'मैंने Nook से फ़ोन के अक्षर बड़े कर लिए! 🔠', 'ഞാൻ Nook കൊണ്ട് ഫോണിലെ അക്ഷരങ്ങൾ വലുതാക്കി! 🔠'),
    realTry: tr('Make the words bigger on your real phone, and see if it is easier to read.', 'अपने असली फ़ोन में अक्षर बड़े कीजिए और देखिए पढ़ना आसान होता है या नहीं।', 'നിങ്ങളുടെ ഫോണിൽ അക്ഷരങ്ങൾ വലുതാക്കി, വായിക്കാൻ എളുപ്പമായോ എന്ന് നോക്കൂ.'),
    steps: [
      intro(tr("Is it hard to read the small words on your phone? Today we'll make them bigger. This is practice.", 'फ़ोन के छोटे अक्षर पढ़ने में दिक्कत होती है? आज हम उन्हें बड़ा करेंगे। यह अभ्यास है।', 'ഫോണിലെ ചെറിയ അക്ഷരങ്ങൾ വായിക്കാൻ ബുദ്ധിമുട്ടുണ്ടോ? ഇന്ന് അവ വലുതാക്കാം. ഇത് പരിശീലനം ആണ്.')),
      openSettings,
      tap('display', 'display', settingsRoot(), tr("Tap 'Display', the one with the sun.", "'Display' दबाइए, जिसमें सूरज का निशान है।", "'Display' അമർത്തൂ, സൂര്യന്റെ അടയാളം ഉള്ളത്."), tr("Tap the fourth row, 'Display'.", "चौथी लाइन 'Display' दबाइए।", "നാലാമത്തെ വരി 'Display' അമർത്തൂ.")),
      tap('font', 'font', { skin: SKIN.settings, blocks: [{ t: 'bar', title: 'Display', back: true }, { t: 'rows', items: [{ id: 'bright', e: '☀️', title: 'Brightness', sub: 'Auto' }, { id: 'font', e: '🔠', title: 'Font size and style', sub: 'Small' }, { id: 'zoom', e: '🔍', title: 'Screen zoom', sub: 'Default' }] }] },
        tr("Tap 'Font size and style'.", "'Font size and style' दबाइए।", "'Font size and style' അമർത്തൂ."), tr('Tap the middle row, with the big A.', 'बीच की लाइन, जिसमें बड़ा A है, दबाइए।', 'നടുവിലെ വരി, വലിയ A ഉള്ളത്, അമർത്തൂ.')),
      tap('biggest', 's4', { skin: SKIN.settings, blocks: [{ t: 'bar', title: 'Font size', back: true }, { t: 'slider', value: 0, sample: 14, stops: [{ id: 's1' }, { id: 's2' }, { id: 's3' }, { id: 's4' }] }] },
        tr('These words are small. Under them are four dots. The last dot is the biggest. Tap it.', 'ये अक्षर छोटे हैं। इनके नीचे चार बिंदु हैं। आख़िरी बिंदु सबसे बड़ा है। उसे दबाइए।', 'ഈ അക്ഷരങ്ങൾ ചെറുതാണ്. താഴെ നാല് കുത്തുകൾ ഉണ്ട്. അവസാനത്തെ കുത്ത് ഏറ്റവും വലുത്. അത് അമർത്തൂ.'), tr('Tap the dot on the far right.', 'सबसे दाईं तरफ़ का बिंदु दबाइए।', 'ഏറ്റവും വലതുവശത്തെ കുത്ത് അമർത്തൂ.')),
      note('result', { skin: SKIN.settings, blocks: [{ t: 'bar', title: 'Font size', back: true }, { t: 'slider', value: 3, sample: 26, preview: 'Now the words are big and clear.', stops: [{ id: 's1' }, { id: 's2' }, { id: 's3' }, { id: 's4' }] }] },
        tr('Look! The words are big now. All your apps will use this bigger size. You can change it back any time.', 'देखिए! अब अक्षर बड़े हो गए। आपके सारे ऐप अब यही बड़ा आकार इस्तेमाल करेंगे। आप कभी भी वापस बदल सकते हैं।', 'നോക്കൂ! അക്ഷരങ്ങൾ വലുതായി. നിങ്ങളുടെ എല്ലാ ആപ്പുകളും ഇനി ഈ വലിയ വലുപ്പം ഉപയോഗിക്കും. എപ്പോൾ വേണമെങ്കിലും തിരികെ മാറ്റാം.')),
    ],
  },

  screenshot: {
    id: 'screenshot',
    icon: 'image',
    emoji: '📸',
    ...base,
    title: tr('Save the screen as a photo (screenshot)', 'स्क्रीन की फ़ोटो रखें (स्क्रीनशॉट)', 'സ്ക്രീനിന്റെ ഫോട്ടോ സൂക്ഷിക്കാം (സ്ക്രീൻഷോട്ട്)'),
    takeaways: fix(
      ['Press Volume down and Power together for one second', 'The screen is saved as a photo', 'Never take a screenshot of your PIN or OTP'],
      ['Volume down और Power एक साथ एक सेकंड दबाएं', 'स्क्रीन फ़ोटो की तरह सेव हो जाती है', 'PIN या OTP का स्क्रीनशॉट कभी न लें'],
      ['Volume down, Power എന്നിവ ഒരു സെക്കൻഡ് ഒരുമിച്ച് അമർത്തുക', 'സ്ക്രീൻ ഒരു ഫോട്ടോ ആയി സേവ് ആകും', 'PIN, OTP എന്നിവയുടെ സ്ക്രീൻഷോട്ട് ഒരിക്കലും എടുക്കരുത്']
    ),
    share: tr('I learned to take a screenshot on Nook! 📸', 'मैंने Nook पर स्क्रीनशॉट लेना सीखा! 📸', 'ഞാൻ Nook-ൽ സ്ക്രീൻഷോട്ട് എടുക്കാൻ പഠിച്ചു! 📸'),
    realTry: tr('Open any message on your real phone, and take a screenshot of it. Find it in Gallery.', 'अपने असली फ़ोन में कोई संदेश खोलिए और उसका स्क्रीनशॉट लीजिए। उसे Gallery में ढूंढिए।', 'നിങ്ങളുടെ ഫോണിൽ ഏതെങ്കിലും സന്ദേശം തുറന്ന് അതിന്റെ സ്ക്രീൻഷോട്ട് എടുക്കൂ. Gallery-യിൽ അത് കണ്ടെത്തൂ.'),
    steps: [
      intro(tr("A screenshot saves what is on your screen as a photo. It's useful to keep a bill or a train ticket. This is practice.", 'स्क्रीनशॉट आपकी स्क्रीन को फ़ोटो की तरह सेव कर लेता है। बिल या ट्रेन टिकट रखने के लिए काम आता है। यह अभ्यास है।', 'സ്ക്രീനിൽ ഉള്ളത് ഒരു ഫോട്ടോ ആയി സൂക്ഷിക്കുന്നതാണ് സ്ക്രീൻഷോട്ട്. ബില്ലോ ട്രെയിൻ ടിക്കറ്റോ സൂക്ഷിക്കാൻ ഇത് ഉപകരിക്കും. ഇത് പരിശീലനം ആണ്.')),
      tap('press', 'both', { skin: SKIN.android, blocks: [{ t: 'bar', title: 'Train ticket', tone: 'brand' }, { t: 'cards', items: [{ e: '🚆', title: 'Kochi to Chennai', sub: 'Tomorrow, 6:40 PM · Seat 32', price: 'Confirmed' }] }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'both', label: 'Press Volume down + Power together', e: '🔉', tone: 'soft' }] }] },
        tr('We want to save this ticket. On the side of your phone, press the Volume down button and the Power button together, for one second. For practice, tap the glowing button.', 'हम यह टिकट सेव करना चाहते हैं। फ़ोन की साइड में Volume down और Power बटन एक साथ एक सेकंड दबाइए। अभ्यास के लिए चमकता बटन दबाइए।', 'ഈ ടിക്കറ്റ് സൂക്ഷിക്കണം. ഫോണിന്റെ വശത്തുള്ള Volume down, Power ബട്ടണുകൾ ഒരു സെക്കൻഡ് ഒരുമിച്ച് അമർത്തൂ. പരിശീലനത്തിന് തിളങ്ങുന്ന ബട്ടൺ അമർത്തൂ.'),
        tr('Tap the glowing button at the bottom.', 'नीचे चमकता बटन दबाइए।', 'താഴെ തിളങ്ങുന്ന ബട്ടൺ അമർത്തൂ.')),
      tap('open-gallery', 'app-gallery', homeScreen(), tr('The screenshot is saved. Tap Gallery to see it.', 'स्क्रीनशॉट सेव हो गया। उसे देखने के लिए Gallery दबाइए।', 'സ്ക്രീൻഷോട്ട് സേവ് ആയി. കാണാൻ Gallery അമർത്തൂ.'), tr('Tap the picture icon, Gallery.', 'तस्वीर वाला निशान, Gallery, दबाइए।', 'ചിത്രത്തിന്റെ അടയാളം, Gallery, അമർത്തൂ.')),
      tap('shot', 'shot', { skin: SKIN.android, blocks: [{ t: 'bar', title: 'Gallery' }, { t: 'cards', title: 'Today', items: [{ id: 'shot', e: '🚆', title: 'Screenshot', sub: 'Just now', tag: 'NEW' }, { e: '🪴', title: 'Photo', sub: 'Yesterday' }] }] },
        tr('Here is your screenshot at the top. Tap it.', 'यह रहा आपका स्क्रीनशॉट, सबसे ऊपर। इसे दबाइए।', 'ഇതാ നിങ്ങളുടെ സ്ക്രീൻഷോട്ട്, ഏറ്റവും മുകളിൽ. അത് അമർത്തൂ.'), tr("Tap the top one that says 'Screenshot'.", "सबसे ऊपर जिस पर 'Screenshot' लिखा है, उसे दबाइए।", "ഏറ്റവും മുകളിൽ 'Screenshot' എന്ന് എഴുതിയത് അമർത്തൂ.")),
      quiz('safety', { skin: SKIN.android, blocks: [{ t: 'bar', title: 'Screenshot', back: true }, { t: 'hero', e: '🚆', title: 'Train ticket', sub: 'Saved as a photo' }] },
        tr('Your bank sends an OTP. Should you take a screenshot of it to keep?', 'बैंक ने OTP भेजा है। क्या उसका स्क्रीनशॉट रख लेना चाहिए?', 'ബാങ്ക് ഒരു OTP അയച്ചിരിക്കുന്നു. അതിന്റെ സ്ക്രീൻഷോട്ട് സൂക്ഷിക്കണോ?'),
        [
          opt(tr('Yes, to remember it', 'हाँ, याद रखने के लिए', 'വേണം, ഓർത്തുവെക്കാൻ'), false, tr('No. An OTP or a PIN should never be saved as a photo. Anyone who sees the photo can use it.', 'नहीं। OTP या PIN कभी फ़ोटो में सेव मत कीजिए। फ़ोटो देखने वाला कोई भी उसे इस्तेमाल कर सकता है।', 'വേണ്ട. OTP, PIN എന്നിവ ഒരിക്കലും ഫോട്ടോ ആയി സൂക്ഷിക്കരുത്. ആ ഫോട്ടോ കാണുന്ന ആർക്കും അത് ഉപയോഗിക്കാം.')),
          opt(tr('No, never', 'नहीं, कभी नहीं', 'വേണ്ട, ഒരിക്കലും'), true, tr('Right! Use an OTP at once and never save it. Tickets and bills are fine to save.', 'सही! OTP को तुरंत इस्तेमाल कीजिए, कभी सेव मत कीजिए। टिकट और बिल सेव कर सकते हैं।', 'ശരി! OTP ഉടനെ ഉപയോഗിക്കൂ, ഒരിക്കലും സൂക്ഷിക്കരുത്. ടിക്കറ്റും ബില്ലും സൂക്ഷിക്കാം.'))
        ]),
    ],
  },

  wifi: {
    id: 'wifi',
    icon: 'cast',
    emoji: '🛜',
    ...base,
    minutes: 3,
    title: tr('Connect to Wi-Fi', 'Wi-Fi से जुड़ें', 'Wi-Fi-യിൽ കണക്ട് ചെയ്യാം'),
    takeaways: fix(
      ["Settings, then 'Connections', then 'Wi-Fi'", 'Switch Wi-Fi on and tap your home network', 'The password is often on the back of the router'],
      ["Settings, फिर 'Connections', फिर 'Wi-Fi'", 'Wi-Fi चालू करें और अपना घर का नेटवर्क दबाएं', 'पासवर्ड अक्सर राउटर के पीछे लिखा होता है'],
      ["Settings, പിന്നെ 'Connections', പിന്നെ 'Wi-Fi'", 'Wi-Fi ഓൺ ചെയ്ത് നിങ്ങളുടെ വീട്ടിലെ നെറ്റ്‌വർക്ക് അമർത്തുക', 'പാസ്‌വേഡ് മിക്കവാറും റൂട്ടറിന്റെ പിന്നിൽ എഴുതിയിരിക്കും']
    ),
    share: tr('I learned to connect to Wi-Fi on Nook! 🛜', 'मैंने Nook पर Wi-Fi से जुड़ना सीखा! 🛜', 'ഞാൻ Nook-ൽ Wi-Fi കണക്ട് ചെയ്യാൻ പഠിച്ചു! 🛜'),
    realTry: tr('Look at the back of your Wi-Fi router for the name and password, then connect your real phone.', 'अपने Wi-Fi राउटर के पीछे नाम और पासवर्ड देखिए, फिर अपना असली फ़ोन जोड़िए।', 'വൈഫൈ റൂട്ടറിന്റെ പിന്നിൽ പേരും പാസ്‌വേഡും നോക്കി നിങ്ങളുടെ ഫോൺ കണക്ട് ചെയ്യൂ.'),
    steps: [
      intro(tr("Wi-Fi saves your mobile data. Today we'll connect the phone to the Wi-Fi at home. This is practice.", 'Wi-Fi से मोबाइल का डेटा बचता है। आज हम फ़ोन को घर के Wi-Fi से जोड़ेंगे। यह अभ्यास है।', 'Wi-Fi മൊബൈൽ ഡാറ്റ ലാഭിക്കും. ഇന്ന് ഫോൺ വീട്ടിലെ Wi-Fi-യുമായി കണക്ട് ചെയ്യാം. ഇത് പരിശീലനം ആണ്.')),
      openSettings,
      tap('connections', 'connections', settingsRoot(), tr("Tap 'Connections', the first one.", "'Connections', पहला वाला, दबाइए।", "'Connections', ആദ്യത്തേത്, അമർത്തൂ."), tr("Tap the first row, 'Connections'.", "पहली लाइन 'Connections' दबाइए।", "ആദ്യത്തെ വരി 'Connections' അമർത്തൂ.")),
      tap('wifi-row', 'wifi-row', { skin: SKIN.settings, blocks: [{ t: 'bar', title: 'Connections', back: true }, { t: 'rows', items: [{ id: 'wifi-row', e: '📶', title: 'Wi-Fi', sub: 'Off', right: 'Off' }, { id: 'bt-row', e: '🔷', title: 'Bluetooth', sub: 'Off' }, { id: 'air-row', e: '✈️', title: 'Airplane mode', sub: 'Off' }] }] },
        tr("Tap 'Wi-Fi', the first one.", "'Wi-Fi', पहला वाला, दबाइए।", "'Wi-Fi', ആദ്യത്തേത്, അമർത്തൂ."), tr('Tap the first row, Wi-Fi.', 'पहली लाइन Wi-Fi दबाइए।', 'ആദ്യത്തെ വരി Wi-Fi അമർത്തൂ.')),
      tap('wifi-on', 'wifi-switch', { skin: SKIN.settings, blocks: [{ t: 'bar', title: 'Wi-Fi', back: true }, { t: 'rows', items: [{ id: 'wifi-switch', e: '📶', title: 'Wi-Fi', sub: 'Off', on: false }] }, { t: 'text', text: 'Turn on Wi-Fi to see networks near you.' }] },
        tr('Wi-Fi is off. Tap the switch to turn it on.', 'Wi-Fi बंद है। उसे चालू करने के लिए स्विच दबाइए।', 'Wi-Fi ഓഫ് ആണ്. ഓൺ ചെയ്യാൻ സ്വിച്ച് അമർത്തൂ.'), tr('Tap the switch on the right.', 'दाईं तरफ़ का स्विच दबाइए।', 'വലതുവശത്തെ സ്വിച്ച് അമർത്തൂ.')),
      tap('network', 'net-home', { skin: SKIN.settings, blocks: [{ t: 'bar', title: 'Wi-Fi', back: true }, { t: 'rows', items: [{ id: 'wifi-switch', e: '📶', title: 'Wi-Fi', sub: 'On', on: true }] }, { t: 'rows', title: 'Networks near you', items: [{ id: 'net-home', e: '🛜', title: 'Sunrise_Home', sub: 'Strong signal' }, { id: 'net-other', e: '🔒', title: 'Neighbour_5G', sub: 'Secured' }] }] },
        tr("These are the networks near you. Tap your home network, 'Sunrise_Home'.", "ये आपके पास के नेटवर्क हैं। अपना घर का नेटवर्क 'Sunrise_Home' दबाइए।", "ഇവയാണ് നിങ്ങളുടെ അടുത്തുള്ള നെറ്റ്‌വർക്കുകൾ. നിങ്ങളുടെ വീട്ടിലെ നെറ്റ്‌വർക്ക് 'Sunrise_Home' അമർത്തൂ."), tr("Tap 'Sunrise_Home', the first one.", "'Sunrise_Home', पहला वाला, दबाइए।", "'Sunrise_Home', ആദ്യത്തേത്, അമർത്തൂ.")),
      tap('connect', 'connect', { skin: SKIN.settings, blocks: [{ t: 'bar', title: 'Wi-Fi', back: true }, { t: 'rows', items: [{ e: '📶', title: 'Wi-Fi', sub: 'On', on: true }] }, { t: 'dialog', title: 'Sunrise_Home', body: 'Password is filled in for practice. In real life, type the one from the back of your router.', actions: [{ id: 'cancel', label: 'Cancel' }, { id: 'connect', label: 'Connect' }] }] },
        tr('It asks for the password. In real life you type it from the back of the router. For practice, it is already filled. Tap Connect.', 'यह पासवर्ड मांग रहा है। असल में आप राउटर के पीछे से देखकर लिखते हैं। अभ्यास के लिए यह पहले से भरा है। Connect दबाइए।', 'പാസ്‌വേഡ് ചോദിക്കുന്നു. സാധാരണ റൂട്ടറിന്റെ പിന്നിൽ നിന്ന് നോക്കി അടിക്കണം. പരിശീലനത്തിന് അത് നേരത്തെ നിറച്ചിട്ടുണ്ട്. Connect അമർത്തൂ.'), tr('Tap Connect, the blue word on the right.', 'दाईं तरफ़ का नीला शब्द Connect दबाइए।', 'വലതുവശത്തെ നീല വാക്ക് Connect അമർത്തൂ.')),
      note('done', { skin: SKIN.settings, blocks: [{ t: 'bar', title: 'Wi-Fi', back: true }, { t: 'hero', tone: 'good', e: '✅', title: 'Connected', sub: 'Sunrise_Home' }] },
        tr('Connected! You will see the Wi-Fi sign at the top of your phone. Your phone remembers this network next time.', 'जुड़ गया! फ़ोन के ऊपर Wi-Fi का निशान दिखेगा। अगली बार फ़ोन इस नेटवर्क को खुद याद रखेगा।', 'കണക്ട് ആയി! ഫോണിന്റെ മുകളിൽ Wi-Fi അടയാളം കാണാം. അടുത്ത തവണ ഫോൺ ഈ നെറ്റ്‌വർക്ക് ഓർത്തുവെക്കും.')),
    ],
  },

  'speaker-call': {
    id: 'speaker-call',
    icon: 'volume',
    emoji: '🔊',
    ...base,
    title: tr('Talk on speaker', 'स्पीकर पर बात करें', 'സ്പീക്കറിൽ സംസാരിക്കാം'),
    takeaways: fix(
      ["During a call, tap 'Speaker'", 'Now you can talk without holding the phone', 'Tap the red button to end the call'],
      ["कॉल के दौरान 'Speaker' दबाएं", 'अब फ़ोन पकड़े बिना बात कर सकते हैं', 'कॉल बंद करने के लिए लाल बटन दबाएं'],
      ["കോളിനിടയിൽ 'Speaker' അമർത്തുക", 'ഇപ്പോൾ ഫോൺ പിടിക്കാതെ സംസാരിക്കാം', 'കോൾ അവസാനിപ്പിക്കാൻ ചുവന്ന ബട്ടൺ അമർത്തുക']
    ),
    share: tr('I learned to use the speaker in a call on Nook! 🔊', 'मैंने Nook पर कॉल में स्पीकर चलाना सीखा! 🔊', 'ഞാൻ Nook-ൽ കോളിൽ സ്പീക്കർ ഉപയോഗിക്കാൻ പഠിച്ചു! 🔊'),
    realTry: tr('Call someone at home on your real phone and put them on speaker.', 'अपने असली फ़ोन से घर में किसी को कॉल कीजिए और स्पीकर चालू कीजिए।', 'നിങ്ങളുടെ ഫോണിൽ നിന്ന് വീട്ടിലെ ആരെയെങ്കിലും വിളിച്ച് സ്പീക്കർ ഓൺ ചെയ്യൂ.'),
    steps: [
      intro(tr("Today we'll learn to put a call on speaker, so everyone can hear and your hands stay free. This is practice.", 'आज हम कॉल को स्पीकर पर करना सीखेंगे, ताकि सब सुन सकें और आपके हाथ खाली रहें। यह अभ्यास है।', 'ഇന്ന് കോൾ സ്പീക്കറിൽ ഇടാൻ പഠിക്കാം, എല്ലാവർക്കും കേൾക്കാം, നിങ്ങളുടെ കൈ ഫ്രീ ആയിരിക്കും. ഇത് പരിശീലനം ആണ്.')),
      tap('speaker', 'speaker', { skin: SKIN.dark, blocks: [{ t: 'status' }, { t: 'hero', e: '👩', title: 'Sunita Didi', sub: '00:12' }, { t: 'tiles', items: [{ id: 'mute', e: '🎙️', label: 'Mute' }, { id: 'keypad', e: '⌗', label: 'Keypad' }, { id: 'speaker', e: '🔈', label: 'Speaker' }] }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'end', label: 'End call', tone: 'danger' }] }] },
        tr("You are on a call with Sunita Didi. Tap 'Speaker', the third button.", "आप सुनीता दीदी से कॉल पर हैं। 'Speaker', तीसरा बटन, दबाइए।", "നിങ്ങൾ സുനിത ദീദിയുമായി കോളിലാണ്. 'Speaker', മൂന്നാമത്തെ ബട്ടൺ, അമർത്തൂ."), tr("Tap 'Speaker', on the right.", "दाईं तरफ़ 'Speaker' दबाइए।", "വലതുവശത്തെ 'Speaker' അമർത്തൂ.")),
      tap('end', 'end', { skin: SKIN.dark, blocks: [{ t: 'status' }, { t: 'hero', e: '👩', title: 'Sunita Didi', sub: '00:30' }, { t: 'tiles', items: [{ id: 'mute', e: '🎙️', label: 'Mute' }, { id: 'keypad', e: '⌗', label: 'Keypad' }, { id: 'speaker', e: '🔊', label: 'Speaker', on: true }] }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'end', label: 'End call', tone: 'danger' }] }] },
        tr("Speaker is on, the button is blue. Now you can talk without holding the phone. When you finish, tap the red 'End call' button.", "Speaker चालू है, बटन नीला है। अब फ़ोन पकड़े बिना बात कर सकते हैं। बात पूरी हो, तो लाल 'End call' बटन दबाइए।", "Speaker ഓൺ ആണ്, ബട്ടൺ നീലയാണ്. ഇപ്പോൾ ഫോൺ പിടിക്കാതെ സംസാരിക്കാം. കഴിഞ്ഞാൽ ചുവന്ന 'End call' ബട്ടൺ അമർത്തൂ."), tr("Tap the red button at the bottom.", "नीचे लाल बटन दबाइए।", "താഴെ ചുവന്ന ബട്ടൺ അമർത്തൂ.")),
      quiz('privacy', { skin: SKIN.dark, blocks: [{ t: 'status' }, { t: 'hero', e: '🚌', title: 'In a crowded bus', sub: 'Your bank is calling' }] },
        tr('You are in a crowded bus and your bank calls. Should you use the speaker?', 'आप भीड़ वाली बस में हैं और बैंक का फ़ोन आया है। क्या स्पीकर चालू करना चाहिए?', 'നിങ്ങൾ തിരക്കുള്ള ബസ്സിലാണ്, ബാങ്കിൽ നിന്ന് ഫോൺ വന്നു. സ്പീക്കർ ഇടണോ?'),
        [
          opt(tr('Yes, it is easier', 'हाँ, आसान रहेगा', 'വേണം, എളുപ്പമാണ്'), false, tr('No. Others will hear private things. Use the speaker only at home or with family.', 'नहीं। आसपास के लोग निजी बातें सुन लेंगे। स्पीकर सिर्फ़ घर पर या परिवार के साथ इस्तेमाल कीजिए।', 'വേണ്ട. ചുറ്റുമുള്ളവർ സ്വകാര്യ കാര്യങ്ങൾ കേൾക്കും. സ്പീക്കർ വീട്ടിലോ വീട്ടുകാരുടെ കൂടെയോ മാത്രം ഉപയോഗിക്കൂ.')),
          opt(tr('No, hold it to my ear', 'नहीं, कान पर रखूँगा', 'വേണ്ട, ചെവിയിൽ വെക്കും'), true, tr('Right! Keep private calls private.', 'सही! निजी बातें निजी रखिए।', 'ശരി! സ്വകാര്യ സംഭാഷണങ്ങൾ സ്വകാര്യമായി വെക്കൂ.'))
        ]),
    ],
  },

  'block-number': {
    id: 'block-number',
    icon: 'sos',
    emoji: '🚫',
    ...base,
    title: tr('Block a number that keeps calling', 'बार-बार फ़ोन करने वाला नंबर ब्लॉक करें', 'വീണ്ടും വീണ്ടും വിളിക്കുന്ന നമ്പർ ബ്ലോക്ക് ചെയ്യാം'),
    takeaways: fix(
      ["Open Phone, then 'Recents'", "Tap the number, then 'Block'", 'Never share OTP or PIN with a caller'],
      ["Phone खोलें, फिर 'Recents'", "नंबर दबाएं, फिर 'Block'", 'कॉल करने वाले को OTP या PIN कभी न बताएं'],
      ["Phone തുറന്ന് 'Recents' നോക്കുക", "നമ്പർ അമർത്തി 'Block' ചെയ്യുക", 'വിളിക്കുന്നവരോട് OTP, PIN ഒരിക്കലും പറയരുത്']
    ),
    share: tr('I learned to block a spam number on Nook! 🚫', 'मैंने Nook पर स्पैम नंबर ब्लॉक करना सीखा! 🚫', 'ഞാൻ Nook-ൽ സ്പാം നമ്പർ ബ്ലോക്ക് ചെയ്യാൻ പഠിച്ചു! 🚫'),
    realTry: tr('Next time an unknown number keeps calling, block it from Recents.', 'अगली बार कोई अनजान नंबर बार-बार फ़ोन करे, तो उसे Recents से ब्लॉक कीजिए।', 'അടുത്ത തവണ അറിയാത്ത നമ്പർ വീണ്ടും വിളിച്ചാൽ Recents-ൽ നിന്ന് ബ്ലോക്ക് ചെയ്യൂ.'),
    steps: [
      intro(tr("An unknown number calls again and again, and asks for your OTP. Today we'll block it. This is practice.", 'कोई अनजान नंबर बार-बार फ़ोन करता है और OTP मांगता है। आज हम उसे ब्लॉक करेंगे। यह अभ्यास है।', 'ഒരു അറിയാത്ത നമ്പർ വീണ്ടും വീണ്ടും വിളിച്ച് OTP ചോദിക്കുന്നു. ഇന്ന് അത് ബ്ലോക്ക് ചെയ്യാം. ഇത് പരിശീലനം ആണ്.')),
      tap('open-phone', 'app-phone', homeScreen(), tr('Tap Phone, the green phone icon.', 'Phone दबाइए, हरा फ़ोन वाला निशान।', 'Phone അമർത്തൂ, പച്ച ഫോൺ അടയാളം.'), tr('Tap the phone icon in the first row.', 'पहली लाइन में फ़ोन का निशान दबाइए।', 'ആദ്യത്തെ വരിയിലെ ഫോൺ അടയാളം അമർത്തൂ.')),
      tap('number', 'num-spam', { skin: SKIN.android, blocks: [{ t: 'bar', title: 'Recents' }, { t: 'rows', items: [{ id: 'num-spam', e: '❓', title: '+91 98xxx xx210', sub: 'Missed call · 6 times today', bg: '#fce8e6' }, { id: 'num-didi', e: '👩', title: 'Sunita Didi', sub: 'Outgoing · 10:05' }, { id: 'num-rahul', e: '👦', title: 'Rahul (Beta)', sub: 'Incoming · Yesterday' }] }] },
        tr('This is the list of recent calls. The number at the top called six times. Tap it.', 'यह हाल की कॉल की लिस्ट है। सबसे ऊपर वाले नंबर ने छह बार फ़ोन किया। उसे दबाइए।', 'ഇത് അടുത്തിടെയുള്ള കോളുകളുടെ പട്ടികയാണ്. ഏറ്റവും മുകളിലെ നമ്പർ ആറ് തവണ വിളിച്ചു. അത് അമർത്തൂ.'), tr('Tap the first number, the red one.', 'पहला नंबर, लाल वाला, दबाइए।', 'ആദ്യത്തെ നമ്പർ, ചുവന്നത്, അമർത്തൂ.')),
      tap('block', 'block', { skin: SKIN.android, blocks: [{ t: 'bar', title: '+91 98xxx xx210', back: true }, { t: 'hero', e: '❓', title: '+91 98xxx xx210', sub: 'Not in your contacts' }, { t: 'buttons', row: true, items: [{ id: 'call', label: 'Call', tone: 'ghost' }, { id: 'msg', label: 'Message', tone: 'ghost' }] }, { t: 'buttons', items: [{ id: 'block', label: 'Block number', tone: 'danger' }] }] },
        tr("Tap the red button, 'Block number'.", "लाल बटन 'Block number' दबाइए।", "ചുവന്ന ബട്ടൺ 'Block number' അമർത്തൂ."), tr('Tap the red button at the bottom.', 'नीचे लाल बटन दबाइए।', 'താഴെ ചുവന്ന ബട്ടൺ അമർത്തൂ.')),
      tap('confirm', 'confirm', { skin: SKIN.android, blocks: [{ t: 'bar', title: '+91 98xxx xx210', back: true }, { t: 'hero', e: '❓', title: '+91 98xxx xx210' }, { t: 'dialog', title: 'Block this number?', body: 'It will not be able to call or message you.', actions: [{ id: 'cancel', label: 'Cancel' }, { id: 'confirm', label: 'Block', tone: 'danger' }] }] },
        tr("It asks if you are sure. Tap 'Block'.", "पूछ रहा है कि पक्का है? 'Block' दबाइए।", "ഉറപ്പാണോ എന്ന് ചോദിക്കുന്നു. 'Block' അമർത്തൂ."), tr("Tap the red word 'Block' on the right.", "दाईं तरफ़ लाल शब्द 'Block' दबाइए।", "വലതുവശത്തെ ചുവന്ന വാക്ക് 'Block' അമർത്തൂ.")),
      note('done', { skin: SKIN.android, blocks: [{ t: 'bar', title: 'Blocked', back: true }, { t: 'hero', tone: 'good', e: '✅', title: 'Number blocked', sub: '+91 98xxx xx210' }] },
        tr('Done! This number can no longer call you. Remember: nobody real asks for your OTP or PIN on a call.', 'हो गया! यह नंबर अब आपको फ़ोन नहीं कर सकेगा। याद रखिए: कोई असली व्यक्ति कॉल पर आपका OTP या PIN नहीं मांगता।', 'കഴിഞ്ഞു! ഈ നമ്പറിന് ഇനി നിങ്ങളെ വിളിക്കാൻ കഴിയില്ല. ഓർക്കുക: യഥാർത്ഥ ആരും കോളിൽ നിങ്ങളുടെ OTP, PIN എന്നിവ ചോദിക്കില്ല.')),
    ],
  },
};

export const PHONE_KEYWORDS = {
  flashlight: [['torch', 5], ['flashlight', 5], ['flash light', 5], ['टॉर्च', 5], ['टोर्च', 5], ['ടോർച്ച്', 5], ['light', 1], ['अंधेरा', 2]],
  hotspot: [['hotspot', 5], ['हॉटस्पॉट', 5], ['ഹോട്ട്സ്പോട്ട്', 5], ['tethering', 4], ['share internet', 4], ['share net', 4], ['इंटरनेट शेयर', 4], ['internet share', 4]],
  selfie: [['selfie', 5], ['सेल्फ़ी', 5], ['सेल्फी', 5], ['സെൽഫി', 5], ['camera', 3], ['कैमरा', 3], ['ക്യാമറ', 3], ['photo', 2], ['फोटो', 2], ['फ़ोटो', 2], ['switch camera', 4], ['flip camera', 4], ['front camera', 4]],
  silent: [['silent', 5], ['साइलेंट', 5], ['സൈലന്റ്', 5], ['mute', 3], ['म्यूट', 3], ['മ്യൂട്ട്', 3], ['vibrate', 3], ['volume', 2], ['आवाज़', 2], ['आवाज', 2], ['ശബ്ദം', 2], ['ring', 1]],
  'bigger-text': [['font', 4], ['text size', 5], ['bigger text', 5], ['big letters', 5], ['अक्षर', 4], ['फॉन्ट', 4], ['अक्षर बड़े', 5], ['അക്ഷര', 4], ['വലുത', 2], ['zoom', 2]],
  screenshot: [['screenshot', 5], ['स्क्रीनशॉट', 5], ['സ്ക്രീൻഷോട്ട്', 5], ['screen shot', 5], ['capture', 2]],
  wifi: [['wifi', 5], ['wi-fi', 5], ['wi fi', 5], ['वाईफाई', 5], ['वाई-फाई', 5], ['വൈഫൈ', 5], ['router', 3], ['network', 2]],
  'speaker-call': [['speaker', 5], ['स्पीकर', 5], ['സ്പീക്കർ', 5], ['loud', 2], ['call', 1]],
  'block-number': [['block', 4], ['ब्लॉक', 4], ['ബ്ലോക്ക്', 4], ['spam', 4], ['स्पैम', 4], ['സ്പാം', 4], ['unknown number', 4], ['अनजान', 3], ['disturb', 2], ['परेशान', 2]],
};
