import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWords } from '../store/vocabularySlice';
import Spinner from '../components/pure/Spinner';
import WordList from '../components/WordList';
import type { RootState } from '../store';
import { Trans } from 'react-i18next';

export default function Words() {
  const { words, status, user } = useSelector(
    (state: RootState) => state.vocabulary
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWords());
  }, [dispatch]);

  const learnedWordsSet = new Set(user?.learnedWords ?? []);
  const filteredWords = words.filter((word) => {
    return !learnedWordsSet.has(word.value);
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Helmet>
        <title>Bookabulary | Frequency List</title>
      </Helmet>

      <Spinner loading={status === 'loading'} />

      <Typography
        align="center"
        color="textPrimary"
        variant="h2"
        sx={{ fontWeight: 'bold' }}
      >
        <Trans i18nKey="words-title" />
      </Typography>

      <WordList words={filteredWords} />
    </Box>
  );
}
