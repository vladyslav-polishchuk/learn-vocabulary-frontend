import {
  Card,
  CardHeader,
  CardActions,
  Button,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListenIcon from '@mui/icons-material/VolumeUp';
import type { ReactNode } from 'react';

interface WordProps {
  word: Word;
  learnMoreHandler: () => unknown;
  children: ReactNode | ReactNode[];
}

const listenClick = (word: string) => {
  const allVoices = window.speechSynthesis.getVoices();
  const googleVoice = allVoices.find(
    (voice) => voice.name === 'Google US English'
  );
  const voice =
    googleVoice ?? allVoices.find((voice) => voice.lang === 'en-US');
  if (!voice) {
    throw new Error('No suitable voice found');
  }

  var utterThis = new SpeechSynthesisUtterance(word);
  utterThis.voice = voice;
  utterThis.pitch = 1;
  utterThis.rate = 0.7;
  window.speechSynthesis.speak(utterThis);
};

export default function WordCard({
  children,
  word,
  learnMoreHandler,
}: WordProps) {
  const title = (
    <Stack direction="row" spacing={1}>
      {word.value}
      {word.count && (
        <Chip
          label={word.count}
          color="primary"
          variant="outlined"
          sx={{ ml: 'auto' }}
        />
      )}
    </Stack>
  );

  return (
    <Card>
      <CardHeader title={title} />
      <CardActions disableSpacing>
        <Button size="small" color="primary" onClick={learnMoreHandler}>
          Learn more
        </Button>

        <Tooltip title="Listen">
          <IconButton
            sx={{ ml: 'auto' }}
            onClick={() => listenClick(word.value)}
          >
            <ListenIcon />
          </IconButton>
        </Tooltip>

        {children}
      </CardActions>
    </Card>
  );
}
