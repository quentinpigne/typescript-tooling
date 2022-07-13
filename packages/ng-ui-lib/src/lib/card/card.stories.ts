import { Story, Meta, moduleMetadata } from '@storybook/angular';

import { CardComponent } from './card.component';

export default {
  title: 'Layout/Card',
  decorators: [
    moduleMetadata({
      declarations: [CardComponent],
    }),
  ],
} as Meta;

const Template: Story<CardComponent> = (args) => ({
  props: args,
  template: `
    <ui-card>
      <span>Contenu de la card</span>
    </ui-card>
  `,
});

export const Principal = Template.bind({});
Principal.args = {};
