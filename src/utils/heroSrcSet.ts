export function heroSrcSet(heroImage: string): string {
  const base = heroImage.replace(/\.(png|jpe?g|webp)$/i, "");
  return [768, 1200, 1600].map((w) => `${base}-${w}.webp ${w}w`).join(", ");
}
