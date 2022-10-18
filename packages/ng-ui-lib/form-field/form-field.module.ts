import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldComponent } from './form-field.component';
import { ErrorDirective } from './error.directive';
import { HintDirective } from './hint.directive';
import { LabelDirective } from './label.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ErrorDirective, FormFieldComponent, HintDirective, LabelDirective],
  exports: [ErrorDirective, FormFieldComponent, HintDirective, LabelDirective],
})
export class FormFieldModule {}
