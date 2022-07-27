import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';

import { Constructor } from '@quentinpigne/ts-utils';
import {
  ClassWithChangeDetectorRef,
  getUniqueComponentId,
  mixinChecked,
  mixinDisabled,
  mixinName,
  mixinRequired,
  mixinValue,
} from '@quentinpigne/ng-core';

import { RadioButton, RadioButtonMixin, RadioGroup } from './types';

const _RadioButtonBase: Constructor<RadioButtonMixin> = mixinChecked(
  mixinDisabled(mixinName(mixinRequired(mixinValue()(ClassWithChangeDetectorRef)))),
);

@Directive({
  inputs: ['name'],
})
export abstract class RadioButtonCdk<T extends RadioGroup> extends _RadioButtonBase implements RadioButton {
  private _uniqueId: string = getUniqueComponentId('cdk-radio-button');

  @Input() id: string = this._uniqueId;

  get inputId(): string {
    return `${this.id || this._uniqueId}-input`;
  }

  @Input()
  override get checked(): boolean {
    return super.checked;
  }
  override set checked(newCheckedValue: boolean) {
    if (newCheckedValue !== super.checked) {
      super.checked = newCheckedValue;
      if (this._radioGroup) {
        const isSelected: boolean = this._radioGroup.value === this.value;
        if (newCheckedValue && !isSelected) {
          this._radioGroup.selected = this;
        } else if (!newCheckedValue && isSelected) {
          this._radioGroup.selected = undefined;
        }
      }
    }
  }

  @Input()
  override get value(): unknown {
    return super.value;
  }
  override set value(newValue: unknown) {
    if (newValue !== super.value) {
      super.value = newValue;
      if (this._radioGroup) {
        if (!this.checked) {
          this.checked = this._radioGroup.value === newValue;
        }
        if (this.checked) {
          this._radioGroup.selected = this;
        }
      }
    }
  }

  @Input()
  override get required(): boolean {
    return super.required || (this._radioGroup && this._radioGroup.required);
  }
  override set required(newRequiredValue: boolean) {
    super.disabled = newRequiredValue;
  }

  @Input()
  override get disabled(): boolean {
    return super.disabled || (this._radioGroup && this._radioGroup.disabled);
  }
  override set disabled(newDisabledValue: boolean) {
    super.disabled = newDisabledValue;
  }

  @Output() readonly change: EventEmitter<unknown> = new EventEmitter<unknown>();

  constructor(changeDetectorRef: ChangeDetectorRef, protected _radioGroup: T) {
    super(changeDetectorRef);
  }

  markForCheck(): void {
    this._changeDetectorRef?.markForCheck();
  }
}
