import { Directive } from '@angular/core';

import {
  ClassWithChangeDetectorRefAndElementRef,
  mixinColor,
  mixinCssClass,
  mixinDisabled,
} from '@quentinpigne/ng-core/mixins';
import { Constructor, MixinBuilder } from '@quentinpigne/ts-utils/mixins';

import { Button } from './types';

const _ButtonBase = <ColorPalette extends string>(
  cssClass: string,
  defaultColor?: ColorPalette,
): Constructor<Button<ColorPalette>> =>
  MixinBuilder.mix(ClassWithChangeDetectorRefAndElementRef).with(
    mixinCssClass(cssClass),
    mixinColor<ColorPalette>(defaultColor),
    mixinDisabled,
  );

export function ButtonCdk<ColorPalette extends string = string>(
  cssClass: string,
  defaultColor?: ColorPalette,
): Constructor<Button<ColorPalette>> {
  @Directive({
    standalone: true,
    inputs: ['color', 'disabled'],
    host: {
      '[attr.disabled]': 'disabled || null',
    },
  })
  class _ButtonCdk extends _ButtonBase<ColorPalette>(cssClass, defaultColor) implements Button<ColorPalette> {}

  return _ButtonCdk;
}
