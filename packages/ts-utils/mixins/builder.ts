import { Constructor } from './constructors';
import { Mixin } from './types';

export class MixinBuilder {
  constructor(public baseClass: Constructor<unknown>) {}

  static mix(baseClass: Constructor<unknown>): MixinBuilder {
    return new MixinBuilder(baseClass);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  with(...mixins: Mixin[]): Constructor<any> {
    return mixins.reduce((c, mixin) => mixin(c), this.baseClass);
  }
}
