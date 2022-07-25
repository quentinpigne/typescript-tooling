import { ControlValueAccessor } from '@angular/forms';

import { Constructor } from '@quentinpigne/ts-utils';

import { CanBeDisabled } from './disabled';
import { HasValue } from './value';
import { HasChangeDetectorRef } from './utils';

export interface RadioControlValueAccessorAttr {
  _onTouched: () => void;
  _controlValueAccessorChangeFn: (value: unknown) => void;
}

export function mixinRadioControlValueAccessor<
  TBase extends Constructor<CanBeDisabled & HasChangeDetectorRef & HasValue<unknown>>,
>(Base: TBase): TBase & Constructor<RadioControlValueAccessorAttr & ControlValueAccessor> {
  return class RadioControlValueAccessorImpl extends Base implements ControlValueAccessor {
    _onTouched: () => void = () => {};

    _controlValueAccessorChangeFn: (value: unknown) => void = () => {};

    writeValue(value: unknown): void {
      this.value = value;
      this._changeDetectorRef?.markForCheck();
    }

    registerOnChange(fn: (value: unknown) => void): void {
      this._controlValueAccessorChangeFn = fn;
    }

    registerOnTouched(fn: () => void): void {
      this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      super(...args);
    }
  };
}
