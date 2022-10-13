import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';

import { Constructor } from '@quentinpigne/ts-utils/mixins';
import {
  ClassWithChangeDetectorRef,
  mixinDisabled,
  mixinRequired,
  mixinSelectControlValueAccessor,
  mixinValue,
} from '@quentinpigne/ng-core/mixins';

import { Select } from './types';

const _SelectBase: Constructor<Select> = mixinSelectControlValueAccessor(
  mixinDisabled(mixinRequired(mixinValue()(ClassWithChangeDetectorRef))),
);

@Directive({
  inputs: ['disabled', 'required'],
})
export abstract class SelectCdk extends _SelectBase implements Select {
  @Input()
  override get value(): unknown {
    return super.value;
  }
  override set value(newValue: unknown) {
    if (newValue !== super.value) {
      super.value = newValue;
      this._controlValueAccessorChangeFn(super.value);
    }
  }

  @Output() readonly selectionChange: EventEmitter<unknown> = new EventEmitter<unknown>();

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }
}
