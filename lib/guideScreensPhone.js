import { SK, B, R, TL, G, BT, NV, CH, F, H, X, SR, DG, TO, GAP, HD, ST, KP, DOTS, VIEW, T, N, HOME } from './guideScreens';

const SETTINGS = (t) => ['Network & internet|Mobile, Wi-Fi, hotspot|📶', 'Connected devices|Bluetooth, pairing|🔗', 'Apps|Assistant, recent apps|🧩', 'Notifications|Notification history|🔔', 'Battery|82%|🔋', 'Storage|58% used|💾', 'Sound & vibration|Volume, haptics, Do Not Disturb|🔊', 'Display|Dark theme, font size, brightness|📱', 'Wallpaper & style|Colours, themed icons|🎨', 'Accessibility|Display size, text|♿', 'Security & privacy|Screen lock, fingerprint|🔒', 'System|Languages, gestures, backup|⚙️'].map((r) => (r.split('|')[0] === t ? '*' + r : r));
const SET = (t, title = 'Settings') => T(SK.set, B(title), R(SETTINGS(t)));
const PIN = (title, sub) => N(SK.set, B(title), H('🔢', 'Enter a PIN', sub), DOTS(4), KP());

export const SPEC_PHONE = {
  ringtone: [
    HOME('Settings'),
    SET('Sound & vibration'),
    T(SK.set, B('Sound & vibration'), R(['Media volume|||=70%', 'Call volume|||=60%', 'Ring volume|||=80%', 'Do Not Disturb|Off|🔕', '*Phone ringtone|Over the Horizon|📞', 'Default notification sound|Pixie Dust|🔔', 'Default alarm sound|Fresh|⏰'])),
    T(SK.set, B('Phone ringtone'), R(['None', 'Over the Horizon', 'Bubbles', '*Chimes', 'Dewdrops', 'Flute', 'Piano'])),
    T(SK.set, B('Phone ringtone', { backT: true }), R(['None', 'Over the Horizon', 'Bubbles', '^Chimes', 'Dewdrops', 'Flute']), TO('Ringtone saved')),
  ],
  alarm: [
    HOME('Clock'),
    T(SK.plain, B('Clock', { back: false }), H('⏰', 'No alarms yet'), GAP(true), NV(['*^Alarm|⏰', 'Clock|🕘', 'Timer|⏳', 'Stopwatch|⏱️', 'Bedtime|🌙'])),
    T(SK.plain, B('Alarm', { back: false }), R(['6:30 AM|Mon, Tue, Wed, Thu, Fri|⏰|off']), GAP(true), BT(['*+ Add alarm']), NV(['^Alarm|⏰', 'Clock|🕘', 'Timer|⏳', 'Stopwatch|⏱️'])),
    N(SK.plain, B('Set time', { back: false }), H('🕕', '6 : 30', 'Turn the dial. Pick the hour, then the minutes'), CH(['^AM', 'PM']), GAP(true), BT(['Cancel', 'OK'], true)),
    T(SK.plain, B('Set time', { back: false }), H('🕕', '6 : 30 AM'), CH(['^AM', 'PM']), GAP(true), BT(['ghost:Cancel', '*OK'], true)),
  ],
  'save-contact': [
    HOME('Phone'),
    [
      T(SK.plain, B('Phone', { back: false }), R(['Priya|Mobile|📞', 'Ramesh|Mobile|📞']), GAP(true), NV(['Favourites|⭐', 'Recents|🕘', '*Contacts|👤', 'Keypad|⌨️'])),
      T(SK.plain, B('Contacts', { back: false }), SR('Search contacts'), R(['Anil', 'Priya', 'Ramesh', 'Sunita']), GAP(true), BT(['*+ Create contact'])),
    ],
    N(SK.plain, B('Create contact'), F('First name', 'Ramesh'), F('Phone', '98765 43210'), F('Email', '', 'Optional')),
    T(SK.plain, B('Create contact'), F('First name', 'Ramesh'), F('Phone', '98765 43210'), BT(['*Save'])),
  ],
  'dark-mode': [
    HOME('Settings'),
    SET('Display'),
    T(SK.set, B('Display'), R(['Brightness level|||=60%', 'Adaptive brightness|On|☀️|on', '*Dark theme|Off|🌙|off', 'Font size and style|Default|🔤', 'Screen timeout|After 30 seconds|⏱️'])),
  ],
  wallpaper: [
    T(SK.home, ST(), GAP(), HD('Press and hold the empty space here'), GAP(), G(['Phone|📞', 'Messages|💬', 'Camera|📷', 'Settings|⚙️'])),
    T(SK.home, ST(), GAP(), R(['*Wallpaper & style|🎨', 'Widgets|🧩', 'Home settings|⚙️']), GAP(true)),
    T(SK.set, B('Wallpapers'), TL(['*My photos|🖼️', 'Landscapes|🏞️', 'Life|🌺', 'Colours|🎨', 'Textures|🧵', 'Art|🖌️'])),
    [
      T(SK.set, B('Choose a photo'), TL(['*Photo 1|🌅', 'Photo 2|🌸', 'Photo 3|👨‍👩‍👧', 'Photo 4|🏞️'])),
      T(SK.set, B('Preview'), H('🌅', 'Your photo'), GAP(true), BT(['*Set wallpaper'])),
      T(SK.set, H('🌅', 'Your photo'), DG('Set wallpaper', 'Choose where to show it', ['*Home screen', 'Lock screen', 'Home and lock screens'])),
    ],
  ],
  'install-app': [
    HOME('Play Store'),
    T(SK.play, B('Google Play', { back: false }), SR('Search apps & games', { t: true }), CH(['^For you', 'Top charts', 'Kids', 'Categories']), H('🎮', 'Games you may like')),
    T(SK.play, B('Search', { back: true }), SR('phonepe', { typed: true }), R(['*PhonePe: Secure Payments|PhonePe Private Limited · 4.4★|💜', 'PhonePe Recharge Offers|Quick Apps Studio · 2.1★|⚠️', 'PhonePe Business|PhonePe Private Limited|💜'])),
    T(SK.play, B('PhonePe', { back: true }), H('💜', 'PhonePe: Secure Payments', 'PhonePe Private Limited · 100 crore+ downloads'), BT(['*Install'])),
    T(SK.play, B('PhonePe', { back: true }), H('💜', 'PhonePe: Secure Payments', 'Installed'), BT(['ghost:Uninstall', '*Open'], true)),
  ],
  'update-app': [
    HOME('Play Store'),
    T(SK.play, B('Google Play', { back: false, right: ['*👤'] }), SR('Search apps & games'), H('📱', 'Apps you use')),
    T(SK.play, B('Google Play', { back: true }), R(['Notifications & offers|🔔', 'Payments & subscriptions|💳', '*Manage apps & device|📲', 'Play Protect|🛡️', 'Settings|⚙️'])),
    T(SK.play, B('Manage apps & device'), R(['Updates available|3 apps|⬆️|=Update all'], undefined), BT(['*Update all'])),
  ],
  bluetooth: [
    T(SK.dark, ST(), GAP(), HD('Swipe down from the very top'), GAP(true)),
    T(SK.dark, ST(), TL(['Wi-Fi|📶|', '*Bluetooth|🔵', 'Torch|🔦', 'Auto-rotate|🔄', 'Airplane mode|✈️', 'Battery Saver|🔋'])),
    T(SK.set, B('Bluetooth'), R(['Bluetooth|On|🔵|on'], 'Currently connected'), R(['*boAt Rockerz 255|Ready to pair|🎧', 'JBL Go 3|Ready to pair|🔊'], 'Available devices')),
  ],
  'airplane-mode': [
    T(SK.dark, ST(), GAP(), HD('Swipe down from the very top'), GAP(true)),
    T(SK.dark, ST(), TL(['Wi-Fi|📶', 'Bluetooth|🔵', 'Torch|🔦', '*Airplane mode|✈️'])),
    T(SK.dark, ST(), TL(['Wi-Fi|📶', 'Bluetooth|🔵', 'Torch|🔦', '^*Airplane mode|✈️']), X('Airplane mode is on. No calls, no internet.')),
  ],
  'free-space': [
    [HOME('Settings'), SET('Storage')],
    T(SK.set, B('Storage'), H('💾', '58% used', '74 GB of 128 GB'), BT(['*Free up space'])),
    N(SK.set, B('Free up space'), R(['Videos|2.1 GB|🎬', 'WhatsApp|1.4 GB|💬', 'Photos|3.0 GB|🖼️', 'Downloads|0.6 GB|⬇️'])),
    T(SK.set, B('Free up space'), R(['Blurry photos|0.2 GB|🖼️', 'Old downloads|0.6 GB|⬇️']), GAP(true), BT(['*Free up 0.8 GB'])),
  ],
  'battery-saver': [
    [HOME('Settings'), SET('Battery')],
    T(SK.set, B('Battery'), H('🔋', '82%', 'About 1 day 6 hours left'), R(['*Battery Saver|Off|🔋|off', 'Battery usage|Last 24 hours|📊', 'Adaptive battery|On|🔋|on'])),
    N(SK.dark, ST(), TL(['Wi-Fi|📶', 'Bluetooth|🔵', 'Torch|🔦']), H('🔆', 'Brightness', 'Slide the bar to the left to make the screen dimmer')),
  ],
  'screen-lock': [
    [HOME('Settings'), SET('Security & privacy')],
    T(SK.set, B('Security & privacy'), R(['Find My Device|On|📍', '*Screen lock|Swipe|🔒', 'Fingerprint|Not set up|☝️', 'Smart Lock|🔓'])),
    [
      T(SK.set, B('Choose screen lock'), R(['None', 'Swipe', 'Pattern', '*PIN', 'Password'])),
      PIN('Choose your PIN', 'Type the same PIN twice'),
    ],
    N(SK.set, B('Screen lock'), H('✅', 'PIN is set', 'Do not use 1234 or your birth year'), X('Write it in a notebook and keep it at home.')),
  ],
  fingerprint: [
    [HOME('Settings'), SET('Security & privacy')],
    T(SK.set, B('Security & privacy'), R(['Screen lock|PIN|🔒', '*Fingerprint|Not set up|☝️', 'Face unlock|Not set up|🙂'])),
    PIN('Confirm your PIN', 'Type your screen lock PIN'),
    N(SK.set, B('Fingerprint'), H('☝️', 'Touch the sensor', 'Lift and touch again, moving your finger a little each time'), X('Progress: 60%')),
  ],
  'find-phone': [
    T(SK.chrome, B('Chrome', { back: false }), SR('Search or type web address', { t: true }), H('🌐', 'Google')),
    N(SK.chrome, B('android.com/find'), H('👤', 'Sign in', 'Use the same Google account as your lost phone'), F('Email', 'kamla@gmail.com'), BT(['Next'])),
    T(SK.chrome, B('Find My Device'), H('🗺️', 'Pixel 7a', 'Last seen: just now, near MG Road'), BT(['*Play sound', 'Secure device', 'Erase device'])),
    T(SK.chrome, B('Find My Device'), H('🔒', 'Lost or stolen?', 'Lock it and show a message'), BT(['Play sound', '*Secure device', 'Erase device'])),
  ],
  'phone-language': [
    [HOME('Settings'), SET('System')],
    T(SK.set, B('System'), R(['*Languages|English (India)|🌐', 'Gestures|👆', 'Date & time|🕘', 'Backup|☁️'])),
    [
      T(SK.set, B('Languages'), R(['English (India)|Default|🌐'], 'Preferred languages'), BT(['*Add a language'])),
      T(SK.set, B('Add a language'), SR('Search'), R(['*हिन्दी|Hindi', 'മലയാളം|Malayalam', 'தமிழ்|Tamil'])),
      N(SK.set, B('Languages'), R(['^हिन्दी|Drag to move to the top', 'English (India)'], 'Preferred languages')),
    ],
  ],
  'call-volume': [
    T(SK.set, B('Ramesh', { back: false }), H('📞', 'Ramesh', '00:12'), TL(['Mute|🎤', 'Keypad|⌨️', 'Speaker|🔊']), BT(['*Volume + (side button)'])),
    T(SK.set, B('Ramesh', { back: false }), H('📞', 'Ramesh', '00:25'), TL(['Mute|🎤', 'Keypad|⌨️', '*Speaker|🔊', 'Hold|⏸️'])),
    N(SK.set, B('Phone'), H('🎤', 'Microphone hole', 'It is at the bottom. A cover or dust can block it'), X('Clean it gently with a dry soft brush.')),
  ],
  'restart-phone': [
    T(SK.home, ST(), GAP(true), BT(['*Press and hold the Power button (right side)'])),
    T(SK.dark, ST(), GAP(true), R(['Power off|⏻', '*Restart|🔄', 'Emergency|🆘'])),
    N(SK.dark, ST(), H('🔄', 'Still stuck?', 'Hold the power button for 15 seconds until the screen goes black'), X('Then press it once more to switch on.')),
  ],
  'uninstall-app': [
    T(SK.home, ST(), GAP(), G(['Phone|📞', 'Camera|📷', '*Candy Game|🍬', 'Settings|⚙️', 'Play Store|▶️', 'Gallery|🖼️'])),
    T(SK.home, ST(), R(['Remove|🗑️', '*Uninstall|❌', 'App info|ℹ️']), GAP(true)),
    T(SK.set, H('🍬', 'Candy Game'), DG('Uninstall this app?', 'You can install it again later from the Play Store.', ['Cancel', '*OK'])),
  ],
  'mute-notifications': [
    [
      T(SK.home, ST(), GAP(), G(['Phone|📞', 'Camera|📷', '*Shopping App|🛍️', 'Settings|⚙️'])),
      T(SK.home, ST(), R(['Remove|🗑️', '*App info|ℹ️']), GAP(true)),
    ],
    T(SK.set, B('App info'), H('🛍️', 'Shopping App'), R(['*Notifications|On|🔔', 'Permissions|📋', 'Storage & cache|💾', 'Mobile data & Wi-Fi|📶'])),
    T(SK.set, B('Notifications'), R(['*All Shopping App notifications|Turn this off|🔔|on', 'Offers|On|🏷️|on', 'Order updates|On|📦|on'])),
  ],
  'do-not-disturb': [
    T(SK.dark, ST(), GAP(), HD('Swipe down from the very top'), GAP(true)),
    T(SK.dark, ST(), TL(['Wi-Fi|📶', 'Bluetooth|🔵', '*Do Not Disturb|🔕', 'Torch|🔦'])),
    T(SK.set, B('Do Not Disturb'), R(['Do Not Disturb|On|🔕|on'], undefined), R(['*People|Calls from starred contacts only|👤', 'Apps|Alarms always allowed|🧩', 'Schedules|Sleeping|🌙'])),
  ],
  'emergency-sos': [
    T(SK.plain, B('Phone', { back: false }), F('Number', '112'), GAP(true), BT(['*📞 Call']), KP()),
    N(SK.set, B('Emergency SOS'), R(['Use Emergency SOS|On|🆘|on', 'Press the power button 5 times|Calls emergency services|🔘'])),
    T(SK.set, B('Safety & emergency'), R(['Medical info|🩺', '*Emergency contacts|Add a family member|👨‍👩‍👧', 'Emergency alerts|🚨'])),
  ],
  'share-photo-whatsapp': [
    T(SK.plain, B('Gallery', { back: false }), TL(['*Photo|🌅', 'Photo|🌸', 'Photo|👨‍👩‍👧', 'Photo|🏞️', 'Photo|🌄', 'Photo|🌺'])),
    T(SK.dark, H('🌅', 'Photo'), GAP(true), NV(['*Share|📤', 'Edit|✏️', 'Lens|🔎', 'Delete|🗑️'])),
    [
      T(SK.plain, B('Share'), H('🌅', 'Photo'), R(['Messages|💬', '*WhatsApp|🟢', 'Gmail|✉️', 'Copy|📋'])),
      T(SK.wa, B('Share with…'), R(['*Ramesh', 'Sunita', 'Anil', 'Family'])),
    ],
    T(SK.wa, B('Send to Ramesh'), H('🌅', 'Photo'), GAP(true), BT(['*➤ Send'])),
  ],
  'google-photos-backup': [
    HOME('Photos'),
    T(SK.plain, B('Photos', { back: false, right: ['*👤'] }), TL(['Photo|🌅', 'Photo|🌸', 'Photo|🏞️', 'Photo|🌄'])),
    T(SK.plain, B('kamla@gmail.com', { back: false }), R(['*Turn on backup|Off|☁️', 'Photos settings|⚙️', 'Free up space|💾'])),
    T(SK.plain, H('☁️', 'Back up your photos?', 'They are saved safely in your Google account'), BT(['ghost:Not now', '*Confirm'], true)),
  ],
  'recover-photo': [
    HOME('Photos'),
    [
      T(SK.plain, B('Photos', { back: false }), TL(['Photo|🌅', 'Photo|🌸', 'Photo|🏞️']), NV(['^Photos|🖼️', 'Search|🔍', 'Sharing|👥', '*Library|📚'])),
      T(SK.plain, B('Library', { back: false }), R(['Favourites|⭐', 'Utilities|🧰', '*Bin|🗑️|=30 days'])),
    ],
    [
      T(SK.plain, B('Bin'), TL(['*Photo|🌅', 'Photo|🌸'])),
      T(SK.plain, B('1 selected'), TL(['^Photo|🌅', 'Photo|🌸']), GAP(true), BT(['*Restore', 'ghost:Delete'], true)),
    ],
  ],
};
