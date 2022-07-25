import { ChangeDetectorRef, Directive, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import {
  CanBeChecked,
  getUniqueComponentId,
  HasName,
  HasValue,
  mixinDisabled,
  mixinName,
  mixinRadioControlValueAccessor,
  mixinRequired,
  mixinValue,
} from '@quentinpigne/ng-core';

const _RadioGroupBase = mixinRadioControlValueAccessor(
  mixinDisabled(
    mixinName(
      mixinRequired(
        mixinValue(
          class {
            constructor(public _changeDetectorRef: ChangeDetectorRef) {}
          },
        ),
      ),
      getUniqueComponentId('cdk-radio-group'),
    ),
  ),
);

@Directive()
export abstract class RadioGroupCdk<T extends CanBeChecked & HasName & HasValue<unknown> & { markForCheck: () => void }>
  extends _RadioGroupBase
  implements ControlValueAccessor
{
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
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }
}
