import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'ui-card-title, [uiCardTitle]',
})
export class CardTitleDirective {
  @HostBinding('class') cssClass: string = 'ui-card-title';
}
