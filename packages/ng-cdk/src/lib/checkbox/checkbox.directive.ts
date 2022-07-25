import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import {
  getUniqueComponentId,
  mixinCheckboxControlValueAccessor,
  mixinChecked,
  mixinDisabled,
  mixinName,
  mixinRequired,
  mixinValue,
} from '@quentinpigne/ng-core';

const _CheckboxBase = mixinCheckboxControlValueAccessor(
  mixinChecked(
    mixinDisabled(
      mixinName(
        mixinRequired(
          mixinValue(
            class {
              constructor(public _changeDetectorRef: ChangeDetectorRef) {}
            },
          ),
        ),
      ),
    ),
  ),
);

@Directive({
  inputs: ['checked', 'disabled', 'name', 'required', 'value'],
})
export class CheckboxCdk extends _CheckboxBase implements ControlValueAccessor {
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
    super._controlValueAccessorChangeFn(this.checked);
    this.change.emit(this.checked);
  }

  toggle(): void {
    this.checked = !this.checked;
  }
}
