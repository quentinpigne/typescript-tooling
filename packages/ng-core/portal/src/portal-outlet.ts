import { ComponentRef, EmbeddedViewRef } from '@angular/core';

import { ComponentPortal, Portal, TemplatePortal } from './portal';
import { NullPortalError, PortalAlreadyAttachedError, UnknownPortalTypeError } from './portal-errors';

export interface PortalOutlet {
  attach(portal: Portal<unknown>): unknown;

  detach(): void;

  hasAttached(): boolean;
}

export abstract class BasePortalOutlet implements PortalOutlet {
  protected _attachedPortal: Portal<unknown> | null = null;

  protected _detachFn: (() => void) | null = null;

  hasAttached(): boolean {
    return !!this._attachedPortal;
  }

  attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  attach<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
  attach(portal: Portal<unknown>): unknown;

  attach(portal: Portal<unknown>): unknown {
    if (portal === null) {
      throw NullPortalError;
    }

    if (this.hasAttached()) {
      throw PortalAlreadyAttachedError;
    }

    this._attachedPortal = portal;
    if (portal instanceof ComponentPortal) {
      portal.attachedOutlet = this;
      return this.attachComponentPortal<unknown>(portal);
    }
    if (portal instanceof TemplatePortal) {
      portal.attachedOutlet = this;
      return this.attachTemplatePortal(portal);
    }
    throw UnknownPortalTypeError;
  }

  abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;

  abstract attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;

  detach(): void {
    if (this._attachedPortal) {
      this._attachedPortal = null;
    }

    if (this._detachFn) {
      this._detachFn();
      this._detachFn = null;
    }
  }
}
