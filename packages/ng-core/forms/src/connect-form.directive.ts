/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, OnChanges } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[connectForm]',
  standalone: true,
})
export class ConnectFormDirective<T> implements OnChanges {
  @Input() hostComponent: any;

  @Input('connectForm') data?: T;

  @Input() customConnectFn?: (hostComponent: any, formGroup: FormGroup, data: T) => void;

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnChanges(): void {
    if (this.data) {
      if (this.customConnectFn) {
        this.customConnectFn(this.hostComponent, this.formGroupDirective.form, this.data);
      } else {
        this.formGroupDirective.form.patchValue(this.data);
      }
    } else {
      this.formGroupDirective.form.reset();
    }
    this.formGroupDirective.form.markAsPristine();
  }
}
