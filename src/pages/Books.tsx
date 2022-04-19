import { UploadFile } from '@mui/icons-material';
import { Box, Typography, Input, Grid, Button, Toolbar } from '@mui/material';
import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFile, getBooks } from '../store/vocabularySlice';
import type { RootState } from '../store';
import Spinner from '../components/pure/Spinner';
import BookList from '../components/BookList';

export default function BooksPage() {
  const handleFiles = async (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    if (!input || !input.files) return;

    const file = input.files[0];
    dispatch(selectFile(file));
  };

  const { books, status } = useSelector((state: RootState) => state.vocabulary);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <Grid container>
      <Spinner loading={status === 'loading'} />

      <Grid item xs={12}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold' }}>
          Book List
        </Typography>
      </Grid>

      <Box position="sticky">
        <Toolbar variant="dense" disableGutters sx={{ my: 2 }}>
          <label htmlFor="contained-button-file">
            <Input
              id="contained-button-file"
              type="file"
              sx={{ display: 'none' }}
              onChange={handleFiles}
            />
            <Button variant="contained" component="span" fullWidth>
              <UploadFile sx={{ mr: 1 }} />
              Pick File
            </Button>
          </label>
        </Toolbar>
      </Box>

      <BookList
        books={books}
        onBookSelect={(bookId) => navigate(`/books/${bookId}`)}
      />
    </Grid>
  );
}
