import { FilterAlt, FilterAltOff, Done } from '@mui/icons-material';

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
import { useDispatch, useSelector } from 'react-redux';
import { Trans } from 'react-i18next';
import type { RootState } from '../store';
import { markAsLearned } from '../store/vocabularySlice';
import Spinner from './pure/Spinner';
import WordCard from './WordCard';
import WordDialog from './WordDialog';
import Pagination from './pure/Pagination';

interface WordListProps {
  words: Word[];
}

export default function WordList({ words }: WordListProps) {
  const [filterOpened, setFilterOpened] = React.useState(false);
  const [minLength, setMinLength] = React.useState<string>('');
  const [maxLength, setMaxLength] = React.useState<string>('');
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);
  const [selectedWord, setSelectedWord] = React.useState<Word | null>(null);

  const badgeCount =
    0 + (search ? 1 : 0) + (minLength ? 1 : 0) + (maxLength ? 1 : 0);

  const dispatch = useDispatch();
  const { status, user } = useSelector((state: RootState) => state.vocabulary);

  const filteredWords = words.filter((word) => {
    const minLengthNum = parseInt(minLength ?? '') || 0;
    const maxLengthNum = parseInt(maxLength ?? '') || 20;

    return (
      word.value.length >= minLengthNum &&
      word.value.length <= maxLengthNum &&
      word.value.includes(search)
    );
  });

  const numberOfPages = Math.ceil(filteredWords.length / pageSize);
  const x = (page - 1) * pageSize;
  const wordNodes = filteredWords.slice(x, x + pageSize).map((word) => (
    <Grid item key={word.value} xs={4}>
      <WordCard word={word} learnMoreHandler={() => setSelectedWord(word)}>
        {user && (
          <Tooltip title={<Trans i18nKey="mark-learned" />}>
            <IconButton onClick={() => dispatch(markAsLearned(word.value))}>
              <Done />
            </IconButton>
          </Tooltip>
        )}
      </WordCard>
    </Grid>
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Spinner loading={status === 'loading'} />

      <WordDialog word={selectedWord} onClose={() => setSelectedWord(null)} />

      <Box position="sticky">
        <Toolbar variant="dense" disableGutters sx={{ my: 2 }}>
          <Box sx={{ flexGrow: '1', mx: 1 }}>
            <Tooltip
              title={
                <Trans
                  i18nKey={filterOpened ? 'hide-filters' : 'show-filters'}
                />
              }
            >
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
              label={<Trans i18nKey="search" />}
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
                onClick={() => {
                  setMinLength('');
                  setMaxLength('');
                  setSearch('');
                }}
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
