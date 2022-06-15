import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injector,
  ViewContainerRef,
} from '@angular/core';

import { ComponentPortal, TemplatePortal } from './portal';
import { BasePortalOutlet } from './portal-outlet';

export class DomPortalOutlet extends BasePortalOutlet {
  constructor(
    private readonly _element: HTMLElement,
    private readonly _injector: Injector,
    private readonly _applicationRef: ApplicationRef,
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
    private readonly _viewContainerRef?: ViewContainerRef,
  ) {
    super();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    let componentRef: ComponentRef<T>;
    if (this._viewContainerRef) {
      componentRef = this._viewContainerRef.createComponent(portal.componentType, {
        index: this._viewContainerRef.length,
        injector: portal.injector || this._injector,
      });
      this._detachFn = () => componentRef.destroy();
    } else {
      const componentFactory: ComponentFactory<T> = this._componentFactoryResolver.resolveComponentFactory(
        portal.componentType,
      );
      componentRef = componentFactory.create(portal.injector || this._injector);
      this._applicationRef.attachView(componentRef.hostView);
      this._detachFn = () => {
        this._applicationRef.detachView(componentRef.hostView);
        componentRef.destroy();
      };
    }
    this._element.appendChild(componentRef.location.nativeElement);
    return componentRef;
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    const embeddedViewRef: EmbeddedViewRef<C> = portal.templateRef.createEmbeddedView(portal.context || ({} as C));
    if (this._viewContainerRef) {
      this._viewContainerRef.insert(embeddedViewRef, this._viewContainerRef.length);
      this._detachFn = () => {
        const index: number | undefined = this._viewContainerRef?.indexOf(embeddedViewRef);
        this._viewContainerRef?.remove(index);
      };
    } else {
      this._applicationRef.attachView(embeddedViewRef);
      this._detachFn = () => this._applicationRef.detachView(embeddedViewRef);
    }
    embeddedViewRef.rootNodes.forEach((rootNode: Node) => this._element.appendChild(rootNode));
    return embeddedViewRef;
  }
}
