import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'ui-card-subtitle, [uiCardSubtitle]',
})
export class CardSubtitleDirective {
  @HostBinding('class') cssClass: string = 'ui-card-subtitle';
}
