import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { TableBodyComponent } from './table-body/table-body.component';
import { TableHeadComponent } from './table-head/table-head.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TableComponent, TableBodyComponent, TableHeadComponent],
  exports: [TableComponent, TableBodyComponent, TableHeadComponent],
})
export class TableModule {}
