import { Directive } from '@angular/core';

import {
  ClassWithChangeDetectorRefAndElementRef,
  mixinColor,
  mixinCssClass,
  mixinDisabled,
} from '@quentinpigne/ng-core/mixins';
import { Constructor } from '@quentinpigne/ts-utils/mixins';

import { Button } from './types';

const _ButtonBase = (cssClass: string): Constructor<Button> =>
  mixinColor(mixinDisabled(mixinCssClass(ClassWithChangeDetectorRefAndElementRef, cssClass)), 'primary');

export function ButtonCdk(cssClass: string): Constructor<Button> {
  @Directive({
    inputs: ['color', 'disabled'],
    host: {
      '[attr.disabled]': 'disabled || null',
    },
  })
  class _ButtonCdk extends _ButtonBase(cssClass) implements Button {}

  return _ButtonCdk;
}
