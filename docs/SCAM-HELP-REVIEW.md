# Scam help, completion and sharing review, 26 October 2026

## Scope and audit

Read the supplied `nook-scam-help-guide.zip/BRIEF.md` in full and opened all six rendered HTML mockups before implementation. Source references and QA screenshots are kept outside Git in `../layout-checks/scam-help/`.

| Request | Before | Change |
| --- | --- | --- |
| Six-step lost-money guide | Missing; existing cards dialled 1930 | New `/scams/help`, shared entry card, existing Icons, PrintBar, tracking and palette reused |
| Guide entry points | Direct dial on Home and reading page 3 | Home, reading page 3, every reading completion and test completion open step 1; guide has a real 1930 calling link on every step |
| Settings install row | Conditional install action could do nothing | Removed the row and its hook from Settings; other installation support retained |
| Completion actions | Watch/Read returned to Practice ambiguously; Practice opened the next lesson | Watch/Read explicitly name Nook's practice phone; Practice opens the real app destination |
| Phone basics completion | No single real app to launch | Install lesson opens Play Store; common-icons lesson offers the real-phone Read checklist |
| Completion reminders | Safety rows amber with repeated labels | All three tips use the same numbered treatment; safety advice itself retained |
| Completion feedback | Monochrome vector faces | Actual colourful emoji with visible translated Easy/Okay/Hard labels; one existing feedback question retained |
| Topic pages | Top Print, per-lesson sharing | Both topics use a bottom helper section with scoped existing Send flow and Print |
| Desktop QR | Encoded the current route | Always encodes `https://nook-learn.vercel.app/`, as confirmed by the owner |
| Stay safe progress/layout | Home bars reflected completed positions; short-screen rules hid/shrank content; reading bar vanished on quiz | Home fills by completed count; reading bar stays full through check/completion; scrollable content and separate pinned controls prevent bars shrinking and text clipping |
| Shared-link preview | No explicit social preview | Public 1200×630 branded PNG, site-wide Open Graph/Twitter metadata, specific lesson/app/topic/guide/safety titles; no personal query data in preview |

## Factual verification and interpretations

- Inspected the current **cybercrime.gov.in** desktop site and its complaint entry dialog in Chrome on 26 October. Current verified button: **Register a Complaint**. The current portal is version 2.0 and did not expose a separately named financial-fraud option before the consent screen. No consent was accepted and no report submitted. The guide therefore uses the verified button and a plain instruction to report financial fraud, **not** the mockup's unverified “Choose: report financial fraud” placeholder. A separate financial-category label remains unverified. Evidence screenshots: `portal-desktop.png`, `portal-complaint.png` in the QA folder.
- [RBI, 6 July 2017 circular](https://www.rbi.org.in/commonman/English/scripts/Notification.aspx?Id=2623): distinguish third-party breaches from customer-shared credentials, count the three working days from receiving the bank's transaction communication, and describe ten-working-day shadow reversal as **provisional credit**. Do not imply every authorised scam payment must be refunded. The person is still encouraged to report in every case.
- [112 official emergency service](https://112.gov.in/): verified emergency number. [181 Ministry FAQ](https://www.spniwcd.wcd.gov.in/help/faqs): verified women's helpline; availability varies by state, with 112 for danger when it does not connect.
- [StopNCII operator](https://stopncii.org/): for adults and intimate images taken at 18 or older, on participating platforms. Avoid the mockup's implication that it removes images everywhere. Preserve evidence before blocking.
- [DoT Chakshu advisory](https://sancharsaathi.gov.in/SancharSaathiDocuments/ImportantDocuments/Threatening%20fake%20call%20for%20disconnection%20of%20mobile%20connections.pdf): suspicious communication uses [Chakshu](https://sancharsaathi.gov.in/sfc/); actual financial loss goes to 1930/NCRP.
- Narrowed the recovery-fee claim to free **1930 calls and portal complaint filing**. Do not state that banks never charge for any service.
- Every guide page has a takeaway, including steps 5 and 6 where the brief's table did not supply one explicitly. Long translations scroll within the content area; header and footer are kept separate.
- Used `source=` for guide entry analytics, because Nook already reserves `from=` for the caregiver's name. No accidental overwriting of that name.
- New guide copy and UI controls are EN/HI/ML. The general Send picker also excludes guide wrappers that no longer exist in the active lesson catalogue. Link preview imagery is a shared English brand card; individual preview titles describe the linked lesson. Caregiver names, typed values and personal recordings never enter social metadata.
- Social clients decide whether to render a preview and cache older metadata. Nook supplies crawler-readable metadata and a public PNG; it cannot force a card on every messaging client.
- [Chrome intent syntax](https://developer.chrome.com/docs/android/intents) and [Open Graph properties](https://ogp.me/) checked against the primary documentation. YONO fallback uses the [current official SBI YONO page](https://sbi.bank.in/en/web/yono), not the unavailable legacy host.
- Mobile uses the existing app-opening schemes with an Android browser fallback. Unsupported devices open official app websites; generic phone basics return to Read instructions. An installed app/browser can decide whether to allow a deep link. No transfer or booking is initiated.

## Validation

| Acceptance/check | Result |
| --- | --- |
| All 6 pages, Back/Next and Done | Pass |
| Call 1930 on every page; 112/181 links | Pass, mocked clicks and verified destinations |
| Both required entries start at step 1 | Pass, plus reading/test completion entries |
| EN/HI/ML, 390×844 no overlap/clipping | Pass; also 320×568, 844×390 and 1366×900 |
| Long content scrolls, controls stay pinned | Pass across all 12 language/viewport combinations |
| Print all 6 steps; native-share cancel/copy fallback | Pass with mocks; EN/HI PDF 3 pages, ML 4 pages |
| Exact financial-fraud option label | Not verified beyond the current Register a Complaint entry; placeholder omitted |
| RBI, 112, 181, StopNCII and Chakshu copy | Verified and qualified as documented above |
| Build and Malayalam script | Pass |
| All 15 tutorials × 3 languages × Practice/Read/Watch controls | Pass, 135 mode runs |
| Completion layout, all 3 modes/languages × 4 viewport sizes | Pass; clear Nook Practice vs real-app action |
| Existing Learn v2 and QR/Help/hand/voice-gate regressions | Pass |
| Stay safe reading, quick checks, 6-card test, forward/back progress | Pass across all 12 combinations |
| Automatic next reading lesson | Pass; page and answer state reset on the next lesson |
| Home progress after completing a later lesson first | Pass; fills from the left by completion count |
| Topic helper position, scoped sharing and all general share destinations | Pass; retired destination removed |
| Desktop QR consistency from Help, Stay safe and topic routes | Pass; expected homepage SVG verified |
| WhatsApp crawler metadata in HTML head, correct canonical URL and PNG | Pass for all shared route families; no JS/login required |
| Android/iPhone/desktop app destination generation | Pass; native launch depends on installed apps/browser |
| Search, offline outbox, event idempotency and draining | Pass |

New test: `scripts/test-scam-help.mjs`. `CHECKS_ONLY=1` runs its independent sharing/crawler/platform/automatic-transition checks. Full layout matrix and these independent checks both passed on the final production build. Existing `test-onboarding-v2.mjs` expectations now match the owner's approved real-app completion action.

All source ZIPs and the owner's untracked `SPEC-new.md` are preserved outside this commit. All browser audio, API writes, native sharing, calling and printing are mocked. No real helpline calls, complaint submissions, money transfers or messages are sent. Physical-device OS print/share/deep-link dialogs still need device verification.

The standing `npm run check:ml` command is `node scripts/check-ml.mjs`; this workspace has no npm executable, so the identical script is run directly. It now also checks the new guide's translations.
