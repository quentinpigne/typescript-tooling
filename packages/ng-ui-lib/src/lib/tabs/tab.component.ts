import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

import { NG_TEMPLATED_CONTENT } from '@quentinpigne/ng-cdk';
import { TemplatePortal } from '@quentinpigne/ng-core';

@Component({
  selector: 'ui-tab',
  exportAs: 'uiTab',
  template: NG_TEMPLATED_CONTENT,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit {
  @HostBinding('class') cssClass: string = 'ui-tab';

  @Input() label!: string;

  @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<undefined>;

  private _contentPortal: TemplatePortal | null = null;

  get contentPortal(): TemplatePortal | null {
    return this._contentPortal;
  }

  constructor(private readonly viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this._contentPortal = new TemplatePortal(this.content, this.viewContainerRef);
  }
}
