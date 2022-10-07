import { sanitizeHtml } from './html-sanitize';

describe('sanitizeHtml', () => {
  it('should return null if input is null', () => {
    expect(sanitizeHtml(undefined)).toBeUndefined();
  });

  it("should sanitize text containing '&'", () => {
    expect(sanitizeHtml('This is a text with an & character')).toEqual('This is a text with an &amp; character');
  });

  it("should sanitize text containing '<'", () => {
    expect(sanitizeHtml('This is a text with a < character')).toEqual('This is a text with a &lt; character');
  });

  it("should sanitize text containing '>'", () => {
    expect(sanitizeHtml('This is a text with a > character')).toEqual('This is a text with a &gt; character');
  });

  it("should sanitize text containing '", () => {
    expect(sanitizeHtml("This is a text with a ' character")).toEqual('This is a text with a &apos; character');
  });

  it('should sanitize text containing "', () => {
    expect(sanitizeHtml('This is a text with a " character')).toEqual('This is a text with a &quot; character');
  });

  it('should sanitize complex HTML string', () => {
    const inputHTML = `
      <body>
        <a href="#">This is a link</a>
      </body>
    `;
    const expectedSanitizedHTML = `
      &lt;body&gt;
        &lt;a href=&quot;#&quot;&gt;This is a link&lt;/a&gt;
      &lt;/body&gt;
    `;
    expect(sanitizeHtml(inputHTML)).toEqual(expectedSanitizedHTML);
  });
});
