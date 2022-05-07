import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { getBook } from '../store/vocabularySlice';
import WordList from '../components/WordList';
import Page from '../components/presentational/Page';
import type { RootState } from '../store';

export default function BookPage() {
  const { bookId } = useParams();
  const { selectedBook, user } = useSelector(
    (state: RootState) => state.vocabulary
  );
  const dispatch = useDispatch();

  useEffect(() => {
    bookId && dispatch(getBook(bookId));
  }, [bookId, dispatch]);

  if (!selectedBook) return null;

  const learnedWordsSet = new Set(user?.learnedWords ?? []);
  const filteredWords = selectedBook.words.filter((word) => {
    return !learnedWordsSet.has(word.value);
  });

  return (
    <Page title={selectedBook.name}>
      <Typography
        align="center"
        color="textPrimary"
        variant="h3"
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
        <Trans i18nKey="back-to-books" />
      </Button>

      <WordList words={filteredWords} />
    </Page>
  );
}
