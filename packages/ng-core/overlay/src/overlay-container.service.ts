import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayContainerService implements OnDestroy {
  private _containerElement!: HTMLDivElement;
  private _document: Document;

  get containerElement(): HTMLDivElement {
    if (!this._containerElement) {
      this._createContainerElement();
    }
    return this._containerElement;
  }

  constructor(@Inject(DOCUMENT) document: Document) {
    this._document = document;
  }

  ngOnDestroy(): void {
    this._containerElement?.remove();
  }

  private _createContainerElement(): void {
    const CONTAINER_CLASS: string = 'ng-overlay-container';

    const container: HTMLDivElement = this._document.createElement('div');
    container.classList.add(CONTAINER_CLASS);

    this._document.body.appendChild(container);
    this._containerElement = container;
  }
}
