import { Story, Meta, moduleMetadata } from '@storybook/angular';

import { CardComponent } from './card.component';
import { CardContentDirective } from './card-content/card-content.directive';
import { CardFooterDirective } from './card-footer/card-footer.directive';
import { CardSubtitleDirective } from './card-subtitle/card-subtitle.directive';
import { CardTitleDirective } from './card-title/card-title.directive';

export default {
  title: 'Layout/Card',
  decorators: [
    moduleMetadata({
      declarations: [
        CardComponent,
        CardContentDirective,
        CardFooterDirective,
        CardSubtitleDirective,
        CardTitleDirective,
      ],
    }),
  ],
} as Meta;

const Template: Story<CardComponent> = (args) => ({
  props: args,
  template: `
    <ui-card>
      <ui-card-title>Card title</ui-card-title>
      <ui-card-subtitle>Card subtitle</ui-card-subtitle>
      <ui-card-content>Card content</ui-card-content>
      <ui-card-footer>Card footer</ui-card-footer>
    </ui-card>
  `,
});

export const Principal = Template.bind({});
Principal.args = {};
