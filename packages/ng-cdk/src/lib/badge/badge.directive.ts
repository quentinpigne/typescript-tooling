import { Directive, ElementRef, Renderer2 } from '@angular/core';

import { Constructor } from '@quentinpigne/ts-utils';
import { EmptyClass, HasContent, mixinContent } from '@quentinpigne/ng-core';

import { Badge, BadgeContent, BadgePosition } from './types';

const _BadgeBase: Constructor<HasContent<BadgeContent>> = mixinContent<BadgeContent>()(EmptyClass);

@Directive()
export class BadgeCdk extends _BadgeBase implements Badge {
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

  override get content(): BadgeContent {
    return super.content;
  }
  override set content(newContent: BadgeContent) {
    super.content = newContent;
    this.updateBadgeElement(newContent);
  }

  protected _badgeElement: HTMLSpanElement | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  protected createBadgeElement(badgeClass: string): HTMLSpanElement {
    const badgeElement = this.renderer.createElement('span') as HTMLSpanElement;

    badgeElement.classList.add(badgeClass);
    badgeElement.classList.add(`${badgeClass}-embedded`);

    const hostElement = this.elementRef.nativeElement as HTMLElement;
    hostElement.appendChild(badgeElement);

    return badgeElement;
  }

  protected updateBadgeElement(newContent: BadgeContent): void {
    if (this._badgeElement) {
      this._badgeElement.textContent = this.normalizeContent(newContent);
    }
  }

  private normalizeContent(content: BadgeContent): string {
    return content == null ? '' : `${content}`;
  }
}
