// A local preference, shared by phone speech and cached server audio. Default preserves today's pace.
export const VOICE_RATES = [0.6, 0.8, 1];
export function getVoiceRate() {
  try { const value = Number(window.localStorage.getItem('folks_voice_rate')); return VOICE_RATES.includes(value) ? value : 0.8; } catch { return 0.8; }
}
export function setVoiceRate(value) {
  try { window.localStorage.setItem('folks_voice_rate', String(VOICE_RATES.includes(Number(value)) ? Number(value) : 0.8)); } catch {}
}
