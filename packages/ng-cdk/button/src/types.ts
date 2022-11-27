import {
  CanBeDisabled,
  HasChangeDetectorRef,
  HasColor,
  HasCssClass,
  HasElementRef,
} from '@quentinpigne/ng-core/mixins';

export type Button = CanBeDisabled & HasChangeDetectorRef & HasColor & HasCssClass & HasElementRef;
