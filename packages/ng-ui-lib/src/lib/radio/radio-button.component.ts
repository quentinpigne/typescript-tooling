import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { getUniqueComponentId } from '@quentinpigne/ng-core';

import { RadioGroupDirective, UI_RADIO_GROUP } from './radio-group.directive';

@Component({
  selector: 'ui-radio-button',
  exportAs: 'uiRadioButton',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent implements OnInit {
  @HostBinding('class') cssClass: string = 'ui-radio-button';

  private _uniqueId: string = getUniqueComponentId('ui-radio-button');

  @Input()
  @HostBinding('attr.id')
  id: string = this._uniqueId;

  get inputId(): string {
    return `${this.id || this._uniqueId}-input`;
  }

  @Input() name: string | undefined;

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(newCheckedValue: boolean) {
    if (this._checked !== newCheckedValue) {
      this._checked = newCheckedValue;
      if (this._radioGroup) {
        const isSelected: boolean = this._radioGroup.value === this.value;
        if (newCheckedValue && !isSelected) {
          this._radioGroup.selected = this;
        } else if (!newCheckedValue && isSelected) {
          this._radioGroup.selected = null;
        }
      }
    }
    this._changeDetectorRef.markForCheck();
  }
  private _checked: boolean = false;

  @Input()
  get value(): unknown {
    return this._value;
  }
  set value(newValue: unknown) {
    if (this._value !== newValue) {
      this._value = newValue;
      if (this._radioGroup) {
        if (!this.checked) {
          this.checked = this._radioGroup.value === newValue;
        }
        if (this.checked) {
          this._radioGroup.selected = this;
        }
      }
    }
  }
  private _value: unknown = null;

  @Input()
  get disabled(): boolean {
    return this._disabled || this._radioGroup?.disabled;
  }
  set disabled(newDisabledValue: boolean) {
    if (this._disabled !== newDisabledValue) {
      this._disabled = newDisabledValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _disabled: boolean = false;

  @Input()
  get required(): boolean {
    return this._required || this._radioGroup?.required;
  }
  set required(newRequiredValue: boolean) {
    if (this._required !== newRequiredValue) {
      this._required = newRequiredValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _required: boolean = false;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() readonly change: EventEmitter<unknown> = new EventEmitter<unknown>();

  private _radioGroup: RadioGroupDirective;

  constructor(
    @Optional() @Inject(UI_RADIO_GROUP) radioGroup: RadioGroupDirective,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this._radioGroup = radioGroup;
  }

  ngOnInit(): void {
    if (this._radioGroup) {
      this.checked = this._radioGroup.value === this.value;
      if (this.checked) {
        this._radioGroup.selected = this;
      }
      this.name = this._radioGroup.name;
    }
  }

  markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }

  onChange(event: Event): void {
    event.stopPropagation();
  }

  onInputClick(event: Event): void {
    event.stopPropagation();

    if (!this.checked && !this.disabled) {
      this.checked = true;
      this.change.emit(this.value);

      if (this._radioGroup) {
        this._radioGroup._controlValueAccessorChangeFn(this.value);

        const groupValueChanged = this.value !== this._radioGroup.value;
        if (groupValueChanged) {
          this._radioGroup.change.emit(this._radioGroup.value);
        }
      }
    }
  }
}
