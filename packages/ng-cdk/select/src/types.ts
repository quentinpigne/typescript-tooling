import {
  CanBeDisabled,
  CanBeRequired,
  HasChangeDetectorRef,
  HasSelected,
  HasValue,
  SelectControlValueAccessor,
} from '@quentinpigne/ng-core/mixins';

export type Option = CanBeDisabled & HasChangeDetectorRef & HasValue<unknown> & HasSelected<boolean>;

export type Select = CanBeDisabled &
  CanBeRequired &
  HasChangeDetectorRef &
  HasValue<unknown> &
  SelectControlValueAccessor;
