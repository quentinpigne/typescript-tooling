import { Meta, StoryObj } from '@storybook/angular';

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

type Story = StoryObj<ButtonComponent & { libelle: string }>;

const Template: Story = {
  render: (args) => ({
    props: args,
    template: `
      <button ui-button [color]=${args.color} [disabled]=${args.disabled}>{{libelle}}</button>
    `,
  }),
};

export const Primary: Story = {
  args: {
    libelle: 'Principal',
  },
  render: Template.render,
};

export const Warning: Story = {
  args: {
    libelle: 'Warning',
    color: 'warning',
  },
  render: Template.render,
};

export const Disabled: Story = {
  args: {
    libelle: 'Disabled',
    disabled: true,
  },
  render: Template.render,
};
