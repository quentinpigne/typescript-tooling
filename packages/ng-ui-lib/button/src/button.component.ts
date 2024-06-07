import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewEncapsulation } from '@angular/core';

import { ButtonCdk } from '@quentinpigne/ng-cdk/button';

@Component({
  standalone: true,
  selector: 'button[ui-button]',
  exportAs: 'uiButton',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends ButtonCdk('ui-button') {
  constructor(changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef) {
    super(changeDetectorRef, elementRef);
  }
}
