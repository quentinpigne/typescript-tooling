import { coerceBooleanValue } from '@quentinpigne/ts-utils/coercion';
import { Constructor } from '@quentinpigne/ts-utils/mixins';

import { HasChangeDetectorRef } from '../types';

export interface CanBeDisabled {
  disabled: boolean;
}

export function mixinDisabled<TBase extends Constructor<HasChangeDetectorRef>>(
  Base: TBase,
): TBase & Constructor<CanBeDisabled> {
  return class Disabled extends Base {
    private _disabled: boolean = false;

    get disabled(): boolean {
      return this._disabled;
    }

    set disabled(disabled: string | boolean | null) {
      if (disabled !== this.disabled) {
        this._disabled = coerceBooleanValue(disabled);
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
