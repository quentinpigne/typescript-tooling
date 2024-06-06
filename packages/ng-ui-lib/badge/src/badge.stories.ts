import { StoryObj, Meta, moduleMetadata } from '@storybook/angular';

import { BadgeComponent } from './standalone/badge.component';
import { BadgeDirective } from './embedded/badge.directive';

export default {
  title: 'Display/Badge',
  decorators: [
    moduleMetadata({
      declarations: [BadgeComponent, BadgeDirective],
    }),
  ],
} as Meta;

export const Standalone: StoryObj<BadgeComponent> = {
  args: {
    content: 1,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-badge [content]="content"></ui-badge>
    `,
  }),
};

export const Embedded: StoryObj<BadgeDirective & { libelle: string }> = {
  args: {
    libelle: 'Principal',
    content: '1',
    position: 'top right',
  },
  render: (args) => ({
    props: args,
    template: `
      <span [uiBadge]="content" [uiBadgePosition]="position">{{libelle}}</span>
    `,
  }),
};
