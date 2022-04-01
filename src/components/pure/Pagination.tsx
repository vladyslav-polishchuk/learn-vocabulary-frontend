import * as React from 'react';
import { Box, Pagination, TextField, MenuItem } from '@mui/material';

interface PaginationProps {
  page: number;
  numberOfPages: number;
  defaultPageSize?: number;
  setPage: (page: number) => any;
  setPageSize: (size: number) => any;
}

const resultsPerPage = [
  {
    value: 10,
    label: '10',
  },
  {
    value: 25,
    label: '25',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 100,
    label: '100',
  },
];

export default function PaginationComponent({
  page,
  numberOfPages,
  defaultPageSize,
  setPage,
  setPageSize,
}: PaginationProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageSize = parseInt(event.target.value);

    if (pageSize) setPageSize(pageSize);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        sx={{ width: '60px' }}
        select
        label="Page Size"
        onChange={handleChange}
        variant="standard"
        defaultValue={defaultPageSize}
      >
        {resultsPerPage.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Pagination
        page={page}
        count={numberOfPages}
        color="primary"
        onChange={(e, newPage) => setPage(newPage)}
      />
    </Box>
  );
}
