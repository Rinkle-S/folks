// Quick guides: short step-by-step scripts for the real app (no practice screens yet; voice is added later, after review).
// g(id, app, appName, [title en, hi, ml], keywords, [[step en, hi, ml], ...], [caution en, hi, ml]?)
export const g = (id, app, appName, title, kw, steps, caution) => ({
  id,
  app,
  appName,
  title: { en: title[0], hi: title[1], ml: title[2] },
  kw,
  steps: steps.map((s) => ({ en: s[0], hi: s[1], ml: s[2] })),
  caution: caution ? { en: caution[0], hi: caution[1], ml: caution[2] } : null,
});
