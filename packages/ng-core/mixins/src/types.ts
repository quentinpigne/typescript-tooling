import { ChangeDetectorRef, ElementRef } from '@angular/core';

import { CanBeChecked, CanBeDisabled, HasValue } from './attributes';

export type HasChangeDetectorRef = {
  _changeDetectorRef?: ChangeDetectorRef;
};

export type HasCssClass = {
  cssClass: string;
};

export type HasElementRef = {
  _elementRef?: ElementRef;
};

export type CanBeCheckedAndDisabled = CanBeChecked & CanBeDisabled;

export type HasChangeDetectorRefAndValueAndCanBeDisabled = CanBeDisabled & HasChangeDetectorRef & HasValue<unknown>;
