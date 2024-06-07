import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { PanelComponent } from '@quentinpigne/ng-cdk/panel';

@Component({
  standalone: true,
  selector: 'ui-card',
  exportAs: 'uiCard',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelComponent],
})
export class CardComponent {
  @HostBinding('class') cssClass: string = 'ui-card';
}
