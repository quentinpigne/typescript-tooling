import { Story, Meta, moduleMetadata } from '@storybook/angular';

import { TabsModule } from './tabs.module';
import { TabGroupComponent } from './tab-group.component';

export default {
  title: 'Layout/Tabs',
  decorators: [
    moduleMetadata({
      imports: [TabsModule],
    }),
  ],
} as Meta;

const Template: Story<TabGroupComponent> = (args) => ({
  props: args,
  template: `
    <ui-tab-group [selectedIndex]="selectedIndex">
      <ui-tab label="Tab 1">
        Ceci est le contenu de la tab 1
      </ui-tab>
      <ui-tab label="Tab 2">
        Ceci est le contenu de la tab 2
      </ui-tab>
      <ui-tab label="Tab 3">
        Ceci est le contenu de la tab 3
      </ui-tab>
    </ui-tab-group>
  `,
});

export const Principal = Template.bind({});
Principal.args = {
  selectedIndex: 2,
};
