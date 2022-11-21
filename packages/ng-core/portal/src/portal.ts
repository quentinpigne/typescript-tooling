import {
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injector,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { PortalOutlet } from './portal-outlet';
import { NoPortalAttachedError, NullPortalOutletError, PortalAlreadyAttachedError } from './portal-errors';

export abstract class Portal<T> {
  private _attachedOutlet: PortalOutlet | null = null;

  set attachedOutlet(portalOutlet: PortalOutlet) {
    this._attachedOutlet = portalOutlet;
  }

  attach(host: PortalOutlet): T {
    if (host === null) {
      throw NullPortalOutletError;
    }

    if (host.hasAttached()) {
      throw PortalAlreadyAttachedError;
    }

    this._attachedOutlet = host;
    return <T>host.attach(this);
  }

  detach(): void {
    const host = this._attachedOutlet;
    if (host !== null) {
      this._attachedOutlet = null;
      host.detach();
    } else {
      throw NoPortalAttachedError;
    }
  }
}

export class ComponentPortal<T> extends Portal<ComponentRef<T>> {
  constructor(
    public componentType: Type<T>,
    public viewContainerRef?: ViewContainerRef,
    public injector?: Injector,
    public componentFactoryResolver?: ComponentFactoryResolver,
  ) {
    super();
  }
}

export class TemplatePortal<C = unknown> extends Portal<EmbeddedViewRef<C>> {
  constructor(
    public templateRef: TemplateRef<C>,
    public context?: C,
    public viewContainerRef?: ViewContainerRef,
    public injector?: Injector,
  ) {
    super();
  }
}
