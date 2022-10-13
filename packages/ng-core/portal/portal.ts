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

export abstract class Portal<T> {
  private _attachedOutlet: PortalOutlet | null = null;

  set attachedOutlet(portalOutlet: PortalOutlet) {
    this._attachedOutlet = portalOutlet;
  }

  attach(host: PortalOutlet): T {
    this._attachedOutlet = host;
    return <T>host.attach(this);
  }

  detach(): void {
    const host = this._attachedOutlet;
    if (host !== null) {
      this._attachedOutlet = null;
      host.detach();
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
