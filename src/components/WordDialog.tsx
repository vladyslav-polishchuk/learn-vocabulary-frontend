import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import type { Word } from '../store/vocabularySlice';

interface WordDialogProps {
  word: Word | null;
  onClose: () => {};
}

export default function WordDialog({ word, onClose }: WordDialogProps) {
  if (!word) return null;

  return (
    <div>
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>{word.value}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText tabIndex={-1}>
            {[...new Array(30)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
