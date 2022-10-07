export const isObject = (object: unknown) => {
  return Object.prototype.toString.call(object) === '[object Object]';
};
