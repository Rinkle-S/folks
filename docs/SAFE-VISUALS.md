# Three visual Stay safe decisions

Owner explicitly approved these three additions after research and screenshot review. This is the authorized exception to the standing no-new-lessons scope rule. No AutoPay, additional quiz themes, FAQ or changes to the existing quiz pool were added.

## Product flow

- Stay safe has a separate `What would you tap?` entry card opening `/scams/practice`.
- Intro explains that Nook has no ads and that the examples cannot install, send messages or change settings. Ready immediately starts/resumes the first unexplored screen. No audio-completion gate.
- Order: genuine Maps location permission, cleaner advertisement, India Post address-update message. Each decision happens on real HTML controls in a simulated screen, not on an exported screenshot with inaccessible hotspots.
- Precise/approximate are ordinary selection controls. Both While using and Only this time are suitable. Declining is respected as a privacy choice, with a consequence explanation, never a wrong-answer mark.
- Cleaner Cancel/Close are suitable. Update now is marked as risky; the explanation says it could lead to an unwanted download, without asserting the pictured advertisement is proven malware. The screenshot's timer is frozen and explicitly labelled; there is no countdown pressure.
- Parcel Back/Report Junk are suitable exits. The example URL is a `.example` button with no href, not the live address from the screenshot. Clicking it only explains the risk. Check tracking independently shows and narrates the next safe step, without opening an external site. No actual reports, calls, messages, permissions or downloads.
- Choice feedback uses a green tick, neutral information or soft cross, one explanation and Next. Wrong choices can continue without a forced retry. Controls freeze after a choice to avoid duplicate events.
- A full-page scroll keeps text at 18px+ and interactive targets at 56px+; no nested simulator scroll or overlays over the answer controls. Permission-accuracy choices stack on narrow phones. The teal practice banner and faint localized watermark distinguish examples from real device dialogs.
- Completion gives three reminders, return to Stay safe and repeat. No misleading score or real-app launch. `folks_safe_visual` stores only explored case IDs after Next, separately from reading progress and the existing random quiz. Restarting a completed activity replays all three.
- New namespaced `safe_visual_open/answer/done` events use the existing endpoint and durable outbox, avoiding contamination of existing scam quiz scores. No database schema or cloud voice setting changes.

## Voice and translation

Every new UI and content string is EN/HI/ML, included in check-ml and the speech allowlist. Context and relevant example copy are spoken, with sentence highlighting; choosing an answer stops the old voice and reads feedback. The Listen label explicitly identifies feedback playback. Existing Sound help handles unavailable device voices. Sarvam remains off; browser speech in tests is mocked, not pronunciation validation.

## References and interpretation

- Maps: https://developer.android.com/codelabs/approximate-location and https://support.google.com/pixelphone/answer/9083622 . A Maps permission request after the user opens nearby-place search is a legitimate choice. Labels/options vary by Android version, and denying access remains valid.
- Countdown pressure: https://competition-bureau.canada.ca/en/deceptive-marketing-practices/types-deceptive-marketing-practices/fake-urgency-cues . A timer alone does not establish fraud. The lesson teaches that an advertisement does not independently verify the need for an update.
- Genuine Android protection: https://developers.google.com/android/play-protect/warning-dev-guidance . This lesson does not tell people to ignore all security warnings or bypass Play Protect.
- Parcel: https://newsonair.gov.in/govt-debunks-sms-from-india-post-asking-people-to-update-their-address/ . The owner supplied a matching dark iMessage screenshot. The lesson teaches independent tracking verification rather than treating every delivery SMS as fake.
- The owner-provided cleaner dialog and India Post message guided the layout. Personal sender details and the suspected live URL were replaced. Screens were recreated as code-native UI; no AI-generated images or original private screenshots shipped.

## Verification

Focused checks cover all nine choices in three languages, the 320/360/393/844-landscape/1366 viewport matrix, response focus, neutral vs risky feedback, translation, mocked narration, completion/resume, no device permissions, and separate reading progress. Existing Learn and Stay safe regressions are checked separately. Screenshots remain outside the repository under `../layout-checks/safe-visuals/`.

Release results: production build and Malayalam completeness pass; all 15 flow/layout cases, all nine choices in each language, simulated narration and unavailable Malayalam voice handling pass. Existing nine Learn v2 cases, twelve Stay safe/guide cases, auto-next, metadata/platform destinations and search/durable-outbox regressions pass. No actual speech, microphone, permission dialog, call or production event write was invoked by these tests.
