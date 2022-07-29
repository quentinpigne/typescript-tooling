import { ChangeDetectorRef } from '@angular/core';

import { HasChangeDetectorRef } from './types';

export class EmptyClass {}

export class ClassWithChangeDetectorRef implements HasChangeDetectorRef {
  constructor(public _changeDetectorRef: ChangeDetectorRef) {}
}
