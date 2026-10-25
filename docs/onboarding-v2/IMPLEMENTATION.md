# Onboarding v2 and lesson end

Implemented after the owner's requested audit of both specs and all eight new mockups. Source spec copied unchanged from the supplied ZIP. The original ZIP and SPEC-new.md remain untouched in the workspace.

## Changes

- Replaced four-screen welcome/skills setup with Language, a safe pretend Pay tap and success explanation (both step 2), Name, Apps and First goal. Progress is a labelled five-segment bar. Name has a persistent field label and live preview. Skip clears an entered name.
- Apps use two columns, real icons, clear selection and mutually exclusive None of these. An empty selection is preserved as an empty selection, rather than treated as never chosen. Apps can still be changed in Settings.
- First goal has one selected choice, QR by default, with keyboard radio navigation. Start opens the chosen mode picker even with a saved default; Look around opens Home. Both preserve the chosen goal as a Continue card. Ordinary lesson scene/default/resume behavior is retained.
- Owner approved replacing the hidden Send a photo goal with Find an old file or photo and opening Stay safe directly for the scam goal. Completing a Stay safe reading lesson clears that pending goal.
- One shared lesson-end template: personalised success, real app icon, mode credit, three visible numbered tips, amber safety rows, one always-visible optional rating question, and measured pinned Next/repeat controls above the unchanged bottom navigation. Long translated text wraps and the page scrolls. No accordions, end Send row, real-app prompt or duplicate feedback question.
- Next actions distinguish Watch, Try, Read and last app lesson. Next follows the same personalised lesson order as the app page. Lesson metadata includes three structured tips and a default nextLessonId. Five existing guide lessons needed three concise reminders in place of their two repetitive takeaways.
- End Print prints only the title and three tips. Existing app-page Print still prints the full app handout. Existing full-step printing in Read remains available; its optional relocation was not needed for this pass.
- Mode picker gains a quiet helper Send link. It opens native sharing in the original tap, falls back to copying, and treats cancelling the share sheet as cancellation. Existing app-page sharing/picker/message remain as previously approved.
- Every use of the shared Send icon now draws connected dots, including simulated screens, following the owner's literal icon rule. Positions and tap targets in those screens are retained.
- New events are accepted by the existing endpoint and use the durable outbox. Completion and feedback also retain the legacy events so the stats dashboard continues to work. No database schema change is needed.
- New/changed copy is supplied in EN/HI/ML. New body copy is at least 18px, page headings 28–32px, action targets at least 56px, main actions 62px and rating buttons at least 58px. The explicitly specified progress label stays 16px. Existing bottom-nav typography is preserved.

## Skipped because already complete

Learn v2 Home header/greeting/question/microphone/search, app grid/order/progress, Settings hint, visible topics, Home removals, app Back/progress/Up next/request cards, app helper placement, real icons, neutral mode choices/copy, and navigation. Only missing goal-resume logic, mode-picker Send/minimum typography and send event instrumentation touch these surfaces. Scene artwork, normal scene scripts, catalogue, helper-led setup and Sarvam configuration were not changed.

The old Learn spec's proposed new app picker/native share flow stays deferred under the owner's earlier decision to reuse the existing flow; the new spec expressly says to keep that app-page flow.

## Acceptance checks

The production build and Malayalam check pass. Tests mock speech, native print/share and external API writes; they never make real payments, calls, messages or paid speech requests. Native phone print/share dialogs still require a real-device check.

| Spec acceptance | Result | Verification |
| --- | --- | --- |
| Language first; later screens in chosen language | Pass | Three-language onboarding branches at 320/390/1366px, including loaded fonts |
| Pay reaches success; no real transaction or stored payment | Pass | Inert local UI, automatic voice mocked once, replay and event checks |
| Chosen lesson mode picker; Look around to Home | Pass | All five approved goals, saved-default override and exit/Continue checks |
| Three full tips, no accordions, pinned correct actions | Pass | Watch/Try/Read and last-app lesson; phone, landscape, laptop and enlarged text |
| One feedback question; every tap saved | Pass | Selected state, repeat taps, optional continuation and event/outbox assertions |
| Minimum 18px body and 56px targets | Pass | Computed DOM and 4.5:1 contrast checks on affected screens; explicit progress/nav exceptions above |
| Malayalam check and build | Pass | Production checks |

Additional regressions pass: all 15 tutorials in Practice/Read/Watch controls x EN/HI/ML at 320px (including wrong answers), all 15 in three modes on laptop, all 45 automatic Watch runs, QR scenes/defaults/resume/PIN/Help/hand checks, all nine Learn v2 viewport/language cases, and search/event-idempotency/offline queue checks. Send-money was rechecked in all languages after changing its Send icon and corresponding hint.

All 45 three-tip PDFs (15 lessons x 3 languages) were generated and independently checked as exactly one page. Malayalam print output was rendered and visually reviewed. Test screenshots and PDFs are outside the repo in `../layout-checks/onboarding-v2-final/`.

## Interpretations

- Stay safe is an explicit exception to the mode-picker destination, approved by the owner.
- The new tutorial goal starts at the mode picker as specified. Normal lesson entry keeps its scene first. Repeating a lesson retains the existing narrated scene before the selected mode.
- At narrow widths a Remember/Print heading row may wrap rather than shrinking either label. All three tips remain visible in the document; very short landscape windows use page scrolling around the pinned controls.
- At 320px, language cards place the English language name below the native name to retain the required large type and avoid Malayalam overflow.
- A saved default mode does not override the first-goal mode picker, because onboarding explicitly asks the learner to choose there.
