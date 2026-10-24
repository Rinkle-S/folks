import { HIDDEN_APPS } from './hidden';
// Apps a parent can say they have. "lessons: true" means Nook has practice lessons for it today.
const ALL = [
  { id: 'gpay', name: 'Google Pay', lessons: true },
  { id: 'phonepe', name: 'PhonePe' },
  { id: 'whatsapp', name: 'WhatsApp', lessons: true },
  { id: 'uber', name: 'Uber', lessons: true },
  { id: 'rapido', name: 'Rapido', lessons: true },
  { id: 'zomato', name: 'Zomato' },
  { id: 'yono', name: 'YONO SBI', lessons: true },
  { id: 'irctc', name: 'IRCTC', lessons: true },
  { id: 'maps', name: 'Google Maps', lessons: true },
  { id: 'playstore', name: 'Play Store', lessons: true },
];
export const ALL_APPS = ALL.filter((a) => !HIDDEN_APPS.has(a.id));
