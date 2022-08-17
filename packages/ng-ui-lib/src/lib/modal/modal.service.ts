import { ComponentRef, Injectable, Injector, OnDestroy, StaticProvider, Type } from '@angular/core';

import { ComponentPortal, GlobalPositionStrategy, OverlayConfig, OverlayRef, OverlayService } from '@quentinpigne/ng-core';

import { ModalRef } from './modal-ref';
import { ModalConfig } from './modal-config';
import { ModalContainerComponent } from './modal-container.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService implements OnDestroy {
  private _openModal: ModalRef<unknown, unknown> | null = null;

  constructor(private readonly _injector: Injector, private readonly _overlayService: OverlayService) {}

  ngOnDestroy(): void {
    this._openModal?.close();
  }

  open<T, R>(componentType: Type<T>, config?: ModalConfig): ModalRef<T, R> {
    const overlayRef: OverlayRef = this._createOverlay(config);
    const modalContainer: ModalContainerComponent = this._attachModalContainer(overlayRef);
    const modalRef: ModalRef<T, R> = this._attachModal<T, R>(overlayRef, modalContainer, componentType);
    this._openModal = modalRef as ModalRef<unknown, unknown>;
    return modalRef;
  }

  private _createOverlay(config?: ModalConfig): OverlayRef {
    const overlayConfig: OverlayConfig = this._createOverlayConfig(config);
    return this._overlayService.create(overlayConfig);
  }

  private _createOverlayConfig(config?: ModalConfig): OverlayConfig {
    return {
      width: config?.width,
      height: config?.height,
      minWidth: config?.minWidth,
      minHeight: config?.minHeight,
      maxWidth: config?.maxWidth,
      maxHeight: config?.maxHeight,
      hasBackdrop: true,
      positionStrategy: new GlobalPositionStrategy(),
    };
  }

  private _attachModalContainer(overlayRef: OverlayRef): ModalContainerComponent {
    const portal: ComponentPortal<ModalContainerComponent> = new ComponentPortal(ModalContainerComponent);
    const modalContainerRef: ComponentRef<ModalContainerComponent> = overlayRef.attach(portal);
    return modalContainerRef.instance;
  }

  private _attachModal<T, R>(
    overlayRef: OverlayRef,
    modalContainer: ModalContainerComponent,
    componentType: Type<T>,
  ): ModalRef<T, R> {
    const modalRef: ModalRef<T, R> = new ModalRef(overlayRef, modalContainer);
    const injector: Injector = this._createInjector(modalRef);
    const portal: ComponentPortal<T> = new ComponentPortal(componentType, undefined, injector);
    const modalComponentRef: ComponentRef<T> = modalContainer.attach(portal);
    modalRef.modalInstance = modalComponentRef.instance;
    modalRef.updatePosition();
    return modalRef;
  }

  private _createInjector<T, R>(modalRef: ModalRef<T, R>): Injector {
    const providers: StaticProvider[] = [{ provide: ModalRef, useValue: modalRef }];
    return Injector.create({ parent: this._injector, providers });
  }
}
