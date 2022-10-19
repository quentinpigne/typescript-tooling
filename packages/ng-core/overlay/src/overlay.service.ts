import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { DomPortalOutlet } from '@quentinpigne/ng-core/portal';

import { OverlayRef } from './overlay-ref';
import { OverlayContainerService } from './overlay-container.service';
import { OverlayConfig } from './overlay-config';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(
    private _overlayContainerService: OverlayContainerService,
    private _ngZone: NgZone,
    private _injector: Injector,
    private _applicationRef: ApplicationRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private _document: Document,
  ) {}

  create(config?: OverlayConfig): OverlayRef {
    const hostElement: HTMLElement = this._createHostElement();
    const portalOutlet: DomPortalOutlet = this._createPortalOutlet(hostElement);
    return new OverlayRef(hostElement, this._ngZone, this._document, portalOutlet, config);
  }

  private _createHostElement(): HTMLElement {
    const hostElement: HTMLElement = this._document.createElement('div');
    this._overlayContainerService.containerElement.appendChild(hostElement);
    return hostElement;
  }

  private _createPortalOutlet(hostElement: HTMLElement): DomPortalOutlet {
    return new DomPortalOutlet(hostElement, this._injector, this._applicationRef, this._componentFactoryResolver);
  }
}
