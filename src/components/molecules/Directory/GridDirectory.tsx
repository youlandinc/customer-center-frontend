import { MRT_ColumnDef } from 'material-react-table';
import { FC } from 'react';

import { StyledGrid } from '@/components/atoms';
import { commonColumns, GridPagination } from '@/components/molecules';

import { data } from '@/components/molecules/Directory/assets/mockData';

export const GridDirectory: FC = () => {
  return (
    <div>
      <StyledGrid
        columns={commonColumns as MRT_ColumnDef<any>[]}
        data={data}
        rowCount={0}
      />
      <GridPagination />
    </div>
  );
};
