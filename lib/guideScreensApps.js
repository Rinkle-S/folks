import { SK, B, R, TL, G, BT, NV, CH, F, H, X, SR, DG, TO, GAP, HD, ST, KP, DOTS, VIEW, T, N, HOME } from './guideScreens';

const YT = SK.yt;
const video = (o = {}) => [
  H('▶️', 'Hanuman Chalisa', 'Bhakti Channel · 2.1M views'),
  o.ctl ? TL(o.ctl) : GAP(),
  o.row ? TL(o.row) : GAP(),
];
const FL = SK.flip;
const SW = SK.swiggy;
const UB = SK.uber;
const IR = SK.irctc;
const MP = SK.maps;
const IG = SK.insta;
const SP = SK.spot;

export const SPEC_APPS = {
  'yt-subtitles': [
    T(YT, B('YouTube', { back: false }), H('▶️', 'Hanuman Chalisa', 'Tap the video once to show the buttons', undefined, true)),
    T(YT, B('', { back: true, right: ['*CC', '⋮'] }), H('▶️', 'Hanuman Chalisa', '0:42 / 9:30')),
    N(YT, B('', { back: true, right: ['CC', '⋮'] }), H('💬', 'Words appear at the bottom', 'जय हनुमान ज्ञान गुन सागर'), X('Other language: three dots, then Captions.')),
  ],
  'yt-subscribe': [
    N(YT, B('YouTube', { back: false }), H('▶️', 'Hanuman Chalisa', 'Bhakti Channel · 2.1M views')),
    T(YT, B('Bhakti Channel'), H('▶️', 'Hanuman Chalisa'), R(['Bhakti Channel|2.4M subscribers|📺']), BT(['*Subscribe'])),
    T(YT, B('Bhakti Channel'), R(['Bhakti Channel|Subscribed|📺']), TL(['*Bell: All|🔔', 'Personalised|🔔', 'None|🔕'])),
  ],
  'yt-fullscreen': [
    T(YT, B('YouTube', { back: false }), H('▶️', 'Hanuman Chalisa', 'Tap the video once', undefined, true)),
    T(YT, H('▶️', 'Hanuman Chalisa', '0:42 / 9:30'), BT(['*⛶ Full screen'])),
    N(YT, H('📱', 'Turn the phone sideways', 'Tap the same ⛶ icon again to come back')),
  ],
  'yt-save': [
    T(YT, B('YouTube', { back: false }), H('▶️', 'Hanuman Chalisa'), TL(['Like|👍', 'Share|📤', '*Save|🔖', 'Download|⬇️'])),
    T(YT, B('Save to…'), R(['*Watch later|🕘', 'Favourites|⭐', 'New playlist|➕']), GAP(true), BT(['Done'])),
    T(YT, B('YouTube', { back: false }), H('📚', 'Library'), GAP(true), NV(['Home|🏠', 'Shorts|🎬', 'Subscriptions|📺', '*Library|📚'])),
  ],
  'yt-speed': [
    T(YT, B('', { back: true, right: ['CC', '*⋮'] }), H('▶️', 'Hanuman Chalisa', 'Tap the video, then the three dots')),
    T(YT, B('Settings'), R(['Quality|Auto|🎞️', '*Playback speed|Normal|⏩', 'Captions|Off|💬'])),
    T(YT, B('Playback speed'), R(['0.5', '*0.75', '^Normal', '1.25', '1.5', '2'])),
  ],
  'yt-voice-search': [
    T(YT, B('YouTube', { back: false, right: ['*🔍'] }), H('▶️', 'Home')),
    T(YT, B('', { back: true }), SR('Search YouTube', { mic: true }), TL(['*Voice search|🎤'])),
    [N(YT, B('Listening…'), H('🎤', 'Say it clearly', '"Hanuman Chalisa"')), T(YT, B('Results'), R(['*Hanuman Chalisa|Bhakti Channel · 9:30|▶️', 'Hanuman Chalisa Live|Temple · 1:02:00|▶️']))],
  ],
  'uber-book': [
    T(UB, B('Uber', { back: false }), H('🚕', 'Good morning, Kamla'), SR('Where to?', { t: true }), R(['Home|📍', 'Work|💼'])),
    T(UB, B('Where to?'), SR('kochi airport', { typed: true }), R(['*Cochin International Airport|Nedumbassery|✈️', 'Airport Road|Kochi|📍'])),
    N(UB, B('Pick-up point'), H('🗺️', 'Pick-up: MG Road metro', 'Move the pin if it is in the wrong place'), BT(['Confirm pick-up'])),
    T(UB, B('Choose a ride'), CARDS_UBER()),
    N(UB, B('Your driver'), H('🚕', 'KL 07 AB 1234', 'White Swift · Driver Suresh'), X('Tell the driver your 4-digit code: 4821')),
  ],
  'uber-cancel': [
    N(UB, B('Your ride'), H('🚕', 'Driver is on the way', 'KL 07 AB 1234')),
    T(UB, B('Your ride'), H('🚕', 'Driver is on the way', 'Swipe the bottom panel up ↑'), R(['Share trip status|📤', '*Cancel trip|❌', 'Contact driver|📞'])),
    T(UB, DG('Why are you cancelling?', undefined, ['Waiting too long', 'Changed my plans', '*Confirm cancel'])),
  ],
  'ride-share-trip': [
    N(UB, B('On trip'), H('🚕', 'On your way', 'Swipe the bottom panel up ↑')),
    T(UB, B('On trip'), R(['*Share trip status|📤', 'Safety toolkit|🛡️', 'Call driver|📞'])),
    T(UB, B('Share trip status'), R(['*Sunita|👩', 'Ramesh|👨', 'WhatsApp|🟢'])),
  ],
  'rapido-book': [
    T(SK.rapido, B('Rapido', { back: false }), SR('Where to?', { t: true }), R(['Home|📍'])),
    T(SK.rapido, B('Choose a ride'), CARDS_RAPIDO()),
    T(SK.rapido, B('Auto'), H('🛺', 'Auto · ₹ 85', 'Pick-up: MG Road'), GAP(true), BT(['*Book Auto'])),
    N(SK.rapido, B('Your captain'), H('🛺', 'KL 07 CD 5678', 'Check the number matches the app'), X('Check this vehicle number when he arrives.')),
  ],
  'ride-pay-upi': [
    N(UB, B('Choose a ride'), H('🚕', 'Mini · ₹ 210'), X('Look for "Payment" above the Confirm button')),
    T(UB, B('Payment'), R(['*Cash|Pay the driver|💵', 'UPI|Pay in the app|📲'])),
    N(UB, B('Trip done'), H('💵', 'Pay ₹ 210 in cash', 'Pay only the amount on the screen. Do not pay extra', 'good')),
  ],
  'swiggy-track': [
    N(SW, B('Swiggy', { back: false }), H('🍔', 'Your order is on the way')),
    T(SW, B('Swiggy', { back: false }), H('🍔', 'Home'), GAP(true), BT(['*Order #4521 · arriving in 14 min']), NV(['^Home|🏠', 'Search|🔍', 'Orders|🧾', 'Account|👤'])),
    N(SW, B('Order #4521'), H('🗺️', 'Suresh is on the way', 'Arriving in 14 minutes')),
    T(SW, B('Order #4521'), H('🛵', 'Suresh · Delivery partner'), BT(['*📞 Call', 'Chat'], true)),
  ],
  'swiggy-cancel': [
    T(SW, B('Orders', { back: false }), R(['*Order #4521|Biryani House · ₹ 320|🍔|=Preparing'])),
    T(SW, B('Order #4521'), H('🍳', 'Preparing your food'), BT(['*Cancel order', 'Help'], true)),
    T(SW, DG('Cancel this order?', 'If the restaurant has started cooking you may not get your money back.', ['Don\'t cancel', '*Yes, cancel'])),
  ],
  'swiggy-address': [
    T(SW, B('Swiggy', { back: false, right: [] }), H('📍', 'Home · MG Road, Kochi', 'Tap the address at the top left', undefined, true)),
    T(SW, B('Select address'), R(['*+ Add new address|➕', 'Home|MG Road, Kochi|🏠'])),
    N(SW, B('Add address'), H('📍', 'Move the pin to your house'), F('House / flat number', '12B'), F('Landmark', 'Near the temple')),
    T(SW, B('Add address'), F('House / flat number', '12B'), GAP(true), BT(['*Save address'])),
  ],
  'food-coupon': [
    N(SW, B('Cart'), R(['Veg Biryani x1|₹ 220|🍛', 'Raita x1|₹ 40|🥣']), X('Total ₹ 260')),
    T(SW, B('Cart'), R(['Veg Biryani x1|₹ 220|🍛']), R(['*Apply coupon|Offers for you|🏷️'])),
    [T(SW, B('Offers'), R(['*FIRST50|Save ₹ 50|🏷️', 'FREEDEL|Free delivery|🏷️'])), T(SW, B('Offers'), F('Enter code', 'FIRST50'), BT(['*Apply']))],
    N(SW, B('Cart'), R(['Item total|₹ 260', 'Coupon FIRST50|-₹ 50|🏷️'], undefined), H('✅', 'Total ₹ 210', 'You saved ₹ 50', 'good')),
  ],
  'food-refund': [
    N(SW, B('Your order'), H('📸', 'Take a photo first', 'Do not throw away the packet')),
    [T(SW, B('Orders', { back: false }), R(['*Order #4521|Biryani House|🍔'])), T(SW, B('Order #4521'), R(['Items|🍛', 'Bill|🧾']), GAP(true), BT(['*Help']))],
    T(SW, B('Help'), R(['Delivery was late|⏰', '*Item missing or wrong|❌', 'Quality issue|🍽️'])),
    T(SW, B('Report an issue'), H('📷', 'Add a photo'), GAP(true), BT(['*Upload photo', 'Submit'])),
  ],
  'blinkit-reorder': [
    HOME_STUB(),
    T(SK.blinkit, B('Your orders'), R(['*Order #8821|Milk, bread, eggs · ₹ 214|🛒|=Delivered'])),
    T(SK.blinkit, B('Order #8821'), R(['Milk x1|🥛', 'Bread x1|🍞', 'Eggs x6|🥚']), GAP(true), BT(['*Order again'])),
    N(SK.blinkit, B('Cart'), R(['Milk x1|🥛', 'Bread x1|🍞', 'Eggs x6|🥚']), X('Remove what you do not need, then pay.')),
  ],
  'blinkit-cod': [
    N(SK.blinkit, B('Payment'), H('💳', 'Choose how to pay')),
    T(SK.blinkit, B('Payment'), R(['UPI|📲', 'Cards|💳', '*Cash on delivery|💵'])),
    N(SK.blinkit, B('Order placed'), H('💵', 'Keep exact cash ready', 'Give it only when the delivery person gives you the bag', 'good')),
  ],
  'flipkart-track': [
    N(FL, B('Flipkart', { back: false }), H('📦', 'Your order is on the way')),
    [
      T(FL, B('Flipkart', { back: false }), H('🛍️', 'Home'), GAP(true), NV(['^Home|🏠', 'Categories|🗂️', '*Account|👤', 'Cart|🛒'])),
      T(FL, B('Account'), R(['*Orders|📦', 'Wishlist|❤️', 'Addresses|📍'])),
    ],
    T(FL, B('Orders'), R(['*Steel water bottle|Arriving 26 Oct|🍶'])),
  ],
  'flipkart-return': [
    T(FL, B('Orders'), R(['*Steel water bottle|Delivered 20 Oct|🍶'])),
    T(FL, B('Order details'), H('🍶', 'Steel water bottle', 'Delivered 20 Oct'), BT(['*Return', 'Need help?'], true)),
    N(FL, B('Return'), R(['^Item is damaged', 'Wrong item sent', 'Size does not fit']), CH(['^Tomorrow', 'Day after']), BT(['Submit'])),
    N(FL, B('Return'), H('📦', 'Keep the item in its box', 'Give it only to the person who comes to collect it')),
  ],
  'flipkart-cancel': [
    T(FL, B('Orders'), R(['*Steel water bottle|Shipping soon|🍶'])),
    T(FL, B('Order details'), H('🍶', 'Steel water bottle', 'Not shipped yet'), BT(['*Cancel', 'Need help?'], true)),
    N(FL, B('Cancel'), R(['^Changed my mind', 'Ordered by mistake']), BT(['Confirm cancellation'])),
  ],
  'shop-address': [
    T(FL, B('Account'), R(['Orders|📦', 'Wishlist|❤️', '*Addresses|📍'])),
    T(FL, B('Addresses'), GAP(true), BT(['*+ Add a new address'])),
    N(FL, B('Add address'), F('Name', 'Kamla Devi'), F('Phone number', '98765 43210'), F('House number', '12B'), F('Area', 'MG Road'), F('PIN code', '682016')),
    T(FL, B('Add address'), F('PIN code', '682016'), GAP(true), BT(['*Save address'])),
  ],
  'shop-search-filter': [
    N(FL, B('Search'), SR('steel water bottle', { typed: true }), R(['Steel water bottle 1L|₹ 349|🍶', 'Steel bottle set|₹ 599|🍶'])),
    T(FL, B('Results'), CH(['*Sort', 'Filter', 'Brand']), R(['Steel water bottle 1L|₹ 349|🍶'])),
    T(FL, B('Filters'), R(['Customer ratings|📊']), CH(['^4★ & above', '*4★ & above', '3★ & above'])),
    N(FL, B('Reviews'), H('⭐', 'Read the 1-star and 2-star reviews', 'They tell you what can go wrong'), X('"Cap leaked after a week" · 1★')),
  ],
  'irctc-cancel': [
    N(IR, B('IRCTC Rail Connect', { back: false }), H('🔐', 'Log in with your user ID and password')),
    T(IR, B('IRCTC Rail Connect', { back: false }), TL(['Book Ticket|🚆', '*My Bookings|🎫', 'PNR Status|🔎', 'Running Status|📍'])),
    [T(IR, B('My Bookings'), R(['*Kochi to Chennai · 24 Oct|PNR 4521878899|🎫'])), T(IR, B('Ticket'), H('🎫', 'CONFIRMED', 'Coach S5 · Seat 32'), BT(['*Cancel Ticket']))],
    [N(IR, B('Cancel ticket'), R(['^Kamla Devi, 62'], 'Choose passenger'), X('You will get ₹ 468 back'), BT(['Confirm'])), N(IR, B('Enter OTP'), H('📩', 'OTP sent to your phone'), DOTS(6), KP())],
  ],
  'irctc-running': [
    T(IR, B('IRCTC Rail Connect', { back: false }), TL(['Book Ticket|🚆', 'My Bookings|🎫', 'PNR Status|🔎', '*Train Running Status|📍'])),
    N(IR, B('Running Status'), F('Train number', '12624'), KP()),
    N(IR, B('Running Status'), CH(['^Today', 'Yesterday']), H('📍', 'Last seen: Thrissur', 'Running 12 minutes late')),
  ],
  'irctc-seats': [
    [T(IR, B('IRCTC Rail Connect', { back: false }), TL(['*Book Ticket|🚆', 'My Bookings|🎫'])), N(IR, B('Book Ticket'), F('From', 'Kochi (ERS)'), F('To', 'Chennai (MAS)'), F('Date', '24 Oct'), BT(['Search trains']))],
    [N(IR, B('3 trains'), R(['Chennai Mail 12624|6:40 PM|🚆'])), T(IR, B('Chennai Mail 12624'), CH(['*SL', '3A', '2A']), R(['Sleeper|AVAILABLE 23|🟢']))],
    N(IR, B('Chennai Mail 12624'), R(['AVAILABLE 23|Seats free|🟢', 'RAC 4|Half seat|🟡', 'WL 12|Waiting list: no seat yet|🔴'])),
  ],
  'irctc-show-ticket': [
    N(IR, B('IRCTC Rail Connect', { back: false }), H('🔐', 'Log in')),
    [T(IR, B('IRCTC Rail Connect', { back: false }), TL(['Book Ticket|🚆', '*My Bookings|🎫'])), T(IR, B('My Bookings'), R(['*Kochi to Chennai · 24 Oct|PNR 4521878899|🎫']))],
    N(IR, B('Ticket'), H('🎫', 'CONFIRMED', 'Coach S5 · Seat 32 · Lower', 'good'), X('Show this screen and your ID card to the ticket checker. A screenshot helps if the internet is slow.')),
  ],
  'maps-nearby': [
    N(MP, B('Google Maps', { back: false }), SR('Search here', { mic: true }), H('🗺️', 'Map')),
    T(MP, B('Google Maps', { back: false }), SR('Search here', { mic: true }), CH(['Restaurants', '*Hospitals', 'ATMs', 'Petrol'])),
    T(MP, B('Hospitals'), R(['*Amrita Hospital|Open · 1.2 km|🏥', 'City Clinic|Closes 8 PM · 2.0 km|🏥'])),
    T(MP, B('Amrita Hospital'), H('🏥', 'Open · 1.2 km'), GAP(true), BT(['*Directions'])),
  ],
  'maps-save-home': [
    T(MP, B('Google Maps', { back: false }), H('🗺️', 'Map'), GAP(true), NV(['Explore|📍', 'Go|🚗', '*Saved|🔖', 'Contribute|➕'])),
    T(MP, B('Saved'), R(['*Home|Set address|🏠', 'Work|Set address|💼'], 'Your lists')),
    N(MP, B('Home'), SR('12B MG Road, Kochi', { typed: true }), R(['12B, MG Road, Kochi|📍'])),
  ],
  'maps-offline': [
    N(MP, B('Google Maps', { back: false }), H('📶', 'Do this on Wi-Fi', 'Offline maps use your data')),
    T(MP, B('Google Maps', { back: false, right: ['*👤'] }), H('🗺️', 'Map')),
    [T(MP, B('Account'), R(['*Offline maps|💾', 'Timeline|🕘'])), T(MP, B('Offline maps'), BT(['*Select your own map'])), T(MP, B('Download'), H('🗺️', 'Move the box over your area'), GAP(true), BT(['*Download']))],
  ],
  'maps-voice': [
    N(MP, B('Directions'), H('🧭', 'Turn left in 200 m')),
    T(MP, B('Directions', { right: ['*🔈'] }), H('🧭', 'Turn left in 200 m')),
    [T(MP, B('Voice'), R(['Muted|🔇', 'Alerts only|🔔', '*Unmuted|🔊'])), N(SK.set, B('Volume'), H('🔊', 'Press the volume buttons on the side', 'Make it louder'))],
  ],
  'insta-follow': [
    T(IG, B('Instagram', { back: false }), H('📸', 'Home'), GAP(true), NV(['Home|🏠', '*Search|🔍', 'Reels|🎬', 'Profile|👤'])),
    T(IG, B('Search'), SR('ramesh', { typed: true }), R(['*ramesh_kumar|Ramesh Kumar|👨', 'ramesh.official|Ramesh|👨'])),
    T(IG, B('ramesh_kumar'), H('👨', 'Ramesh Kumar', '120 posts · 340 followers'), BT(['*Follow'])),
  ],
  'insta-private': [
    T(IG, B('Instagram', { back: false }), H('📸', 'Home'), GAP(true), NV(['Home|🏠', 'Search|🔍', 'Reels|🎬', '*Profile|👤'])),
    T(IG, B('kamla_devi', { back: false, right: ['*☰'] }), H('👩', 'Kamla Devi', '12 posts')),
    [T(IG, B('Menu'), R(['*Settings and privacy|⚙️', 'Archive|🗄️', 'Saved|🔖'])), T(IG, B('Settings and privacy'), R(['Notifications|🔔', '*Account privacy|Public|🔒']))],
    T(IG, B('Account privacy'), R(['*Private account|Only people you approve can see your posts|🔒|off'])),
  ],
  'spotify-playlist': [
    T(SP, B('Spotify', { back: false }), H('🎵', 'Good morning'), GAP(true), NV(['Home|🏠', 'Search|🔍', '*Your Library|📚'])),
    [T(SP, B('Your Library', { right: ['*+'] }), R(['Liked Songs|❤️'])), T(SP, B('Create'), R(['*Playlist|🎶', 'Blend|🎧'])), N(SP, B('Name your playlist'), F('Name', 'Morning bhajans'))],
    [T(SP, B('Morning bhajans'), BT(['*Add songs'])), T(SP, B('Add songs'), SR('suprabhatam', { typed: true }), R(['*Venkateswara Suprabhatam|M.S. Subbulakshmi|🎵|=+', 'Gayatri Mantra||🎵|=+']))],
  ],
  'spotify-search-voice': [
    T(SP, B('Spotify', { back: false }), H('🎵', 'Home'), GAP(true), NV(['Home|🏠', '*Search|🔍', 'Your Library|📚'])),
    N(SP, B('Search'), SR('Kishore Kumar', { typed: true })),
    T(SP, B('Results'), R(['*Mere Sapno Ki Rani|Kishore Kumar|🎵', 'Roop Tera Mastana|Kishore Kumar|🎵'])),
  ],
  'gmail-send': [
    T(SK.gmail, B('Gmail', { back: false }), H('✉️', 'Inbox'), GAP(true), BT(['*✏️ Compose'])),
    N(SK.gmail, B('Compose'), F('To', 'ramesh@gmail.com'), F('Subject', ''), F('Message', '')),
    N(SK.gmail, B('Compose'), F('To', 'ramesh@gmail.com'), F('Subject', 'Dinner on Sunday'), F('Message', 'Please come at 8 pm.')),
    T(SK.gmail, B('Compose', { right: ['📎', '*➤'] }), F('To', 'ramesh@gmail.com'), F('Subject', 'Dinner on Sunday'), F('Message', 'Please come at 8 pm.')),
  ],
  'open-link-safe': [
    N(SK.plain, B('Messages'), H('⚠️', 'Do not tap the link', 'Do not reply either')),
    N(SK.plain, B('Messages'), R(['"URGENT"|Your account will be blocked|🚩', '"You won a prize"|Claim here: bit.ly/xyz|🚩', 'Asks for OTP, PIN or card number|🚩'])),
    N(SK.plain, B('Remember'), H('🏦', 'Real banks never ask', 'For your PIN, OTP or password on a call or message')),
    N(SK.plain, B('Ask first'), H('👨‍👩‍👧', 'Show it to someone in your family', 'If unsure, ask someone first')),
  ],
};

function CARDS_UBER() { return { t: 'cards', items: [{ id: 't', e: '🚕', title: 'Uber Go', sub: '4 min away', price: '₹ 210' }, { e: '🚙', title: 'Premier', sub: '6 min away', price: '₹ 290' }, { e: '🛺', title: 'Auto', sub: '3 min away', price: '₹ 120' }] }; }
function CARDS_RAPIDO() { return { t: 'cards', items: [{ e: '🛵', title: 'Bike', sub: '2 min', price: '₹ 45' }, { id: 't', e: '🛺', title: 'Auto', sub: '3 min', price: '₹ 85' }, { e: '🚕', title: 'Cab', sub: '5 min', price: '₹ 160' }] }; }
function HOME_STUB() { return T(SK.blinkit, B('Blinkit', { back: false }), H('🛒', 'Delivery in 10 minutes'), GAP(true), NV(['Home|🏠', 'Categories|🗂️', '*Orders|🧾', 'Account|👤'])); }
