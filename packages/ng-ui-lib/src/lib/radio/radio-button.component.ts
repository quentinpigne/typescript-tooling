import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';

import { RadioButtonCdk } from '@quentinpigne/ng-cdk/radio';

import { RadioGroupDirective, UI_RADIO_GROUP } from './radio-group.directive';

@Component({
  selector: 'ui-radio-button',
  exportAs: 'uiRadioButton',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  host: {
    '[id]': 'id',
    '[class.ui-radio-button-selected]': 'selected',
    '[class.ui-radio-button-disabled]': 'disabled',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent extends RadioButtonCdk<RadioGroupDirective> implements OnInit {
  @HostBinding('class') cssClass: string = 'ui-radio-button';

  constructor(
    @Optional() @Inject(UI_RADIO_GROUP) radioGroup: RadioGroupDirective,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(changeDetectorRef, radioGroup);
  }

  ngOnInit(): void {
    if (this._radioGroup) {
      this.checked = this._radioGroup.value === this.value;
      if (this.checked) {
        this._radioGroup.selected = this;
      }
      this.name = this._radioGroup.name;
    }
  }

  onChange(event: Event): void {
    event.stopPropagation();
  }

  onInputClick(event: Event): void {
    event.stopPropagation();

    if (!this.checked && !this.disabled) {
      this.checked = true;
      this.change.emit(this.value);

      if (this._radioGroup) {
        this._radioGroup._controlValueAccessorChangeFn(this.value);

        const groupValueChanged = this.value !== this._radioGroup.value;
        if (groupValueChanged) {
          this._radioGroup.change.emit(this._radioGroup.value);
        }
      }
    }
  }
}
