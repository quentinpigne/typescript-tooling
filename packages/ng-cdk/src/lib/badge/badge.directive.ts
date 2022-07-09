import { Directive, ElementRef, Renderer2 } from '@angular/core';

export type BadgePosition =
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom';

@Directive()
export class BadgeCdk {
  isTop: boolean = true;
  isBottom: boolean = false;
  isRight: boolean = true;
  isLeft: boolean = false;

  set position(newPosition: BadgePosition) {
    this.isTop = newPosition.indexOf('bottom') === -1;
    this.isBottom = !this.isTop;
    this.isRight = newPosition.indexOf('left') === -1;
    this.isLeft = !this.isRight;
  }

  get content(): string | number | undefined | null {
    return this._content;
  }
  set content(newContent: string | number | undefined | null) {
    this._content = newContent;
    this.updateBadgeElement(newContent);
  }
  private _content: string | number | undefined | null;

  protected _badgeElement: HTMLSpanElement | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  protected createBadgeElement(badgeClass: string): HTMLSpanElement {
    const badgeElement = this.renderer.createElement('span') as HTMLSpanElement;

    badgeElement.classList.add(badgeClass);
    badgeElement.classList.add(`${badgeClass}-embedded`);

    const hostElement = this.elementRef.nativeElement as HTMLElement;
    hostElement.appendChild(badgeElement);

    return badgeElement;
  }

  protected updateBadgeElement(newContent: string | number | undefined | null): void {
    if (this._badgeElement) {
      this._badgeElement.textContent = this.normalizeContent(newContent);
    }
  }

  private normalizeContent(content: string | number | undefined | null): string {
    return content == null ? '' : `${content}`;
  }
}
