import { HasContent } from '@quentinpigne/ng-core/mixins';

export type BadgeContent = string | number | undefined | null;

export type BadgePosition =
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom';

export type BadgePositionAttr = { isTop: boolean; isBottom: boolean; isRight: boolean; isLeft: boolean };

export type Badge = HasContent<BadgeContent> & BadgePositionAttr;
