import { Story, Meta } from '@storybook/angular';

import { ProgressSpinnerComponent } from './progress-spinner.component';

export default {
  title: 'Display/ProgressSpinner',
  component: ProgressSpinnerComponent,
} as Meta;

const Template: Story<ProgressSpinnerComponent> = (args) => ({
  props: args,
  template: `
    <ui-progress-spinner></ui-progress-spinner>
  `,
});

export const Principal = Template.bind({});
Principal.args = {};
