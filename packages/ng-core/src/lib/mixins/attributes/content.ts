import { Constructor } from '@quentinpigne/ts-utils';

export interface HasContent<T> {
  content?: T;
}

export function mixinContent<T>() {
  return function <TBase extends Constructor>(Base: TBase): TBase & Constructor<HasContent<T>> {
    return class Content extends Base {
      private _content?: T;

      get content(): T | undefined {
        return this._content;
      }

      set content(content: T | undefined) {
        if (content !== this._content) {
          this._content = content;
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
