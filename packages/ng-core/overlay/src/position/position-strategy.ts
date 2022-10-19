import { OverlayRef } from '../overlay-ref';

export interface PositionStrategy {
  attach(overlayRef: OverlayRef): void;
  apply(): void;
}
