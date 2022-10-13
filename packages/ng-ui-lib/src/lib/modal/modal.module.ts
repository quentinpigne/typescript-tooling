import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalModule } from '@quentinpigne/ng-core/portal';

import { ModalContainerComponent } from './modal-container.component';

@NgModule({
  imports: [CommonModule, PortalModule],
  declarations: [ModalContainerComponent],
  exports: [],
})
export class ModalModule {}
