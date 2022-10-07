const rAmp: RegExp = /&/g;
const rLt: RegExp = /</g;
const rGt: RegExp = />/g;
const rApos: RegExp = /'/g;
const rQuot: RegExp = /"/g;

const hChars: RegExp = /[&<>"']/;

export function sanitizeHtml(inputHTML?: string): string | undefined {
  if (inputHTML === undefined) {
    return inputHTML;
  }

  return hChars.test(inputHTML)
    ? inputHTML
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&apos;')
        .replace(rQuot, '&quot;')
    : inputHTML;
}
