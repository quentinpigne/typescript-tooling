import { Story, Meta } from '@storybook/angular';

import { ButtonComponent } from './button.component';

export default {
  title: 'Controls/Button',
  component: ButtonComponent,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'warning'],
    },
  },
  args: {
    color: 'primary',
  },
} as Meta;

const Template: Story<ButtonComponent & { libelle: string }> = (args) => ({
  props: args,
  template: `
    <button ui-button [color]=${args.color} [disabled]=${args.disabled}>{{libelle}}</button>
  `,
});

export const Primary = Template.bind({});
Primary.args = {
  libelle: 'Principal',
};

export const Warning = Template.bind({});
Warning.args = {
  libelle: 'Warning',
  color: 'warning',
};

export const Disabled = Template.bind({});
Disabled.args = {
  libelle: 'Disabled',
  disabled: true,
};
