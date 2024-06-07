import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';

export type ProgressBarMode = 'determinate' | 'indeterminate';

@Component({
  standalone: true,
  selector: 'ui-progress-bar',
  exportAs: 'uiProgressBar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class ProgressBarComponent {
  @Input() value?: number;

  @Input() showValue: boolean = true;

  @Input() unit: string = '%';

  @Input() mode?: ProgressBarMode = 'determinate';
}
