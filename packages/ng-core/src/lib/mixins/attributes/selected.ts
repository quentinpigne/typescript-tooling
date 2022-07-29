import { Constructor } from '@quentinpigne/ts-utils';

import { HasChangeDetectorRef } from '../types';

export interface HasSelected<T> {
  selected?: T;
}

export function mixinSelected<T>() {
  return function <TBase extends Constructor<HasChangeDetectorRef>>(Base: TBase): TBase & Constructor<HasSelected<T>> {
    return class Selected extends Base {
      private _selected?: T;

      get selected(): T | undefined {
        return this._selected;
      }

      set selected(selected: T | undefined) {
        if (selected !== this.selected) {
          this._selected = selected;
          this._changeDetectorRef?.markForCheck();
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
