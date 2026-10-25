// Position a hand outside the target. Try its lower-right corner first, then flip/fallback at screen edges.
// Coordinates are relative to the inside of the practice frame; null leaves the highlight alone if no hand fits.
export function handPosition(box, width, height) {
  for (const size of [42, 30]) {
    const gap = 3;
    const candidates = [
      ...(box.right - box.left <= 64 && box.bottom - box.top <= 64 ? [{ left: (box.left + box.right - size) / 2, top: box.bottom + gap, direction: 'up' }] : []),
      { left: box.right - 12, top: box.bottom + gap, direction: 'corner-right' },
      { left: box.left - size + 12, top: box.bottom + gap, direction: 'corner-left' },
      { left: box.left - size - gap, top: box.bottom - size, direction: 'right' },
      { left: box.right + gap, top: box.bottom - size, direction: 'left' },
      { left: box.right - size, top: box.bottom + gap, direction: 'up' },
      { left: box.right - size, top: box.top - size - gap, direction: 'down' },
      { left: box.left, top: box.top - size - gap, direction: 'down' },
    ];
    const fit = candidates.find((p) => p.left >= 4 && p.top >= 4 && p.left + size <= width - 4 && p.top + size <= height - 4);
    if (fit) return { x: fit.left + size / 2, y: fit.top + size / 2, size, direction: fit.direction };
  }
  return null;
}
