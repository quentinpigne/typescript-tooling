import { Constructor } from '@quentinpigne/ts-utils/mixins';

import { HasCssClass, HasElementRef } from '../types';

export interface HasColor<ColorPalette extends string = string> {
  color?: ColorPalette;
  defaultColor?: ColorPalette;
}

export function mixinColor<ColorPalette extends string = string>(defaultColor?: ColorPalette) {
  return function <TBase extends Constructor<HasCssClass & HasElementRef>>(
    Base: TBase,
  ): TBase & Constructor<HasColor<ColorPalette>> {
    return class Color extends Base {
      private _color?: ColorPalette;
      defaultColor = defaultColor;

      get color(): ColorPalette | undefined {
        return this._color;
      }

      set color(newColor: ColorPalette | undefined) {
        const colorToSet: ColorPalette | undefined = newColor || this.defaultColor;

        if (colorToSet !== this.color) {
          if (this._color) {
            this._elementRef?.nativeElement.classList.remove(`${this.cssClass}-${this.color}`);
          }
          if (colorToSet && colorToSet !== '') {
            this._elementRef?.nativeElement.classList.add(`${this.cssClass}-${colorToSet}`);
          }

          this._color = colorToSet;
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
