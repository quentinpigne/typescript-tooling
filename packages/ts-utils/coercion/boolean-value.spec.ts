import { coerceBooleanValue } from './boolean-value';

describe('coerceBooleanValue', () => {
  it('should return false if null', () => {
    const result: boolean = coerceBooleanValue(null);
    expect(result).toBe(false);
  });

  it("should return false if ''", () => {
    const result: boolean = coerceBooleanValue('');
    expect(result).toBe(false);
  });

  it('should return true if true', () => {
    const result: boolean = coerceBooleanValue(true);
    expect(result).toBe(true);
  });

  it("should return true if 'true'", () => {
    const result: boolean = coerceBooleanValue('true');
    expect(result).toBe(true);
  });

  it('should return false if false', () => {
    const result: boolean = coerceBooleanValue(false);
    expect(result).toBe(false);
  });

  it("should return false if 'false'", () => {
    const result: boolean = coerceBooleanValue('false');
    expect(result).toBe(false);
  });
});
