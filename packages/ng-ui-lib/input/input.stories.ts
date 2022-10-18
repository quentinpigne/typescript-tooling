import { Story, Meta, moduleMetadata } from '@storybook/angular';

import { InputDirective } from './input.directive';
import { FormFieldModule } from '../form-field/form-field.module';

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

const Template: Story<InputDirective> = (args) => ({
  props: args,
  template: `
    <ui-form-field>
      <input uiInput type="text" placeholder="This is a text input" />
      <ui-error>This is an error message</ui-error>
    </ui-form-field>
  `,
});

export const Principal = Template.bind({});
Principal.args = {};
