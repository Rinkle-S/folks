# Roadmap notes (for the deck, not built)

## Paused until verified: apps and lessons (decided 24 Oct 2026)
**Building a screen is quick. Verifying it against the real app, word for word, is the real work.** So Nook keeps only what
the owner could check against real screenshots. Everything below is paused, not forgotten.

**Hidden in the code, one line to bring back each** (`lib/hidden.js`: remove the id from the list, rebuild):
- Apps: **Rapido** (book an auto, cancel), **PhonePe** (send money).
- Google Pay lessons: reset a forgotten UPI PIN, money was debited but not received.
- Phone guides: block a lost debit card, keep your apps up to date, set a screen lock, send an email, free up phone space,
  change your ringtone, change your wallpaper.
- Moved, not removed: "Is this link or message safe?" is now a quick guide in the Stay safe tab (`/guide/open-link-safe`).

**Removed earlier, code kept in git history** (the commit just before `692c6ff` on 24 Oct 2026 still has all of it):
Paytm, Google Drive (scan to PDF), YouTube, Swiggy, Ola, Amazon, Flipkart, Instagram, Spotify, Blinkit, ICICI iMobile, Zepto.

**Coming soon: government services.** The same safe practice for the things parents are asked to do online for the
government: Aadhaar and DigiLocker, pension and life certificates, income tax, ration card, passport and bill portals.
These need the most careful checking against the real sites, so they come after the core journeys are verified.

**Order to bring things back:** one app at a time. Get 5 to 10 real screenshots from the owner, rebuild the screens from them
(as done for Google Pay in `docs/reference/gpay`), check each step against the app's own help pages, play every lesson in all
three languages, then take the id off the hidden list.

## Earlier notes

Decided 23 Oct 2026. Put these on the roadmap slide when we do the deck at the end.

- **Workshops / sessions:** live group sessions for seniors (dance, yoga, games, chair exercise), a "Workshops" tab
  with "Coming soon". Not built for the buildathon: it adds a second audience and journey, and the reviewers'
  advice (and the winning Akshara entry) was to go deep on one user and one journey.
- Cross-app "how to upload a photo or document" concept lesson.
- Retention: surface the "now try it yourself, no hints" replay (tracked as `real_try`).
- Audio pace research (what pace suits elders).

## Keeping screens up to date when apps change (roadmap, not built)
Practice screens copy real apps (Google Pay, WhatsApp, YouTube and others), and those apps change their look and
button names every few months. A feasible plan, cheapest first:
1. **Screens are data.** Each lesson's screens live in `lib/kitSpec*.js` and the shared templates in `components/kit/`,
   so one fix updates every lesson that uses that screen. Keep it that way.
2. **"Last checked" on every app.** Store app, version and the date we last compared it with the real app. Show a
   short list of apps overdue for a check (say after 90 days).
3. **A "this does not match my phone" button** on every practice screen. It logs the lesson, step, app and phone model
   (to Supabase `events`), so real users tell us which screens are stale first.
4. **Quarterly check of the top 10 apps.** One person takes real-phone screenshots, compares them with the practice
   screens, and fixes the templates. Play Store "what's new" notes are the early warning.
5. **Family helpers can fix it.** The child already adds steps with `/add`. Let them attach a screenshot when a
   screen is out of date, so we get fresh pictures without hunting for them.
6. **Later:** AI-assisted compare. Upload a real screenshot, flag which template differs and what moved.
Rule: label practice screens as "look-alike" (done), so a small difference is expected, and the lesson text names buttons
the way the app shows them.

## Topic courses: what is built and what is still to write (23 Oct 2026)
Built now: "Learn by topic" (`/themes`, `lib/themes.js`): 2 topics per level (6 in all), each with a short "good to know"
intro and an ordered lesson list, plus printable handouts (`/print`). New lessons: realistic Play Store (explore, install,
update), common icons, check a WhatsApp forward. New scam practice: guaranteed 12% returns asking for an OTP.

Still to write, from the workshop outlines (each becomes lessons or a topic):
- **Beginner:** safer browsing and website checks (https, padlock), strong passwords and a password manager, data breaches
  and identity theft explained, reporting an incident (1930, cybercrime.gov.in is already in Scams), social media privacy.
- **Everyday (intermediate):** ride apps beyond Uber and Rapido (Ola); medicines: search a medicine, upload a prescription,
  compare prices; choosing delivery slots; adding a biller and scheduling a bill payment (electricity is built); internet,
  phone and insurance bills; music and video streaming (playlists, offline downloads, accessible features); health trackers
  and brain games; exploring the Play Store on your own; reading product reviews and return policies.
- **Confident (advanced):** set the phone to Hindi or Malayalam; video calls beyond WhatsApp (Meet, Zoom); voice assistants
  and AI helpers (what to ask, what never to tell them); two-factor authentication; app permissions and privacy settings;
  mobile banking in more depth.
- **Icons:** a wider icon set (share, download, bell, heart, edit, trash, refresh, plus, filter) and a "which icon means
  what" practice drawn from other senior guides.
- Writing every lesson in Hindi and Malayalam needs a native read before launch.

## AI helper (removed, parked)
The "ask anything" helper was taken out so Nook is not read as a chatbot wrapper and no raw AI errors reach a parent.
What was removed: the `/api/ask` route (Gemini free tier, with a safe-answer prompt), the `AiGuide` view, the "ask" card on the
no-match screen, and the phone model field that only fed it. Home now says voice assistants and AI helpers are coming soon
(topic "Video calls and talking to your phone"). To bring it back: restore those files from git history (the commit before
this change), add `GEMINI_API_KEY` in Vercel only (never in the repo), show it only after a lesson match fails, keep answers
to five short steps, and never let it ask for an OTP or PIN.

## Beyond the phone: laptop tasks (roadmap)
Once the phone journey is solid, Nook grows the same way (safe practice screen, a voice, scam traps, then do it yourself) to
everyday laptop tasks for the same parents:
- **Documents:** Word (write and save a letter, print it), Excel (a simple household budget, sums, saving and finding the file),
  PowerPoint (a family photo slideshow), PDF forms (fill and sign).
- **Everyday computer use:** email on a laptop, video calls (Meet and Zoom) on a screen, finding and organising files and
  photos, printing and scanning, safe browsing and downloads, online banking and government sites (with extra scam practice).
- **Same product, new screens:** a laptop practice frame next to the phone frame, lessons written once and shown per device,
  and a "do the same on your laptop" lesson after the phone lesson.
- **Community (long term):** interest groups, peer conversations and live learning sessions, under the Nook name ("a reading
  nook, a fireside chat").
