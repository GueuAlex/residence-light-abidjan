type Props = { className?: string };

// Bulle de discussion (lien WhatsApp)
export function IconeWhatsapp({ className = "size-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M4 18.5 5.2 15A8 8 0 1 1 8.6 18.6Z" strokeLinejoin="round" />
      <path d="M9 10.5c.5 1.8 2 3.3 3.8 3.9" strokeLinecap="round" />
    </svg>
  );
}

// Toits du logo, redessines pour l'avatar sur fond noir (a remplacer par le vectoriel officiel)
export function Maisons({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true" className={className}>
      <path d="M20 44a14 14 0 0 1 28 0Z" fill="#ecc23a" />
      <path d="M14 96 66 44l52 52" stroke="#ecc23a" strokeWidth="10" fill="none" />
      <path d="M84 72 134 14l72 84" stroke="#fffdf8" strokeWidth="12" fill="none" />
      <path d="M168 52l28-24 38 42" stroke="#ecc23a" strokeWidth="8" fill="none" />
      <path d="M0 108C70 88 150 94 240 106" stroke="#fffdf8" strokeWidth="8" fill="none" />
    </svg>
  );
}
