import { Box, Typography, Input, Button, Grid } from '@mui/material';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectFile } from '../store/vocabularySlice';
import Spinner from '../components/Spinner';

export default function Home() {
  const dispatch = useDispatch();
  const { fileName, fileContent, status } = useSelector(
    (state: RootState) => state.vocabulary
  );

  const handleFiles = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    if (!input || !input.files) return;

    const file = input.files[0];
    dispatch(selectFile(file));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Spinner loading={status === 'loading'} />

      <Typography variant="h2" align="center" sx={{ fontWeight: 'bold' }}>
        Home Page
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
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            File Content - {fileContent}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
