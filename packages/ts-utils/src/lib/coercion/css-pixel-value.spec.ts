import { coerceCssPixelValue } from './css-pixel-value';

describe('coerceCssPixelValue', () => {
  it("should return '' if null", () => {
    const result: string = coerceCssPixelValue(null);
    expect(result).toBe('');
  });

  it("should return '' if undefined", () => {
    const result: string = coerceCssPixelValue(undefined);
    expect(result).toBe('');
  });

  it("should return '' if 0", () => {
    const result: string = coerceCssPixelValue(0);
    expect(result).toBe('');
  });

  it("should return '' if ''", () => {
    const result: string = coerceCssPixelValue('');
    expect(result).toBe('');
  });

  it("should return '10px' if 10", () => {
    const result: string = coerceCssPixelValue(10);
    expect(result).toBe('10px');
  });

  it("should return '10px' if '10px'", () => {
    const result: string = coerceCssPixelValue('10px');
    expect(result).toBe('10px');
  });
});
