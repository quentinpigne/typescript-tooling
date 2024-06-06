import { StoryObj, Meta, moduleMetadata } from '@storybook/angular';

import { TableComponent } from './table.component';
import { TableModule } from './table.module';

type MockDataType = {
  firstname: string;
  lastname: string;
  birthDate: string;
  nationality: string;
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

type Story = StoryObj<TableComponent<MockDataType>>;

export const Principal: Story = {
  args: {
    columns: [
      { columnName: 'Prénom', attributeName: 'firstname' },
      { columnName: 'Nom', attributeName: 'lastname' },
      { columnName: 'Date de naissance', attributeName: 'birthDate' },
      { columnName: 'Nationalité', attributeName: 'nationality' },
    ],
    data: [
      {
        firstname: 'A very long firstname that should be wrapped',
        lastname: 'Doe',
        birthDate: '01/01/1991',
        nationality: 'Française',
      },
      { firstname: 'John', lastname: 'Doe', birthDate: '01/01/1991', nationality: 'Française' },
      { firstname: 'John', lastname: 'Doe', birthDate: '01/01/1991', nationality: 'Française' },
      { firstname: 'John', lastname: 'Doe', birthDate: '01/01/1991', nationality: 'Française' },
      { firstname: 'John', lastname: 'Doe', birthDate: '01/01/1991', nationality: 'Française' },
      { firstname: 'John', lastname: 'Doe', birthDate: '01/01/1991', nationality: 'Française' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-table [columns]="columns" [data]="data"></ui-table>
    `,
  }),
};
