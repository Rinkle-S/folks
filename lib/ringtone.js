// A quiet, local two-note ring. No files, network calls or real phone calls.
let context;
export function prepareRingtone() {
  try { const Audio = window.AudioContext || window.webkitAudioContext; if (!Audio) return; context ||= new Audio(); context.resume()?.catch?.(() => {}); } catch {}
}
export function startRingtone() {
  prepareRingtone();
  if (!context || context.state === 'suspended') return () => {};
  const nodes = [];
  try {
    for (const offset of [0, 2, 4]) for (const [delay, frequency] of [[0, 440], [0.25, 523.25]]) {
      const oscillator = context.createOscillator(), gain = context.createGain(), at = context.currentTime + offset + delay;
      oscillator.type = 'sine'; oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, at); gain.gain.linearRampToValueAtTime(0.025, at + 0.03); gain.gain.linearRampToValueAtTime(0, at + 0.22);
      oscillator.connect(gain); gain.connect(context.destination); oscillator.start(at); oscillator.stop(at + 0.24); nodes.push([oscillator, gain]);
    }
  } catch {}
  return () => { for (const [oscillator, gain] of nodes) { try { oscillator.stop(); oscillator.disconnect(); gain.disconnect(); } catch {} } };
}
