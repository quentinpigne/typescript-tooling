import { Constructor } from '@quentinpigne/ts-utils';

export interface HasValue<T> {
  value?: T;
}

export function mixinValue<T>() {
  return function <TBase extends Constructor>(Base: TBase): TBase & Constructor<HasValue<T>> {
    return class Value extends Base {
      private _value?: T;

      get value(): T | undefined {
        return this._value;
      }

      set value(value: T | undefined) {
        if (value !== this.value) {
          this._value = value;
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(...args: any[]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        super(...args);
      }
    };
  };
}
