import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-progress-spinner',
  exportAs: 'uiProgressSpinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerComponent {
  @HostBinding('class') cssClass: string = 'ui-progress-spinner';

  diameter: number = 100;
  strokeWidth: number = 10;

  @HostBinding('style.width.px') hostWidth: number = this.diameter;
  @HostBinding('style.height.px') hostHeight: number = this.diameter;

  getCircleRadius(): number {
    return (this.diameter - this.strokeWidth) / 2;
  }

  getViewBox(): string {
    const viewBoxSize: number = this.getCircleRadius() * 2 + this.strokeWidth;
    return `0 0 ${viewBoxSize} ${viewBoxSize}`;
  }

  getStrokeDashArray(): number[] {
    return [200];
  }
}
