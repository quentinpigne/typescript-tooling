import { Observable, Subject } from 'rxjs';

import { OverlayRef } from '@quentinpigne/ng-core';

import { ModalContainerComponent } from './modal-container.component';

export class ModalRef<T, R> {
  private _modalInstance!: T;

  set modalInstance(modalInstance: T) {
    this._modalInstance = modalInstance;
  }

  private _afterClosed: Subject<R | undefined> = new Subject<R | undefined>();

  get afterClosed(): Observable<R | undefined> {
    return this._afterClosed.asObservable();
  }

  constructor(private _overlayRef: OverlayRef, private _containerInstance: ModalContainerComponent) {
    _overlayRef.backdropClick.subscribe(() => {
      this.close();
    });
    _overlayRef.keyboardEvents.subscribe((event: KeyboardEvent) => {
      if (event.key === 'Escape') this.close();
    });
  }

  close(data?: R): void {
    this._afterClosed.next(data);
    this._afterClosed.complete();
    this._overlayRef.detach();
  }

  updatePosition(): void {
    this._overlayRef.updatePosition();
  }
}
