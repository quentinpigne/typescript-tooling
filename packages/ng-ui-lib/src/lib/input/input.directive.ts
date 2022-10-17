import { Directive, HostBinding } from '@angular/core';

import { InputCdk } from '@quentinpigne/ng-cdk/input';

@Directive({
  selector: 'input[uiInput]',
  exportAs: 'uiInput',
})
export class InputDirective extends InputCdk {
  @HostBinding('class') cssClass: string = 'ui-input';
}
