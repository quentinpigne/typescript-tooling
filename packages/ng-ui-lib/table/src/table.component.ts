import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { Column } from './types/column';

@Component({
  selector: 'ui-table',
  exportAs: 'uiTable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<DataType> {
  @HostBinding('class') cssClass: string = 'ui-table';

  @Input() columns!: Array<Column>;

  @Input() data!: Array<DataType>;
}
