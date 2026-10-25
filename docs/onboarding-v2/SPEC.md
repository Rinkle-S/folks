# Nook: Lesson end screen, Onboarding v2, and Send/Print placement, change spec

Static HTML mockups for every screen are in `mockups/`. Open them in a browser. They are a visual reference only, so build the real screens with the existing components and styles in this repo.

| Mockup | Screen |
|---|---|
| `0-lesson-end.html` | Lesson end (one template for every lesson) |
| `1-language.html` | Onboarding step 1: language |
| `2-try-one-thing.html` | Onboarding step 2a: try one thing |
| `3-you-did-it.html` | Onboarding step 2b: you did it, and what Nook does |
| `4-name.html` | Onboarding step 3: name |
| `5-apps.html` | Onboarding step 4: your apps |
| `6-first-goal.html` | Onboarding step 5: first goal |
| `7-learn-mode-send.html` | "How do you want to learn?" with the new Send link (section 3) |

## Before you change anything: audit what already exists

Some of this may already be built (an earlier draft of the lesson end screen and parts of the Learn flow v2 spec in `docs/learn-redesign-v2/` have been worked on). Before writing code:

1. Go through every numbered item and block in this spec, and in `docs/learn-redesign-v2/SPEC.md`.
2. Mark each one **Done**, **Partly done** or **Not done** by checking the current code and the running app.
3. Reply with that table first. Only change what is Partly done or Not done. Leave anything already Done as it is.

## Who this is for

The users are aged 55+, often new to smartphones and afraid of "breaking something" or losing money. The main barrier is confidence, not knowing that features exist. So the design gives them a small success first and explains afterwards, and every screen has one clear main action.

## Rules for every screen (from CLAUDE.md)

- **Body text:** at least 18px. Headings 28–32px.
- **Tap targets:** at least 56px high. Main buttons are 62px.
- **Colours:** calm only, with no blinking or flashing. The highlight ring around the practice Pay button is static, not animated.
- **Wording:** plain words, no em dashes in app text, "Ask someone" wording.
- **Languages:** every new or changed string needs English, Hindi and Malayalam versions, and `npm run check:ml` must pass.
- **App icons:** the mockups use placeholder icons. Use the real app icons that are already in the repo.

---

## 1. Lesson end screen (template for all lessons)

One screen, filled in from the lesson's data. The mockup shows the "Find the way with Google Maps" lesson, finished in Watch mode.

**The rules for this screen:** nothing is collapsed, and there is one main button. The 3 tips must always show in full, never cut off or truncated. If the content is taller than the screen (long tips, Hindi or Malayalam text, large system font), the page scrolls, and the main button and its text button stay pinned at the bottom, just above the bottom nav.

### What the current build does, and why it changes

The current build (made from an earlier draft) has these problems:

- **Collapsed sections.** "Remember" and "How was this lesson?" are accordions, and both are closed by default. People in this age group rarely open collapsed sections, so they miss the tips and the feedback.
- **The same question twice.** "How was this lesson?" and "How was it?" both appear.
- **Too many choices.** After the main button there are 3 more icon buttons (Print, Again, Send), and the dark Send button looks selected.
- **Green ticks on the tips** make them look like completed tasks, when they are things to remember.
- **The main button doesn't fit every mode.** "Now practise it yourself" is shown even when the person has just practised.

### The new screen: 4 blocks, top to bottom

| # | Block | Content | Why |
|---|---|---|---|
| 1 | **Done** | A green success circle (72px), `Well done, <name>!` (or `Well done!` if they skipped the name step), then a white card (like the current build's "You completed this lesson" card) with the app or topic icon on the left, a small line saying what they did, and the lesson title in bold. The small line depends on the mode: Watch → `You watched this lesson`, Try → `You did this lesson yourself`, Read → `You read this lesson`. | One clear moment of success. Naming what they did (watched, did it themselves, read) gives credit for the effort and sets up the next step. |
| 2 | **Remember** | Heading `Remember`, with a small text button on the right of the same row: printer icon + `Print these steps`. Then the lesson's 3 tips in one white card, numbered 1, 2, 3. **Always open.** A tip marked `safety: true` in lesson data shows as an amber row with a shield icon and the label `Stay safe`. | Numbers say "keep these in mind". It's always visible because it's the main takeaway of the lesson. |
| 3 | **How was it?** | One heading, `How was it?`, then 3 equal buttons, at least 58px tall, each with a face icon and a label: `Easy` / `Okay` / `Hard`. One tap saves the rating, the chosen button shows as selected, and the person can still continue without answering. | The question is asked once and is always visible, so you get real feedback. Answering is never required. |
| 4 | **Next** | One main button (depends on mode, see below). Under it, one text button: `Watch it again` / `Try it again` / `Read it again` (matching the mode). | One clear action, plus one easy way to repeat the lesson. |

### Removed from this screen

| Removed | Why | Where it lives now |
|---|---|---|
| The Print / Again / Send button row | Too many choices at the end of a lesson. | `Print these steps` becomes a small link next to the `Remember` heading (it prints those tips). `Again` becomes the text button under the main button. Send moves to the lesson's mode picker and the app page (see section 3). |
| Generic `You completed this lesson` label | It didn't say what they did. | The card stays, but its label now names the mode (block 1). |
| "No real money moved" line and the "Next time at a shop" card from the earlier draft | They added length. | A lesson that needs that message (for example, QR payment) puts it in its tips. For example, tip 3 marked `safety: true`: `Your PIN is only for paying. You never need it to receive money.` |

### Main button by mode

| Mode just finished | Main button | Text button under it |
|---|---|---|
| Watch first | `Now try it yourself` (opens Try mode for this lesson) | `Watch it again` |
| Try it myself | `Next lesson: <next lesson title>` | `Try it again` |
| Read the steps | `Try it on the practice phone` (opens Try mode) | `Read it again` |
| Last lesson of the app, in Try mode | `Back to <app> lessons` | `Try it again` |

### Lesson data needed per lesson

- `title`
- `icon` (app or topic)
- `tips[3]`, each with an optional `safety: true`
- `nextLessonId`

### Events to record

- `lesson_completed` with `{ lessonId, mode }`
- `lesson_feedback` with `{ lessonId, rating: easy|okay|hard }`
- `lesson_end_action` with `{ action: next|again|print }`

---

## 2. Onboarding

### Flow

| Before (4 screens) | After (5 steps) |
|---|---|
| 1. Welcome + feature list + language picker | 1. **Language** |
| 2. Name | 2. **Try one thing**, then **You did it + how Nook works** |
| 3. Which apps are on your phone | 3. **Name** |
| 4. Tick what you already do | 4. **Your apps** |
| | 5. **First goal** → opens that lesson |

**Why:** the old flow explained Nook first (a feature list) and asked questions after. The new flow puts a real tap on the practice phone in the first 30 seconds, so the person learns "this is safe" by doing it. The promises then come right after, as proof. The flow ends inside a real lesson, not on the home screen.

### Shared change: progress indicator

- **Before:** 4 small dots.
- **After:** the text `Step X of 5` (16px, bold) above a bar of 5 segments, each 8px tall. Steps 2a and 2b both show `Step 2 of 5`.
- **Why:** the dots were too small to see or understand.

### Step 1: Language

| # | Change | Before | After | Why |
|---|---|---|---|---|
| O1.1 | Position | The language picker sat at the bottom of the welcome screen, under English paragraphs | Language is the first and only question on the first screen | A Malayalam-only reader shouldn't have to get through English text to find their language. |
| O1.2 | Heading | One line mixing three scripts | `Choose your language` with `अपनी भाषा चुनिए` and `ഭാഷ തിരഞ്ഞെടുക്കൂ` on their own lines below it | Each language is easy to read on its own line. |
| O1.3 | Options | Three side-by-side buttons | Three full-width cards, 72px tall. The native name is large on the left, with the English name in smaller text on the right. Selected: green border, tint, and a tick on the right. English is selected by default. | Bigger targets and clearer selection. |
| O1.4 | Welcome content | Logo, tagline, subtitle, 3 feature rows | Logo plus one line: `Learn phone tasks, without the fear.` The feature rows move to step 2b. | Keeps the first screen to one decision. |

Once a language is chosen, every following screen shows in that language.

### Step 2a: Try one thing (new screen)

- **Heading:** `Let's try one thing together`
- **Subtitle:** `This is a practice phone. Nothing real happens here.`
- **Practice phone mock:** a dark phone frame with an orange `Practice phone` strip at the top. Inside: a shop icon, `Paying to`, `Sharma General Store`, `₹10`, and a large green `Pay ₹10` button with a static light-green ring and a pointing-hand icon over it.
- **Voice line:** a green-tint bar reading `Tap the green Pay button.` with a `Listen` button. The voice plays this line automatically once.
- **Tapping Pay** goes to step 2b. Nothing is charged and nothing is stored.
- **`Skip`** is an outlined button at the bottom and goes to step 3.
- **Event:** `onboarding_try_tapped`.
- **Why:** the person's first action in Nook is a success on a safe screen. Doing comes before explaining.

### Step 2b: You did it (new screen)

- A success icon, `You did it!`, then `No money moved. That was practice.`
- A heading `That's how Nook works` with 3 rows, which are the old welcome feature rows reworded:
  - `Practise on a pretend phone. Nothing real happens.`
  - `A voice guides you one step at a time.`
  - `Spot scams before they reach your money.`
- A `Next` button.
- **Why:** the promises read as proof right after the person has experienced them.

### Step 3: Name

| # | Change | Before | After | Why |
|---|---|---|---|---|
| O3.1 | Subtitle | `Just your first name. It stays on this phone.` | `So we can cheer you on. Your name stays on this phone.` | Gives a friendly reason for asking. |
| O3.2 | Field label | Placeholder text only | A visible label, `Your first name`, above a 62px field | The placeholder disappears once they start typing. A visible label stays. |
| O3.3 | Preview (new) | Empty space | `You'll see it like this:` followed by a dashed card showing `Well done, <name>!` / `after every lesson you finish`, updating as they type | Shows the benefit straight away and fills the empty space. |

`Next` and `Skip` stay where they are. Skipping falls back to `Well done!` without a name.

### Step 4: Your apps

| # | Change | Before | After | Why |
|---|---|---|---|---|
| O4.1 | Subtitle | `Tap the apps you have. Lessons for your apps will show first.` | `Tap the ones you have. You can change this later in Settings.` | Reassures them that this choice isn't permanent. |
| O4.2 | Grid | 3 columns of small tiles | 2 columns of tiles at least 112px tall | Bigger targets and labels for this age group. |
| O4.3 | Selected state | Unclear | Green 2px border, green tint, and a tick badge in the top-right corner | Selection has to be obvious at a glance. |
| O4.4 | `None of these` (new) | None | A dashed tile. Selecting it clears the other apps, and selecting any app clears it. | Nobody gets stuck if they don't have any of these apps. |
| O4.5 | Skip | Present | Removed. `None of these` replaces it. | One clear path forward. |

### Step 5: First goal (replaces "Tick what you already do")

| # | Change | Before | After | Why |
|---|---|---|---|---|
| O5.1 | Question | `Tick what you already do on your phone`, with multiple checkboxes | `What would you like to learn first?` / `Pick one. You can learn the rest later.` with one choice allowed | "What do you already do" feels like a test, even with "no right or wrong answer". Asking what they want to learn feels like help, and it gives a clear first lesson. |
| O5.2 | Options | 5 checkbox rows | 5 rows, 72px tall, each with a topic icon and a round selector on the right. `Pay at a shop with a QR code` is selected by default (the hero flow). | Single choice, with the hero lesson first. |
| O5.3 | Option text | Task phrasing | `Pay at a shop with a QR code` · `Video call family` · `Send a photo to someone` · `Spot a scam message or call` · `Install a new app` | Phrased as goals in the person's own words. Each maps to an existing lesson, so no new lessons are needed. |
| O5.4 | Main button | `Start learning` → home screen | `Start my first lesson` → the "How do you want to learn?" screen for the chosen lesson | Onboarding ends inside a lesson, not on a busy home screen. |
| O5.5 | Secondary button | `Skip` | `I'll look around first` → home screen | Says what happens when tapped. |

The chosen goal also becomes the home screen's "Continue where you left off" card if they don't finish the lesson.

**Event:** `onboarding_goal` with `{ lessonId }`.

---

---

## 3. Send and Print: who uses them, and where they appear

### Who uses them

| Action | Main user | When they need it |
|---|---|---|
| **Send a lesson (link)** | The **helper**: an adult child or relative sending a parent the one lesson they asked about | When a **specific lesson** is on screen, before anyone has learned it |
| **Print** | The **senior**, who wants the steps on paper next to the phone or in their bag | **After learning**, once they know which steps they want to keep |

### Where each one appears

| Screen | Send | Print | Why |
|---|---|---|---|
| App page (e.g. Google Pay) | Keep `Send a lesson from this app` under `Helping someone learn?` (already built). Its icon must be the share icon (three connected dots), not a paper plane. | Keep `Print or save` (already built, prints all of the app's lessons) | A helper browsing an app picks a lesson to send, or prints all of them for a parent. No change. |
| **"How do you want to learn?"** (one lesson) | **New:** at the bottom, under a thin divider: `Helping someone learn this?` followed by a text button with the **share icon (three connected dots)**, `Send this lesson to them`. This opens the share sheet with this lesson's link. | No | The specific lesson is already chosen, so no picker is needed. It sits below the 3 options in quiet styling, so a senior's eye goes to the options first. Print doesn't belong here because the person hasn't learned the steps yet. |
| **Lesson end** | No | **New:** `Print these steps` next to the `Remember` heading. It prints the lesson title and the 3 tips on one page in large text. | The senior has just learned it, and these 3 tips are exactly what they would want on paper. |
| Read the steps mode | No | Optional: a `Print these steps` link at the end of the steps | It's the most natural place to print a full step list. Nice to have, not required for this pass. |

### Mockup

`mockups/7-learn-mode-send.html` shows "How do you want to learn?" with the new Send link at the bottom.

### Event

`lesson_send` with `{ lessonId, from: mode_picker|app_page }`


### Icon rule

Every Send or share action in the app uses the same **share icon (three connected dots)**. Never use a paper plane for Send.

## Out of scope

- A helper-led setup, where a family member sets up the app for the parent.
- Any new lessons or apps.
- Audio and Sarvam changes. The voice line in step 2a uses the existing voice setup.

## Acceptance checks

- Language is the first screen, and every later onboarding screen shows in the chosen language.
- In step 2a, tapping Pay reaches step 2b, and nothing real is charged or stored.
- Onboarding ends in the chosen lesson's mode picker, and the "look around" button ends on the home screen.
- The lesson end screen shows all 3 tips in full (nothing cut off), has no collapsed sections, keeps the main button pinned above the bottom nav, and shows the correct main button and text button for each mode (Watch, Try, Read, and last lesson of an app).
- `How was it?` appears once, and every tap is recorded as an event.
- No tap target is under 56px, and body text is at least 18px.
- `npm run check:ml` passes and the build succeeds.
