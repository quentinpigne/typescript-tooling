import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'ui-card-content, [uiCardContent]',
})
export class CardContentDirective {
  @HostBinding('class') cssClass: string = 'ui-card-content';
}
