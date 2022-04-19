import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import WordList from '../components/WordList';

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.vocabulary);
  const words = user.learnedWords.map((word) => ({
    value: word,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
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
