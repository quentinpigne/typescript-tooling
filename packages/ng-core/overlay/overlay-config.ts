import { PositionStrategy } from './position/position-strategy';

export class OverlayConfig {
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  hasBackdrop: boolean = false;
  positionStrategy?: PositionStrategy;
}
