import { ComponentRef, Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  ComponentPortal,
  listenToTriggers,
  OverlayRef,
  OverlayService,
  RelativePosition,
  RelativePositionStrategy,
} from '@quentinpigne/ng-core';

import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[uiTooltip]',
  exportAs: 'uiTooltip',
})
export class TooltipDirective implements OnInit, OnDestroy {
  private _overlayRef!: OverlayRef;
  private _tooltipRef: ComponentRef<TooltipComponent> | null = null;
  private _triggersSubscription!: Subscription;

  @Input('uiTooltip')
  get content(): string {
    return this._content;
  }
  set content(newContent: string) {
    this._content = newContent != null ? String(newContent).trim() : '';
    this._updateTooltipContent();
  }
  private _content: string = '';

  @Input('uiTooltipPosition') position: RelativePosition = 'bottom';

  @Input('uiTooltipOpenDelay') openDelay: number = 0;

  @Input('uiTooltipCloseDelay') closeDelay: number = 0;

  constructor(
    private overlayService: OverlayService,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this._triggersSubscription = listenToTriggers(
      this.renderer,
      this.elementRef.nativeElement,
      this.isOpen.bind(this),
      this.open.bind(this),
      this.close.bind(this),
      this.openDelay,
      this.closeDelay,
    );
  }

  ngOnDestroy(): void {
    this._triggersSubscription.unsubscribe();
  }

  isOpen(): boolean {
    return this._tooltipRef !== null;
  }

  open() {
    const portal: ComponentPortal<TooltipComponent> = new ComponentPortal(TooltipComponent);
    this._overlayRef = this.overlayService.create({
      hasBackdrop: false,
      positionStrategy: new RelativePositionStrategy(this.elementRef.nativeElement).position(this.position),
    });
    this._tooltipRef = this._overlayRef.attach(portal);
    this._updateTooltipContent();
  }

  close() {
    this._overlayRef.detach();
    this._tooltipRef = null;
  }

  private _updateTooltipContent(): void {
    if (this._tooltipRef) {
      const tooltipInstance: TooltipComponent = this._tooltipRef.instance;
      tooltipInstance.content = this.content;
      tooltipInstance.markForCheck();
    }
  }
}
