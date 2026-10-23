// The Nook mark: a protective corner around a warm core, a safe quiet corner inside the phone.
export function NookMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" role="img" aria-label="Nook" style={{ flex: 'none', borderRadius: size * 0.22, boxShadow: '0 0 0 1.5px #E3C9B0, 0 1px 3px rgba(43, 38, 37, 0.18)' }}>
      <rect width="512" height="512" rx="112" fill="#FFFDF9" />
      <rect x="16" y="16" width="480" height="480" rx="96" fill="none" stroke="#E8CDB5" strokeWidth="12" />
      <path d="M 352 176 H 224 C 184 176 152 208 152 248 V 376" fill="none" stroke="#D95D39" strokeWidth="56" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="312" cy="312" r="52" fill="#F4A261" />
    </svg>
  );
}
