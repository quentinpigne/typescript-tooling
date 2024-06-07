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

import { TemplatePortal } from '@quentinpigne/ng-core/portal';

@Component({
  standalone: true,
  selector: 'ui-tab',
  exportAs: 'uiTab',
  template: '<ng-template><ng-content></ng-content></ng-template>',
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
