import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-tooltip',
  template: `<div class="tooltip-container">{{ content }}</div>`,
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  content: string | undefined;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }
}
