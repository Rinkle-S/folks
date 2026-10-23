import { SK, B, R, TL, G, BT, NV, CH, F, H, X, SR, DG, TO, GAP, HD, ST, KP, DOTS, T, N, HOME } from './guideScreens';

const GP = SK.gpay;
const gpHome = (t, scrolled) => {
  const m = (label, e) => (t === label ? '*' : '') + label + '|' + e;
  return T(
    GP,
    B('Google Pay', { back: false, right: [t === 'avatar' ? '*👤' : '👤'] }),
    SR('Pay friends and merchants'),
    TL([m('Scan any QR code', '📷'), m('Pay phone number', '📞'), m('Pay contacts', '👥'), m('Pay UPI ID', '🆔'), m('Bank transfer', '🏦'), m('Check bank balance', '💰')]),
    t === 'people' ? TL(['*Ramesh|👨', 'Sunita|👩', 'Anil|👨', 'Priya|👩']) : GAP(),
    scrolled ? R(['*Show all transactions|🕘', 'Sharma General Store|₹50|🏪'], 'Recent') : GAP()
  );
};
const pinScreen = (bank) => N(GP, B('Enter UPI PIN'), H('🔐', bank || 'State Bank of India ••5234', 'Type your UPI PIN yourself. Do not tell anyone'), DOTS(6), KP());
const SBI = SK.sbi;
const sbiLogin = () => N(SBI, B('YONO SBI', { back: false }), H('🔐', 'Welcome back', 'Type your 6-digit MPIN, or use your fingerprint'), DOTS(6), KP());
const sbiHome = (t) => T(SBI, B('YONO SBI', { back: false, right: ['🔔', '☰'] }), H('🏦', 'Savings ••5234', '₹ ••••••'), TL(['Accounts|🏦', t === 'pay' ? '*Pay & Transfer|💸' : 'Pay & Transfer|💸', 'Cards|💳', 'Invest|📈']));
const ICI = SK.icici;
const iciLogin = () => N(ICI, B('iMobile Pay', { back: false }), H('🔐', 'Login', 'Type your 6-digit PIN or use your fingerprint'), DOTS(6), KP());
const PP = SK.pe;
const PT = SK.paytm;
const otp = (skin) => N(skin, B('Enter OTP'), H('📩', 'OTP sent to your phone', 'Type it yourself. Do not tell it to anyone'), DOTS(6), KP());

export const SPEC_MONEY = {
  'gpay-balance': [
    gpHome('Check bank balance'),
    T(GP, B('Select bank account'), R(['*State Bank of India ••5234|Savings|🏦', 'HDFC Bank ••8891|Savings|🏦'])),
    [pinScreen(), N(GP, B('Balance'), H('💰', '₹ 12,450.00', 'Available balance in State Bank of India', 'good'))],
  ],
  'gpay-history': [
    N(GP, B('Google Pay', { back: false }), TL(['Scan any QR code|📷', 'Pay phone number|📞', 'Pay contacts|👥']), X('Scroll down to see more ↓')),
    gpHome(null, true),
    [
      T(GP, B('Transaction history'), R(['*Sharma General Store|Paid · 23 Oct|🏪|=₹50', 'Ramesh|Paid · 21 Oct|👨|=₹500', 'Sunita|Received · 20 Oct|👩|=₹200'])),
      N(GP, B('Payment details'), H('🏪', '₹50', 'Paid to Sharma General Store'), X('23 Oct, 4:12 PM · From SBI ••5234 · UPI ID: sharma@oksbi')),
    ],
  ],
  'gpay-reset-pin': [
    gpHome('avatar'),
    [
      T(GP, B('Profile'), H('👩', 'Kamla Devi'), R(['Setup payment methods|💳', '*Bank account|1 account|🏦', 'Settings|⚙️'])),
      T(GP, B('Bank accounts'), R(['*State Bank of India ••5234|Primary|🏦'])),
    ],
    [
      T(GP, B('State Bank of India', { right: ['*⋮'] }), H('🏦', '••5234', 'UPI PIN is set')),
      T(GP, B('State Bank of India'), R(['Check balance|💰', 'Change UPI PIN|🔢', '*Forgot UPI PIN|❓'])),
    ],
    N(GP, B('Verify your debit card'), F('Last 6 digits of debit card', '••••••'), F('Expiry (MM/YY)', '08/29'), X('You will get an SMS code. Do not tell it to anyone.')),
    [otp(GP), pinScreen('Set a new UPI PIN')],
  ],
  'gpay-add-bank': [
    [gpHome('avatar'), T(GP, B('Profile'), H('👩', 'Kamla Devi'), R(['*Bank account|🏦', 'Settings|⚙️']))],
    [
      T(GP, B('Bank accounts'), H('🏦', 'No accounts yet'), BT(['*Add bank account'])),
      T(GP, B('Choose your bank'), SR('Search banks'), R(['*State Bank of India|🏦', 'HDFC Bank|🏦', 'ICICI Bank|🏦', 'Canara Bank|🏦'])),
    ],
    T(GP, B('Verify phone number'), H('📩', 'Allow Google Pay to send an SMS', 'It must be the same number linked to your bank'), BT(['ghost:Cancel', '*Allow'], true)),
    [T(GP, B('Select account'), R(['*Savings ••5234|State Bank of India|🏦'])), pinScreen('Set UPI PIN')],
  ],
  'gpay-pay-number': [
    gpHome('Pay phone number'),
    N(GP, B('Pay phone number'), F('Phone number', '98765 43210'), KP()),
    N(GP, B('Pay phone number'), H('👨', 'Ramesh Kumar', '+91 98765 43210'), X('Is this the person you mean? Check the NAME before you pay.', 'warn')),
    [
      T(GP, B('Paying Ramesh Kumar'), H('💸', '₹ 500'), GAP(true), BT(['*Pay'])),
      pinScreen(),
    ],
  ],
  'gpay-request-money': [
    gpHome('people'),
    T(GP, B('Ramesh', { back: true }), H('👨', 'Ramesh Kumar', '+91 98765 43210'), GAP(true), BT(['Pay', '*Request'], true)),
    T(GP, B('Request money'), H('💸', '₹ 500'), F('Note', 'For groceries'), GAP(true), BT(['*Request'])),
  ],
  'upi-failed': [
    N(GP, B('Payment pending'), H('⏳', 'Wait 1 to 3 days', 'Most failed payments return to your account on their own')),
    [T(GP, B('Transaction history'), R(['*Sharma General Store|Failed · 23 Oct|🏪|=₹500'])), T(GP, B('Payment details'), H('⚠️', '₹500 · Failed'), BT(['*Having issues?']))],
    N(GP, B('Payment details'), H('📋', 'Write these down', 'Transaction ID: 4231 8890 2211'), X('Date: 23 Oct, 4:12 PM · Amount: ₹500')),
    N(SK.plain, B('Bank helpline'), H('☎️', 'Use the official number', 'From your bank\'s website or the back of your card'), X('Do not search for a helpline number online. Scammers put fake numbers there.', 'warn')),
  ],
  'upi-report-fraud': [
    T(SK.plain, B('Phone', { back: false }), F('Number', '1930'), GAP(true), BT(['*📞 Call']), KP()),
    N(SK.plain, B('On the call'), H('📞', 'Cyber crime helpline 1930'), X('Tell them: the amount, the time, and the phone number or UPI ID you paid.')),
    N(SK.chrome, B('cybercrime.gov.in'), H('🌐', 'National Cyber Crime Reporting Portal'), BT(['Report financial fraud'])),
    N(SK.plain, B('Your bank'), H('🏦', 'Call your bank too', 'Use the number on the back of your card')),
  ],
  'qr-gallery': [
    gpHome('Scan any QR code'),
    T(GP, B('Scan QR code', { back: true, right: ['*🖼️'] }), H('📷', 'Point at a QR code')),
    [
      T(GP, B('Choose a picture'), TL(['*QR picture|🔳', 'Photo|🌅', 'Photo|🌸'])),
      N(GP, B('Paying'), H('🏪', 'Sharma General Store', 'Check this name matches the shop'), X('Then type the amount and your UPI PIN as usual.')),
    ],
  ],
  'phonepe-send': [
    HOME('PhonePe'),
    [
      T(PP, B('PhonePe', { back: false, right: ['🔔'] }), TL(['*To Mobile Number|📞', 'To Bank/UPI ID|🏦', 'To Self Account|🔁', 'Check Balance|💰'])),
      T(PP, B('To Mobile Number'), SR('Search or type a number'), R(['*Ramesh Kumar|98765 43210|👨', 'Sunita|98765 11111|👩'])),
    ],
    N(PP, B('Ramesh Kumar'), H('💸', '₹ 500'), X('Check the name shown at the top before you send.'), BT(['Send'])),
    [T(PP, B('Choose bank account'), R(['*State Bank of India ••5234|🏦'])), N(PP, B('Enter UPI PIN'), H('🔐', 'Type your UPI PIN yourself'), DOTS(6), KP())],
  ],
  'phonepe-history': [
    HOME('PhonePe'),
    T(PP, B('PhonePe', { back: false }), H('💜', 'Welcome'), GAP(true), NV(['Home|🏠', 'Search|🔍', '*History|🕘', 'Alerts|🔔'])),
    T(PP, B('History', { back: false }), R(['*Sharma General Store|23 Oct|🏪|=₹50', 'Ramesh Kumar|21 Oct|👨|=₹500', 'Sunita|20 Oct|👩|=₹200'])),
  ],
  'paytm-balance': [
    HOME('Paytm'),
    T(PT, B('Paytm', { back: false }), TL(['To Mobile|📞', 'To Bank|🏦', 'Scan & Pay|📷', '*Balance & History|💰'])),
    T(PT, B('Balance & History'), R(['*Check Balance|State Bank of India ••5234|🏦'])),
    [N(PT, B('Enter UPI PIN'), H('🔐', 'Type your UPI PIN yourself'), DOTS(6), KP()), N(PT, B('Balance'), H('💰', '₹ 12,450.00', 'State Bank of India ••5234', 'good'))],
  ],
  'paytm-send': [
    HOME('Paytm'),
    T(PT, B('Paytm', { back: false }), TL(['*To Mobile|📞', 'To Bank|🏦', 'Scan & Pay|📷'])),
    T(PT, B('To Mobile'), SR('Type a number or name', { typed: false }), R(['*Ramesh Kumar|98765 43210|👨', 'Sunita|98765 11111|👩'])),
    T(PT, B('Paying Ramesh Kumar'), H('👨', 'Ramesh Kumar', 'Check the name'), F('Amount', '₹ 500'), GAP(true), BT(['*Pay ₹500'])),
    [T(PT, B('Choose bank'), R(['*State Bank of India ••5234|🏦'])), N(PT, B('Enter UPI PIN'), H('🔐', 'Type your UPI PIN yourself'), DOTS(6), KP())],
  ],
  'yono-send': [
    sbiLogin(),
    sbiHome('pay'),
    T(SBI, B('Pay & Transfer'), R(['*Ramesh Kumar|SBI ••4421|👨', 'Sunita|HDFC ••7788|👩', '+ Add beneficiary|➕'], 'Saved payees')),
    T(SBI, B('Amount'), F('Amount', '₹ 5,000'), CH(['*IMPS', 'NEFT', 'RTGS'])),
    [N(SBI, B('Confirm'), F('To', 'Ramesh Kumar · SBI ••4421'), F('Amount', '₹ 5,000'), X('Check the name and amount again.'), BT(['Confirm'])), otp(SBI)],
  ],
  'yono-add-beneficiary': [
    sbiLogin(),
    [sbiHome('pay'), T(SBI, B('Pay & Transfer'), R(['Fund transfer|💸', '*Manage Beneficiary|👥', 'Transaction history|🕘']))],
    N(SBI, B('Add Beneficiary'), F('Name', 'Ramesh Kumar'), F('Account number', '31234567890'), F('IFSC code', 'SBIN0001234')),
    [N(SBI, B('Add Beneficiary'), F('Re-enter account number', '31234567890'), BT(['Continue'])), otp(SBI)],
  ],
  'yono-statement': [
    sbiLogin(),
    [
      T(SBI, B('Accounts', { back: false }), R(['*Savings ••5234|₹ ••••••|🏦'])),
      T(SBI, B('Savings ••5234'), R(['Account details|ℹ️', '*Statement|📄', 'Mini statement|🧾'])),
    ],
    T(SBI, B('Statement'), CH(['Last month', '*Last 3 months', 'Custom']), X('Choose the dates you need.')),
    [T(SBI, B('Statement'), H('📄', 'Last 3 months'), GAP(true), BT(['*Download PDF', 'Share'])), N(SBI, B('PDF password'), H('🔑', 'The PDF may ask for a password', 'Usually your date of birth (DDMMYYYY) or the last digits of your account number'))],
  ],
  'yono-change-mpin': [
    sbiLogin(),
    T(SBI, B('Menu'), R(['Profile|👤', '*Change MPIN|🔢', 'Settings|⚙️', 'Help|❓'])),
    N(SBI, B('Change MPIN'), F('Old MPIN', '••••••'), F('New MPIN', '••••••'), F('Confirm new MPIN', '••••••')),
    T(SBI, B('YONO SBI', { back: false }), H('🔐', 'Welcome back'), DOTS(6), BT(['Login', '*Forgot MPIN'])),
  ],
  'yono-account-details': [
    sbiLogin(),
    T(SBI, B('Accounts', { back: false }), R(['*Savings ••5234|₹ ••••••|🏦'])),
    [T(SBI, B('Savings ••5234'), H('🏦', 'A/c: 31234567890'), BT(['*Account details'])), N(SBI, B('Account details'), F('IFSC code', 'SBIN0001234'), F('Branch', 'Kochi Main'))],
    N(SBI, B('Passbook'), H('📘', 'Your passbook', 'The first page also has the account number and IFSC')),
  ],
  'icici-transfer': [
    iciLogin(),
    [T(ICI, B('iMobile Pay', { back: false }), TL(['*Pay|💸', 'Cards|💳', 'Invest|📈', 'Bills|🧾'])), T(ICI, B('Pay'), R(['*To Bank Account|🏦', 'To Mobile Number|📞', 'To UPI ID|🆔']))],
    T(ICI, B('Choose payee'), R(['*Ramesh Kumar|SBI ••4421|👨', '+ Add new payee|➕'])),
    [N(ICI, B('Amount'), F('Amount', '₹ 5,000'), F('To', 'Ramesh Kumar'), X('Check the name and amount.'), BT(['Confirm'])), otp(ICI)],
  ],
  'icici-statement': [
    iciLogin(),
    T(ICI, B('Accounts', { back: false }), R(['*Savings ••6612|₹ ••••••|🏦'])),
    T(ICI, B('Savings ••6612'), H('🏦', 'Balance ₹ ••••••'), R(['*View all transactions|🧾', 'Account details|ℹ️'])),
    [N(ICI, B('Transactions'), CH(['Last month', '^Last 3 months', 'Custom'])), T(ICI, B('Transactions'), BT(['*Download', 'Email'], true))],
  ],
  'block-card': [
    HOME('YONO SBI'),
    T(SBI, B('YONO SBI', { back: false }), TL(['Accounts|🏦', 'Pay & Transfer|💸', '*Cards|💳', 'Invest|📈'])),
    T(SBI, B('Cards'), H('💳', 'Debit card ••4421'), R(['*Block card|Stop all use now|🚫', 'Card limits|📏', 'Set PIN|🔢'])),
    [T(SBI, DG('Block card ••4421?', 'You will need to ask the bank for a new card.', ['Cancel', '*Block'])), N(SK.plain, B('Bank helpline'), H('☎️', 'Cannot block it?', 'Call the helpline on your bank\'s official website or passbook. Do it at once.'))],
  ],
};
