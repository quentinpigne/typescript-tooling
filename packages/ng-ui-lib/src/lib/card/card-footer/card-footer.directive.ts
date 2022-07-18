import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ui-card-footer, [uiCardFooter]',
})
export class CardFooterDirective {
  @HostBinding('class') cssClass = 'ui-card-footer';
}
