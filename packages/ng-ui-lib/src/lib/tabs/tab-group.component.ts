import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';

import { TabComponent } from './tab.component';

@Component({
  selector: 'ui-tab-group',
  exportAs: 'uiTabGroup',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent implements AfterContentInit {
  @HostBinding('class') cssClass: string = 'ui-tab-group';

  @Input()
  get selectedIndex(): number {
    return this._selectedIndex;
  }
  set selectedIndex(newIndex: number) {
    if (this._selectedIndex !== newIndex) {
      this._selectedIndex = newIndex;
      this.changeTab(newIndex);
    }
  }
  private _selectedIndex: number = 0;

  selectedTab!: TabComponent;

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.changeTab(this._selectedIndex);
    this._changeDetectorRef.markForCheck();
  }

  changeTab(index: number): void {
    const selectedTab: TabComponent | undefined = this.tabs?.get(index);
    if (selectedTab) {
      this.selectedTab = selectedTab;
    }
  }
}
