export function extract_background_URL(style: string | null): string | null {
  const regex = /url\((['"])(.*?)\1\)/;
  const match = style?.match(regex);
  return match ? match[2] : null;
}
