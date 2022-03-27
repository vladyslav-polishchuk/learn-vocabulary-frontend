import { Box, Typography, Input, Button, Grid } from '@mui/material';
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

      <Grid container>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <Typography variant="body1">Selected File - {fileName}</Typography>
          </Grid>
          <Grid item xs={6}>
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
        </Grid>
        <Grid item container xs={12} spacing={1}>
          {wordNodes}
        </Grid>
      </Grid>
    </Box>
  );
}
