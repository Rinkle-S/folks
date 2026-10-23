// Flipkart, Instagram and Spotify lessons. Screens are drawn from blocks (see components/screens/Gen.js).
import { tr, intro, tap, note, quiz, opt } from './guide';

const FK = { brand: '#2874f0', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f6' };
const IG = { brand: '#0095f6', ink: '#ffffff', bg: '#ffffff', soft: '#efefef', text: '#111' };
const SP = { brand: '#1db954', ink: '#000000', bg: '#121212', soft: '#2a2a2a', text: '#ffffff', dark: true };

const fix = (en, hi, ml) => ({ en, hi, ml });
const practiceOf = (app, appName) => ({ app, appName });

// ---------------------------------------------------------------- Flipkart
const fkBar = (right = true) => ({ t: 'bar', tone: 'brand', title: 'Flipkart', right: right ? [{ id: 'cart-ic', icon: 'bag' }] : [] });
const fkHome = () => ({ skin: FK, blocks: [fkBar(), { t: 'search', id: 'search', ph: 'Search for products, brands' }, { t: 'chips', items: [{ label: 'Grocery' }, { label: 'Mobiles' }, { label: 'Fashion' }, { label: 'Home' }] }, { t: 'cards', title: 'Deals for you', items: [{ e: '👟', title: 'Sports shoes', sub: 'Up to 60% off' }, { e: '🛋️', title: 'Home needs', sub: 'From ₹199' }] }] });
const fkProduct = (extra = []) => ({ skin: FK, blocks: [fkBar(), { t: 'hero', e: '🍶', title: 'Steel Water Bottle, 1 litre', sub: '₹299  (was ₹499)  40% off' }, { t: 'text', text: '★ 4.3  ·  Free delivery  ·  Cash on Delivery available' }, ...extra] });

export const APP1_LESSONS = {
  'flipkart-order': {
    id: 'flipkart-order',
    icon: 'bag',
    emoji: '🛍️',
    ...practiceOf('flipkart', 'Flipkart'),
    minutes: 4,
    title: tr('Order a steel bottle on Flipkart', 'Flipkart पर स्टील की बोतल मंगाएं', 'Flipkart-ൽ ഒരു സ്റ്റീൽ കുപ്പി ഓർഡർ ചെയ്യാം'),
    takeaways: fix(
      ['Search for what you want, then tap the product', "Check the price and the delivery address", "Choose 'Cash on Delivery' if you do not want to pay online"],
      ['जो चाहिए उसे खोजें, फिर प्रोडक्ट दबाएं', 'कीमत और डिलीवरी का पता जांचें', "ऑनलाइन पैसे नहीं देने हों तो 'Cash on Delivery' चुनें"],
      ['വേണ്ടത് തിരഞ്ഞ്, ഉൽപ്പന്നം അമർത്തുക', 'വിലയും ഡെലിവറി വിലാസവും നോക്കുക', "ഓൺലൈനായി പണം അടയ്ക്കേണ്ട എങ്കിൽ 'Cash on Delivery' തിരഞ്ഞെടുക്കുക"]
    ),
    share: tr('I learned to order on Flipkart with Nook! 🛍️', 'मैंने Nook से Flipkart पर ऑर्डर करना सीखा! 🛍️', 'ഞാൻ Nook കൊണ്ട് Flipkart-ൽ ഓർഡർ ചെയ്യാൻ പഠിച്ചു! 🛍️'),
    realTry: tr('Order something small on your real Flipkart, with Cash on Delivery, and check the address first.', 'अपने असली Flipkart पर कोई छोटी चीज़ Cash on Delivery से मंगाइए, और पहले पता जांचिए।', 'നിങ്ങളുടെ Flipkart-ൽ ചെറിയ എന്തെങ്കിലും Cash on Delivery ആയി ഓർഡർ ചെയ്യൂ, ആദ്യം വിലാസം നോക്കൂ.'),
    steps: [
      intro(tr("Today we'll order a steel water bottle on Flipkart, and pay cash when it comes. This is only practice. Nothing will be ordered.", 'आज हम Flipkart पर स्टील की पानी की बोतल मंगाएंगे, और आने पर नकद देंगे। यह सिर्फ़ अभ्यास है। कुछ भी ऑर्डर नहीं होगा।', 'ഇന്ന് Flipkart-ൽ ഒരു സ്റ്റീൽ വെള്ളക്കുപ്പി ഓർഡർ ചെയ്യാം, വരുമ്പോൾ പണമായി കൊടുക്കാം. ഇത് പരിശീലനം മാത്രം. ഒന്നും ഓർഡർ ആകില്ല.')),
      tap('search', 'search', fkHome(), tr('This is Flipkart. Tap the search box at the top.', 'यह Flipkart है। ऊपर सर्च बॉक्स दबाइए।', 'ഇത് Flipkart ആണ്. മുകളിലെ സെർച്ച് ബോക്സ് അമർത്തൂ.'), tr('Tap the white box that says Search.', "'Search' लिखा सफ़ेद डिब्बा दबाइए।", "'Search' എന്ന് എഴുതിയ വെളുത്ത പെട്ടി അമർത്തൂ.")),
      tap('suggest', 'sugg', { skin: FK, blocks: [{ t: 'search', text: 'steel water bottle' }, { t: 'rows', items: [{ id: 'sugg', icon: 'search', title: 'steel water bottle' }, { e: '🔍', title: 'steel water bottle 1 litre' }, { e: '🔍', title: 'steel bottle with cap' }] }] },
        tr("We typed 'steel water bottle' for you. Tap the first line.", "हमने 'steel water bottle' लिख दिया है। पहली लाइन दबाइए।", "ഞങ്ങൾ 'steel water bottle' എഴുതിയിട്ടുണ്ട്. ആദ്യത്തെ വരി അമർത്തൂ."), tr('Tap the first line.', 'पहली लाइन दबाइए।', 'ആദ്യത്തെ വരി അമർത്തൂ.')),
      tap('product', 'prod', { skin: FK, blocks: [fkBar(), { t: 'cards', title: 'Steel water bottle', items: [{ id: 'prod', e: '🍶', title: 'Steel Water Bottle, 1 litre', sub: '★ 4.3  ·  Free delivery', price: '₹299', tag: '40% off' }, { e: '🥤', title: 'Steel Bottle with straw', sub: '★ 3.9', price: '₹349' }, { e: '🧴', title: 'Plastic Bottle Set', sub: '★ 3.5', price: '₹149' }] }] },
        tr('These are the products. Each shows the price and the stars. Tap the first one, the steel bottle for 299 rupees.', 'ये प्रोडक्ट हैं। हर एक में कीमत और सितारे दिख रहे हैं। पहला वाला, 299 रुपये की स्टील की बोतल, दबाइए।', 'ഇവയാണ് ഉൽപ്പന്നങ്ങൾ. ഓരോന്നിലും വിലയും നക്ഷത്രങ്ങളും കാണാം. ആദ്യത്തേത്, 299 രൂപയുടെ സ്റ്റീൽ കുപ്പി, അമർത്തൂ.'), tr('Tap the first product.', 'पहला प्रोडक्ट दबाइए।', 'ആദ്യത്തെ ഉൽപ്പന്നം അമർത്തൂ.')),
      tap('buy', 'buy', fkProduct([{ t: 'gap', grow: true }, { t: 'buttons', row: true, items: [{ id: 'cart', label: 'Add to cart', tone: 'ghost' }, { id: 'buy', label: 'Buy now' }] }]),
        tr("This is the bottle. Tap the blue 'Buy now' button at the bottom right.", "यह बोतल है। नीचे दाईं तरफ़ नीला 'Buy now' बटन दबाइए।", "ഇതാണ് കുപ്പി. താഴെ വലതുവശത്തെ നീല 'Buy now' ബട്ടൺ അമർത്തൂ."), tr("Tap 'Buy now', on the right.", "दाईं तरफ़ 'Buy now' दबाइए।", "വലതുവശത്തെ 'Buy now' അമർത്തൂ.")),
      tap('address', 'continue', { skin: FK, blocks: [{ t: 'bar', tone: 'brand', title: 'Delivery address', back: true }, { t: 'field', label: 'Deliver to', value: 'Kamala Nair, Gate 2, Green Park, Main Road' }, { t: 'text', text: 'Check that the name and address are yours.' }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'continue', label: 'Deliver here' }] }] },
        tr("Flipkart asks where to send it. Read the name and the address. They are yours, so tap 'Deliver here'.", 'Flipkart पूछ रहा है कि कहाँ भेजना है। नाम और पता पढ़िए। वो आपके हैं, इसलिए \'Deliver here\' दबाइए।', "എവിടേക്ക് അയയ്ക്കണം എന്ന് Flipkart ചോദിക്കുന്നു. പേരും വിലാസവും വായിക്കൂ. അത് നിങ്ങളുടേതാണ്, അതുകൊണ്ട് 'Deliver here' അമർത്തൂ."), tr('Tap the blue button at the bottom.', 'नीचे नीला बटन दबाइए।', 'താഴെ നീല ബട്ടൺ അമർത്തൂ.')),
      quiz('total', { skin: FK, blocks: [{ t: 'bar', tone: 'brand', title: 'Order summary', back: true }, { t: 'rows', items: [{ e: '🍶', title: 'Price (1 item)', right: '₹499', noChev: true }, { e: '🏷️', title: 'Discount', right: '- ₹200', noChev: true }, { e: '🚚', title: 'Delivery', right: 'Free', noChev: true }, { e: '💰', title: 'Total to pay', right: '₹299', noChev: true }] }] },
        tr('This is the bill. The price is 499, the discount is 200, delivery is free. How much will you pay?', 'यह बिल है। कीमत 499, छूट 200, डिलीवरी मुफ़्त। आप कितने पैसे देंगे?', 'ഇതാണ് ബിൽ. വില 499, ഡിസ്കൗണ്ട് 200, ഡെലിവറി സൗജന്യം. നിങ്ങൾ എത്ര അടയ്ക്കണം?'),
        [opt(tr('₹299', '₹299', '₹299'), true, tr('Right! 499 minus 200 is 299. Always check the total before you pay.', 'सही! 499 में से 200 घटाएं, तो 299। पैसे देने से पहले हमेशा कुल रकम देखिए।', 'ശരി! 499 ൽ നിന്ന് 200 കുറച്ചാൽ 299. പണം അടയ്ക്കുന്നതിന് മുമ്പ് എപ്പോഴും ആകെ തുക നോക്കൂ.')), opt(tr('₹499', '₹499', '₹499'), false, tr('No. The 200 rupee discount is already taken off. You pay 299.', 'नहीं। 200 रुपये की छूट पहले ही कट चुकी है। आप 299 देंगे।', 'അല്ല. 200 രൂപ ഡിസ്കൗണ്ട് ഇതിനകം കുറച്ചു. നിങ്ങൾ 299 അടയ്ക്കണം.'))]),
      tap('cod', 'cod', { skin: FK, blocks: [{ t: 'bar', tone: 'brand', title: 'Payment', back: true }, { t: 'rows', items: [{ id: 'upi', e: '📲', title: 'UPI', sub: 'Google Pay, PhonePe, Paytm' }, { id: 'card', e: '💳', title: 'Credit / Debit card' }, { id: 'cod', e: '💵', title: 'Cash on Delivery', sub: 'Pay when it arrives' }] }] },
        tr("How do you want to pay? Tap 'Cash on Delivery', so you pay when the bottle comes.", "पैसे कैसे देंगे? 'Cash on Delivery' दबाइए, ताकि बोतल आने पर पैसे दें।", "എങ്ങനെ പണം അടയ്ക്കും? 'Cash on Delivery' അമർത്തൂ, കുപ്പി വരുമ്പോൾ പണം കൊടുക്കാം."), tr("Tap the third line, 'Cash on Delivery'.", "तीसरी लाइन 'Cash on Delivery' दबाइए।", "മൂന്നാമത്തെ വരി 'Cash on Delivery' അമർത്തൂ.")),
      tap('place', 'place', { skin: FK, blocks: [{ t: 'bar', tone: 'brand', title: 'Confirm order', back: true }, { t: 'hero', e: '🍶', title: 'Steel Water Bottle', sub: '₹299 · Cash on Delivery' }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'place', label: 'Place order' }] }] },
        tr("Everything is correct. Tap 'Place order'.", "सब सही है। 'Place order' दबाइए।", "എല്ലാം ശരിയാണ്. 'Place order' അമർത്തൂ."), tr('Tap the blue button at the bottom.', 'नीचे नीला बटन दबाइए।', 'താഴെ നീല ബട്ടൺ അമർത്തൂ.')),
      quiz('prize-scam', { skin: FK, blocks: [{ t: 'bar', tone: 'brand', title: 'Order placed', back: true }, { t: 'hero', tone: 'good', e: '✅', title: 'Order placed', sub: 'Arriving in 4 days' }] },
        tr("Order placed! Later, someone calls: 'You won a Flipkart lucky draw. Pay 500 rupees to get your prize.' What do you do?", "ऑर्डर हो गया! बाद में कोई फ़ोन करता है: 'आपने Flipkart का लकी ड्रॉ जीता है। इनाम के लिए 500 रुपये दीजिए।' आप क्या करेंगे?", "ഓർഡർ ആയി! പിന്നീട് ഒരാൾ വിളിക്കുന്നു: 'നിങ്ങൾക്ക് Flipkart ലക്കി ഡ്രോ അടിച്ചു. സമ്മാനം കിട്ടാൻ 500 രൂപ അടയ്ക്കൂ.' നിങ്ങൾ എന്ത് ചെയ്യും?"),
        [opt(tr('Pay, I want the prize', 'दे दूँ, मुझे इनाम चाहिए', 'അടയ്ക്കും, സമ്മാനം വേണം'), false, tr('No! A real prize never asks you to pay first. This is a scam.', 'नहीं! असली इनाम के लिए पहले पैसे नहीं मांगे जाते। यह ठगी है।', 'വേണ്ട! യഥാർത്ഥ സമ്മാനത്തിന് ആദ്യം പണം ചോദിക്കില്ല. ഇത് തട്ടിപ്പാണ്.')), opt(tr('Cut the call and tell my family', 'कॉल काटूँ और परिवार को बताऊँ', 'കോൾ കട്ട് ചെയ്ത് വീട്ടുകാരോട് പറയും'), true, tr('Right! Cut the call. Flipkart never asks for money to give a prize.', 'सही! कॉल काट दीजिए। Flipkart इनाम देने के लिए कभी पैसे नहीं मांगता।', 'ശരി! കോൾ കട്ട് ചെയ്യൂ. സമ്മാനം തരാൻ Flipkart ഒരിക്കലും പണം ചോദിക്കില്ല.'))]),
    ],
  },

  // ---------------------------------------------------------------- Instagram
  'instagram-like': {
    id: 'instagram-like',
    icon: 'heart',
    emoji: '❤️',
    ...practiceOf('instagram', 'Instagram'),
    minutes: 3,
    title: tr('Like and comment on a family photo', 'परिवार की फ़ोटो पर लाइक और कमेंट करें', 'വീട്ടുകാരുടെ ഫോട്ടോയ്ക്ക് ലൈക്കും കമന്റും ഇടാം'),
    takeaways: fix(
      ['The heart is a like', 'The speech bubble is for a comment', 'Do not accept requests or send money to people you do not know'],
      ['दिल का निशान लाइक है', 'बातचीत वाला गोला कमेंट के लिए है', 'अनजान लोगों की रिक्वेस्ट मंज़ूर न करें और उन्हें पैसे न भेजें'],
      ['ഹൃദയം ലൈക്ക് ആണ്', 'സംസാര കുമിള കമന്റിന് ആണ്', 'അറിയാത്തവരുടെ റിക്വസ്റ്റ് സ്വീകരിക്കുകയോ അവർക്ക് പണം അയയ്ക്കുകയോ ചെയ്യരുത്']
    ),
    share: tr('I learned to like and comment on Instagram with Nook! ❤️', 'मैंने Nook से Instagram पर लाइक और कमेंट करना सीखा! ❤️', 'ഞാൻ Nook കൊണ്ട് Instagram-ൽ ലൈക്കും കമന്റും ഇടാൻ പഠിച്ചു! ❤️'),
    realTry: tr('Open your real Instagram, find a photo your family posted, and like it.', 'अपना असली Instagram खोलिए, परिवार की डाली हुई कोई फ़ोटो ढूंढिए और उसे लाइक कीजिए।', 'നിങ്ങളുടെ Instagram തുറന്ന്, വീട്ടുകാർ ഇട്ട ഒരു ഫോട്ടോ കണ്ടെത്തി ലൈക്ക് ചെയ്യൂ.'),
    steps: [
      intro(tr("Your son Rahul put a photo on Instagram. Today we'll like it and write a comment. This is only practice.", 'आपके बेटे राहुल ने Instagram पर फ़ोटो डाली है। आज हम उसे लाइक करेंगे और कमेंट लिखेंगे। यह सिर्फ़ अभ्यास है।', 'നിങ്ങളുടെ മകൻ രാഹുൽ Instagram-ൽ ഒരു ഫോട്ടോ ഇട്ടു. ഇന്ന് അതിന് ലൈക്കും കമന്റും ഇടാം. ഇത് പരിശീലനം മാത്രം.')),
      tap('like', 'like', { skin: IG, blocks: [{ t: 'bar', title: 'Instagram', right: [{ icon: 'heart' }] }, { t: 'post', author: 'rahul_n', e: '🏞️', caption: 'Weekend at the lake', likeId: 'like', commentId: 'comment', shareId: 'share' }, { t: 'nav', items: [{ e: '🏠', label: 'Home', on: true }, { e: '🔍', label: 'Search' }, { e: '➕', label: 'Post' }, { e: '🎬', label: 'Reels' }, { e: '👤', label: 'Profile' }] }] },
        tr("This is Rahul's photo. To like it, tap the heart below the photo.", 'यह राहुल की फ़ोटो है। लाइक करने के लिए फ़ोटो के नीचे दिल का निशान दबाइए।', 'ഇത് രാഹുലിന്റെ ഫോട്ടോ ആണ്. ലൈക്ക് ചെയ്യാൻ ഫോട്ടോയ്ക്ക് താഴെയുള്ള ഹൃദയം അമർത്തൂ.'), tr('Tap the heart, the first icon below the photo.', 'फ़ोटो के नीचे पहला निशान, दिल, दबाइए।', 'ഫോട്ടോയ്ക്ക് താഴെ ആദ്യത്തെ അടയാളം, ഹൃദയം, അമർത്തൂ.')),
      tap('comment', 'comment', { skin: IG, blocks: [{ t: 'bar', title: 'Instagram', right: [{ icon: 'heart' }] }, { t: 'post', author: 'rahul_n', e: '🏞️', caption: 'Weekend at the lake', liked: true, likeId: 'like', commentId: 'comment', shareId: 'share' }, { t: 'nav', items: [{ e: '🏠', label: 'Home', on: true }, { e: '🔍', label: 'Search' }, { e: '➕', label: 'Post' }, { e: '🎬', label: 'Reels' }, { e: '👤', label: 'Profile' }] }] },
        tr('The heart is red now, so Rahul will see your like. Now tap the speech bubble, next to the heart, to write a comment.', 'दिल लाल हो गया, यानी राहुल को आपका लाइक दिखेगा। अब कमेंट लिखने के लिए दिल के बगल में बातचीत वाला गोला दबाइए।', 'ഹൃദയം ചുവപ്പായി, രാഹുൽ നിങ്ങളുടെ ലൈക്ക് കാണും. ഇനി കമന്റ് എഴുതാൻ ഹൃദയത്തിന് അടുത്തുള്ള സംസാര കുമിള അമർത്തൂ.'), tr('Tap the speech bubble, the second icon.', 'दूसरा निशान, बातचीत वाला गोला, दबाइए।', 'രണ്ടാമത്തെ അടയാളം, സംസാര കുമിള, അമർത്തൂ.')),
      tap('send-comment', 'send-c', { skin: IG, blocks: [{ t: 'bar', title: 'Comments', back: true }, { t: 'field', label: 'Add a comment', value: 'Very nice! Take care, beta.' }, { t: 'text', text: 'For practice, the comment is already written.' }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'send-c', label: 'Post' }] }] },
        tr("Write your comment here. We wrote 'Very nice! Take care, beta' for you. Tap 'Post'.", "यहाँ अपना कमेंट लिखिए। हमने 'Very nice! Take care, beta' लिख दिया है। 'Post' दबाइए।", "ഇവിടെ നിങ്ങളുടെ കമന്റ് എഴുതൂ. ഞങ്ങൾ 'Very nice! Take care, beta' എഴുതിയിട്ടുണ്ട്. 'Post' അമർത്തൂ."), tr('Tap the blue Post button.', 'नीला Post बटन दबाइए।', 'നീല Post ബട്ടൺ അമർത്തൂ.')),
      note('posted', { skin: IG, blocks: [{ t: 'bar', title: 'Instagram', right: [{ icon: 'heart' }] }, { t: 'post', author: 'rahul_n', e: '🏞️', caption: 'Weekend at the lake', liked: true, comment: 'Very nice! Take care, beta.' }] },
        tr('Your comment is under the photo. Everyone who can see the photo can read it, so never write private things in a comment.', 'आपका कमेंट फ़ोटो के नीचे दिख रहा है। फ़ोटो देखने वाला हर कोई उसे पढ़ सकता है, इसलिए कमेंट में निजी बातें कभी न लिखें।', 'നിങ്ങളുടെ കമന്റ് ഫോട്ടോയ്ക്ക് താഴെ കാണാം. ഫോട്ടോ കാണുന്ന എല്ലാവർക്കും അത് വായിക്കാം, അതുകൊണ്ട് കമന്റിൽ സ്വകാര്യ കാര്യങ്ങൾ ഒരിക്കലും എഴുതരുത്.')),
      quiz('stranger', { skin: IG, blocks: [{ t: 'bar', title: 'Messages', back: true }, { t: 'rows', items: [{ e: '👤', title: 'priya_gifts', sub: 'Hi, I am in trouble. Please send 5,000 rupees urgently' }] }] },
        tr("A person you do not know sends a message on Instagram: 'I am in trouble. Please send 5,000 rupees urgently.' What do you do?", "एक अनजान व्यक्ति Instagram पर संदेश भेजता है: 'मैं मुसीबत में हूँ। कृपया तुरंत 5000 रुपये भेजिए।' आप क्या करेंगे?", "അറിയാത്ത ഒരാൾ Instagram-ൽ സന്ദേശം അയയ്ക്കുന്നു: 'ഞാൻ ബുദ്ധിമുട്ടിലാണ്. ദയവായി ഉടനെ 5000 രൂപ അയയ്ക്കൂ.' നിങ്ങൾ എന്ത് ചെയ്യും?"),
        [opt(tr('Send it, they need help', 'भेज दूँ, उन्हें मदद चाहिए', 'അയയ്ക്കും, അവർക്ക് സഹായം വേണം'), false, tr('No! Strangers, and hacked accounts of friends, use this trick. Never send money because of a message.', 'नहीं! अजनबी, और दोस्तों के हैक किए खाते, यही चाल चलते हैं। संदेश पढ़कर कभी पैसे न भेजें।', 'വേണ്ട! അപരിചിതരും സുഹൃത്തുക്കളുടെ ഹാക്ക് ചെയ്ത അക്കൗണ്ടുകളും ഈ തന്ത്രം ഉപയോഗിക്കും. സന്ദേശം കണ്ട് ഒരിക്കലും പണം അയയ്ക്കരുത്.')), opt(tr('Do not reply, and ask my family', 'जवाब न दूँ, परिवार से पूछूँ', 'മറുപടി കൊടുക്കില്ല, വീട്ടുകാരോട് ചോദിക്കും'), true, tr('Right! Do not reply. If it is a friend, call them on their phone number to check.', 'सही! जवाब मत दीजिए। दोस्त हो, तो उसके फ़ोन नंबर पर कॉल करके पूछिए।', 'ശരി! മറുപടി കൊടുക്കരുത്. സുഹൃത്താണെങ്കിൽ അവരുടെ ഫോൺ നമ്പറിൽ വിളിച്ച് ചോദിക്കൂ.'))]),
    ],
  },

  'instagram-post': {
    id: 'instagram-post',
    icon: 'image',
    emoji: '📷',
    ...practiceOf('instagram', 'Instagram'),
    minutes: 3,
    title: tr('Post a photo on Instagram', 'Instagram पर फ़ोटो डालें', 'Instagram-ൽ ഒരു ഫോട്ടോ ഇടാം'),
    takeaways: fix(
      ["Tap the '+' button at the bottom", 'Pick the photo and tap the arrow', "Write a few words and tap 'Share'"],
      ["नीचे '+' बटन दबाएं", 'फ़ोटो चुनें और तीर दबाएं', "दो शब्द लिखें और 'Share' दबाएं"],
      ["താഴെ '+' ബട്ടൺ അമർത്തുക", 'ഫോട്ടോ തിരഞ്ഞെടുത്ത് അമ്പ് അമർത്തുക', "ഏതാനും വാക്കുകൾ എഴുതി 'Share' അമർത്തുക"]
    ),
    share: tr('I learned to post on Instagram with Nook! 📷', 'मैंने Nook से Instagram पर फ़ोटो डालना सीखा! 📷', 'ഞാൻ Nook കൊണ്ട് Instagram-ൽ ഫോട്ടോ ഇടാൻ പഠിച്ചു! 📷'),
    realTry: tr('Post one photo of your garden or a festival on your real Instagram. Remember, everyone can see it.', 'अपने असली Instagram पर बगीचे या त्योहार की एक फ़ोटो डालिए। याद रखिए, उसे सब देख सकते हैं।', 'നിങ്ങളുടെ Instagram-ൽ പൂന്തോട്ടത്തിന്റെയോ ഉത്സവത്തിന്റെയോ ഒരു ഫോട്ടോ ഇടൂ. ഓർക്കുക, എല്ലാവർക്കും അത് കാണാം.'),
    steps: [
      intro(tr("Today we'll post a photo of your garden on Instagram, for your family and friends to see. This is only practice. Nothing will be posted.", 'आज हम Instagram पर आपके बगीचे की फ़ोटो डालेंगे, ताकि परिवार और दोस्त देख सकें। यह सिर्फ़ अभ्यास है। कुछ भी पोस्ट नहीं होगा।', 'ഇന്ന് Instagram-ൽ നിങ്ങളുടെ പൂന്തോട്ടത്തിന്റെ ഫോട്ടോ ഇടാം, വീട്ടുകാർക്കും സുഹൃത്തുക്കൾക്കും കാണാൻ. ഇത് പരിശീലനം മാത്രം. ഒന്നും പോസ്റ്റ് ആകില്ല.')),
      tap('plus', 'plus', { skin: IG, blocks: [{ t: 'bar', title: 'Instagram', right: [{ icon: 'heart' }] }, { t: 'post', author: 'rahul_n', e: '🏞️', caption: 'Weekend at the lake' }, { t: 'nav', items: [{ e: '🏠', label: 'Home', on: true }, { e: '🔍', label: 'Search' }, { id: 'plus', e: '➕', label: 'Post' }, { e: '🎬', label: 'Reels' }, { e: '👤', label: 'Profile' }] }] },
        tr("Tap the '+' button at the bottom, in the middle.", "नीचे बीच में '+' बटन दबाइए।", "താഴെ നടുവിലെ '+' ബട്ടൺ അമർത്തൂ."), tr("Tap '+', the middle one at the bottom.", "नीचे बीच वाला '+' दबाइए।", "താഴെ നടുവിലെ '+' അമർത്തൂ.")),
      tap('pick', 'pic1', { skin: IG, blocks: [{ t: 'bar', title: 'New post', back: true, right: [{ id: 'next-ic', e: '➡️' }] }, { t: 'grid', items: [{ id: 'pic1', e: '🌺', label: 'Garden' }, { e: '🙂', label: 'Selfie' }, { e: '🍛', label: 'Lunch' }, { e: '🚆', label: 'Ticket' }] }] },
        tr('These are the photos on your phone. Tap the garden photo.', 'ये आपके फ़ोन की फ़ोटो हैं। बगीचे की फ़ोटो दबाइए।', 'ഇവ നിങ്ങളുടെ ഫോണിലെ ഫോട്ടോകളാണ്. പൂന്തോട്ടത്തിന്റെ ഫോട്ടോ അമർത്തൂ.'), tr('Tap the first photo, the flower.', 'पहली फ़ोटो, फूल वाली, दबाइए।', 'ആദ്യത്തെ ഫോട്ടോ, പൂവ്, അമർത്തൂ.')),
      tap('next', 'next-ic', { skin: IG, blocks: [{ t: 'bar', title: 'New post', back: true, right: [{ id: 'next-ic', e: '➡️' }] }, { t: 'hero', e: '🌺', title: 'Garden photo', sub: 'Selected' }] },
        tr('Your photo is chosen. Tap the arrow at the top right to go on.', 'आपकी फ़ोटो चुन ली गई। आगे बढ़ने के लिए ऊपर दाईं तरफ़ तीर दबाइए।', 'നിങ്ങളുടെ ഫോട്ടോ തിരഞ്ഞെടുത്തു. തുടരാൻ മുകളിൽ വലതുവശത്തെ അമ്പ് അമർത്തൂ.'), tr('Tap the arrow at the top right.', 'ऊपर दाईं तरफ़ तीर दबाइए।', 'മുകളിൽ വലതുവശത്തെ അമ്പ് അമർത്തൂ.')),
      tap('share', 'share-btn', { skin: IG, blocks: [{ t: 'bar', title: 'New post', back: true }, { t: 'hero', e: '🌺', title: 'Garden photo' }, { t: 'field', label: 'Write a caption', value: 'My garden in bloom' }, { t: 'text', text: 'Everyone who follows you can see this post.' }, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 'share-btn', label: 'Share' }] }] },
        tr("Write a few words about the photo. We wrote 'My garden in bloom'. Then tap 'Share'.", "फ़ोटो के बारे में दो शब्द लिखिए। हमने 'My garden in bloom' लिख दिया है। फिर 'Share' दबाइए।", "ഫോട്ടോയെക്കുറിച്ച് ഏതാനും വാക്കുകൾ എഴുതൂ. ഞങ്ങൾ 'My garden in bloom' എഴുതിയിട്ടുണ്ട്. പിന്നെ 'Share' അമർത്തൂ."), tr('Tap the blue Share button.', 'नीला Share बटन दबाइए।', 'നീല Share ബട്ടൺ അമർത്തൂ.')),
      quiz('private', { skin: IG, blocks: [{ t: 'bar', title: 'Posted', back: true }, { t: 'hero', tone: 'good', e: '✅', title: 'Your post is shared' }] },
        tr('Your photo is posted. Which photo should you NOT post?', 'आपकी फ़ोटो पोस्ट हो गई। कौन सी फ़ोटो पोस्ट नहीं करनी चाहिए?', 'നിങ്ങളുടെ ഫോട്ടോ പോസ്റ്റ് ആയി. ഏത് ഫോട്ടോ പോസ്റ്റ് ചെയ്യരുത്?'),
        [opt(tr('A photo of my garden', 'मेरे बगीचे की फ़ोटो', 'എന്റെ പൂന്തോട്ടത്തിന്റെ ഫോട്ടോ'), false, tr('This one is fine to post.', 'इसे पोस्ट करना ठीक है।', 'ഇത് പോസ്റ്റ് ചെയ്യാം.')), opt(tr('A photo of my bank card or Aadhaar', 'मेरे बैंक कार्ड या आधार की फ़ोटो', 'എന്റെ ബാങ്ക് കാർഡിന്റെയോ ആധാറിന്റെയോ ഫോട്ടോ'), true, tr('Right! Never post cards, Aadhaar, tickets with your number, or your house key. Cheats look for such photos.', 'सही! कार्ड, आधार, नंबर वाले टिकट या घर की चाबी की फ़ोटो कभी न डालें। ठग ऐसी फ़ोटो ढूंढते हैं।', 'ശരി! കാർഡ്, ആധാർ, നമ്പർ ഉള്ള ടിക്കറ്റ്, വീടിന്റെ താക്കോൽ എന്നിവയുടെ ഫോട്ടോ ഒരിക്കലും ഇടരുത്. തട്ടിപ്പുകാർ അത്തരം ഫോട്ടോകൾ തിരയും.'))]),
    ],
  },

  // ---------------------------------------------------------------- Spotify
  'spotify-play': {
    id: 'spotify-play',
    icon: 'volume',
    emoji: '🎵',
    ...practiceOf('spotify', 'Spotify'),
    minutes: 3,
    title: tr('Find and play a song on Spotify', 'Spotify पर गाना ढूंढें और चलाएं', 'Spotify-ൽ ഒരു പാട്ട് കണ്ടെത്തി കേൾക്കാം'),
    takeaways: fix(
      ['Tap Search at the bottom', 'Type or say the song name', 'Tap the green play button'],
      ['नीचे Search दबाएं', 'गाने का नाम लिखें या बोलें', 'हरा प्ले बटन दबाएं'],
      ['താഴെ Search അമർത്തുക', 'പാട്ടിന്റെ പേര് എഴുതുകയോ പറയുകയോ ചെയ്യുക', 'പച്ച പ്ലേ ബട്ടൺ അമർത്തുക']
    ),
    share: tr('I learned to play songs on Spotify with Nook! 🎵', 'मैंने Nook से Spotify पर गाने चलाना सीखा! 🎵', 'ഞാൻ Nook കൊണ്ട് Spotify-ൽ പാട്ട് കേൾക്കാൻ പഠിച്ചു! 🎵'),
    realTry: tr('Open your real Spotify and play one of your favourite old songs.', 'अपना असली Spotify खोलिए और अपना कोई पसंदीदा पुराना गाना चलाइए।', 'നിങ്ങളുടെ Spotify തുറന്ന് ഇഷ്ടപ്പെട്ട ഒരു പഴയ പാട്ട് കേൾക്കൂ.'),
    steps: [
      intro(tr("Today we'll find an old song on Spotify and play it. This is only practice.", 'आज हम Spotify पर एक पुराना गाना ढूंढकर चलाएंगे। यह सिर्फ़ अभ्यास है।', 'ഇന്ന് Spotify-ൽ ഒരു പഴയ പാട്ട് കണ്ടെത്തി കേൾക്കാം. ഇത് പരിശീലനം മാത്രം.')),
      tap('search-tab', 'search-tab', { skin: SP, blocks: [{ t: 'text', text: 'Good afternoon', tone: 'big' }, { t: 'cards', items: [{ e: '🎶', title: 'Liked Songs', sub: '12 songs' }, { e: '📻', title: 'Old Hindi Hits', sub: 'Playlist' }] }, { t: 'gap', grow: true }, { t: 'nav', items: [{ e: '🏠', label: 'Home', on: true }, { id: 'search-tab', e: '🔍', label: 'Search' }, { e: '📚', label: 'Your Library' }] }] },
        tr("This is Spotify. Tap 'Search' at the bottom.", "यह Spotify है। नीचे 'Search' दबाइए।", "ഇത് Spotify ആണ്. താഴെ 'Search' അമർത്തൂ."), tr('Tap the magnifying glass at the bottom, in the middle.', 'नीचे बीच में आवर्धक शीशा दबाइए।', 'താഴെ നടുവിലെ ഭൂതക്കണ്ണാടി അമർത്തൂ.')),
      tap('type', 'result', { skin: SP, blocks: [{ t: 'search', text: 'lag ja gale', mic: true }, { t: 'cards', title: 'Top result', items: [{ id: 'result', e: '🎵', title: 'Lag Ja Gale', sub: 'Song · Lata Mangeshkar' }, { e: '🎵', title: 'Lag Ja Gale (Remix)', sub: 'Song · Various' }] }] },
        tr("You can type or say the song name. We typed 'lag ja gale'. Tap the first result.", "गाने का नाम लिख सकते हैं या बोल सकते हैं। हमने 'lag ja gale' लिख दिया है। पहला नतीजा दबाइए।", "പാട്ടിന്റെ പേര് എഴുതുകയോ പറയുകയോ ചെയ്യാം. ഞങ്ങൾ 'lag ja gale' എഴുതിയിട്ടുണ്ട്. ആദ്യത്തെ ഫലം അമർത്തൂ."), tr("Tap the first one, 'Lag Ja Gale'.", "पहला, 'Lag Ja Gale', दबाइए।", "ആദ്യത്തേത്, 'Lag Ja Gale', അമർത്തൂ.")),
      tap('play', 'play', { skin: SP, blocks: [{ t: 'player', title: 'Lag Ja Gale', artist: 'Lata Mangeshkar', e: '🎵', playId: 'play', prevId: 'prev', nextId: 'next' }] },
        tr('The song is ready. Tap the big round play button.', 'गाना तैयार है। बड़ा गोल प्ले बटन दबाइए।', 'പാട്ട് തയ്യാറാണ്. വലിയ വട്ട പ്ലേ ബട്ടൺ അമർത്തൂ.'), tr('Tap the big white circle in the middle.', 'बीच में बड़ा सफ़ेद गोला दबाइए।', 'നടുവിലെ വലിയ വെളുത്ത വൃത്തം അമർത്തൂ.')),
      quiz('ad', { skin: SP, blocks: [{ t: 'player', title: 'Advertisement', artist: 'Spotify', e: '📢', playing: true, playId: 'play' }, { t: 'text', text: 'Get Premium for ₹59 only. Tap to buy now!' }] },
        tr("An advertisement plays and says 'Get Premium, tap to buy now'. Do you have to buy it?", "विज्ञापन चलता है और कहता है 'Premium लीजिए, अभी खरीदने के लिए दबाइए'। क्या खरीदना ज़रूरी है?", "ഒരു പരസ്യം വന്ന് 'Premium എടുക്കൂ, ഇപ്പോൾ വാങ്ങാൻ അമർത്തൂ' എന്ന് പറയുന്നു. വാങ്ങണമെന്ന് നിർബന്ധമുണ്ടോ?"),
        [opt(tr('No, I can just wait', 'नहीं, मैं इंतज़ार कर सकता हूँ', 'വേണ്ട, കാത്തിരുന്നാൽ മതി'), true, tr('Right! The free version has ads between songs. Wait a few seconds and your song comes back. Never pay because an ad pushes you.', 'सही! मुफ़्त वाले में गानों के बीच विज्ञापन आते हैं। कुछ सेकंड रुकिए, आपका गाना वापस आ जाएगा। विज्ञापन के कहने पर कभी पैसे न दें।', 'ശരി! സൗജന്യ വേർഷനിൽ പാട്ടുകൾക്കിടയിൽ പരസ്യം വരും. കുറച്ച് സെക്കൻഡ് കാത്തിരുന്നാൽ പാട്ട് തിരികെ വരും. പരസ്യം പറഞ്ഞതുകൊണ്ട് ഒരിക്കലും പണം അടയ്ക്കരുത്.')), opt(tr('Yes, or the song will stop', 'हाँ, वरना गाना बंद हो जाएगा', 'വേണം, അല്ലെങ്കിൽ പാട്ട് നിൽക്കും'), false, tr('No. The song only pauses for the ad, then it plays again. You do not have to buy anything.', 'नहीं। विज्ञापन के लिए गाना बस रुकता है, फिर चलता है। कुछ भी खरीदना ज़रूरी नहीं।', 'വേണ്ട. പരസ്യത്തിനായി പാട്ട് ഒന്ന് നിൽക്കുക മാത്രമേ ഉള്ളൂ, പിന്നെ വീണ്ടും തുടങ്ങും. ഒന്നും വാങ്ങേണ്ടതില്ല.'))]),
      tap('pause', 'play', { skin: SP, blocks: [{ t: 'player', title: 'Lag Ja Gale', artist: 'Lata Mangeshkar', e: '🎵', playing: true, playId: 'play', prevId: 'prev', nextId: 'next' }] },
        tr('Your song is playing. To stop it for a while, tap the same round button, now it shows two lines.', 'आपका गाना चल रहा है। थोड़ी देर रोकने के लिए वही गोल बटन दबाइए, अब उसमें दो लाइनें दिख रही हैं।', 'നിങ്ങളുടെ പാട്ട് കേൾക്കുന്നു. കുറച്ച് നേരം നിർത്താൻ അതേ വട്ട ബട്ടൺ അമർത്തൂ, ഇപ്പോൾ അതിൽ രണ്ട് വരകൾ കാണാം.'), tr('Tap the round button with two lines.', 'दो लाइनों वाला गोल बटन दबाइए।', 'രണ്ട് വരകളുള്ള വട്ട ബട്ടൺ അമർത്തൂ.')),
    ],
  },
};

export const APP1_KEYWORDS = {
  'flipkart-order': [['flipkart', 5], ['फ्लिपकार्ट', 5], ['ഫ്ലിപ്കാർട്ട്', 5], ['shopping', 3], ['order', 2], ['ऑर्डर', 2], ['ഓർഡർ', 2], ['online buy', 3], ['खरीद', 2], ['cash on delivery', 3], ['cod', 2]],
  'instagram-like': [['instagram', 5], ['इंस्टाग्राम', 5], ['ഇൻസ്റ്റാഗ്രാം', 5], ['like', 3], ['लाइक', 3], ['ലൈക്ക്', 3], ['comment', 3], ['कमेंट', 3], ['കമന്റ്', 3], ['reel', 2], ['insta', 4]],
  'instagram-post': [['instagram', 3], ['insta', 3], ['इंस्टाग्राम', 3], ['post', 4], ['पोस्ट', 4], ['പോസ്റ്റ്', 4], ['upload photo', 4], ['photo daal', 4], ['share photo', 3]],
  'spotify-play': [['spotify', 5], ['स्पॉटिफाई', 5], ['സ്പോട്ടിഫൈ', 5], ['song', 4], ['गाना', 4], ['गाने', 4], ['പാട്ട്', 4], ['music', 3], ['संगीत', 3], ['സംഗീതം', 3], ['gaana', 3]],
};
