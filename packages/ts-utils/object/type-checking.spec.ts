import { isObject } from './type-checking';

describe('isObject', () => {
  it('should return true if input is an object created by enumeration', () => {
    expect(isObject({ aProperty: 'aValue' })).toBeTruthy();
  });

  it('should return true if input is an object created explicitly', () => {
    expect(isObject(Object.create(null))).toBeTruthy();
  });

  it('should return true if input is an object created using constructor', () => {
    expect(isObject(new Object())).toBeTruthy();
  });

  it('should return false if input is a string', () => {
    expect(isObject('aString')).toBeFalsy();
  });

  it('should return false if input is a number', () => {
    expect(isObject(123)).toBeFalsy();
  });

  it('should return false if input is a boolean', () => {
    expect(isObject(true)).toBeFalsy();
  });

  it('should return false if input is an array', () => {
    expect(isObject([])).toBeFalsy();
  });

  it('should return false if input is a function', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isObject(() => {})).toBeFalsy();
  });
});
