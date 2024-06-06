import { StoryObj, Meta } from '@storybook/angular';

import { ProgressBarComponent } from './progress-bar.component';

export default {
  title: 'Display/ProgressBar',
  component: ProgressBarComponent,
} as Meta;

type Story = StoryObj<ProgressBarComponent>;

const Template: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-progress-bar [mode]="mode" [value]="value"></ui-progress-bar>
    `,
  }),
};

export const Determinate: Story = {
  args: {
    mode: 'determinate',
    value: 38,
  },
  render: Template.render,
};

export const Indeterminate: Story = {
  args: {
    mode: 'indeterminate',
  },
  render: Template.render,
};
