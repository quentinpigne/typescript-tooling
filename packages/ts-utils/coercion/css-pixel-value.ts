export function coerceCssPixelValue(value: string | number | null | undefined): string {
  return value ? (typeof value === 'string' ? value : `${value}px`) : '';
}
