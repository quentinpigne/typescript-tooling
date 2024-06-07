import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'ui-card-footer, [uiCardFooter]',
})
export class CardFooterDirective {
  @HostBinding('class') cssClass = 'ui-card-footer';
}
