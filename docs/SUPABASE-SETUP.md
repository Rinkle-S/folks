# Connect Supabase (about 10 minutes, free plan)

Why: until this is done, usage events (lesson started, step done, wrong tap, feedback, print, real-app opens) are kept only on
each phone and the `/stats` page stays empty. Criteria 3 (real data) and 7 (real feedback) need this.

## 1. Create the project
1. Supabase dashboard, open your organization, click **New project**.
2. Name: `nook`. Database password: click **Generate a password** and save it in your password manager. You will not need it again.
3. Region: **South Asia (Mumbai)** (closest to your users). Plan: **Free**.
4. Click **Create new project** and wait about 2 minutes.

## 2. Create the tables
1. In the project, open **SQL Editor**, then **New query**.
2. Open `supabase/schema.sql` in this repo, copy everything, paste it, click **Run**. You should see "Success. No rows returned".
3. Open **Table Editor**. You should see `events` and `custom_lessons`. Leave Storage alone for now: no audio is stored.

## 3. Copy two values
Open **Project Settings, then API** (called **API Keys** in the newer dashboard).
- **Project URL**, like `https://abcdxyz.supabase.co`.
- The **service_role** key (in the newer dashboard it is the **Secret key**, starts with `sb_secret_`). It is secret: do not paste it in
  chat, in GitHub or in any file in this repo.

## 4. Give them to Vercel
1. Vercel, open the project, **Settings, then Environment Variables**.
2. Add `SUPABASE_URL` (the Project URL) and `SUPABASE_SERVICE_ROLE_KEY` (the secret key). Tick **Production** and **Preview**.
3. Leave `SARVAM_TTS` and `SARVAM_STT` as `off`.
4. **Deployments**, the three dots on the latest one, **Redeploy**.

## 5. Check it works
1. Open the live site on your phone, do one lesson and tap the faces at the end.
2. In Supabase, **Table Editor, events**: rows should appear within seconds (`lesson_start`, `step_done`, `feedback`...).
3. Open `/stats` on the live site: the numbers should move. If nothing appears, the Vercel function log shows `supabase insert failed` with the reason.

## When you change content, text or pages
- Events store only a short stable lesson id (like `qr-pay`) and a free-form `meta` column, never the lesson text. So you can
  rewrite wording, reorder steps, rename titles, add or remove pages and the data stays valid.
- Keep lesson and step ids stable. If one has to change, add a line to `docs/CONTENT-IDS.md` ("old id, new id, date").
- Each event also records the app build (`meta.build`), so you can tell which version of the content a result came from.
- New things to track need no database change: send them in `meta`. Only a new event name needs one line in the allowed list in
  `app/api/event/route.js`.
- Custom lessons made by family are saved in `custom_lessons` (`steps` is JSON), so their format can change too.
- No audio is stored. If voice is turned on later, clips are made from the text and can be remade when the text changes.
