// Shorthand for lesson steps drawn with the screen kit (components/kit).
// K(kit, target, props, overlay) = tap step; I(kit, props, overlay) = look-and-read step.
export const K = (kit, target, p = {}, ov) => ({ tap: true, kit, target, p, ov });
export const I = (kit, p = {}, ov) => ({ tap: false, kit, p, ov });
// Overlay helpers. Items are [t, label, icon?]
export const menu = (items, at) => ({ menu: { at, items: items.map(([t, label, icon]) => ({ t, label, icon })) } });
export const sheet = (title, items, extra = {}) => ({ sheet: { title, items: items.map(([t, label, icon, sub, radio]) => ({ t, label, icon, sub, radio })), ...extra } });
export const grid = (title, items) => ({ sheet: { title, grid: items.map(([t, label, icon, color]) => ({ t, label, icon, color })) } });
export const dialog = (title, body, actions, extra = {}) => ({ dialog: { title, body, actions: actions.map(([t, label, danger]) => ({ t, label, danger })), ...extra } });
