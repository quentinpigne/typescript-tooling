export abstract class PortalError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class NullPortalError extends PortalError {
  constructor() {
    super('Must provide a portal to attach');
  }
}

export class NullPortalOutletError extends PortalError {
  constructor() {
    super('Attempting to attach a portal to a null PortalOutlet');
  }
}

export class PortalAlreadyAttachedError extends PortalError {
  constructor() {
    super('Host already has a portal attached');
  }
}

export class NoPortalAttachedError extends PortalError {
  constructor() {
    super('Attempting to detach a portal that is not attached to a host');
  }
}

export class UnknownPortalTypeError extends PortalError {
  constructor() {
    super(
      'Attempting to attach an unknown Portal type. BasePortalOutlet accepts either a ComponentPortal or a TemplatePortal.',
    );
  }
}
