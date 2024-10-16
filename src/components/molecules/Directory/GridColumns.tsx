import { Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

export const ellipsisStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const commonColumns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: 'systemLoanNumber',
    header: 'Loan number',
    size: 150,
    minSize: 100,
    muiTableBodyCellProps: {
      align: 'center',
    },
    muiTableHeadCellProps: {
      align: 'center',
    },
    Cell: ({ renderedCellValue }) => {
      return (
        <Typography
          fontSize={12}
          sx={{
            ...ellipsisStyle,
            width: '100%',
          }}
        >
          {renderedCellValue}
        </Typography>
      );
    },
  },
  {
    accessorKey: 'borrowerName',
    header: 'Borrower',
    size: 150,
    minSize: 80,
    muiTableBodyCellProps: {
      align: 'left',
    },
    muiTableHeadCellProps: {
      align: 'center',
    },
    Cell: ({ renderedCellValue }) => {
      return (
        <Typography
          fontSize={12}
          sx={{
            ...ellipsisStyle,
            width: '100%',
          }}
        >
          {renderedCellValue || '—'}
        </Typography>
      );
    },
  },
  {
    accessorKey: 'investor',
    header: 'Investor',
    size: 140,
    minSize: 80,
    muiTableBodyCellProps: {
      align: 'left',
    },
    muiTableHeadCellProps: {
      align: 'center',
    },
    Cell: ({ renderedCellValue }) => {
      return (
        <Typography
          fontSize={12}
          sx={{
            ...ellipsisStyle,
            width: '100%',
          }}
        >
          {renderedCellValue || '—'}
        </Typography>
      );
    },
  },
];
