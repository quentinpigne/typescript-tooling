import { StoryObj, Meta, moduleMetadata } from '@storybook/angular';

import { FormFieldModule } from '@quentinpigne/ng-ui-lib/form-field';

import { InputDirective } from './input.directive';

export default {
  title: 'Forms/Input',
  component: InputDirective,
  decorators: [
    moduleMetadata({
      imports: [FormFieldModule],
      declarations: [InputDirective],
    }),
  ],
} as Meta;

type Story = StoryObj<InputDirective>;

export const Principal: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-form-field>
        <input uiInput type="text" placeholder="This is a text input" />
        <ui-error>This is an error message</ui-error>
      </ui-form-field>
    `,
  }),
};
