import { ComponentRef, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { coerceCssPixelValue } from '@quentinpigne/ts-utils/coercion';

import { ComponentPortal } from '../portal/portal';
import { PortalOutlet } from '../portal/portal-outlet';
import { DomPortalOutlet } from '../portal/dom-portal-outlet';

import { OverlayConfig } from './overlay-config';
import { PositionStrategy } from './position/position-strategy';

export class OverlayRef implements PortalOutlet {
  private _overlayElement!: HTMLElement;
  private _backdropElement!: HTMLElement;
  private _backdropClick: Subject<MouseEvent> = new Subject<MouseEvent>();
  private _keyboardEvents: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();
  private _positionStrategy?: PositionStrategy;

  private _backdropClickHandler: (event: MouseEvent) => void = (event: MouseEvent) => this._backdropClick.next(event);
  private _keyboardEventHandler: (event: KeyboardEvent) => void = (event: KeyboardEvent) =>
    this._keyboardEvents.next(event);

  constructor(
    private _hostElement: HTMLElement,
    private _ngZone: NgZone,
    private _document: Document,
    private _portalOutlet: DomPortalOutlet,
    private _config?: OverlayConfig,
  ) {
    this._positionStrategy = _config?.positionStrategy;
    this._ngZone.runOutsideAngular(() => {
      this._document.body.addEventListener('keyup', this._keyboardEventHandler);
    });
  }

  get hostElement(): HTMLElement {
    return this._hostElement;
  }

  get overlayElement(): HTMLElement {
    return this._overlayElement;
  }

  get backdropClick(): Observable<MouseEvent> {
    return this._backdropClick.asObservable();
  }

  get keyboardEvents(): Observable<KeyboardEvent> {
    return this._keyboardEvents.asObservable();
  }

  attach<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    const componentRef: ComponentRef<T> = this._portalOutlet.attach(portal);
    this._overlayElement = componentRef.location.nativeElement as HTMLElement;

    this._updateElementSize();

    if (this._config?.hasBackdrop) this._attachBackdrop();

    if (this._config?.positionStrategy) {
      this._config.positionStrategy.attach(this);
    }

    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this._config?.positionStrategy?.apply();
    });

    return componentRef;
  }

  detach(): void {
    if (this._config?.hasBackdrop) this._detachBackdrop();
    this._document.body.removeEventListener('keyup', this._keyboardEventHandler);
    this._hostElement.remove();
    this._portalOutlet.detach();
  }

  updatePosition(): void {
    if (this._positionStrategy) {
      this._positionStrategy.apply();
    }
  }

  private _updateElementSize(): void {
    const style: CSSStyleDeclaration = this._overlayElement.style;

    style.width = coerceCssPixelValue(this._config?.width);
    style.height = coerceCssPixelValue(this._config?.width);
    style.minWidth = coerceCssPixelValue(this._config?.minWidth);
    style.minHeight = coerceCssPixelValue(this._config?.minHeight);
    style.maxWidth = coerceCssPixelValue(this._config?.maxWidth);
    style.maxHeight = coerceCssPixelValue(this._config?.maxHeight);
  }

  private _attachBackdrop() {
    this._backdropElement = this._document.createElement('div');
    this._backdropElement.classList.add('ng-overlay-backdrop');

    this._hostElement.parentElement?.insertBefore(this._backdropElement, this._hostElement);
    this._backdropElement.addEventListener('click', this._backdropClickHandler);
  }

  private _detachBackdrop() {
    this._backdropElement.removeEventListener('click', this._backdropClickHandler);
    this._backdropElement.remove();
  }
}
