import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { Column } from '../types/column';

@Component({
  standalone: true,
  selector: 'tbody[ui-tbody]',
  exportAs: 'uiTableBody',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBodyComponent<DataType extends Record<string, unknown>> {
  @HostBinding('class') cssClass: string = 'ui-table-body';

  @Input() columns!: Array<Column>;

  @Input() data!: Array<DataType>;
}
