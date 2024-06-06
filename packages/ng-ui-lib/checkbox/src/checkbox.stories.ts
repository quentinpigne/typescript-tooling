import { StoryObj, Meta } from '@storybook/angular';

import { CheckboxComponent } from './checkbox.component';

export default {
  title: 'Forms/Checkbox',
  component: CheckboxComponent,
} as Meta;

type Story = StoryObj<CheckboxComponent & { libelle: string }>;

const Template: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-checkbox [disabled]=${args.disabled}>{{libelle}}</ui-checkbox>
    `,
  }),
};

export const Principal: Story = {
  args: {
    libelle: 'Click to check',
  },
  render: Template.render,
};

export const Disabled: Story = {
  args: {
    libelle: 'Click to check',
    disabled: true,
  },
  render: Template.render,
};
