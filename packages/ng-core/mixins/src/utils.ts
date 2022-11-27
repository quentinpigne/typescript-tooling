import { ChangeDetectorRef, ElementRef } from '@angular/core';

import { HasChangeDetectorRef, HasElementRef } from './types';

export class EmptyClass {}

export class ClassWithChangeDetectorRef implements HasChangeDetectorRef {
  constructor(public _changeDetectorRef: ChangeDetectorRef) {}
}

export class ClassWithChangeDetectorRefAndElementRef implements HasChangeDetectorRef, HasElementRef {
  constructor(public _changeDetectorRef: ChangeDetectorRef, public _elementRef: ElementRef) {}
}
