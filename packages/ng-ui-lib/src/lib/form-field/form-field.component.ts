import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { FormFieldCdk } from '@quentinpigne/ng-cdk';

@Component({
  selector: 'ui-form-field',
  exportAs: 'uiFormField',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss', './form-field-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent extends FormFieldCdk {
  @HostBinding('class') cssClass: string = 'ui-form-field';
}
