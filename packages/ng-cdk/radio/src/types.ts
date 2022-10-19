import {
  CanBeChecked,
  CanBeDisabled,
  CanBeRequired,
  HasChangeDetectorRef,
  HasName,
  HasSelected,
  HasValue,
  RadioControlValueAccessor,
} from '@quentinpigne/ng-core/mixins';

export type RadioButtonMixin = CanBeChecked &
  CanBeDisabled &
  CanBeRequired &
  HasChangeDetectorRef &
  HasName &
  HasValue<unknown>;

export type RadioButton = RadioButtonMixin & { markForCheck: () => void };

export type RadioGroup = RadioControlValueAccessor &
  CanBeDisabled &
  CanBeRequired &
  HasName &
  HasSelected<RadioButton> &
  HasValue<unknown>;
