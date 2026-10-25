-- Optional hardening: prevents simultaneous duplicate inserts at database level.
-- The app already detects normal retries and deduplicates statistics without this index.
-- Existing events are preserved, so inspect any historical duplicate queue IDs before running.
create unique index if not exists events_queue_id_unique
  on public.events (coalesce(device, ''), type, (meta->>'eid'))
  where meta->>'eid' is not null;
