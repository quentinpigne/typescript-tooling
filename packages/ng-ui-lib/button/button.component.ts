import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { ButtonCdk } from '@quentinpigne/ng-cdk/button';

@Component({
  selector: 'button[ui-button]',
  exportAs: 'uiButton',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends ButtonCdk {
  @HostBinding('class') cssClass: string = 'ui-button';
}
