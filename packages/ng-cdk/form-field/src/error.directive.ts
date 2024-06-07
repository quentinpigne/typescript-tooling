import { Directive } from '@angular/core';

const _ErrorBase = class {};

@Directive({
  standalone: true,
})
export class ErrorCdk extends _ErrorBase {}
