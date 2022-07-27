import { Story, Meta, moduleMetadata } from '@storybook/angular';

import { OptionComponent } from './option.component';
import { SelectComponent } from './select.component';

export default {
  title: 'Forms/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      declarations: [OptionComponent, SelectComponent],
    }),
  ],
  argTypes: { selectionChange: { action: 'selectionChange' } },
} as Meta;

const Template: Story<SelectComponent> = (args) => ({
  props: args,
  template: `
    <ui-select value="2" [required]="true" (selectionChange)="selectionChange($event)">
      <ui-option value="1" [disabled]="true">Option 1</ui-option>
      <ui-option value="2">Option 2</ui-option>
      <ui-option value="3">Option 3</ui-option>
    </ui-select>
  `,
});

export const Principal = Template.bind({});
Principal.args = {};
