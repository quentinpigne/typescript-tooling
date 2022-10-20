import { Story, Meta, moduleMetadata } from '@storybook/angular';

import { CardModule } from './card.module';
import { CardComponent } from './card.component';

export default {
  title: 'Layout/Card',
  decorators: [
    moduleMetadata({
      imports: [CardModule],
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
