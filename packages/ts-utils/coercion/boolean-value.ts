export function coerceBooleanValue(value: string | boolean | null): boolean {
  return value ? (typeof value === 'boolean' ? value : `${value}` !== 'false') : false;
}
