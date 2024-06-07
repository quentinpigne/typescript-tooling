import {
  ContentChildren,
  Directive,
  forwardRef,
  HostBinding,
  InjectionToken,
  Provider,
  QueryList,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadioGroupCdk } from '@quentinpigne/ng-cdk/radio';

import { RadioButtonComponent } from './radio-button.component';

export const UI_RADIO_GROUP = new InjectionToken<RadioGroupDirective>('RadioGroupDirective');

export const UI_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroupDirective),
  multi: true,
};

@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ui-radio-group',
  exportAs: 'uiRadioGroup',
  providers: [UI_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, { provide: UI_RADIO_GROUP, useExisting: RadioGroupDirective }],
})
export class RadioGroupDirective extends RadioGroupCdk<RadioButtonComponent> {
  @HostBinding('class') cssClass: string = 'ui-radio-group';

  @ContentChildren(forwardRef(() => RadioButtonComponent), { descendants: true })
  override _radios: QueryList<RadioButtonComponent> | undefined = undefined;
}
