import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { getUniqueComponentId, mixinDisabled } from '@quentinpigne/ng-core';

const _CheckboxBase = mixinDisabled(class {});

@Directive()
export class CheckboxCdk extends _CheckboxBase implements ControlValueAccessor {
  protected _uniqueId: string = getUniqueComponentId('ui-checkbox');

  @Input() id: string = this._uniqueId;

  get inputId(): string {
    return `${this.id || this._uniqueId}-input`;
  }

  @Input() name: string | null = null;

  @Input() required: boolean = false;

  @Input() value: string | null = null;

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    if (value !== this.checked) {
      this._checked = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _checked: boolean = false;

  @Input()
  override get disabled(): boolean {
    return super.disabled;
  }

  override set disabled(value: boolean) {
    if (value !== this.disabled) {
      super.disabled = value;
      this._changeDetectorRef.markForCheck();
    }
  }

  @Output() readonly change: EventEmitter<boolean> = new EventEmitter<boolean>();

  _onTouched: () => void = () => {};

  protected _controlValueAccessorChangeFn: (value: boolean) => void = () => {};

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  protected _emitChangeEvent() {
    this._controlValueAccessorChangeFn(this.checked);
    this.change.emit(this.checked);
  }

  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle(): void {
    this.checked = !this.checked;
  }
}
