import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { NG_CONTENT_TEMPLATE } from '../common';

@Component({
  selector: 'cdk-panel',
  exportAs: 'cdkPanel',
  template: NG_CONTENT_TEMPLATE,
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  @HostBinding('class') cssClass: string = 'cdk-panel';

  @Input()
  @HostBinding('class.cdk-panel-shadow')
  hasShadow: boolean = false;

  @Input()
  @HostBinding('class.cdk-panel-border')
  hasBorder: boolean = false;
}
