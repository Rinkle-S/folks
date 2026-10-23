import { PHONE_GUIDES } from './phone';
import { WHATSAPP_GUIDES } from './whatsapp';
import { MONEY_GUIDES } from './money';
import { APP_GUIDES } from './apps';

export const GUIDE_LIST = [...PHONE_GUIDES, ...WHATSAPP_GUIDES, ...MONEY_GUIDES, ...APP_GUIDES];
export const GUIDES = Object.fromEntries(GUIDE_LIST.map((x) => [x.id, x]));
