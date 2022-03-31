import { FilterAlt, FilterAltOff } from '@mui/icons-material';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  IconButton,
  Toolbar,
  Tooltip,
  Collapse,
  Badge,
  Pagination,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectWord, removeFromLearned } from '../store/vocabularySlice';
import WordCard from '../components/WordCard';
import WordDialog from '../components/WordDialog';

const pageSize = 50;

export default function Home() {
  const [filterOpened, setFilterOpened] = React.useState(false);
  const [minLength, setMinLength] = React.useState<string>('');
  const [maxLength, setMaxLength] = React.useState<string>('');
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState(1);

  const badgeCount =
    0 + (search ? 1 : 0) + (minLength ? 1 : 0) + (maxLength ? 1 : 0);

  const dispatch = useDispatch();
  const { user, selectedWord } = useSelector(
    (state: RootState) => state.vocabulary
  );

  const filteredWords = user.learnedWords.filter((word) => {
    const minLengthNum = parseInt(minLength ?? '') || 0;
    const maxLengthNum = parseInt(maxLength ?? '') || 20;

    return (
      word.length >= minLengthNum &&
      word.length <= maxLengthNum &&
      word.includes(search)
    );
  });

  const numberOfPages = Math.ceil(filteredWords.length / pageSize);
  const x = (page - 1) * pageSize;
  const wordNodes = filteredWords.slice(x, x + pageSize).map((word) => (
    <Grid item key={word} xs={4}>
      <WordCard
        word={{ value: word, frequency: 0 }}
        learnMoreHandler={() => dispatch(selectWord({ value: word }))}
        toggleLearnedCLick={() => dispatch(removeFromLearned(word))}
      ></WordCard>
    </Grid>
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <WordDialog
        word={selectedWord}
        onClose={() => dispatch(selectWord(null))}
      />

      <Typography
        align="center"
        color="textPrimary"
        variant="h2"
        sx={{ fontWeight: 'bold' }}
      >
        Your learned words
      </Typography>

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
            count={numberOfPages}
            color="primary"
            onChange={(e, newPage) => setPage(newPage)}
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
