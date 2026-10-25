// Concurrent tabs can retry the same queued event. Count its stable queue ID only once.
// Older events without queue IDs retain their existing meaning.
export function uniqueEvents(events) {
  const seen = new Set();
  return events.filter((event) => {
    if (!event.meta?.eid) return true;
    const key = JSON.stringify([event.device, event.type, event.meta.eid]);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
