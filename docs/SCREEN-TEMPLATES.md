# Practice screen templates

Every practice screen is a React component that draws a look-alike of the real app in code (no screenshots, no real
names, numbers, photos or logos). Build a lesson by listing these screens with a tap target. Owner screenshots are used only
while building and are never committed (they were removed from the repo on 24 Oct 2026).

How a screen is used
- Hand-built lessons (`lib/lessons*.js`): `screen: 'ub-driver'` plus props on the step; `components/Screens.js` maps the id.
- Guide lessons (`lib/guides/*.js` + `lib/kitSpec*.js`): `K(screen, target, props)` for a tap step, `I(screen, props)` for a
  look-only step. Screen ids are registered in `components/kit/index.js`.
- Tap targets are elements with `data-t="..."`. Keep target names stable; lessons rely on them.

## Google Pay (`components/screens/GPay.js`)
Shared parts: `GpTop`, `GpTabs` (Home, Money, You), `BankingName`, `BankBadge`, `UpiMark`, one practice bank (SBI ••••5234).
`gp-home` (tab), `gp-scan`, `gp-pay-anyone`, `gp-chat`, `gp-amount`, `gp-pin` (`balance`, `shown` = dots filled, no typing),
`gp-success` (Share screenshot `share`, Done `done`), `gp-money` (Check balance `bank-sbi`, See all `history`), `gp-balance`.

## WhatsApp (`components/screens/WhatsApp.js`, more in `components/kit/WhatsApp.js`)
`wa-chats` (rows `chat-rahul`, `chat-ramesh`, nav `nav-updates`), `wa-chat` (`contact-name`, `video-call`, `voice-call`),
`wa-calling` (ringing: your camera full screen, side buttons, bottom bar), `wa-video` (`flip` on your small picture, `end`;
`flipped` shows the back camera), `wa-info` (`media-row`), `wa-media` (`tab`: media/docs/links; `docs-tab`, `bill`),
`wa-pdf` (`done`), `wa-updates` (status cards, `pencil`, `posted`), `wa-text-status` (`text-area`, `palette`, `send`; `typed`, `color`).

## Uber (`components/screens/Rides.js`)
Shared parts: `UB_DRIVER` (one practice driver, car, plate, PIN), `UbNav` (floating bar, `activity`), `UbPinBar`, `MapView`.
`ub-home` (`where`), `ub-search` (`place`), `ub-rides` (`ride-go`, `choose`, `pay`; `selected`, `upi`), `ub-pickup` (`confirm`),
`ub-driver` (trip panel; `details` = swiped up "Ride details" with `share` and `cancel`; `focus`: plate, dp, pin; `shared`),
`ub-cancel` ("Cancel ride?" pop-up, `yes`), `ub-why` (reasons, `reason`), `ub-share` (`contact`), `ub-activity` (`trip`),
`ub-trip` (past ride details, `rate`, `help`), `ub-rate` (`stars`; `rated`), `ub-pay` (`cash`, `upi`).

## Adding an app
1. Look at the owner's screenshots locally (do not commit them). 2. Write the screens here with made-up data. 3. Check each
step against the app's official help. 4. Play every lesson at 390x844 and 360x640 and run `npm run check:ml`.
