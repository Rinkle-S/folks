# Lesson, print, YONO and voice audit

## What changed

- Removed duplicated lead-ins from the QR pretend-call question, recharge SMS question and video-call police question in EN/HI/ML. The safety heading remains. Kept the meaningful shop-name pause and actual action instructions.
- End-screen Print now uses the same complete lesson handout as the lesson toolbar. App Print includes exactly the active app lessons; topic Print includes its listed lessons. Printed steps use the current Read scripts, including guide-based lessons, rather than older guide text or only three reminders.
- English lost-money Next labels are Title Case. Topic renamed Common Icons & Play Store, with corresponding Hindi/Malayalam wording. The red lost-money card itself is intentionally unchanged, as requested.
- Every lesson has its own 1200×630 Open Graph image with its title, app and duration. Existing copied/native share messages and canonical lesson links remain intact. A messaging client may cache an older preview; no messages were sent to other people during testing.
- Replaced only the YONO lesson screens with isolated, responsive purple YONO components. Main flow: phone home, Login with MPIN, six practice digits, View Accounts, read balances, safety check. Removed the invented extra View balance action and recent-transactions panel. Home eye toggles combined balance; account-row eye toggles the account number. Real-phone instructions and Watch wording match this flow.
- App content and bottom navigation have separate layout rows. The highlighted View Accounts control cannot slip behind the nav. Scroll areas and wrapping respond to available space; no device-specific CSS or global simulator rescaling was added.
- New Sound/Microphone FAQ, linked from a visible language-specific voice failure notice in scenes, lessons, Read, Settings, onboarding and safety reading/test screens. A missing-language voice pauses Watch, keeping manual controls available.

## Voice findings and limits

The live read-only probes returned `enabled:false` for TTS and STT. Sarvam was not enabled and no paid generation was requested. This means the device/browser must supply speech.

Before editing, the actual Chrome engine on this computer enumerated five English voices (including en-IN), with no hi-IN or ml-IN voice. Silent native synthesis probes showed that accepting a language-tagged request is not proof of a matching voice or correct pronunciation. Nook previously passed a null voice to the browser when no match existed, allowing a silent or incorrect default-language fallback.

The fix waits briefly for `voiceschanged`, explicitly selects a matching language voice, stops on synthesis failure, and shows translated setup guidance when unavailable. It never substitutes an English voice for Hindi/Malayalam. Existing successful-speech tests now supply three explicit matching test voices; dedicated missing-voice tests supply English only and assert that no Malayalam/Hindi utterance is submitted. Cancellation guards prevent an older pending request from interrupting newer speech. TTS availability probes have a bounded timeout.

Speech recognition remains a separate browser service. Each mic request uses the chosen en-IN/hi-IN/ml-IN locale; unsupported-language feedback explains that typing is available. Installing a reading voice does not install microphone recognition.

Physical Samsung/Safari voices, audible Malayalam pronunciation and a real microphone on the owner's phone cannot be verified from this Windows browser. Native OS dialogs are not simulated as successful hardware tests. Voice availability/recovery, all lesson/hint routing, errors, permissions and STT locale are checked with controlled browser fixtures. The native browser voice-list investigation above is real; routed-language fixtures are explicitly mocked.

## References

- Owner-provided YONO screenshots: login options, Banking/Transaction Accounts, Accounts and account-number eye. All names, balances and account numbers in Nook are fictional. No screenshot containing the owner's banking data is shipped.
- [SBI registration FAQ](https://sbi.bank.in/web/customer-care/yono-registration): six-digit MPIN and alternative sign-in. [SBI YONO transfer description](https://sbi.bank.in/web/yono/fund-transfer): the pre-login View Balance feature is distinct from the post-login route. This lesson teaches the screenshot's post-login route.
- [Samsung TTS settings and voice installation](https://www.samsung.com/us/support/answer/ANS10003701/), [Android TTS setup](https://support.google.com/accessibility/android/answer/6006983?hl=en-GB): engine/language availability and installation steps. FAQ acknowledges menu differences and unavailable languages.
- [Speech voice enumeration](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices), [voice-list loading event](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event), [synthesis language errors](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisErrorEvent/error).

## Release verification

| Check | Result |
| --- | --- |
| Production build, Malayalam completeness and whitespace checks | Pass |
| All 15 tutorials × three languages × Practice/Watch/Read | Pass, 135 control runs |
| Automatic Watch completion | Pass, 45 runs |
| Onboarding branches, completion layout and Learn v2 | Pass |
| QR flow, Help/replay, quizzes and safety narration | Pass |
| YONO controls, privacy and target/nav layout | Pass at 320×568, 360×800, 393×852, 390×844 and 1366×900 in all three languages |
| Full lesson-end handouts | Pass, 45 PDFs with nonblank pages; 2–3 pages per lesson |
| App/topic print scope and visible ordering | Pass in all three languages, checked against actual page cards |
| iPhone-shaped print gesture, print media and exit navigation | Pass; physical iOS print dialog still requires device verification |
| Supported-language speech, missing-language notice, delayed voices, engine errors, Help/replay and Watch pause | Pass with controlled voices |
| Selected microphone language and failure feedback | Pass with controlled recognition |
| Actual native browser voice inventory | English voices only on this Windows browser; no Hindi/Malayalam voice available for pronunciation testing |
| Lesson-specific crawler metadata and distinct preview PNGs | Pass for all 15 active lessons |
| Stay safe guide, progress, search, outbox and offline regressions | Pass |

QA output lives outside the repository in `../layout-checks/audit-round/`. Native printing/sharing, cloud audio, microphones and external writes are mocked in automated runs. User-added mockup PDFs, images and ZIPs are preserved and not included in the commit. The red lost-money entry card is unchanged.
