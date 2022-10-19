import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalOutletDirective } from './portal-directive';

@NgModule({
  imports: [CommonModule],
  declarations: [PortalOutletDirective],
  exports: [PortalOutletDirective],
})
export class PortalModule {}
