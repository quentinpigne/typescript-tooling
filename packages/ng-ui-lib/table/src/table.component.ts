import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { Column } from './types/column';

import { TableHeadComponent } from './table-head/table-head.component';
import { TableBodyComponent } from './table-body/table-body.component';

@Component({
  standalone: true,
  selector: 'ui-table',
  exportAs: 'uiTable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableHeadComponent, TableBodyComponent],
})
export class TableComponent<DataType extends Record<string, unknown>> {
  @HostBinding('class') cssClass: string = 'ui-table';

  @Input() columns!: Array<Column>;

  @Input() data!: Array<DataType>;
}
