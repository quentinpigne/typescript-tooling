import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  InjectionToken,
  Provider,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { Select, SelectCdk } from '@quentinpigne/ng-cdk/select';

export const UI_SELECT = new InjectionToken<SelectComponent>('SelectComponent');

export const UI_SELECT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};

@Component({
  standalone: true,
  selector: 'ui-select',
  exportAs: 'uiSelect',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [UI_SELECT_CONTROL_VALUE_ACCESSOR, { provide: UI_SELECT, useExisting: SelectComponent }],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends SelectCdk implements Select {
  @HostBinding('class') cssClass: string = 'ui-select';

  @ViewChild('select') selectElementRef!: ElementRef;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  onChange(): void {
    const selectNativeElement = this.selectElementRef.nativeElement as HTMLSelectElement;
    this.value = selectNativeElement.value;
    this.selectionChange.emit(this.value);
    this._changeDetectorRef?.markForCheck();
  }
}
