import { ChangeDetectorRef, Directive, Input, OnInit } from '@angular/core';

import { Constructor, MixinBuilder } from '@quentinpigne/ts-utils/mixins';
import { ClassWithChangeDetectorRef, mixinDisabled, mixinSelected, mixinValue } from '@quentinpigne/ng-core/mixins';

import { Option, Select } from './types';

const _OptionBase: Constructor<Option> = MixinBuilder.mix(ClassWithChangeDetectorRef).with(
  mixinSelected<boolean>(),
  mixinValue(),
  mixinDisabled,
);

@Directive({
  standalone: true,
  inputs: ['disabled', 'value'],
})
export abstract class OptionCdk extends _OptionBase implements OnInit, Option {
  @Input()
  override get selected(): boolean | undefined {
    return super.selected;
  }
  override set selected(selected: boolean | undefined) {
    if (selected !== super.selected) {
      super.selected = selected;
      if (this._select) {
        this._select.value = this.value;
      }
    }
  }

  constructor(changeDetectorRef: ChangeDetectorRef, protected _select: Select) {
    super(changeDetectorRef);
  }

  ngOnInit(): void {
    if (this._select && this._select.value === this.value) {
      this.selected = true;
    }
  }
}
