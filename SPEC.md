# Nook — One-page spec (v1, 22 Oct 2026)

**Name:** Nook
- **Tagline now:** "Phone help for your folks." Later: "Everything for your folks."
- **Languages at launch:** Hindi and English. Users across India.

## Problem (idea test)
**Parents aged 55+** struggle to **do everyday phone tasks on their own** (pay by QR, find an old WhatsApp file, send money) **because** they're afraid of pressing the wrong thing, and of losing money in payment apps especially. **Today** they call their son or daughter, who explains again (8 people in the HelloPM poll) or does it for them. **Nook** lets them **practise the task safely with fake money, with voice guidance in their language**, then do it for real alone.

## User
- **Primary:** the parent (55+, Android, Hindi or English, comfortable with WhatsApp calls, nervous about payment apps).
- **Channel:** the adult child, who sends the lesson link on WhatsApp. Nothing for the child to sign up for in v1.

## One journey (parent)
1. **Home:** big mic, "बोलिए, क्या सीखना है?", plus lesson tiles.
2. **Confirm:** "Do you want to learn: pay at a shop by scanning a QR code?"
3. **Practice player:**
   - a lookalike app screen with one tap per step
   - voice and on-screen text in Hindi or English
   - a permanent "PRACTICE — no real money" banner
   - a gentle hint and highlight after a wrong tap
4. **Done:**
   - "Now try it on your real app"
   - "Tell my son/daughter" (opens WhatsApp with a message)
5. **No match:** "Ask my child to add this lesson". The request is logged as demand data.

## Aha moment
Within 2 minutes, the parent finishes a payment they were scared of, and taps "Now try it on your real app".

## Lessons in v1
- **L1:** Pay at a shop by scanning a QR code. Covers:
  - the scan icon
  - checking the shop's name
  - typing the amount
  - practice PIN 1234
  - the scam check "PIN to receive money? No."
- **L2:** Find a photo or PDF someone sent earlier on WhatsApp (contact name → Media, links and docs → Docs).

## Real data (Supabase `events` table)
Recorded events:
- lesson start
- step done
- wrong tap
- hint
- lesson done
- voice search
- no-match request
- "try real app" tap
- share tap

`/stats` shows completions, the steps where people get stuck, and requests.

## Success (Friday test, 5 parents)
- 3 of 5 finish the lesson without calling for help.
- 2 of 5 do the real task alone afterwards.

## Out of scope (v1)
- login
- child dashboard
- screen overlay or real-screen guidance
- scam-message checker
- AI-generated steps
- phone-model-specific screens
- the child's recorded voice
- government apps
- native app
- payments

## Why not ChatGPT / Gemini Live?
- They *help you do it once*. Nook *teaches you to do it yourself*, safely with fake money, with scam habits built in.
- Payment apps block screen sharing, and Google Pay tells users to close screen-sharing apps before paying.
- It works on budget phones, with the child kept in the loop.

## Risks
- **Parents don't open the link:** mitigated by the child sending it at the moment the parent asks for help.
- **Voice not supported in the browser:** fall back to tapping a tile.
- **Legal:** stylised screens, no brand logos, clearly labelled as practice.
