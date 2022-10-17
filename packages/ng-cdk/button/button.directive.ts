import { Directive } from '@angular/core';

import { CanBeDisabled, mixinDisabled } from '@quentinpigne/ng-core/mixins';

const _ButtonBase = mixinDisabled(class {});

@Directive({
  inputs: ['disabled'],
  host: {
    '[attr.disabled]': 'disabled || null',
  },
})
export class ButtonCdk extends _ButtonBase implements CanBeDisabled {}
