import { Done } from '@mui/icons-material';
import { Typography, IconButton, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWords } from '../store/vocabularySlice';
import WordList from '../components/WordList';
import type { RootState } from '../store';
import { Trans } from 'react-i18next';
import Page from '../components/presentational/Page';
import {
  markAsLearned as markAsLearnedStore,
  setError,
} from '../store/vocabularySlice';
import { markAsLearned } from '../api';

export default function Words() {
  const { words, user } = useSelector((state: RootState) => state.vocabulary);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWords());
  }, [dispatch]);

  const learnedWordsSet = new Set(user?.learnedWords ?? []);
  const filteredWords = words.filter((word) => {
    return !learnedWordsSet.has(word.value);
  });
  const markAsLearnedClick = async (word: string) => {
    try {
      await markAsLearned([word]);

      dispatch(markAsLearnedStore([word]));
    } catch (e: any) {
      dispatch(setError(e.message));
    }
  };
  const createCardContent = (word: Word) => (
    <Tooltip title={<Trans i18nKey="mark-learned" />}>
      <IconButton onClick={() => markAsLearnedClick(word.value)}>
        <Done />
      </IconButton>
    </Tooltip>
  );

  return (
    <Page title="Frequency List">
      <Typography
        align="center"
        color="textPrimary"
        variant="h3"
        sx={{ fontWeight: 'bold' }}
      >
        <Trans i18nKey="words-title" />
      </Typography>

      <WordList words={filteredWords} createCardContent={createCardContent} />
    </Page>
  );
}
