import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './standalone/badge.component';
import { BadgeDirective } from './embedded/badge.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [BadgeComponent, BadgeDirective],
  exports: [BadgeComponent, BadgeDirective],
})
export class BadgeModule {}
