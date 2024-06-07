import { Directive, HostBinding } from '@angular/core';

import { ErrorCdk } from '@quentinpigne/ng-cdk/form-field';

@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ui-error',
  exportAs: 'uiError',
})
export class ErrorDirective extends ErrorCdk {
  @HostBinding('class') cssClass: string = 'ui-error';
}
