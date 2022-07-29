import { Constructor } from '@quentinpigne/ts-utils';

export interface HasName {
  name?: string;
}

export function mixinName<TBase extends Constructor>(Base: TBase, initialName?: string): TBase & Constructor<HasName> {
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
}
