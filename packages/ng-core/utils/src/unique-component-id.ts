let nextUniqueId = 0;

export function getUniqueComponentId(prefix: string) {
  return `${prefix}-${++nextUniqueId}`;
}
