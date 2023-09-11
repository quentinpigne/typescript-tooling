export type NonUndefined<T> = T extends undefined ? never : T;

export type DeepPartial<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]?: T[K] extends Record<any, any> ? DeepPartial<T[K]> : T[K];
};
