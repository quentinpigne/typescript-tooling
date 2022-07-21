import { Story, Meta, moduleMetadata } from '@storybook/angular';

import { RadioButtonComponent } from './radio-button.component';
import { RadioGroupDirective } from './radio-group.directive';

export default {
  title: 'Forms/Radio',
  component: RadioButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [RadioButtonComponent, RadioGroupDirective],
    }),
  ],
} as Meta;

const Template: Story<RadioButtonComponent> = (args) => ({
  props: args,
  template: `
    <ui-radio-group value="1">
      <ui-radio-button value="1">Radio 1</ui-radio-button>
      <ui-radio-button value="2">Radio 2</ui-radio-button>
    </ui-radio-group>
  `,
});

export const Principal = Template.bind({});
Principal.args = {};
