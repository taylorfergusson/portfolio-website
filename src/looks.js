// How each project looks on its card (WorkCard.jsx) and at the top of its case study (CaseBanner.jsx).
// The cards use the same glass tiles as the home page hero, lit up under the cursor.
//   tint: the panel colour behind the glass
//   glow: the two colours the tiles light up in (brand colour names from styles.css, or hex colours)
export const LOOK = {
  yumgo: { tint: '#DDE8DE', glow: ['--brand-green', '--brand-orange'] },
  'ciut-upgrade': { tint: '#F3DDD0', glow: ['--brand-orange', '--brand-red'] },
  borrowcircle: { tint: '#F1E9D8', glow: ['--brand-red', '--brand-orange'] },   // BorrowCircle's cream and red
  'soundcloud-study': { tint: '#E3E8EA', glow: ['--brand-orange', '--brand-green'] },   // a cool grey, lit in orange like SoundCloud
}
export const DEFAULT_LOOK = { tint: '#E8E8ED', glow: ['--brand-green', '--brand-orange'] }

export const lookFor = (slug) => LOOK[slug] || DEFAULT_LOOK
