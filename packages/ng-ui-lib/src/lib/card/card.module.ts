import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from '@quentinpigne/ng-cdk/panel';

import { CardComponent } from './card.component';
import { CardContentDirective } from './card-content/card-content.directive';
import { CardFooterDirective } from './card-footer/card-footer.directive';
import { CardSubtitleDirective } from './card-subtitle/card-subtitle.directive';
import { CardTitleDirective } from './card-title/card-title.directive';

@NgModule({
  imports: [CommonModule, PanelModule],
  declarations: [CardComponent, CardContentDirective, CardFooterDirective, CardSubtitleDirective, CardTitleDirective],
  exports: [CardComponent, CardContentDirective, CardFooterDirective, CardSubtitleDirective, CardTitleDirective],
})
export class CardModule {}
