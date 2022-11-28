import { Constructor } from '@quentinpigne/ts-utils/mixins';

import { HasCssClass, HasElementRef } from '../types';

export interface HasColor {
  color?: string;
  defaultColor?: string;
}

export function mixinColor(defaultColor?: string) {
  return function <TBase extends Constructor<HasCssClass & HasElementRef>>(Base: TBase): TBase & Constructor<HasColor> {
    return class Color extends Base {
      private _color?: string;
      defaultColor = defaultColor;

      get color(): string | undefined {
        return this._color;
      }

      set color(color: string | undefined) {
        color = color || this.defaultColor;

        if (color !== this.color) {
          if (this._color) {
            this._elementRef?.nativeElement.classList.remove(`${this.cssClass}-${this.color}`);
          }
          if (color && color !== '') {
            this._elementRef?.nativeElement.classList.add(`${this.cssClass}-${color}`);
          }

          this._color = color;
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
