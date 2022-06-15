import { ComponentRef, Directive, EmbeddedViewRef, Injector, Input, ViewContainerRef } from '@angular/core';

import { ComponentPortal, Portal, TemplatePortal } from './portal';
import { BasePortalOutlet } from './portal-outlet';

@Directive({
  selector: '[uiPortalOutlet]',
  exportAs: 'uiPortalOutlet',
})
export class PortalOutletDirective extends BasePortalOutlet {
  @Input('uiPortalOutlet')
  set portal(portal: Portal<unknown> | null | undefined | '') {
    if (portal) {
      this.detach();
      this.attach(portal);
    }
  }

  constructor(private readonly _injector: Injector, private readonly _viewContainerRef: ViewContainerRef) {
    super();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    const componentRef: ComponentRef<T> = this._viewContainerRef.createComponent(portal.componentType, {
      index: this._viewContainerRef.length,
      injector: portal.injector || this._injector,
    });
    this._detachFn = () => componentRef.destroy();
    return componentRef;
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    const embeddedViewRef: EmbeddedViewRef<C> = this._viewContainerRef.createEmbeddedView<C>(
      portal.templateRef,
      portal.context,
    );
    this._detachFn = () => {
      const index: number = this._viewContainerRef.indexOf(embeddedViewRef);
      this._viewContainerRef.remove(index);
    };
    return embeddedViewRef;
  }
}
