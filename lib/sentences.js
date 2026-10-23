// One way to cut text into sentences, shared by the voice (speaks one at a time) and the screen (highlights the one being spoken).
export function sentences(text) {
  const parts = String(text).match(/[^.!?।]+[.!?।]?/g) || [String(text)];
  return parts.map((x) => x.trim()).filter(Boolean);
}
