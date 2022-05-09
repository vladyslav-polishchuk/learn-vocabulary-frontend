import { Clear } from '@mui/icons-material';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import { Trans } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import WordList from '../components/WordList';
import {
  removeFromLearned as removeFromLearnedStore,
  setError,
} from '../store/vocabularySlice';
import { removeFromLearned } from '../api';
import type { RootState } from '../store';

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.vocabulary);
  if (!user) return null;

  const words = user.learnedWords.map((word) => ({
    value: word,
  }));
  const removeFromLearnedClick = async (word: string) => {
    try {
      await removeFromLearned([word]);

      dispatch(removeFromLearnedStore([word]));
    } catch (e: any) {
      dispatch(setError(e.message));
    }
  };
  const createCardContent = (word: Word) => (
    <Tooltip title={<Trans i18nKey="delete-learned" />}>
      <IconButton onClick={() => removeFromLearnedClick(word.value)}>
        <Clear />
      </IconButton>
    </Tooltip>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        align="center"
        color="textPrimary"
        variant="h3"
        sx={{ fontWeight: 'bold' }}
      >
        <Trans i18nKey="learned-words" />
      </Typography>

      <WordList words={words} createCardContent={createCardContent} />
    </Box>
  );
}
