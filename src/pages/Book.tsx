import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getBook } from '../store/vocabularySlice';
import Spinner from '../components/pure/Spinner';
import WordList from '../components/WordList';
import type { RootState } from '../store';

export default function BookPage() {
  const { bookId } = useParams();
  const { selectedBook, status, user } = useSelector(
    (state: RootState) => state.vocabulary
  );
  const dispatch = useDispatch();

  useEffect(() => {
    bookId && dispatch(getBook(bookId));
  }, [bookId]);

  if (!selectedBook) return null;

  const learnedWordsSet = new Set(user.learnedWords);
  const filteredWords = selectedBook.words.filter((word) => {
    return !learnedWordsSet.has(word.value);
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Spinner loading={status === 'loading'} />

      <Typography
        align="center"
        color="textPrimary"
        variant="h2"
        sx={{ fontWeight: 'bold' }}
      >
        {selectedBook.name}
      </Typography>

      <Button
        component={Link}
        to="/books"
        startIcon={<ArrowBackIcon fontSize="small" />}
        sx={{ my: 5 }}
        variant="contained"
      >
        Back to books
      </Button>

      <WordList words={filteredWords} />
    </Box>
  );
}
