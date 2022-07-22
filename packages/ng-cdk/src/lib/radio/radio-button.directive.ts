import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';

import { CanBeDisabled, getUniqueComponentId, mixinDisabled } from '@quentinpigne/ng-core';

const _RadioButtonBase = mixinDisabled(class {});

@Directive()
export abstract class RadioButtonCdk<
    T extends CanBeDisabled & { selected: RadioButtonCdk<T> | null; value: unknown; required: boolean },
  >
  extends _RadioButtonBase
  implements CanBeDisabled
{
  private _uniqueId: string = getUniqueComponentId('cdk-radio-button');

  @Input() id: string = this._uniqueId;

  get inputId(): string {
    return `${this.id || this._uniqueId}-input`;
  }

  @Input() name: string | undefined;

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(newCheckedValue: boolean) {
    if (this._checked !== newCheckedValue) {
      this._checked = newCheckedValue;
      if (this._radioGroup) {
        const isSelected: boolean = this._radioGroup.value === this.value;
        if (newCheckedValue && !isSelected) {
          this._radioGroup.selected = this;
        } else if (!newCheckedValue && isSelected) {
          this._radioGroup.selected = null;
        }
      }
    }
    this._changeDetectorRef.markForCheck();
  }
  private _checked: boolean = false;

  @Input()
  get value(): unknown {
    return this._value;
  }
  set value(newValue: unknown) {
    if (this._value !== newValue) {
      this._value = newValue;
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
  private _value: unknown = null;

  @Input()
  get required(): boolean {
    return this._required || (this._radioGroup && this._radioGroup.required);
  }
  set required(newRequiredValue: boolean) {
    if (this._required !== newRequiredValue) {
      this._required = newRequiredValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _required: boolean = false;

  @Input()
  override get disabled(): boolean {
    return super.disabled || (this._radioGroup && this._radioGroup.disabled);
  }
  override set disabled(newDisabledValue: boolean) {
    if (super.disabled !== newDisabledValue) {
      super.disabled = newDisabledValue;
      this._changeDetectorRef.markForCheck();
    }
  }

  @Output() readonly change: EventEmitter<unknown> = new EventEmitter<unknown>();

  constructor(protected _changeDetectorRef: ChangeDetectorRef, protected _radioGroup: T) {
    super();
  }

  markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }
}
