import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

type Context<T> = {
  $implicit?: T;
  ngVar?: T;
};

@Directive({
  standalone: true,
  selector: '[ngVar]',
})
export class VarDirective<T> {
  @Input()
  set ngVar(context: T) {
    this.context.$implicit = this.context.ngVar = context;

    if (!this.hasView) {
      this._viewContainerRef.createEmbeddedView(this._templateRef, this.context);
      this.hasView = true;
    }
  }

  private context: Context<T> = {
    $implicit: undefined,
    ngVar: undefined,
  };

  private hasView: boolean = false;

  constructor(
    private readonly _templateRef: TemplateRef<unknown>,
    private readonly _viewContainerRef: ViewContainerRef,
  ) {}
}
