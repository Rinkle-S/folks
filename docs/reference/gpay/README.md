# Google Pay reference screens

Real Google Pay (India) screens the owner shared on 24 Oct 2026. Nook's practice screens copy their order, labels and layout
(not pixel for pixel), with our own practice names, numbers and UPI IDs. Never copy names, numbers or UPI IDs from these images.

| File | Nook screen (`components/screens/GPay.js`) | Used by |
|------|------|------|
| 01-home.webp | `GpHome` (`gp-home`) | every Google Pay lesson |
| 02-scanner.png | `GpScan` (`gp-scan`, `gp-scan-g`) | qr-pay, gd-qr-gallery |
| 03-pay-anyone.png | `GpPayAnyone` (`gp-contacts`, `gp-phone`) | send-money, gd-gpay-pay-number |
| 04-chat.png | `GpChat` (`gp-chat`) | send-money, gd-gpay-pay-number |
| 05-amount-choose-account.png | `GpAmount` (`gp-amount`, with `sheet`) | all payments |
| 06-upi-pin.png | `GpPin` (`gp-pin`) | all payments, gd-gpay-balance |
| 07-success.png | `GpSuccess` (`gp-success`) | all payments |
| 08-mobile-recharge.png | `GpRechargeNumbers` (`gp-recharge`) | recharge |
| 09-money-tab.png | not built (no lesson uses it); the bottom tabs are on Home | |
| 10-my-qr-code.png | not built (no lesson uses it) | |
| 11-splash.png | not built | |
| 12-shop-qr-photo.jpg | idea for the scanner scene only (fruit stall with a QR stand); a press photo, so it is not used in the app | |

`compare-*.png` show the real screen next to Nook's, as built on 24 Oct 2026.

Steps were checked against Google's help pages: send money / scan QR (answer 7296045), mobile recharge (9043724),
pay bills (7579062), check balance (9638910), transaction history (7430307), forgotten UPI PIN (7430541).
