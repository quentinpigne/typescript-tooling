import {
  CanBeDisabled,
  HasChangeDetectorRef,
  HasColor,
  HasCssClass,
  HasElementRef,
} from '@quentinpigne/ng-core/mixins';

export type Button<ColorPalette extends string = string> = CanBeDisabled &
  HasChangeDetectorRef &
  HasColor<ColorPalette> &
  HasCssClass &
  HasElementRef;
