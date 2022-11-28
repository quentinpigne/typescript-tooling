import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';

import { Constructor, MixinBuilder } from '@quentinpigne/ts-utils/mixins';
import {
  ClassWithChangeDetectorRef,
  mixinCheckboxControlValueAccessor,
  mixinChecked,
  mixinDisabled,
  mixinName,
  mixinRequired,
  mixinValue,
} from '@quentinpigne/ng-core/mixins';
import { getUniqueComponentId } from '@quentinpigne/ng-core/utils';

import { Checkbox } from './types';

const _CheckboxBase: Constructor<Checkbox> = MixinBuilder.mix(ClassWithChangeDetectorRef).with(
  mixinValue<string>(),
  mixinRequired,
  mixinName(),
  mixinDisabled,
  mixinChecked,
  mixinCheckboxControlValueAccessor,
);

@Directive({
  inputs: ['checked', 'disabled', 'name', 'required', 'value'],
})
export class CheckboxCdk extends _CheckboxBase implements Checkbox {
  protected _uniqueId: string = getUniqueComponentId('ui-checkbox');

  @Input() id: string = this._uniqueId;

  get inputId(): string {
    return `${this.id || this._uniqueId}-input`;
  }

  @Output() readonly change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  protected _emitChangeEvent() {
    this._controlValueAccessorChangeFn(this.checked);
    this.change.emit(this.checked);
  }

  toggle(): void {
    this.checked = !this.checked;
  }
}
