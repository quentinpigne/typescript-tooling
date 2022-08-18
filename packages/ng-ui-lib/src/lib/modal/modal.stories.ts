import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

import { ModalRef } from './modal-ref';
import { ModalModule } from './modal.module';
import { ModalService, UI_DIALOG_DATA } from './modal.service';

interface ModalResult {
  result: string;
}

@Component({
  selector: 'ui-modal-open-button',
  template: `
    <button (click)="openModal()">Open Modal</button>
    <p>Response : {{ response }}</p>
  `,
})
class ModalWrapperComponent {
  response: string = '';

  constructor(private readonly _modalService: ModalService) {}

  openModal() {
    const modalRef: ModalRef<ModalComponent, ModalResult> = this._modalService.open(ModalComponent, {
      data: {
        label: 'Type a text',
      },
    });
    modalRef.afterClosed.subscribe((result?: ModalResult) => {
      this.response = result?.result || '';
    });
  }
}

@Component({
  selector: 'ui-story-modal',
  template: `
    <div style="display: flex; gap: 10px;">
      <label for="inputField">{{ data.label }}</label>
      <input id="inputField" type="text" [(ngModel)]="inputValue" />
      <button (click)="close()">Validate</button>
    </div>
  `,
})
class ModalComponent {
  inputValue: string = '';

  constructor(
    @Inject(UI_DIALOG_DATA) public data: { label: string },
    private readonly modalRef: ModalRef<ModalComponent, ModalResult>,
  ) {}

  close(): void {
    this.modalRef.close({ result: this.inputValue });
  }
}

export default {
  title: 'Overlay/Modal',
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ModalModule],
      declarations: [ModalComponent, ModalWrapperComponent],
    }),
  ],
} as Meta;

const Template: Story<Record<string, unknown>> = (args) => ({
  props: args,
  template: `<ui-modal-open-button></ui-modal-open-button>`,
});

export const Principal = Template.bind({});
Principal.args = {};
