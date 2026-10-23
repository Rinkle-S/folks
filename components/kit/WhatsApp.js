// WhatsApp templates (Android, current design), built on the same look as components/screens/WhatsApp.js.
import Icon from '../Icons';
import { Av } from './ui';
import { useScreenText } from '../LangCtx';

export const WA_CHATS = [
  { k: 'rahul', name: 'Rahul (Beta)', msg: 'Ok Mummy, call you in the evening', time: '9:30 am', color: '#2563eb' },
  { k: 'family', name: 'Family Group', msg: 'Sunita: 🙏 सुप्रभात', time: '9:12 am', color: '#7c3aed', unread: 3 },
  { k: 'ramesh', name: 'Ramesh Bhaiya', msg: '✓✓ ठीक है, शाम को मिलते हैं', time: '8:40 am', color: '#ea580c' },
  { k: 'unknown', name: '+91 98xxx 41223', msg: 'Congratulations! You won ₹25 lakh…', time: '8:02 am', color: '#8696a0', unread: 1 },
  { k: 'pinky', name: 'Pinky', msg: '📷 Photo', time: 'Yesterday', color: '#db2777' },
  { k: 'sunita', name: 'Sunita', msg: 'Kal mandir chalenge?', time: 'Yesterday', color: '#16a34a' },
];

function Nav() {
  return (
    <div className="wa-nav">
      {[
        ['chats', 'chats', 'Chats'],
        ['updates', 'updates', 'Updates'],
        ['communities', 'contacts', 'Communities'],
        ['calls', 'phone', 'Calls'],
      ].map(([k, ic, l]) => (
        <div key={k} className={`wa-nav-i ${k === 'chats' ? 'on' : ''}`}>
          <span className="wa-nav-pill">
            <Icon name={ic} size={22} />
          </span>
          {l}
        </div>
      ))}
    </div>
  );
}

// Chat list. tap: a chat key to make tappable (data-t "chat-<k>"); fab / more: those become targets.
// sel: a chat key shown selected (after press and hold), with the selection bar on top.
export function WaList({ tap, fab, more, sel }) {
  const tx = useScreenText();
  return (
    <div className="app wa">
      {sel ? (
        <div className="wa-selbar">
          <Icon name="back" size={22} />
          <b>1</b>
          <span data-t="pin">📌</span>
          <span data-t="delete">
            <Icon name="trash" size={21} />
          </span>
          <span data-t="mute">
            <Icon name="mute" size={21} />
          </span>
          <span data-t="archive">
            <Icon name="box" size={21} />
          </span>
          <Icon name="more" size={22} />
        </div>
      ) : (
        <div className="wa-head">
          <span className="wa-word">WhatsApp</span>
          <span className="wa-head-ic">
            <Icon name="camera" size={22} />
            <span data-t={more ? 'more' : undefined} className="wa-ic-hit">
              <Icon name="more" size={22} />
            </span>
          </span>
        </div>
      )}
      <div className="wa-search">
        <Icon name="search" size={18} />
        <span>Ask Meta AI or Search</span>
      </div>
      <div className="wa-chips">
        <span className="on">All</span>
        <span>Unread 4</span>
        <span>Favourites</span>
        <span>Groups</span>
      </div>
      <div className="wa-list">
        {WA_CHATS.map((c) => (
          <div key={c.k} className={`wa-row ${sel === c.k ? 'wa-sel' : ''}`} data-t={tap === c.k ? `chat-${c.k}` : undefined}>
            <span className="wa-avwrap">
              <Av name={c.name} size={48} color={c.color} />
              {sel === c.k && <i className="wa-selcheck">✓</i>}
            </span>
            <div className="wa-mid">
              <div className="wa-name">{c.name}</div>
              <div className="wa-msg">{tx(c.msg)}</div>
            </div>
            <div className="wa-right">
              <span className={c.unread ? 'green' : ''}>{c.time}</span>
              {c.unread ? <b className="wa-badge">{c.unread}</b> : null}
            </div>
          </div>
        ))}
      </div>
      <div className="wa-fab" data-t={fab ? 'fab' : undefined}>
        <Icon name="plus" size={24} color="#fff" stroke={2.5} />
      </div>
      <Nav />
    </div>
  );
}

const THREADS = {
  ramesh: { name: 'Ramesh Bhaiya', color: '#ea580c', sub: 'online', msgs: [{ text: 'नमस्ते! कैसे हो?', t: '7:58 am' }, { me: 1, text: 'सब ठीक है 🙏', t: '8:05 am' }, { text: 'कल बाज़ार चलेंगे?', t: '8:21 am' }, { me: 1, text: 'हाँ, 10 बजे', t: '8:30 am' }] },
  rahul: { name: 'Rahul (Beta)', color: '#2563eb', sub: 'online', msgs: [{ me: 1, text: 'Beta, khana khaya?', t: '9:10 am' }, { text: 'Haan Mummy 😊', t: '9:22 am' }, { text: 'Sunday ko dinner pe aa raha hoon?', t: '9:30 am' }] },
  family: { name: 'Family Group', color: '#7c3aed', sub: 'Rahul, Sunita, Pinky, You', group: true, msgs: [{ from: 'Sunita', text: '🙏 सुप्रभात', t: '9:10 am' }, { from: 'Rahul', img: '🎂', text: 'Photos from the party', t: '9:12 am' }, { me: 1, text: 'Bahut sundar! ❤️', t: '9:20 am' }] },
  unknown: { name: '+91 98xxx 41223', color: '#8696a0', sub: '', unknown: true, msgs: [{ text: 'Congratulations! You won ₹25 lakh in KBC lucky draw. Send ₹5,000 processing fee to claim. Click: kbc-prize.xyz', t: '8:02 am' }] },
};

// One chat. who: thread key. Targets: clip, mic, more, name, send, msg-<i> (bubbles).
// sel: index of a selected bubble (top bar shows reply/star/delete/forward). quote: replying to a bubble.
export function WaThread({ who = 'ramesh', clip, mic, more, name, msg, sel, quote, typed, recording, sendT, extra }) {
  const tx = useScreenText();
  const c = THREADS[who];
  const msgs = [...c.msgs, ...(extra || [])];
  return (
    <div className="app wa">
      {sel !== undefined ? (
        <div className="wa-selbar">
          <Icon name="back" size={22} />
          <b>1</b>
          <span data-t="reply">
            <Icon name="reply" size={21} />
          </span>
          <span data-t="star">
            <Icon name="star" size={21} />
          </span>
          <span data-t="delete">
            <Icon name="trash" size={21} />
          </span>
          <span data-t="forward">
            <Icon name="forward" size={21} />
          </span>
          <Icon name="more" size={22} />
        </div>
      ) : (
        <div className="wa-chead">
          <Icon name="back" size={22} />
          <Av name={c.name} size={36} color={c.color} />
          <div className="wa-cname" data-t={name ? 'name' : undefined}>
            {c.name}
            {c.sub && <small>{c.sub}</small>}
          </div>
          <span className="wa-head-ic">
            {!c.group && <Icon name="video" size={22} />}
            <Icon name="phone" size={20} />
            <span data-t={more ? 'more' : undefined} className="wa-ic-hit">
              <Icon name="more" size={22} />
            </span>
          </span>
        </div>
      )}
      <div className="wa-msgs">
        {c.unknown && (
          <div className="wa-unknown">
            <small>Not a contact · No groups in common</small>
            <div>
              <span data-t="block-btn">Block</span>
              <span>Add</span>
            </div>
          </div>
        )}
        <div className="wa-chip">Today</div>
        {msgs.map((m, i) => (
          <div key={i} className={`bub ${m.me ? 'me' : ''} ${sel === i ? 'sel' : ''}`} data-t={msg === i ? `msg-${i}` : undefined}>
            {m.from && <b className="wa-from">{m.from}</b>}
            {m.img && <div className="wa-img">{m.img}</div>}
            {tx(m.text)}
            <span>
              {m.t || '10:30 am'} {m.me ? <i className="wa-blue">✓✓</i> : ''}
            </span>
          </div>
        ))}
      </div>
      {quote !== undefined && (
        <div className="wa-quote">
          <b>{msgs[quote].me ? 'You' : msgs[quote].from || c.name}</b>
          {tx(msgs[quote].text)}
        </div>
      )}
      <div className="wa-input">
        <div className="wa-pill">
          <Icon name="emoji" size={22} />
          <span className={typed ? 'typed' : ''}>{recording ? '🔴 0:07   ◀ Slide to cancel' : (typed && tx(typed)) || 'Message'}</span>
          {!typed && !recording && (
            <span data-t={clip ? 'clip' : undefined} className="wa-ic-hit">
              <Icon name="attach" size={20} />
            </span>
          )}
          {!typed && !recording && <Icon name="camera" size={20} />}
        </div>
        <div className={`wa-mic ${recording ? 'rec' : ''}`} data-t={mic ? 'mic' : sendT ? 'send' : undefined}>
          <Icon name={typed ? 'send' : 'mic'} size={20} color="#fff" />
        </div>
      </div>
    </div>
  );
}

const PEOPLE = ['Anil', 'Pinky', 'Priya', 'Rahul (Beta)', 'Ramesh Bhaiya', 'Sunita'];

// "New chat" page.
export function WaNewChat({ tapGroup }) {
  return (
    <div className="app wa">
      <div className="wa-chead">
        <Icon name="back" size={22} />
        <div className="wa-cname">
          Select contact
          <small>256 contacts</small>
        </div>
        <span className="wa-head-ic">
          <Icon name="search" size={21} />
          <Icon name="more" size={22} />
        </span>
      </div>
      <div className="wa-list">
        {[
          ['new-group', 'contacts', 'New group'],
          ['new-contact', 'user', 'New contact'],
          ['new-community', 'contacts', 'New community'],
        ].map(([k, ic, l]) => (
          <div key={k} className="wa-row" data-t={tapGroup && k === 'new-group' ? 'new-group' : undefined}>
            <span className="wa-green-ic">
              <Icon name={ic} size={22} color="#fff" />
            </span>
            <div className="wa-mid">
              <div className="wa-name">{l}</div>
            </div>
          </div>
        ))}
        <div className="wa-sec-h small">Contacts on WhatsApp</div>
        {PEOPLE.map((p) => (
          <div key={p} className="wa-row">
            <Av name={p} size={44} />
            <div className="wa-mid">
              <div className="wa-name">{p}</div>
              <div className="wa-msg">Hey there! I am using WhatsApp.</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pick people (new group, forward, share). picked: names already ticked; tap: name to tap; next: arrow is target.
export function WaPick({ title = 'Add members', picked = [], tap, next, sendLabel }) {
  return (
    <div className="app wa">
      <div className="wa-chead">
        <Icon name="back" size={22} />
        <div className="wa-cname">
          {title}
          <small>{picked.length ? `${picked.length} of 256 selected` : 'Select contacts'}</small>
        </div>
        <Icon name="search" size={21} />
      </div>
      {picked.length > 0 && (
        <div className="wa-picked">
          {picked.map((p) => (
            <span key={p}>
              <Av name={p} size={48} />
              <small>{p.split(' ')[0]}</small>
            </span>
          ))}
        </div>
      )}
      <div className="wa-list">
        {PEOPLE.map((p) => (
          <div key={p} className="wa-row" data-t={tap === p ? 'person' : undefined}>
            <span className="wa-avwrap">
              <Av name={p} size={44} />
              {picked.includes(p) && <i className="wa-selcheck">✓</i>}
            </span>
            <div className="wa-mid">
              <div className="wa-name">{p}</div>
              <div className="wa-msg">Hey there! I am using WhatsApp.</div>
            </div>
          </div>
        ))}
      </div>
      {picked.length > 0 && (
        <div className="wa-fab" data-t={next ? 'next' : undefined}>
          <Icon name={sendLabel ? 'send' : 'arrow'} size={24} color="#fff" stroke={2.5} />
        </div>
      )}
    </div>
  );
}

export function WaGroupName({ name = '' }) {
  return (
    <div className="app wa">
      <div className="wa-chead">
        <Icon name="back" size={22} />
        <div className="wa-cname">New group</div>
      </div>
      <div className="wa-gname">
        <span className="wa-gpic">
          <Icon name="camera" size={24} />
        </span>
        <div className={`wa-gfield ${name ? 'typed' : ''}`}>{name || 'Group name (optional)'}</div>
        <Icon name="emoji" size={22} />
      </div>
      <div className="wa-sec-h small">Members: 2</div>
      <div className="wa-picked">
        {['Rahul (Beta)', 'Sunita'].map((p) => (
          <span key={p}>
            <Av name={p} size={48} />
            <small>{p.split(' ')[0]}</small>
          </span>
        ))}
      </div>
      <div className="wa-fab" data-t="create">
        <Icon name="check" size={26} color="#fff" stroke={2.6} />
      </div>
    </div>
  );
}

// Settings page and profile page.
export function WaSettings() {
  return (
    <div className="app wa">
      <div className="wa-chead">
        <Icon name="back" size={22} />
        <div className="wa-cname">Settings</div>
        <Icon name="search" size={21} />
      </div>
      <div className="wa-row wa-me" data-t="profile">
        <Av name="Kamla Devi" size={60} color="#00a884" />
        <div className="wa-mid">
          <div className="wa-name big">Kamla Devi</div>
          <div className="wa-msg">Hey there! I am using WhatsApp.</div>
        </div>
      </div>
      {[
        ['key', 'Account', 'Security notifications, change number'],
        ['lock', 'Privacy', 'Block contacts, disappearing messages'],
        ['chats', 'Chats', 'Theme, wallpapers, chat history'],
        ['bell', 'Notifications', 'Message, group & call tones'],
        ['storage', 'Storage and data', 'Network usage, auto-download'],
      ].map(([ic, l, s]) => (
        <div key={l} className="wa-row">
          <span className="wa-set-ic">
            <Icon name={ic} size={21} />
          </span>
          <div className="wa-mid">
            <div className="wa-name">{l}</div>
            <div className="wa-msg">{s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function WaProfile({ photo }) {
  return (
    <div className="app wa">
      <div className="wa-chead">
        <Icon name="back" size={22} />
        <div className="wa-cname">Profile</div>
      </div>
      <div className="wa-prof">
        <span className="wa-prof-pic">
          {photo ? <span className="wa-prof-img">{photo}</span> : <Av name="Kamla Devi" size={130} color="#00a884" />}
          <i data-t="camera">
            <Icon name="camera" size={20} color="#fff" />
          </i>
        </span>
      </div>
      {[
        ['user', 'Name', 'Kamla Devi'],
        ['info', 'About', 'Hey there! I am using WhatsApp.'],
        ['phone', 'Phone', '+91 98450 12345'],
      ].map(([ic, l, v]) => (
        <div key={l} className="wa-row">
          <span className="wa-set-ic">
            <Icon name={ic} size={21} />
          </span>
          <div className="wa-mid">
            <div className="wa-msg">{l}</div>
            <div className="wa-name">{v}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// WhatsApp's photo picker and the send preview.
const PICS = ['🌅', '🌸', '👨‍👩‍👧', '🏞️', '🎂', '🪔', '🌺', '🐕', '🏠'];
export function WaPhotos({ tap = true }) {
  return (
    <div className="app wa wa-dark">
      <div className="wa-chead dark">
        <Icon name="close" size={22} color="#fff" />
        <div className="wa-cname">Recents</div>
      </div>
      <div className="wa-pics">
        {PICS.map((p, i) => (
          <span key={i} data-t={tap && i === 2 ? 'photo' : undefined}>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export function WaSendPreview({ to = 'Ramesh Bhaiya', done }) {
  return (
    <div className="app wa wa-dark">
      <div className="wa-chead dark">
        <Icon name="close" size={22} color="#fff" />
        <span style={{ flex: 1 }} />
        <span className="wa-tools">✂️ ✏️ T</span>
      </div>
      <div className="wa-prev">👨‍👩‍👧</div>
      <div className="wa-caption">
        <span>{done ? 'Crop and tap Done' : 'Add a caption…'}</span>
      </div>
      <div className="wa-sendrow">
        <small>{done ? '' : `➤ ${to}`}</small>
        <span className="wa-sendbtn" data-t={done ? 'done' : 'send'}>
          {done ? <b>Done</b> : <Icon name="send" size={22} color="#fff" />}
        </span>
      </div>
    </div>
  );
}

// WhatsApp's attach sheet colours (for overlays).
export const WA_ATTACH = (tap) =>
  [
    ['document', 'Document', 'file', '#7f66ff'],
    ['camera', 'Camera', 'camera', '#ff2e74'],
    ['gallery', 'Gallery', 'image', '#c861f9'],
    ['audio', 'Audio', 'volume', '#ff8b2c'],
    ['location', 'Location', 'location', '#1fa855'],
    ['contact', 'Contact', 'user', '#009de2'],
  ].map(([t, l, ic, c]) => [t === tap ? t : undefined, l, ic, c]);
