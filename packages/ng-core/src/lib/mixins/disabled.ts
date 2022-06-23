import { Constructor } from '@quentinpigne/ts-utils';

export interface CanBeDisabled {
  disabled: boolean;
}

export function mixinDisabled<TBase extends Constructor>(Base: TBase): TBase & Constructor<CanBeDisabled> {
  return class Disabled extends Base {
    private _disabled: boolean = false;

    get disabled(): boolean {
      return this._disabled;
    }

    set disabled(disabled: boolean) {
      this._disabled = disabled;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      super(...args);
    }
  };
}
