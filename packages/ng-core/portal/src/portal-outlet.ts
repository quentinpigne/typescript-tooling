import { ComponentRef, EmbeddedViewRef } from '@angular/core';

import { ComponentPortal, Portal, TemplatePortal } from './portal';

export interface PortalOutlet {
  attach(portal: Portal<unknown>): unknown;

  detach(): void;
}

export abstract class BasePortalOutlet implements PortalOutlet {
  protected _detachFn: (() => void) | null = null;

  attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  attach<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
  attach(portal: Portal<unknown>): unknown;

  attach(portal: Portal<unknown>): unknown {
    if (portal instanceof ComponentPortal) {
      portal.attachedOutlet = this;
      return this.attachComponentPortal<unknown>(portal);
    }
    if (portal instanceof TemplatePortal) {
      portal.attachedOutlet = this;
      return this.attachTemplatePortal(portal);
    }
    return undefined;
  }

  abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;

  abstract attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;

  detach(): void {
    if (this._detachFn) {
      this._detachFn();
      this._detachFn = null;
    }
  }
}
