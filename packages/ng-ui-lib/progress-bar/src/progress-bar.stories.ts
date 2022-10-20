import { Story, Meta } from '@storybook/angular';

import { ProgressBarComponent } from './progress-bar.component';

export default {
  title: 'Display/ProgressBar',
  component: ProgressBarComponent,
} as Meta;

const Template: Story<ProgressBarComponent> = (args) => ({
  props: args,
  template: `
    <ui-progress-bar [mode]="mode" [value]="value"></ui-progress-bar>
  `,
});

export const Determinate = Template.bind({});
Determinate.args = {
  mode: 'determinate',
  value: 38,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  mode: 'indeterminate',
};
