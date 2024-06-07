import { StoryObj, Meta, moduleMetadata } from '@storybook/angular';

import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip.component';

export default {
  title: 'Overlay/Tooltip',
  component: TooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [TooltipDirective, TooltipComponent],
    }),
  ],
} as Meta;

type Story = StoryObj<TooltipDirective>;

export const Principal: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'bottom',
    openDelay: 0,
    closeDelay: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <span [uiTooltip]="content" [uiTooltipPosition]="position" [uiTooltipOpenDelay]="openDelay" [uiTooltipCloseDelay]="closeDelay">
        Hover to show tooltip
      </span>
    `,
  }),
};
