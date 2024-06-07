import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EmbeddedViewRef,
  HostBinding,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { BasePortalOutlet, ComponentPortal, PortalOutletDirective, TemplatePortal } from '@quentinpigne/ng-core/portal';

@Component({
  standalone: true,
  selector: 'ui-modal-container',
  exportAs: 'uiModalContainer',
  template: `<ng-template ngPortalOutlet></ng-template>`,
  styleUrls: ['./modal-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PortalOutletDirective],
})
export class ModalContainerComponent extends BasePortalOutlet {
  @HostBinding('class') cssClass: string = 'ui-modal-container';

  @ViewChild(PortalOutletDirective, { static: true }) portalOutlet!: PortalOutletDirective;

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attach(portal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return this.portalOutlet.attach(portal);
  }
}
