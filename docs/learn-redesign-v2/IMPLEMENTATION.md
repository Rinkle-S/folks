# Learn redesign v2: implementation and acceptance

Implemented against the full SPEC.md and the three HTML mockups, opened and rendered in Chromium. Reused AppBar, AppIcon, ThemeList, PrintBar, Settings, the lesson catalogue, progress storage and the existing send flow.

## Acceptance checks

| Check | Result | Evidence |
|---|---|---|
| No icon-only controls on the three screens | Pass | Visible Settings, Back, Search and Leave labels. The unchanged mic is associated with its existing visible caption. Decorative icons sit beside text. |
| Every app visible, no reveal button, stable Settings order | Pass | All six available apps are shown; saved order comes first. Reordering persists through reload and completion changes do not reorder tiles. |
| Topics visible without expanding | Pass | The existing topics are always visible below the app grid. |
| No learning option pre-selected | Pass | All three options have matching white backgrounds, grey borders and green-tint icon circles. |
| No blue interface accent | Pass | Interface, focus and selection colours use green. Official app-logo colours are retained. |
| Text contrast at least 4.5:1 and targets at least 44px | Pass | Computed-style checks of visible interface text, placeholders and controls. Body/meta copy is at least 16px, titles 19–20px and page headings 27–30px. Existing bottom-navigation typography is preserved as required. |

## Interpretations and deferred items

- **Sharing (2.4 versus Out of scope):** the owner confirmed reusing the existing sharing flow and message for this pass. The app-page helper button opens `/send`, scoped to that app's available lessons and current language. Its existing picker UI, pre-written message, WhatsApp action and copy action remain. A new picker design and native system share sheet are **deferred**. No change to shared-link landing screens.
- **Topics:** the repo currently contains two topics, not three. Both appear, in their existing order, followed by See all topics. No example-only food topic or other content was invented.
- **App catalogue:** show the six real available apps, including YONO SBI and Phone basics. Do not invent the mockup's YouTube example or restore hidden apps. Saved selections retain their order and other available apps follow.
- **Typography:** the written minimums take precedence over smaller text in the HTML mockups. Long titles may wrap or make cards taller. At 320px, the app grid uses two columns and the next-lesson Start chip sits below its text rather than squeezing the title.
- **Main question:** allow wrapping on smaller phones rather than shrinking the required 27px heading to force one line.
- **Labels:** the search submit button has a visible Search label, following the labelled-control rule rather than copying the mockup's icon-only arrow.
- **Unchanged surfaces:** mic behavior/copy, Brave warning behavior, Continue logic, desktop QR, language selection, bottom nav, practice scene/art/copy, lesson steps and Stay safe screens are preserved. Settings only gains the profile link. The new request-card wording links directly to the existing Help request form.
- The interrupted graphics-only work is saved separately in Git stash `Deferred scene graphics; excluded from Learn redesign v2`; it is not part of this redesign.

## Verification

- Production build, Malayalam completeness and search/event/offline regression checks.
- `scripts/test-learn-v2.mjs`: English, Hindi and Malayalam at 320px, 390px and 1366px; contrast, font/target sizes, labels, overflow, app progress/order, Settings/profile access, request and app-scoped sharing, print, and all three learning modes.
- All 15 retained lessons completed in Practice, Read and Watch controls at 320px in English, including wrong quiz answers, plus supporting navigation pages.
- Reference and implementation screenshots reviewed under `../layout-checks/learn-v2/` outside the repository. Audio and external API writes mocked; no audio played or paid speech services enabled.
