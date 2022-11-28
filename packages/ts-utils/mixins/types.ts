import { Constructor } from './constructors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Mixin<BaseConstraint = any, MixinFeature = any> = <TBase extends Constructor<BaseConstraint>>(
  baseClass: TBase,
) => TBase & Constructor<MixinFeature>;
