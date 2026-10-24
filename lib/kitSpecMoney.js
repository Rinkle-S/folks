import { K, I, menu, dialog } from './kitSpec';

const SHOP = { name: 'Gupta Medical', initial: 'G', color: '#16a34a', bank: 'Banking name: GUPTA MEDICAL STORE' };
const RAMESH = { name: 'Ramesh Kumar', initial: 'R', color: '#ea580c', bank: 'Banking name: RAMESH KUMAR' };
const pin = (payee, amount) => I('gp-pin', { payee, amount, full: false, typed: '12' });
const sbi = (k, p) => K('bk-home', `tile-${k}`, { bank: 'sbi', tap: k, ...p });

export const KIT_MONEY = {
  'gpay-balance': [
    K('gp-home', 'balance', { links: 'balance' }),
    K('gp-banks', 'bank-sbi', { tap: 'sbi' }),
    [I('gp-pin', { payee: { name: 'Check balance' }, amount: '0', typed: '12' }), I('gp-balance')],
  ],
  'gpay-history': [
    I('gp-home'),
    K('gp-home', 'history', { links: 'history' }),
    [K('gp-history', 'txn-sharma', { tap: 'sharma' }), I('gp-txn')],
  ],
  'gpay-reset-pin': [
    K('gp-home', 'me', { me: true }),
    [K('gp-profile', 'bank', { tap: 'bank' }), K('gp-banks', 'bank-sbi', { title: 'Bank accounts', tap: 'sbi' })],
    [K('gp-bank', 'more', { more: true }), K('gp-bank', 'forgot', {}, menu([['edit', 'Make primary'], ['change', 'Change UPI PIN'], ['forgot', 'Forgot UPI PIN'], ['remove', 'Remove account']]))],
    I('gp-card'),
    [I('gp-otp'), I('gp-otp', { title: 'Set a new 4-digit UPI PIN. Type it twice.' })],
  ],
  'gpay-pay-number': [
    K('gp-home', 'pay-phone'),
    I('gp-phone'),
    K('gp-phone', 'person', { found: true, tap: true }),
    [I('gp-amount', { payee: RAMESH, amount: '500' }), K('gp-amount', 'next', { payee: RAMESH, amount: '500' }), pin(RAMESH, '500')],
  ],
  'upi-failed': [
    I('gp-txn', { failed: true }),
    [K('gp-history', 'txn-failed', { tap: 'failed' }), K('gp-txn', 'help', { failed: true, help: true })],
    I('gp-txn', { failed: true }),
    I('done', { warn: true, title: 'Call your bank', sub: 'Use the number on your bank’s website or the back of your card. Never search for a number online.' }),
  ],
  'upi-report-fraud': [
    K('and-contacts', 'call', { tab: 'keypad', number: '1930' }),
    I('and-call', { name: '1930', sub: 'Cyber Crime Helpline' }),
    I('and-web', { title: 'Report a financial fraud', lines: ['Lost money through UPI, card or net banking? Report it here as fast as you can.', 'Keep the transaction ID, date, amount and the number you paid.'], button: ['report', 'Report Financial Fraud'] }),
    I('and-call', { name: 'SBI Helpline', sub: '1800 1234 (from the back of your card)', time: '00:42' }),
  ],
  'qr-gallery': [
    K('gp-home', 'scan'),
    K('gp-scan-g', 'gallery', { gallery: true }),
    [K('photo-pick', 'qr'), I('gp-amount', { payee: { name: 'SUNRISE GENERAL STORE', initial: 'S', color: '#5f6368', bank: 'Banking name: SUNRISE GENERAL STORE' }, amount: '' })],
  ],
  'phonepe-send': [
    [K('and-home', 'open-phonepe', { open: 'phonepe' }), K('pp-home', 'to-mobile', { tap: 'to-mobile' })],
    K('pp-contacts', 'p-ramesh', { tap: 'ramesh' }),
    K('pp-amount', 'send', { send: true }),
    [K('pp-amount', 'pay', {}, { custom: 'bank-pp' }), pin(RAMESH, '500')],
  ],
  'yono-send': [
    I('bk-login'),
    sbi('pay'),
    K('bk-list', 'ramesh', { title: 'Fund Transfer', h: 'Saved payees', tap: 'ramesh', items: [['ramesh', 'R', 'Ramesh Kumar', 'SBI ••4421'], ['sunita', 'S', 'Sunita Sharma', 'HDFC ••7788'], ['add', 'plusCircle', 'Add beneficiary', 'Add a new person']] }),
    K('bk-form', 'chip-imps', { title: 'Fund Transfer', fields: [['To', 'Ramesh Kumar · SBI ••4421'], ['Amount', '₹ 5,000'], ['Remarks', 'Rent']], chips: [['imps', 'IMPS (instant)'], ['neft', 'NEFT'], ['rtgs', 'RTGS']], chipTap: 'imps' }),
    [K('bk-form', 'confirm', { title: 'Confirm', fields: [['To', 'Ramesh Kumar · SBI ••4421'], ['Amount', '₹ 5,000'], ['Mode', 'IMPS']], note: 'Check the name and amount once more.', button: ['confirm', 'Confirm'] }), I('bk-otp')],
  ],
  'yono-add-beneficiary': [
    I('bk-login'),
    [sbi('pay'), K('bk-list', 'manage', { title: 'Pay & Transfer', tap: 'manage', items: [['fund', 'self', 'Fund Transfer'], ['manage', 'contacts', 'Manage Beneficiary', 'Add, edit or delete'], ['history', 'history', 'Transaction History']] })],
    I('bk-form', { title: 'Add Beneficiary', fields: [['Name', 'Ramesh Kumar'], ['Account number', '3123 4567 890'], ['IFSC code', 'SBIN0001234']] }),
    [K('bk-form', 'next', { title: 'Add Beneficiary', fields: [['Re-enter account number', '3123 4567 890']], button: ['next', 'Next'] }), I('bk-otp')],
  ],
  'yono-statement': [
    I('bk-login'),
    [K('bk-home', 'account', { bank: 'sbi', tap: 'account' }), K('bk-list', 'statement', { title: 'Savings A/c ••5234', tap: 'statement', items: [['details', 'info', 'Account details'], ['mini', 'list', 'Mini statement', 'Last 10 transactions'], ['statement', 'file', 'Account statement', 'Pick dates, download PDF']] })],
    K('bk-form', 'chip-3m', { title: 'Account Statement', chips: [['1m', '1 month'], ['3m', '3 months'], ['custom', 'Custom']], chipTap: '3m', note: 'Choose the period you need.' }),
    K('bk-statement', 'download', { download: true }),
  ],
  'block-card': [
    K('and-home', 'open-yono', { open: 'yono', apps: ['whatsapp', 'gpay'] }),
    [sbi('cards'), K('bk-list', 'block', { title: 'Cards', h: 'Debit card ••4421', tap: 'block', items: [['block', 'block', 'Block card', 'Stop all use now'], ['limits', 'gauge', 'Card limits'], ['pin', 'key', 'Generate PIN']] })],
    K('bk-list', 'block-ok', { title: 'Cards', h: 'Debit card ••4421', items: [['block', 'block', 'Block card'], ['limits', 'gauge', 'Card limits']] }, dialog('Block card ••4421?', 'The card will stop working at once. You can ask the bank for a new card.', [['cancel', 'Cancel'], ['block-ok', 'Block', true]])),
    I('done', { warn: true, title: 'Could not block it?', sub: 'Call the helpline on your bank’s official website or passbook, at once.' }),
  ],
};
