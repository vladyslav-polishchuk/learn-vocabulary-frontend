import { FilterAlt, FilterAltOff, UploadFile } from '@mui/icons-material';

import React from 'react';
import {
  Box,
  Typography,
  Input,
  Button,
  Grid,
  TextField,
  IconButton,
  Toolbar,
  Tooltip,
  Collapse,
  Badge,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  markAsLearned,
  selectFile,
  selectWord,
} from '../store/vocabularySlice';
import Spinner from '../components/Spinner';
import WordCard from '../components/WordCard';
import WordDialog from '../components/WordDialog';
import Pagination from '../components/pure/Pagination';

export default function Home() {
  const [filterOpened, setFilterOpened] = React.useState(false);
  const [minLength, setMinLength] = React.useState<string>('');
  const [maxLength, setMaxLength] = React.useState<string>('');
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);

  const badgeCount =
    0 + (search ? 1 : 0) + (minLength ? 1 : 0) + (maxLength ? 1 : 0);

  const dispatch = useDispatch();
  const { fileName, words, selectedWord, status, user } = useSelector(
    (state: RootState) => state.vocabulary
  );

  const handleFiles = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    if (!input || !input.files) return;

    const file = input.files[0];
    dispatch(selectFile(file));
  };

  if (!fileName) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" sx={{ fontWeight: 'bold' }}>
            Pick file to proceed
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
              height: '300px',
              my: 2,
              border: 'dashed',
              borderColor: 'rgba(0, 0, 0, 0.12)',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            component="label"
            htmlFor="contained-button-file"
          >
            <Input
              id="contained-button-file"
              type="file"
              sx={{ display: 'none' }}
              onChange={handleFiles}
            />
            <UploadFile sx={{ width: '72px', height: '72px' }} />
            <Typography variant="h3" align="center">
              Drop file or click
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  const learnedWordsSet = new Set(user.learnedWords);
  const filteredWords = words.filter((word) => {
    const minLengthNum = parseInt(minLength ?? '') || 0;
    const maxLengthNum = parseInt(maxLength ?? '') || 20;

    return (
      !learnedWordsSet.has(word.value) &&
      word.value.length >= minLengthNum &&
      word.value.length <= maxLengthNum &&
      word.value.includes(search)
    );
  });

  const numberOfPages = Math.ceil(filteredWords.length / pageSize);
  const x = (page - 1) * pageSize;
  const wordNodes = filteredWords.slice(x, x + pageSize).map((word) => (
    <Grid item key={word.value} xs={4}>
      <WordCard
        word={word}
        learnMoreHandler={() => dispatch(selectWord(word))}
        toggleLearnedCLick={() => dispatch(markAsLearned(word.value))}
      ></WordCard>
    </Grid>
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Spinner loading={status === 'loading'} />

      <WordDialog
        word={selectedWord}
        onClose={() => dispatch(selectWord(null))}
      />

      <Box position="sticky">
        <Toolbar variant="dense" disableGutters sx={{ my: 2 }}>
          <label htmlFor="contained-button-file">
            <Input
              id="contained-button-file"
              type="file"
              sx={{ display: 'none' }}
              onChange={handleFiles}
            />
            <Button variant="contained" component="span">
              Pick File
            </Button>
          </label>

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
