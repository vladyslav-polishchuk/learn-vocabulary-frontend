import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import WordList from '../components/WordList';
import type { RootState } from '../store';

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.vocabulary);
  if (!user) return null;

  const words = user.learnedWords.map((word) => ({
    value: word,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Helmet>
        <title>Bookabulary | Progile</title>
      </Helmet>

      <Typography
        align="center"
        color="textPrimary"
        variant="h2"
        sx={{ fontWeight: 'bold' }}
      >
        Your learned words
      </Typography>

      <WordList words={words} />
    </Box>
  );
}
