import { Constructor } from '@quentinpigne/ts-utils/mixins';

export interface HasName {
  name?: string;
}

export function mixinName(initialName?: string) {
  return function <TBase extends Constructor>(Base: TBase): TBase & Constructor<HasName> {
    return class Name extends Base {
      private _name?: string = initialName;

      get name(): string | undefined {
        return this._name;
      }

      set name(name: string | undefined) {
        this._name = name;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(...args: any[]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        super(...args);
      }
    };
  };
}
