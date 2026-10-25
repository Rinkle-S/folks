// Keep printing inside the original click/tap. Delayed print calls can fail on mobile Safari.
export function printHandout(root) {
  if (!root || typeof window.print !== 'function') return false;
  document.querySelectorAll('.print-root[data-print-active]').forEach(e => e.removeAttribute('data-print-active'));
  root.setAttribute('data-print-active', 'true');
  root.getBoundingClientRect(); // Flush the committed handout before the browser snapshots it.
  try { window.print(); return true; } catch { return false; }
}
