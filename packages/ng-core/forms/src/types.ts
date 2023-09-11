/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

import { NonUndefined } from '@quentinpigne/ts-utils/types';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: NonUndefined<T[K]> extends AbstractControl
    ? T[K]
    : NonUndefined<T[K]> extends (infer R extends AbstractControl<any, any>)[]
    ? FormArray<R>
    : NonUndefined<T[K]> extends Record<any, any>
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};

export type ValuesOf<T extends ControlsOf<any>> = {
  [K in keyof T]: NonUndefined<T[K]> extends FormControl<infer R>
    ? R
    : NonUndefined<T[K]> extends FormGroup<infer R>
    ? ValuesOf<R>
    : NonUndefined<T[K]> extends FormArray<infer R extends AbstractControl<any, any>>
    ? R extends Record<any, any>
      ? ValuesOf<ControlsOf<R>>[]
      : R[]
    : NonUndefined<T[K]>;
};
