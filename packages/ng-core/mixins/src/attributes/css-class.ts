import { Directive, HostBinding } from '@angular/core';

import { Constructor } from '@quentinpigne/ts-utils/mixins';

import { HasCssClass } from '../types';

export function mixinCssClass<TBase extends Constructor>(
  Base: TBase,
  cssClass: string,
): TBase & Constructor<HasCssClass> {
  @Directive()
  class CssClassDirective extends Base {
    @HostBinding('class') cssClass: string = cssClass;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      super(...args);
    }
  }

  return CssClassDirective;
}
