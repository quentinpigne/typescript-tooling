import { ControlValueAccessor } from '@angular/forms';

import { Constructor } from '@quentinpigne/ts-utils';

import { HasChangeDetectorRefAndValueAndCanBeDisabled } from '../types';

export interface RadioControlValueAccessorAttr {
  _onTouched: () => void;
  _controlValueAccessorChangeFn: (value: unknown) => void;
}

export type RadioControlValueAccessor = RadioControlValueAccessorAttr & ControlValueAccessor;

export function mixinRadioControlValueAccessor<TBase extends Constructor<HasChangeDetectorRefAndValueAndCanBeDisabled>>(
  Base: TBase,
): TBase & Constructor<RadioControlValueAccessor> {
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
