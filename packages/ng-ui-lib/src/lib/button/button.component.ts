import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { ButtonBase } from '@quentinpigne/ng-cdk';

@Component({
  selector: 'button[ui-button]',
  exportAs: 'uiButton',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends ButtonBase {
  @HostBinding('class') cssClass: string = 'ui-button';
}
