import { Directive, HostBinding } from '@angular/core';

import { LabelCdk } from '@quentinpigne/ng-cdk/form-field';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ui-label',
  exportAs: 'uiLabel',
})
export class LabelDirective extends LabelCdk {
  @HostBinding('class') cssClass: string = 'ui-label';
}
