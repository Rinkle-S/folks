# Tutorial screenshot review, 25 October 2026

## Changes and acceptance

| Owner request | Result |
| --- | --- |
| Car/driver mismatch | Stay outside, verify the booking, contact the booked driver through the app, wait safely for the matching car. Help/cancel only if unresolved or unsafe. Updated practice, real-phone copy and quick guide. |
| Other factual inconsistencies | Cancellation practice now selects Other for changed plans, rather than falsely selecting a long wait. Google Pay opening describes the actual coloured-shape icon. Receiving money needs no UPI PIN; wording no longer incorrectly excludes balance checks. Ride PIN is distinguished from banking PIN. Recharge does not claim Google Pay is the only legitimate recharge app. |
| Oval rupee icon | Removed the inherited flex growth from the WhatsApp rupee symbol. Circles retain equal width and height. |
| Ringing screen | Five-second automatic transition in Practice and Watch. Quiet local two-note ringtone only with sound on. Previous, leaving, pausing Watch and unmounting cancel it. No manual picked-up button. |
| Tutorial safety screens | Teal SAFETY PRACTICE banners for pretend call/SMS questions, including police and bank impersonation. Dedicated inert call screens replace unrelated WhatsApp/bank screens. |
| Wrong safety subtitle | Separated practiceSafetySub from the Stay safe translation key that previously overwrote it. Tutorial calls say This call is pretend. |
| Quiz padding, including QR step 4 | Shared choice styling: 19px text, at least 56px height, 12px vertical/16px horizontal padding and 12px gaps. Questions use page scrolling; phone panels and coaches do not overlap. |
| Completion overload/repetition | One Well done heading, app icon and identifiable completed-lesson card. Remember and feedback expand on request. Removed redundant terminal instruction cards; retained final voice, real-app action, Print, Again and Send. |
| Stay safe page counts | Visual page counts retained. Page 2/3 counts removed from narrated strings. |
| Voice speed | Home Settings has Adjust voice speed: Slower, Slow (default), Normal. Stored locally. Browser utterance rate and cached-audio playback rate both honour it. Default unchanged. |
| Scene highlighting | Sentence highlighting across all 15 scenes, EN/HI/ML. Ready still interrupts speech immediately. |
| iPhone print/save | Handout committed synchronously before window.print in the tap handler. Exactly one active print portal. No deferred print timer. Corrected Safari/AirPrint/PDF help and retained its link from the print message. Native iOS dialog still requires physical-device verification. |
| Send dead end | App-specific Back plus persistent Learn/Stay safe/Help navigation. Invalid URLs have localized Home/Help exits; invalid Stay safe lesson IDs also offer exits. Existing support-page back routes retained. |
| App detection | Research TODO only in PARKING-LOT.md. No permissions or inventory feature added. |

Deferred scene artwork and the earlier graphics stash remain untouched. No Sarvam configuration changes.

## Verification

- Production build and Malayalam completeness check pass.
- All 15 retained lessons x EN/HI/ML: full Practice, Read and Watch controls at 320px, with wrong quiz choices; all 15 at laptop size with right choices. Supporting app/topic/guide/navigation pages: 23 per language. No page errors.
- Dedicated screenshot review: 320x700, 390x844, landscape 844x390 and laptop 1366x900 in all languages. Verified round rupee icons, choice spacing, separate phone/question panels, safety headings, concise completion and send exits.
- Scene speech mocked: sentence progression and immediate Ready in all 45 lesson/language combinations.
- Real five-second timer tested with fake audio, sound on/off, and Previous cancellation.
- Voice preference persistence, browser rate and server-audio playback rate verified with mocks. Stay safe narration excludes page counts.
- PrintBar and LessonPrint invoked within the tap event task, with a populated active root. iPhone-shaped Chromium emulation and print media checks pass in all languages. EN/HI/ML PDFs generated (two pages each); Malayalam PDF rendered and visually inspected for script/font and page layout.
- QR-specific scene/default-mode/resume/PIN/Help/quiz/hand checks pass at phone/laptop sizes in all languages.
- Seven viewport x three language responsive checks pass: rewards, watermark scaling, highlight alignment, hand bounds and Help refocus.
- Learn v2 acceptance regressions pass at 320/390/1366px in EN/HI/ML.
- Search matching, event idempotency and offline-queue regression passes.
- All 45 automatic Watch runs complete unaided. Scene/removed-link/Help/keypad/receipt regressions pass at 320/390/1366px. The observer is installed before Ready, so accelerated playback cannot race ahead of test observation.

All browser speech, Audio, AudioContext, native print dialogs and external API writes are mocked. No actual audio playback, paid speech calls, real messages, payments, bookings or calls were made. Emulation does not establish compatibility with a physical iPhone's native print/share sheet.

## Factual references and interpretations

- [Uber: contact your booked driver](https://help.uber.com/en/riders/article/how-to-contact-your-driver-with-talkback?nodeId=d84f1349-a061-41c5-a837-e098fdc4f135) and [match the vehicle/driver details](https://www.uberhealth.com/gb/en/resources/coordinator-guide-step-4/). Applied the owner's clarification specifically to mismatched details, not a routine delay.
- [MHA advisory on digital-arrest impersonation](https://www.pib.gov.in/PressReleaseIframePage.aspx?LID=1&PRID=2020570&RegID=3&lang=2&reg=48). Avoided the inaccurate broad claim that police never call.
- [Apple: printing](https://support.apple.com/en-ie/guide/iphone/iph92628b8f/ios), [Safari PDF saving](https://support.apple.com/guide/iphone/annotate-and-save-a-webpage-as-a-pdf-iphfd5b616b5/ios) and [WebKit user activation](https://webkit.org/blog/13862/the-user-activation-api/). The change removes deferred printing and ensures mounted content; it is not a claim to have observed the native iOS dialog.
- [Chrome Installed Related Apps API](https://developer.chrome.com/docs/capabilities/get-installed-related-apps) requires a verified app/site relationship. It cannot enumerate arbitrary third-party apps for Nook onboarding.
