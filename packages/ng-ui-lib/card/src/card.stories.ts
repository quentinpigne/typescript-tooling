import { StoryObj, Meta, moduleMetadata } from '@storybook/angular';

import { CardComponent } from './card.component';
import { CardTitleDirective } from './card-title/card-title.directive';
import { CardSubtitleDirective } from './card-subtitle/card-subtitle.directive';
import { CardContentDirective } from './card-content/card-content.directive';
import { CardFooterDirective } from './card-footer/card-footer.directive';

export default {
  title: 'Layout/Card',
  decorators: [
    moduleMetadata({
      imports: [CardComponent, CardTitleDirective, CardSubtitleDirective, CardContentDirective, CardFooterDirective],
    }),
  ],
} as Meta;

type Story = StoryObj<CardComponent>;

export const Principal: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-card>
        <ui-card-title>Card title</ui-card-title>
        <ui-card-subtitle>Card subtitle</ui-card-subtitle>
        <ui-card-content>Card content</ui-card-content>
        <ui-card-footer>Card footer</ui-card-footer>
      </ui-card>
    `,
  }),
};
