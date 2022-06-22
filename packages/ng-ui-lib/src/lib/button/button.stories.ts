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
} as Meta;

const Template: Story<ButtonComponent & { libelle: string }> = (args) => ({
  props: args,
  template: `
    <button ui-button [disabled]=${args.disabled}>{{libelle}}</button>
  `,
});

export const Principal = Template.bind({});
Principal.args = {
  libelle: 'Principal',
};

export const Disabled = Template.bind({});
Disabled.args = {
  libelle: 'Disabled',
  disabled: true,
};
