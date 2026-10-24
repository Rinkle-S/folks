# Practice screens: what is a best guess

Every practice screen in Nook is a recreation drawn in code (`components/kit`, `components/screens`). None has been compared with
a real phone yet. When you have real screenshots, send them app by app and the matching screen is redrawn from them.

How to send: a screenshot per step, in the same order as the lesson, on the phone you most want to support (say which phone and Android version).

## Send these first (what the demo and the most-used lessons touch)
1. **Google Pay** (`gp-*`, 13 screens): home, scan QR, amount, bank and PIN screen, done tick. This is the hero flow.
2. **Uber** (`ub-*`, 12) and **Rapido** (`rp-*`, 5): the newest screens, so the least certain: driver and PIN screen, Activity, trip details, Help, lost item, rating, payment choice, Rapido captain and end-of-ride.
3. **WhatsApp** (`wa-*`, 9): chat list, a chat, new chat, settings, profile.
4. **Phone settings** (`and-*`, 20): Settings home, Battery, Storage, Security, Bluetooth, quick settings panel, brightness. These differ by phone brand; pick one brand.

## Then
- **PhonePe** (`pp-*`, 3), **YONO SBI** (`bk-*`, 8)
- **IRCTC** (`ir-*`, 15), **Google Maps** (`mp-*`, 10)

## What to check on each screen
Button names and their exact wording and capital letters, the order of items, colours, icons, where the back arrow sits, and which
items scroll. Nook keeps each app's own wording and capitals on its practice screens.

Total recreated screens: 99 (counted from `components/kit/index.js`).
