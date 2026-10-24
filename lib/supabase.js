// New-style secret keys (sb_secret_...) are not JWTs and go in the apikey header only. The older service_role key is a JWT and
// goes in both. This works with either.
export const authHeaders = (key) => (String(key).startsWith('sb_') ? { apikey: key } : { apikey: key, Authorization: `Bearer ${key}` });

// Tiny server-side Supabase REST helper (keys stay on the server).
export function sb() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const headers = authHeaders(key);
  return { url, key, headers };
}
