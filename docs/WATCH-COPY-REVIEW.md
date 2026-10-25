# Watch first: wording review

## Evaluation

Reviewed all 129 numbered steps across the 15 retained tutorials, their quiz options/explanations, pointer/keypad prompts, scenes, simulated app labels, playback controls and completion copy. 109 step scripts contained action words because Watch reused the Practice script. Eleven quizzes also reused feedback intended for someone who had answered.

The right distinction is between **describing the demonstration** and **asking the learner to operate the practice phone**. A global replacement of tap/press would also damage genuine app labels and quoted scam messages.

| Surface | Decision |
| --- | --- |
| Step instructions, both visible and spoken | Separate descriptive Watch scripts, EN/HI/ML. Example: Press 5, then 0 becomes The demo enters the requested 50 rupees: 5, then 0. |
| Input/PIN prompts | Explain automatic use of made-up digits. Watch counters describe progress rather than asking for key presses. Real-PIN warning retained. |
| Quiz questions | Explain the situation and safe answer as a demonstration; the viewer is not asked to select a disabled option. |
| Quiz explanations | Neutral reasons replace Right/Well done feedback in Watch. Practice answers and feedback are unchanged. |
| Safety preface | Spoken before the Watch explanation; separate speech segments let sentence highlighting follow the visible body correctly. |
| Completion voice | Says the learner watched the demonstration, rather than performed the task. Existing mode-aware end-screen labels/actions are retained. |
| Real app labels, e.g. Pay, Start, Enter PIN | Retained: these are what the viewer is learning to recognise. |
| Quoted pretend fraud requests | Retained: their misleading wording is the subject of the safety lesson. |
| General safety rules and Remember tips | Retained: they are advice for a future real task, not a demand to act during playback. |
| Scenes and mode chooser | Retained: scene context is shared before choosing a mode; Ready and the mode options are genuine learner actions. |
| Pause/Play/Previous/Next/Let me try | Retained: these controls really are operated by the viewer. |

All 15 tutorials have reviewed Watch scripts: QR (12 steps), send money (15), recharge (9), WhatsApp files (8), status (7), video call (7), Uber booking (11), YONO balance (6), Maps (8), app installation (9), icons (12), Google Pay balance (7), ride cancellation (6), driver checks (6), and ride payment/rating (6).

## Implementation boundary

`lib/watchCopy.js` adds only watchSay/watchWhy/watchClosing fields after the normal lesson scripts are composed. Player chooses these fields only in Watch. The original say, hint, options, REAL/read cards, inputs, targets, stored progress and timings remain intact. The five-second ringing script is deliberately short. Watch's keypad counters and the narrow Watch status header wrap without changing Practice styles.

## Verification

- Data checks cover all 129 scripts x three languages, all 11 neutral quiz reasons and registration in the known-speech catalogue.
- Applying the Watch metadata leaves the complete non-Watch lesson data unchanged (deep comparison).
- Every Watch screen checked at 320px and laptop width in EN/HI/ML. Watch-to-Practice restores the original instruction. Narrow keypad counters are checked against their frame bounds.
- All 45 automatic Watch runs complete; all 15 lessons x three languages complete in Practice, Read and Watch controls, including wrong Practice answers.
- Mocked narration verifies Watch text, sentence highlighting, safety-preface order, neutral quiz explanations and watched completion voice.
- Production build and Malayalam completeness check pass. Audio and external API writes are mocked throughout; no actual speech playback or Sarvam changes.

Screenshots are outside the repo in `../layout-checks/watch-copy/`.
