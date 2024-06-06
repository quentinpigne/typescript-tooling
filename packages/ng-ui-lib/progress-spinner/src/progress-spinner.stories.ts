import { StoryObj, Meta } from '@storybook/angular';

import { ProgressSpinnerComponent } from './progress-spinner.component';

export default {
  title: 'Display/ProgressSpinner',
  component: ProgressSpinnerComponent,
} as Meta;

type Story = StoryObj<ProgressSpinnerComponent>;

export const Principal: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-progress-spinner></ui-progress-spinner>
    `,
  }),
};
