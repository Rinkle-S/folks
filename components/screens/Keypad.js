import Icon from '../Icons';

// Number pad. Keys carry data-key; the optional tick key carries data-t="pin-ok".
export default function Keypad({ tick = false, dark = false }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', tick ? 'back' : '', '0', tick ? 'ok' : 'back'];
  return (
    <div className={`keypad ${dark ? 'dark' : ''}`}>
      {keys.map((k, i) => {
        if (k === '') return <div key={i} className="key blank" />;
        if (k === 'ok')
          return (
            <div key={i} className="key ok" data-t="pin-ok" role="button" aria-label="Submit">
              <Icon name="check" size={26} stroke={3} />
            </div>
          );
        if (k === 'back')
          return (
            <div key={i} className="key" data-key="back" role="button" aria-label="Delete">
              <Icon name="backspace" size={24} />
            </div>
          );
        return (
          <div key={i} className="key" data-key={k} role="button">
            {k}
          </div>
        );
      })}
    </div>
  );
}
