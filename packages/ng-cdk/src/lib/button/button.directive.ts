import { Directive } from '@angular/core';

import { mixinDisabled } from '@quentinpigne/ng-core';

const _ButtonBase = mixinDisabled(class {});

@Directive({
  inputs: ['disabled'],
  host: {
    '[attr.disabled]': 'disabled || null',
  }
})
export class ButtonCdk extends _ButtonBase {}
