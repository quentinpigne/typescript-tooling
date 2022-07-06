import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CheckboxCdk } from '@quentinpigne/ng-cdk';

const UI_CHECKBOX_VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => CheckboxComponent),
};

@Component({
  selector: 'ui-checkbox',
  exportAs: 'uiCheckbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  host: {
    '[id]': 'id',
    '[class.ui-checkbox-checked]': 'checked',
    '[class.ui-checkbox-disabled]': 'disabled',
  },
  providers: [UI_CHECKBOX_VALUE_ACCESSOR_PROVIDER],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends CheckboxCdk {
  @HostBinding('class') cssClass: string = 'ui-checkbox';

  onChange(event: Event): void {
    event.stopPropagation();
  }

  onInputClick(event: Event): void {
    event.stopPropagation();

    if (!this.disabled) {
      this.toggle();
      this._emitChangeEvent();
    }
  }
}
