import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj, Meta, moduleMetadata } from '@storybook/angular';

import { ModalRef } from './modal-ref';
import { ModalContainerComponent } from './modal-container.component';
import { ModalService, UI_DIALOG_DATA } from './modal.service';

interface ModalResult {
  result: string;
}

@Component({
  standalone: true,
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
  standalone: true,
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
      imports: [FormsModule, ModalContainerComponent, ModalComponent, ModalWrapperComponent],
    }),
  ],
} as Meta;

type Story = StoryObj<Record<string, unknown>>;

export const Principal: Story = {
  render: (args) => ({
    props: args,
    template: `<ui-modal-open-button></ui-modal-open-button>`,
  }),
};
