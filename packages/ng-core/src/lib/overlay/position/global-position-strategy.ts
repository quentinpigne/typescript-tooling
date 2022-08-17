import { OverlayRef } from '../overlay-ref';

import { PositionStrategy } from './position-strategy';

const globalHostClass: string = 'ng-global-overlay-host';

export class GlobalPositionStrategy implements PositionStrategy {
  private _overlayRef!: OverlayRef;

  private _marginTop?: string;
  private _marginBottom?: string;
  private _marginLeft?: string;
  private _marginRight?: string;
  private _alignItems?: string;
  private _justifyContent?: string;

  attach(overlayRef: OverlayRef): void {
    this._overlayRef = overlayRef;
    overlayRef.hostElement.classList.add(globalHostClass);
  }

  top(offset?: string): void {
    this._marginTop = offset;
    this._alignItems = 'flex-start';
  }

  bottom(offset?: string): void {
    this._marginBottom = offset;
    this._alignItems = 'flex-end';
  }

  left(offset?: string): void {
    this._marginLeft = offset;
    this._justifyContent = 'flex-start';
  }

  right(offset?: string): void {
    this._marginRight = offset;
    this._justifyContent = 'flex-end';
  }

  centerHorizontally(): void {
    this._justifyContent = 'center';
  }

  centerVertically(): void {
    this._alignItems = 'center';
  }

  apply(): void {
    const hostStyles: CSSStyleDeclaration = this._overlayRef.hostElement.style;
    const overlayStyles: CSSStyleDeclaration = this._overlayRef.overlayElement.style;

    overlayStyles.marginTop = this._marginTop || '';
    overlayStyles.marginBottom = this._marginBottom || '';
    overlayStyles.marginLeft = this._marginLeft || '';
    overlayStyles.marginRight = this._marginRight || '';
    hostStyles.justifyContent = this._justifyContent || '';
    hostStyles.alignItems = this._alignItems || '';
  }
}
