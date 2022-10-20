import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { BadgeCdk } from '@quentinpigne/ng-cdk/badge';

@Component({
  selector: 'ui-badge',
  exportAs: 'uiBadge',
  template: `<span>{{ content }}</span>`,
  inputs: ['content'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent extends BadgeCdk {
  @HostBinding('class') cssClass: string = 'ui-badge';
}
