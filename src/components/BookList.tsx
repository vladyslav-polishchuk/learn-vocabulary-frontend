import { FilterAlt, FilterAltOff } from '@mui/icons-material';

import React from 'react';
import {
  Box,
  Grid,
  TextField,
  IconButton,
  Toolbar,
  Tooltip,
  Collapse,
  Badge,
} from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import Spinner from './pure/Spinner';
import WordDialog from './WordDialog';
import Pagination from './pure/Pagination';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
  onBookSelect: (bookId: string) => any;
}

export default function BookList({ books, onBookSelect }: BookListProps) {
  const [filterOpened, setFilterOpened] = React.useState(false);
  const [minLength, setMinLength] = React.useState<string>('');
  const [maxLength, setMaxLength] = React.useState<string>('');
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);
  const [selectedWord, setSelectedWord] = React.useState<Word | null>(null);

  const badgeCount =
    0 + (search ? 1 : 0) + (minLength ? 1 : 0) + (maxLength ? 1 : 0);

  const { status } = useSelector((state: RootState) => state.vocabulary);

  const filteredWords = books.filter((book) => {
    return book.name.includes(search);
  });

  const numberOfPages = Math.ceil(filteredWords.length / pageSize);
  const x = (page - 1) * pageSize;
  const wordNodes = filteredWords.slice(x, x + pageSize).map((book) => (
    <Grid item key={book.hash} xs={4}>
      <BookCard
        book={book}
        onBookSelect={() => onBookSelect(book.hash)}
      ></BookCard>
    </Grid>
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Spinner loading={status === 'loading'} />

      <WordDialog word={selectedWord} onClose={() => setSelectedWord(null)} />

      <Box position="sticky">
        <Toolbar variant="dense" disableGutters sx={{ my: 2 }}>
          <Box sx={{ flexGrow: '1', mx: 1 }}>
            <Tooltip title="Add Filters">
              <IconButton
                color="primary"
                component="span"
                onClick={() => setFilterOpened(!filterOpened)}
              >
                <Badge badgeContent={badgeCount} color="primary">
                  <FilterAlt />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>

          <Pagination
            page={page}
            numberOfPages={numberOfPages}
            defaultPageSize={pageSize}
            setPage={(newPage) => setPage(newPage)}
            setPageSize={(newSize) => {
              setPageSize(newSize);
              setPage(1);
            }}
          />
        </Toolbar>

        <Collapse in={filterOpened} sx={{ mb: 2 }}>
          <Toolbar variant="dense" disableGutters>
            <TextField
              variant="outlined"
              size="small"
              label="Minimal word length"
              value={minLength}
              onChange={(e) => {
                setMinLength(e?.target?.value);
                setPage(1);
              }}
            ></TextField>

            <Box sx={{ flexGrow: '1', marginLeft: 1 }}>
              <TextField
                variant="outlined"
                size="small"
                label="Maximal word length"
                value={maxLength}
                onChange={(e) => {
                  setMaxLength(e?.target?.value);
                  setPage(1);
                }}
              ></TextField>
            </Box>

            <TextField
              sx={{ mr: 1 }}
              variant="outlined"
              size="small"
              label="Find"
              value={search}
              onChange={(e) => {
                setSearch(e?.target?.value);
                setPage(1);
              }}
            ></TextField>

            <Tooltip title="Clear Filters">
              <IconButton
                color="primary"
                component="span"
                onClick={() => setSearch('')}
              >
                <FilterAltOff />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Collapse>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item container xs={12} spacing={2}>
          {wordNodes}
        </Grid>
      </Grid>
    </Box>
  );
}
