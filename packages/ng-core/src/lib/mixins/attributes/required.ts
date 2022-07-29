import { coerceBooleanValue, Constructor } from '@quentinpigne/ts-utils';

import { HasChangeDetectorRef } from '../types';

export interface CanBeRequired {
  required: boolean;
}

export function mixinRequired<TBase extends Constructor<HasChangeDetectorRef>>(
  Base: TBase,
): TBase & Constructor<CanBeRequired> {
  return class Required extends Base {
    private _required: boolean = false;

    get required(): boolean {
      return this._required;
    }

    set required(required: string | boolean | null) {
      if (required !== this.required) {
        this._required = coerceBooleanValue(required);
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
