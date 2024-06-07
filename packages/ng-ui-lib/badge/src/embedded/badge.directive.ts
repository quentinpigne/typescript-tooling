import { Directive, HostBinding, OnInit } from '@angular/core';

import { BadgeCdk } from '@quentinpigne/ng-cdk/badge';

const BADGE_CLASS: string = 'ui-badge';

@Directive({
  standalone: true,
  selector: '[uiBadge]',
  exportAs: 'uiBadge',
  inputs: ['position: uiBadgePosition', 'content: uiBadge'],
  host: {
    '[class.ui-badge-top]': 'isTop',
    '[class.ui-badge-bottom]': 'isBottom',
    '[class.ui-badge-right]': 'isRight',
    '[class.ui-badge-left]': 'isLeft',
  },
})
export class BadgeDirective extends BadgeCdk implements OnInit {
  @HostBinding('class') cssClass: string = `${BADGE_CLASS}-host`;

  ngOnInit(): void {
    if (!this._badgeElement) {
      this._badgeElement = this.createBadgeElement(BADGE_CLASS);
      this.updateBadgeElement(this.content);
    }
  }
}
