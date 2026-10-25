# Nook: Learn flow redesign (v2), change spec

This spec covers three screens: **Learn home**, **App page** (WhatsApp shown as the example), and **"How do you want to learn?"**. The design mockups are on the "Nook Screens" canvas, in the row titled "Learn flow: redesign v2".

## Who this is for

- **Primary user: a senior learner, aged 50+.** Every label, heading and line of copy is written for them. They are often new to smartphones, rely on remembering where things are on screen, and are easily put off by clutter, jargon or warning colours.
- **Secondary user: a helper**, such as an adult child or relative. They open the same app to find a lesson and send it to the senior. Helper features exist, but they never take the top spot on a screen.

## Rules for every screen

- **Body text:** at least 16px. Lesson and card titles 19–20px. Page titles 27–30px.
- **Tap targets:** at least 44px high. Main buttons and cards 52–92px.
- **Text contrast:** at least 4.5:1. Secondary text uses `#4B5652` on `#F2F3EF` or white, not lighter greys.
- **Labelled icons:** every icon-only control gets a visible text label.
- **Brand colour:** green `#0F6B5C`, tint `#DDEFE9`. Don't introduce other accent colours such as blue for interactive states.
- **Nothing looks pre-selected.** When the user is choosing between options, all options look identical until one is tapped.
- **Sentence case.** Avoid ALL CAPS labels.
- **App icons:** the mockups use placeholder icons. Use the official app icons in code.
- **Font:** Noto Sans, matching the current app.
- **Bottom nav:** Learn, Stay safe, Help. Unchanged.

---

## 1. Learn home

### Changes

| # | Change | Before | After | Why |
|---|---|---|---|---|
| 1.1 | Header right side | Avatar circle ("E") and a gear icon, no labels | One pill button: gear icon plus the word **Settings**. Move profile into Settings. | Seniors don't know what unlabelled icons do. One labelled pill takes about the same space as the two icons did. |
| 1.2 | Greeting | `Good evening 🙏, Elna` | `Good evening, Elna` | Simpler. Emoji display differently across phones. |
| 1.3 | Main question | `What would you like to learn today?` (wraps onto 2 lines) | `What do you want to learn?` | Shorter, fits on one line, plainer wording. |
| 1.4 | Type field placeholder | `Type here...` | `Or type here...` | Makes clear that typing is an alternative to the microphone above it. |
| 1.5 | App section | Heading `Pick an app`, a `My apps` link, 5 tiles, and a `See more apps (1)` button | Heading `Pick an app` with the subtitle `Learn one thing at a time`. Show **all tiles in the grid** (6 = two rows of 3). Remove the `My apps` link and the `See more apps` button. Below the grid, add one line: `To add or move apps, go to Settings.` | A button that reveals a single app wastes a tap, and the empty slot in row 2 already fits it. "My apps" was unclear: does it mean apps on my phone, or apps I've learned? Adding and reordering apps stays in Settings so they can't be changed by accident from the home screen. The hint line tells people where to go. |
| 1.6 | Tile status | `✓ Learned` and `3 lessons`, both in grey | Three clearly different states:<br>• **Learned:** green check, green bold text<br>• **In progress:** `2 of 3 done` plus a thin progress bar<br>• **Not started:** `New · N lessons` | People need to see at a glance what's finished, what's half done and what's new. |
| 1.7 | Tile order | (n/a) | Keep the **order the user set in Settings**. Don't reorder tiles automatically based on progress. | Seniors find things by where they are on screen. If tiles move, they lose their place. |
| 1.8 | Topics section | A collapsed accordion, `Learn by topic / Apps, safety, rides`, that reveals rows when opened | An always-visible section placed after the app grid. Heading `Pick a topic`, subtitle `Learn a whole task, start to finish`. Show the first 3 topics as cards, then a `See all topics` button. | This age group often misses collapsed sections. Topics are kept separate from apps because a topic covers a whole task from start to finish (for example, "Order food online"), which can go beyond one app. The subtitle explains how a topic differs from an app. |
| 1.9 | Topic naming | `Rides with Uber` | `Book a ride` | A topic is a task, not a brand. It covers any ride-hailing app. |
| 1.10 | FAQ link | `Questions? Read the answers` at the bottom | **Removed.** FAQs live in the Help tab. | It was clutter on the home screen, and the Help tab already exists for this. |
| 1.11 | Helper link | `Setting this up for a parent? Send them a lesson` at the bottom | **Removed from home.** Helpers send lessons from the app page instead (see 2.4). | It was buried at the bottom and still added noise for seniors. The app page is where a helper would naturally look for a specific lesson. |

### Unchanged

- The microphone block: the large green mic button, `Tap and speak`, and `Try saying: "How do I pay at a shop?"`.
- The voice warning banner. It only appears in Brave, so it isn't shown in the mockup. Keep the current behaviour.
- The green **"Continue where you left off"** card (lesson name and `Step X of 7`). Keep the existing logic.
- The desktop-only "Open on your phone" QR card.
- Language selection: chosen once during onboarding and changeable in Settings. It doesn't appear on the home screen.

### Order from top to bottom

Header → greeting and question → mic → type field → Continue card → Pick an app (grid and Settings hint) → Pick a topic (3 cards and See all) → bottom nav.

---

## 2. App page (example: WhatsApp)

### Changes

| # | Change | Before | After | Why |
|---|---|---|---|---|
| 2.1 | Back button | A circle with only an arrow icon | A pill button with an arrow and the word **Back** | Icon-only controls are unclear to seniors. |
| 2.2 | Subtitle | `3 lessons · 2 of 3 learned` | `3 lessons · 2 of 3 done` | Uses the same progress wording as the home tiles. |
| 2.3 | `Print or save` | Full-width button at the top of the page | Secondary outline button at the **bottom** of the page | It's rarely used and was taking the most prominent spot. Lessons come first. |
| 2.4 | Share icons | A grey share circle floating outside each lesson card, with no label | **Removed from cards.** Add one button at the bottom, under the heading `Helping someone learn?`: **Send a lesson from this app**. Tapping it opens a lesson picker, then the system share sheet with a pre-written message. | Six identical icons were noise for seniors and looked disconnected from the cards. A single labelled button serves helpers and stays out of the senior's way. |
| 2.5 | Next lesson highlight | A numbered circle (`3`), styled the same as other cards | The next unfinished lesson gets a 2px green border, `Up next` in its meta line, and a green **Start** chip in place of the chevron | Shows exactly which lesson to do next. Matches the "Start" pattern on the Stay safe screen. |
| 2.6 | Request line | `Don't see what you need? Ask someone to make a lesson` | `Can't find what you need? **Ask for a new lesson**` | "Ask someone" was vague. The new line says exactly what tapping does. |

### Order from top to bottom

Back → app icon, name and progress → lesson cards → "Ask for a new lesson" card → `Helping someone learn?` (Send a lesson, Print or save) → bottom nav.

### Unchanged

- Lesson card contents: title, duration, `Learned` state with a green check circle.

---

## 3. "How do you want to learn?"

### Changes

| # | Change | Before | After | Why |
|---|---|---|---|---|
| 3.1 | Lesson context | None. The screen doesn't say which lesson this is. | A card at the top with the app icon, `Lesson · 2 min`, and the lesson title, e.g. `Make a video call on WhatsApp` | Users need to know what they're about to start, especially if they arrived from a shared link. |
| 3.2 | Option styling | The first option has a blue fill and blue border, so it looks already selected | All three cards look the same: white background, grey border, green-tint icon circle | Nothing should look chosen before the user taps. Blue also didn't match the brand. |
| 3.3 | Option 1 | `Practise it myself` / `Tap on a practice screen yourself` | **Try it myself** / `On a pretend phone. Nothing real happens.` | Plainer wording, and it reassures the user that nothing real will happen. |
| 3.4 | Option 2 | `Watch first` / `See it done once, with a voice` | **Watch first** / `See it done once, with a voice.` | Only adds the full stop. |
| 3.5 | Option 3 | `Read the steps` / `Read each step` | **Read the steps** / `Go at your own speed.` | The old subtitle just repeated the title. The new one gives a reason to choose it. |

### Unchanged

- `× Leave` button at the top left. It already has a label.
- The order of the options.

---

## Out of scope for this pass

- The "Let's pretend" practice intro screen. Its copy will be tightened in the next pass.
- The send-a-lesson picker and share message, and the screen a senior lands on when they open a shared link. These still need to be designed.
- Settings screen changes beyond moving profile into it (1.1).

## Acceptance checks

- No icon-only controls remain on these three screens.
- The home app grid shows every selected app with no "see more" button, in the order the user set in Settings.
- Topics are visible without tapping anything to expand them.
- No option on the learn-mode screen looks selected before it is tapped.
- No blue accent appears on any of these screens.
- All text meets 4.5:1 contrast, and all tap targets are at least 44px.

## Mockup files

Static HTML mockups of the target design, one per screen, are in `mockups/`. Open them in a browser. They are a visual reference only, so build the real screens with the existing components and styles in this repo.

- `mockups/1-learn-home.html`: Learn home (full scroll height)
- `mockups/2-app-page-whatsapp.html`: App page
- `mockups/3-learn-mode.html`: "How do you want to learn?"
