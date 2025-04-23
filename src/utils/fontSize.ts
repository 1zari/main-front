export const fontSizeClasses = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
] as const;

export type FontSize = (typeof fontSizeClasses)[number];

export const getFontSizeWithOffset = (base: FontSize, offset: number): FontSize => {
  const index = fontSizeClasses.indexOf(base);
  const nextIndex = Math.max(0, Math.min(fontSizeClasses.length - 1, index + offset));
  return fontSizeClasses[nextIndex];
};
