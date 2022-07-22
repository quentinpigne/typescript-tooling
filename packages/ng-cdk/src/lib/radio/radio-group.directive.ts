import { ChangeDetectorRef, Directive, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { CanBeDisabled, getUniqueComponentId, mixinDisabled } from '@quentinpigne/ng-core';

const _RadioGroupBase = mixinDisabled(class {});

@Directive()
export abstract class RadioGroupCdk<
    T extends { checked: boolean; value: unknown; name: string | undefined; markForCheck: () => void },
  >
  extends _RadioGroupBase
  implements CanBeDisabled, ControlValueAccessor
{
  protected _radios: QueryList<T> | undefined;

  @Input()
  get name(): string {
    return this._name;
  }
  set name(newName: string) {
    this._name = newName;
    this._updateRadioButtonNames();
  }
  private _name: string = getUniqueComponentId('cdk-radio-group');

  @Input()
  get value(): unknown {
    return this._value;
  }
  set value(newValue: unknown) {
    if (this._value !== newValue) {
      this._value = newValue;
      this._updateSelectedRadioFromValue();
    }
  }
  private _value: unknown;

  @Input()
  get selected(): T | null {
    return this._selected;
  }
  set selected(selected: T | null) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }
  private _selected: T | null = null;

  @Input()
  override get disabled(): boolean {
    return this._disabled;
  }
  override set disabled(newDisabledValue: boolean) {
    this._disabled = newDisabledValue;
    this._radios?.forEach((radio: T) => radio.markForCheck());
  }
  private _disabled: boolean = false;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(newRequiredValue: boolean) {
    this._required = newRequiredValue;
    this._radios?.forEach((radio: T) => radio.markForCheck());
  }
  private _required: boolean = false;

  @Output() readonly change: EventEmitter<unknown> = new EventEmitter<unknown>();

  _controlValueAccessorChangeFn: (value: unknown) => void = () => {};

  _onTouched: () => unknown = () => {};

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  private _updateRadioButtonNames(): void {
    this._radios?.forEach((radio: T) => {
      radio.name = this.name;
      radio.markForCheck();
    });
  }

  private _updateSelectedRadioFromValue(): void {
    this._radios?.forEach((radio: T) => {
      radio.checked = this._value === radio.value;
    });
  }

  private _checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }

  writeValue(value: unknown): void {
    this.value = value;
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: () => unknown): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }
}
