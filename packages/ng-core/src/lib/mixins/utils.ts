import { ChangeDetectorRef } from '@angular/core';

export interface HasChangeDetectorRef {
  _changeDetectorRef?: ChangeDetectorRef;
}

export class ClassWithChangeDetectorRef implements HasChangeDetectorRef {
  constructor(public _changeDetectorRef: ChangeDetectorRef) {}
}

export class EmptyClass {}
