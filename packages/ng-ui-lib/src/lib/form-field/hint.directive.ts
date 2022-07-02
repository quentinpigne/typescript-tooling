import { Directive, HostBinding } from '@angular/core';

import { HintCdk } from '@quentinpigne/ng-cdk';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ui-hint',
  exportAs: 'uiHint',
})
export class HintDirective extends HintCdk {
  @HostBinding('class') cssClass: string = 'ui-hint';
}
