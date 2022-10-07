import { coerceBooleanValue } from '@quentinpigne/ts-utils/coercion';
import { Constructor } from '@quentinpigne/ts-utils/mixins';

import { HasChangeDetectorRef } from '../types';

export interface CanBeChecked {
  checked: boolean;
}

export function mixinChecked<TBase extends Constructor<HasChangeDetectorRef>>(
  Base: TBase,
): TBase & Constructor<CanBeChecked> {
  return class Checked extends Base {
    private _checked: boolean = false;

    get checked(): boolean {
      return this._checked;
    }

    set checked(checked: string | boolean | null) {
      if (checked !== this.checked) {
        this._checked = coerceBooleanValue(checked);
        this._changeDetectorRef?.markForCheck();
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      super(...args);
    }
  };
}
