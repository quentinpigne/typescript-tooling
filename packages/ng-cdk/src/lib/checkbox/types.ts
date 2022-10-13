import {
  CanBeChecked,
  CanBeDisabled,
  CanBeRequired,
  CheckboxControlValueAccessor,
  HasName,
  HasValue,
} from '@quentinpigne/ng-core/mixins';

export type Checkbox = CheckboxControlValueAccessor &
  CanBeChecked &
  CanBeDisabled &
  HasName &
  CanBeRequired &
  HasValue<string>;
