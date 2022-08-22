import { Story, Meta, moduleMetadata } from '@storybook/angular';

import { TooltipDirective } from './tooltip.directive';
import { TooltipModule } from './tooltip.module';

export default {
  title: 'Overlay/Tooltip',
  component: TooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [TooltipModule],
    }),
  ],
} as Meta;

const Template: Story<TooltipDirective> = (args) => ({
  props: args,
  template: `
    <span [uiTooltip]="content" [uiTooltipPosition]="position" [uiTooltipOpenDelay]="openDelay" [uiTooltipCloseDelay]="closeDelay">
      Hover to show tooltip
    </span>
  `,
});

export const Principal = Template.bind({});
Principal.args = {
  content: 'This is a tooltip',
  position: 'bottom',
  openDelay: 0,
  closeDelay: 0,
};
