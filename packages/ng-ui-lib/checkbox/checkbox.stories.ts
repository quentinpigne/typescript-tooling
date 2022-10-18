import { Story, Meta } from '@storybook/angular';

import { CheckboxComponent } from './checkbox.component';

export default {
  title: 'Forms/Checkbox',
  component: CheckboxComponent,
} as Meta;

const Template: Story<CheckboxComponent & { libelle: string }> = (args) => ({
  props: args,
  template: `
    <ui-checkbox [disabled]=${args.disabled}>{{libelle}}</ui-checkbox>
  `,
});

export const Principal = Template.bind({});
Principal.args = {
  libelle: 'Click to check',
};

export const Disabled = Template.bind({});
Disabled.args = {
  libelle: 'Click to check',
  disabled: true,
};
