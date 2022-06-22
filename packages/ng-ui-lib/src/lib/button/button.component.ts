import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[ui-button]',
  exportAs: 'uiButton',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @HostBinding('class') cssClass: string = 'ui-button';

  @Input()
  @HostBinding('disabled')
  disabled: boolean = false;
}
