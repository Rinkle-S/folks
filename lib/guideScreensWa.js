import { SK, B, R, TL, BT, NV, CH, F, H, X, SR, DG, TO, GAP, T, N } from './guideScreens';

const W = SK.wa;
const CHATS = ['Ramesh|Photo|👨', 'Family|Sunita: Dinner at 8?|👨‍👩‍👧', 'Sunita|Ok, see you|👩', '+91 98xxx xxxxx|You won a prize! Click...|❓'];
// Chat list. mark = chat to tap; fab = true when the green button is the target; right = target in the top bar.
const chatList = (mark, fab, right) =>
  T(W, B('WhatsApp', { back: false, right: right ? ['📷', '🔍', '*⋮'] : ['📷', '🔍', '⋮'] }), CH(['^All', 'Unread', 'Favourites', 'Groups']), R(CHATS.map((c) => (mark && c.split('|')[0] === mark ? '*' + c : c))), GAP(true), BT([fab ? '*+ New chat' : '+ New chat']), NV(['^Chats|💬', 'Updates|🔄', 'Communities|👥', 'Calls|📞']));
const MENU = (...items) => T(W, B('WhatsApp', { back: false }), R(items));
// A chat. clip: attach icon is the target; mic: the mic is the target; bubble: a bubble is the target.
const chat = (name, o = {}) =>
  T(
    W,
    B(name, { right: ['🎥', '📞', o.menu ? '*⋮' : '⋮'] }),
    o.name ? H('👤', name, 'Tap the name at the top', undefined, true) : X('Today'),
    o.bubble ? H('💬', o.bubble, 'You · 4:12 PM', 'good', true) : X('Hi, are you coming for dinner?'),
    GAP(true),
    TL([o.clip ? '*Attach|📎' : 'Attach|📎', 'Message|⌨️', o.mic ? '*Hold to record|🎤' : 'Mic|🎤'])
  );

export const SPEC_WA = {
  'wa-create-group': [
    chatList(null, true),
    T(W, B('New chat'), R(['*New group|👥', 'New contact|➕', 'New community|🏘️'])),
    T(W, B('Add participants'), R(['^Sunita|', '*Ramesh', 'Anil', 'Priya'])),
    T(W, B('New group', { right: [] }), R(['^Sunita', '^Ramesh']), GAP(true), BT(['*➜ Next'])),
    T(W, B('New group'), F('Group name', 'Family'), GAP(true), BT(['*✓ Create'])),
  ],
  'wa-leave-group': [
    chatList('Family'),
    [
      chat('Family', { menu: true }),
      MENU('*More|', 'Group info|', 'Search|', 'Mute notifications|'),
      T(W, B('More'), R(['Report|🚩', '*Exit group|🚪', 'Add shortcut|📲', 'Export chat|📤'])),
    ],
    T(W, DG('Exit "Family" group?', 'Others will see that you left.', ['Cancel', '*Exit'])),
  ],
  'wa-send-photo': [
    chatList('Ramesh'),
    chat('Ramesh', { clip: true }),
    [
      T(W, B('Ramesh'), TL(['*Gallery|🖼️', 'Camera|📷', 'Document|📄', 'Audio|🎧', 'Location|📍', 'Contact|👤'])),
      T(W, B('Gallery'), TL(['*Photo|🌅', 'Photo|🌸', 'Photo|🏞️', 'Photo|🌄'])),
    ],
    T(W, B('Ramesh'), H('🌅', 'Photo'), F('Add a caption…', ''), BT(['*➤ Send'])),
  ],
  'wa-voice-message': [
    chatList('Ramesh'),
    chat('Ramesh', { mic: true }),
    N(W, B('Ramesh'), H('🎙️', 'Recording… 0:07', '◀ Slide left to cancel')),
  ],
  'wa-delete-message': [
    chat('Ramesh', { bubble: 'Meeting at 5?' }),
    T(W, B('1', { right: ['↩️', '⭐', '*🗑️', '⋮'] }), H('💬', 'Meeting at 5?', 'You · 4:12 PM', 'good')),
    T(W, DG('Delete message?', undefined, ['*Delete for everyone', 'Delete for me', 'Cancel'])),
  ],
  'wa-profile-photo': [
    [chatList(null, false, true), MENU('New group|', 'Linked devices|', 'Starred|', '*Settings|')],
    T(W, B('Settings'), R(['*Kamla Devi|Hey there! I am using WhatsApp|👩', 'Account|🔑', 'Privacy|🔒', 'Chats|💬', 'Notifications|🔔'])),
    T(W, B('Profile'), H('👩', 'Kamla Devi'), BT(['*📷 Change photo'])),
    [
      T(W, B('Profile photo'), R(['Camera|📷', '*Gallery|🖼️', 'Avatar|🙂'])),
      T(W, B('Choose a photo'), TL(['*Photo|🌅', 'Photo|🌸', 'Photo|🏞️'])),
      T(W, B('Crop'), H('🌅', 'Move to fit'), GAP(true), BT(['*Done'])),
    ],
  ],
  'wa-share-location': [
    chatList('Ramesh'),
    [chat('Ramesh', { clip: true }), T(W, B('Ramesh'), TL(['Gallery|🖼️', 'Camera|📷', 'Document|📄', 'Audio|🎧', '*Location|📍', 'Contact|👤']))],
    T(W, B('Send location'), R(['*Send your current location|Accurate to 20 metres|📍', 'Share live location|For 15 minutes, 1 hour…|🛰️', 'Nearby places|🏪'])),
  ],
  'wa-mute-chat': [
    chatList('Family'),
    T(W, B('1', { right: ['📌', '*🔇', '🗑️', '⋮'] }), R(['^Family|Sunita: Dinner at 8?|👨‍👩‍👧', 'Ramesh|Photo|👨'])),
    [
      T(W, B('Mute notifications'), R(['8 hours', '1 week', '*Always'])),
      T(W, B('Mute notifications'), R(['8 hours', '1 week', '^Always']), GAP(true), BT(['ghost:Cancel', '*OK'], true)),
    ],
  ],
  'wa-block-contact': [
    chatList('+91 98xxx xxxxx'),
    [
      chat('+91 98xxx xxxxx', { menu: true }),
      MENU('View contact|', 'Search|', 'Mute notifications|', '*More|'),
      T(W, B('More'), R(['Report|🚩', '*Block|🚫', 'Clear chat|🧹'])),
    ],
    T(W, DG('Block +91 98xxx xxxxx?', '☑ Report contact and delete chat. Blocked contacts can no longer call or message you.', ['Cancel', '*Block'])),
  ],
  'wa-backup': [
    [chatList(null, false, true), MENU('New group|', 'Linked devices|', '*Settings|')],
    [
      T(W, B('Settings'), R(['Kamla Devi|👩', 'Account|🔑', 'Privacy|🔒', '*Chats|💬', 'Notifications|🔔'])),
      T(W, B('Chats'), R(['Theme|🎨', 'Wallpaper|🖼️', 'Font size|🔤', '*Chat backup|☁️', 'Chat history|🕘'])),
    ],
    T(W, B('Chat backup'), R(['Last backup|Never|☁️', 'Google Account|kamla@gmail.com|👤', 'Back up over|Wi-Fi|📶']), GAP(true), BT(['*Back up'])),
    N(W, B('Chat backup'), H('☁️', 'Backup done', 'Do this before you change your phone', 'good')),
  ],
  'wa-reply': [
    N(W, B('Ramesh'), X('Ramesh: Are you coming for dinner tonight?'), X('You: Yes, I will come')),
    T(W, B('Ramesh'), H('💬', 'Are you coming for dinner tonight?', 'Swipe this message to the right ➜', undefined, true)),
    T(W, B('Ramesh'), X('↪ Ramesh: Are you coming for dinner tonight?'), F('Message', 'I will come at 8'), GAP(true), BT(['*➤ Send'])),
  ],
  'wa-forward': [
    chat('Ramesh', { bubble: 'Photo of the invitation' }),
    T(W, B('1', { right: ['↩️', '⭐', '🗑️', '*➡️'] }), H('💬', 'Photo of the invitation', 'Ramesh · 4:12 PM')),
    [
      T(W, B('Forward to…'), SR('Search'), R(['*Sunita', 'Anil', 'Family'])),
      T(W, B('Forward to…'), R(['^Sunita', 'Anil']), GAP(true), BT(['*➤ Send'])),
    ],
  ],
  'wa-send-document': [
    chatList('Ramesh'),
    [chat('Ramesh', { clip: true }), T(W, B('Ramesh'), TL(['Gallery|🖼️', 'Camera|📷', '*Document|📄', 'Audio|🎧', 'Location|📍', 'Contact|👤']))],
    [
      T(W, B('Select document'), R(['*Browse other docs…|📁', 'Electricity-bill.pdf|Recent|📄'])),
      T(W, B('Files'), R(['Downloads|📁', '*Electricity-bill.pdf|120 KB|📄', 'Ration-card.jpg|80 KB|🖼️'])),
    ],
    T(W, DG('Send to Ramesh?', 'Electricity-bill.pdf', ['Cancel', '*Send'])),
  ],
  'wa-add-contact-chat': [
    N(SK.plain, B('Create contact'), F('First name', 'Ramesh'), F('Phone', '98765 43210'), BT(['Save'])),
    chatList(null, true),
    [
      T(W, B('New chat'), SR('ramesh', { typed: true }), R(['*Ramesh|Hey there! I am using WhatsApp|👨'], 'Contacts on WhatsApp')),
      N(W, B('New chat'), H('🔄', 'Ramesh not showing?', 'Pull the list down with your finger to refresh')),
    ],
  ],
  'wa-disappearing': [
    chat('Ramesh', { name: true }),
    T(W, B('Ramesh'), H('👨', 'Ramesh', '+91 98765 43210'), R(['Media, links and docs|🖼️', 'Mute notifications|🔔', '*Disappearing messages|Off|⏳', 'Encryption|🔒'])),
    T(W, B('Disappearing messages'), R(['*24 hours', '7 days', '90 days', '^Off'])),
  ],
};
