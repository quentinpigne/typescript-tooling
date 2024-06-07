import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';

import { PortalOutletDirective } from '@quentinpigne/ng-core/portal';

import { TabComponent } from './tab.component';

@Component({
  standalone: true,
  selector: 'ui-tab-group',
  exportAs: 'uiTabGroup',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PortalOutletDirective],
})
export class TabGroupComponent implements AfterContentChecked {
  @HostBinding('class') cssClass: string = 'ui-tab-group';

  _indexToSelect: number = 0;

  @Input()
  get selectedIndex(): number {
    return this._selectedIndex;
  }
  set selectedIndex(newIndex: number) {
    this._indexToSelect = newIndex;
  }
  private _selectedIndex!: number;

  selectedTab!: TabComponent;

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.changeTab(this._indexToSelect);
    this._changeDetectorRef.markForCheck();
  }

  changeTab(index: number): void {
    const selectedTab: TabComponent | undefined = this.tabs?.get(index);
    if (selectedTab) {
      if (this._selectedIndex != index) this._selectedIndex = index;
      this.selectedTab = selectedTab;
    }
  }
}
