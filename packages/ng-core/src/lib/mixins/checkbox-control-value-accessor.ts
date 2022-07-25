import { ControlValueAccessor } from '@angular/forms';

import { Constructor } from '@quentinpigne/ts-utils';

import { CanBeChecked } from './checked';
import { CanBeDisabled } from './disabled';

export interface CheckboxControlValueAccessorAttr {
  _onTouched: () => void;
  _controlValueAccessorChangeFn: (value: boolean) => void;
}

export function mixinCheckboxControlValueAccessor<TBase extends Constructor<CanBeChecked & CanBeDisabled>>(
  Base: TBase,
): TBase & Constructor<CheckboxControlValueAccessorAttr & ControlValueAccessor> {
  return class CheckboxControlValueAccessorImpl extends Base implements ControlValueAccessor {
    _onTouched: () => void = () => {};

    _controlValueAccessorChangeFn: (value: boolean) => void = () => {};

    writeValue(value: boolean): void {
      this.checked = !!value;
    }

    registerOnChange(fn: (value: boolean) => void): void {
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
