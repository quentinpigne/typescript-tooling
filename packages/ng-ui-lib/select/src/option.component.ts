import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Optional,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { Option, OptionCdk } from '@quentinpigne/ng-cdk/select';

import { SelectComponent, UI_SELECT } from './select.component';

@Component({
  standalone: true,
  selector: 'ui-option',
  exportAs: 'uiOption',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent extends OptionCdk implements AfterViewInit, Option {
  @HostBinding('class') cssClass: string = 'ui-option';

  constructor(
    @Optional() @Inject(UI_SELECT) select: SelectComponent,
    changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    super(changeDetectorRef, select);
  }

  ngAfterViewInit(): void {
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    const parent = this.renderer.parentNode(hostElement) as HTMLElement;

    while (hostElement.firstChild) {
      this.renderer.appendChild(parent, hostElement.firstChild);
    }
    this.renderer.removeChild(parent, hostElement, true);
  }
}
