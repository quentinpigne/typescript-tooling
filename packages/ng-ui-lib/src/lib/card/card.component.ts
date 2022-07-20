import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { NG_CONTENT_TEMPLATE } from '@quentinpigne/ng-cdk';

@Component({
  selector: 'ui-card',
  exportAs: 'uiCard',
  template: NG_CONTENT_TEMPLATE,
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @HostBinding('class') cssClass: string = 'ui-card';
}
