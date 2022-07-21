import {
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  EventEmitter,
  forwardRef,
  HostBinding,
  InjectionToken,
  Input,
  Output,
  Provider,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { getUniqueComponentId } from '@quentinpigne/ng-core';

import { RadioButtonComponent } from './radio-button.component';

export const UI_RADIO_GROUP = new InjectionToken<RadioGroupDirective>('RadioGroupDirective');

export const UI_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroupDirective),
  multi: true,
};

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ui-radio-group',
  exportAs: 'uiRadioGroup',
  providers: [UI_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, { provide: UI_RADIO_GROUP, useExisting: RadioGroupDirective }],
})
export class RadioGroupDirective implements ControlValueAccessor {
  @HostBinding('class') cssClass: string = 'ui-radio-group';

  @Input()
  get name(): string {
    return this._name;
  }
  set name(newName: string) {
    this._name = newName;
    this._updateRadioButtonNames();
  }
  private _name: string = getUniqueComponentId('ui-radio-group');

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
  get selected(): RadioButtonComponent | null {
    return this._selected;
  }
  set selected(selected: RadioButtonComponent | null) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }
  private _selected: RadioButtonComponent | null = null;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(newDisabledValue: boolean) {
    this._disabled = newDisabledValue;
    this._radios?.forEach((radio: RadioButtonComponent) => radio.markForCheck());
  }
  private _disabled: boolean = false;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(newRequiredValue: boolean) {
    this._required = newRequiredValue;
    this._radios?.forEach((radio: RadioButtonComponent) => radio.markForCheck());
  }
  private _required: boolean = false;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() readonly change: EventEmitter<unknown> = new EventEmitter<unknown>();

  @ContentChildren(forwardRef(() => RadioButtonComponent), { descendants: true })
  private _radios: QueryList<RadioButtonComponent> | undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _controlValueAccessorChangeFn: (value: unknown) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouched: () => unknown = () => {};

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  private _updateRadioButtonNames(): void {
    this._radios?.forEach((radio: RadioButtonComponent) => {
      radio.name = this.name;
      radio.markForCheck();
    });
  }

  private _updateSelectedRadioFromValue(): void {
    this._radios?.forEach((radio: RadioButtonComponent) => {
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
