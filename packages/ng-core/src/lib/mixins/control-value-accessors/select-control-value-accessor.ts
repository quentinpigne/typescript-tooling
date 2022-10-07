import { ControlValueAccessor } from '@angular/forms';

import { Constructor } from '@quentinpigne/ts-utils/mixins';

import { HasChangeDetectorRefAndValueAndCanBeDisabled } from '../types';

export interface SelectControlValueAccessorAttr {
  _onTouched: () => void;
  _controlValueAccessorChangeFn: (value: unknown) => void;
}

export type SelectControlValueAccessor = SelectControlValueAccessorAttr & ControlValueAccessor;

export function mixinSelectControlValueAccessor<
  TBase extends Constructor<HasChangeDetectorRefAndValueAndCanBeDisabled>,
>(Base: TBase): TBase & Constructor<SelectControlValueAccessor> {
  return class SelectControlValueAccessorImpl extends Base implements ControlValueAccessor {
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
