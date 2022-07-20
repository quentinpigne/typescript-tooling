import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { ButtonCdk, NG_CONTENT_TEMPLATE } from '@quentinpigne/ng-cdk';

@Component({
  selector: 'button[ui-button]',
  exportAs: 'uiButton',
  template: NG_CONTENT_TEMPLATE,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends ButtonCdk {
  @HostBinding('class') cssClass: string = 'ui-button';
}
