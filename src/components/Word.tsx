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
import MerkLearnedIcon from '@mui/icons-material/Done';
import type { Word } from '../store/vocabularySlice';

interface WordProps {
  word: Word;
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

export default function WordComponent({ word }: WordProps) {
  const title = (
    <Stack direction="row" spacing={1}>
      {word.value}
      <Chip
        label={word.frequency}
        color="primary"
        variant="outlined"
        sx={{ ml: 'auto' }}
      />
    </Stack>
  );

  return (
    <Card>
      <CardHeader title={title} />
      <CardActions disableSpacing>
        <Button size="small" color="primary">
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
        <Tooltip title="Mark as learned">
          <IconButton>
            <MerkLearnedIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
