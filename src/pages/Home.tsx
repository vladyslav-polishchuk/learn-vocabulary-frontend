import { FilterAlt, FilterAltOff } from '@mui/icons-material';

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
import { selectFile, selectWord } from '../store/vocabularySlice';
import Spinner from '../components/Spinner';
import WordCard from '../components/WordCard';
import WordDialog from '../components/WordDialog';

export default function Home() {
  const [filterOpened, setFilterOpened] = React.useState(false);
  const [minLength, setMinLength] = React.useState<string>('');
  const [maxLength, setMaxLength] = React.useState<string>('');
  const [search, setSearch] = React.useState<string>('');

  const badgeCount =
    0 + (search ? 1 : 0) + (minLength ? 1 : 0) + (maxLength ? 1 : 0);

  const dispatch = useDispatch();
  const { fileName, words, selectedWord, status } = useSelector(
    (state: RootState) => state.vocabulary
  );

  const handleFiles = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    if (!input || !input.files) return;

    const file = input.files[0];
    dispatch(selectFile(file));
  };

  const wordNodes = words
    .filter((word) => {
      const minLengthNum = parseInt(minLength ?? '') || 0;
      const maxLengthNum = parseInt(maxLength ?? '') || 20;

      return (
        word.value.length >= minLengthNum &&
        word.value.length <= maxLengthNum &&
        word.value.includes(search)
      );
    })
    .map((word) => (
      <Grid item key={word.value} xs={4}>
        <WordCard
          word={word}
          learnMoreHandler={() => dispatch(selectWord(word))}
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

      <Typography variant="h2" align="center" sx={{ fontWeight: 'bold' }}>
        Home Page ({words.length})
      </Typography>

      <Toolbar variant="dense" disableGutters sx={{ my: 2 }}>
        <TextField
          variant="outlined"
          disabled
          value={fileName}
          size="small"
          sx={{ width: '50%' }}
        ></TextField>

        <Box sx={{ flexGrow: '1', mx: 1 }}>
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
        </Box>

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
      </Toolbar>

      <Collapse in={filterOpened} sx={{ mb: 2 }}>
        <Toolbar variant="dense" disableGutters>
          <TextField
            variant="outlined"
            size="small"
            label="Minimal word length"
            value={minLength}
            onChange={(e) => setMinLength(e?.target?.value)}
          ></TextField>

          <Box sx={{ flexGrow: '1', marginLeft: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              label="Maximal word length"
              value={maxLength}
              onChange={(e) => setMaxLength(e?.target?.value)}
            ></TextField>
          </Box>

          <TextField
            sx={{ mr: 1 }}
            variant="outlined"
            size="small"
            label="Find"
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
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

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item container xs={12} spacing={2}>
          {wordNodes}
        </Grid>
      </Grid>
    </Box>
  );
}
