import { K, I, menu, grid, dialog } from './kitSpec';

const ATTACH = (tap) =>
  grid(
    undefined,
    [
      ['document', 'Document', 'file', '#7f66ff'],
      ['camera', 'Camera', 'camera', '#ff2e74'],
      ['gallery', 'Gallery', 'image', '#c861f9'],
      ['audio', 'Audio', 'volume', '#ff8b2c'],
      ['location', 'Location', 'location', '#1fa855'],
      ['contact', 'Contact', 'user', '#009de2'],
    ].map(([t, l, ic, c]) => [t === tap ? t : undefined, l, ic, c])
  );
const MORE_GROUP = menu([['info', 'Group info'], ['media', 'Group media'], ['search', 'Search'], ['mute', 'Mute notifications'], ['more2', 'More']]);
const MORE_SUB = (tap) => menu([['report', 'Report'], [tap === 'exit' ? 'exit' : undefined, 'Exit group'], [undefined, 'Add shortcut'], [undefined, 'Export chat']]);

const FWD = [{ text: 'URGENT! The government will give ₹5,000 to every family from tomorrow. Click and share this with 10 people today, or you will miss it!', fwd: true, many: true, t: '8:14 am' }];
export const KIT_WA = {
  'wa-verify-forward': [
    K('wa-list', 'chat-ramesh', { tap: 'ramesh' }),
    I('wa-thread', { who: 'ramesh', last: 1, extra: FWD }),
    I('wa-thread', { who: 'ramesh', last: 1, extra: FWD }),
    K('wa-thread', 'search-web', { who: 'ramesh', last: 1, extra: FWD }),
    K('wa-thread', 'search', { who: 'ramesh', last: 1, extra: FWD }, dialog('Search on web?', 'This message will be shared with Google to find related search results. WhatsApp does not see your search.', [['cancel', 'Cancel'], ['search', 'Search on web']])),
    I('and-web', { url: 'google.com/search', gov: 'Search results', title: 'No news website reports this', lines: ['"Government to give ₹5,000 to every family": no trusted news website has this story.', 'Fact-check pages say: FALSE. This message has been going around for months.'] }),
    I('wa-thread', { who: 'ramesh', last: 1, extra: FWD }),
  ],
  'wa-create-group': [
    K('wa-list', 'fab', { fab: true }),
    K('wa-new', 'new-group', { tapGroup: true }),
    [K('wa-pick', 'person', { tap: 'Rahul (Beta)' }), K('wa-pick', 'person', { picked: ['Rahul (Beta)'], tap: 'Sunita' })],
    K('wa-pick', 'next', { picked: ['Rahul (Beta)', 'Sunita'], next: true }),
    [I('wa-group-name', { name: 'Family' }), K('wa-group-name', 'create', { name: 'Family' })],
  ],
  'wa-leave-group': [
    K('wa-list', 'chat-family', { tap: 'family' }),
    [K('wa-thread', 'more', { who: 'family', more: true }), K('wa-thread', 'more2', { who: 'family' }, MORE_GROUP), K('wa-thread', 'exit', { who: 'family' }, MORE_SUB('exit'))],
    K('wa-thread', 'exit-ok', { who: 'family' }, dialog('Exit "Family Group"?', 'Only group admins will be notified that you left the group.', [['cancel', 'Cancel'], ['exit-ok', 'Exit group', true]])),
  ],
  'wa-send-photo': [
    K('wa-list', 'chat-ramesh', { tap: 'ramesh' }),
    K('wa-thread', 'clip', { who: 'ramesh', clip: true }),
    [K('wa-thread', 'gallery', { who: 'ramesh' }, ATTACH('gallery')), K('wa-photos', 'photo')],
    K('wa-send', 'send', { to: 'Ramesh Bhaiya' }),
  ],
  'wa-voice-message': [
    K('wa-list', 'chat-rahul', { tap: 'rahul' }),
    K('wa-thread', 'mic', { who: 'rahul', mic: true }),
    I('wa-thread', { who: 'rahul', recording: true }),
  ],
  'wa-delete-message': [
    K('wa-thread', 'msg-3', { who: 'ramesh', msg: 3 }),
    K('wa-thread', 'delete', { who: 'ramesh', sel: 3 }),
    K('wa-thread', 'everyone', { who: 'ramesh', sel: 3 }, dialog('Delete message?', undefined, [['everyone', 'Delete for everyone'], ['me', 'Delete for me'], ['cancel', 'Cancel']], { stack: true })),
  ],
  'wa-profile-photo': [
    [K('wa-list', 'more', { more: true }), K('wa-list', 'settings', {}, menu([['g', 'New group'], ['b', 'New broadcast'], ['l', 'Linked devices'], ['s', 'Starred'], ['settings', 'Settings']]))],
    K('wa-settings', 'profile'),
    K('wa-profile', 'camera'),
    [
      K('wa-profile', 'gallery', {}, { sheet: { title: 'Profile photo', grid: [{ label: 'Camera', icon: 'camera', color: '#1daa61' }, { t: 'gallery', label: 'Gallery', icon: 'image', color: '#1daa61' }, { label: 'Avatar', icon: 'user', color: '#1daa61' }] } }),
      K('wa-photos', 'photo'),
      K('wa-send', 'done', { done: true }),
    ],
  ],
  'wa-block-contact': [
    K('wa-list', 'chat-unknown', { tap: 'unknown' }),
    [K('wa-thread', 'more', { who: 'unknown', more: true }), K('wa-thread', 'more2', { who: 'unknown' }, menu([['v', 'View contact'], ['s', 'Search'], ['m', 'Mute notifications'], ['more2', 'More']])), K('wa-thread', 'block', { who: 'unknown' }, menu([['r', 'Report'], ['block', 'Block'], ['c', 'Clear chat'], ['a', 'Add shortcut']]))],
    K('wa-thread', 'block-ok', { who: 'unknown' }, dialog('Block +91 98xxx 41223?', 'Blocked contacts will no longer be able to call you or send you messages.', [['cancel', 'Cancel'], ['block-ok', 'Block', true]], { check: 'Report contact and delete chat' })),
  ],
  'wa-reply': [
    I('wa-thread', { who: 'rahul' }),
    K('wa-thread', 'msg-2', { who: 'rahul', msg: 2 }),
    [I('wa-thread', { who: 'rahul', quote: 2, typed: 'Haan beta, aa jao 😊' }), K('wa-thread', 'send', { who: 'rahul', quote: 2, typed: 'Haan beta, aa jao 😊', sendT: true })],
  ],
  'wa-forward': [
    K('wa-thread', 'msg-1', { who: 'family', msg: 1 }),
    K('wa-thread', 'forward', { who: 'family', sel: 1 }),
    [K('wa-pick', 'person', { title: 'Forward to…', tap: 'Ramesh Bhaiya' }), K('wa-pick', 'next', { title: 'Forward to…', picked: ['Ramesh Bhaiya'], next: true, sendLabel: true })],
  ],
  'share-photo-whatsapp': [
    [K('and-home', 'open-gallery', { open: 'gallery' }), K('and-gallery', 'photo')],
    K('and-gallery', 'share', { view: 'photo' }),
    [K('and-gallery', 'share-whatsapp', { view: 'photo', share: true }), K('wa-pick', 'person', { title: 'Send to…', tap: 'Ramesh Bhaiya' })],
    K('wa-send', 'send', { to: 'Ramesh Bhaiya' }),
  ],
};
