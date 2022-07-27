import { ChangeDetectorRef, Directive, EventEmitter, Input, Output, QueryList } from '@angular/core';

import { Constructor } from '@quentinpigne/ts-utils';
import {
  ClassWithChangeDetectorRef,
  getUniqueComponentId,
  mixinDisabled,
  mixinName,
  mixinRadioControlValueAccessor,
  mixinRequired,
  mixinSelected,
  mixinValue,
} from '@quentinpigne/ng-core';

import { RadioButton, RadioGroup } from './types';

const _RadioGroupBase: Constructor<RadioGroup> = mixinRadioControlValueAccessor(
  mixinDisabled(
    mixinName(
      mixinRequired(mixinSelected<RadioButton>()(mixinValue()(ClassWithChangeDetectorRef))),
      getUniqueComponentId('cdk-radio-group'),
    ),
  ),
);

@Directive()
export abstract class RadioGroupCdk<T extends RadioButton> extends _RadioGroupBase implements RadioGroup {
  protected _radios: QueryList<T> | undefined;

  @Input()
  override get name(): string | undefined {
    return super.name;
  }
  override set name(newName: string | undefined) {
    if (newName !== super.name) {
      super.name = newName;
      this._updateRadioButtonNames();
    }
  }

  @Input()
  override get value(): unknown {
    return super.value;
  }
  override set value(newValue: unknown) {
    if (newValue !== super.value) {
      super.value = newValue;
      this._updateSelectedRadioFromValue();
    }
  }

  @Input()
  override get selected(): T | undefined {
    return super.selected as T;
  }
  override set selected(selected: T | undefined) {
    if (selected !== super.selected) {
      super.selected = selected;
      this.value = selected ? selected.value : null;
      this._checkSelectedRadioButton();
    }
  }

  @Input()
  override get disabled(): boolean {
    return super.disabled;
  }
  override set disabled(newDisabledValue: boolean) {
    if (newDisabledValue !== this.disabled) {
      super.disabled = newDisabledValue;
      this._radios?.forEach((radio: T) => radio.markForCheck());
    }
  }

  @Input()
  override get required(): boolean {
    return super.required;
  }
  override set required(newRequiredValue: boolean) {
    if (newRequiredValue !== super.required) {
      super.required = newRequiredValue;
      this._radios?.forEach((radio: T) => radio.markForCheck());
    }
  }

  @Output() readonly change: EventEmitter<unknown> = new EventEmitter<unknown>();

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  private _updateRadioButtonNames(): void {
    this._radios?.forEach((radio: T) => {
      radio.name = this.name;
      radio.markForCheck();
    });
  }

  private _updateSelectedRadioFromValue(): void {
    this._radios?.forEach((radio: T) => {
      radio.checked = this.value === radio.value;
    });
  }

  private _checkSelectedRadioButton() {
    if (this.selected && !this.selected.checked) {
      this.selected.checked = true;
    }
  }
}
