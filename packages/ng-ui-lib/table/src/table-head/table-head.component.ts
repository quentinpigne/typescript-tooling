import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { Column } from '../types/column';

@Component({
  standalone: true,
  selector: 'thead[ui-thead]',
  exportAs: 'uiTableHead',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeadComponent {
  @HostBinding('class') cssClass: string = 'ui-table-head';

  @Input() columns!: Array<Column>;
}
