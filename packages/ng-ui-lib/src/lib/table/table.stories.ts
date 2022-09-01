import { Story, Meta, moduleMetadata } from '@storybook/angular';

import { TableComponent } from './table.component';
import { TableModule } from './table.module';

type MockDataType = {
  prenom: string;
  nom: string;
};

export default {
  title: 'Layout/Table',
  component: TableComponent,
  decorators: [
    moduleMetadata({
      imports: [TableModule],
    }),
  ],
} as Meta;

const Template: Story<TableComponent<MockDataType>> = (args) => ({
  props: args,
  template: `
    <ui-table [columns]="columns" [data]="data"></ui-table>
  `,
});

export const Principal = Template.bind({});
Principal.args = {
  columns: [
    { columnName: 'Prénom', attributeName: 'prenom' },
    { columnName: 'Nom', attributeName: 'nom' },
  ],
  data: [{ prenom: 'John', nom: 'Doe' }],
};
