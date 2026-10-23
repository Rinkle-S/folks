// Tiny server-side Supabase REST helper (keys stay on the server).
export function sb() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  return { url, key, headers };
}
