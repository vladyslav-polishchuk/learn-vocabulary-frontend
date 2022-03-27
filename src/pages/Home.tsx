import { Box, Typography, Input, Button, Grid, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectFile } from '../store/vocabularySlice';
import Spinner from '../components/Spinner';
import Word from '../components/Word';

export default function Home() {
  const dispatch = useDispatch();
  const { fileName, words, status } = useSelector(
    (state: RootState) => state.vocabulary
  );

  const handleFiles = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    if (!input || !input.files) return;

    const file = input.files[0];
    dispatch(selectFile(file));
  };

  const wordNodes = words.map((word) => (
    <Grid item key={word.value} xs={4}>
      <Word word={word}></Word>
    </Grid>
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Spinner loading={status === 'loading'} />

      <Typography variant="h2" align="center" sx={{ fontWeight: 'bold' }}>
        Home Page ({words.length})
      </Typography>

      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={2}></Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            disabled
            fullWidth
            value={fileName}
            size="small"
          >
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
          </TextField>
        </Grid>
        <Grid item xs={4} sx={{ alignSelf: 'center' }}>
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
        </Grid>
        <Grid item xs={2}></Grid>

        <Grid item container xs={12} spacing={2}>
          {wordNodes}
        </Grid>
      </Grid>
    </Box>
  );
}
