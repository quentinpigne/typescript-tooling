import { OverlayRef } from '../overlay-ref';

import { PositionStrategy } from './position-strategy';

const globalHostClass: string = 'ng-relative-overlay-host';

export type RelativePosition = 'left' | 'right' | 'top' | 'bottom';

export class RelativePositionStrategy implements PositionStrategy {
  private _overlayRef!: OverlayRef;

  private _position: RelativePosition = 'top';

  constructor(private _origin: HTMLElement) {}

  position(position: RelativePosition): this {
    this._position = position;
    return this;
  }

  attach(overlayRef: OverlayRef): void {
    this._overlayRef = overlayRef;
    overlayRef.hostElement.classList.add(globalHostClass);
  }

  apply(): void {
    const targetStyle: CSSStyleDeclaration = this._overlayRef.hostElement.style;
    targetStyle.position = 'absolute';
    targetStyle.top = '0';
    targetStyle.left = '0';

    const hostElPosition: DOMRect = this._origin.getBoundingClientRect();

    let topPosition: number = 0;
    let leftPosition: number = 0;

    switch (this._position) {
      case 'top':
        topPosition = hostElPosition.top - this._overlayRef.hostElement.offsetHeight;
        break;
      case 'bottom':
        topPosition = hostElPosition.top + hostElPosition.height;
        break;
      case 'left':
        leftPosition = hostElPosition.left - this._overlayRef.hostElement.offsetWidth;
        break;
      case 'right':
        leftPosition = hostElPosition.left + hostElPosition.width;
        break;
    }

    if (this._position === 'top' || this._position === 'bottom') {
      leftPosition = hostElPosition.left + hostElPosition.width / 2 - this._overlayRef.hostElement.offsetWidth / 2;
    } else {
      topPosition = hostElPosition.top + hostElPosition.height / 2 - this._overlayRef.hostElement.offsetHeight / 2;
    }

    this._overlayRef.hostElement.style.transform = `translate(${leftPosition}px, ${topPosition}px)`;
  }
}
